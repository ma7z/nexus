import { cookies } from "next/headers";
import { findSession } from "@/repositories/session.repository";

export async function getSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session")?.value;

  if (!token) return null;

  const session = await findSession(token);

  if (!session) {
    (await cookieStore).delete("session");
    return null;
  }

  return session;
}
