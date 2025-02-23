import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the current URL
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  // Check if we're on the allowed domains
  const isAllowedDomain = hostname === "localhost:3000" || hostname === "idolodevblog.vercel.app"

  if (!isAllowedDomain) {
    return NextResponse.next()
  }

  // Remove all occurrences of "/blog" in the pathname
  const cleanPath = url.pathname.replace(/\/blog/g, "")

  // If the path changed, redirect to the new URL
  if (cleanPath !== url.pathname) {
    url.pathname = cleanPath
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure the middleware to run on all paths
export const config = {
  matcher: ["/:path*"],
}