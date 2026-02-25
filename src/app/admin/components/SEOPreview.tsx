'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SEOPreviewProps {
  title: string;
  slug: string;
  excerpt: string;
  lang: 'en' | 'ar';
}

export default function SEOPreview({ title, slug, excerpt, lang }: SEOPreviewProps) {
  const isAr = lang === 'ar';
  const baseUrl = "bestdar.com";
  
  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-2 text-[#12AD65] font-bold text-xs uppercase tracking-widest border-b border-slate-50 pb-4">
        <Search size={16} /> Google Search Preview ({lang.toUpperCase()})
      </div>

      <div className={`space-y-1 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
        {/* رابط الموقع (Breadcrumbs) */}
        <div className="flex items-center gap-1 text-[14px] text-[#202124] mb-1">
          <span className="font-medium">{baseUrl}</span>
          <span className="text-slate-400">› {isAr ? 'أدلة' : 'guides'} › {slug || '...'}</span>
        </div>

        {/* عنوان البحث (Blue Link) */}
        <h3 className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1">
          {title || (isAr ? "عنوان الدليل سيظهر هنا" : "Guide Title Will Appear Here")}
        </h3>

        {/* وصف البحث (Snippet) */}
        <p className="text-[14px] text-[#4d5156] leading-relaxed line-clamp-2 max-w-[600px]">
          {excerpt || (isAr 
            ? "اكتب مقتطفاً جذاباً في خانة الوصف ليظهر هنا ويحفز المستثمرين على الضغط..." 
            : "Enter a compelling excerpt in the description field to see how it looks here...")}
        </p>
      </div>
    </div>
  );
}