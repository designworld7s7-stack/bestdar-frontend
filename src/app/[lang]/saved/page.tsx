'use client';

import React, { useState } from 'react';
import ProjectCard from '@/components/shared/project-card';
import ArticleCard from '@/components/shared/article-card';
import BackButton from '@/components/shared/back-button';
import Link from 'next/link';
import { BookmarkX } from 'lucide-react';

interface SavedGuide {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  excerpt: string;
  location: string;
}

export default function SavedPage({ params }: { params: { lang: string } }) {
  const [activeTab, setActiveTab] = useState<'properties' | 'guides'>('properties');
  const isAr = params.lang === 'ar';

  // 2. Added 'developer' and 'deliveryDate' to match ProjectCardProps
  const savedProperties = [
    { 
      id: "1", 
      title: "Luxury Marina Villa", 
      location: "Dubai, UAE", 
      price: "$1.2M", 
      image: "/p1.jpg", 
      lang: params.lang,
      developer: "Emaar", // Added
      deliveryDate: "2026" // Added
    },
  ];
  
  // 3. Explicitly typed the empty array
  const savedGuides: SavedGuide[] = [];
  const isEmpty = (activeTab === 'properties' && savedProperties.length === 0) || 
                  (activeTab === 'guides' && savedGuides.length === 0);
  return (
    <main className="min-h-screen bg-white pb-24 pt-24 sm:pt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Desktop Back Button */}
        <div className="hidden lg:flex mb-10">
          <BackButton lang={params.lang} /> 
        </div>

        {/* Header: Updated to Elegant Typography [cite: 2026-02-04] */}
        <div className="mb-14 space-y-4">
          <h1 className="text-[40px] lg:text-[60px] font-medium uppercase tracking-tight text-black leading-tight">
            {isAr ? "المحفوظات" : "Saved"}
          </h1>
          <div className="w-16 h-1 bg-[#12AD65]" />
        </div>

        {/* Tab Switcher: Using unified button heights [cite: 2026-02-04] */}
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

        {/* Content Logic */}
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

    {/* DYNAMIC LINK [cite: 2026-02-04] */}
    <Link 
      href={activeTab === 'properties' ? `/${params.lang}/projects` : `/${params.lang}/guides`} 
      className="btn-brand mt-10 px-10"
    >
      {activeTab === 'properties'
        ? (isAr ? "استكشف المشاريع" : "Explore Projects")
        : (isAr ? "تصفح الأدلة" : "Browse Guides")}
    </Link>
  </div>
) : (
          /* GRID VIEW [cite: 2026-02-04] */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'properties' 
              ? savedProperties.map(prop => <ProjectCard key={prop.id} {...prop} />)
              : savedGuides.map(guide => <ArticleCard key={guide.id} {...guide} lang={params.lang} />)
            }
          </div>
        )}
      </div>
    </main>
  );
}