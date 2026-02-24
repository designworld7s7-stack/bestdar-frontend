'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // استيراد المكون الذكي لتحسين الصور
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function GuideCard({ id, title, description, image, lang }: any) {
  const isAr = lang === 'ar';

  return (
    <Link 
      href={`/${lang}/guides/${id}`}
      /* h-full تضمن تمدد البطاقات بشكل متساوٍ في الشبكة (Grid) */
      className="group flex flex-col lg:flex-row overflow-hidden rounded-[24px] lg:rounded-[32px] bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl items-stretch h-full min-h-[400px] lg:min-h-[280px]"
    >
      {/* منطقة الصورة: استخدام fill لتغطية المساحة المخصصة ديناميكياً */}
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[40%] shrink-0 bg-gray-50">
        <Image 
          src={image || "/images/placeholders/guide.jpg"} 
          alt={title} 
          fill
          sizes="(max-width: 1024px) 100vw, 40vw" // يخبر المتصفح أن الصورة تأخذ 40% من العرض في الشاشات الكبيرة
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* منطقة المحتوى: flex-1 لملء المساحة المتبقية */}
      <div className="flex flex-1 flex-col justify-between p-6 lg:p-10 bg-white">
        <div className="space-y-3 lg:space-y-4">
          <h3 className="text-xl font-semibold leading-tight text-black transition-colors duration-300 group-hover:text-[#12AD65] lg:text-2xl xl:text-3xl line-clamp-2 uppercase">
            {title}
          </h3>
          <p className="text-sm font-normal text-gray-500 lg:text-base xl:text-lg line-clamp-3">
            {description}
          </p>
        </div>

        {/* زر الحركة: مثبت دائماً في أسفل البطاقة */}
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