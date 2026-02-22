'use client';

import React from 'react';
import { Section, Input } from '../../components/UI';
import { Link as LinkIcon, Plus, Trash2 } from 'lucide-react';

export default function GuideSidebar({ data, update }: any) {
  // --- دوال التحكم في الروابط الإنجليزية ---
  const enLinks = Array.isArray(data.sidebar_links) ? data.sidebar_links : [];
  
  const addLinkEn = () => {
    update('sidebar_links', [...enLinks, { title: '', url: '' }]);
  };

  const updateLinkEn = (index: number, field: string, value: string) => {
    const updated = [...enLinks];
    updated[index][field] = value;
    update('sidebar_links', updated);
  };

 const removeLinkEn = (index: number) => {
    // أضفنا (: any) و (: number) ليتعرف عليها TypeScript
    update('sidebar_links', enLinks.filter((_: any, i: number) => i !== index));
  };

  // --- دوال التحكم في الروابط العربية ---
  const arLinks = Array.isArray(data.sidebar_links_ar) ? data.sidebar_links_ar : [];

  const addLinkAr = () => {
    update('sidebar_links_ar', [...arLinks, { title: '', url: '' }]);
  };

  const updateLinkAr = (index: number, field: string, value: string) => {
    const updated = [...arLinks];
    updated[index][field] = value;
    update('sidebar_links_ar', updated);
  };

 const removeLinkAr = (index: number) => {
    // أضفنا (: any) و (: number) هنا أيضاً
    update('sidebar_links_ar', arLinks.filter((_: any, i: number) => i !== index));
  };

  return (
    <Section title="5. Sidebar Links" icon={<LinkIcon size={20} className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* English Sidebar Links */}
        <div className="space-y-4">
          <div className="p-1 bg-slate-100 w-fit rounded-lg px-3 text-[10px] font-bold text-slate-500 uppercase">English Links</div>
          
          {enLinks.map((link: any, index: number) => (
            <div key={`en-${index}`} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex-1 space-y-3">
                <Input label="Link Title" value={link.title} onChange={(v: string) => updateLinkEn(index, 'title', v)} />
                <Input label="URL" value={link.url} onChange={(v: string) => updateLinkEn(index, 'url', v)} />
              </div>
              <button onClick={() => removeLinkEn(index)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all mt-6">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button onClick={addLinkEn} className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:border-[#12AD65] hover:text-[#12AD65] transition-all">
            <Plus size={18} /> Add English Link
          </button>
        </div>

        {/* Arabic Sidebar Links */}
        <div className="space-y-4" dir="rtl">
          <div className="p-1 bg-[#12AD65]/10 w-fit rounded-lg px-3 text-[10px] font-bold text-[#12AD65] uppercase">الروابط العربية</div>
          
          {arLinks.map((link: any, index: number) => (
            <div key={`ar-${index}`} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex-1 space-y-3">
                <Input label="عنوان الرابط" value={link.title} onChange={(v: string) => updateLinkAr(index, 'title', v)} />
                <Input label="الرابط (URL)" value={link.url} onChange={(v: string) => updateLinkAr(index, 'url', v)} />
              </div>
              <button onClick={() => removeLinkAr(index)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all mt-6">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button onClick={addLinkAr} className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:border-[#12AD65] hover:text-[#12AD65] transition-all">
            <Plus size={18} /> إضافة رابط عربي
          </button>
        </div>

      </div>
    </Section>
  );
}