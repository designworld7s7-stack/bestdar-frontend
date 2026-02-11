'use client';

import React from 'react';
import { MapPin, Hash } from 'lucide-react';

export default function ProjectMobileCard({ lang, location, price, id }: any) {
  const isAr = lang === 'ar';

  return (
    <div className="lg:hidden px-4 mt-6">
      <div className="bg-white p-8 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#12AD65]">
            <MapPin size={14} />
            <span className="text-[12px] font-medium uppercase tracking-tight text-[#4B5563]">
              {location}
            </span>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[9px] font-medium text-[#6B7280] uppercase tracking-tighter mb-1">
                {isAr ? "يبدأ من" : "Starting Price"}
              </span>
              <span className="text-2xl font-medium text-[#12AD65] tracking-[0.1em]">
                {price}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-medium text-[#6B7280] uppercase tracking-tighter block mb-1">Property ID</span>
              <span className="text-xs font-medium text-black">#{id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}