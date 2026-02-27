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

  // 1. استثناء مسارات الـ Auth والـ Static تماماً لضمان نجاح تسجيل الدخول [cite: 2026-02-27]
  if (pathname.includes('/auth/callback') || pathname.includes('/_next') || pathname.includes('/api')) {
    return res;
  }

  // 2. استخراج اللغة الحالية من المسار [cite: 2026-02-27]
  const locales = ['en', 'ar'];
  const lang = locales.find(l => pathname.startsWith(`/${l}`)) || 'en';

  // 3. جلب المستخدم (فقط للمسارات التي تحتاج حماية لتقليل الضغط) [cite: 2026-02-27]
  const { data: { user } } = await supabase.auth.getUser();

  // 4. حماية صفحة الـ Admin المترجمة [cite: 2026-02-27]
  if (pathname.includes('/admin') && !user) {
    return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url));
  }

  // 5. منع الوصول لصفحة الـ Login إذا كان المستخدم مسجلاً بالفعل [cite: 2026-02-27]
  if (pathname.includes('/auth/login') && user) {
    return NextResponse.redirect(new URL(`/${lang}/admin`, req.url));
  }

  // 6. نظام إضافة اللغة تلقائياً (Locale Routing) [cite: 2026-02-27]
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    const redirectRes = NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
    
    // نقل الكوكيز لضمان بقاء الجلسة نشطة أثناء التوجيه [cite: 2026-02-27]
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