/**
 * Flow80 Middleware — routes developer.flow80.com to the (developer) route group.
 *
 * Cloudflare note (Marc): add CNAME record:
 *   developer.flow80.com → cname.flow80.com  (or your Next.js hosting endpoint)
 * The middleware detects the subdomain and rewrites to the (developer) group.
 */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';

  // Match developer.flow80.com (including with port for local testing)
  const isDevSubdomain = /^developer\.(flow80\.com|localhost\.?:\d*)$/.test(hostname);

  if (isDevSubdomain) {
    // Rewrite to the (developer) route group — Next.js strips the (developer) segment
    const url = request.nextUrl.clone();
    url.pathname = `/developer${url.pathname === '/' ? '/getting-started' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon).*)'],
};
