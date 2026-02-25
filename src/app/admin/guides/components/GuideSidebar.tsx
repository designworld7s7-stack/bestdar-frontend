'use client';

import React from 'react';
import { Section, Input } from '../../components/UI';
import { Link as LinkIcon, Plus, Trash2, Zap } from 'lucide-react';
// استيراد المكون الجديد الذي قمنا ببرمجته
import ProjectSelector from '../../components/ProjectSelector';

export default function GuideSidebar({ data, update }: any) {
  const enLinks = Array.isArray(data.sidebar_links) ? data.sidebar_links : [];
  const arLinks = Array.isArray(data.sidebar_links_ar) ? data.sidebar_links_ar : [];

  // --- دالة الإضافة الذكية (تضيف للغتين بضغطة واحدة) ---
  const handleQuickAddProject = (project: any) => {
    // 1. إضافة للمقالات الإنجليزية
    const newEnLink = { title: project.title_en, url: `/projects/${project.slug}` };
    update('sidebar_links', [...enLinks, newEnLink]);

    // 2. إضافة للمقالات العربية
    const newArLink = { title: project.title_ar, url: `/projects/${project.slug}` };
    update('sidebar_links_ar', [...arLinks, newArLink]);
  };

  // --- دوال التحكم التقليدية ---
  const addLinkEn = () => update('sidebar_links', [...enLinks, { title: '', url: '' }]);
  const updateLinkEn = (index: number, field: string, value: string) => {
    const updated = [...enLinks];
    updated[index][field] = value;
    update('sidebar_links', updated);
  };
  const removeLinkEn = (index: number) => update('sidebar_links', enLinks.filter((_: any, i: number) => i !== index));

  const addLinkAr = () => update('sidebar_links_ar', [...arLinks, { title: '', url: '' }]);
  const updateLinkAr = (index: number, field: string, value: string) => {
    const updated = [...arLinks];
    updated[index][field] = value;
    update('sidebar_links_ar', updated);
  };
  const removeLinkAr = (index: number) => update('sidebar_links_ar', arLinks.filter((_: any, i: number) => i !== index));

  return (
    <Section title="5. Sidebar Links" icon={<LinkIcon size={20} className="text-[#12AD65]"/>}>
      <div className="space-y-8">
        
        {/* ✨ منطقة الإضافة السريعة للمشاريع ✨ */}
        <div className="p-6 bg-[#12AD65]/5 border border-[#12AD65]/20 rounded-[32px]">
          <h4 className="flex items-center gap-2 text-[#12AD65] font-bold text-xs uppercase tracking-widest mb-4">
            <Zap size={16} fill="currentColor" /> Quick Add Project Link
          </h4>
          {/* نمرر دالة handleQuickAddProject للمكون */}
          <ProjectSelector onSelect={handleQuickAddProject} />
          <p className="mt-3 text-[10px] text-slate-400 italic">
            * Selecting a project will automatically populate both English and Arabic link lists.
          </p>
        </div>

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
              <Plus size={18} /> Add External English Link
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
              <Plus size={18} /> إضافة رابط خارجي عربي
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}