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

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center lg:items-start lg:text-left p-6 lg:p-8 z-20 pointer-events-none">
  
  {/* العنوان: تقليل الارتفاع الأدنى (min-h) للموبايل لتقريب السعر من العنوان */}
  <h3 className="text-xl font-bold leading-tight text-white lg:text-2xl line-clamp-2 min-h-fit lg:min-h-[3.5rem] mb-1">
    {title}
  </h3>
  
  {/* السعر: تقليل الهامش العلوي (mt-0) وتغيير اللون للتوضيح */}
  <p style={{ color: brandGreen }} className="mt-0 lg:mt-2 text-sm font-black tracking-tight">
    {isAr ? `تبدأ من ${price}` : `Starting from ${price}`}
  </p>

  {/* الزر: إضافة mx-auto لضمان التوسيط التام وتقليل mt-3 */}
  <Link 
    href={projectLink}
    className="mt-3 lg:mt-6 flex h-10 lg:h-14 w-max lg:w-full mx-auto lg:mx-0 items-center justify-center rounded-xl lg:rounded-2xl px-10 lg:px-0 text-[11px] lg:text-sm font-black transition-all duration-300 active:scale-95 pointer-events-auto bg-white text-black shadow-xl"
  >
    {isAr ? "عرض المشروع" : "View Project"}
  </Link>
      </div>
    </div>
  );
}