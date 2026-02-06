import { prisma } from "@/lib/prisma";
import { createUser } from "@/repositories/user.repository";
import {
  createWorkspace,
  addUserToWorkspace,
} from "@/repositories/workspace.repository";
import { hashPassword } from "./password.service";

export async function registerUserWithWorkspace(input: {
  name: string;
  email: string;
  password: string;
  username: string;
  avatar?: string | null;
}) {
  const emailExists = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (emailExists) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const usernameExists = await prisma.user.findUnique({
    where: { username: input.username },
  });

  if (usernameExists) {
    throw new Error("USERNAME_ALREADY_EXISTS");
  }

  if (input.password.length < 8) {
    throw new Error("WEAK_PASSWORD");
  }

  await prisma.$transaction(async (tx) => {
    const user = await createUser(tx, {
      email: input.email,
      password: hashPassword(input.password),
      username: input.username,
      name: input.name,
      avatar: input.avatar ?? null,
    });

    const workspace = await createWorkspace(
      tx,
      `${input.name}'s Workspace`
    );

    await addUserToWorkspace(tx, {
      userId: user.id,
      workspaceId: workspace.id,
      role: "ADMIN",
    });
  });
}
