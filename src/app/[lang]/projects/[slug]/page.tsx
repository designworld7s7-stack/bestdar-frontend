import { getProjectWithUnits, getSimilarProjects } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProjectClient from './components/project-client';
import { createClient } from '@/utils/supabase/server';

const toSafeArray = (data: any) => {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string' && data.startsWith('http')) return [data];
  if (typeof data === 'string' && data.includes(',')) return data.split(',').filter(Boolean);
  if (typeof data === 'string' && data.length > 0) return [data];
  return [];
};

async function fetchStorageFiles(bucket: string, path: string) {
  if (!path) return [];
  if (path.startsWith('http')) return [path];
  
  const supabase = await createClient();
  const cleanPath = path.trim().replace(/^\/+|\/+$/g, '');
  
  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list(cleanPath);

  if (error || !files || files.length === 0) {
    console.error(`❌ Storage Error for path [${cleanPath}]:`, error?.message);
    return [];
  }

  return files
    .filter(file => !file.name.includes('.emptyFolderPlaceholder') && /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name))
    .map(file => 
      supabase.storage.from(bucket).getPublicUrl(`${cleanPath}/${file.name}`).data.publicUrl
    );
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ lang: string; slug: string }> 
}) {
  const { lang, slug } = await params;
  const isAr = lang === 'ar';
  
  const project = await getProjectWithUnits(slug);
  if (!project) return notFound();

  const galleryPath = project.image_url || slug;
  const floorPath = project.floor_plan_urls || `${slug}-floorplans`;

  const [galleryImages, floorPlans] = await Promise.all([
    fetchStorageFiles('project-images', galleryPath),
    fetchStorageFiles('project-images', floorPath)
  ]);

  const similarProjects = await getSimilarProjects(project.country_code, slug);

  // --- تجهيز البيانات المترجمة (Localized Data) ---
  const safeProject = {
    ...project,
    galleryImages,
    floorPlans,
    amenities: isAr ? toSafeArray(project.amenities_ar || project.amenities) : toSafeArray(project.amenities),
    
    units: (project.project_units || project.units || []).map((unit: any) => ({
    ...unit,
    // نضمن أن الحقول التي نسختها من سوبابيس موجودة ومهيأة
    payment_milestones: unit.payment_milestones || '',
    payment_milestones_ar: unit.payment_milestones_ar || '',
    badges: Array.isArray(unit.badges) ? unit.badges : []
  })),

    // ربط الحقول العربية التي شاركتها
    displayTitle: isAr ? (project.title_ar || project.title) : project.title,
    displayLocation: isAr ? (project.location_ar || project.location) : project.location,
    displayStatus: isAr ? (project.project_status_ar || project.project_status) : project.project_status,
    displayDeliveryDate: isAr ? (project.delivery_date_ar || project.delivery_date) : project.delivery_date,
    
    // Key Details
    displayOrientation: isAr ? project.orientation_ar : project.orientation,
    displayViewType: isAr ? project.view_type_ar : project.view_type,
    
    // Descriptions & Content
    displayOverview: isAr ? (project.overview_text_ar || project.description_ar) : project.description,
    displayNeighborhoodDesc: isAr ? project.neighborhood_description_ar : project.neighborhood_description,
    displayDevDescription: isAr ? project.dev_description_ar : project.dev_description,
    
    // Landmarks (Array/JSON)
    displayLandmarks: isAr ? (project.landmarks_ar || project.landmarks) : project.landmarks,
  };
console.log("---------------------------------");
console.log("DATABASE RAW DATA (SERVER SIDE):");
console.log("Title AR:", project.title_ar);
console.log("Location AR:", project.location_ar);
console.log("---------------------------------");
  return (
    <ProjectClient 
      project={safeProject}
      lang={lang}
      similarProjects={similarProjects || []} 
    />
  );
}