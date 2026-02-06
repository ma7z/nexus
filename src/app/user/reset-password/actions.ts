"use server"

import { resetPassword } from "@/services/reset-password.service"
import { resetPasswordSchema } from "./schema"
import type { ResetPasswordState } from "./types"

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await resetPassword(
      parsed.data.token,
      parsed.data.password
    )
  } catch {
    return {
      formError: "Invalid or expired reset link",
    }
  }

  return {
    success: true,
  }
}
