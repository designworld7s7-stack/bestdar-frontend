'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

// ✅ أضفنا title_ar و description_ar لاستلام الترجمة من سوبابيس
export default function GuideCard({ id, title, title_ar, description, description_ar, image, lang }: any) {
  const isAr = lang === 'ar';

  // ✅ منطق اختيار النص بناءً على اللغة المتوفرة
  const displayTitle = isAr && title_ar ? title_ar : title;
  const displayDescription = isAr && description_ar ? description_ar : description;

  return (
    <Link 
      href={`/${lang}/guides/${id}`}
      dir={isAr ? "rtl" : "ltr"}
      className="group flex flex-col lg:flex-row overflow-hidden rounded-[24px] lg:rounded-[32px] bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl items-stretch h-full min-h-[400px] lg:min-h-[280px]"
    >
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[40%] shrink-0 bg-gray-50">
        <Image 
          src={image || "/images/placeholders/guide.jpg"} 
          alt={displayTitle} 
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 lg:p-10 bg-white">
        <div className="space-y-3 lg:space-y-4">
          <h3 className="text-xl font-semibold leading-tight text-black transition-colors duration-300 group-hover:text-[#12AD65] lg:text-2xl xl:text-3xl line-clamp-2 uppercase">
            {/* ✅ نستخدم displayTitle الآن */}
            {displayTitle}
          </h3>
          <p className="text-sm font-normal text-gray-500 lg:text-base xl:text-lg line-clamp-3 leading-relaxed">
            {/* ✅ نستخدم displayDescription الآن */}
            {displayDescription}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#12AD65] lg:text-sm">
          <span>{isAr ? "اقرأ الدليل" : "READ GUIDE"}</span>
          <ArrowRight 
            size={18} 
            className={clsx(
              "transition-transform duration-300 group-hover:translate-x-2",
              isAr && "rotate-180 group-hover:-translate-x-2"
            )} 
          />
        </div>
      </div>
    </Link>
  );
}