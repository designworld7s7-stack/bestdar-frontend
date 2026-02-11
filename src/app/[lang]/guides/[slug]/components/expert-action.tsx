'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';

export default function ExpertAction({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const whatsappUrl = "https://wa.me/964000000000"; 

  return (
    <>
      {/* 1. DESKTOP: Floating WhatsApp Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "hidden lg:flex fixed bottom-10 z-[1000] btn-brand px-8 py-4 rounded-full font-medium text-[11px] uppercase tracking-tighter items-center gap-3 shadow-2xl hover:bg-black transition-all duration-500 group",
          isAr ? "left-10" : "right-10"
        )}
      >
        <div className="bg-white/20 p-2 rounded-full group-hover:bg-[#12AD65] transition-colors">
          <MessageSquare size={18} />
        </div>
        <span>{isAr ? "تحدث مع خبير" : "Talk with Expert"}</span>
      </a>

      {/* 2. MOBILE: Refined Slim Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md z-[9999] px-6 py-4 pb-6 border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto max-w-[280px] btn-brand flex items-center justify-center gap-3 py-3.5 rounded-full font-medium text-[12px] uppercase tracking-tighter shadow-lg shadow-[#12AD65]/20 active:scale-95 transition-all"
        >
          <MessageSquare size={16} />
          <span>{isAr ? "تحدث مع خبير" : "Talk with Expert"}</span>
        </a>
      </div>
    </>
  );
}