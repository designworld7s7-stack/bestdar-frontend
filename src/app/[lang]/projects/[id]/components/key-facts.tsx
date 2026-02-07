'use client';

import React from 'react';
import { Bed, Bath, Maximize, Layers, Eye, Compass } from 'lucide-react';

export default function KeyFacts({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const facts = [
    { icon: <Bed size={20} />, label: isAr ? "غرف النوم" : "Bedrooms", value: "1 - 3" },
    { icon: <Bath size={20} />, label: isAr ? "الحمامات" : "Bathrooms", value: "1 - 2" },
    { icon: <Maximize size={20} />, label: isAr ? "المساحة" : "Size", value: "85 - 180 m²" },
    { icon: <Layers size={20} />, label: isAr ? "الطابق" : "Floor", value: isAr ? "طابق مرتفع" : "High Floor" },
    { icon: <Eye size={20} />, label: isAr ? "الإطلالة" : "View", value: isAr ? "أفق المدينة" : "City Skyline" },
    { icon: <Compass size={20} />, label: isAr ? "الاتجاه" : "Orientation", value: "South-West" },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 border-b border-gray-50">
      {/* Header for Desktop only to keep mobile minimalist */}
      <div className="hidden lg:block mb-12">
        <h3 className="text-sm font-black text-black uppercase tracking-[0.3em]">
          {isAr ? "حقائق رئيسية" : "Key Facts"}
        </h3>
      </div>

      {/* Facts Grid: 2-cols on Mobile, 6-cols on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
        {facts.map((fact, index) => (
          <div 
            key={index} 
            className="group flex flex-col items-start lg:items-center text-left lg:text-center transition-all duration-300"
          >
            {/* Subtle Icon Background with Hover Effect */}
            <div className="mb-4 text-gray-300 group-hover:text-[#12AD65] transition-colors duration-500">
              {fact.icon}
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {fact.label}
              </span>
              <span className="text-sm lg:text-lg font-black text-black tracking-tight group-hover:translate-x-1 lg:group-hover:translate-x-0 lg:group-hover:-translate-y-1 transition-transform duration-300">
                {fact.value}
              </span>
            </div>

            {/* Hidden accent line for Desktop hover */}
            <div className="hidden lg:block w-0 h-[2px] bg-[#12AD65] mt-4 group-hover:w-full transition-all duration-500 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}