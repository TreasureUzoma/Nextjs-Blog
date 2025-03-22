import { NextResponse } from "next/server"

export function middleware(request) {
  // Get the current URL
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""
  
  // This Blog can be deployed as a MicroZone path on your website or as a standalone domain 
  
  // Check if we're on the allowed domains
  const isAllowedDomain = hostname === "localhost:3000" || hostname === "idolodevblog.vercel.app"

  if (!isAllowedDomain) {
    return NextResponse.next()
  }

  // Remove only "/blog" as a standalone segment, but keep "/blogs"
  const cleanPath = url.pathname
    .split("/")
    .filter(segment => segment !== "blog")
    .join("/")

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