import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export async function middleware(req: NextRequest) {
  // We initialize the response first so we can append cookies to it
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value); // Update request cookies
            res.cookies.set(name, value, options); // Update response cookies
          });
        },
      },
    }
  );

  // IMPORTANT: This refreshes the session if it's expired
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // 1. Handle Locale Redirection
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  // 2. Protected Routes Logic (Boutique Security)
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
  
  // These are the gated sections you mentioned
  const isProtectedRoute = ['/profile', '/dashboard', '/saved'].some(
  route => pathWithoutLocale.startsWith(route)
);

  if (isProtectedRoute && !user) {
    const locale = pathname.split('/')[1] || defaultLocale;
    // Redirect to login if a guest tries to access gated sections
    const redirectUrl = new URL(`/${locale}/login`, req.url);
    // Add current path as a 'next' param so they return here after login
    redirectUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    // This matcher is perfect for Next.js 14/15
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)',
  ],
}