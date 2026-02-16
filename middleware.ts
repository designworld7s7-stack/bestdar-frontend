import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

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
        // تحديث الكوكيز في الطلب لضمان تعرف السيرفر عليها فوراً
        req.cookies.set(name, value);
        // تحديث الكوكيز في الاستجابة مع ضبط إعدادات النطاق الحي
        res.cookies.set(name, value, {
          ...options,
          
          secure: true,           // ضروري جداً لروابط https
          sameSite: 'lax',
          path: '/',
        });
      });
    },
  },
}
  );

  // تحديث الجلسة: هذا السطر هو المسؤول عن جعل النظام "يتعرف" على دورك (Role)
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;
  const locales = ['en', 'ar'];

  // 1. معالجة اللغة (Locale Redirection)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    const redirectRes = NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
    // نقل الكوكيز لضمان التعرف على المستخدم بعد التوجيه
    res.cookies.getAll().forEach((cookie) => redirectRes.cookies.set(cookie.name, cookie.value));
    return redirectRes;
  }

  // ملاحظة: قمنا بإزالة حماية "investor-club" ليتمكن الجميع من الدخول
  // النظام الآن سيقرأ الـ user وإذا كان موجوداً سيعرف دوره (Investor أو User)
  // وإذا لم يكن موجوداً سيعاملك كـ Guest تلقائياً دون منعك من الدخول

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
}