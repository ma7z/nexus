import { cookies } from "next/headers";
import { findSession } from "@/repositories/session.repository";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const session = await findSession(token);
  return session?.user ?? null;
}
