'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import SocialActions from '@/components/shared/social-actions'; 

export default function GuideHero({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] flex flex-col justify-start overflow-hidden">
      {/* 1. THE ACTUAL IMAGE: No more opacity-60 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/guides/hero-property.jpg" // Make sure this path is correct in your public folder
          alt="Luxury Property Guide"
          fill
          className="object-cover"
          priority
        />
        {/* SMART GRADIENT: Dark at top (for text) and fades to clear (to show the villa) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
      </div>

      {/* 2. TOP-ALIGNED CONTENT */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24">
        
        {/* Row 1: Category & Socials */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-[#12AD65] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
              {isAr ? "دليل الإمارات" : "UAE Guide"}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-bold text-white shadow-sm">
              <Clock size={15} className="text-[#12AD65]" />
              <span>6 min</span>
            </div>
          </div>

          {/* Clean Social Actions */}
          <div className="scale-90 origin-right">
            <SocialActions variant="light" />
          </div>
        </div>

        {/* Row 2: Large Title */}
        <div className="max-w-5xl">
          <h1 className="text-4xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8 drop-shadow-2xl">
            {isAr 
              ? "الاستثمار في عقارات الإمارات: الدليل الكامل للمواطنين العراقيين" 
              : "Investing in UAE Real Estate: The Complete Guide for Iraqi Citizens"}
          </h1>
          <p className="text-lg lg:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl drop-shadow-lg">
            {isAr
              ? "اكتشف كيفية تأمين ثروتك والحصول على الإقامة في دبي."
              : "Secure your wealth and obtain residency in Dubai's premier markets."}
          </p>
        </div>
      </div>
    </section>
  );
}