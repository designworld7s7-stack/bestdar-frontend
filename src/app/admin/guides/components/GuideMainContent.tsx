'use client';

import { Section, Textarea } from '../../components/UI';
import { FileText, MessageSquareQuote } from 'lucide-react';
import TiptapEditor from '../../components/TiptapEditor';
export default function GuideMainContent({ data, update }: any) {
return (
  <Section title="4. Detailed Content & Callout" icon={<FileText size={20} className="text-[#12AD65]"/>}>
    <div className="space-y-10">
      {/* المحتوى الرئيسي باستخدام Tiptap Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Main Content (EN)</label>
          <TiptapEditor 
            content={data.content} 
            onChange={(v: string) => update('content', v)} 
          />
        </div>
        
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">المحتوى الرئيسي (AR)</label>
          <div dir="rtl"> {/* ضمان عمل المحرر بالاتجاه الصحيح للعربية */}
            <TiptapEditor 
              content={data.content_ar} 
              onChange={(v: string) => update('content_ar', v)} 
            />
          </div>
        </div>
      </div>

      {/* منطقة التمييز (Callout) - يفضل إبقاؤها Textarea لأنها نص قصير ومحدد */}
      <div className="p-8 bg-[#12AD65]/5 border border-[#12AD65]/10 rounded-[32px]">
        <h4 className="flex items-center gap-2 text-[#12AD65] font-bold text-xs uppercase tracking-widest mb-6">
          <MessageSquareQuote size={16} /> Important Highlight (Callout)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Textarea label="Callout Text (EN)" rows={3} value={data.callout} onChange={(v: string) => update('callout', v)} />
          <Textarea label="نص التمييز (AR)" rows={3} dir="rtl" value={data.callout_ar} onChange={(v: string) => update('callout_ar', v)} />
        </div>
      </div>
    </div>
  </Section>
);
}