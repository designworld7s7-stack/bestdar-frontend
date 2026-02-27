'use client';

import React from 'react';
import { Clock, Calendar, Heart, MessageCircle, Facebook, Instagram, Share2 } from 'lucide-react';

export default function GuideHero({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="w-full pt-10 lg:pt-20 pb-12 border-b border-gray-50">
      {/* 1. Meta Info Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex flex-wrap items-center gap-4 text-[#4B5563]">
          <span className="bg-gray-50 text-black px-4 py-1.5 rounded-full text-[12px] font-medium uppercase tracking-tighter shadow-sm">
            {isAr ? "دليل الإمارات" : "UAE Guide"}
          </span>
          <div className="flex items-center gap-2 text-[11px] font-bold">
            <Clock size={14} className="text-[#12AD65]" />
            <span>6 {isAr ? "دقائق للقراءة" : "min read"}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold">
            <Calendar size={14} className="text-[#12AD65]" />
            <span>Nov 12, 2024</span>
          </div>
        </div>

        {/* 2. Social Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {[
            { icon: <Heart size={18} />, label: 'Like' },
            { icon: <MessageCircle size={18} />, label: 'Comment' },
            { icon: <Facebook size={18} />, label: 'Facebook' },
            { icon: <Instagram size={18} />, label: 'Instagram' },
          ].map((action, i) => (
            <button 
              key={i} 
              className="h-11 w-11 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4B5563] hover:text-[#12AD65] hover:shadow-md transition-all border-0"
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Title & Description */}
      <div className="max-w-4xl">
       <h1 className="text-[28px] sm:text-3xl lg:text-7xl font-medium text-black leading-[1.2] lg:leading-[1.1] tracking-tight lg:tracking-[0.1em] mb-8 break-words">
  {isAr 
    ? "الاستثمار في عقارات الإمارات: الدليل الكامل للمواطنين العراقيين" 
    : "Investing in UAE Real Estate: The Complete Guide for Iraqi Citizens"}
</h1>
        <p className="text-lg lg:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          {isAr
            ? "اكتشف كيفية تأمين ثروتك، والحصول على الإقامة، والتنقل في أسواق العقارات في دبي وأبو ظبي بثقة."
            : "Discover how to secure your wealth, obtain residency, and navigate the Dubai and Abu Dhabi property markets with confidence."}
        </p>
      </div>

      {/* 4. Mobile Social Actions (Floating or Inline) */}
      <div className="lg:hidden flex items-center gap-4 mt-10 p-4 bg-gray-50 rounded-2xl shadow-inner">
         <span className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563]">
           {isAr ? "مشاركة الدليل" : "Share Guide"}
         </span>
         <div className="flex gap-2">
            <button className="h-10 w-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#12AD65]"><Share2 size={16} /></button>
            <button className="h-10 w-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600"><Facebook size={16} /></button>
         </div>
      </div>
    </section>
  );
}