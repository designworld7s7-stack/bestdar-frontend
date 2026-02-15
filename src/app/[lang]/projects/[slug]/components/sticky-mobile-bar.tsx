'use client';

import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface StickyMobileBarProps {
  lang: string;
  onInterestClick: () => void;
  propertyId?: string;   // أضفنا المعرف لتتبع العقار
  propertyName?: string; // أضفنا الاسم لرسالة الواتساب
}

export default function StickyMobileBar({ 
  lang, 
  onInterestClick, 
  propertyId, 
  propertyName 
}: StickyMobileBarProps) {
  const isAr = lang === 'ar';

  // تجهيز رابط الواتساب الذكي
  const whatsappNumber = "9647759147343";
  const message = isAr 
    ? `مرحباً Best Dar، أنا مهتم بالعقار: ${propertyName || ''} (ID: ${propertyId || 'N/A'})` 
    : `Hello Best Dar, I'm interested in: ${propertyName || ''} (ID: ${propertyId || 'N/A'})`;
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl border-t border-gray-100 p-4 pb-8 z-[100] flex gap-3 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-500">
      
      {/* WhatsApp Button: الآن فعال ومرتبط بالرقم */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-white border border-gray-100 text-black h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-tighter shadow-sm active:scale-95 transition-transform"
      >
        <MessageCircle size={20} className="text-[#12AD65]" />
        {isAr ? "واتساب" : "WhatsApp"}
      </a>

      {/* I'm Interested Button: تصميم أكثر بروزاً */}
      <button 
        onClick={onInterestClick}
        className="flex-[1.8] bg-[#12AD65] text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-tighter shadow-xl shadow-[#12AD65]/20 active:scale-95 transition-all"
      >
        <Send size={16} className={isAr ? "rotate-180" : ""} />
        {isAr ? "أنا مهتم" : "I'm Interested"}
      </button>
    </div>
  );
}