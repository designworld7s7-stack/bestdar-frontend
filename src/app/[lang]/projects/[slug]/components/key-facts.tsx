'use client';

import React, { ReactElement } from 'react';
import { Bed, Bath, Maximize, Layers, Eye, Compass, LucideProps } from 'lucide-react';

// Added project to props
export default function KeyFacts({ lang, project }: { lang: string; project: any }) {
  const isAr = lang === 'ar';

  const facts = [
    { 
      icon: <Bed size={20} />, 
      label: isAr ? "غرف النوم" : "Bedrooms", 
      value: project?.bedrooms || "TBD" // Dynamic from DB
    },
    { 
      icon: <Bath size={20} />, 
      label: isAr ? "الحمامات" : "Bathrooms", 
      value: project?.bathrooms || "TBD" // Dynamic from DB
    },
    { 
      icon: <Maximize size={20} />, 
      label: isAr ? "المساحة" : "Size", 
      value: project?.area_sqft ? `${project.area_sqft} sqft` : "TBD" // Dynamic from DB
    },
    { 
      icon: <Layers size={20} />, 
      label: isAr ? "الطابق" : "Floor", 
      value: project?.total_floors || (isAr ? "متوفر" : "Available") // Dynamic from DB
    },
    { 
      icon: <Eye size={20} />, 
      label: isAr ? "الإطلالة" : "View", 
      value: project?.view_type || (isAr ? "بانورامي" : "Panoramic") // Dynamic from DB
    },
    { 
      icon: <Compass size={20} />, 
      label: isAr ? "الاتجاه" : "Orientation", 
      value: project?.orientation || "North-East" // Dynamic from DB
    },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-24 border-b border-gray-50">
      <div className="hidden lg:block mb-16">
        <h3 className="text-[11px] font-medium text-[#6B7280] uppercase tracking-[0.25em]">
          {isAr ? "حقائق رئيسية" : "Project Specifications"}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 lg:gap-0">
        {facts.map((fact, index) => (
          <div 
            key={index} 
            className={`group flex flex-col items-start lg:items-center text-left lg:text-center transition-all duration-500
                       ${index !== 0 ? 'lg:border-s lg:border-gray-100' : ''}`}
          >
            <div className="mb-6 text-[#4B5563] group-hover:text-[#12AD65] group-hover:scale-110 transition-all duration-500">
              {React.cloneElement(fact.icon as ReactElement<LucideProps>, { 
                size: 28, 
                strokeWidth: 1.5 
              })}
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[12px] lg:text-[11px] font-medium text-[#4B5563] uppercase tracking-[0.25em]">
                {fact.label}
              </span>
              <span className="text-base lg:text-[20px] font-medium text-black tracking-tight">
                {fact.value}
              </span>
            </div>

            <div className="hidden lg:block w-0 h-[1px] bg-[#12AD65] mt-6 group-hover:w-12 transition-all duration-700 opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}