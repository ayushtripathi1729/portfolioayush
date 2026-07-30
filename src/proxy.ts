import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


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


  // Protect admin routes
  if (isAdminRoute && !token) {
    const loginUrl =
      new URL("/login", request.url);

    return NextResponse.redirect(
      loginUrl
    );
  }


  // Prevent logged-in users from seeing login page again
  if (isLoginRoute && token) {
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
    "/login",
  ],
};