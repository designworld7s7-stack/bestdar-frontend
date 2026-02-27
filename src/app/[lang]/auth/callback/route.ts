import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ lang: string }> }
) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const { lang } = await params;
  
  // إذا كان هناك رمز (Code)، نقوم بتبديله بجلسة [cite: 2026-02-27]
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // بعد النجاح، نتوجه لصفحة الأدمن باللغة الصحيحة [cite: 2026-02-27]
      return NextResponse.redirect(`${origin}/${lang}/admin`);
    }
  }

  // في حال الفشل أو عدم وجود كود، نعود للوجن مع رسالة خطأ [cite: 2026-02-27]
  return NextResponse.redirect(`${origin}/${lang}/auth/login?error=auth_callback_failed`);
}