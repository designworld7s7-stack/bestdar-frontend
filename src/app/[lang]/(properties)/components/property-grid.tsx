import ProjectCard from '@/components/shared/project-card';

export default function PropertyGrid({ projects, lang }: { projects: any[], lang: string }) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
       {projects.map((project) => (
  <ProjectCard 
  key={project.id} 
  slug={project.slug} 
  title={project.title}
  // ✅ إضافة العنوان العربي لضمان الترجمة [cite: 2026-02-25]
  title_ar={project.title_ar} 
  
  developer={project.developer_name || 'Boutique Developer'}
  // ✅ اختياري: إضافة اسم المطور بالعربي إذا كان متوفراً في القاعدة
  developer_ar={project.developer_name_ar} 
  
  location={project.location}
  // ✅ إضافة الموقع بالعربي لضمان تجربة مستخدم كاملة [cite: 2026-02-25]
  location_ar={project.location_ar} 
  
  price={`${project.currency || '$'} ${project.price?.toLocaleString()}`}
  
  // ✅ استخدام العمود الصحيح للصور الذي اعتمدناه
  thumbnail_url={project.thumbnail_url || '/placeholder-project.jpg'} 
  
  deliveryDate={project.delivery_date || 'Ready to Move'}
  lang={lang} 
/>
))}
      </div>
    </section>
  );
}