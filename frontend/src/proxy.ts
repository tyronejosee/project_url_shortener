import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/donate",
  "/feedback",
  "/plans",
  "/privacy-policy",
  "/terms-service",
];
const authRoutes = ["/auth/login", "/auth/register", "/auth/google"];
const apiAuthPrefix = "/api/auth";

const accessCookieName = "access";

export function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const hasSession = req.cookies.get(accessCookieName);

  // Permit all authentication API routes
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Permit access to public routes regardless of authentication state
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect to /dashboard if the user is logged in and tries to access an authentication route
  if (hasSession && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirect to /login if the user is not logged in and tries to access a protected route
  if (
    !hasSession &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
