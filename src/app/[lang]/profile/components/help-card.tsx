'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function HelpCard({ isAr }: { isAr: boolean }) {
  // Replace this with the actual Best Dar business number
  const WHATSAPP_NUMBER = "+9647700000000"; 
  
  const handleWhatsAppClick = () => {
    const message = isAr 
      ? "مرحباً بست دار، أحتاج إلى استشارة بخصوص العقارات." 
      : "Hello Best Dar, I need a consultation regarding properties.";
    
    // Encodes the message for the URL
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Opens in a new tab for a smooth boutique experience
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#12AD65] rounded-[32px] p-8 sm:p-10 shadow-[0_25px_60px_rgba(18,173,101,0.2)] text-white w-full">
      <h3 className="text-[22px] sm:text-[24px] font-medium tracking-tight mb-3">
        {isAr ? "هل تحتاج مساعدة؟" : "Need Help?"}
      </h3>
      
      <p className="text-[#E8F7F0] font-medium text-[14px] leading-relaxed mb-8 opacity-90">
        {isAr 
          ? "خبراء العقارات لدينا مستعدون لمساعدتك في رحلتك." 
          : "Our real estate experts are ready to assist you with your journey."}
      </p>

      {/* Triggering the WhatsApp Logic */}
      <button 
        onClick={handleWhatsAppClick}
        className="group w-full bg-white/10 hover:bg-white/20 border border-white/20 py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
      >
        <MessageCircle size={20} className="group-hover:animate-pulse" />
        <span className="text-[13px] font-medium uppercase tracking-[0.1em]">
          {isAr ? "دردشة واتساب" : "WhatsApp Chat"}
        </span>
      </button>
    </div>
  );
}