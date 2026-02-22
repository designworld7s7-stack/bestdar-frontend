'use client';

import React, { useState } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

// استيراد المكونات الفرعية
import GuideHeader from '../components/GuideHeader';
import GuideHeroSection from '../components/GuideHero';
import GuideIntroSection from '../components/GuideIntro';
import GuideMainContent from '../components/GuideMainContent';
import GuideSidebar from '../components/GuideSidebar';

export default function NewGuidePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  // الحالة الشاملة لكل الأعمدة (EN + AR)
  const [formData, setFormData] = useState({
    slug: '',
    category: 'Investment',
    country_code: 'tr',
    image_url: '',
    published: true,
    is_hero: false,
    is_featured: false,
    // English Columns
    title: '', subtitle: '', excerpt: '', intro_text: '', content: '', callout: '',
    sidebar_links: [],
    // Arabic Columns
    title_ar: '', subtitle_ar: '', excerpt_ar: '', intro_text_ar: '', content_ar: '', callout_ar: '',
    sidebar_links_ar: []
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    // التأكد من وجود Slug تلقائي إذا لم يتم إدخاله
    const finalData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-')
    };

    const { error } = await supabase.from('guides').insert([finalData]);
    
    if (error) {
      alert("Error saving guide: " + error.message);
    } else {
      router.push('/admin/guides');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 pb-24 bg-slate-50/30">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600 flex items-center gap-2 font-bold text-xs tracking-widest">
          <ArrowLeft size={16} /> BACK
        </button>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="bg-[#12AD65] text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-[#12AD65]/20 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          <Save size={20} /> {loading ? 'PUBLISHING...' : 'SAVE GUIDE'}
        </button>
      </div>

      {/* ترتيب المكونات حسب تدفق الصفحة */}
      <GuideHeader data={formData} update={updateField} />
      <GuideHeroSection data={formData} update={updateField} />
      <GuideIntroSection data={formData} update={updateField} />
      <GuideMainContent data={formData} update={updateField} />
      <GuideSidebar data={formData} update={updateField} />
    </div>
  );
}