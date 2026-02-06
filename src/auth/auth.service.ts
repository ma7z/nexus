import { findUserByEmail } from "@/repositories/user.repository"
import { createSession, deleteSession } from "@/repositories/session.repository"
import { verifyPassword } from "./password.service"

export type AuthError =
  | "EMAIL_NOT_FOUND"
  | "INVALID_PASSWORD"

type AuthResult =
  | {
      ok: true
      session: {
        id: string
        token: string
        userId: string
        createdAt: Date
        expiresAt: Date
      }
    }
  | {
      ok: false
      error: AuthError
    }

export async function authenticate(
  email: string,
  password: string
): Promise<AuthResult> {
  const user = await findUserByEmail(email)

  if (!user) {
    return { ok: false, error: "EMAIL_NOT_FOUND" }
  }

  const passwordValid = verifyPassword(password, user.password)

  if (!passwordValid) {
    return { ok: false, error: "INVALID_PASSWORD" }
  }

  const session = await createSession(user.id)

  return {
    ok: true,
    session,
  }
}

export async function invalidateSession(token: string) {
  return deleteSession(token)
}
