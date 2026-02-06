import { createPasswordResetToken, deletePasswordResetTokensByUser } from "@/repositories/password-reset-token"
import { findUserByEmail } from "@/repositories/user.repository"
import { generateResetToken, hashToken } from "@/utils/reset-tokens"
import { sendResetPasswordEmail } from "./send-password-email.service"

export async function forgotPassword(email: string) {
  const user = await findUserByEmail(email)
  if (!user) return

  await deletePasswordResetTokensByUser(user.id)

  const rawToken = generateResetToken()
  const tokenHash = hashToken(rawToken)

  await createPasswordResetToken({
    userId: user.id,
    tokenHash,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30)
  })

  await sendResetPasswordEmail({
    email: user.email,
    token: rawToken
  })
}
