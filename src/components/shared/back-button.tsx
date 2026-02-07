'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

export default function BackButton({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Only show if NOT on the home page
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  if (isHome) return null;

  return (
    <button 
      onClick={() => router.back()}
      className={clsx(
        "hidden lg:flex fixed top-32 left-12 z-40 items-center justify-center h-12 w-12 rounded-full bg-white shadow-xl border border-gray-100 transition-all duration-300 hover:bg-black hover:text-white group active:scale-90",
        lang === 'ar' ? "left-auto right-12" : "left-12" // Respecting RTL
      )}
    >
      <ArrowLeft 
        size={20} 
        className={clsx("transition-transform group-hover:-translate-x-1", lang === 'ar' && "rotate-180 group-hover:translate-x-1")} 
      />
    </button>
  );
}