'use client';
import React from 'react';

export default function NewPasswordStep({ isAr, onComplete }: { isAr: boolean; onComplete: () => void }) {
  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500">
      <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#12AD65] rounded-full mb-6 sm:mb-8 shadow-xl"></div>
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-[26px] sm:text-[36px] font-black text-black tracking-tighter mb-2 leading-tight">
          {isAr ? "كلمة مرور جديدة" : "New Password"}
        </h1>
        <p className="text-gray-400 font-medium text-[13px] sm:text-[16px] leading-relaxed max-w-[280px] mx-auto">
          {isAr ? "اختر كلمة مرور قوية لحسابك." : "Choose a strong password to secure your account."}
        </p>
      </div>
      <div className="w-full space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">{isAr ? "كلمة المرور" : "Password"}</label>
          <input type="password" placeholder="••••••••" className="w-full bg-[#FAFAFA] px-5 sm:px-7 py-3.5 sm:py-4.5 rounded-2xl text-[14px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">{isAr ? "تأكيد" : "Confirm"}</label>
          <input type="password" placeholder="••••••••" className="w-full bg-[#FAFAFA] px-5 sm:px-7 py-3.5 sm:py-4.5 rounded-2xl text-[14px] sm:text-[16px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none" />
        </div>
        <button onClick={onComplete} className="w-full bg-[#12AD65] text-white py-5 sm:py-6 rounded-2xl font-black text-[13px] sm:text-[14px] uppercase tracking-[0.2em] shadow-lg">
          {isAr ? "حفظ التغيير" : "Save Password"}
        </button>
      </div>
    </div>
  );
}