'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingExpertBtn({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <button className="hidden lg:flex fixed bottom-10 right-10 z-[100] bg-[#12AD65] text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest items-center gap-3 shadow-2xl hover:bg-black transition-all duration-500 group">
      <div className="bg-white/20 p-2 rounded-full group-hover:bg-[#12AD65] transition-colors">
        <MessageSquare size={18} />
      </div>
      {isAr ? "تحدث مع خبير" : "Talk with Expert"}
    </button>
  );
}