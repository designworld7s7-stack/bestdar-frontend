'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

export default function BackButton({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAr = lang === 'ar';
  
  // Logic to hide on the home page
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  if (isHome) return null;

  return (
    <button 
      onClick={() => router.back()}
      className={clsx(
        // 'hidden lg:flex' ensures it never appears on mobile or tablets
        "hidden lg:flex fixed z-40 items-center justify-center h-12 w-12 rounded-full bg-white shadow-xl border border-gray-100 transition-all duration-300 hover:bg-black hover:text-white group active:scale-90",
        
        // Vertical position
        "top-32", 
        
        // Horizontal position based on language (LRT vs RTL)
        isAr ? "right-12" : "left-12"
      )}
    >
      <ArrowLeft 
        size={20} 
        className={clsx(
          "transition-transform",
          // Flip arrow and animation direction for Arabic
          isAr ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"
        )} 
      />
    </button>
  );
}