"use server"

import { authenticate } from "@/auth/auth.service"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginSchema } from "./schema"
import type { AuthError } from "./errors"

const SESSION_COOKIE = "session"

type LoginState = {
  formErrors?: {
    email?: string[]
    password?: string[]
  }
  authError?: AuthError
}

export async function loginActions(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      formErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await authenticate(
    parsed.data.email,
    parsed.data.password
  )

  if (!result.ok) {
    return {
      authError: result.error,
    }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, result.session.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  })

  redirect("/dashboard")
}
