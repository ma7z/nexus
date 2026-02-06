"use server"

import { resetPassword } from "@/services/reset-password.service"

export async function resetPasswordAction(
  token: string,
  password: string
) {
  await resetPassword(token, password)
}
