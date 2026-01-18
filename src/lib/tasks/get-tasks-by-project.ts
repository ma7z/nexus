import { findTasksByProject } from "@/repositories/task.repository";

export async function getTasksByProject(projectId: string) {
  return findTasksByProject(projectId);
}
