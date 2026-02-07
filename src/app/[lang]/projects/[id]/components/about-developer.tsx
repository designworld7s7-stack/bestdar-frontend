'use client';

import React from 'react';
import { Award, Globe, History } from 'lucide-react';

export default function AboutDeveloper({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const stats = [
    { label: isAr ? "سنة خبرة" : "Years Experience", value: "25+", icon: <History size={16} /> },
    { label: isAr ? "جائزة" : "Awards Won", value: "80+", icon: <Award size={16} /> },
    { label: isAr ? "دولة" : "Countries", value: "12", icon: <Globe size={16} /> },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24">
      {/* Section Header */}
      <div className="flex flex-col gap-4 mb-10 lg:mb-16">
        <h3 className="text-xl lg:text-3xl font-black text-black tracking-tighter uppercase">
          {isAr ? "عن المطور" : "About the Developer"}
        </h3>
        <div className="h-1 w-12 bg-[#12AD65] rounded-full" />
      </div>

      {/* Developer Card: Vertical on Mobile, Horizontal on Desktop */}
      <div className="bg-white p-8 lg:p-16 rounded-[32px] lg:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 transition-all duration-500 hover:shadow-xl">
        
        {/* Logo Placeholder */}
        <div className="h-24 w-24 lg:h-32 lg:w-32 bg-black rounded-full flex items-center justify-center text-white text-3xl lg:text-5xl font-black shrink-0 shadow-2xl">
          E
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="space-y-3">
            <h4 className="text-2xl lg:text-4xl font-black text-black tracking-tight">Emaar Turkey</h4>
            <p className="text-gray-500 text-sm lg:text-lg font-medium leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {isAr 
                ? "رائد عالمي في العقارات، تشتهر إعمار بمشاريعها الأيقونية والتزامها بالجودة. مع أكثر من 25 عاماً من الخبرة، قدموا آلاف المنازل الفاخرة."
                : "A global leader in real estate, Emaar is renowned for its iconic projects and commitment to quality. With over 25 years of experience, they have delivered thousands of luxury homes."}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-16 pt-6 border-t border-gray-50">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-xl lg:text-3xl font-black text-black tracking-tighter">{stat.value}</span>
                <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}