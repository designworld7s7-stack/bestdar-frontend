import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/'; // المسار المستهدف

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user) {
      // نضمن دائماً وجود /en/ قبل المسار لمنع الـ 404
      const isNewUser = data.user.created_at === data.user.last_sign_in_at;
      const targetPath = isNewUser ? `/en/profile` : `/en${next === '/' ? '' : next}`;
      
      return NextResponse.redirect(`${origin}${targetPath}`);
    }
  }

  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}