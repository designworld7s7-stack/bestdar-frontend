'use client';

import React from 'react';
import BackButton from '@/components/shared/back-button';

export default function PropertyHeader({ title, description, lang }: { title: string, description: string, lang: string }) {
  return (
  <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 lg:pt-20">
    {/* Desktop Back Button */}
    <div className="hidden lg:block mb-8">
      <BackButton lang={lang} />
    </div>

    {/* Header Content - Elegant & Spaced [cite: 2026-02-04] */}
    <div className="hidden lg:block max-w-4xl">
      <h1 className="text-5xl lg:text-[72px] font-medium text-black uppercase tracking-[0.1em] leading-tight mb-6">
        {title}
      </h1>
      <div className="h-1 w-20 bg-[#12AD65] mb-8" /> {/* Brand accent line [cite: 2026-02-04] */}
      <p className="text-[#4B5563] font-medium text-lg lg:text-xl leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  </div>
);
}