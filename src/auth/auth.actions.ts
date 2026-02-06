"use server"

import { cookies } from "next/headers"
import { authenticate, invalidateSession } from "./auth.service"
import { registerUserWithWorkspace } from "./signup.service"

const SESSION_COOKIE = "session"

type AuthResponse =
  | { success: true }
  | { success: false; code: string }

type SignoutResponse =
  | { success: true }
  | { success: false; code: string }

export async function signup(
  name: string,
  email: string,
  password: string,
  username: string,
  avatar?: string | null
): Promise<AuthResponse> {
  const result = await registerUserWithWorkspace({
    name,
    email,
    password,
    username,
    avatar,
  })

  if (!result.ok) {
    return { success: false, code: result.error }
  }

  const auth = await authenticate(email, password)

  if (!auth.ok) {
    return { success: false, code: auth.error }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, auth.session.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  })

  return { success: true }
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const auth = await authenticate(email, password)

  if (!auth.ok) {
    return { success: false, code: auth.error }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, auth.session.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  })

  return { success: true }
}

export async function signout(): Promise<SignoutResponse> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (!token) {
      return { success: true }
    }

    await invalidateSession(token)
    cookieStore.delete(SESSION_COOKIE)

    return { success: true }
  } catch {
    return { success: false, code: "SIGNOUT_FAILED" }
  }
}
