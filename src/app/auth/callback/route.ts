import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/en';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // بناء الاستجابة أولاً
      const response = NextResponse.redirect(`${origin}${next}`);
      
      // هنا السر: التأكد من أن الكوكيز الخاصة بـ Supabase تم تثبيتها في الاستجابة
      // السيرفر يقوم بذلك تلقائياً عبر createClient، ولكن الـ Redirect يحتاج أحياناً لوقت
      return response;
    }
  }

  // في حال الفشل
  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}