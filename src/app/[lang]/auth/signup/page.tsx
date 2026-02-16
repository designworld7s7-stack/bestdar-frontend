'use client';

import React, { useState, use } from 'react';
import { MessageSquare, User, Phone, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function SignUpPage({ params }: { params: Promise<{ lang: string }> }) {
  
  const resolvedParams = use(params);
  const lang = resolvedParams.lang;
  const isAr = lang === 'ar';

  const router = useRouter();
  const supabase = createClient();

  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('+964');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

    const fullPhone = `${countryCode}${formData.phone.replace(/\s/g, '')}`;
const redirectUrl = `${window.location.origin}/auth/callback?next=/profile`;
    // Pure Passwordless Sign Up
    const { error } = method === 'email' 
    ? await supabase.auth.signInWithOtp({ 
        email: formData.email,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: formData.fullName,
            phone: fullPhone, // حفظ الرقم حتى عند التسجيل بالإيميل
            role: 'investor', // تحديد الدور فوراً عند التسجيل
            country: countryCode === '+964' ? 'Iraq' : 'UAE'
          }
        }
      })
      : await supabase.auth.signInWithOtp({ 
          phone: fullPhone,
          options: {
            channel: 'whatsapp',
            data: {
              full_name: formData.fullName,
              country: countryCode === '+964' ? 'Iraq' : 'UAE'
            }
          }
        });

   if (error) {
    // عرض رسائل خطأ مفهومة للمستخدم
    if (error.message.includes("rate limit")) {
      alert(isAr ? "محاولات كثيرة جداً. يرجى الانتظار قليلاً." : "Too many attempts. Please wait.");
    } else {
      alert(error.message);
    }
    setLoading(false);
  } else {
    if (method === 'email') {
      setMagicLinkSent(true);
      setLoading(false);
    } else {
      router.push(`/${lang}/auth/verify?method=phone&identifier=${fullPhone}`);
    }
  }
};

 const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // نفس رابط التوجيه الموحد
      redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
    
   if (error) {
    alert(isAr ? "فشل تسجيل الدخول عبر جوجل" : "Google login failed");
  }
};

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4">
      <div style={{ maxWidth: '480px', width: '100%' }} className="bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl">
        
        <div className="text-center mb-10">
          <h1 className="text-[28px] font-medium text-black tracking-tight mb-2 uppercase">
            {isAr ? "إنشاء حساب مستثمر" : "Create Investor Account"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isAr ? "انضم إلى بست دار وابدأ استثمارك اليوم" : "Join Best Dar and start your investment journey."}
          </p>
        </div>

        {magicLinkSent ? (
          <div className="text-center space-y-6 animate-in fade-in zoom-in">
             <div className="w-20 h-20 bg-[#12AD65]/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="text-[#12AD65]" size={40} />
             </div>
             <div className="space-y-2">
                <h2 className="text-xl font-bold text-black">{isAr ? "افتح بريدك الإلكتروني" : "Check Your Email"}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                   {isAr 
                    ? `أرسلنا رابطاً سحرياً إلى ${formData.email}. اضغط عليه لتأكيد حسابك.` 
                    : `We sent a magic link to ${formData.email}. Click it to verify your account.`}
                </p>
             </div>
             <button onClick={() => setMagicLinkSent(false)} className="text-[#12AD65] font-bold text-xs uppercase tracking-widest hover:underline">
                {isAr ? "تغيير البريد الإلكتروني" : "Change Email Address"}
             </button>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-gray-400 px-1">{isAr ? "الاسم الكامل" : "Full Name"}</label>
              <div className="relative">
                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} type="text" placeholder="John Doe" className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 font-bold" />
              </div>
            </div>

            {method === 'email' ? (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-[11px] font-bold uppercase text-gray-400 px-1">{isAr ? "البريد الإلكتروني" : "Email"}</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl border border-gray-100 outline-none font-bold" />
                </div>
                <p className="text-[10px] text-gray-400 px-2 mt-1">
                  {isAr ? "سنرسل رابطاً سحرياً لبريدك لتفعيل الحساب فوراً." : "We'll send a magic link to your email for instant activation."}
                </p>
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-[11px] font-bold uppercase text-gray-400 px-1">
                  {isAr ? "رقم الهاتف (واتساب)" : "Phone Number (WhatsApp)"}
                </label>
                <div className="flex gap-3">
                  <div className="relative w-28 shrink-0">
                    <input 
                      type="text" 
                      value={countryCode}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val && !val.startsWith('+')) val = '+' + val;
                        setCountryCode(val);
                      }}
                      className="w-full bg-[#FAFAFA] px-4 py-4 rounded-2xl border border-gray-100 outline-none font-bold text-[15px] text-center"
                    />
                  </div>

                  <div className="relative flex-1">
                    <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      placeholder="770 000 0000" 
                      className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl border border-gray-100 outline-none font-bold text-[15px]" 
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#12AD65] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all flex justify-center items-center shadow-lg shadow-[#12AD65]/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : (isAr ? "إنشاء حساب" : "Create Account")}
            </button>
          </form>
        )}

        <div className="relative my-10 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-100"></div>
          <span className="relative bg-white px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            {isAr ? "أو" : "OR"}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={() => setMethod(method === 'email' ? 'phone' : 'email')}
            className="w-full bg-white text-black py-5 rounded-2xl font-bold border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-4 shadow-sm"
          >
            {method === 'email' ? <MessageSquare size={20} className="text-[#12AD65]" /> : <Mail size={20} className="text-[#12AD65]" />}
            <span>{method === 'email' ? (isAr ? "سجل عبر واتساب" : "WhatsApp Sign Up") : (isAr ? "سجل عبر البريد" : "Email Sign Up")}</span>
          </button>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-5 rounded-2xl font-bold border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-4 shadow-sm"
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

        <p className="mt-10 text-center text-sm font-medium">
          <span className="opacity-50">{isAr ? "لديك حساب؟" : "Already have an account?"}</span>
          <Link href={`/${lang}/auth/login`} className="text-[#12AD65] font-bold ml-2 underline">
            {isAr ? "دخول" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  ); 
}