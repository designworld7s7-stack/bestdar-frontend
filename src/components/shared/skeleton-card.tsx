'use client';

import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      {/* The Shimmer Animation [cite: 2026-02-04] */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      {/* Bottom Content Placeholders */}
      <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
        {/* Title Placeholder */}
        <div className="h-6 w-3/4 rounded-lg bg-gray-200" />
        
        {/* Price Placeholder */}
        <div className="h-4 w-1/4 rounded-lg bg-gray-200" />
        
        {/* Button Placeholder */}
        <div className="mt-6 h-14 w-full rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}