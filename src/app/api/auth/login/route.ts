import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authenticate } from "@/auth/auth.service";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  try {
    const session = await authenticate(email, password);

    const cookieStore = await cookies();
    cookieStore.set("session", session.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}
