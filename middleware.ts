import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  // 1. إنشاء استجابة أولية
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // 2. إعداد عميل سوبابيس مع ضمان إعدادات الأمان للنطاق الحي
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
              secure: true,
              sameSite: 'lax',
              path: '/',
            });
          });
        },
      },
    }
  );

  // 3. تحديث الجلسة (ضروري جداً لاستبدال code-verifier بـ access-token)
  await supabase.auth.getUser();

  const { pathname } = req.nextUrl;
  const locales = ['en', 'ar'];

  // 4. فحص إذا كان الرابط يفتقد للغة
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    const redirectUrl = new URL(`/${locale}${pathname}`, req.url);
    
    // إنشاء استجابة التوجيه
    const redirectRes = NextResponse.redirect(redirectUrl);
    
    // الحل السحري: نقل كل الكوكيز من res (التي تم تحديثها بواسطة سوبابيس) إلى redirectRes
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, {
        path: '/',
        secure: true,
        sameSite: 'lax'
      });
    });
    
    return redirectRes;
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
}