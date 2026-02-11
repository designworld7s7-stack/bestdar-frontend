'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { clsx } from 'clsx'; // Optional: for cleaner classes

interface FloatingExpertBtnProps {
  lang: string;
  variant?: 'floating' | 'inline'; // Added to toggle the "Fixed" position
}

export default function FloatingExpertBtn({ lang, variant = 'floating' }: FloatingExpertBtnProps) {
  const isAr = lang === 'ar';

  return (
    <button className={clsx(
      // Keep your exact design, just toggle the position logic
      "lg:flex btn-brand px-10 h-[60px] rounded-full items-center gap-4 shadow-2xl hover:bg-black transition-all duration-500 group",
      variant === 'floating' ? "fixed bottom-10 right-10 z-[100] hidden" : "relative my-10 flex w-fit"
    )}>
      <div className="bg-white/20 p-2.5 rounded-full group-hover:bg-[#12AD65] transition-colors">
        <MessageSquare size={20} strokeWidth={2.5} />
      </div>
      <span className="text-[13px] font-bold uppercase tracking-tight">
        {isAr ? "تحدث مع خبير" : "Talk with Expert"}
      </span>
    </button>
  );
}