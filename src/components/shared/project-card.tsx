'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  developer: string;
  location: string;
  price: string;
  image: string;
  deliveryDate: string;
  lang: string;
}

export default function ProjectCard({ 
  id, title, developer, location, price, image, deliveryDate, lang 
}: ProjectCardProps) {
  const isAr = lang === 'ar';

  return (
    /* Added h-full to ensure cards in a row stretch to the same height */
    <div className="group relative flex flex-col h-full rounded-[32px] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]">
      
      {/* Image Container: Fixed Aspect Ratio prevents size jumping */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] mb-6 shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4 bg-[#12AD65] text-white text-[9px] font-black uppercase tracking-widest py-2 px-4 rounded-full">
          {deliveryDate}
        </div>
      </div>

      {/* Content Area: Added min-h to keep cards uniform */}
      <div className="px-2 flex-1 flex flex-col justify-between">
        <div className="min-h-[100px] lg:min-h-[120px]">
          <h3 className="text-lg lg:text-xl font-black text-black leading-tight transition-colors duration-300 group-hover:text-[#12AD65]">
            {title}
          </h3>
          <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-wide">
            {developer}
          </p>

          <div className="mt-4 flex items-center gap-2 text-gray-400">
            <MapPin size={14} className="text-[#12AD65]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{location}</span>
          </div>
        </div>

        {/* Bottom Section: Always sticks to the bottom */}
        <div className="mt-6 pt-6 flex items-center justify-between border-t border-gray-50">
          <div className="shrink-0">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">
              {isAr ? "يبدأ من" : "Starting from"}
            </p>
            <p className="text-lg font-black text-[#12AD65] leading-none">
              {price}
            </p>
          </div>

          <Link 
            href={`/${lang}/projects/${id}`} 
            className="rounded-xl font-black uppercase tracking-widest transition-all bg-black text-white px-5 py-3 text-[10px] lg:bg-gray-50 lg:text-black lg:hover:bg-[#12AD65] lg:hover:text-white"
          >
            {isAr ? "عرض" : "View"}
          </Link>
        </div>
      </div>
    </div>
  );
}