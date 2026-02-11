'use client';

import React, { useState } from 'react';
import SocialActions from '@/components/shared/social-actions';

interface GalleryProps {
  lang: string;
  projectTitle: string;
  images: string[]; // Add this to your interface [cite: 2026-02-04]
}

export default function ProjectGallery({ lang, projectTitle, images }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-12">
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full overflow-hidden lg:rounded-[40px] bg-gray-100 shadow-2xl">
        <img 
          src={images[activeIdx]} 
          className="w-full h-full object-cover" 
          alt="Gallery" 
        />
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <SocialActions lang={lang} title={projectTitle} />
        </div>
      </div>

      {/* ENHANCED THUMBNAIL SPACE 
          - mt-12 lg:mt-20: Significant vertical breathing space from the main image.
          - gap-8 lg:gap-12: More space between each thumbnail.
          - py-6: Vertical padding so the 'scale-105' and 'shadow' aren't cropped.
      */}
      <div className="flex items-center justify-start lg:justify-center gap-8 lg:gap-12 mt-12 lg:mt-20 px-6 overflow-x-auto no-scrollbar py-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative shrink-0 w-28 h-20 lg:w-48 lg:h-32 rounded-[24px] lg:rounded-[32px] overflow-hidden border-2 transition-all duration-500 ${
              activeIdx === idx 
                ? 'border-[#12AD65] scale-110 shadow-[0_20px_40px_rgba(18,173,101,0.2)] z-10' 
                : 'border-transparent opacity-30 grayscale hover:opacity-100 hover:grayscale-0'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
          </button>
        ))}
      </div>
    </section>
  );
}