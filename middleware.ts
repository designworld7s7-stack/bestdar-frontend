import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export async function middleware(req: NextRequest) {
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
            req.cookies.set(name, value);
            res.cookies.set(name, value, {
              ...options,
              sameSite: 'lax',
              secure: true,
              path: '/',
            });
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = req.nextUrl;

  // 1. معالجة توجيه اللغة
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    const redirectUrl = new URL(`/${locale}${pathname}`, req.url);
    const redirectRes = NextResponse.redirect(redirectUrl);
    
    // الطريقة الصحيحة لنقل الكوكيز في Next.js
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value);
    });
    
    return redirectRes;
  }

  // 2. حماية المسارات (Gated Sections)
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
  const isProtectedRoute = ['/profile', '/dashboard', '/saved', '/investor-club'].some(
    route => pathWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute && !user) {
    const locale = pathname.split('/')[1] || defaultLocale;
    // تم تعديل المسار ليتطابق مع مجلداتك الحقيقية /auth/login
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    loginUrl.searchParams.set('next', pathname);
    
    const authRes = NextResponse.redirect(loginUrl);
    
    // نقل الكوكيز لضمان استمرار الجلسة
    res.cookies.getAll().forEach((cookie) => {
      authRes.cookies.set(cookie.name, cookie.value);
    });
    
    return authRes;
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
}