import { prisma } from "@/lib/prisma";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function createUser(email: string, password: string) {
  return prisma.user.create({
    data: { email, password },
  });
}
