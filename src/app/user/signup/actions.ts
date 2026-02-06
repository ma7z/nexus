"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { signupSchema } from "./schema"
import { registerUserWithWorkspace } from "@/auth/signup.service"
import { authenticate } from "@/auth/auth.service"
import type { SignupState } from "./types"

const SESSION_COOKIE = "session"

export async function signupActions(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const values = {
    name: formData.get("name")?.toString(),
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  }

  const parsed = signupSchema.safeParse({
    ...values,
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      values,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await registerUserWithWorkspace(parsed.data)

  if (!result.ok) {
    return {
      values,
      fieldErrors:
        result.error === "EMAIL_ALREADY_EXISTS"
          ? { email: ["Email already in use"] }
          : { username: ["Username already taken"] },
    }
  }

  const auth = await authenticate(
    parsed.data.email,
    parsed.data.password
  )

  if (!auth.ok) {
    return {
      values,
      formError: "Unable to create session",
    }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, auth.session.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  })

  redirect("/dashboard")
}
