'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface ProjectCardHomeProps {
  slug: string; 
  title: string;
  price: string;
  // 1. Update: Changed image_url to thumbnail_url to match best practice
  thumbnail_url: string; 
  lang: string;
}

export default function ProjectCardHome({ 
  slug, 
  title, 
  price, 
  thumbnail_url, // 2. Accept the new thumbnail prop
  lang 
}: ProjectCardHomeProps) {
  const brandGreen = "#12AD65";
  const isAr = lang === 'ar';
  const projectLink = `/${lang}/projects/${slug}`;

  // Since we are now using a single string column for the thumbnail, 
  // we no longer need the complex "Smart Fix" array logic here.
  const displayImage = thumbnail_url || '/placeholder-project.jpg';

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <Link href={projectLink} className="absolute inset-0 z-10">
        <span className="sr-only">{title}</span>
      </Link>

      <img 
        src={displayImage} 
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-project.jpg';
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-8 z-20 pointer-events-none">
        {/* 3. SYMMETRY: Keeps titles consistent even with short words like 'Turkey' */}
        <h3 className="text-xl font-medium leading-tight text-white lg:text-2xl line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        
        <p style={{ color: brandGreen }} className="mt-2 text-sm font-medium">
          {isAr ? `تبدأ من ${price}` : `Starting from ${price}`}
        </p>

        <Link 
  href={projectLink}
  className={clsx(
    // الموبايل: ارتفاع أصغر (h-10)، عرض محدد (w-max)، وحواف جانبية (px-8)
    // الديسكتوب (lg): يعود للارتفاع الأصلي (lg:h-14) والعرض الكامل (lg:w-full)
    "mt-6 flex h-10 lg:h-14 w-max lg:w-full items-center justify-center rounded-xl lg:rounded-2xl px-8 lg:px-0 text-[12px] lg:text-sm font-bold transition-all duration-300 active:scale-95 pointer-events-auto",
    "bg-white text-black lg:group-hover:bg-black lg:group-hover:text-white shadow-lg"
  )}
>
  {isAr ? "عرض المشروع" : "View Project"}
</Link>
      </div>
    </div>
  );
}