import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("influnz_access_token")?.value
    console.log("Middleware - Current token:", token)
  // List of routes that need authentication
  const protectedPaths = ["/dashboard", "/profile", "/settings","/onboarding"]

  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  // If the user is not logged in and tries to access a protected route → redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", request.nextUrl.pathname) // optional: so you can redirect back after login
    return NextResponse.redirect(loginUrl)
  }

  // If user is logged in and tries to access /login → redirect to dashboard
  if (request.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// ✅ Tell Next.js which paths middleware should run on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/onboarding/:path*",
    "/login"
  ],
}
