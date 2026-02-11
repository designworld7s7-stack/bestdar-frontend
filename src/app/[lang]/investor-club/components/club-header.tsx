'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import BackButton from '@/components/shared/back-button';

interface ClubHeaderProps {
  lang: string;
}

export default function ClubHeader({ lang }: ClubHeaderProps) {
  const isAr = lang === 'ar';

  return (
    <section className="relative bg-[#050505] pt-16 lg:pt-32 pb-20 overflow-hidden">
      {/* Desktop-Only Back Button */}
      <div className="hidden lg:block">
        <BackButton lang={lang} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        
        {/* Invitation Only Badge */}
        <div className="mb-8 flex items-center gap-2 bg-[#1A1A1A] border border-[#B8860B]/30 py-2 px-5 rounded-full">
          <Lock size={14} className="text-[#B8860B]" />
          <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#B8860B]">
            {isAr ? "للمدعوين فقط" : "Invitation Only"}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl lg:text-8xl font-medium text-white tracking-[0.1em] mb-8 uppercase">
          {isAr ? "نادي المستثمرين" : "Investor Club"}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-gray-500 text-sm lg:text-lg font-medium leading-relaxed">
          {isAr 
            ? "برنامج عضوية خاص يكافئ مستثمرينا العقاريين الأكثر التزاماً في تركيا والإمارات العربية المتحدة." 
            : "A private membership program rewarding our most committed real estate investors in Turkey & UAE."}
        </p>
      </div>

      {/* Premium Subtle Gradient Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}