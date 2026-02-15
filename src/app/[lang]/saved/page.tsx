'use client';

import React, { useState, useEffect, use } from 'react'; // 1. استيراد use
import ProjectCard from '@/components/shared/project-card';
import ArticleCard from '@/components/shared/article-card';
import BackButton from '@/components/shared/back-button';
import Link from 'next/link';
import { BookmarkX, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function SavedPage({ params }: { params: Promise<{ lang: string }> }) {
  // 2. فك الـ Promise الخاص بـ params
  const resolvedParams = use(params);
  const lang = resolvedParams.lang;
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'properties' | 'guides'>('properties');
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [savedGuides, setSavedGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchSavedData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: savedItems } = await supabase
        .from('saved_items')
        .select('item_id, item_type')
        .eq('user_id', user.id);

      if (savedItems) {
        const propertyIds = savedItems.filter(i => i.item_type === 'project').map(i => i.item_id);
        const guideIds = savedItems.filter(i => i.item_type === 'guide').map(i => i.item_id);

        if (propertyIds.length > 0) {
          const { data: props } = await supabase.from('projects').select('*').in('id', propertyIds);
          if (props) setSavedProperties(props);
        }

        if (guideIds.length > 0) {
          const { data: articles } = await supabase.from('guides').select('*').in('id', guideIds);
          if (articles) setSavedGuides(articles);
        }
      }
      setLoading(false);
    };

    fetchSavedData();
  }, [supabase]);

  const isEmpty = (activeTab === 'properties' && savedProperties.length === 0) || 
                  (activeTab === 'guides' && savedGuides.length === 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#12AD65]" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24 pt-24 sm:pt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        <div className="hidden lg:flex mb-10">
          <BackButton lang={lang} /> 
        </div>

        <div className="mb-14 space-y-4">
          <h1 className="text-[40px] lg:text-[60px] font-medium uppercase tracking-tight text-black leading-tight">
            {isAr ? "المحفوظات" : "Saved"}
          </h1>
          <div className="w-16 h-1 bg-[#12AD65]" />
        </div>

        <div className="flex gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`h-[48px] lg:h-[56px] px-8 rounded-2xl text-[12px] font-bold uppercase tracking-tighter transition-all ${activeTab === 'properties' ? 'bg-black text-white shadow-2xl' : 'bg-[#F8F9FA] text-[#4B5563]'}`}
          >
            {isAr ? "العقارات" : "Properties"} ({savedProperties.length})
          </button>
          <button 
            onClick={() => setActiveTab('guides')}
            className={`h-[48px] lg:h-[56px] px-8 rounded-2xl text-[12px] font-bold uppercase tracking-tighter transition-all ${activeTab === 'guides' ? 'bg-black text-white shadow-2xl' : 'bg-[#F8F9FA] text-[#4B5563]'}`}
          >
            {isAr ? "الأدلة" : "Guides"} ({savedGuides.length})
          </button>
        </div>

       {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#12AD65]/5 text-[#12AD65]">
              <BookmarkX size={40} strokeWidth={1.2} />
            </div>
            
            <h2 className="text-[24px] font-medium uppercase tracking-[0.15em] text-black">
              {activeTab === 'properties' 
                ? (isAr ? "لا توجد عقارات محفوظة" : "No Saved Properties")
                : (isAr ? "لا توجد أدلة محفوظة" : "No Saved Guides")}
            </h2>
            
            <p className="mt-4 max-w-xs text-[#4B5563] text-sm font-medium leading-relaxed">
              {activeTab === 'properties'
                ? (isAr ? "استكشف مشاريعنا المميزة في تركيا والإمارات" : "Explore our premium projects in Turkey and the UAE.")
                : (isAr ? "اقرأ أدلتنا الشاملة حول الاستثمار العقاري" : "Read our comprehensive guides on real estate investment.")}
            </p>

            <Link 
              href={activeTab === 'properties' ? `/${lang}/projects` : `/${lang}/guides`} 
              className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#12AD65] px-10 text-[13px] font-bold uppercase tracking-widest text-white shadow-xl shadow-green-100 transition-all hover:scale-105 active:scale-95"
            >
              {activeTab === 'properties'
                ? (isAr ? "استكشف المشاريع" : "Explore Projects")
                : (isAr ? "تصفح الأدلة" : "Browse Guides")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'properties' 
              ? savedProperties.map(prop => <ProjectCard key={prop.id} {...prop} lang={lang} />)
              : savedGuides.map(guide => <ArticleCard key={guide.id} {...guide} lang={lang} />)
            }
          </div>
        )}
      </div>
    </main>
  );
}