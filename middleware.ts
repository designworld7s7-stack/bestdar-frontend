import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, { ...options, path: '/', secure: true, sameSite: 'lax' });
          });
        },
      },
    }
  );

  const { pathname } = req.nextUrl;

  // 1. حصانة مسارات الجذر (الأدمن والأوث العام) [cite: 2026-02-27]
  const isRootRoute = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/auth') || 
    pathname === '/login';

  if (isRootRoute) {
    // التحقق من الصلاحيات للأدمن وهو في الجذر [cite: 2026-02-27]
    const { data: { user } } = await supabase.auth.getUser();
    
    // إذا حاول دخول /admin وهو غير مسجل، يذهب لـ /login في الجذر [cite: 2026-02-27]
    if (pathname.startsWith('/admin') && !user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return res;
  }

  // 2. استخراج اللغة للمسارات المترجمة [cite: 2026-02-27]
  const locales = ['en', 'ar'];
  const lang = locales.find(l => pathname.startsWith(`/${l}`)) || 'en';

  // 3. إضافة رمز اللغة للمسارات التي تفتقده (تجاهل الملفات الثابتة) [cite: 2026-02-27]
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    const redirectRes = NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
    
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, { 
        path: '/', secure: true, sameSite: 'lax' 
      });
    });
    return redirectRes;
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)'],
}