'use client';

import React from 'react';
import { Check } from 'lucide-react';

// Explicitly define what this component accepts
interface SuccessStepProps {
  isAr: boolean;
  email: string;
  onResend: () => void;
}

export default function SuccessStep({ isAr, email, onResend }: SuccessStepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-[#E8F7F0] rounded-full mb-8 flex items-center justify-center">
        <Check className="text-[#12AD65] w-10 h-10" strokeWidth={3} />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-[36px] font-black text-black tracking-tighter mb-3">
          {isAr ? "تحقق من بريدك" : "Check Your Email"}
        </h1>
        <p className="text-gray-400 font-medium text-[16px] max-w-[300px]">
          {isAr ? "لقد أرسلنا الرابط إلى" : "We sent a link to"} 
          <span className="block text-black font-black mt-1">{email}</span>
        </p>
      </div>

      <button 
        onClick={onResend}
        className="text-[#12AD65] text-[14px] font-black uppercase tracking-[0.2em] hover:underline"
      >
        {isAr ? "إعادة إرسال" : "Resend Link"}
      </button>
    </div>
  );
}