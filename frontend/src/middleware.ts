import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth-config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/prices"];
const authRoutes = ["/auth/login", "/auth/register"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // console.log({ isLoggedIn, path: nextUrl.pathname });

  // Permit all authentication API routes
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Permit access to public routes regardless of authentication state
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect to /dashboard if the user is logged in and tries to access an authentication route
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirect to /login if the user is not logged in and tries to access a protected route
  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
