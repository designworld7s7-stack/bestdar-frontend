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
    developer={project.developer_name || 'Boutique Developer'}
    location={project.location}
    price={`${project.currency || '$'} ${project.price?.toLocaleString()}`}
    
    // ✅ FIX: Match the new prop name and the new database column
    thumbnail_url={project.thumbnail_url || '/placeholder-project.jpg'} 
    
    deliveryDate={project.delivery_date || 'Ready to Move'}
    lang={lang} 
  />
))}
      </div>
    </section>
  );
}