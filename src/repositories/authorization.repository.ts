import { prisma } from "../lib/prisma";

export function findUserRoleInWorkspace(userId: string, workspaceId: string) {
  return prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });
}
