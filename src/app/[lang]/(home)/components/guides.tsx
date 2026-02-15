'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideCard from '@/components/shared/guide-card';

// We now accept 'guides' as a prop from the Server Page
export default function GuidesSection({ lang, guides }: { lang: string, guides: any[] }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-6xl font-medium text-brand-black tracking-[0.1em] leading-tight uppercase">
          {isAr ? "أدلة ورؤى عقارية" : "Real Estate Guides & Insights"}
        </h2>
        <p className="mt-6 text-gray-500 font-medium max-w-2xl mx-auto">
          {isAr 
            ? "مقالات منسقة لمساعدة المستثمرين العراقيين على الشراء بأمان وثقة." 
            : "Curated articles to help Iraqi investors buy safely and confidently."}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="relative">
        <div className="flex justify-end items-center gap-2 mb-4 lg:hidden text-[#4B5563] text-[12px] font-medium uppercase tracking-tighter">
         
          
        </div>

        {/* Updated to grid-cols-4 for desktop */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
 {guides.map((guide) => (
  <div key={guide.id} className="w-full h-full">
    <GuideCard 
      id={guide.slug}
      title={guide.title}
      description={guide.excerpt}
      // DYNAMIC: Ensure this uses 'guide' from the loop
      image={guide.image_url} 
      lang={lang} 
    />
  </div>
))}
      </div>

      {/* Footer Link */}
      <div className="mt-20 text-center">
        <Link 
          href={`/${lang}/guides`}
          className="inline-flex items-center gap-3 text-[#12AD65] font-medium text-sm lg:text-base group"
        >
          <span>{isAr ? "عرض جميع الأدلة" : "View All Guides"}</span>
          <ArrowRight 
            size={20} 
            className={`transition-transform duration-300 group-hover:translate-x-2 ${isAr ? "rotate-180 group-hover:-translate-x-2" : ""}`} 
          />
        </Link>
      </div>
      </div>
    </section>
  );
}