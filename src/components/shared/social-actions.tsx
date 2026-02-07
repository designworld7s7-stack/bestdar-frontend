'use client';

import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { clsx } from 'clsx';

interface SocialActionsProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function SocialActions({ variant = 'light', className }: SocialActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const iconClasses = clsx(
    "flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-md border",
    variant === 'light' 
      ? "bg-white/90 text-black border-gray-100 hover:bg-white" 
      : "bg-black/40 text-white border-white/10 hover:bg-black/60",
    "h-10 w-10 lg:h-12 lg:w-12"
  );

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <button 
        onClick={() => setIsSaved(!isSaved)}
        className={iconClasses}
      >
        <Heart 
          size={20} 
          className={clsx("transition-colors", isSaved && "fill-red-500 text-red-500")} 
        />
      </button>
      <button className={iconClasses}>
        <Share2 size={20} />
      </button>
    </div>
  );
}