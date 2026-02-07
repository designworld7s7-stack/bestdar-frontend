'use client';

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function ReservationForm({ lang, unit }: any) {
  const isAr = lang === 'ar';

  return (
    <div className="w-full space-y-4 lg:space-y-8">
      {/* Unit Identification: Shorter height (p-4) */}
      <div className="bg-gray-50 rounded-[22px] p-4 lg:p-8 flex justify-between items-center shadow-inner">
        <div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">ID</span>
          <span className="text-base lg:text-xl font-black text-black">#{unit?.id}</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Price</span>
          <span className="text-base lg:text-xl font-black text-[#12AD65]">${unit?.price?.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Buyer Name: Shorter padding (p-4) */}
        <input 
          type="text" 
          placeholder={isAr ? "الاسم الكامل" : "Full Name"} 
          className="w-full bg-gray-50 border-0 rounded-xl p-4 lg:p-6 text-xs font-bold focus:ring-2 focus:ring-[#12AD65]/10 transition-all shadow-sm outline-none"
        />
        
        <div className="flex w-full gap-2">
          <select className="bg-gray-50 border-0 rounded-xl px-2 text-[9px] font-black shadow-sm outline-none w-[75px]">
            <option>+964</option>
            <option>+971</option>
            <option>+90</option>
          </select>
          <input 
            type="tel" 
            placeholder={isAr ? "رقم الهاتف" : "Phone Number"} 
            className="flex-1 min-w-0 bg-gray-50 border-0 rounded-xl p-4 text-xs font-bold focus:ring-2 focus:ring-[#12AD65]/10 transition-all shadow-sm outline-none"
          />
        </div>
      </div>

      {/* Trust Message: Slimmed down */}
      <div className="flex items-center gap-3 text-gray-400 px-1">
        <ShieldCheck size={14} className="text-[#12AD65] shrink-0" />
        <p className="text-[8px] font-black uppercase tracking-widest leading-none">
          {isAr ? "سيتم التواصل معك قريباً" : "Expert will contact you shortly"}
        </p>
      </div>

      {/* Primary Action: Thinner button (py-4) */}
      <button className="group w-full bg-black text-white py-4 lg:py-6 rounded-xl font-black text-[9px] lg:text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#12AD65] transition-all shadow-2xl">
        {isAr ? "تأكيد الطلب" : "Confirm Request"}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}