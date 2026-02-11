'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCardHome from '@/components/shared/project-card-home';
import GuideCard from '@/components/shared/guide-card';

const turkeyProjects = [
  { id: "tr-1", title: "Istanbul – Bosphorus Residences", price: "$180,000", image: "/turkey-1.jpg" },
  { id: "tr-2", title: "Antalya – Mediterranean Villas", price: "$650,000", image: "/turkey-2.jpg" },
  { id: "tr-3", title: "Trabzon – Green Valley", price: "$150,000", image: "/turkey-3.jpg" },
];

const turkeyGuides = [
  { id: "tg-1", title: "How Iraqis Can Buy Property in Turkey", description: "Legal steps, documents, taxes", image: "/guide-1.jpg" },
  { id: "tg-2", title: "Top 5 Neighborhoods in Istanbul", description: "Safest and most family-friendly districts.", image: "/guide-2.jpg" },
];

export default function TurkeySection({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-5xl font-medium text-brand-black leading-tight">
          {isAr ? "استكشف العقارات في تركيا" : "Explore Real Estate in Turkey"}
        </h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
          {isAr 
            ? "مشاريع متميزة وأدلة أساسية منسقة للمشترين العراقيين." 
            : "Premium projects and essential guides curated for Iraqi buyers."}
        </p>
      </div>

      {/* 1. PROJECT CARDS: Grid on Desktop | Carousel on Mobile */}
      <div className="relative">
        {/* Mobile "Swipe" Indicator */}
        <div className="flex justify-end items-center gap-2 mb-4 lg:hidden text-[#4B5563] text-xs font-bold uppercase tracking-tighter">
          <span>{isAr ? "اسحب" : "Swipe"}</span>
          <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
        </div>

        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar lg:overflow-visible lg:pb-0">
          {turkeyProjects.map((project) => (
            <div key={project.id} className="min-w-[85%] sm:min-w-[45%] lg:min-w-full snap-center">
              <ProjectCardHome {...project} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {/* 2. GUIDE CARDS: Stacked Vertically on Mobile | 2 Columns on Desktop */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {turkeyGuides.map((guide) => (
          <GuideCard key={guide.id} {...guide} lang={lang} />
        ))}
      </div>

      {/* 3. VIEW ALL FOOTER */}
      <div className="mt-16 text-center">
        <Link 
          href={`/${lang}/turkey`}
          className="inline-flex items-center gap-2 text-[#12AD65] font-medium text-sm lg:text-base group"
        >
          <span>{isAr ? "عرض جميع مشاريع تركيا" : "View All Turkey Projects"}</span>
          <ArrowRight 
            size={20} 
            className={`transition-transform duration-300 group-hover:translate-x-2 ${isAr ? "rotate-180 group-hover:-translate-x-2" : ""}`} 
          />
        </Link>
      </div>
    </section>
  );
}