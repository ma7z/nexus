import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const protectedRoutes = ["/api", "/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
