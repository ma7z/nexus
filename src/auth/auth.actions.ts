"use server"

import { cookies } from "next/headers";
import { authenticate, invalidateSession } from "./auth.service";
import { registerUserWithWorkspace } from "./signup.service";
const SESSION_COOKIE = "session";

type AuthResponse =
  | { success: true }
  | { success: false; code: string };

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
  try {
    await registerUserWithWorkspace({
      name,
      email,
      password,
      username,
      avatar,
    })

    const session = await authenticate(email, password)

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, code: error.message }
    }

    return { success: false, code: "UNKNOWN_ERROR" }
  }
}


export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const session = await authenticate(email, password);

    const cookieStore = await cookies();
    cookieStore.set("session", session.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, code: error.message };
    }

    return { success: false, code: "UNKNOWN_ERROR" };
  }
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
