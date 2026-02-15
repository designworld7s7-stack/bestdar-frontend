'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function OTPInput({ length, onComplete }: { length: number; onComplete: (code: string) => void }) {
  const [code, setCode] = useState(new Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle manual typing
  const handleChange = (val: string, index: number) => {
    if (isNaN(Number(val))) return;
    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);

    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
    
    // Check if finished
    const fullCode = newCode.join("");
    if (fullCode.length === length) onComplete(fullCode);
  };

  // 1. SMART PASTE LOGIC: Handles code copied from WhatsApp/Email
  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData('text').slice(0, length).split("");
    if (pasteData.every(char => !isNaN(Number(char)))) {
      const newCode = [...pasteData];
      setCode(newCode);
      onComplete(newCode.join(""));
      inputs.current[length - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3 sm:gap-4 justify-center" dir="ltr">
      {code.map((num, idx) => (
        <input
          key={idx}
          ref={(el) => { inputs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code" // Helps mobile keyboards suggest the code
          value={num}
          onPaste={handlePaste}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !num && idx > 0) {
              inputs.current[idx - 1]?.focus();
            }
          }}
          className="w-14 h-16 sm:w-16 sm:h-20 bg-[#FAFAFA] rounded-2xl text-[24px] sm:text-[32px] font-bold text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/20 focus:border-[#12AD65]/30 transition-all text-black"
        />
      ))}
    </div>
  );
}