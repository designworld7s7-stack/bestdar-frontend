'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, Mail } from 'lucide-react';
import OTPInput from './components/otp-input';

export default function VerifyPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const searchParams = useSearchParams();
  
  // Detect method from URL (e.g., /verify?type=email)
  const type = searchParams.get('type') || 'whatsapp'; 
  const target = searchParams.get('target') || (type === 'email' ? 'user@email.com' : '+964 000 000');

  return (
    <div className="min-h-screen w-full bg-[#F2F4F7] flex flex-col items-center justify-center p-4 sm:p-6">
      <div 
        style={{ maxWidth: '460px', width: '100%' }}
        className="bg-white rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E8F7F0] rounded-full mb-8 flex items-center justify-center">
            {/* Dynamic Icon based on the 'type' */}
            {type === 'whatsapp' ? (
              <MessageSquare className="text-[#12AD65] w-8 h-8 sm:w-10 sm:h-10" />
            ) : (
              <Mail className="text-[#12AD65] w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </div>

          <div className="text-center">
            <h1 className="text-[28px] sm:text-[36px] font-black text-black tracking-tighter mb-3 leading-tight">
              {isAr ? "تحقق من الرمز" : "Verify Your Account"}
            </h1>
            <p className="text-gray-400 font-medium text-[14px] sm:text-[16px] leading-relaxed max-w-[300px] mx-auto">
              {isAr 
                ? `أدخل الرمز المرسل إلى ${type === 'whatsapp' ? 'واتساب' : 'بريدك'}` 
                : `Enter the code we sent to your ${type}.`}
              <span className="block text-black font-black mt-1 break-all">{target}</span>
            </p>
          </div>
        </div>

        <OTPInput length={4} isAr={isAr} onComplete={(code) => console.log("Verifying:", code)} />

        <div className="mt-10 flex flex-col items-center">
          <button className="text-[#12AD65] text-[13px] sm:text-[14px] font-black uppercase tracking-[0.2em] hover:underline">
            {isAr ? "إعادة إرسال الرمز" : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}