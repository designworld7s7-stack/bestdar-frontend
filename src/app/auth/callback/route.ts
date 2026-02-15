import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // التوجيه الافتراضي للرئيسية إذا لم يحدد المسار
  const next = searchParams.get('next') || '/en'; 

  if (code) {
    const supabase = await createClient();
    
    // الحل هنا: استخراج 'error' من الدالة لكي يتعرف عليها الـ 'if' التالي
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // العودة لصفحة الدخول في حال فشل الكود أو الرابط
  return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
}