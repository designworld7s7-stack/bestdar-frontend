'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

interface ArticleCardProps {
  id: string;
  title: string;
  title_ar?: string; // إضافة حقل العنوان العربي
  excerpt: string;
  excerpt_ar?: string; // إضافة حقل المقتطف العربي
  image: string;
  category: string;
  date: string;
  location: string;
  lang: string;
}

export default function ArticleCard({ 
  id, 
  title, 
  title_ar, 
  excerpt, 
  excerpt_ar, 
  image, 
  category, 
  date, 
  location, 
  lang 
}: ArticleCardProps) {
  const isAr = lang === 'ar';

  // تحديد النص المراد عرضه بناءً على اللغة المتوفرة
  const displayTitle = isAr && title_ar ? title_ar : title;
  const displayExcerpt = isAr && excerpt_ar ? excerpt_ar : excerpt;

  return (
    <Link 
      href={`/${lang}/guides/${id}`}
      className="group flex flex-col bg-white rounded-[40px] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 h-full"
    >
      {/* 1. ADAPTIVE IMAGE CONTAINER */}
      {/* Mobile: aspect-[4/3] for vertical space | Desktop: aspect-[16/10] for cinematic width */}
      <div className="relative aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden">
  <img 
    src={image} 
    alt={title} 
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
  />
  {/* Floating Category Badge stays same */}
  <div className="absolute top-4 lg:top-6 left-4 lg:left-6 bg-white/95 backdrop-blur-md text-black text-[9px] lg:text-[12px] font-medium uppercase tracking-[0.15em] py-2 px-4 lg:py-2.5 lg:px-5 rounded-xl shadow-lg">
    {category}
  </div>
</div>

      {/* 2. ADAPTIVE CONTENT AREA */}
      {/* Mobile: p-6 (Compact) | Desktop: p-10 (Boutique) */}
      <div className="p-6 lg:p-10 flex flex-col flex-1">
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6 text-[#4B5563] text-[9px] lg:text-[11px] font-medium uppercase tracking-tighter">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#12AD65]" />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#12AD65]" />
            {location}
          </div>
        </div>

        {/* Title: Size scales from 1.25rem to 1.5rem */}
      <h3 className="text-xl lg:text-2xl font-medium text-black leading-tight mb-3 lg:mb-4 tracking-tight transition-colors duration-300 group-hover:text-[#12AD65]">
          {/* ✅ تم استبدال "guide.title" بـ "displayTitle" لحل الخطأ */}
          {displayTitle}
        </h3>

        <p className="text-gray-500 text-sm lg:text-[15px] leading-relaxed mb-6 lg:mb-10 line-clamp-2 lg:line-clamp-3 font-medium">
          {/* ✅ تم استبدال "excerpt" بـ "displayExcerpt" لضمان الترجمة */}
          {displayExcerpt}
        </p>

        {/* Action: Boutique Arrow */}
        <div className="mt-auto flex items-center gap-3 text-[#12AD65] font-medium text-[12px] lg:text-[11px] uppercase tracking-tight">
          <span>{isAr ? "اقرأ الدليل" : "Read Guide"}</span>
          <ArrowRight 
            size={16} 
            className={clsx(
              "transition-all duration-500 group-hover:translate-x-3",
              isAr && "rotate-180 group-hover:-translate-x-3"
            )} 
          />
        </div>
      </div>
    </Link>
  );
}