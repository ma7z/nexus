import { findProjectById } from "@/repositories/project.repository";

export async function getProjectById(projectId: string) {
  return findProjectById(projectId);
}
