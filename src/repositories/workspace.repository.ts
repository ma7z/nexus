import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export function findUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export function createWorkspace(
  tx: Prisma.TransactionClient,
  name: string
) {
  return tx.workspace.create({
    data: { name },
  });
}

export function addUserToWorkspace(
  tx: Prisma.TransactionClient,
  input: {
    userId: string;
    workspaceId: string;
    role: "ADMIN" | "MEMBER";
  }
) {
  return tx.workspaceMember.create({
    data: input,
  });
}

export function findWorkspaceById(workspaceId: string) {
  return prisma.workspace.findUnique({
    where: { id: workspaceId },
  });
}

export function findWorkspaceByIdAndUser(
  workspaceId: string,
  userId: string
) {
  return prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId,
        },
      },
    },
  });
}

export function findFirstWorkspaceByUserId(userId: string) {
  return prisma.workspace.findFirst({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
