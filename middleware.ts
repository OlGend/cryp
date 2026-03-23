import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = [
  'all', 'gb', 'au', 'br', 'ca', 'de', 'ie', 'nz', 'no', 'fi',
  'at', 'ch', 'dk', 'us', 'se', 'it', 'es', 'hu', 'pl', 'gr',
  'cz', 'fr', 'sk', 'be', 'nl', 'pt', 'bg', 'in', 'id', 'lk',
  'tr', 'za', 'qa', 'ae', 'sa', 'kz', 'az', 'uz',
];

const DEFAULT_LOCALE = 'au';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    /\.(.+)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const pathLocale = segments[0];

  // If path already has valid locale, continue
  if (pathLocale && SUPPORTED_LOCALES.includes(pathLocale)) {
    return NextResponse.next();
  }

  // Otherwise redirect to default locale
  const detected = (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    ''
  ).toLowerCase();

  const targetLocale = SUPPORTED_LOCALES.includes(detected) ? detected : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
