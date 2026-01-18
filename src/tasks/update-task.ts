import {
  findTaskWithProject,
  updateTask,
} from "@/repositories/task.repository";
import { requireAdmin } from "@/utils/require-admin";

export async function updateTaskUseCase(input: {
  taskId: string;
  title?: string;
  status?: "OPEN" | "IN_PROGRESS" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  userRole: "ADMIN" | "MEMBER";
  workspaceId: string;
}) {
  requireAdmin(input.userRole);

  const task = await findTaskWithProject(input.taskId);

  if (!task || task.project.workspaceId !== input.workspaceId) {
    throw new Error("NOT_FOUND");
  }

  return updateTask(input.taskId, {
    title: input.title,
    status: input.status,
    priority: input.priority,
  });
}
