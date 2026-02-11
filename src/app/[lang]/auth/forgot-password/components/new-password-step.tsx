'use client';

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function NewPasswordStep({ isAr, onComplete }: { isAr: boolean, onComplete: () => void }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="space-y-3">
        <h1 className="text-[32px] font-medium tracking-[0.1em] text-black">
          {isAr ? "كلمة مرور جديدة" : "New Password"}
        </h1>
        <p className="text-[#4B5563] font-medium text-[15px]">
          {isAr ? "يرجى اختيار كلمة مرور قوية وجديدة." : "Please choose a strong and fresh password."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[12px] font-medium uppercase tracking-tight text-[#6B7280] px-1">
            {isAr ? "كلمة المرور" : "New Password"}
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input type="password" className="w-full bg-[#FAFAFA] pl-16 pr-6 py-5 rounded-[24px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" />
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="w-full py-5 rounded-[24px] bg-black text-white font-medium text-[14px] uppercase tracking-tighter shadow-xl hover:bg-[#12AD65] transition-all active:scale-[0.98]"
        >
          {isAr ? "تحديث كلمة المرور" : "Update Password"}
        </button>
      </div>
    </div>
  );
}