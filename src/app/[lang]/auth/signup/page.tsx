'use client';

import React, { useState } from 'react';
import { MessageSquare, User, Phone, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const router = useRouter(); // [cite: 2026-02-04]
  const [countryCode, setCountryCode] = useState('+964');

  const getCountryName = (code: string) => {
    if (code === '+964') return isAr ? "العراق" : "Iraq";
    if (code === '+971') return isAr ? "الإمارات" : "UAE";
    return "";
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and save user data here [cite: 2026-02-04]
    router.push(`/${params.lang}/auth/verify`); // [cite: 2026-02-07]
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
      
      {/* 1. BOUTIQUE CARD [cite: 2026-02-04] */}
      <div 
        style={{ maxWidth: '480px', width: '100%' }}
        className="bg-white rounded-[32px] sm:rounded-[48px] p-7 sm:p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col"
      >
        
        <div className="text-center mb-10">
          <h1 className="text-[28px] sm:text-[36px] font-medium text-black tracking-[0.1em] mb-3 leading-tight">
            {isAr ? "إنشاء حسابك" : "Create Your Account"}
          </h1>
          <p className="text-[#4B5563] font-medium text-[14px] sm:text-[16px] leading-relaxed max-w-[300px] mx-auto">
            {isAr ? "وصول حصري للمستثمرين العراقيين." : "Exclusive access for Iraqi investors."}
          </p>
        </div>

        {/* 2. FORM INTEGRATION [cite: 2026-02-04] */}
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium uppercase tracking-tight text-[#6B7280] px-1">
              {isAr ? "الاسم الكامل" : "Full Name"}
            </label>
            <div className="relative">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input 
                required
                type="text" 
                placeholder={isAr ? "الاسم الكامل" : "Enter your name"}
                className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl text-[15px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10" 
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium uppercase tracking-tight text-[#6B7280] px-1">
              {isAr ? "رقم الهاتف" : "Phone Number"}
            </label>
            <div className="flex gap-3">
              <div className="relative w-24 shrink-0">
                <input 
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full bg-[#FAFAFA] px-2 py-4 rounded-2xl text-[15px] font-bold text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none"
                />
                <span className="absolute -bottom-5 left-0 w-full text-center text-[9px] font-medium uppercase text-[#12AD65] tracking-tighter">
                  {getCountryName(countryCode)}
                </span>
              </div>
              <input 
                required
                type="tel" 
                placeholder="770 000 0000" 
                className="flex-1 bg-[#FAFAFA] px-6 py-4 rounded-2xl text-[15px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium uppercase tracking-tight text-[#6B7280] px-1">
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input 
                required
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl text-[15px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 pb-2">
            <label className="text-[12px] font-medium uppercase tracking-tight text-[#6B7280] px-1">
              {isAr ? "كلمة المرور" : "Password"}
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl text-[15px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full btn-brand py-5 rounded-2xl font-medium text-[13px] uppercase tracking-tight shadow-[0_20px_40px_rgba(18,173,101,0.25)] hover:bg-black transition-all active:scale-[0.98]"
          >
            {isAr ? "إنشاء حساب" : "Create Account"}
          </button>
        </form>

        {/* 3. SECONDARY ACTIONS [cite: 2026-02-04] */}
        <div className="relative my-10 flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-100"></div>
            <span className="relative bg-white px-6 text-[11px] font-medium uppercase tracking-[0.4em] text-[#6B7280]">OR</span>
        </div>

        <button className="w-full bg-white text-gray-800 py-5 rounded-2xl font-medium text-[12px] uppercase tracking-tight flex items-center justify-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:bg-gray-50 transition-all">
          <MessageSquare size={20} className="text-[#12AD65]" />
          <span>{isAr ? "واتساب" : "WhatsApp"}</span>
        </button>

        <p className="mt-10 text-center text-[14px] font-medium text-[#4B5563]">
          <span className="opacity-50">{isAr ? "لديك حساب بالفعل؟" : "Already have an account?"}</span>{' '}
          <Link href={`/${params.lang}/auth/login`} className="text-[#12AD65] font-medium uppercase tracking-tighter hover:underline ml-1">
            {isAr ? "تسجيل الدخول" : "Log In"}
          </Link>
        </p>
      </div>
    </div>
  );
}