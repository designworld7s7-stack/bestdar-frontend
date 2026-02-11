'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface ProjectCardHomeProps {
  // 1. Update Props: Change 'id' to 'slug' to match your dynamic route
  slug: string; 
  title: string;
  price: string;
  image: string;
  lang: string;
}

export default function ProjectCardHome({ slug, title, price, image, lang }: ProjectCardHomeProps) {
  const brandGreen = "#12AD65";
  const isAr = lang === 'ar';
  
  // 2. Update Link: Use the slug here so it points to /projects/elite-residence-dubai
  const projectLink = `/${lang}/projects/${slug}`;

  return (
    <div 
      className="group relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
    >
      <Link href={projectLink} className="absolute inset-0 z-10">
        <span className="sr-only">{title}</span>
      </Link>

      <img 
        src={image || '/placeholder-project.jpg'} // Fallback image if Supabase is empty
        alt={title} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-8 z-20 pointer-events-none">
        <h3 className="text-xl font-medium leading-tight text-white lg:text-2xl">
          {title}
        </h3>
        
        <p style={{ color: brandGreen }} className="mt-2 text-sm font-medium">
          {isAr ? `تبدأ من ${price}` : `Starting from ${price}`}
        </p>

        <Link 
          href={projectLink}
          className={clsx(
            "mt-6 flex h-14 items-center justify-center rounded-2xl text-sm font-medium transition-all duration-300 active:scale-95 pointer-events-auto",
            "bg-white text-black lg:group-hover:bg-black lg:group-hover:text-white"
          )}
        >
          {isAr ? "عرض المشروع" : "View Project"}
        </Link>
      </div>
    </div>
  );
}