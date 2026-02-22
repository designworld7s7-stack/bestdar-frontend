'use client';

import { Section, Input } from '../../components/UI';
import { Layout } from 'lucide-react';

export default function GuideHeader({ data, update }: any) {
  
  // 1. ضع تصنيفات الواجهة الأمامية هنا (لتعديلها بسهولة مستقبلاً)
  const FRONTEND_CATEGORIES = [
    { id: 'buying-guide', en: 'Buying Guide', ar: 'دليل الشراء' },
    { id: 'investment', en: 'Investment Insights', ar: 'رؤى استثمارية' },
    { id: 'legal', en: 'Legal Advice', ar: 'نصائح قانونية' },
    { id: 'neighborhoods', en: 'Neighborhoods', ar: 'دليل الأحياء' },
  ];

  // 2. دالة توليد الـ Slug التلقائي
  const handleTitleChange = (value: string) => {
    update('title', value);
    // تحويل النص إلى حروف صغيرة، استبدال المسافات بشرطات، وإزالة الرموز
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/\s+/g, '-');
    update('slug', generatedSlug);
  };

  return (
    <Section title="1. Header & Strategy" icon={<Layout size={20} className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* English Column */}
        <div className="space-y-6">
          <div className="p-1 bg-slate-100 w-fit rounded-lg px-3 text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-tighter">English Version</div>
          {/* هنا استخدمنا الدالة الجديدة لتحديث العنوان والـ Slug معاً */}
          <Input label="Main Title" value={data.title} onChange={handleTitleChange} />
          <Input label="Subtitle" value={data.subtitle} onChange={(v: string) => update('subtitle', v)} />
          <Input label="URL Slug (Auto-generated)" value={data.slug} onChange={(v: string) => update('slug', v)} />
        </div>

        {/* Arabic Column */}
        <div className="space-y-6" dir="rtl">
          <div className="p-1 bg-[#12AD65]/10 w-fit rounded-lg px-3 text-[10px] font-bold text-[#12AD65] mb-2 uppercase tracking-tighter">النسخة العربية</div>
          <Input label="العنوان الرئيسي" value={data.title_ar} onChange={(v: string) => update('title_ar', v)} />
          <Input label="العنوان الفرعي" value={data.subtitle_ar} onChange={(v: string) => update('subtitle_ar', v)} />
          
          <div className="flex flex-col gap-1">
             <label className="text-[10px] font-bold text-slate-400 uppercase mr-1">Category / التصنيف</label>
             <select 
               value={data.category} 
               onChange={(e) => update('category', e.target.value)}
               className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:border-[#12AD65] outline-none transition-all"
             >
                {FRONTEND_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.en} / {cat.ar}
                  </option>
                ))}
             </select>
          </div>
        </div>
<div className="flex flex-col gap-1">
   <label className="text-[10px] font-bold text-slate-400 uppercase mr-1">Target Country / الدولة المستهدفة</label>
   <select 
     value={data.country_code} 
     onChange={(e) => update('country_code', e.target.value)}
     className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:border-[#12AD65] outline-none transition-all"
   >
      <option value="tr">Turkey (TR)</option>
      <option value="ae">UAE (AE)</option>
      <option value="both">Both (TR & AE)</option>
      <option value="other">Other</option>
   </select>
</div>
      </div>
    </Section>
  );
}