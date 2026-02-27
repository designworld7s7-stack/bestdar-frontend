'use client';

import React, { useState, use } from 'react';
import { MessageSquare, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params); 
  const lang = resolvedParams.lang;
  const isAr = lang === 'ar';

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // Capture where the user came from (from your middleware)
  const nextRoute = searchParams.get('next') || `/${lang}`;

  // 1. Updated handleLogin to use Magic Link with "No Sign-up" logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // استخدام اسم فريد 'loginError' لتجنب مشاكل TypeScript
    const { error: loginError } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false, // يمنع إنشاء حساب جديد من صفحة تسجيل الدخول
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${nextRoute}`,
      },
    });

    if (!loginError) {
      setMagicLinkSent(true);
      setLoading(false);
    } else {
      // تخصيص الرسالة إذا كان المستخدم غير موجود في النظام
      const isNotFound = loginError.message.toLowerCase().includes("not found") || loginError.status === 400;
      const msg = isAr 
        ? (isNotFound ? "هذا الحساب غير موجود، يرجى إنشاء حساب أولاً" : loginError.message)
        : (isNotFound ? "Account not found. Please sign up first." : loginError.message);

      setErrorMsg(msg);
      setLoading(false);
    }
  };

  const handleWhatsAppLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    const cleanPhone = "+9647759147343".replace(/\s/g, ''); 

    const { error: waError } = await supabase.auth.signInWithOtp({
      phone: cleanPhone,
      options: {
        shouldCreateUser: false, // يمنع إنشاء حساب جديد عبر واتساب من هنا
        channel: 'whatsapp',
      }
    });

    if (waError) {
      const isNotFound = waError.message.toLowerCase().includes("not found") || waError.status === 400;
      const msg = isAr 
        ? (isNotFound ? "رقم الهاتف غير مسجل، يرجى إنشاء حساب أولاً" : "فشل إرسال الرمز")
        : (isNotFound ? "Phone number not registered. Please sign up first." : "Failed to send code");
      
      setErrorMsg(msg);
      setLoading(false);
    } else {
      router.push(`/${lang}/auth/verify?method=phone&identifier=${cleanPhone}`);
    }
  };

 const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // ✅ التوجه للمسار العام (Root) لمنع الـ 404 [cite: 2026-02-27]
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) console.error(error.message);
};

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
      <div 
        style={{ maxWidth: '460px', width: '100%' }}
        className="bg-white rounded-[32px] sm:rounded-[48px] p-7 sm:p-12 lg:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col"
      >
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-[26px] sm:text-[40px] font-medium text-black tracking-[0.1em] mb-2 leading-tight uppercase">
            {isAr ? "دخول المستثمر" : "Investor Login"}
          </h1>
          <p className="text-[#4B5563] font-medium text-[13px] sm:text-[16px] leading-relaxed max-w-[280px] mx-auto">
            {isAr ? "مرحباً بك مجدداً في أفضل دار" : "Welcome back to Best Dar. Access your dashboard."}
          </p>
        </div>

        {magicLinkSent ? (
          <div className="text-center space-y-4 animate-in fade-in zoom-in">
            <div className="bg-[#12AD65]/10 p-4 rounded-2xl">
              <p className="text-[#12AD65] font-bold">
                {isAr ? "تفقد بريدك الإلكتروني!" : "Check your email!"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isAr ? "أرسلنا رابط دخول سحري إلى " : "We sent a magic login link to "} <br/>
                <span className="font-bold">{email}</span>
              </p>
            </div>
            <button onClick={() => setMagicLinkSent(false)} className="text-xs text-gray-400 hover:text-black underline">
              {isAr ? "استخدام بريد مختلف" : "Use a different email"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}

           <div className="flex flex-col gap-2">
  <label className="text-[12px] font-medium uppercase tracking-tight text-[#4B5563] px-1">
    {isAr ? "البريد الإلكتروني" : "Email Address"}
  </label>
  <div className="relative">
    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
    <input 
      required
      type="email" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="name@example.com"
      className="w-full bg-[#FAFAFA] pl-14 pr-7 py-4.5 rounded-2xl text-[16px] font-bold shadow-sm border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 text-black" 
    />
  </div>
  
  {/* نص توضيحي للمستثمر */}
  <p className="text-[11px] text-gray-400 px-2 mt-1 leading-relaxed">
    {isAr 
      ? "سنرسل لك رابطاً آمناً إلى بريدك؛ اضغط عليه لتسجيل الدخول فوراً دون الحاجة لكلمة مرور." 
      : "We'll email you a secure link; click it to log in instantly without a password."}
  </p>
</div>
            <button 
              disabled={loading}
              className="w-full bg-[#12AD65] text-white py-5 sm:py-6 rounded-2xl font-medium text-[13px] sm:text-[14px] uppercase tracking-tight shadow-[0_25px_50px_rgba(18,173,101,0.25)] hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isAr ? "إرسال رابط الدخول" : "Send Magic Link")}
            </button>
          </form>
        )}

        <div className="relative my-10 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-100"></div>
          <span className="relative bg-white px-5 text-[12px] font-medium uppercase tracking-tight text-[#6B7280]">
            {isAr ? "أو" : "OR"}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={handleWhatsAppLogin}
            className="w-full bg-white text-gray-800 py-5 rounded-2xl font-medium text-[12px] uppercase tracking-tight flex items-center justify-center gap-4 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <MessageSquare size={20} className="text-[#12AD65]" />
            <span>{isAr ? "دخول عبر واتساب" : "Login with WhatsApp"}</span>
          </button>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-800 py-5 rounded-2xl font-medium text-[12px] uppercase tracking-tight flex items-center justify-center gap-4 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{isAr ? "متابعة باستخدام جوجل" : "Continue with Google"}</span>
          </button>
        </div>

        <p className="mt-10 text-center text-[13px] sm:text-[14px] font-medium text-[#4B5563]">
          {isAr ? "ليس لديك حساب؟ " : "No account? "}
          <Link href={`/${lang}/auth/signup`} className="text-[#12AD65] font-medium uppercase tracking-tighter hover:underline">
            {isAr ? "إنشاء حساب" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}