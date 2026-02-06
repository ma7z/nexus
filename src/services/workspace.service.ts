import type { Prisma } from "@prisma/client";
import {
  addUserToWorkspace,
  createWorkspace,
  findWorkspaceByIdAndUser,
} from "../repositories/workspace.repository";
import { findFirstWorkspaceByUserId } from "@/repositories/workspace.repository";
import { prisma } from "@/lib/prisma";

export async function getWorkspaceById(
  workspaceId: string,
  userId: string
) {
  return findWorkspaceByIdAndUser(workspaceId, userId);
}

export async function getWorkspaceByUser(userId: string) {
  return findFirstWorkspaceByUserId(userId);
}

export async function createWorkspaceService(
  name: string,
  userId: string
) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const workspace = await createWorkspace(tx, name);

    await addUserToWorkspace(tx, {
      userId,
      workspaceId: workspace.id,
      role: "ADMIN",
    });

    return workspace;
  });
}
