import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// أضفنا { params } لاستقبال اللغة من المسار [cite: 2026-02-27]
export async function GET(request: Request, { params }: { params: { lang: string } }) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // نستخدم اللغة الحالية من الرابط بدلاً من فرض /en [cite: 2026-02-27]
  const lang = params.lang || 'en'; 
  const next = searchParams.get('next') || `/${lang}/admin`;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.session) {
      // بناء رابط التوجيه مع الحفاظ على اللغة المكتشفة [cite: 2026-02-27]
      const targetUrl = next.startsWith(`/${lang}`) 
        ? next 
        : `/${lang}${next.startsWith('/') ? next : '/' + next}`;

      return NextResponse.redirect(`${origin}${targetUrl}`);
    }
  }

  // في حال الفشل، نعود لصفحة الدخول باللغة الصحيحة [cite: 2026-02-27]
  return NextResponse.redirect(`${origin}/${lang}/auth/login?error=auth_failed`);
}