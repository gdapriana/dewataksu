import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/profile"];
const authRoute = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const sessionCookie = getSessionCookie(request);
  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = authRoute.includes(nextUrl.pathname);

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
