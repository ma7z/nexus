import { cookies } from "next/headers";
import { authenticate, invalidateSession } from "./auth.service";

export async function login(email: string, password: string) {
  const session = await authenticate(email, password);

  const cookieStore = await cookies();
  cookieStore.set("session", session.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
}

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return;

  await invalidateSession(token);
  cookieStore.delete("session");
}
