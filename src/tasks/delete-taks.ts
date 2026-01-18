import {
  deleteTask,
  findTaskWithProject,
} from "@/repositories/task.repository";
import { requireAdmin } from "@/utils/require-admin";

export async function deleteTaskUseCase(input: {
  taskId: string;
  userRole: "ADMIN" | "MEMBER";
  workspaceId: string;
}) {
  requireAdmin(input.userRole);

  const task = await findTaskWithProject(input.taskId);

  if (!task || task.project.workspaceId !== input.workspaceId) {
    throw new Error("NOT_FOUND");
  }

  return deleteTask(input.taskId);
}
