import { findProjectsByWorkspace } from "@/repositories/project.repository";

export async function getProjects(workspaceId: string) {
  return findProjectsByWorkspace(workspaceId);
}
