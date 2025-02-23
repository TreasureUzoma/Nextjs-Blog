import { NextResponse } from "next/server"

export function middleware(request) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  const isAllowedDomain = hostname === "localhost:3000" || hostname === "idolodevblog.vercel.app"

  if (!isAllowedDomain) {
    return NextResponse.next()
  }

  // Remove all occurrences of "/blog" in the pathname
  const cleanPath = url.pathname.replace(/\/blog/g, "")

  if (cleanPath !== url.pathname) {
    url.pathname = cleanPath
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}