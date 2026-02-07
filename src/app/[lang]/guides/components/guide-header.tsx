'use client';

import React from 'react';
import BackButton from '@/components/shared/back-button';

export default function GuideHeader({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="bg-white pt-12 lg:pt-32 pb-12 lg:pb-20 border-b border-gray-50">
      {/* 1. Global Back Button: Desktop Only */}
      <div className="hidden lg:block">
        <BackButton lang={lang} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-start gap-6">
          
          {/* 2. Main Title */}
          <h1 className="text-5xl lg:text-8xl font-black text-black tracking-tighter uppercase">
            {isAr ? "جميع الأدلة" : "All Guides"}
          </h1>

          {/* 3. Accent & Subtitle */}
          <div className="flex items-center gap-6 w-full">
            {/* The brandGreen line from H2.png */}
            <div className="h-[3px] w-12 lg:w-20 bg-[#12AD65] shrink-0" />
            
            <p className="text-gray-500 text-sm lg:text-xl font-medium tracking-tight">
              {isAr 
                ? "استكشف الأدلة والنصائح ورؤى السوق للعقارات في الإمارات وتركيا." 
                : "Explore guides, tips, and market insights for UAE and Turkey real estate."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}