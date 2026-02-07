'use client';

import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';

export default function ClubCTA({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="bg-white py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Main Heading */}
        <h2 className="text-4xl lg:text-7xl font-black text-black tracking-tighter mb-12">
          {isAr ? "ابدأ رحلتك الاستثمارية اليوم" : "Start Your Investment Journey Today"}
        </h2>

        {/* Schedule Button with Desktop Hover */}
        <div className="flex flex-col items-center gap-6">
          <button className="flex items-center gap-3 bg-[#12AD65] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#0f8f53] hover:shadow-[0_20px_40px_rgba(18,173,101,0.25)] hover:-translate-y-1 active:scale-95">
            <Calendar size={20} />
            {isAr ? "حجز مكالمة" : "Schedule a Call"}
          </button>

          {/* WhatsApp Secondary Link */}
          <a 
            href="https://wa.me/yournumber" 
            target="_blank" 
            className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors font-bold text-sm tracking-tight"
          >
            <MessageCircle size={18} />
            {isAr ? "هل تفضل الواتساب؟ راسلنا" : "Prefer WhatsApp? Message Us"}
          </a>
        </div>

      </div>
    </section>
  );
}