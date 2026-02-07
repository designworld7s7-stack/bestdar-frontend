'use client';

import React from 'react';
import { Briefcase, FileText, Users, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';

export default function WhyUs({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const advantages = [
    {
      icon: <Briefcase size={20} />,
      title: isAr ? "شراكات مع مطورين موثوقين" : "Trusted developer partnerships"
    },
    {
      icon: <FileText size={20} />,
      title: isAr ? "إرشاد قانوني واستثماري كامل" : "Full legal & investment guidance"
    },
    {
      icon: <Users size={20} />,
      title: isAr ? "مصمم خصيصاً للمستثمرين العراقيين" : "Tailored for Iraqi investors"
    },
    {
      icon: <TrendingUp size={20} />,
      title: isAr ? "عمولة صفر للمشتري (0%)" : "No buyer commission (0%)"
    },
    {
      icon: <DollarSign size={20} />,
      title: isAr ? "تسعير شفاف" : "Transparent pricing"
    },
    {
      icon: <ShieldCheck size={20} />,
      title: isAr ? "دعم شامل من البداية للنهاية" : "End-to-end support"
    }
  ];

  return (
    <section className="bg-[#050505] py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Header Section */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
            {isAr ? "لماذا تختارنا" : "Why Choose Us"}
          </h2>
          <p className="text-gray-500 font-medium text-sm lg:text-lg max-w-2xl mx-auto">
            {isAr 
              ? "نقدم مزايا فريدة تجعل رحلتك الاستثمارية أكثر سلاسة."
              : "We offer distinct advantages that make your investment journey smoother."}
          </p>
        </div>

        {/* Advantages Grid: 3 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 lg:p-10 rounded-[32px] flex items-center gap-6 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(18,173,101,0.15)] hover:-translate-y-1"
            >
              {/* Minimalist Icon */}
              <div className="h-12 w-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#12AD65] shrink-0">
                {item.icon}
              </div>

              <h3 className="text-left text-sm lg:text-base font-black text-black leading-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}