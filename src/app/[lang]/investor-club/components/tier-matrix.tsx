'use client';

import React from 'react';
import { Check, Minus, Crown, Star, Shield } from 'lucide-react';
import { clsx } from 'clsx';

export default function TierMatrix({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const features = [
    { name: isAr ? "عروض الأوف ماركت" : "Off-Market Offers", silver: "96h Delay", gold: "48h Delay", platinum: "Instant" },
    { name: isAr ? "خصومات حصرية" : "Exclusive Discounts", silver: "Standard", gold: "Premium", platinum: "Maximum" },
    { name: isAr ? "دعم واتساب" : "WhatsApp Support", silver: "Standard", gold: "Fast", platinum: "Priority" },
    { name: isAr ? "تقارير السوق" : "Market Reports", silver: "1 / Year", gold: "2 / Year", platinum: "4 / Year" },
    { name: isAr ? "استشارات قانونية" : "Legal Assistance", silver: false, gold: false, platinum: true },
    { name: isAr ? "إعادة بيع الأصول" : "Asset Resale Strategy", silver: false, gold: true, platinum: true },
    { name: isAr ? "جولات عقارية خاصة" : "Private Property Tours", silver: false, gold: false, platinum: true },
  ];

  return (
    <section className="bg-[#050505] py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter uppercase">
            {isAr ? "المصفوفة" : "The Matrix"}
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-4">
            {isAr ? "قارن بين مستويات العضوية" : "Compare Membership Tiers"}
          </p>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-hidden rounded-[40px] border border-white/5 bg-[#0A0A0A] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-10 text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Feature</th>
                <th className="p-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Shield size={20} className="text-slate-400" />
                    <span className="text-white font-black uppercase tracking-widest text-xs">Silver</span>
                  </div>
                </th>
                <th className="p-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Star size={20} className="text-amber-500" />
                    <span className="text-amber-500 font-black uppercase tracking-widest text-xs">Gold</span>
                  </div>
                </th>
                <th className="p-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Crown size={20} className="text-[#12AD65]" />
                    <span className="text-[#12AD65] font-black uppercase tracking-widest text-xs">Platinum</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((f, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-8 text-gray-400 font-bold text-sm">{f.name}</td>
                  <td className="p-8 text-center text-gray-500 text-xs font-bold">{renderVal(f.silver)}</td>
                  <td className="p-8 text-center text-gray-300 text-xs font-bold">{renderVal(f.gold)}</td>
                  <td className="p-8 text-center text-[#12AD65] text-xs font-black uppercase">{renderVal(f.platinum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW: Vertical Feature Comparison */}
        <div className="lg:hidden flex flex-col gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-[#111] p-6 rounded-3xl border border-white/5">
              <p className="text-[#12AD65] font-black uppercase tracking-widest text-[10px] mb-4">{f.name}</p>
              <div className="grid grid-cols-3 gap-2">
                <MobileTierCol label="Silver" val={f.silver} color="text-slate-500" />
                <MobileTierCol label="Gold" val={f.gold} color="text-amber-500" />
                <MobileTierCol label="Platinum" val={f.platinum} color="text-[#12AD65]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function renderVal(val: any) {
  if (val === true) return <Check size={18} className="mx-auto" />;
  if (val === false) return <Minus size={18} className="mx-auto opacity-20" />;
  return val;
}

function MobileTierCol({ label, val, color }: { label: string, val: any, color: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">{label}</span>
      <div className={clsx("text-[10px] font-black", color)}>
        {val === true ? <Check size={14} /> : val === false ? <Minus size={14} className="opacity-20" /> : val}
      </div>
    </div>
  );
}