'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function HeroGuide({ id, title, description, image, date, lang }: any) {
  const isAr = lang === 'ar';

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 mb-12 lg:mb-24">
      {/* Changed aspect-ratio to min-h on mobile for text clearance */}
      <Link href={`/${lang}/guides/${id}`} className="group relative block w-full min-h-[500px] lg:aspect-[21/9] rounded-[32px] lg:rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl">
        
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 lg:opacity-100 transition-transform duration-1000 group-hover:scale-105" 
        />
        
        {/* Stronger overlay for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/80 lg:to-transparent" />

        <div className="absolute inset-0 p-8 lg:p-20 flex flex-col justify-end lg:justify-center items-start lg:max-w-3xl">
          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            <span className="bg-[#12AD65] text-white text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-full">
              {isAr ? "مميز" : "Featured"}
            </span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{date}</span>
          </div>

          {/* Adjusted font sizes for mobile */}
          <h2 className="text-3xl lg:text-6xl font-black text-white leading-tight lg:leading-[1.1] mb-6 tracking-tighter">
            {title}
          </h2>

          <p className="text-white/80 text-sm lg:text-lg font-medium leading-relaxed mb-8 lg:mb-10 line-clamp-3 lg:line-clamp-none">
            {description}
          </p>

          <div className="bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 group-hover:bg-[#12AD65] group-hover:text-white flex items-center gap-3">
            {isAr ? "اقرأ المقال" : "Read Article"}
            <ArrowRight size={16} className={clsx("transition-transform", isAr && "rotate-180")} />
          </div>
        </div>
      </Link>
    </section>
  );
}