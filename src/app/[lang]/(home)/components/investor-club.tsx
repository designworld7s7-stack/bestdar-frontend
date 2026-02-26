'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx'; // أضفنا هذه للمساعدة في الـ RTL

export default function InvestorClub({ lang }: { lang: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isAr = lang === 'ar';
  const brandGreen = "#12AD65";

  // ✅ مصفوفة الفئات المترجمة داخل المكون للوصول لمتغير isAr
  const tiers = [
    {
      rank: isAr ? "الفئة الفضية" : "Silver Tier",
      range: isAr ? "٢٠٠ ألف – ٤٩٩ ألف" : "200k – 499k",
      baseTint: "bg-slate-400/10", 
      borderColor: "border-slate-400/30",
      glowColor: "rgba(148, 163, 184, 0.4)",
      benefits: isAr 
        ? ["تقارير السوق الربع سنوية", "وصول مبكر للعقارات"] 
        : ["Quarterly Market Reports", "Early Property Access"],
    },
    {
      rank: isAr ? "الفئة الذهبية" : "Gold Tier",
      range: isAr ? "٥٠٠ ألف – ٩٩٩ ألف" : "500k – 999k",
      baseTint: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      glowColor: "rgba(245, 158, 11, 0.4)",
      benefits: isAr 
        ? ["مدير محفظة عقارية مخصص", "أولوية الحجز قبل الإطلاق بـ ٢٤ ساعة"] 
        : ["Dedicated Portfolio Manager", "24hr Pre-Launch Window"],
    },
    {
      rank: isAr ? "الفئة البلاتينية" : "Platinum Tier",
      range: isAr ? "١ مليون +" : "1M+",
      baseTint: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      glowColor: "rgba(16, 185, 129, 0.4)",
      benefits: isAr 
        ? ["زيارات ميدانية لكبار الشخصيات", "حق الرفض الأول", "أصول حصرية خارج السوق"] 
        : ["VIP Site Visits", "First-Right-of-Refusal", "Off-Market Exclusive Assets"],
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    // ✅ أضفنا dir للتحكم في اتجاه النصوص والأيقونات
    <section className="bg-[#050505] py-32 px-6 lg:px-12 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-[1440px] mx-auto">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-7xl font-medium text-white tracking-[0.1em] uppercase">
            {isAr ? "نادي المستثمرين" : "Investor Club"}
          </h2>
          <div className="h-[1px] w-24 bg-[#12AD65] mx-auto mt-6 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={clsx(
                "group relative flex flex-col rounded-[40px] border p-12 backdrop-blur-xl transition-all duration-700 hover:-translate-y-4 overflow-hidden",
                tier.borderColor,
                tier.baseTint
              )}
            >
              {/* DYNAMIC TIER GLOW - حافظنا عليه تماماً */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${tier.glowColor}, transparent 60%)`
                }}
              />

              <div className="relative z-10 mb-10 text-start">
                <h3 className="text-2xl font-medium text-white">{tier.rank}</h3>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#12AD65] opacity-80">
                  {tier.range}
                </p>
              </div>

              <ul className="relative z-10 flex-1 space-y-6">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className={clsx(
                    "flex items-start gap-4 transition-all duration-500",
                    isAr ? "group-hover:-translate-x-2" : "group-hover:translate-x-2" // عكس الاتجاه في العربي
                  )}>
                    <Check size={18} style={{ color: brandGreen }} className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100" />
                    <span className="text-sm font-medium text-[#4B5563] group-hover:text-gray-100 transition-colors">
                        {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-12 pt-8 border-t border-white/5 text-start">
                <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-gray-700 group-hover:text-[#4B5563] transition-colors">
                   {isAr ? "متطلبات العضوية" : "Membership Requirement"}
                </p>
              </div>

              {/* BACKGROUND LIGHTING */}
              <div 
                className={clsx(
                  "absolute h-64 w-64 rounded-full blur-[120px] opacity-10 transition-opacity duration-700 group-hover:opacity-40 bg-current",
                  isAr ? "-left-20 -top-20" : "-right-20 -top-20" // عكس مكان الإضاءة الخلفية
                )} 
                style={{ color: tier.glowColor }} 
              />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link 
            href={`/${lang}/investor-club`}
            className="inline-flex items-center gap-4 py-4 px-12 rounded-full border border-white/10 text-white font-medium text-[12px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500"
          >
            {isAr ? "عرض النادي بالكامل" : "View Full Club"}
            <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
          </Link>
        </div>
      </div>
    </section>
  );
}