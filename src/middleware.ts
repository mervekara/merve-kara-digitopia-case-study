import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const getLocaleFromCookie = (req: NextRequest) => {
  const language = req.cookies.get('NEXT_LOCALE')?.value;
  return language || 'en';
};

const hasAuthTokens = (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken')?.value;
  const idToken = req.cookies.get('idToken')?.value;
  return !!accessToken && !!idToken;
};

const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const locale = getLocaleFromCookie(req);
  const redirectUrl = new URL(`/${locale}/login`, req.url);

  
  if (!hasAuthTokens(req) && pathname !== `/${locale}/login`) {
      return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  if (pathname === '/') {
    console.log('afaf');
    return NextResponse.redirect(redirectUrl);
  }

  return createMiddleware({
    locales: ['en', 'tr'],
    defaultLocale: 'en',
  })(req);
};

export default middleware;

export const config = {
  matcher: ['/', '/(en|tr)/:page*'],
};
