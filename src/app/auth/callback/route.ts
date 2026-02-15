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
      // استخدام origin من الطلب يضمن التوجيه لـ https://bestdar.com
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // في حال الفشل، تأكد من التوجيه للمسار الصحيح مع اللغة
  return NextResponse.redirect(`${origin}/en/login?error=auth_failed`);
}