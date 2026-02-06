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
    email: string
    name: string
    password: string
    username: string
    avatar?: string | null
  }
) {
  return tx.user.create({
    data: {
      email: input.email,
      password: input.password,
      name: input.name,
      username: input.username,
      avatar: input.avatar ?? null,
    },
  })
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
