'use client';

import React from 'react';
import Link from 'next/link';

interface CityCardProps {
  name: string;
  subTitle: string;
  projectCount: number;
  image: string;
  lang: string;
  country: 'turkey' | 'uae';
}

export default function CityCard({ 
  name, subTitle, projectCount, image, lang, country 
}: CityCardProps) {
  const isAr = lang === 'ar';

  return (
    <Link 
      href={`/${lang}/${country}?city=${name.toLowerCase()}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[40px] transition-all duration-700 hover:-translate-y-2"
    >
      {/* Dynamic Border: Appears on Hover */}
      <div className="absolute inset-0 z-20 rounded-[40px] border-[6px] border-[#12AD65] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Grayscale to Color Image */}
      <img 
        src={image} 
        alt={name} 
        className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
      />

      {/* Dark Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

      {/* Content Layer */}
      <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10 z-30">
        <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
          {name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">
            {subTitle}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#12AD65] text-lg font-black">{projectCount}</span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-60">
              {isAr ? "مشروع" : "Projects"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}