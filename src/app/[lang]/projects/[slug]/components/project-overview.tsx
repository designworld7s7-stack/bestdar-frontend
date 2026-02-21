'use client';

import React from 'react';

// Updated props to include project object
export default function ProjectOverview({ lang, project }: { lang: string, project: any }) {
  const isAr = lang === 'ar';
  
const displayOverview = isAr 
    ? (project?.overview_text_ar || project?.overview_text || "يقع هذا المشروع في قلب المدينة...")
    : (project?.overview_text || "Located in the heart of the city...");
  
    return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-10 lg:py-16">
      {/* The Overview Card: Maintained original shadow and rounding */}
      <div className="bg-white p-8 lg:p-16 rounded-[32px] lg:rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.03)]">
        
        {/* Title Section: Maintained original spacing */}
        <div className="flex flex-col gap-6 mb-10 lg:mb-12">
          <h3 className="text-2xl lg:text-[40px] font-medium text-black uppercase tracking-[0.1em]">
            {isAr ? "نظرة عامة على المشروع" : "Project Overview"}
          </h3>
          <div className="h-[2px] w-16 bg-[#12AD65]" />
        </div>

        {/* Dynamic Description Area: Linked to Supabase 'overview_text_ar' and 'overview_text' */}
        <div className="max-w-4xl">
          <p className="text-[#374151] text-[16px] lg:text-[20px] font-medium leading-[1.8] tracking-normal whitespace-pre-line">
            {/* 👇 نستخدم المتغير الجاهز هنا لكي نحافظ على نظافة الكود */}
            {displayOverview}
          </p>
        </div>

        {/* Subtle Brand Accent */}
        <div className="mt-16 pt-10 border-t border-gray-50 flex items-center gap-4">
           <span className="text-[12px] font-medium text-[#6B7280] uppercase tracking-[0.4em]">
             {isAr ? "حصرياً عبر بيست دار" : "Exclusively via Best Dar"}
           </span>
        </div>
      </div>
    </section>
  );
}