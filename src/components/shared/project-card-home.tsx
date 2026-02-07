'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface ProjectCardHomeProps {
  id: string;
  title: string;
  price: string;
  image: string;
  lang: string;
}

export default function ProjectCardHome({ id, title, price, image, lang }: ProjectCardHomeProps) {
  const brandGreen = "#12AD65";
  const isAr = lang === 'ar';

  return (
    <div 
      // Minimalist Shadow \u0026 Borderless Container
      className="group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
    >
      {/* 1. Background Image with Zoom on Hover */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
      />

      {/* 2. Gradient Overlay (Ensures text is readable) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* 3. Content Area (Anchored to Bottom) */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-8">
        <h3 className="text-xl font-black leading-tight text-white lg:text-2xl">
          {title}
        </h3>
        
        <p style={{ color: brandGreen }} className="mt-2 text-sm font-bold">
          {isAr ? `تبدأ من ${price}` : `Starting from ${price}`}
        </p>

        {/* 4. Action Button
            Default: White bg, Black text
            Hover: Black bg, White text (Desktop only) 
        */}
        <Link 
          href={`/${lang}/properties/${id}`}
          className={clsx(
            "mt-6 flex h-14 items-center justify-center rounded-2xl text-sm font-black transition-all duration-300 active:scale-95",
            // Desktop: White to Black | Mobile: Solid White (Default)
            "bg-white text-black lg:group-hover:bg-black lg:group-hover:text-white"
          )}
        >
          {isAr ? "عرض المشروع" : "View Project"}
        </Link>
      </div>
    </div>
  );
}