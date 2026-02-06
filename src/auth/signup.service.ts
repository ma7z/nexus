import { prisma } from "@/lib/prisma"
import { createUser } from "@/repositories/user.repository"
import {
  createWorkspace,
  addUserToWorkspace,
} from "@/repositories/workspace.repository"
import { hashPassword } from "./password.service"

type RegisterInput = {
  name: string
  email: string
  password: string
  username: string
  avatar?: string | null
}

type RegisterResult =
  | { ok: true }
  | { ok: false; error: "EMAIL_ALREADY_EXISTS" | "USERNAME_ALREADY_EXISTS" }

export async function registerUserWithWorkspace(
  input: RegisterInput
): Promise<RegisterResult> {
  const emailExists = await prisma.user.findUnique({
    where: { email: input.email },
  })

  if (emailExists) {
    return { ok: false, error: "EMAIL_ALREADY_EXISTS" }
  }

  const usernameExists = await prisma.user.findUnique({
    where: { username: input.username },
  })

  if (usernameExists) {
    return { ok: false, error: "USERNAME_ALREADY_EXISTS" }
  }

  await prisma.$transaction(async (tx: any) => {
    const user = await createUser(tx, {
      email: input.email,
      name: input.name,
      password: hashPassword(input.password),
      username: input.username,
      avatar: input.avatar ?? null,
    })

    const workspace = await createWorkspace(
      tx,
      `${input.name}'s Workspace`
    )

    await addUserToWorkspace(tx, {
      userId: user.id,
      workspaceId: workspace.id,
      role: "ADMIN",
    })
  })

  return { ok: true }
}
