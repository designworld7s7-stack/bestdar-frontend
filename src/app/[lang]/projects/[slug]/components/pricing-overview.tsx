'use client';

import React, { useState } from 'react';
import { ChevronDown, Maximize2, Layers, Eye, Check, Info, Lock as LockIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

export default function PricingOverview({ 
  lang, 
  units = [], 
  onUnitSelect, 
  selectedUnitId,
  isGated = true // الإضافة الجديدة
}: any) {
  const isAr = lang === 'ar';
  const router = useRouter();
  
  const safeUnits = units || [];

  const categories = safeUnits.reduce((acc: any[], unit: any) => {
    const categoryName = unit.unit_type || (isAr ? 'وحدة سكنية' : 'Residential Unit');
    let category = acc.find(c => c.title === categoryName);
    
    if (!category) {
      category = {
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        title: categoryName,
        startingPrice: unit.price ? `$${unit.price.toLocaleString()}` : 'TBD',
        variants: []
      };
      acc.push(category);
    }
    
    category.variants.push({
      id: unit.id?.toString() || Math.random().toString(),
      sqm: unit.area_sqft ? `${unit.area_sqft} sqft` : 'N/A',
      floor: unit.floor_number || '01',
      view: unit.view_type || (isAr ? 'إطلالة' : 'View'),
      price: unit.price || 0,
      original: unit 
    });
    
    return acc;
  }, []);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.id || null);

    return (
    <section className="w-full max-w-[1440px] mx-auto py-12 lg:py-20 px-4 lg:px-12 bg-white relative z-10 border-t border-gray-100">
      <div className="flex flex-col gap-4 mb-10">
        <h3 className="text-xl lg:text-3xl font-medium text-black tracking-[0.1em] uppercase">
          {isAr ? "نظرة عامة على الأسعار" : "Pricing Overview"}
        </h3>
        <div className="h-1 w-12 bg-[#12AD65] rounded-full" />
      </div>

      <div className="relative group">
        {/* واجهة القفل - تظهر فقط عندما يكون isGated صحيحاً */}
        {isGated && (
          <div className="absolute inset-0 z-30 backdrop-blur-xl bg-white/60 flex flex-col items-center justify-center rounded-[32px] lg:rounded-[40px] border border-gray-100 p-8 text-center">
           <div className="h-14 w-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#12AD65] mb-6">
  <LockIcon size={24} /> 
</div>
            <h4 className="text-lg font-medium text-black mb-2 uppercase tracking-[0.1em]">
              {isAr ? "الأسعار التفصيلية مقفلة" : "Detailed Pricing Locked"}
            </h4>
            <p className="text-gray-500 text-[12px] lg:text-sm font-medium mb-8 max-w-xs">
              {isAr 
                ? "سجل لتصفح قائمة الأسعار الكاملة وتفاصيل جميع الوحدات المتاحة." 
                : "Register to browse the full price list and details of all available units."}
            </p>
            <button 
              onClick={() => router.push(`/${lang}/auth/signup`)}
              className="btn-brand px-10 py-4 rounded-2xl font-medium text-[12px] uppercase tracking-tighter hover:bg-[#0f8f53] transition-all shadow-lg shadow-[#12AD65]/20"
            >
              {isAr ? "سجل للمشاهدة" : "Register to View Pricing"}
            </button>
          </div>
        )}

        <div className={clsx(
          "bg-white rounded-[32px] lg:rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-50 transition-all duration-700",
          isGated && "opacity-20 pointer-events-none"
        )}>
          {/* If no categories exist, show a helpful placeholder */}
          {categories.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Info className="text-gray-300" size={40} />
              <p className="text-gray-400 font-medium">
                {isAr ? "سيتم تحديث الوحدات والأسعار قريباً" : "Units and pricing will be updated soon."}
              </p>
            </div>
          ) : (
            categories.map((cat: any) => (
              <div key={cat.id} className="border-b border-gray-50 last:border-0">
                <button 
                  onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between p-6 lg:p-10 hover:bg-gray-50/50 transition-colors"
                >
                  <span className="text-lg lg:text-2xl font-medium uppercase tracking-[0.1em] text-black">
                    {cat.title}
                  </span>
                  <div className="flex items-center gap-4 lg:gap-8">
                    <div className="hidden md:flex items-center gap-3">
                      <span className="text-[12px] font-medium text-[#6B7280] uppercase tracking-[0.25em]">
                        {isAr ? 'يبدأ من' : 'Starting from'}
                      </span>
                      <span className="text-sm lg:text-base font-medium text-black tracking-tight">
                        {cat.startingPrice}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#4B5563] transition-transform duration-500 ${expandedCategory === cat.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedCategory === cat.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 lg:px-10 pb-8 lg:pb-10 grid gap-3 lg:gap-4">
                    {cat.variants.map((unit: any) => (
                      <button
                        key={unit.id}
                        onClick={() => onUnitSelect(unit.original)}
                        className={`flex flex-col lg:flex-row lg:items-center justify-between p-5 lg:p-7 rounded-2xl lg:rounded-3xl transition-all ${
                          selectedUnitId === unit.id 
                          ? 'bg-[#12AD65] text-white' 
                          : 'bg-gray-50/50 text-[#4B5563] hover:bg-gray-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-4 lg:gap-6">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedUnitId === unit.id ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                            {selectedUnitId === unit.id ? <Check size={18} /> : <span className="text-[12px] font-bold">#{unit.id.slice(-3)}</span>}
                          </div>
                          <div className="flex gap-x-6 text-[12px] font-medium uppercase">
                            <span className="flex items-center gap-2"><Maximize2 size={13}/> {unit.sqm}</span>
                            <span className="flex items-center gap-2"><Layers size={13}/> {unit.floor}</span>
                            <span className="flex items-center gap-2"><Eye size={13}/> {unit.view}</span>
                          </div>
                        </div>
                        <span className="text-base lg:text-xl font-medium">
                          ${unit.price.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}