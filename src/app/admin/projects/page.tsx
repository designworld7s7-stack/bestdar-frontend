import ProjectsClient from './components/ProjectsClient';
import { createClient } from '@/utils/supabase/server';
// استيراد الدستور لضمان توحيد المسارات بين الرفع والعرض
import { MEDIA_CONFIG } from './components/ProjectMedia'; 

const getGalleryFolder = (slug: string) => 
  slug?.trim().toLowerCase().replace(/-+$/, '') || '';

const getFloorFolder = (slug: string) => {
  const cleanSlug = slug?.trim().toLowerCase().replace(/-+$/, '') || '';
  return cleanSlug ? `${cleanSlug}-floorplans` : '';
};

export default async function Page() {
  const supabase = await createClient();
  
  // 1. جلب البيانات مع الوحدات لضمان عدم فقدان البيانات عند التعديل
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_units (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
  }

  // 2. تنظيف البيانات بناءً على القواعد الموحدة
  const cleanedData = data?.map(project => {
    // إذا لم يكن هناك slug، نستخدم القيم المخزنة كما هي مؤقتاً
    const slug = project.slug || '';
    
    return {
      ...project,
      // التأكد من أن التامبينيل هو رابط واحد نظيف (يمنع CORB)
      thumbnail_url: project.thumbnail_url?.split(',')[0].trim() || '',
      
      // توحيد اسم مجلد الصور: إذا كان الحقل فارغاً، نخمنه من الـ slug بناءً على الدستور
      image_url: project.image_url 
        ? project.image_url.split(',')[0].trim() 
        : MEDIA_CONFIG.getGalleryFolder(slug),

      // توحيد اسم مجلد المخططات بناءً على الدستور
    floor_plan_urls: project.floor_plan_urls 
        ? project.floor_plan_urls.split(',')[0].trim() 
        : getFloorFolder(slug),
      
      // تعيين الوحدات
      units: project.project_units || []
    };
  });
console.log("🛠️ DASHBOARD DATA CHECK:", {
  firstItemGallery: cleanedData && cleanedData[0]?.image_url,
  firstItemFloor: cleanedData && cleanedData[0]?.floor_plan_urls
});
  return (
    <div className="min-h-screen bg-white p-4">
      {/* تمرير البيانات المعالجة التي تتبع الآن "قواعد المسارات الموحدة" */}
      <ProjectsClient initialData={cleanedData || []} />
    </div>
  );
}