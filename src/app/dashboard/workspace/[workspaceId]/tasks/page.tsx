import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getWorkspace } from "@/lib/workspace/get-workspace";
import { getTasks } from "@/lib/tasks/get-tasks";
import { getProjects } from "@/lib/projects/get-projects";
import { TaskList } from "./_components/task-list";
import { findUserRoleInWorkspace } from "@/repositories/authorization.repository";
import CreateTaskDialogServer from "./_components/create-task-dialog.server";
import PageHeader from "@/components/layout/page/page-header";

export default async function TasksPage() {
  const user = await getCurrentUser();
  const workspace = await getWorkspace();

  if (!user || !workspace) {
    return null;
  }

  const getUserRole = await findUserRoleInWorkspace(user.id, workspace.id);

  const [tasks, projects] = await Promise.all([
    getTasks(workspace.id),
    getProjects(workspace.id),
  ]);


  const TaskDialogServer = () => {
    if (getUserRole?.role === "ADMIN") {
      return (
        <CreateTaskDialogServer />
      )
    }

    return null
  }

  return (


    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Tasks" endActions={<TaskDialogServer />} />

      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No projects yet
        </div>
      ) : (
        <ul className="grid gap-y-2 space-y-3 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <TaskList projects={projects} tasks={tasks} />
        </ul>
      )}
    </div>
  );
}
