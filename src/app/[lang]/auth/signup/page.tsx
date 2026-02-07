'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [countryCode, setCountryCode] = useState('+964');

  const getCountryName = (code: string) => {
    if (code === '+964') return isAr ? "العراق" : "Iraq";
    if (code === '+971') return isAr ? "الإمارات" : "UAE";
    return "";
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
      
      {/* 1. RESPONSIVE CARD: Smaller padding on mobile */}
      <div 
        style={{ maxWidth: '480px', width: '100%' }}
        className="bg-white rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col"
      >
        
        <div className="text-center mb-10">
          <h1 className="text-[28px] sm:text-[36px] font-black text-black tracking-tighter mb-3 leading-tight">
            {isAr ? "إنشاء حسابك" : "Create Your Account"}
          </h1>
          <p className="text-gray-400 font-medium text-[14px] sm:text-[16px] leading-relaxed max-w-[300px] mx-auto">
            {isAr ? "وصول حصري للمستثمرين العراقيين." : "Exclusive access for Iraqi investors."}
          </p>
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
              {isAr ? "الاسم الكامل" : "Full Name"}
            </label>
            <input 
              type="text" 
              placeholder={isAr ? "الاسم الكامل" : "Enter your name"}
              className="w-full bg-[#FAFAFA] px-6 py-4 rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
            />
          </div>

          {/* PHONE: Balanced inputs */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
              {isAr ? "رقم الهاتف" : "Phone Number"}
            </label>
            <div className="flex gap-3 items-start">
              {/* Code input matches height of the main phone input */}
              <div className="relative w-24 shrink-0">
                <input 
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full bg-[#FAFAFA] px-2 py-4 rounded-2xl text-[15px] sm:text-[16px] font-bold text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none"
                />
                <span className="absolute -bottom-5 left-0 w-full text-center text-[9px] font-black uppercase text-[#12AD65] tracking-widest">
                  {getCountryName(countryCode)}
                </span>
              </div>
              <input 
                type="tel" 
                placeholder="770 000 0000" 
                className="flex-1 min-w-0 bg-[#FAFAFA] px-6 py-4 rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <input 
              type="email" 
              className="w-full bg-[#FAFAFA] px-6 py-4 rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
              {isAr ? "كلمة المرور" : "Password"}
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-[#FAFAFA] px-6 py-4 rounded-2xl text-[15px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" 
            />
          </div>

          {/* Primary Action Button */}
          <div className="pt-4">
            <button className="w-full bg-[#12AD65] text-white py-5 rounded-2xl font-black text-[13px] sm:text-[14px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(18,173,101,0.25)] hover:bg-black transition-all">
              {isAr ? "إنشاء حساب" : "Create Account"}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="relative my-10 flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-100"></div>
            <span className="relative bg-white px-6 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">OR</span>
        </div>

        {/* WhatsApp Button */}
        <button className="w-full bg-white text-gray-800 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100">
          <MessageSquare size={20} className="text-[#12AD65]" />
          <span>WhatsApp</span>
        </button>

        <p className="mt-10 text-center text-[14px] font-bold text-gray-400">
          <Link href={`/${params.lang}/auth/login`} className="text-[#12AD65] font-black uppercase tracking-widest hover:underline">
            {isAr ? "تسجيل الدخول" : "Log In"}
          </Link>
        </p>
      </div>
    </div>
  );
}