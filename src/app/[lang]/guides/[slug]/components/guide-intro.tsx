'use client';

import React from 'react';

interface GuideIntroProps {
  lang: string;
  intro?: string; // البيانات القادمة من حقل 'intro_text'
}

export default function GuideIntro({ lang, intro }: GuideIntroProps) {
  const isAr = lang === 'ar';

  return (
    <section className="py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl">
        {/* 1. عنوان القسم - ثابت */}
        <h2 className={`text-3xl lg:text-5xl font-medium text-black mb-8 tracking-[0.1em] uppercase ${isAr ? 'font-arabic' : 'font-sans'}`}>
          {isAr ? "المقدمة" : "Introduction"}
        </h2>

        {/* 2. النص الديناميكي للمقدمة مع دعم التنسيق (HTML) */}
        <div className="space-y-6">
          {intro ? (
            <div 
              className={`
                text-lg lg:text-2xl text-gray-500 leading-relaxed font-medium
                prose prose-slate max-w-none
                ${isAr ? 'prose-rtl text-right' : 'text-left'}
              `}
              dangerouslySetInnerHTML={{ __html: intro }} 
            />
          ) : (
            <p className="text-lg lg:text-2xl text-gray-500 leading-relaxed font-medium">
              {isAr 
                ? "استكشف أساسيات سوق العقارات من خلال هذا الدليل الشامل." 
                : "Explore the essentials of the property market through this comprehensive guide."
              }
            </p>
          )}
          
          {/* النص التوضيحي الثاني - يمكن بقاؤه ثابتاً أو جعله اختيارياً */}
          <p className={`text-base lg:text-lg text-[#4B5563] leading-relaxed tracking-[0.05em] ${isAr ? 'text-right' : 'text-left'}`}>
            {isAr ? (
              "لقد تم إعداد هذا المحتوى ليوفر لك رؤية واضحة حول فرص الاستثمار المتاحة."
            ) : (
              "This content has been prepared to provide you with clear insights into available investment opportunities."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}