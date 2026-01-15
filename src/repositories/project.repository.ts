import { prisma } from "../lib/prisma";

export function createProject(name: string, workspaceId: string) {
  return prisma.project.create({
    data: {
      name,
      workspaceId,
    },
  });
}

export function findProjectsByWorkspace(workspaceId: string) {
  return prisma.project.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
  });
}

export function findProjectById(projectId: string) {
  return prisma.project.findUnique({
    where: { id: projectId },
  });
}
