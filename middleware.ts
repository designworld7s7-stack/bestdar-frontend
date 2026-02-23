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

  // 1. استرجاع المستخدم (ضروري للأمان)
  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = req.nextUrl;

  // --- [الجزء الأول: حماية صفحة الأدمن] ---
  
  // إذا حاول دخول الأدمن وهو غير مسجل دخول
  if (pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // إذا كان مسجلاً للدخول وحاول دخول صفحة الـ Login مرة أخرى، أعده للأدمن
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // --- [الجزء الثاني: نظام اللغات (Locale Routing)] ---

  // نستثني روابط الأدمن والـ Login من إضافة /en/ أو /ar/ تلقائياً لتبقى نظيفة
  const isAuthRoute = pathname.startsWith('/admin') || pathname.startsWith('/login');
  
  if (!isAuthRoute) {
    const locales = ['en', 'ar'];
    const pathnameIsMissingLocale = locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
      const redirectRes = NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
      
      // مزامنة الكوكيز لضمان بقاء الجلسة
      res.cookies.getAll().forEach((cookie) => {
        redirectRes.cookies.set(cookie.name, cookie.value, { 
          path: '/', secure: true, sameSite: 'lax' 
        });
      });
      return redirectRes;
    }
  }

  return res;
}

export const config = {
  // التعديل الجوهري: أزلنا admin و login من الاستثناءات لكي يراقبهم الـ Middleware
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)'],
}