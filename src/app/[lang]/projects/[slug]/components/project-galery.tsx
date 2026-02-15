'use client';

import React, { useState, useEffect } from 'react';
import SocialActions from '@/components/shared/social-actions';
import { createClient } from '@/utils/supabase/client';
import { Loader2, ImageIcon } from 'lucide-react';

// 1. إعادة تعريف GalleryProps لحل خطأ TypeScript
interface GalleryProps {
  lang: string;
  projectTitle: string;
  image_url: string; // هذا هو اسم المجلد في الـ Bucket
  projectId: string;
}

export default function ProjectGallery({ lang, projectTitle, image_url, projectId }: GalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchFolderImages = async () => {
      if (!image_url) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // 1. جلب قائمة الملفات باستخدام اسم الـ Bucket الصحيح 'project-images'
        const { data, error } = await supabase
          .storage
          .from('project-images') 
          .list(image_url);

        if (error) throw error;

        if (data && data.length > 0) {
          // 2. تصفية الملفات وإنشاء روابط عامة (Public URLs)
          const urls = data
            .filter(file => 
              file.name !== '.emptyFolderPlaceholder' && 
              (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.webp'))
            )
            .map((file) => 
              supabase.storage
                .from('project-images') // التأكد من مطابقة اسم الـ Bucket هنا أيضاً
                .getPublicUrl(`${image_url}/${file.name}`).data.publicUrl
            );
          
          setImages(urls);
        }
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderImages();
  }, [image_url, supabase]);

  return (
    <section className="w-full max-w-[1440px] mx-auto lg:px-12">
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full overflow-hidden lg:rounded-[40px] bg-gray-100 shadow-2xl">
        <img 
          src={images[activeIdx]} 
          className="w-full h-full object-cover transition-opacity duration-500" 
          alt={projectTitle} 
          key={images[activeIdx]}
        />
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
          <SocialActions 
            lang={lang} 
            title={projectTitle} 
            itemId={projectId} 
            itemType="project" 
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center justify-start lg:justify-center gap-8 lg:gap-12 mt-12 lg:mt-20 px-6 overflow-x-auto no-scrollbar py-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative shrink-0 w-28 h-20 lg:w-48 lg:h-32 rounded-[24px] lg:rounded-[32px] overflow-hidden border-2 transition-all duration-500 ${
              activeIdx === idx 
                ? 'border-[#12AD65] scale-110 shadow-[0_20px_40px_rgba(18,173,101,0.2)] z-10' 
                : 'border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
          </button>
        ))}
      </div>
    </section>
  );
}