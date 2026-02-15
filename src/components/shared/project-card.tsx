'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface ProjectCardProps {
  slug: string; 
  title: string;
  developer: string;
  location: string;
  price: string;
 
  thumbnail_url: string; // 1. Change 'image' to 'thumbnail_url'
  deliveryDate: string;
  lang: string;
}

export default function ProjectCard({ 
  slug, title, developer, location, price, thumbnail_url, deliveryDate, lang // 2. Update here too
}: ProjectCardProps) {
  const isAr = lang === 'ar';
  const projectLink = `/${lang}/projects/${slug}`;

  return (
    <div className="group relative flex flex-col h-full rounded-[32px] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_25px_60px_rgb(0,0,0,0.1)] border border-gray-50">
  
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] mb-6 shrink-0">
        <img 
          src={thumbnail_url || '/placeholder-project.jpg'} // Uses the new column
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-black text-[11px] font-bold uppercase tracking-tight py-2 px-5 rounded-full shadow-sm">
          {deliveryDate}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-2 flex-1 flex flex-col">
        <div className="flex-1">
          {/* 2. SYMMETRY FIX: Added min-height and line-clamp */}
          <h3 className="text-xl lg:text-2xl font-bold text-black leading-tight transition-colors duration-300 group-hover:text-[#12AD65] tracking-tighter line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
          
          <p className="mt-2 text-[12px] font-bold text-[#12AD65] uppercase tracking-widest opacity-80">
            {developer}
          </p>

          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <MapPin size={16} strokeWidth={2.5} className="text-[#12AD65]" />
            <span className="text-[13px] font-bold uppercase tracking-tight">{location}</span>
          </div>
        </div>

{/* Bottom Section */}
<div className="mt-auto pt-6 border-t border-gray-100">
  {/* استخدمنا flex-col للموبايل و flex-row للشاشات الكبيرة lg */}
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    
    {/* Price Area */}
    <div className="shrink-0">
      <p className="text-[11px] font-bold uppercase tracking-tight text-gray-400 mb-1">
        {isAr ? "يبدأ من" : "Starting from"}
      </p>
      <p className="text-xl font-extrabold text-black leading-none tracking-tighter">
        {price}
      </p>
    </div>

    {/* View Details Button */}
    {/* جعلنا الزر يأخذ العرض الكامل w-full في الموبايل لسهولة الضغط، وعرضه الطبيعي lg:w-auto في الديسكتوب */}
    <Link 
      href={projectLink}
      className="w-full lg:w-auto rounded-2xl font-bold uppercase tracking-tight transition-all bg-black text-white px-8 h-[48px] flex items-center justify-center text-[13px] hover:bg-[#12AD65] shadow-lg hover:shadow-[#12AD65]/20 active:scale-95"
    >
      {isAr ? "عرض التفاصيل" : "View Details"}
    </Link>
  </div>
</div>
      </div>
    </div>
  );
}