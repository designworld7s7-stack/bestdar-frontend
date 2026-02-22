'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Pencil, Trash2, Globe, MapPin, Eye } from 'lucide-react';
import Link from 'next/link';

export default function GuidesDashboard() {
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchGuides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guides')
      .select('id, title, title_ar, image_url, category, country_code, published, is_featured, created_at')
      .order('created_at', { ascending: false });
    
    if (data) setGuides(data);
    setLoading(false);
  };

  useEffect(() => { fetchGuides(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this guide permanently?')) return;
    const { error } = await supabase.from('guides').delete().eq('id', id);
    if (!error) setGuides(guides.filter(g => g.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Knowledge Guides</h1>
          <p className="text-slate-500 mt-1">Manage your real estate articles and insights</p>
        </div>
        <Link 
          href="/admin/guides/new" 
          className="bg-[#12AD65] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#12AD65]/20 hover:scale-[1.02] transition-all"
        >
          <Plus size={20} /> Create New Guide
        </Link>
      </div>

      {/* Guides List */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-bold animate-pulse">Loading guides...</div>
        ) : guides.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-4 text-slate-400">
            <Globe size={48} className="opacity-20" />
            <p>No guides found. Start by creating your first one!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {guides.map((guide) => (
              <div key={guide.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-all group">
                
                <div className="flex items-center gap-6 flex-1">
                  {/* Image */}
                  <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                    {guide.image_url ? (
                      <img src={guide.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300"><Globe /></div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${guide.published ? 'bg-[#12AD65]/10 text-[#12AD65]' : 'bg-slate-100 text-slate-500'}`}>
                        {guide.published ? 'Published' : 'Draft'}
                      </span>
                      {guide.is_featured && <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Featured</span>}
                      <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={10} /> {guide.country_code?.toUpperCase() || 'N/A'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{guide.title}</h3>
                    <p className="text-slate-500 text-sm font-medium mt-1" dir="rtl">{guide.title_ar}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/guides/edit/${guide.id}`} className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                    <Pencil size={20}/>
                  </Link>
                  <button onClick={() => handleDelete(guide.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={20}/>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}