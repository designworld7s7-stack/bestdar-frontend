'use client';

import React from 'react';
import { useModals } from "@/context/modal-context";
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
export default function GuideCTA({ lang }: { lang: string }) {
  const { openConsultation } = useModals(); // Global trigger
  const isAr = lang === 'ar';

  return (
   <section className="my-20 lg:my-32">
  <div className="bg-[#0A0A0A] rounded-[48px] p-10 lg:p-24 text-center relative overflow-hidden shadow-2xl">
    
    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#12AD65]/10 to-transparent pointer-events-none" />

    <div className="relative z-10 max-w-3xl mx-auto">
      {/* Header: Fixed to white and bolded with tight tracking [cite: 2026-02-04] */}
    <h2 
      style={{ color: '#FFFFFF' }} 
      className="text-3xl lg:text-6xl font-bold mb-8 tracking-tight uppercase"
    >
      {isAr ? "ابدأ رحلتك الاستثمارية اليوم" : "Start Your Investment Journey"}
    </h2>
    
    <p 
      style={{ color: '#D1D5DB' }} 
      className="text-base lg:text-xl font-medium mb-12"
    >
      {isAr ? "احصل على نصيحة مخصصة..." : "Get personalized advice..."}
    </p>
      {/* Action Buttons: Unified with your brand weights [cite: 2026-02-04] */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        
        {/* REGISTER: Now uses btn-brand with bold 13px text [cite: 2026-02-04] */}
       <Link href={`/${lang}/auth/signup`} className="w-full sm:w-auto">
  <button 
    type="button"
    className="w-full sm:w-auto btn-brand px-12 h-[56px] text-[13px] font-bold uppercase tracking-tight shadow-xl shadow-[#12AD65]/20 hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer"
  >
    {isAr ? "سجل الآن" : "Register Now"}
    <ArrowRight size={18} strokeWidth={2.5} className={isAr ? "rotate-180" : ""} />
  </button>
</Link>

        {/* SCHEDULE: High-contrast white button [cite: 2026-02-04] */}
        <button 
          onClick={openConsultation}
          className="w-full sm:w-auto bg-white text-black px-12 h-[56px] text-[13px] font-bold uppercase tracking-tight hover:bg-gray-100 transition-all flex items-center justify-center gap-3 rounded-2xl"
        >
          <Calendar size={18} strokeWidth={2.5} />
          {isAr ? "احجز استشارة" : "Schedule Call"}
        </button> 
      </div>
    </div>
  </div>
</section>
  );
}