'use client';

import React from 'react';
import { ShieldCheck, Building, Verified } from 'lucide-react';

export default function AboutDeveloper({ lang, project }: { lang: string, project: any }) {
  const isAr = lang === 'ar';

  const devName = project?.developer_name;
  const devDescription = isAr ? project?.dev_description_ar : project?.dev_description;

  if (!devName && !devDescription) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24 border-t border-gray-50">
      <div className="flex flex-col gap-4 mb-10 lg:mb-16">
        <h3 className="text-xl lg:text-3xl font-medium text-black tracking-[0.1em] uppercase">
          {isAr ? "عن المطور" : "About the Developer"}
        </h3>
        <div className="h-1 w-12 bg-[#12AD65] rounded-full" />
      </div>

      <div className="relative bg-white p-8 lg:p-16 rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20 overflow-hidden">
        
        {/* Visual Enhancement: Background Accent */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Building size={200} />
        </div>

        {/* Brand Avatar with Auto-Initials */}
        <div className="relative shrink-0">
          <div className="h-28 w-28 lg:h-36 lg:w-36 bg-[#0A0A0A] rounded-3xl flex items-center justify-center text-white text-4xl lg:text-6xl font-light shadow-2xl rotate-3">
             {devName ? devName[0].toUpperCase() : 'D'}
          </div>
          {/* Verified Badge: Hardcoded to save you data entry time */}
          <div className="absolute -bottom-2 -right-2 bg-[#12AD65] text-white p-2 rounded-full shadow-lg border-4 border-white">
            <Verified size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-8 text-center lg:text-left z-10">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <h4 className="text-3xl lg:text-5xl font-medium text-black tracking-tight">
                {devName}
              </h4>
              {/* Auto-Label: Hardcoded boutique label */}
              <span className="px-4 py-1 rounded-full border border-[#12AD65] text-[#12AD65] text-[10px] font-bold uppercase tracking-widest">
                {isAr ? "مطور معتمد" : "Platinum Partner"}
              </span>
            </div>
            
            <p className="text-gray-500 text-sm lg:text-xl font-medium leading-[1.8] max-w-4xl whitespace-pre-line">
              {devDescription}
            </p>
          </div>

          {/* Enhancement: Static Trust Indicators (No Data Entry Needed) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-12 pt-8 border-t border-gray-100">
             <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck size={18} className="text-[#12AD65]" />
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {isAr ? "ضمان الجودة" : "Quality Assured"}
                </span>
             </div>
             <div className="flex items-center gap-2 text-gray-400">
                <Building size={18} className="text-[#12AD65]" />
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {isAr ? "تسليم في الموعد" : "On-Time Delivery"}
                </span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}