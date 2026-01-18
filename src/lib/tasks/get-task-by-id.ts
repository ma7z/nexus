import { findTaskWithProject } from "@/repositories/task.repository";

export async function getTaskById(taskId: string) {
  return findTaskWithProject(taskId);
}
