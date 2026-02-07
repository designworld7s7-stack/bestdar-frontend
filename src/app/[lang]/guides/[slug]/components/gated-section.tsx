'use client';

import React from 'react';
import { CheckCircle2, Download, ShieldCheck } from 'lucide-react';

export default function GatedSection({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const checklistItems = [
    isAr ? "التحقق من سند الملكية (Tapu)" : "Verification of Title Deed (Tapu)",
    isAr ? "موافقة دائرة الأراضي والأملاك" : "DLD (Dubai Land Department) Approval",
    isAr ? "خطة دفع مطور العقارات" : "Developer Payment Plan Analysis",
    isAr ? "رسوم الصيانة والخدمات السنوية" : "Annual Service & Maintenance Fees",
  ];

  return (
    <div className="my-16 lg:my-24">
      {/* Container: No borders, just a boutique shadow */}
      <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border-0">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-[#12AD65] mb-4">
              <ShieldCheck size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {isAr ? "منطقة المستثمرين" : "Investor Club Exclusive"}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-black tracking-tighter leading-tight">
              {isAr 
                ? "قائمة التحقق من العناية الواجبة للعقارات" 
                : "Property Due Diligence Checklist"}
            </h2>
          </div>

          <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#12AD65] transition-all shadow-xl shadow-black/10">
            <Download size={18} />
            {isAr ? "تحميل القائمة كاملة" : "Download Full PDF"}
          </button>
        </div>

        {/* Content Section: No longer blurred */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {checklistItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-500 group"
            >
              <CheckCircle2 className="text-[#12AD65] mt-1 shrink-0 transition-transform group-hover:scale-125" size={20} />
              <span className="text-[15px] lg:text-[16px] font-bold text-gray-800 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Note Area */}
        <p className="mt-12 text-sm text-gray-400 font-medium leading-relaxed italic border-l-2 border-[#12AD65] pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
          {isAr 
            ? "ملاحظة: هذه القائمة هي جزء من خدماتنا الاستشارية المجانية للمواطنين العراقيين." 
            : "Note: This checklist is part of our dedicated consultancy services for Iraqi citizens."}
        </p>
      </div>
    </div>
  );
}