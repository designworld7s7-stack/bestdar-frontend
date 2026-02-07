'use client';

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import ExpertAction from './expert-action';
export default function GuideContent({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* SECTION: WHY INVEST */}
      <section>
        <h3 className="text-2xl lg:text-4xl font-black text-black mb-6 tracking-tighter uppercase">
          {isAr ? "لماذا الاستثمار في الإمارات؟" : "Why Invest in UAE?"}
        </h3>
        <p className="text-base lg:text-lg text-gray-500 leading-relaxed mb-8">
          {isAr 
            ? "توفر الإمارات استقراراً اقتصادياً مع عملة مربوطة بالدولار، وضريبة دخل شخصية بنسبة 0٪، ورحلات مباشرة إلى المدن العراقية الكبرى. إنها توفر أسلوب حياة عالمي المستوى."
            : "The UAE offers economic stability with a pegged currency, 0% personal income tax, and direct flights to major Iraqi cities. It provides a world-class lifestyle."}
        </p>
<ExpertAction lang={lang} />
        {/* THE CALLOUT: IMPORTANT TIP */}
        <div className="bg-[#12AD65]/5 rounded-3xl p-8 lg:p-10 shadow-sm flex gap-6 items-start">
          <div className="bg-[#12AD65] p-2 rounded-xl text-white shadow-lg shadow-[#12AD65]/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#12AD65] mb-2">
              {isAr ? "مهم جداً" : "Important Tip"}
            </h4>
            <p className="text-sm lg:text-base font-bold text-gray-700 leading-relaxed">
              {isAr
                ? "بصفتك مستثمراً عراقياً، يجب عليك التأكد من الشراء في منطقة تملك حر معتمدة (Freehold). تشمل المناطق الرئيسية دبي مارينا ووسط مدينة دبي."
                : "As an Iraqi investor, you must ensure you are buying in a designated Freehold area. Major freehold zones include Dubai Marina and Downtown Dubai."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: LEGAL FRAMEWORK */}
      <section>
        <h3 className="text-2xl lg:text-4xl font-black text-black mb-6 tracking-tighter uppercase">
          {isAr ? "الإطار القانوني: التملك الحر مقابل الاستئجار" : "Legal Framework: Freehold vs. Leasehold"}
        </h3>
        <p className="text-base lg:text-lg text-gray-500 leading-relaxed">
          {isAr
            ? "يعد فهم الفرق بين مناطق التملك الحر والاستئجار أمراً بالغ الأهمية. في مناطق التملك الحر، يمكن للأجانب تملك العقارات بصكوك ملكية كاملة تماماً مثل المواطنين."
            : "Understanding the distinction between Freehold and Leasehold areas is critical. In designated Freehold areas, foreign nationals can own property with full title deeds."}
        </p>
        
        {/* LIST ELEMENTS */}
        <ul className="mt-8 space-y-4">
          {['Freehold: Permanent ownership', 'Leasehold: Rights for up to 99 years'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm lg:text-base font-bold text-gray-400">
               <div className="w-1.5 h-1.5 rounded-full bg-[#12AD65]" />
               {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}