'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const lang = params.lang; // Now 'lang' is defined for your links

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
      
      {/* BOUTIQUE CARD: Smaller padding on mobile (p-6) */}
      <div 
        style={{ maxWidth: '460px', width: '100%' }}
        className="bg-white rounded-[32px] sm:rounded-[48px] p-7 sm:p-12 lg:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col"
      >
        
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-[26px] sm:text-[40px] font-medium text-black tracking-[0.1em] mb-2 leading-tight">
            {isAr ? "تسجيل الدخول" : "Log In"}
          </h1>
          <p className="text-[#4B5563] font-medium text-[13px] sm:text-[16px] leading-relaxed max-w-[280px] mx-auto">
            {isAr ? "مرحباً بك مجدداً في لوحة تحكم المستثمر" : "Welcome back. Access your investor dashboard."}
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6">
          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] sm:text-[12px] font-medium uppercase tracking-tight text-[#4B5563] px-1">
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <input 
              type="email" 
              placeholder="name@example.com"
              className="w-full bg-[#FAFAFA] px-5 sm:px-7 py-3.5 sm:py-4.5 rounded-2xl text-[14px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 transition-all" 
            />
          </div>

          {/* Password Section */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] sm:text-[12px] font-medium uppercase tracking-tight text-[#4B5563]">
                {isAr ? "كلمة المرور" : "Password"}
              </label>
             <Link href={`/${lang}/auth/forgot-password`}>
  {isAr ? "نسيت كلمة المرور؟" : "Forgot Password?"}
</Link>
</div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-[#FAFAFA] px-5 sm:px-7 py-3.5 sm:py-4.5 rounded-2xl text-[14px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 transition-all" 
            />
          </div>

          {/* Login Button */}
          <div className="pt-2 sm:pt-4">
            <button className="w-full btn-brand py-5 sm:py-6 rounded-2xl font-medium text-[13px] sm:text-[14px] uppercase tracking-tight shadow-[0_25px_50px_rgba(18,173,101,0.25)] hover:bg-black transition-all active:scale-95">
              {isAr ? "دخول" : "Login"}
            </button>
          </div>
        </form>

        {/* Separator */}
        <div className="relative my-10 flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-100"></div>
            <span className="relative bg-white px-5 text-[12px] font-medium uppercase tracking-tight text-[#6B7280]">OR</span>
        </div>

        {/* WhatsApp Button */}
        <button className="w-full bg-white text-gray-800 py-4.5 sm:py-5 rounded-2xl font-medium text-[11px] sm:text-[12px] uppercase tracking-tight flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100">
          <MessageSquare size={20} className="text-[#12AD65]" />
          <span>WhatsApp</span>
        </button>

        <p className="mt-10 text-center text-[13px] sm:text-[14px] font-medium text-[#4B5563]">
          <Link href={`/${params.lang}/auth/signup`} className="text-[#12AD65] font-medium uppercase tracking-tighter hover:underline">
            {isAr ? "إنشاء حساب" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}