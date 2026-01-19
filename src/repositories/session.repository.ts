import { prisma } from "@/lib/prisma";

export function createSession(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  return prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
}

export function findSession(token: string) {
  return prisma.session.findFirst({
    where: {
      token,
      expiresAt: { gt: new Date() },
    },
    include: {
      user: {
        include: {
          memberships: true,
        },
      },
    },
  });
}

export function deleteSession(token: string) {
  return prisma.session.delete({
    where: { token },
  });
}
