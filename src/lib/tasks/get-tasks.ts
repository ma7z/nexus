import { findTasksByWorkspace } from "@/repositories/task.repository";

export async function getTasks(workspaceId: string) {
  return findTasksByWorkspace(workspaceId);
}
