"use server"

import { cookies } from "next/headers"
import { registerUserWithWorkspace } from "@/auth/signup.service"
import { authenticate } from "@/auth/auth.service"
import { redirect } from "next/navigation"

const SESSION_COOKIE = "session"

export async function signupActions(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await registerUserWithWorkspace({
      name,
      email,
      password,
    })

    const session = await authenticate(email, password)

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
    })

    redirect("/dashboard")
  } catch (error) {
    if (error instanceof Error && error.message === "Email already registered") {
      return { error: "Email already in use" }
    }

    return { error: "Unable to create account" }
  }
}
