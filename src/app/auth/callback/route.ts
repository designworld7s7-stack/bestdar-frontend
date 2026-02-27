import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // 1. اكتشاف اللغة من الكوكيز أو المسار الافتراضي [cite: 2026-02-27]
  const lang = request.cookies.get('NEXT_LOCALE')?.value || 'en';
  
  // 2. تحديد صفحة التوجيه (الأدمن باللغة الصحيحة) [cite: 2026-02-27]
  const next = searchParams.get('next') || `/${lang}/admin`;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.session) {
      // 3. التوجيه النهائي للمسار المترجم [cite: 2026-02-27]
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // في حال الفشل، العودة لصفحة الدخول [cite: 2026-02-27]
  return NextResponse.redirect(`${origin}/${lang}/auth/login?error=auth_failed`);
}