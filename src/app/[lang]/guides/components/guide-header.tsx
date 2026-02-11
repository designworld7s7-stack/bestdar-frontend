'use client';

import React from 'react';
import BackButton from '@/components/shared/back-button';

export default function GuideHeader({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    /* pt-4 on mobile moves the title almost to the very top */
    <section className="bg-white pt-4 lg:pt-32 pb-6 lg:pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-start gap-2 lg:gap-6">
          
          {/* Main Title - Tightened leading to save space */}
          <h1 className="text-4xl lg:text-7xl font-medium text-black uppercase tracking-tighter leading-[0.8]">
            {isAr ? "أدلة المستثمر" : "Investor Guides"}
          </h1>

          {/* Accent Line & Subtitle */}
          <div className="flex items-center gap-3 lg:gap-6 w-full">
            <div className="h-[2px] w-8 lg:w-20 bg-[#12AD65] shrink-0" />
            <p className="text-gray-400 text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em]">
              {isAr ? "رؤى حصرية" : "Exclusive Insights"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}