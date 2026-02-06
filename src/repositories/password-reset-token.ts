import { prisma } from "../lib/prisma"

export function createPasswordResetToken(data: {
  userId: string
  tokenHash: string
  expiresAt: Date
}) {
  return prisma.passwordResetToken.create({ data })
}

export function findValidPasswordResetToken(tokenHash: string) {
  return prisma.passwordResetToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: new Date() }
    },
    include: { user: true }
  })
}

export function markPasswordResetTokenAsUsed(id: string) {
  return prisma.passwordResetToken.update({
    where: { id },
    data: { usedAt: new Date() }
  })
}

export function deletePasswordResetTokensByUser(userId: string) {
  return prisma.passwordResetToken.deleteMany({
    where: { userId }
  })
}
