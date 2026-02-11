'use client';

import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { useModals } from "@/context/modal-context";

export default function ContactActions({ isAr }: { isAr: boolean }) {
 const { openConsultation } = useModals();
  return (
    <section className="bg-white py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Main Heading */}
        <h2 className="text-4xl lg:text-7xl font-medium text-black tracking-[0.1em] mb-12">
          {isAr ? "ابدأ رحلتك الاستثمارية اليوم" : "Start Your Investment Journey Today"}
        </h2>

        {/* Schedule Button with Desktop Hover */}
        <div className="flex flex-col items-center gap-6">
        <button 
        onClick={openConsultation} // Now this matches the wrapper's state
        className="btn-brand w-full md:w-auto flex items-center gap-3"
      >
        <Calendar size={20} />
        {isAr ? "حجز مكالمة" : "Schedule a Call"}
      </button>
          {/* WhatsApp Secondary Link */}
         <a 
        href="https://wa.me/9647500000000" // Replace with your Iraqi/Turkish/UAE number
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#4B5563] hover:text-black transition-all duration-300 text-[13px] font-medium uppercase tracking-[0.15em]"
      >
        <MessageCircle size={18} className="text-[#12AD65]" />
        {isAr ? "هل تفضل الواتساب؟ راسلنا" : "Prefer WhatsApp? Message Us"}
      </a>
        </div>

      </div>
    </section>
  );
}