'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, TrendingUp, ArrowRight } from 'lucide-react';

export default function GuideSidebar({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    // Added a max-width to keep it from stretching too wide on desktop
    <aside className="w-full lg:max-w-[340px] flex flex-col gap-6 lg:gap-8">
  
      {/* 1. Most Read Section - Tightened padding */}
      <div className="bg-white p-6 lg:p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-[#12AD65]" size={18} />
          <h3 className="text-lg uppercase tracking-tighter">{isAr ? "الأكثر قراءة" : "Most Read"}</h3>
        </div>

        <div className="flex flex-col gap-5">
          {[1, 2, 3].map((num) => (
            <Link 
              key={num} 
              href="#" 
              className="group flex gap-4 items-start border-b border-gray-50 pb-5 last:border-none last:pb-0"
            >
              <span className="text-2xl font-medium text-gray-200 group-hover:text-[#12AD65] transition-colors duration-500">
                0{num}
              </span>
              <p className="text-[13px] font-bold leading-snug group-hover:text-black transition-colors">
                {isAr 
                  ? "الاستثمار في عقارات الإمارات: الدليل الكامل" 
                  : "Investing in UAE Real Estate: The Complete Guide"}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Newsletter Section - Slimmer profile */}
      <div className="bg-[#0A0A0A] p-8 rounded-[32px] text-center shadow-2xl overflow-hidden relative">
        <h2 className="text-white text-2xl mb-2">
          {isAr ? "رؤى أسبوعية" : "Weekly Insights"}
        </h2>
        <p className="text-gray-400 text-xs mb-8 uppercase tracking-widest leading-relaxed">
          {isAr ? "أحدث تقارير السوق في بريدك" : "Latest market trends in your inbox"}
        </p>
        
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="email" 
              placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"} 
              className="w-full bg-white rounded-xl py-3.5 px-10 text-black text-xs font-medium outline-none"
            />
          </div>

          <button className="btn-brand w-full py-3.5 gap-2 group text-[11px]">
            {isAr ? "اشتراك" : "Subscribe"}
            <ArrowRight size={14} className={isAr ? "rotate-180" : "group-hover:translate-x-1 transition-transform"} />
          </button>
        </div>
        
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#12AD65] opacity-10 blur-[60px]" />
      </div>
    </aside>
  );
}