import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // 1. Supabase Auth Setup
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 2. Language Routing Logic
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Check if user has a saved language cookie, otherwise use default
    const locale = req.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  // 3. Protected Routes Logic
  // Check if current path (minus locale) matches your protected list
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
  const isProtectedRoute = ['/profile', '/investor', '/dashboard', '/saved'].some(
    route => pathWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute && !user) {
    const locale = pathname.split('/')[1] || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return res;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static, etc)
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)',
  ],
}