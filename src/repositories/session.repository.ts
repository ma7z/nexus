import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

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

export async function getAuthSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const session = await findSession(token)

  if (!session) {
    throw new Error("Invalid or expired session")
  }

  return session
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
