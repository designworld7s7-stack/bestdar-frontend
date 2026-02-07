'use client';

import React from 'react';
import { MessageSquare, ClipboardCheck, Eye, FileSignature } from 'lucide-react';

export default function HowWeWork({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const steps = [
    {
      icon: <MessageSquare size={24} />,
      title: isAr ? "استشارة" : "Consultation",
      description: isAr 
        ? "فهم ميزانيتك وأهدافك الاستثمارية."
        : "Understanding your budget and goals."
    },
    {
      icon: <ClipboardCheck size={24} />,
      title: isAr ? "مشاريع مختارة" : "Shortlisted Projects",
      description: isAr 
        ? "نقدم فقط الخيارات التي تم التحقق منها بدقة."
        : "We present only thoroughly verified options."
    },
    {
      icon: <Eye size={24} />,
      title: isAr ? "المعاينة والتقييم" : "Viewing & Evaluation",
      description: isAr 
        ? "جولات عقارية عبر الإنترنت أو شخصياً."
        : "Online or in-person property tours."
    },
    {
      icon: <FileSignature size={24} />,
      title: isAr ? "الحجز والأوراق" : "Booking & Paperwork",
      description: isAr 
        ? "مساعدة كاملة حتى استلام سند الملكية."
        : "Full assistance until title deed."
    }
  ];

  return (
    <section className="bg-[#050505] py-24 lg:py-40 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10">
        
        {/* Header */}
        <div className="mb-16 lg:mb-32">
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
            {isAr ? "كيف نعمل" : "How We Work"}
          </h2>
          <p className="text-gray-500 font-medium text-sm lg:text-lg max-w-2xl mx-auto">
            {isAr 
              ? "عملية بسيطة وشفافة للوصول إلى عقارك الجديد."
              : "A simple, transparent process to your new property."}
          </p>
        </div>

        {/* Process Steps: Horizontal for Desktop, Vertical Stack for Mobile */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          
          {/* Connecting Line: Desktop Only */}
          <div className="hidden lg:block absolute top-[25%] left-0 w-full h-[2px] bg-white/10 -z-10" />

          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex-1 w-full flex flex-col items-center group"
            >
              {/* Card Container */}
              <div className="w-full bg-white p-10 lg:p-12 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex flex-col items-center transition-all duration-500 hover:shadow-[0_20px_60px_rgba(18,173,101,0.15)] hover:-translate-y-2 relative">
                
                {/* Icon Circle */}
                <div className="h-16 w-16 rounded-full border-2 border-[#12AD65] flex items-center justify-center text-[#12AD65] bg-white absolute -top-8 left-1/2 -translate-x-1/2 shadow-lg group-hover:bg-[#12AD65] group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>

                <div className="mt-4 flex flex-col items-center">
                  <h3 className="text-xl lg:text-2xl font-black text-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm lg:text-base font-medium leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>

                {/* Step Number */}
                <span className="absolute top-6 right-8 text-[10px] font-black text-gray-100 uppercase tracking-widest">
                  Step 0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Subtle background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#12AD65]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}