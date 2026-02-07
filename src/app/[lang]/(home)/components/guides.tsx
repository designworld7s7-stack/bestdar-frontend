'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideCard from '@/components/shared/guide-card';

const guideData = [
  { id: "g1", title: "How Iraqis Can Buy Property in Turkey", description: "Legal steps, documents, taxes", image: "/guide-1.jpg" },
  { id: "g2", title: "Top 5 Neighborhoods in Istanbul", description: "Safest and most family-friendly districts.", image: "/guide-2.jpg" },
  { id: "g3", title: "UAE Golden Visa for Investors", description: "How to secure long-term residency.", image: "/guide-3.jpg" },
  { id: "g4", title: "Buying Off-Plan in Dubai", description: "Everything you need to know about payment plans.", image: "/guide-4.jpg" },
];

export default function GuidesSection({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto bg-white">
      {/* Header - Matches ArticlesAndGuides.png */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-6xl font-black text-brand-black tracking-tighter leading-tight">
          {isAr ? "أدلة ورؤى عقارية" : "Real Estate Guides & Insights"}
        </h2>
        <p className="mt-6 text-gray-500 font-medium max-w-2xl mx-auto">
          {isAr 
            ? "مقالات منسقة لمساعدة المستثمرين العراقيين على الشراء بأمان وثقة." 
            : "Curated articles to help Iraqi investors buy safely and confidently."}
        </p>
      </div>

      {/* Grid Layout - 4 Cards Desktop | Carousel Mobile */}
      <div className="relative">
        {/* Swipe Indicator for Mobile */}
        <div className="flex justify-end items-center gap-2 mb-4 lg:hidden text-gray-400 text-[10px] font-black uppercase tracking-widest">
          <span>{isAr ? "اسحب" : "Swipe"}</span>
          <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
        </div>

        {/* Desktop: grid-cols-4 
            Mobile: flex with overflow-x-auto for carousel behavior
        */}
        <div className="flex lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar lg:overflow-visible lg:pb-0">
          {guideData.map((guide) => (
            <div key={guide.id} className="min-w-[85%] sm:min-w-[48%] lg:min-w-full snap-center">
              <GuideCard {...guide} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-20 text-center">
        <Link 
          href={`/${lang}/guides`}
          className="inline-flex items-center gap-3 text-[#12AD65] font-black text-sm lg:text-base group"
        >
          <span>{isAr ? "عرض جميع الأدلة" : "View All Guides"}</span>
          <ArrowRight 
            size={20} 
            className={`transition-transform duration-300 group-hover:translate-x-2 ${isAr ? "rotate-180 group-hover:-translate-x-2" : ""}`} 
          />
        </Link>
      </div>
    </section>
  );
}