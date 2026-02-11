'use client';

import React from 'react';
import { CheckCircle2, RotateCw } from 'lucide-react';

export default function SuccessStep({ isAr, email, onResend }: { isAr: boolean, email: string, onResend: () => void }) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-[#E8F7F0] rounded-full flex items-center justify-center text-[#12AD65]">
        <CheckCircle2 size={40} />
      </div>

      <div className="space-y-3">
        <h1 className="text-[28px] font-medium tracking-[0.1em] text-black">
          {isAr ? "تم الإرسال بنجاح" : "Check Your Email"}
        </h1>
        <p className="text-[#4B5563] font-medium text-[15px] leading-relaxed px-4">
          {isAr ? `لقد أرسلنا رمز التحقق إلى ${email}` : `We sent a verification code to ${email}`}
        </p>
      </div>

      <button 
        onClick={onResend}
        className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-tighter text-[#12AD65] hover:text-black transition-colors"
      >
        <RotateCw size={14} />
        {isAr ? "إعادة إرسال الرمز" : "Resend Code"}
      </button>
    </div>
  );
}