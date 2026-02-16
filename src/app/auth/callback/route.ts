import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/en';

  if (code) {
    const supabase = await createClient();
    // تبادل الكود بالجلسة
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // بناء رابط التوجيه بدقة لضمان عدم فقدان الكوكيز
      const redirectUrl = new URL(next, origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // في حال الفشل
  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}