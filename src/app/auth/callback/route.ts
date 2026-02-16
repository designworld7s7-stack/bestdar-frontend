import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // استعادة منطق التوجيه السابق
  const next = searchParams.get('next');

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user) {
      // إذا كان المستخدم جديداً (سجل الآن)، وجهه للملف الشخصي
      const isNewUser = data.user.created_at === data.user.last_sign_in_at;
      const targetPath = next ? next : (isNewUser ? '/en/profile' : '/en');
      
      const response = NextResponse.redirect(`${origin}${targetPath}`);
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}