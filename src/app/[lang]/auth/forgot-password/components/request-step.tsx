'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function RequestStep({ isAr, onNext }: { isAr: boolean, onNext: (email: string) => void }) {
  const [email, setEmail] = useState('');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-3">
        <h1 className="text-[32px] font-medium tracking-[0.1em] text-black leading-tight">
          {isAr ? "نسيت كلمة المرور؟" : "Forgot Password?"}
        </h1>
        <p className="text-[#4B5563] font-medium text-[15px]">
          {isAr ? "أدخل بريدك الإلكتروني لإرسال رمز التحقق." : "Enter your email to receive a verification code."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[12px] font-medium uppercase tracking-tight text-[#6B7280] px-1">
            {isAr ? "البريد الإلكتروني" : "Email Address"}
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#FAFAFA] pl-16 pr-6 py-5 rounded-[24px] text-[15px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 transition-all"
            />
          </div>
        </div>

        <button 
          onClick={() => email && onNext(email)}
          className="w-full py-5 rounded-[24px] btn-brand font-medium text-[14px] uppercase tracking-tighter shadow-xl hover:bg-black transition-all active:scale-[0.98]"
        >
          {isAr ? "إرسال الرمز" : "Send Code"}
        </button>
      </div>
    </div>
  );
}