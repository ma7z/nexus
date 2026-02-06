import { prisma } from "@/lib/prisma";

export function getWorkspaceStats(workspaceId: string) {
  return prisma.$transaction([
    prisma.project.count({
      where: { workspaceId },
    }),
    prisma.workspaceMember.count({
      where: { workspaceId },
    }),
    prisma.task.count({
      where: {
        project: {
          workspaceId,
        },
      },
    }),
  ]);
}
