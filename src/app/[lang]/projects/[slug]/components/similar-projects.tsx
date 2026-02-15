'use client';

import React from 'react';
import ProjectCard from '@/components/shared/project-card';
import { MoveHorizontal } from 'lucide-react';

interface SimilarProjectsProps {
  lang: string;
  projects?: any[]; 
}

export default function SimilarProjects({ lang, projects = [] }: SimilarProjectsProps) {
  const isAr = lang === 'ar';

  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24 border-t border-gray-50">
      <div className="mb-10 lg:mb-16">
        <h2 className="text-2xl lg:text-5xl font-medium text-black tracking-[0.1em] uppercase">
          {isAr ? "استكشف مشاريع مماثلة" : "Explore Similar Projects"}
        </h2>
        <div className="h-1 w-12 bg-[#12AD65] rounded-full mt-4" />
      </div>

      <div className="relative group">
        {/* Carousel for mobile / Grid for desktop */}
        <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory pb-8 lg:pb-0">
     {projects.map((item: any) => (
  <div key={item.id} className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center">
    <ProjectCard 
      {...item}
      lang={lang}
      // تمرير القيم المطلوبة لتجنب خطأ الـ Missing Properties
      slug={item.slug || item.id || "project"}
      thumbnail_url={item.thumbnail_url || item.image || '/placeholder-project.jpg'}
    />
  </div>
))}
        </div>

        {/* Swipe indicator for mobile */}
        <div className="lg:hidden flex flex-col items-center gap-2 mt-4 opacity-40">
          <MoveHorizontal size={20} className="text-[#4B5563] animate-pulse" />
          <span className="text-[8px] font-medium uppercase tracking-tighter">
            {isAr ? "اسحب للاستكشاف" : "Swipe to Explore"}
          </span>
        </div>
      </div>
    </section>
  );
}