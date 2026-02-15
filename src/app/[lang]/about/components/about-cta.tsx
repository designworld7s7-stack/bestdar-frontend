'use client';

import React from 'react';
import { ArrowRight, Calendar, MessageCircle, ShieldCheck } from 'lucide-react';
import { useModals } from "@/context/modal-context"; //
export default function AboutCTA({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
const { openConsultation } = useModals(); // Unified trigger
  return (
    <section className="bg-white py-12 lg:py-32 px-4 lg:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Simplified Container: No heavy borders, lighter shadow */}
        <div className="relative bg-[#0A0A0A] rounded-[32px] lg:rounded-[40px] p-8 lg:p-24 overflow-hidden text-center">
          
          <div className="relative z-10">
            {/* Smaller Title for Mobile */}
            <h2 className="text-2xl lg:text-6xl font-medium text-white leading-tight tracking-[0.1em] mb-4 lg:mb-8 uppercase">
              {isAr ? "جاهز للاستثمار؟" : "Ready to Invest?"}
            </h2>

            <p className="text-[#4B5563] text-[11px] lg:text-lg font-medium mb-8 lg:mb-12 max-w-xl mx-auto opacity-80">
              {isAr 
                ? "تواصل مع خبرائنا اليوم للحصول على استشارة مجانية."
                : "Connect with our experts today for a free consultation."}
            </p>

            {/* Smaller, more compact buttons for Mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-6 mb-8">
              <button 
        onClick={openConsultation}
        className="btn-brand flex items-center gap-3"
      >
        <Calendar size={18} />
        {isAr ? "حجز استشارة" : "Book Consultation"}
      </button>
              
              <a 
        href="https://wa.me/9647759147343" // International format
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary flex items-center gap-3"
      >
        <MessageCircle size={18} className="text-[#12AD65]" />
        {isAr ? "اتصال واتساب" : "WhatsApp Contact"}
      </a>
            </div>

            {/* Minimalist Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-gray-500 opacity-60">
              <ShieldCheck size={12} className="text-[#12AD65]" />
              <span className="text-[9px] font-medium uppercase tracking-tight">
                {isAr ? "سري وآمن" : "Confidential & Secure"}
              </span>
            </div>
          </div>

          {/* Very subtle glow */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#12AD65]/10 blur-[80px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
}