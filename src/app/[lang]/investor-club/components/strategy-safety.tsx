'use client';

import React from 'react';

export default function StrategySafety({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const cards = [
    {
      title: isAr ? "الاستراتيجية: خطة الخروج" : "The Strategy: Exit Plan",
      text: isAr 
        ? "تبدأ كل رحلة استثمار بجهة محددة بوضوح. نحن نصمم استراتيجيات خروج دقيقة قبل الدخول."
        : "Every investment journey begins with a clear destination. We craft meticulous exit strategies before entry, ensuring optimal returns.",
    },
    {
      title: isAr ? "الأمان: أصول مفحوصة" : "The Safety: Vetted Assets",
      text: isAr 
        ? "الأمن هو الأهم. تضم محفظتنا فقط الأصول التي تم فحصها بدقة واختبارها ضد تقلبات السوق."
        : "Security is paramount. Our portfolio comprises only meticulously vetted assets, rigorously screened to safeguard your capital.",
    },
    {
      title: isAr ? "النمو: قيمة تراكمية" : "The Growth: Compounding Value",
      text: isAr 
        ? "الثروة الحقيقية تتسارع. نحن نسخر القوة الفريدة للتراكم لإعادة استثمار الأرباح وتنمية أصولك."
        : "True wealth accelerates. We harness the unparalleled power of compounding, reinvesting gains to exponentially grow your assets.",
    }
  ];

  return (
    <section className="bg-[#050505] py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="text-4xl lg:text-6xl font-black text-white text-center mb-20 lg:mb-32 tracking-tighter">
          {isAr ? "الاستراتيجية والأمان" : "Strategy & Safety"}
        </h2>

        {/* Grid: 3 Columns on Desktop, Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="relative bg-[#1A1A1A] p-10 lg:p-12 rounded-[32px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#12AD65]/30 group"
            >
              {/* Green Top Border Accent */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#12AD65] opacity-80" />

              <h3 className="text-[#12AD65] text-xl lg:text-2xl font-black mb-6 tracking-tight">
                {card.title}
              </h3>
              
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed font-medium">
                {card.text}
              </p>
              
              {/* Subtle background glow on hover */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#12AD65] opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}