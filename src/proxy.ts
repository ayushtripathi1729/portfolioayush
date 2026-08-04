import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { isTokenInactive } from "@/lib/auth-session";


export async function proxy(
  request: NextRequest
) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  const pathname =
    request.nextUrl.pathname;


  const isAdminRoute =
    pathname.startsWith("/admin");


  const isLoginRoute =
    pathname.startsWith("/login");

  const isAuthApiRoute =
    pathname.startsWith("/api/auth");

  const isPublicContactPost =
    pathname === "/api/contact" &&
    request.method === "POST";

  const isProtectedApiRoute =
    pathname.startsWith("/api") &&
    !isAuthApiRoute &&
    !isPublicContactPost;

  const isExpired =
    token?.expired === true ||
    isTokenInactive(
      token?.lastActivity
    );


  // Protect admin routes
  if ((isAdminRoute || isProtectedApiRoute) && (!token || isExpired)) {
    if (isProtectedApiRoute) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const loginUrl =
      new URL("/login", request.url);

    return NextResponse.redirect(
      loginUrl
    );
  }


  // Prevent logged-in users from seeing login page again
  if (isLoginRoute && token && !isExpired) {
    const adminUrl =
      new URL("/admin", request.url);

    return NextResponse.redirect(
      adminUrl
    );
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
    "/login",
  ],
};
