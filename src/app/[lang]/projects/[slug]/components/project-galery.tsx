'use client';

import React, { useState } from 'react';
import SocialActions from '@/components/shared/social-actions';

interface GalleryProps {
  lang: string;
  projectTitle: string;
  // قمنا بتغييرها من image_url إلى images لتستقبل المصفوفة الجاهزة من السيرفر
  images: string[]; 
  projectId: string;
}

export default function ProjectGallery({ lang, projectTitle, images, projectId }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // إذا لم تكن هناك صور، لا نعرض شيئاً (يمنع ظهور مساحات فارغة)
  if (!images || images.length === 0) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-12">
      {/* الصورة الرئيسية الكبيرة */}
      <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full overflow-hidden lg:rounded-[40px] bg-gray-100 shadow-2xl">
        <img 
          // الصور الآن روابط مباشرة تنتهي بـ .jpg أو .webp قادمة من السيرفر
          src={images[activeIdx]} 
          crossOrigin="anonymous" 
          alt={projectTitle}
          className="w-full h-full object-cover transition-opacity duration-500"
          // في حال فشل تحميل صورة معينة، نتجنب كسر الواجهة
          onError={(e) => (e.currentTarget.style.display = 'none')} 
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
            <img 
              src={img}
              crossOrigin="anonymous" 
              className="w-full h-full object-cover" 
              alt={`Thumb ${idx}`} 
            />
          </button>
        ))}
      </div>
    </section>
  );
}