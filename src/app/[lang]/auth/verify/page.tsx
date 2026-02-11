'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // FIX 5: Missing import

export default function VerifyPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const router = useRouter(); // FIX 6: Initialize router
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]); // FIX 7: Missing useRef

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input [cite: 2026-02-04]
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    
    // Auto-redirect when 4 digits are entered [cite: 2026-02-04]
    if (newCode.every(digit => digit !== "") && value !== "") {
      router.push(`/${params.lang}/profile`); // Success redirect [cite: 2026-02-07]
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F2F4F7]">
      <div className="w-full max-w-[460px] bg-white rounded-[48px] p-10 sm:p-16 shadow-premium text-center space-y-10">
        <div className="space-y-3">
          <h1 className="text-[32px] font-medium tracking-[0.1em] text-black leading-tight">
            {isAr ? "تحقق من حسابك" : "Verify Account"}
          </h1>
          <p className="text-[#4B5563] font-medium text-[15px]">
            {isAr ? "أدخل الرمز المرسل عبر واتساب أو البريد." : "Enter the code sent via WhatsApp or Email."}
          </p>
        </div>

        {/* OTP Input Grid [cite: 2026-02-04] */}
        <div className="flex justify-center gap-4" dir="ltr">
          {code.map((digit, i) => (
           <input
  key={i}
  // FIX: Added curly braces to ensure the function returns void
  ref={(el) => { inputs.current[i] = el; }} 
  type="text"
  inputMode="numeric"
  value={digit}
  onChange={(e) => handleChange(e.target.value, i)}
  className="w-14 h-16 bg-[#FAFAFA] rounded-2xl text-center text-xl font-medium shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 focus:ring-2 focus:ring-[#12AD65]/20 outline-none transition-all"
/>
          ))}
        </div>

        <button className="text-[12px] font-medium uppercase tracking-tighter text-[#12AD65] hover:text-black transition-colors">
          {isAr ? "إعادة إرسال الرمز" : "Resend Verification Code"}
        </button>
      </div>
    </div>
  );
}