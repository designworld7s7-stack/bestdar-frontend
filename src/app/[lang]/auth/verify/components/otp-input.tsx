'use client';

import React, { useRef, useState } from 'react';

export default function OTPInput({ length, isAr, onComplete }: { length: number; isAr: boolean; onComplete: (code: string) => void }) {
  const [code, setCode] = useState(new Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    if (isNaN(Number(val))) return;
    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);

    // Auto-focus next input
    if (val && index < length - 1) inputs.current[index + 1]?.focus();
    if (newCode.every(v => v !== "")) onComplete(newCode.join(""));
  };

  return (
    <div className="flex gap-3 sm:gap-4 justify-center" dir="ltr">
      {code.map((num, idx) => (
        <input
          key={idx}
          // FIX: Wrap assignment in braces so it returns void
          ref={(el) => { inputs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          value={num}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !num && idx > 0) {
              inputs.current[idx - 1]?.focus();
            }
          }}
          className="w-14 h-16 sm:w-16 sm:h-20 bg-[#FAFAFA] rounded-2xl text-[24px] sm:text-[32px] font-medium text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/20 transition-all"
        />
      ))}
    </div>
  );
}