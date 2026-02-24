'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // استيراد المكون الذكي
import SocialActions from '@/components/shared/social-actions';

interface GalleryProps {
  lang: string;
  projectTitle: string;
  images: string[]; 
  projectId: string;
}

export default function ProjectGallery({ lang, projectTitle, images, projectId }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-12">
      {/* الصورة الرئيسية الكبيرة - تم استخدام fill لضمان التغطية الكاملة */}
      <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full overflow-hidden lg:rounded-[40px] bg-neutral-900 shadow-2xl">
        <Image 
          src={images[activeIdx]} 
          alt={projectTitle}
          fill // يجعل الصورة تملأ الحاوية الأب (التي تملك relative)
          priority // يخبر Next.js أن هذه الصورة أهم صورة في الصفحة ليحملها فوراً
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 1440px) 100vw, 1440px" // يساعد المتصفح في اختيار الحجم المناسب
        />
        
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <SocialActions lang={lang} title={projectTitle} itemId={projectId} itemType="project" />
        </div>
      </div>

      {/* شريط الصور المصغرة (Thumbnails) */}
      <div className="flex items-center justify-start lg:justify-center gap-8 lg:gap-12 mt-12 lg:mt-20 px-6 overflow-x-auto no-scrollbar py-6">
        {images.map((img, idx) => (
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
              sizes="(max-width: 1024px) 112px, 192px" // مقاسات الصور المصغرة بدقة
              className="object-cover" 
            />
          </button>
        ))}
      </div>
    </section>
  );
}