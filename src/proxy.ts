import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes that do not require authentication
const publicRoutes = [
  "/login",
  "/signup",
  "/api/auth", // NextAuth internals
];

function isPublicRoute(pathname: string): boolean {
  if (pathname === "/") return true;
  return publicRoutes.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve NextAuth JWT token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const hasAuth = !!token;

  // ─── API Protection ────────────────────────────────────────────────────────
  if (pathname.startsWith("/api")) {
    // Never block internal NextAuth API endpoints
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    if (!hasAuth) {
      return NextResponse.json(
        { error: "Unauthorized. Authentication required." },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // ─── Static Files & Internals ─────────────────────────────────────────────
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // ─── Page Protection ──────────────────────────────────────────────────────
  if (!isPublicRoute(pathname) && !hasAuth) {
    const loginUrl = new URL("/login", request.url);
    // Remember the page they wanted to visit
    loginUrl.searchParams.set("redirect", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
