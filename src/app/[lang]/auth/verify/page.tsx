'use client';

import React, { useState, useRef, use } from 'react'; // Added 'use'
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function VerifyPage({ params }: { params: Promise<{ lang: string }> }) {
  // 1. UNWRAP PARAMS FIRST
  const resolvedParams = use(params);
  const lang = resolvedParams.lang;
  const isAr = lang === 'ar';

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // 2. DATA FROM SIGNUP
  const method = searchParams.get('method'); 
  const identifier = searchParams.get('identifier');

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = async (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    
    // 3. AUTO-VERIFY
    if (newCode.every(digit => digit !== "") && value !== "") {
    setLoading(true);
const otpToken = newCode.join("");

// 1. Ensure the phone number has a '+' prefix
const formattedIdentifier = method === 'phone' && !identifier?.startsWith('+') 
  ? `+${identifier}` 
  : identifier;

// 2. Prepare params with 'sms' as a fallback type
const verifyParams = method === 'phone' 
  ? {
      phone: formattedIdentifier as string,
      token: otpToken,
      type: 'sms' as const, // Changing this to 'sms' often fixes 403 errors
    } 
  : {
      email: identifier as string,
      token: otpToken,
      type: 'signup' as const,
    };

console.log("Attempting verification with:", verifyParams); // Check this in your browser console!

const { error } = await supabase.auth.verifyOtp(verifyParams as any);

if (error) {
  console.error("Supabase Error Status:", error.status); // Check if this is 403 or 422
  console.error("Supabase Error Message:", error.message);
  
  // If 'sms' failed, some older setups still want 'signup'
  alert(isAr ? "الرمز غير صحيح أو انتهت صلاحيته" : `Error: ${error.message}`);
  setLoading(false);
} else {
  router.push(`/${lang}/profile`); 
}
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F2F4F7]">
      <div className="w-full max-w-[500px] bg-white rounded-[48px] p-10 sm:p-14 shadow-premium text-center space-y-10">
        <div className="space-y-3">
          <h1 className="text-[32px] font-medium tracking-tight text-black leading-tight">
            {isAr ? "تحقق من حسابك" : "Verify Account"}
          </h1>
          <p className="text-[#4B5563] font-medium text-[14px]">
            {isAr 
              ? `أدخل الرمز المكون من 6 أرقام المرسل إلى ${identifier}` 
              : `Enter the 6-digit code sent to ${identifier}`}
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }} 
              type="text"
              inputMode="numeric"
              value={digit}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digit && i > 0) {
                  inputs.current[i - 1]?.focus();
                }
              }}
              className="w-11 h-14 sm:w-14 sm:h-16 bg-[#FAFAFA] rounded-xl text-center text-xl font-bold shadow-sm border border-gray-100 focus:ring-2 focus:ring-[#12AD65]/20 outline-none transition-all"
            />
          ))}
        </div>

        <div className="pt-4">
          <button 
            disabled={loading}
            className="text-[12px] font-bold uppercase tracking-widest text-[#12AD65] hover:text-black transition-colors disabled:opacity-50"
          >
            {isAr ? "إعادة إرسال الرمز" : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}