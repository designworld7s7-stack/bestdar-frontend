import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // نستخدم /en كمسار افتراضي لمنع الـ 404
  const next = searchParams.get('next') || '/en';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.session) {
      // بناء رابط التوجيه مع التأكد من وجود اللغة
      const targetUrl = next.startsWith('/en') || next.startsWith('/ar') 
        ? next 
        : `/en${next}`;

      const response = NextResponse.redirect(`${origin}${targetUrl}`);
      return response;
    }
  }

  // في حال الفشل نعود لصفحة الدخول مع اللغة لمنع الـ 404
  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}