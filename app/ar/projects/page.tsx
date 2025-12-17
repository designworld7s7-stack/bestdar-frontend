import { getProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getProjects('ar');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">المشاريع</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
