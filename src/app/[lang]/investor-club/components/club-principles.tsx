'use client';

import React from 'react';
import { TrendingUp, Target, BarChart3 } from 'lucide-react';

export default function ClubPrinciples({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="bg-white py-20 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Container: Row on Desktop, Column on Mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Photo Container */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-[40px] shadow-2xl">
              <img 
                src="/club-principles.jpg" 
                alt="Partnership" 
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-6xl font-medium text-black tracking-[0.1em] leading-tight mb-8">
              {isAr ? "نحن لا نلحق بالأسواق؛ بل نتحرك قبلها." : "We don't chase markets; we move before them."}
            </h2>
            
            <p className="text-gray-500 text-lg lg:text-xl font-medium leading-relaxed mb-10 tracking-[0.05em]">
              {isAr 
                ? "في بيست دار، نحن نؤمن بالسبق الاستراتيجي. نادي المستثمرين لدينا مصمم لمنحك الأفضلية المطلقة من خلال الوصول المبكر والبيانات الدقيقة."
                : "At Best Dar, we believe in strategic precedence. Our Investor Club is engineered to give you the ultimate edge through early access and precision data."}
            </p>

            {/* Principles Icons from Frame.jpg */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <TrendingUp className="text-[#12AD65]" size={32} />
                <span className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563]">Growth</span>
              </div>
              <div className="flex flex-col gap-2">
                <Target className="text-[#12AD65]" size={32} />
                <span className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563]">Precision</span>
              </div>
              <div className="flex flex-col gap-2">
                <BarChart3 className="text-[#12AD65]" size={32} />
                <span className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563]">Strategy</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}