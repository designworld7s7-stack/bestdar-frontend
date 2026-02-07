'use client';

import React from 'react';
import { useModals } from "@/context/modal-context";
import { ArrowRight, Calendar } from 'lucide-react';

export default function GuideCTA({ lang }: { lang: string }) {
  const { openConsultation } = useModals(); // Global trigger
  const isAr = lang === 'ar';

  return (
    <section className="my-20 lg:my-32">
      {/* 1. MAIN CONTAINER */}
      <div className="bg-[#0A0A0A] rounded-[48px] p-10 lg:p-24 text-center relative overflow-hidden shadow-2xl">
        
        {/* Subtle Background Glow for Premium feel */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#12AD65]/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Header & Description */}
          <h2 className="text-3xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-tight">
            {isAr ? "ابدأ رحلتك الاستثمارية اليوم" : "Start Your Investment Journey"}
          </h2>
          
          <p className="text-gray-400 text-base lg:text-xl font-medium mb-12 leading-relaxed">
            {isAr 
              ? "احصل على نصيحة مخصصة ووصول حصري إلى عقارات غير معروضة في السوق في تركيا والإمارات العربية المتحدة."
              : "Get personalized advice and access to exclusive off-market properties in Turkey and the UAE."}
          </p>

          {/* 2. ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* REGISTER: Join Investor Club */}
            <button className="w-full sm:w-auto bg-[#12AD65] text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#12AD65]/20 hover:scale-105 transition-all flex items-center justify-center gap-3">
              {isAr ? "سجل الآن" : "Register Now"}
              <ArrowRight size={16} />
            </button>

            {/* SCHEDULE: Global Modal Trigger */}
            <button 
              onClick={openConsultation}
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
            >
              <Calendar size={16} />
              {isAr ? "احجز استشارة" : "Schedule Call"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}