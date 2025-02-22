// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the current path
  const url = request.nextUrl.clone();
  
  // If the path doesn't already start with '/blog', add it
  if (!url.pathname.startsWith('/blog')) {
    url.pathname = `/blog${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // For all other cases, continue with the request as normal
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - blog (already prefixed paths)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|blog).*)',
  ],
};