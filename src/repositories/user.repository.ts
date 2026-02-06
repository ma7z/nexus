import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export function createUser(
  tx: Prisma.TransactionClient,
  input: {
    email: string;
    password: string;
    username?: string | null;
    avatar?: string | null;
  }
) {
  return tx.user.create({
    data: {
      email: input.email,
      password: input.password,
      username: input.username || undefined,
      avatar: input.avatar || undefined,
    },
  });
}


export function updateUserPassword(
  userId: string,
  passwordHash: string
) {
  return prisma.user.update({
    where: { id: userId },
    data: { password: passwordHash }
  })
}
