import { prisma } from "../lib/prisma";

export function createInvite(
  email: string,
  workspaceId: string,
  role: "ADMIN" | "MEMBER",
  token: string,
  expiresAt: Date
) {
  return prisma.invite.create({
    data: {
      email,
      workspaceId,
      role,
      token,
      expiresAt,
    },
  });
}

export function findInviteByToken(token: string) {
  return prisma.invite.findUnique({
    where: { token },
  });
}

export function deleteInvite(id: string) {
  return prisma.invite.delete({
    where: { id },
  });
}
