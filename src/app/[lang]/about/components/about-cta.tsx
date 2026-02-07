'use client';

import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

export default function AboutCTA({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="bg-white py-12 lg:py-32 px-4 lg:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Simplified Container: No heavy borders, lighter shadow */}
        <div className="relative bg-[#0A0A0A] rounded-[32px] lg:rounded-[40px] p-8 lg:p-24 overflow-hidden text-center">
          
          <div className="relative z-10">
            {/* Smaller Title for Mobile */}
            <h2 className="text-2xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-4 lg:mb-8 uppercase">
              {isAr ? "جاهز للاستثمار؟" : "Ready to Invest?"}
            </h2>

            <p className="text-gray-400 text-[11px] lg:text-lg font-medium mb-8 lg:mb-12 max-w-xl mx-auto opacity-80">
              {isAr 
                ? "تواصل مع خبرائنا اليوم للحصول على استشارة مجانية."
                : "Connect with our experts today for a free consultation."}
            </p>

            {/* Smaller, more compact buttons for Mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-6 mb-8">
              <button className="w-full sm:w-auto bg-[#12AD65] text-white px-6 py-4 lg:px-10 lg:py-5 rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0f8f53] transition-all">
                {isAr ? "استشارة مجانية" : "Free Consultation"}
                <ArrowRight size={14} />
              </button>
              
              <button className="w-full sm:w-auto bg-white text-black px-6 py-4 lg:px-10 lg:py-5 rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                <MessageCircle size={14} className="text-[#12AD65]" />
                {isAr ? "واتساب" : "WhatsApp"}
              </button>
            </div>

            {/* Minimalist Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-gray-500 opacity-60">
              <ShieldCheck size={12} className="text-[#12AD65]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
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