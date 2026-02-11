'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCardHome from '@/components/shared/project-card-home';
import GuideCard from '@/components/shared/guide-card';

const uaeProjects = [
  { id: "uae-1", title: "Dubai – Marina Skyline", price: "$350,000", image: "/uae-1.jpg" },
  { id: "uae-2", title: "Abu Dhabi – Yas Island Villas", price: "$800,000", image: "/uae-2.jpg" },
  { id: "uae-3", title: "Sharjah – Cultural Square", price: "$120,000", image: "/uae-3.jpg" },
];

const uaeGuides = [
  { id: "ug-1", title: "UAE Golden Visa for Investors", description: "How to secure long-term residency through property.", image: "/guide-uae-1.jpg" },
  { id: "ug-2", title: "Buying Off-Plan in Dubai", description: "Everything Iraqis need to know about payment plans.", image: "/guide-uae-2.jpg" },
];

export default function UaeSection({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Updated Header for UAE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-5xl font-medium text-brand-black leading-tight">
          {isAr ? "استكشف العقارات في الإمارات" : "Explore Real Estate in UAE"}
        </h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
          {isAr 
            ? "استثمر في أكثر أسواق العقارات ديناميكية في العالم مع توجيهات الخبراء." 
            : "Invest in the world's most dynamic real estate market with expert guidance tailored for you."}
        </p>
      </div>

      {/* PROJECT CARDS: Carousel on Mobile | Grid on Desktop */}
      <div className="relative">
        <div className="flex justify-end items-center gap-2 mb-4 lg:hidden text-[#4B5563] text-xs font-bold uppercase tracking-tighter">
          <span>{isAr ? "اسحب" : "Swipe"}</span>
          <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
        </div>

        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar lg:overflow-visible lg:pb-0">
          {uaeProjects.map((project) => (
            <div key={project.id} className="min-w-[85%] sm:min-w-[45%] lg:min-w-full snap-center">
              <ProjectCardHome {...project} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {/* GUIDE CARDS: Consistent with Turkey Section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {uaeGuides.map((guide) => (
          <GuideCard key={guide.id} {...guide} lang={lang} />
        ))}
      </div>

      {/* VIEW ALL FOOTER */}
      <div className="mt-16 text-center">
        <Link 
          href={`/${lang}/uae`}
          className="inline-flex items-center gap-2 text-[#12AD65] font-medium text-sm lg:text-base group"
        >
          <span>{isAr ? "عرض جميع مشاريع الإمارات" : "View All UAE Projects"}</span>
          <ArrowRight 
            size={20} 
            className={`transition-transform duration-300 group-hover:translate-x-2 ${isAr ? "rotate-180 group-hover:-translate-x-2" : ""}`} 
          />
        </Link>
      </div>
    </section>
  );
}