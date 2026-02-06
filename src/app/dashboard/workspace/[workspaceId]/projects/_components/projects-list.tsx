import { ProjectCard } from "./project-card"

type ProjectsListProps = {
  projects: {
    id: string
    name: string
    description: string | null
    createdAt: Date
  }[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  if (!projects.length) {
    return <span>nada</span>
  }

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} workspaceSlug={""} />
      ))}
    </div>
  )
}
