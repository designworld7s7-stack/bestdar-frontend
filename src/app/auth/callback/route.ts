import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // 1. جلب اللغة من الكوكيز (للمستخدمين)
  const lang = request.cookies.get('NEXT_LOCALE')?.value || 'en';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // ✅ النجاح: جوجل للمستخدمين فقط، لذا نرسلهم للرئيسية المترجمة [cite: 2026-02-27]
      return NextResponse.redirect(`${origin}/${lang}`);
    }
  }

  // ⚠️ الفشل: بما أن جوجل للمستخدمين، نرسلهم لصفحة دخول "المستخدمين" المترجمة [cite: 2026-02-27]
  // تأكد أن هذا المسار موجود: src/app/[lang]/login/page.tsx
  return NextResponse.redirect(`${origin}/${lang}/login?error=auth_failed`);
}