import { createTask } from "@/repositories/task.repository";
import { requireAdmin } from "@/utils/require-admin";

export async function createTaskUseCase(input: {
  title: string;
  projectId: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  userRole: "ADMIN" | "MEMBER";
}) {
  requireAdmin(input.userRole);

  return createTask({
    title: input.title,
    projectId: input.projectId,
    priority: input.priority,
    completed: false,
  });
}
