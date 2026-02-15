'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCardHome from '@/components/shared/project-card-home';

interface TurkeySectionProps {
  lang: string;
  projects: any[]; 
}

export default function TurkeySection({ lang, projects }: TurkeySectionProps) {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* RESTORED: Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-5xl font-medium text-brand-black leading-tight">
          {isAr ? "استكشف العقارات في تركيا" : "Explore Real Estate in Turkey"}
        </h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
          {isAr 
            ? "اكتشف أفضل الفرص الاستثمارية والسكنية في أجمل المدن التركية." 
            : "Discover the best investment and residential opportunities in Turkey's most beautiful cities."}
        </p>
      </div>

      <div className="relative">
        {/* RESTORED: Mobile Swipe Indicator */}
        <div className="flex justify-end items-center gap-2 mb-4 lg:hidden text-[#4B5563] text-xs font-bold uppercase tracking-tighter">
          <span>{isAr ? "اسحب" : "Swipe"}</span>
          <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
        </div>

        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar lg:overflow-visible lg:pb-0">
          {projects?.map((project) => (
            <div key={project.id} className="min-w-[85%] sm:min-w-[45%] lg:min-w-full snap-center">
              <ProjectCardHome 
                {...project} 
                // Mapping explicitly to the new best-practice column
                thumbnail_url={project.thumbnail_url} 
                lang={lang} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* RESTORED: View All Footer Link */}
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