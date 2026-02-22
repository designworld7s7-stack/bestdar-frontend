'use client';

import { Section, Textarea } from '../../components/UI';
import { AlignLeft } from 'lucide-react';

export default function GuideIntroSection({ data, update }: any) {
  return (
    <Section title="3. Intro & Summary" icon={<AlignLeft size={20} className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* English Intro */}
        <div className="space-y-4">
          <Textarea 
            label="Excerpt (EN) - For Cards" 
            rows={3} 
            value={data.excerpt} 
            onChange={(v: string) => update('excerpt', v)} 
          />
          <Textarea 
            label="Intro Text (EN) - Under Hero" 
            rows={4} 
            value={data.intro_text} 
            onChange={(v: string) => update('intro_text', v)} 
          />
        </div>

        {/* Arabic Intro */}
        <div className="space-y-4" dir="rtl">
          <Textarea 
            label="الوصف المختصر (AR)" 
            rows={3} 
            value={data.excerpt_ar} 
            onChange={(v: string) => update('excerpt_ar', v)} 
          />
          <Textarea 
            label="النص الافتتاحي (AR)" 
            rows={4} 
            value={data.intro_text_ar} 
            onChange={(v: string) => update('intro_text_ar', v)} 
          />
        </div>
      </div>
    </Section>
  );
}