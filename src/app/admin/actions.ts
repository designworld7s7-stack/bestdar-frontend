'use server'
import { createClient } from '@supabase/supabase-js'

export async function saveProjectWithUnitsAction(projectData: any, unitsData: any[]) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // --- المصفاة الجراحية للبيانات (Data Sanitization) ---
  
  // 1. تنظيف بيانات المشروع
  const sanitizedProject = {
    ...projectData,
    // تأمين الأرقام: تحويل الإحداثيات والأسعار إلى أرقام حقيقية أو null
    map_latitude: projectData.map_latitude ? parseFloat(projectData.map_latitude) : null,
    map_longitude: projectData.map_longitude ? parseFloat(projectData.map_longitude) : null,
    price: projectData.price ? parseFloat(projectData.price) : 0,

    // تأمين النصوص (تسطيح المصفوفات لتتوافق مع الـ Front-end الحالي)
    // نستخدم الفاصلة والمسافة لضمان سهولة القراءة والـ split لاحقاً
    amenities: Array.isArray(projectData.amenities) 
      ? projectData.amenities.join(', ') 
      : (projectData.amenities || ""),
    
    landmarks: Array.isArray(projectData.landmarks) 
    ? projectData.landmarks 
    : (projectData.landmarks || []),

    // منطق الصور الهجين:
    // إذا كان جاليري الصور يحتوي على رابط واحد فقط، سنخزنه كما هو
    // الموقع في الـ Front-end سيفحص: إذا بدأ بـ http فهو رابط، وإذا لا فهو اسم مجلد
    image_url: projectData.image_url || "",
    floor_plan_urls: projectData.floor_plan_urls || "",
    
    // ربط الحقول العربية (ستملأ الأعمدة التي كانت تبقى فارغة)
    title_ar: projectData.title_ar || null,
    location_ar: projectData.location_ar || null,
    overview_text_ar: projectData.overview_text_ar || null,
    neighborhood_description_ar: projectData.neighborhood_description_ar || null,
    project_status_ar: projectData.project_status_ar || null,
    delivery_date_ar: projectData.delivery_date_ar || null,
  };

  // 1. حفظ بيانات المشروع الأساسي
  const { data: project, error: pError } = await supabaseAdmin // تأكد من الاسم هنا
  .from('projects')
  .upsert(sanitizedProject) // استخدم sanitizedProject لضمان تنظيف البيانات
  .select()
  .single();

if (pError) {
  console.error("Project Save Error:", pError.message);
  throw new Error(`خطأ في حفظ المشروع: ${pError.message}`);
}

  // 2. ربط الوحدات بالمشروع وحفظها
  if (unitsData && unitsData.length > 0) {
  // مسح الوحدات القديمة المرتبطة بهذا المشروع قبل إضافة الجديدة
  await supabaseAdmin.from('project_units').delete().eq('project_id', project.id);

  const unitsWithId = unitsData.map(unit => ({
    ...unit,
    project_id: project.id,
    // ... بقية التحويلات
  }));

  const { error: uError } = await supabaseAdmin
    .from('project_units')
    .insert(unitsWithId);

    if (uError) {
      console.error("Units Save Error:", uError.message)
      // ملاحظة: قد نود حذف المشروع إذا فشل حفظ الوحدات (اختياري)
      throw new Error(`خطأ في حفظ الوحدات: ${uError.message}`)
    }
  }

  return project
}