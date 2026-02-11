'use client';

import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import SocialActions from '@/components/shared/social-actions'; 

interface GuideHeroProps {
  lang: string;
  title: string;
  subtitle?: string;
  image?: string;
  category?: string;
  readingTime?: string;
}

export default function GuideHero({ 
  lang, 
  title, 
  subtitle, 
  image, 
  category, 
  readingTime = "6 min" 
}: GuideHeroProps) {
  const isAr = lang === 'ar';

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] flex flex-col justify-start overflow-hidden">
      {/* 1. DYNAMIC IMAGE: Now pulls from Supabase image_url */}
      <div className="absolute inset-0 z-0">
      <Image
  // If 'image' exists, use it; otherwise, use the fallback string
  src={image || "/images/guides/hero-property.jpg"} 
  alt={title}
  fill
  priority
  unoptimized={true} 
  className="object-cover z-0"
  sizes="100vw"
/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24">
        
        {/* Row 1: Category & Socials */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="btn-brand px-6 py-2 rounded-full text-[12px] font-medium uppercase tracking-tighter shadow-2xl">
              {category || (isAr ? "دليل" : "Guide")}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-bold text-white shadow-sm">
              <Clock size={15} className="text-[#12AD65]" />
              <span>{readingTime}</span>
            </div>
          </div>

          <div className="scale-90 origin-right">
            <SocialActions lang={lang} title={title} />
          </div>
        </div>

        {/* Row 2: Dynamic Title & Subtitle */}
        <div className="max-w-5xl">
          <h1 className="text-4xl lg:text-7xl font-medium text-white leading-[1.1] tracking-[0.1em] mb-8 drop-shadow-2xl uppercase">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg lg:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl drop-shadow-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}