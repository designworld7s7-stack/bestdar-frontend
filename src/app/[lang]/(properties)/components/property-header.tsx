'use client';

import React from 'react';
import BackButton from '@/components/shared/back-button';

export default function PropertyHeader({ title, description, lang }: { title: string, description: string, lang: string }) {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 lg:pt-20">
      {/* Back Button - Logic handled globally but positioned here for Desktop */}
      <div className="hidden lg:block mb-8">
        <BackButton lang={lang} />
      </div>

      {/* Header Content - Hidden on Mobile per your request */}
      <div className="hidden lg:block max-w-2xl">
        <h1 className="text-5xl lg:text-7xl font-black text-black tracking-tighter leading-none mb-6">
          {title}
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}