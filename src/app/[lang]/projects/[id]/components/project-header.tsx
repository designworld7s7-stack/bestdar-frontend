'use client';

import React from 'react';
import { MapPin, Hash } from 'lucide-react';

export default function ProjectHeader({ lang, title, location, price, id, onInterestClick }: any) {
  const isAr = lang === 'ar';

  return (
    <header className="hidden lg:block bg-white pt-10 pb-12">
      <div className="max-w-[1440px] mx-auto px-12 flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-black text-black tracking-tighter uppercase leading-none">
            {title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#12AD65]" />
              <span className="text-[10px] font-black uppercase tracking-widest">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#12AD65]">
              <span className="text-[10px] font-black uppercase tracking-widest">
                {isAr ? "يبدأ من" : "Starting from"} {price}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Hash size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">ID: {id}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onInterestClick}
          className="bg-[#12AD65] text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#12AD65]/10"
        >
          {isAr ? "أنا مهتم" : "I'm Interested"}
        </button>
      </div>
    </header>
  );
}