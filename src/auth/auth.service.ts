import { findUserByEmail, createUser } from "@/repositories/user.repository";
import { createSession, deleteSession } from "@/repositories/session.repository";
import { hashPassword, verifyPassword } from "./password.service";

export async function authenticate(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  if (!verifyPassword(password, user.password)) {
    throw new Error("Invalid credentials");
  }

  return createSession(user.id);
}

export async function registerUser(email: string, password: string) {
  const exists = await findUserByEmail(email);
  if (exists) throw new Error("User already exists");

  const hashed = hashPassword(password);
  return createUser(email, hashed);
}

export async function invalidateSession(token: string) {
  return deleteSession(token);
}
