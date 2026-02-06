"use server"

import { forgotPasswordSchema } from "./schema"
import type { ForgotPasswordState } from "./types"
import { forgotPassword } from "@/services/forgot-password.service"

export async function forgotPasswordFormAction(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const values = {
    email: formData.get("email")?.toString(),
  }

  const parsed = forgotPasswordSchema.safeParse(values)

  if (!parsed.success) {
    return {
      values,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await forgotPassword(parsed.data.email)
  } catch {
    return {
      values,
      formError: "Failed to send reset link",
    }
  }

  return {
    success: true,
  }
}
