'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, TrendingUp, ArrowRight } from 'lucide-react';

export default function GuideSidebar({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <aside className="w-full flex flex-col gap-8 lg:gap-12">
      
      {/* 1. Most Read Section */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-[#12AD65]" size={20} />
          <h3 className="text-sm font-black text-black uppercase tracking-tighter">
            {isAr ? "الأكثر قراءة" : "Most Read"}
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((num) => (
            <Link 
              key={num} 
              href="#" 
              className="group flex gap-6 items-start border-b border-gray-50 pb-6 last:border-none last:pb-0"
            >
              <span className="text-3xl font-black text-gray-100 group-hover:text-[#12AD65] transition-colors duration-500">
                0{num}
              </span>
              <p className="text-xs lg:text-sm font-black text-gray-600 leading-tight group-hover:text-black transition-colors">
                {isAr 
                  ? "الاستثمار في عقارات الإمارات: الدليل الكامل للمواطنين العراقيين" 
                  : "Investing in UAE Real Estate: The Complete Guide for Iraqi Citizens"}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Newsletter Section */}
      <div className="bg-[#0A0A0A] p-10 rounded-[40px] text-center border border-white/5 shadow-2xl overflow-hidden relative">
        <h3 className="text-2xl font-black text-white mb-3 tracking-tighter">
          {isAr ? "رؤى أسبوعية" : "Weekly Insights"}
        </h3>
        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-10 leading-relaxed">
          {isAr ? "احصل على أحدث تقارير السوق في بريدك." : "Get the latest market trends delivered to your inbox."}
        </p>
        
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="email" 
              placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"} 
              className="w-full bg-white rounded-2xl py-4 px-12 text-black text-xs font-bold outline-none focus:ring-2 focus:ring-[#12AD65] transition-all"
            />
          </div>

          <button className="w-full bg-[#12AD65] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#0f8f53] transition-all group">
            {isAr ? "اشتراك" : "Subscribe"}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#12AD65] opacity-5 blur-[80px]" />
      </div>
    </aside>
  );
}