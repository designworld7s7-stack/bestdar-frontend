'use client';

import React from 'react';

export default function ProjectOverview({ lang, description }: { lang: string, description?: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-10 lg:py-16">
      {/* The Overview Card */}
      <div className="bg-white p-8 lg:p-16 rounded-[32px] lg:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
        
        {/* Title Section */}
        <div className="flex flex-col gap-4 mb-8 lg:mb-10">
          <h3 className="text-xl lg:text-3xl font-black text-black tracking-tighter uppercase">
            {isAr ? "نظرة عامة على المشروع" : "Project Overview"}
          </h3>
          <div className="h-1 w-12 bg-[#12AD65] rounded-full" />
        </div>

        {/* Dynamic Description Area */}
        <div className="max-w-4xl">
          <p className="text-gray-500 text-sm lg:text-lg font-medium leading-[1.8] lg:leading-[2]">
            {description || (isAr 
              ? "يقع هذا المشروع في قلب المدينة، ويوفر مزيجاً مثالياً من الفخامة والراحة. تم تصميم كل التفاصيل بعناية لضمان تجربة معيشية استثنائية للمستثمرين الباحثين عن التميز."
              : "Located in the heart of the city, this project offers a perfect blend of luxury and convenience. Every detail has been carefully designed to ensure an exceptional living experience for investors seeking excellence.")}
          </p>
        </div>

        {/* Subtle Brand Accent */}
        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center gap-4 opacity-40">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
             {isAr ? "حصرياً عبر بيست دار" : "Exclusively via Best Dar"}
           </span>
        </div>
      </div>
    </section>
  );
}