'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

// 1. تعريف الطرود (Interfaces)
interface TierData {
  text?: string;
  image?: string;
}

interface TierSceneProps {
  lang: string;
  dynamicTiers?: {
    silver: TierData;
    gold: TierData;
    platinum: TierData;
  };
}

export default function TierScene({ lang, dynamicTiers }: TierSceneProps) {
  const isAr = lang === 'ar';

  // 🌟 الحل الجذري والنهائي لمشكلة التداخل (فصلنا الكلاسات تماماً ليفهمها Tailwind 100%)
  // في الإنجليزي: الفضية تتجه لليسار (-12). في العربي: الفضية أصبحت على اليمين فيجب أن تتجه لليمين (12) لتبتعد عن المركز.
  const silverDepthClass = isAr 
    ? "lg:scale-[0.85] z-10 lg:translate-x-12" 
    : "lg:scale-[0.85] z-10 lg:-translate-x-12";

  const goldDepthClass = "lg:scale-[0.95] z-20 shadow-xl";

  // في الإنجليزي: البلاتينية تتجه لليمين (12). في العربي: البلاتينية أصبحت على اليسار فيجب أن تتجه لليسار (-12).
  const platinumDepthClass = isAr 
    ? "lg:scale-[1.1] z-30 shadow-2xl border-[3px] lg:-translate-x-12" 
    : "lg:scale-[1.1] z-30 shadow-2xl border-[3px] lg:translate-x-12";

  return (
    <section className="relative bg-white py-24 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20 lg:mb-32">
          <h2 className="text-4xl lg:text-6xl font-medium text-black tracking-[0.1em] uppercase mb-4">
            {isAr ? "مستويات الاستثمار" : "Investment Tiers"}
          </h2>
          <p className="font-medium uppercase tracking-tighter text-[12px]">
            {isAr ? "ارتقِ بمحفظتك العقارية" : "Elevate Your Property Portfolio"}
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 perspective-1000">
          
          <TierCard 
            rank="Silver"
            badge={isAr ? "مستوى الدخول" : "Entry Level"}
            requirement="200k – 499k"
            color="#C0C0C0"
            investor="Huda Salim" 
            image={dynamicTiers?.silver?.image || "/silver-investor.jpg"} 
            benefits={[
              isAr ? "عروض الأوف ماركت (بعد 96 ساعة)" : "Off-market offers (96h delay)",
              isAr ? "خصومات قياسية" : "Standard market discounts",
              isAr ? "رد واتساب اعتيادي" : "Standard WhatsApp respond",
              isAr ? "تقرير سوق واحد سنوياً" : "1 market report per year"
            ]}
depthClass={isAr ? "lg:scale-[0.85] z-10 lg:translate-x-12" : "lg:scale-[0.85] z-10 lg:-translate-x-12"}            isAr={isAr}
          />

          <TierCard 
            rank="Gold"
            badge={isAr ? "مستثمر نشط" : "Active Investor"}
            requirement="500k – 999k"
            color="#D4AF37"
            investor="Sarah J. Yassine"
            image={dynamicTiers?.gold?.image || "/gold-investor.jpg"} 
            benefits={[
              isAr ? "عروض الأوف ماركت (بعد 48 ساعة)" : "Off-market offers (48h delay)",
              isAr ? "خصومات أكبر من السيلفر" : "Higher discounts than Silver",
              isAr ? "رد واتساب سريع" : "Fast WhatsApp respond",
              isAr ? "تقريرين للسوق سنوياً" : "2 market reports per year"
            ]}
            depthClass={goldDepthClass}
            isAr={isAr}
          />

          <TierCard 
            rank="Platinum"
            badge={isAr ? "شريك استراتيجي" : "Strategic Partner"}
            requirement="1M+"
            color="#12AD65"
            investor="Dr. Khalid Karim"
            image={dynamicTiers?.platinum?.image || "/platinum-investor.jpg"} 
            benefits={[
              isAr ? "أول من يعلم بعروض الأوف ماركت" : "First to know off-market offers",
              isAr ? "أكبر الخصومات الحصرية" : "Biggest exclusive discounts",
              isAr ? "أولوية واتساب فائقة" : "Priority WhatsApp channel",
              isAr ? "مساعدة قانونية مجانية" : "Free legal assistance",
              isAr ? "4 تقارير سوقية ربع سنوية" : "4 quarterly market reports"
            ]}
depthClass={isAr ? "lg:scale-[1.1] z-30 shadow-2xl border-[3px] lg:-translate-x-12" : "lg:scale-[1.1] z-30 shadow-2xl border-[3px] lg:translate-x-12"}            isAr={isAr}
          />

        </div>
      </div>
    </section>
  );
}

// 2. مكون البطاقة
function TierCard({ rank, badge, requirement, color, investor, image, benefits, depthClass, isAr }: any) {
  return (
    <div className={clsx(
      "bg-white w-full max-w-[400px] p-8 lg:p-12 rounded-[40px] border transition-all duration-700 hover:translate-y-[-10px]",
      depthClass
    )} style={{ borderColor: color }}>
      
      <div className="inline-block py-1.5 px-4 rounded-full mb-6" style={{ backgroundColor: `${color}15`, color: color }}>
        <span className="text-[12px] font-medium uppercase tracking-tighter">{badge}</span>
      </div>

      <h3 className="text-4xl font-medium text-black mb-2">{rank}</h3>
      <p className="text-[11px] font-medium uppercase tracking-tighter mb-10">
        {isAr ? "المتطلبات:" : "Requirements:"} <span className="text-black">{requirement}</span>
      </p>

      <ul className="space-y-4 mb-12">
        {benefits.map((benefit: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-600">
            <Check size={16} style={{ color: color }} className="mt-0.5 shrink-0" />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="pt-8 border-t border-gray-100 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
         <img 
            src={image} 
            alt={investor} 
            className="w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0" 
          />
        </div>
        <div>
          <p className="text-[8px] font-medium uppercase tracking-tight mb-1">
            {isAr ? "كبار المستثمرين" : "Top Tier Investor"}
          </p>
          <p className="text-xs font-medium text-black">{investor}</p>
        </div>
      </div>
    </div>
  );
}