'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroGuide({ id, title, description, image, date, lang }: any) {
  const isAr = lang === 'ar';

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 mb-12 lg:mb-24">
      <Link 
        href={`/${lang}/guides/${id}`} 
        className="group relative block w-full min-h-[500px] lg:min-h-[600px] lg:aspect-[21/9] rounded-[32px] lg:rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl"
      >
        
        <img 
          src={image || "/guides/hero-bg.jpg"} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 lg:opacity-80 transition-transform duration-1000 group-hover:scale-105" 
        />
        
        {/* تعميق التدرج في الأسفل لضمان قراءة النص الفرعي بوضوح */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        
        <div className="absolute inset-0 p-8 md:p-12 lg:p-20 flex flex-col justify-end items-start z-20">
          
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-[#12AD65] text-white text-[10px] lg:text-[12px] font-bold uppercase py-1.5 px-4 rounded-full">
              {isAr ? "مميز" : "Featured"}
            </span>
            <span className="text-white/60 text-[12px] font-bold uppercase tracking-widest">{date}</span>
          </div>

          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-medium text-white leading-[1.05] mb-6 tracking-tighter max-w-full lg:max-w-[85%] uppercase">
            {title}
          </h2>

          {/* ✅ التعديل هنا: 
              - في الموبايل يبقى line-clamp-2 (سطرين فقط كما طلبت).
              - في الـ Desktop (md:) يصبح line-clamp-none ليظهر النص كاملاً.
          */}
          <p className="text-white/70 text-sm lg:text-lg font-medium leading-relaxed mb-10 line-clamp-2 md:line-clamp-none max-w-[90%] md:max-w-[700px]">
            {description}
          </p>

          <div className="inline-flex bg-white text-black px-10 py-4 rounded-full font-bold text-[12px] uppercase tracking-[0.1em] transition-all duration-500 group-hover:bg-[#12AD65] group-hover:text-white items-center gap-3">
            {isAr ? "اقرأ المقال" : "Read Guide"}
            <ArrowRight size={16} strokeWidth={3} className={isAr ? "rotate-180" : ""} />
          </div>
        </div>
      </Link>
    </section>
  );
}