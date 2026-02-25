'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image'; 
import SocialActions from '@/components/shared/social-actions';

interface GalleryProps {
  lang: string;
  projectTitle: string;
  images: string[]; 
  projectId: string;
  // ✨ إضافة خاصية الترتيب القادمة من قاعدة البيانات
  galleryOrder?: Record<string, number>; 
}

export default function ProjectGallery({ lang, projectTitle, images, projectId, galleryOrder }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // ✨ منطق الترتيب الذكي: يقوم بترتيب الصور بناءً على الأرقام التي وضعتها في الداشبورد
  const sortedImages = useMemo(() => {
    if (!galleryOrder || Object.keys(galleryOrder).length === 0) return images;

    return [...images].sort((a, b) => {
      // استخراج اسم الملف من الرابط الكامل للمقارنة مع galleryOrder
      const fileNameA = a.split('/').pop() || '';
      const fileNameB = b.split('/').pop() || '';
      
      const orderA = galleryOrder[fileNameA] ?? 999;
      const orderB = galleryOrder[fileNameB] ?? 999;
      
      return orderA - orderB;
    });
  }, [images, galleryOrder]);

  if (!sortedImages || sortedImages.length === 0) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-12">
      {/* الصورة الرئيسية الكبيرة - تستخدم المصفوفة المرتبة sortedImages */}
      <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full overflow-hidden lg:rounded-[40px] bg-neutral-900 shadow-2xl">
        <Image 
          src={sortedImages[activeIdx]} 
          alt={projectTitle}
          fill 
          priority 
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />
        
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <SocialActions lang={lang} title={projectTitle} itemId={projectId} itemType="project" />
        </div>
      </div>

      {/* شريط الصور المصغرة (Thumbnails) - يستخدم المصفوفة المرتبة أيضاً */}
      <div className="flex items-center justify-start lg:justify-center gap-8 lg:gap-12 mt-12 lg:mt-20 px-6 overflow-x-auto no-scrollbar py-6">
        {sortedImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative shrink-0 w-28 h-20 lg:w-48 lg:h-32 rounded-[24px] lg:rounded-[32px] overflow-hidden border-2 transition-all duration-500 ${
              activeIdx === idx 
                ? 'border-[#12AD65] scale-110 shadow-lg z-10' 
                : 'border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
            }`}
          >
            <Image 
              src={img}
              alt={`Thumbnail ${idx}`} 
              fill
              sizes="(max-width: 1024px) 112px, 192px"
              className="object-cover" 
            />
          </button>
        ))}
      </div>
    </section>
  );
}