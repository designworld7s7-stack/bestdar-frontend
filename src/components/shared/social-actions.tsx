'use client';

import React from 'react';
import { Bookmark, Share2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface SocialActionsProps {
  lang?: string;
  title?: string; // Renamed from propertyTitle to be generic for guides too [cite: 2026-02-04]
}

export default function SocialActions({ 
  lang, 
  title 
}: SocialActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Robust language detection [cite: 2026-02-04]
  const currentLang = lang || pathname.split('/')[1] || 'en';
  const isAr = currentLang === 'ar';

  const handleSave = (e: React.MouseEvent) => {
  e.stopPropagation(); 
  e.preventDefault();

  // FIX: Added /auth/ to match your actual folder structure [cite: 2026-02-04]
  router.push(`/${currentLang}/auth/signup`); 
};

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: title || 'Best Dar | Premium Real Estate', 
          url: url 
        });
      } catch (err) {
        // User closed the share menu [cite: 2026-02-04]
      }
    } else {
      navigator.clipboard.writeText(url);
      alert(isAr ? "تم نسخ الرابط" : "Link copied");
    }
  };

  const buttonStyle = "flex items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:scale-110 active:scale-95 h-11 w-11";

  return (
    <div className="flex items-center gap-3 relative z-[30]">
      <button onClick={handleSave} className={buttonStyle} type="button">
        <Bookmark size={20} className="text-black" />
      </button>
      
      <button onClick={handleShare} className={buttonStyle} type="button">
        <Share2 size={20} className="text-black" />
      </button>
    </div>
  );
}