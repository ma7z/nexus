import { hashPassword } from "@/auth/password.service"
import { findValidPasswordResetToken, markPasswordResetTokenAsUsed } from "@/repositories/password-reset-token"
import { updateUserPassword } from "@/repositories/user.repository"
import { hashToken } from "@/utils/reset-tokens"

export async function resetPassword(
  token: string,
  password: string
) {
  const tokenHash = hashToken(token)

  const resetToken = await findValidPasswordResetToken(tokenHash)
  if (!resetToken) {
    throw new Error("Invalid token")
  }

  const passwordHash = hashPassword(password)

  await updateUserPassword(
    resetToken.user.id,
    passwordHash
  )

  await markPasswordResetTokenAsUsed(resetToken.id)
}
