'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus } from 'lucide-react';

export default function ProjectSelector({ onSelect }: any) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(''); // سنستخدم ID كقيمة للاختيار لضمان الدقة
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, title_ar, slug')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setProjects(data);
      } catch (err) {
        console.error("Critical Fetch Error:", err);
      } finally {
        setLoading(false); // ✅ يضمن توقف الـ Loading في كل الحالات
      }
    }
    fetchProjects();
  }, []);

  const handleAdd = () => {
    const project = projects.find(p => String(p.id) === selectedId);
    if (project) {
      onSelect({
        title: project.title || 'Untitled',
        title_ar: project.title_ar || 'بدون عنوان',
        slug: project.slug || String(project.id)
      });
      setSelectedId('');
    }
  };

  if (loading) return <div className="p-4 text-center text-sm text-gray-500">Loading projects...</div>;

  return (
    <div className="flex gap-2">
      <select 
        className="flex-1 p-2 border rounded-xl text-sm"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">-- Choose a Project --</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title || 'No Title'} | {p.title_ar || 'بدون عنوان'}
          </option>
        ))}
      </select>
      <button 
        onClick={handleAdd}
        disabled={!selectedId}
        className="p-2 bg-[#12AD65] text-white rounded-xl disabled:opacity-50"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}