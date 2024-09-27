import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { verifyJwt } from '@/utils/verifyJwt'

export function middleware(request: NextRequest) {
  let userRolecookie = request.cookies.get("userRole");
  let userRole = userRolecookie ? userRolecookie.value : null;
  let accessToken = request.cookies.get("accessToken")?.value;
  let userLoggedIn = accessToken ? true : false;
  // console.log(userRole, userLoggedIn, " user");
  if (request.nextUrl.pathname.match("/sign-in") && userLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.match("/sign-in") && !userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/sign-up") && userLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname.match("/sign-up") && !userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/search") && userLoggedIn) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.match("/search") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.match("/forgot-password") && userLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.match("/forgot-password") && !userLoggedIn) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.match("/forgot-password-reset") &&
    userLoggedIn
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname.match("/forgot-password-reset") &&
    !userLoggedIn
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/user") && userLoggedIn) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/user") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/profile") && userLoggedIn) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/profile") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard-vendor") &&
    userLoggedIn
  ) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard-vendor") &&
    !userLoggedIn
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard-venue") && userLoggedIn) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard-venue") &&
    !userLoggedIn
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") && userLoggedIn) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin") && !userLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/send-invite") &&
    userRole === "admin"
  ) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/send-invite",
    "/sign-in",
    "/sign-up",
    "/search",
    "/forgot-password",
    "/forgot-password-reset",
    "/user/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/dashboard-vendor/:path*",
    "/dashboard-venue/:path*",
  ],
};
