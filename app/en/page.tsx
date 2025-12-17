import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export default async function EnPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 space-y-6">
      {projects.length === 0 && (
        <p className="text-gray-500">No projects available.</p>
      )}

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          location={project.location}
          price={project.price}
          image={project.image_url || "/placeholder.png"}
        />
      ))}
    </main>
  );
}

