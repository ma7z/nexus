import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/user/signin", request.url));
  }

  if (pathname.startsWith("/user") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*"],
};
