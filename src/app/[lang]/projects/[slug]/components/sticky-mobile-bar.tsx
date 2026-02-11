'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function StickyMobileBar({ lang, onInterestClick }: { lang: string, onInterestClick: () => void }) {
  const isAr = lang === 'ar';

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 pb-8 z-[100] flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/yournumber" 
        className="flex-1 bg-white border border-gray-200 text-black h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-[12px] uppercase tracking-tighter shadow-sm"
      >
        <MessageCircle size={18} className="text-[#12AD65]" />
        {isAr ? "واتساب" : "WhatsApp"}
      </a>

      {/* I'm Interested Button */}
      <button 
        onClick={onInterestClick}
        className="flex-[2] btn-brand h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-[12px] uppercase tracking-tighter shadow-lg shadow-[#12AD65]/20"
      >
        <Send size={16} />
        {isAr ? "أنا مهتم" : "I'm Interested"}
      </button>
    </div>
  );
}