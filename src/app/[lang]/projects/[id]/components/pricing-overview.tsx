'use client';

import React, { useState } from 'react';
import { ChevronDown, Maximize2, Layers, Eye, Check } from 'lucide-react';

export default function PricingOverview({ lang, onUnitSelect, selectedUnitId }: any) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('1br');
  const isAr = lang === 'ar';

const unitCategories = [
  {
    id: '1br',
    title: isAr ? 'شقة غرفة وصالة' : '1 Bedroom Apartment',
    startingPrice: '$180,000', // ADD THIS BACK
    variants: [
      { 
        id: '101', 
        sqm: '85m²', 
        floor: '05', 
        view: 'Garden', 
        price: 180000, 
        planType: 'monthly' 
      },
      // ... rest of variants
    ]
  },
  {
    id: '2br',
    title: isAr ? 'شقة غرفتين وصالة' : '2 Bedroom Apartment',
    startingPrice: '$250,000', // ADD THIS BACK
    variants: [
      { id: '201', sqm: '120m²', floor: '08', view: 'City', price: 250000, planType: 'cash' }
    ]
  }
];

  return (
    <section className="py-12 lg:py-20 px-4 lg:px-12 bg-white relative z-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-[32px] lg:rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.03)] overflow-hidden">
          {unitCategories.map((cat) => (
            <div key={cat.id} className="border-b border-gray-50 last:border-0">
              <button 
                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                className="w-full flex items-center justify-between p-6 lg:p-10 hover:bg-gray-50/30 transition-colors"
              >
                {/* Desktop: Balanced text sizes | Mobile: Optimized leading */}
                <span className="text-lg lg:text-2xl font-black uppercase tracking-tighter text-black">
                  {cat.title}
                </span>
                
                <div className="flex items-center gap-4 lg:gap-8">
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                      {isAr ? 'يبدأ من' : 'Starting from'}
                    </span>
                    <span className="text-sm font-black text-black">{cat.startingPrice}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${expandedCategory === cat.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedCategory === cat.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 lg:px-10 pb-8 lg:pb-10 grid gap-3 lg:gap-4">
                  {cat.variants.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => onUnitSelect(unit)}
                      className={`flex flex-col lg:flex-row lg:items-center justify-between p-5 lg:p-7 rounded-2xl lg:rounded-3xl transition-all ${
                        selectedUnitId === unit.id 
                        ? 'bg-[#12AD65] text-white shadow-lg' 
                        : 'bg-gray-50/50 text-gray-500 hover:bg-gray-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-0">
                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center ${selectedUnitId === unit.id ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                          {selectedUnitId === unit.id ? <Check size={16} /> : <span className="text-[9px] lg:text-[10px] font-black">#{unit.id}</span>}
                        </div>
                        {/* Desktop: Clean Metadata | Mobile: Avoids overlap */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-2 text-[9px] lg:text-[10px] font-black uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Maximize2 size={12}/> {unit.sqm}</span>
                          <span className="flex items-center gap-1.5"><Layers size={12}/> {isAr ? 'طابق' : 'Floor'} {unit.floor}</span>
                          <span className="flex items-center gap-1.5"><Eye size={12}/> {unit.view}</span>
                        </div>
                      </div>
                      <span className={`text-base lg:text-xl font-black ${selectedUnitId === unit.id ? 'text-white' : 'text-black'}`}>
                        ${unit.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}