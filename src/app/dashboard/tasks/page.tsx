import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getWorkspace } from "@/lib/workspace/get-workspace";
import { getTasks } from "@/lib/tasks/get-tasks";
import { getProjects } from "@/lib/projects/get-projects";
import { TaskList } from "./_components/task-list";
import { CreateTaskDialog } from "./_components/create-task-dialog";

export default async function TasksPage() {
  const user = await getCurrentUser();
  const workspace = await getWorkspace();

  if (!user || !workspace) {
    return null;
  }

  const [tasks, projects] = await Promise.all([
    getTasks(workspace.id),
    getProjects(workspace.id),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tasks</h1>
        {user.role === "ADMIN" && (
          <CreateTaskDialog projects={projects} />
        )}
      </div>

      <TaskList projects={projects} tasks={tasks} />
    </div>
  );
}
