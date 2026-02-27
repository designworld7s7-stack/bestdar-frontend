import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

// في Next.js 15، الـ params هي Promise دائماً
export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ lang: string }> }
) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // استخراج اللغة ديناميكياً من المسار
  const { lang } = await params; 
  const next = searchParams.get('next') || `/${lang}/admin`;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.session) {
      // بناء رابط التوجيه النهائي مع الحفاظ على اللغة
      const targetUrl = next.startsWith(`/${lang}`) 
        ? next 
        : `/${lang}${next.startsWith('/') ? next : '/' + next}`;

      return NextResponse.redirect(`${origin}${targetUrl}`);
    }
  }

  // في حال الفشل، نعود لصفحة الدخول بنفس اللغة
  return NextResponse.redirect(`${origin}/${lang}/auth/login?error=auth_failed`);
}