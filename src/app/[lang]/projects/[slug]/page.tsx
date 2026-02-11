import { getProjectWithUnits, getSimilarProjects } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProjectClient from './components/project-client';
import { createClient } from '@/utils/supabase/server';

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ lang: string; slug: string }> 
}) {
  const { lang, slug } = await params;
  
  const supabase = await createClient(); 
  const project = await getProjectWithUnits(slug);

  if (!project) return notFound();

  // 1. Fetch Gallery Images
  const { data: galleryFiles } = await supabase.storage
    .from('project-images')
    .list(project.image_url || ''); 

  const galleryImages = galleryFiles?.map((file: any) => 
    supabase.storage.from('project-images').getPublicUrl(`${project.image_url}/${file.name}`).data.publicUrl
  ) || [];

  // 2. Fetch Floor Plans from its specific folder
  const { data: floorFiles } = await supabase.storage
    .from('project-images')
    .list(project.floor_plan_urls || ''); 

  const floorPlans = floorFiles?.map((file: any) => 
    supabase.storage.from('project-images').getPublicUrl(`${project.floor_plan_urls}/${file.name}`).data.publicUrl
  ) || [];

  const similarProjects = await getSimilarProjects(project.country_code, slug);

  return (
    <ProjectClient 
    project={{
      ...project,
      // CRITICAL: Ensure units are passed here
      units: project.units || [], 
      images: galleryImages,
      floor_plans: floorPlans
    }}
    lang={lang}
    similarProjects={similarProjects} 
  />
);
}