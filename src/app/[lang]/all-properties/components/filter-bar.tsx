'use client';

import React from 'react';
import { ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react';

export default function FilterBar({ isRtl }: { isRtl: boolean }) {
  // Minimalist shadow-based style [cite: 2026-02-04]
  const selectBox = "flex-1 min-w-[140px] bg-[#FAFAFA] px-6 py-4 rounded-[22px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] border border-gray-50 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-md transition-all";

  return (
    <div className="space-y-6 mb-16">
      <div className="flex flex-wrap items-center gap-4">
        
        {/* Country Filter [cite: 2026-02-04] */}
        <div className={selectBox}>
          <span className="text-[11px] font-medium uppercase tracking-tighter text-[#4B5563]">
            {isRtl ? "الدولة" : "Country"}
          </span>
          <ChevronDown size={16} className="text-[#6B7280] group-hover:text-[#12AD65]" />
        </div>

        {/* City Filter [cite: 2026-02-04] */}
        <div className={selectBox}>
          <span className="text-[11px] font-medium uppercase tracking-tighter text-[#4B5563]">
            {isRtl ? "المدينة" : "City"}
          </span>
          <ChevronDown size={16} className="text-[#6B7280] group-hover:text-[#12AD65]" />
        </div>

        {/* Type Filter [cite: 2026-02-04] */}
        <div className={selectBox}>
          <span className="text-[11px] font-medium uppercase tracking-tighter text-[#4B5563]">
            {isRtl ? "النوع" : "Type"}
          </span>
          <ChevronDown size={16} className="text-[#6B7280] group-hover:text-[#12AD65]" />
        </div>

        {/* Status Filter [cite: 2026-02-04] */}
        <div className={selectBox}>
          <span className="text-[11px] font-medium uppercase tracking-tighter text-[#4B5563]">
            {isRtl ? "الحالة" : "Status"}
          </span>
          <ChevronDown size={16} className="text-[#6B7280] group-hover:text-[#12AD65]" />
        </div>

        {/* Sort & Reset [cite: 2026-02-04] */}
        <div className="flex items-center gap-2 ps-4">
           <button className="p-4 bg-black text-white rounded-2xl shadow-xl hover:bg-[#12AD65] transition-all">
             <SlidersHorizontal size={20} />
           </button>
           <button className="p-4 bg-gray-50 text-[#6B7280] rounded-2xl hover:text-red-500 transition-all">
             <RotateCcw size={20} />
           </button>
        </div>
      </div>
    </div>
  );
}