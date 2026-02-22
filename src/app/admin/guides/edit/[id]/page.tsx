'use client';

import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

// ♻️ نستدعي نفس المكونات التي بنيناها لصفحة الإضافة (إعادة استخدام الكود!)
import GuideHeader from '../../components/GuideHeader';
import GuideHeroSection from '../../components/GuideHero';
import GuideIntroSection from '../../components/GuideIntro';
import GuideMainContent from '../../components/GuideMainContent';
import GuideSidebar from '../../components/GuideSidebar';

export default function EditGuidePage() {
  const router = useRouter();
  const params = useParams(); 
  const id = params.id as string; // نلتقط المعرف من الرابط
  const supabase = createClient();

  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  // نفس هيكل البيانات
  const [formData, setFormData] = useState({
    slug: '', category: 'buying-guide', country_code: 'tr', image_url: '',
    published: true, is_hero: false, is_featured: false,
    title: '', subtitle: '', excerpt: '', intro_text: '', content: '', callout: '', sidebar_links: [],
    title_ar: '', subtitle_ar: '', excerpt_ar: '', intro_text_ar: '', content_ar: '', callout_ar: '', sidebar_links_ar: []
  });

  // 1. جلب البيانات عند فتح الصفحة
  useEffect(() => {
    const fetchGuide = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        // ندمج البيانات القادمة من قاعدة البيانات مع حالتنا
        setFormData(prev => ({ ...prev, ...data }));
      } else if (error) {
        alert("Error loading guide data!");
        router.push('/admin/guides');
      }
      setLoadingFetch(false);
    };

    fetchGuide();
  }, [id, router]);

  // دالة تحديث الحقول (نفسها تماماً)
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 2. دالة التحديث (UPDATE) بدلاً من (INSERT)
  const handleUpdate = async () => {
    setLoadingSave(true);
    
    // إزالة حقل id من البيانات المرسلة لتجنب أخطاء سوبابيس (لأننا نستخدمه كشرط فقط)
    const dataToUpdate = { ...formData };
    delete (dataToUpdate as any).id;
    delete (dataToUpdate as any).created_at;

    const { error } = await supabase
      .from('guides')
      .update(dataToUpdate)
      .eq('id', id);

    if (error) {
      alert("Error updating guide: " + error.message);
    } else {
      router.push('/admin/guides'); // العودة للقائمة بعد النجاح
    }
    setLoadingSave(false);
  };

  // شاشة تحميل أنيقة أثناء جلب البيانات
  if (loadingFetch) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4 text-slate-400">
        <Loader2 size={40} className="animate-spin text-[#12AD65]" />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Guide Data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 pb-24 bg-slate-50/30">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600 flex items-center gap-2 font-bold text-xs tracking-widest">
          <ArrowLeft size={16} /> BACK
        </button>
        <button 
          onClick={handleUpdate} 
          disabled={loadingSave}
          className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          <Save size={20} /> {loadingSave ? 'UPDATING...' : 'UPDATE GUIDE'}
        </button>
      </div>

      {/* ♻️ نفس المكونات بالضبط، نمرر لها البيانات والدوال! */}
      <GuideHeader data={formData} update={updateField} />
      <GuideHeroSection data={formData} update={updateField} />
      <GuideIntroSection data={formData} update={updateField} />
      <GuideMainContent data={formData} update={updateField} />
      <GuideSidebar data={formData} update={updateField} />
    </div>
  );
}