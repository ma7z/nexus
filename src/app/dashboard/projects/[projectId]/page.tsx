import { notFound } from "next/navigation"
import PageHeader from "@/components/layout/page/page-header"
import { getProjectById } from "@/lib/projects/get-project-by-id"

type PageProps = {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectById(params.projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PageHeader title={project.name} />

      <div className="rounded-lg border p-4">
        <div className="text-sm text-muted-foreground">Slug</div>
        <div className="font-medium">{project.slug}</div>
      </div>

      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        Tasks will be shown here
      </div>
    </div>
  )
}
