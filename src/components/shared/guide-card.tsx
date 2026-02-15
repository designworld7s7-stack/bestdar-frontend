'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function GuideCard({ id, title, description, image, lang }: any) {
  const isAr = lang === 'ar';

  return (
    <Link 
      href={`/${lang}/guides/${id}`}
      /* min-h ensures consistent vertical presence; h-full allows the grid to stretch them equally */
      className="group flex flex-col lg:flex-row overflow-hidden rounded-[24px] lg:rounded-[32px] bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl items-stretch h-full min-h-[400px] lg:min-h-[280px]"
    >
      {/* IMAGE AREA: aspect-video on mobile, fixed width on desktop */}
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-[40%] shrink-0">
        <img 
          src={image || "/images/placeholders/guide.jpg"} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* CONTENT AREA: flex-1 ensures it fills the remaining horizontal space */}
      <div className="flex flex-1 flex-col justify-between p-6 lg:p-10 bg-white">
        <div className="space-y-3 lg:space-y-4">
          {/* line-clamp-2 prevents a very long title from breaking the symmetry */}
          <h3 className="text-xl font-semibold leading-tight text-black transition-colors duration-300 group-hover:text-[#12AD65] lg:text-2xl xl:text-3xl line-clamp-2 uppercase">
            {title}
          </h3>
          {/* line-clamp-3 ensures descriptions don't push the card footer down unevenly */}
          <p className="text-sm font-normal text-gray-500 lg:text-base xl:text-lg line-clamp-3">
            {description}
          </p>
        </div>

        {/* Action Button: Always pinned to the bottom of the card */}
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