import { findUserByEmail, createUser } from "@/repositories/user.repository";
import { createSession, deleteSession } from "@/repositories/session.repository";
import { hashPassword, verifyPassword } from "./password.service";
import { prisma } from "@/lib/prisma";

export async function authenticate(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return { ok: false, error: "EMAIL_NOT_FOUND" }
  }

  const passwordValid = verifyPassword(password, user.password);

  if (!passwordValid) {
    return { ok: false, error: "INVALID_PASSWORD" }
  }

  return createSession(user.id);
}

export async function registerUser(email: string, password: string, name: string) {
  const exists = await findUserByEmail(email);
  if (exists) throw new Error("User already exists");

  const user = await createUser(prisma, {
    email: email,
    password: hashPassword(password),
  });

  return user
}

export async function invalidateSession(token: string) {
  return deleteSession(token);
}