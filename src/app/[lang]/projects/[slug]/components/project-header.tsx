'use client';

import React from 'react';
import { MapPin, Hash } from 'lucide-react';

// استلام كائن project كاملاً بدلاً من النصوص المنفردة
export default function ProjectHeader({ lang, project, onInterestClick }: any) {
  const isAr = lang === 'ar';
  
  // اختيار البيانات مباشرة من الأعمدة التي حددتها
  const title = isAr ? (project.title_ar || project.title) : project.title;
  const location = isAr ? (project.location_ar || project.location) : project.location;

  return (
    <header className="hidden lg:block bg-white pt-10 pb-12">
      <div className="max-w-[1440px] mx-auto px-12 flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl lg:text-[72px] font-medium text-black uppercase tracking-[0.1em] leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6 text-[#0A0A0A] mt-10 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#12AD65]/10 p-2 rounded-full">
                <MapPin size={20} strokeWidth={2.5} className="text-[#12AD65]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  {isAr ? "الموقع" : "Location"}
                </span>
                <span className="text-[14px] lg:text-[15px] font-extrabold uppercase tracking-tight">
                  {location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#12AD65] p-2 rounded-full">
                <div className="w-5 h-5 flex items-center justify-center text-white text-[10px] font-black">$$</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  {isAr ? "سعر البداية" : "Starting Price"}
                </span>
                <span className="text-[14px] lg:text-[16px] font-extrabold text-[#12AD65] uppercase tracking-tight">
                  {project.price}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Hash size={18} strokeWidth={2.5} className="text-gray-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  {isAr ? "رقم المرجع" : "Reference"}
                </span>
                <span className="text-[14px] lg:text-[15px] font-extrabold text-gray-700 uppercase tracking-tight">
                  #{project.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={onInterestClick} className="btn-brand px-12 h-[56px] text-[13px] font-bold uppercase tracking-tight">
          {isAr ? "أنا مهتم" : "I'm Interested"}
        </button>
      </div>
    </header>
  );
}