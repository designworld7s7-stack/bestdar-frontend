'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
// import ExpertAction from './expert-action';

// 1. أضفنا callout إلى الواجهة (Interface) ليتعرف عليها TypeScript
interface GuideContentProps {
  lang: string;
  content?: string; 
  callout?: string; // 👈 تمت الإضافة هنا كحقل اختياري
}

// 2. استقبلنا callout كـ Prop في الدالة
export default function GuideContent({ lang, content, callout }: GuideContentProps) {
  const isAr = lang === 'ar';

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* 1. المحتوى الديناميكي الرئيسي */}
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

      {/* 2. إجراء الخبير (Expert Action) */}
      
      {/* 3. التنبيه المهم (Callout) - أصبح الآن ديناميكياً 100% */}
      {/* نستخدم الشرط {callout && ...} لكي لا يظهر الصندوق فارغاً إذا لم تكتب نصيحة في لوحة التحكم */}
      {callout && (
        <div className="bg-[#12AD65]/5 rounded-3xl p-8 lg:p-10 shadow-sm flex gap-6 items-start border border-[#12AD65]/10">
          <div className="bg-[#12AD65] p-2 rounded-xl text-white shadow-lg shadow-[#12AD65]/20 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-tight text-[#12AD65] mb-2">
              {isAr ? "نصيحة مهمة للمستثمر" : "Critical Investor Tip"}
            </h4>
            <p className="text-sm lg:text-base font-medium text-gray-700 leading-relaxed whitespace-pre-line">
              {callout} {/* 👈 هنا يتم حقن النص القادم من قاعدة البيانات */}
            </p>
          </div>
        </div>
      )}
      
    </div>
  );
}