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
  isGated = true 
}: any) {
  const isAr = lang === 'ar';
  const router = useRouter();
  
  const safeUnits = Array.isArray(units) ? units : [];

  // 🎯 قاموس الترجمة التلقائي للباجات الثابتة 🎯
  const badgeTranslations: Record<string, string> = {
    'Sea View': 'إطلالة بحرية',
    'High Floor': 'طابق مرتفع',
    'Turkish Citizenship': 'الجنسية التركية',
    'Golden Visa': 'الإقامة الذهبية',
    'High ROI': 'عائد استثماري عالٍ',
    'Ready to Move': 'جاهز للسكن',
    'Off-Plan': 'قيد الإنشاء'
  };

  const categories = safeUnits.reduce((acc: any[], unit: any) => {
    let categoryName = isAr ? (unit.unit_type_ar || unit.unit_type) : unit.unit_type;
    categoryName = categoryName || (isAr ? 'وحدة سكنية' : 'Residential Unit');

    let category = acc.find(c => c.title === categoryName);
    
    // 🎯 استخراج الباجات وتحويلها إلى مصفوفة (سواء كانت مسجلة كنص أو مصفوفة)
    let rawBadges = [];
    if (Array.isArray(unit.badges)) {
      rawBadges = unit.badges;
    } else if (typeof unit.badges === 'string') {
      try { rawBadges = JSON.parse(unit.badges); } 
      catch (e) { rawBadges = unit.badges ? [unit.badges] : []; } // لو كانت نص عادي وليس JSON
    }

    // 🎯 ترجمة الباجات إذا كانت اللغة عربية
    const displayBadges = rawBadges.map((badge: string) => 
      isAr ? (badgeTranslations[badge] || badge) : badge
    );
    
    if (!category) {
      category = {
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        title: categoryName,
        exactPrice: unit.price ? `$${unit.price.toLocaleString()}` : 'TBD',
        badges: displayBadges, // نأخذ باجات أول وحدة كنموذج للقسم الرئيسي
        variants: []
      };
      acc.push(category);
    }
    
    category.variants.push({
      id: unit.id?.toString() || Math.random().toString(),
      sqm: unit.size_sqm ? `${unit.size_sqm}` : 'N/A', 
      floor: unit.floor_number || '01',
      view: isAr ? (unit.view_type_ar || unit.view_type || 'إطلالة') : (unit.view_type || 'View'),
      price: unit.price || 0,
      badges: displayBadges, // 👈 إرفاق مصفوفة الباجات المترجمة بكل وحدة
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <span className="text-lg lg:text-2xl font-medium uppercase tracking-[0.1em] text-black">
                      {cat.title}
                    </span>
                    {/* 🎯 عرض أول باج فقط في العنوان الرئيسي للتبسيط 🎯 */}
                    {cat.badges && cat.badges.length > 0 && (
                      <span className="hidden sm:inline-block bg-[#12AD65]/10 text-[#12AD65] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#12AD65]/20">
                        {cat.badges[0]}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 lg:gap-8">
                    <div className="hidden md:flex items-center gap-3">
                      <span className="text-sm lg:text-xl font-bold text-[#12AD65] tracking-tight">
                        {cat.exactPrice}
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
                        <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto mb-4 lg:mb-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedUnitId === unit.id ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                            {selectedUnitId === unit.id ? <Check size={18} /> : <span className="text-[12px] font-bold">#{unit.id.slice(-3)}</span>}
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium uppercase">
                            <span className="flex items-center gap-2"><Maximize2 size={13}/> {unit.sqm} {isAr ? "م²" : "SQM"}</span>
                            <span className="flex items-center gap-2"><Layers size={13}/> {unit.floor}</span>
                            <span className="flex items-center gap-2"><Eye size={13}/> {unit.view}</span>
                          </div>
                        </div>
                        
                        {/* 🎯 عرض كل الباجات بجوار السعر 🎯 */}
                        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 w-full lg:w-auto border-t lg:border-t-0 border-white/20 pt-3 lg:pt-0">
                          {unit.badges && unit.badges.map((badge: string, idx: number) => (
                            <span 
                              key={idx}
                              className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-widest whitespace-nowrap ${
                                selectedUnitId === unit.id 
                                ? 'bg-white/20 text-white' 
                                : 'bg-[#12AD65]/10 text-[#12AD65]'
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                          <span className="text-base lg:text-xl font-bold lg:ml-4">
                            ${unit.price.toLocaleString()}
                          </span>
                        </div>
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