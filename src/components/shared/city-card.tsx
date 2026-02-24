'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // استيراد المكون الذكي

interface CityCardProps {
  name: string;
  subTitle: string;
  projectCount: number;
  image: string;
  lang: string;
  country: 'turkey' | 'uae';
}

export default function CityCard({ 
  name, 
  subTitle, 
  projectCount, 
  image,         
  lang, 
  country 
}: CityCardProps) {
  const isAr = lang === 'ar';

  return (
   <Link 
      href={`/${lang}/${country}?city=${name.toLowerCase()}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[40px] transition-all duration-700 hover:-translate-y-2 bg-neutral-900"
    >
      {/* المكون الذكي للصور: يقوم بالضغط والتحويل لـ WebP تلقائياً */}
      <Image 
        src={image} 
        alt={name} 
        fill // يملأ الحاوية بالكامل
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // يختار الحجم الأنسب حسب الشاشة
        className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
      />

      {/* DESIGN CHANGE: Subtle Border [cite: 2026-02-04] */}
      <div className="absolute inset-0 z-20 rounded-[40px] border-[3px] border-[#12AD65] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* طبقة التدرج اللوني لحماية وضوح النصوص */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />

      {/* Content Layer: Updated Typography [cite: 2026-02-04] */}
      <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10 z-30">
        <h3 className="text-3xl lg:text-4xl font-medium text-white uppercase tracking-[0.1em]">
          {name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
            {subTitle}
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-[#12AD65] text-lg font-bold">{projectCount}</span>
            <span className="text-[9px] font-bold text-white uppercase tracking-tighter opacity-60">
              {isAr ? "مشروع" : "Projects"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}