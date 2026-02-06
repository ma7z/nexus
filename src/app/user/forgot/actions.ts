"use server"

import { forgotPassword } from "@/services/forgot-password.service"

export async function forgotPasswordAction(email: string) {
  await forgotPassword(email)
}
