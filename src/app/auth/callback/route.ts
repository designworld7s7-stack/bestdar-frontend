import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Ensuring we always have a valid path to avoid 404s
  const next = searchParams.get('next') || '/en'; 

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.session) {
      // Create response first to ensure cookies are attached
      const response = NextResponse.redirect(`${origin}${next}`);
      return response;
    }
  }

  // If it fails, go to login with an error
  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}