import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/i18n/translations';

const DEVELOPER_SUBDOMAIN = 'developer';

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  // Route developer subdomain to /developer/*
  if (hostname === `${DEVELOPER_SUBDOMAIN}.flow80.com` || hostname === `${DEVELOPER_SUBDOMAIN}.www.flow80.com`) {
    // Redirect bare root of developer subdomain to /developer/getting-started
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/developer/getting-started', request.url));
    }
    // Prepend /developer prefix so developer subdomain serves developer docs
    if (!pathname.startsWith('/developer')) {
      return NextResponse.redirect(new URL(`/developer${pathname}`, request.url));
    }
  }

  // Redirect bare root path `/` to `/{defaultLocale}`
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
