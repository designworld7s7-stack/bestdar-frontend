'use client';

import React from 'react';
import { CheckCircle2, Download, ShieldCheck } from 'lucide-react';

interface GatedSectionProps {
  lang: string;
  data?: any; // The JSONB data from Supabase
}

export default function GatedSection({ lang, data }: GatedSectionProps) {
  const isAr = lang === 'ar';

  // Fallback items if the database row is empty
  const defaultItems = [
    isAr ? "التحقق من سند الملكية (Tapu)" : "Verification of Title Deed (Tapu)",
    isAr ? "موافقة دائرة الأراضي والأملاك" : "DLD (Dubai Land Department) Approval",
    isAr ? "خطة دفع مطور العقارات" : "Developer Payment Plan Analysis",
    isAr ? "رسوم الصيانة والخدمات السنوية" : "Annual Service & Maintenance Fees",
  ];

  // Use DB items if they exist, otherwise use defaults
  const checklistItems = data?.items || defaultItems;
  const downloadUrl = data?.download_url || "#";

  return (
    <div className="my-16 lg:my-24">
      <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border-0">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-[#12AD65] mb-4">
              <ShieldCheck size={24} />
              <span className="text-[12px] font-medium uppercase tracking-tight">
                {isAr ? "منطقة المستثمرين" : "Investor Club Exclusive"}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-medium text-black tracking-[0.1em] leading-tight uppercase">
              {isAr 
                ? "قائمة التحقق من العناية الواجبة للعقارات" 
                : "Property Due Diligence Checklist"}
            </h2>
          </div>

          {/* Dynamic Download Link */}
          <a 
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-2xl font-medium text-[11px] uppercase tracking-tighter hover:bg-[#12AD65] transition-all shadow-xl shadow-black/10"
          >
            <Download size={18} />
            {isAr ? "تحميل القائمة كاملة" : "Download Full PDF"}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {checklistItems.map((item: string, index: number) => (
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

        <p className="mt-12 text-sm text-[#4B5563] font-medium leading-relaxed italic border-l-2 border-[#12AD65] pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
          {isAr 
            ? "ملاحظة: هذه القائمة هي جزء من خدماتنا الاستشارية المجانية للمواطنين العراقيين." 
            : "Note: This checklist is part of our dedicated consultancy services for Iraqi citizens."}
        </p>
      </div>
    </div>
  );
}