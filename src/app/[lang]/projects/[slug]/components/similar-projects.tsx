'use client';

import React from 'react';
import ProjectCard from '@/components/shared/project-card';
import { MoveHorizontal } from 'lucide-react';

export default function SimilarProjects({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const projects = [
    {
      id: "marina-heights",
      title: "Marina Heights Residences",
      developer: "Emaar Properties",
      location: "Dubai",
      price: "$250,000",
      tag: isAr ? "جاهز للسكن" : "Ready to Move",
      image: "/projects/marina.jpg",
      deliveryDate: isAr ? "جاهز" : "Ready" // Added required prop
    },
    {
      id: "mediterranean-villas",
      title: "Mediterranean Villas",
      developer: "Antalya Homes",
      location: "Antalya",
      price: "$650,000",
      tag: isAr ? "تسليم 2025" : "Delivery 2025",
      image: "/projects/villas.jpg",
      deliveryDate: "2025" // Added required prop
    },
    {
      id: "palm-jumeirah",
      title: "Palm Jumeirah Signature Villas",
      developer: "Nakheel",
      location: "Dubai",
      price: "$4,500,000",
      tag: isAr ? "جاهز للسكن" : "Ready to Move",
      image: "/projects/palm.jpg",
      deliveryDate: isAr ? "جاهز" : "Ready" // Added required prop
    }
  ];

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
          {projects.map((item) => (
            <div key={item.id} className="min-w-[85%] sm:min-w-[45%] lg:min-w-0 snap-center">
              <ProjectCard 
                lang={lang}
                {...item}
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