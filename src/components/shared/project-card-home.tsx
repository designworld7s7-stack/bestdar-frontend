'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { clsx } from 'clsx';
import { Calendar } from 'lucide-react';

interface ProjectCardHomeProps {
  slug: string; 
  title: string;
  title_ar?: string; // ✅ أضفنا العنوان العربي
  price: string;
  thumbnail_url: string; 
  delivery_date: string; 
  lang: string;
}

export default function ProjectCardHome({ 
  slug, 
  title, 
  title_ar, // ✅ استلام العنوان العربي
  price, 
  thumbnail_url, 
  delivery_date, 
  lang 
}: ProjectCardHomeProps) {
  const brandGreen = "#12AD65";
  const isAr = lang === 'ar';
  
  // ✅ اختيار العنوان بناءً على اللغة المفعّلة
  const displayTitle = isAr && title_ar ? title_ar : title;
  
  const projectLink = `/${lang}/projects/${slug}`;
  const displayImage = thumbnail_url || '/placeholder-project.jpg';

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      
      {/* رابط التغطية الكاملة */}
      <Link href={projectLink} className="absolute inset-0 z-10">
        <span className="sr-only">{displayTitle}</span>
      </Link>

      {/* 🗓️ وسم تاريخ التسليم */}
      {delivery_date && (
        <div className={`absolute top-5 ${isAr ? 'left-5' : 'right-5'} z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2`}>
          <Calendar size={12} style={{ color: brandGreen }} />
          <span className="text-[10px] font-extrabold text-black uppercase tracking-tight">
             {isAr ? 'تسليم' : 'DELIVERY'} {delivery_date}
          </span>
        </div>
      )}

      {/* المكون الذكي للصور */}
      <Image 
        src={displayImage} 
        alt={displayTitle}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        priority={false}
      />

      {/* الطبقة المظلمة */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-10" />

      {/* منطقة النصوص - مع مراعاة اتجاه النص */}
      <div className={`absolute inset-x-0 bottom-0 flex flex-col ${isAr ? 'items-end text-right' : 'items-center text-center lg:items-start lg:text-left'} p-6 lg:p-8 z-20 pointer-events-none`}>
        
        <h3 className="text-xl font-bold leading-tight text-white lg:text-2xl line-clamp-2 min-h-fit lg:min-h-[3.5rem] mb-1">
          {displayTitle}
        </h3>
        
        <p style={{ color: brandGreen }} className="mt-0 lg:mt-2 text-sm font-black tracking-tight">
          {isAr ? `تبدأ من ${price}` : `Starting from ${price}`}
        </p>

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