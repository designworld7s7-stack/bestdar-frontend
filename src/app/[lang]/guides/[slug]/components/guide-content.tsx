'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import ExpertAction from './expert-action';

interface GuideContentProps {
  lang: string;
  content?: string; // المحتوى الأساسي من قاعدة البيانات
}

export default function GuideContent({ lang, content }: GuideContentProps) {
  const isAr = lang === 'ar';

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. المحتوى الديناميكي الرئيسي */}
      {/* هنا نقوم بحقن المحتوى القادم من قاعدة البيانات */}
      <section 
        className="prose prose-lg max-w-none 
        prose-headings:text-black prose-headings:font-medium prose-headings:uppercase prose-headings:tracking-widest
        prose-p:text-gray-500 prose-p:leading-relaxed
        prose-li:text-gray-600 prose-strong:text-black"
      >
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p>{isAr ? "جاري تحميل المحتوى..." : "Loading content..."}</p>
        )}
      </section>

      {/* 2. إجراء الخبير (Expert Action) - ثابت أو يتم التحكم بموقعه */}
     

      {/* 3. التنبيه المهم (Callout) */}
      {/* نصيحة: يمكنك جعل هذا التنبيه ديناميكياً أيضاً إذا أضفت حقل 'tip' في قاعدة البيانات */}
      <div className="bg-[#12AD65]/5 rounded-3xl p-8 lg:p-10 shadow-sm flex gap-6 items-start border border-[#12AD65]/10">
        <div className="bg-[#12AD65] p-2 rounded-xl text-white shadow-lg shadow-[#12AD65]/20">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-[11px] font-medium uppercase tracking-tight text-[#12AD65] mb-2">
            {isAr ? "نصيحة مهمة للمستثمر" : "Critical Investor Tip"}
          </h4>
          <p className="text-sm lg:text-base font-medium text-gray-700 leading-relaxed">
            {isAr
              ? "تأكد دائماً من أن العقار مسجل لدى دائرة الأراضي والأملاك المعنية وأن الدفعات تتم عبر حساب ضمان (Escrow Account) معتمد."
              : "Always ensure the property is registered with the relevant Land Department and payments are made via an authorized Escrow Account."}
          </p>
        </div>
      </div>
    </div>
  );
}