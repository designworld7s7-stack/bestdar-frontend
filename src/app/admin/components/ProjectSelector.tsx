'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Link2, Loader2, Plus } from 'lucide-react';

interface ProjectSelectorProps {
  // ✅ تحديث النوع ليتطابق مع الدالة التي يتوقعها الأب
  onSelect: (project: { title: string; title_ar: string; slug: string }) => void;
}

export default function ProjectSelector({ onSelect }: ProjectSelectorProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState('');
  const supabase = createClient();

 useEffect(() => {
  async function fetchProjects() {
    // تم التعديل لجلب 'title' و 'title_ar'
    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, title, title_ar') 
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
    if (error) console.error("Error fetching projects:", error);
    setLoading(false);
  }
  fetchProjects();
}, []);

// في جزء الـ return، تأكد من استخدام p.title
{projects.map((p) => (
  <option key={p.id} value={p.slug}>
    {p.title} | {p.title_ar} {/* ✅ تم تغيير title_en إلى title */}
  </option>
))}

  const handleAdd = () => {
  const project = projects.find(p => p.slug === selectedSlug);
  if (project) {
    // مرر الكائن كاملاً لضمان عدم وجود حقول undefined
    interface ProjectSelectorProps {
  // ✅ تحديث الأنواع لتقبل الحقول الإضافية
  onSelect: (item: { title: string; title_ar: string; slug: string }) => void;
}
    setSelectedSlug(''); 
  }
};

  if (loading) return <Loader2 className="animate-spin text-[#12AD65] size-5" />;

  return (
    <div className="flex items-end gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="flex-1 space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
          <Link2 size={12} /> Quick Link to Project
        </label>
        <select 
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 ring-[#12AD65]/20 transition-all"
        >
          <option value="">-- Choose a Project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.slug}>
              {p.title_en} | {p.title_ar}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={!selectedSlug}
        className="bg-[#12AD65] hover:bg-[#0f8e52] disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-[#12AD65]/20"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}