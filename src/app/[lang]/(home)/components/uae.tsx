'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCardHome from '@/components/shared/project-card-home';

interface UaeSectionProps {
  lang: string;
  projects: any[]; 
}

export default function UaeSection({ lang, projects }: UaeSectionProps) {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* RESTORED: Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-5xl font-medium text-brand-black leading-tight">
          {isAr ? "استكشف العقارات في الإمارات" : "Explore Real Estate in UAE"}
        </h2>
        <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
          {isAr 
            ? "استثمر في أكثر أسواق العقارات ديناميكية في العالم مع مشاريع مختارة بعناية." 
            : "Invest in the world's most dynamic real estate market with hand-picked premium projects."}
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
  // المزامنة مع الأعمدة الصحيحة في Supabase [cite: 2026-02-25]
  title={project.title}
  title_ar={project.title_ar} // 👈 هذا هو السطر السحري الذي أضفناه للترجمة [cite: 2026-02-25]
  thumbnail_url={project.thumbnail_url} 
  lang={lang} 
  delivery_date={project.delivery_date} 
/>
            </div>
          ))}
        </div>
      </div>
      
      {/* RESTORED: View All Footer Link */}
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