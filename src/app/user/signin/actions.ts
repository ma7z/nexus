"use server"

import { authenticate } from "@/auth/auth.service"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginSchema } from "./schema"
import type { LoginState } from "./types"

const SESSION_COOKIE = "session"

export async function loginActions(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const values = {
    email: formData.get("email")?.toString(),
  }

  const password = formData.get("password")?.toString()

  const parsed = loginSchema.safeParse({
    ...values,
    password,
  })

  if (!parsed.success) {
    return {
      values,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await authenticate(
    parsed.data.email,
    parsed.data.password
  )

  if (!result.ok) {
    if (result.error === "EMAIL_NOT_FOUND") {
      return {
        values,
        fieldErrors: {
          email: ["Email not found"],
        },
      }
    }

    if (result.error === "INVALID_PASSWORD") {
      return {
        values,
        fieldErrors: {
          password: ["Invalid password"],
        },
      }
    }

    return {
      values,
      formError: "Unable to authenticate",
    }
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: SESSION_COOKIE,
    value: result.session.token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  })

  redirect("/dashboard")
}
