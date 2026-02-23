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
            req.cookies.set(name, value);
           res.cookies.set(name, value, {
  ...options,
  path: '/',
  secure: true,
  sameSite: 'lax',
  // Adding the dot before the domain makes it work for both www and non-www
});
          });
        },
      },
    }
  );

  // تحديث الجلسة فوراً لاستبدال الـ code-verifier بجلسة حقيقية
  await supabase.auth.getUser();

  const { pathname } = req.nextUrl;
  const locales = ['en', 'ar'];
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    const redirectRes = NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
    
    // نقل الكوكيز يدوياً للاستجابة الجديدة لضمان عدم ضياع الجلسة
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
  // أضفنا "admin" داخل مجموعة الاستثناءات (?!...)
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|auth|admin|.*\\..*).*)'],
}