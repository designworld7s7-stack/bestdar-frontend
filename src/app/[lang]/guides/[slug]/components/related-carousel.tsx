'use client';

import React from 'react';
import ArticleCard from '@/components/shared/article-card';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

// Mock data for testing - replace with your actual CMS data
const relatedData = [
  {
    id: "buying-in-turkey",
    title: "How Iraqis Can Buy Property in Turkey: The Ultimate 2026 Guide",
    excerpt: "Navigate the legal landscape, uncover tax advantages, and secure your investment with our step-by-step guide.",
    image: "/images/guides/turkey-hero.jpg",
    category: "Investment",
    date: "Jan 15, 2026",
    location: "Turkey"
  },
  {
    id: "dubai-roi-2026",
    title: "The Future of Real Estate in 2026: ROI Trends to Watch",
    excerpt: "From sustainable smart homes to the rise of secondary cities, here is what every investor needs to know.",
    image: "/images/guides/dubai-trends.jpg",
    category: "Market Report",
    date: "Feb 01, 2026",
    location: "UAE"
  },
  {
    id: "golden-visa-uae",
    title: "Understanding the Golden Visa: A Guide for Investors",
    excerpt: "A comprehensive breakdown of the requirements and benefits of the 10-year residency for property owners.",
    image: "/images/guides/visa-guide.jpg",
    category: "Legal",
    date: "Dec 10, 2025",
    location: "UAE"
  }
];

export default function RelatedCarousel({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 lg:py-32">
      {/* 1. Header with 'View All' Link */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl lg:text-4xl font-black text-black tracking-tighter uppercase">
          {isAr ? "أدلة ذات صلة" : "Related Guides"}
        </h2>
        <Link 
          href={`/${lang}/guides`} 
          className="hidden lg:flex items-center gap-2 text-[#12AD65] font-black text-[11px] uppercase tracking-widest hover:gap-4 transition-all"
        >
          {isAr ? "عرض الكل" : "View All"}
          <MoveRight size={16} />
        </Link>
      </div>

      {/* 2. Responsive Container */}
      <div className="relative">
        {/* Desktop: 3-column grid
            Mobile: Horizontal scroll with snap-center 
        */}
        <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pb-10 lg:pb-0 no-scrollbar snap-x snap-mandatory">
          {relatedData.map((article) => (
            <div key={article.id} className="min-w-[85vw] lg:min-w-0 snap-center">
              <ArticleCard {...article} lang={lang} />
            </div>
          ))}
        </div>

        {/* 3. Mobile Swipe Indicator */}
        <div className="lg:hidden flex items-center justify-center gap-3 mt-4 text-gray-300">
           <span className="text-[9px] font-black uppercase tracking-widest animate-pulse">
             {isAr ? "اسحب للمزيد" : "Swipe for more"}
           </span>
           <div className="w-12 h-[1px] bg-gray-100" />
        </div>
      </div>
    </section>
  );
}