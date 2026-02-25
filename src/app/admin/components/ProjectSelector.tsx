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
    const { data, error } = await supabase
      .from('projects')
      .select('*') // نجلب كل شيء لضمان عدم نقص أي عمود
      .order('created_at', { ascending: false });
    
    // تأكد من ظهور البيانات هنا في الكونسول (مثل الصورة 1037)
    console.log("Full Project Data:", data); 
    if (data) setProjects(data);
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
  // البحث عن المشروع المختار
  const project = projects.find(p => String(p.slug) === selectedSlug || String(p.id) === selectedSlug);
  
  if (project) {
    onSelect({
      title: project.title,    // سيقرأ "Panorama Prime" الآن
      title_ar: project.title_ar,
      slug: project.slug || String(project.id) // إذا لم يوجد slug نستخدم الـ id لمنع 404
    });
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
  <option key={p.id} value={p.slug || p.id}>
    {p.title} | {p.title_ar} {/* سيظهر النصين الآن بدلاً من الفراغ في الصورة 1033 */}
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