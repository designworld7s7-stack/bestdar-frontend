'use client';

import React from 'react';
import { clsx } from 'clsx';

export default function JoinPath({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const steps = [
    {
      title: isAr ? "الاستثمار الأولي" : "Initial Investment",
      desc: isAr ? "(نقطة الدخول)" : "(The Entry Point)",
    },
    {
      title: isAr ? "تخصيص الأصول" : "Asset Allocation",
      desc: isAr ? "اختيار المحفظة" : "Portfolio Selection",
    },
    {
      title: isAr ? "انضمام آلي للنادي" : "Automatic Club Induction",
      desc: isAr ? "تفعيل العضوية" : "Membership Activation",
    }
  ];

  return (
    <section className="bg-white py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Section Header */}
        <div className="mb-20 lg:mb-32">
          <h2 className="text-4xl lg:text-7xl font-medium text-black tracking-[0.1em] mb-6">
            {isAr ? "طريقك نحو الحصرية" : "Your Path to Exclusivity"}
          </h2>
          <p className=" font-medium text-sm lg:text-lg tracking-[0.05em]">
            {isAr ? "اكتشف العملية المصممة خصيصاً لأعضائنا المتميزين." : "Discover the tailored process designed for our discerning members."}
          </p>
        </div>

        {/* DESKTOP TIMELINE: Horizontal */}
        <div className="hidden lg:flex items-center justify-between relative max-w-5xl mx-auto">
          {/* Background Connecting Line */}
          <div className="absolute top-[11px] left-0 w-full h-[2px] bg-gray-100 z-0" />
          
          {/* Active Progress Line */}
          <div className="absolute top-[11px] left-0 w-1/2 h-[2px] bg-[#12AD65] z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center flex-1">
              {/* Node */}
              <div className={clsx(
                "h-6 w-6 rounded-full border-[3px] bg-white mb-6",
                index <= 1 ? "border-[#12AD65]" : "border-gray-200"
              )} />
              
              <h3 className="text-sm font-medium text-black uppercase tracking-[0.1em] mb-2">{step.title}</h3>
              <p className="text-[12px] font-medium  uppercase tracking-[0.1em]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* MOBILE TIMELINE: Vertical Stack */}
        <div className="lg:hidden flex flex-col items-start gap-12 max-w-xs mx-auto text-left relative">
          {/* Vertical Line */}
          <div className="absolute top-0 left-[11px] w-[2px] h-full bg-gray-100" />
          
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start relative z-10">
              <div className={clsx(
                "h-6 w-6 rounded-full border-[3px] bg-white shrink-0 mt-1",
                index === 0 ? "border-[#12AD65]" : "border-gray-200"
              )} />
              <div>
                <h3 className="text-xs font-medium text-black uppercase tracking-[0.1em] mb-1">{step.title}</h3>
                <p className="text-[12px] font-medium text-[#4B5563] uppercase tracking-[0.1em]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}