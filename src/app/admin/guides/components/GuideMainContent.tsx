'use client';

import { Section, Textarea } from '../../components/UI';
import { FileText, MessageSquareQuote } from 'lucide-react';

export default function GuideMainContent({ data, update }: any) {
  return (
    <Section title="4. Detailed Content & Callout" icon={<FileText size={20} className="text-[#12AD65]"/>}>
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Textarea label="Main Content (EN)" rows={12} value={data.content} onChange={(v: string) => update('content', v)} />
          <Textarea label="المحتوى الرئيسي (AR)" rows={12} dir="rtl" value={data.content_ar} onChange={(v: string) => update('content_ar', v)} />
        </div>

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