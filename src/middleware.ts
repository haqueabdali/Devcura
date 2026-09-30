import { NextResponse, type NextRequest } from "next/server";

import { CSRF_COOKIE } from "@/lib/constants";

/**
 * Issues the CSRF double-submit cookie for the admin area.
 * Cookies cannot be written during a Server Component render, so the token is
 * minted here (middleware) and read by the login page.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(CSRF_COOKIE)?.value) {
    response.cookies.set(CSRF_COOKIE, crypto.randomUUID().replace(/-/g, ""), {
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
