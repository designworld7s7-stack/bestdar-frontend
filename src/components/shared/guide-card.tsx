'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface GuideCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  lang: string;
}

export default function GuideCard({ id, title, description, image, lang }: GuideCardProps) {
  const isAr = lang === 'ar';
  const brandGreen = "#12AD65";

  return (
    <Link 
      href={`/${lang}/guides/${id}`}
      // One component: Vertical on mobile, Horizontal on desktop (lg:flex-row)
      className="group flex flex-col overflow-hidden rounded-[32px] bg-white shadow-premium transition-all duration-300 hover:shadow-xl lg:flex-row lg:items-stretch"
    >
      {/* IMAGE AREA */}
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-square lg:w-2/5">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-1 flex-col justify-center p-6 lg:p-10">
        {/* Title: Turns green on hover */}
        <h3 className="text-xl font-medium leading-tight text-brand-black transition-colors duration-300 group-hover:text-[#12AD65] lg:text-2xl">
          {title}
        </h3>
        
        <p className="mt-3 text-sm font-medium text-[#4B5563] lg:text-base">
          {description}
        </p>

        {/* Action: Arrow moves right on hover */}
        <div 
          style={{ color: brandGreen }}
          className="mt-6 flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
        >
          <span>{isAr ? "اقرأ الدليل" : "Read Guide"}</span>
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