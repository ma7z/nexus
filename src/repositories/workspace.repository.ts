import { prisma } from "../lib/prisma";

export function findUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export function createWorkspaceWithOwner(name: string, userId: string) {
  return prisma.workspace.create({
    data: {
      name,
      members: {
        create: {
          userId,
          role: "ADMIN",
        },
      },
    },
  });
}
