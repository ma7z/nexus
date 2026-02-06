import PageHeader from "@/components/layout/page/page-header"
import { getProjects } from "@/lib/projects/get-projects"
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getWorkspace } from "@/lib/workspace/get-workspace";
import { getTasks } from "@/lib/tasks/get-tasks";
import CreateProjectDialogServer from "./_components/create-project-dialog.server";
import { findUserRoleInWorkspace } from "@/repositories/authorization.repository";

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  const workspace = await getWorkspace();

  if (!user || !workspace) {
    return null;
  }

  const getUserRole = await findUserRoleInWorkspace(user.id, workspace.id);

  const ProjectDialogServer = () => {
    if (getUserRole?.role === "ADMIN") {
      return (
        <CreateProjectDialogServer />
      )
    }

    return null
  }

  const projects = await getProjects(workspace.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Projects" endActions={<ProjectDialogServer/>} />
      </div>

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
