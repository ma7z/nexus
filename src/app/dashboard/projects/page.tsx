import PageHeader from "@/components/layout/page/page-header"
import { getProjects } from "@/lib/projects/get-projects"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" />

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No projects yet
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <li
              key={project.id}
              className="rounded-lg border p-4 hover:bg-muted/50"
            >
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-muted-foreground">
                {project.slug}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
