'use client';

import React from 'react';
import Link from 'next/link';
import { useModals } from "@/context/modal-context";

// 1. Add dynamicData to the props interface
interface HeroProps {
  lang: string;
  dynamicData?: { text?: string; image?: string };
}

export default function Hero({ lang, dynamicData }: HeroProps) {
  const isAr = lang === 'ar';
  const { openConsultation } = useModals();

  // 2. Use dynamic data with your original fallbacks
  const heroImage = dynamicData?.image || '/hero-bg.jpg';
  
  // 3. Set the dynamic title (Fallback to your original text if DB is empty)
  const heroTitle = dynamicData?.text || (isAr 
    ? "اشتري عقارات في تركيا والإمارات بكل ثقة وشفافية" 
    : "Buy Real Estate in Turkey & UAE With Trust, Transparency, and Expertise");

  return (
    <section className="relative w-full min-h-[80vh] flex items-center lg:min-h-screen overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-black"> {/* Black base ensures white text is always visible */}
        
        {/* The Image: Removed 'hidden lg:block' so it shows on mobile too */}
        <img 
          key={heroImage}
          src={heroImage} 
          alt="Luxury Cityscape" 
          className="absolute inset-0 h-full w-full object-cover brightness-[0.45] transition-opacity duration-1000" 
          fetchPriority="high"
        />
        
        {/* The Signature Gradient Overlay - Now visible on all screens for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-32 pb-20 lg:px-12 lg:pt-0">
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-start lg:max-w-3xl">
          
          {/* 4. Inject the dynamic title here. Added whitespace-pre-line so "Enter" keys in your dashboard text area work beautifully */}
          <h1 className="text-[36px] lg:text-[72px] font-medium leading-[1.1] text-white uppercase tracking-[0.05em] whitespace-pre-line">
            {heroTitle}
          </h1>

          {/* Changed text-gray-600 to text-white/80 for mobile */}
          <p className="mt-8 text-base lg:text-lg font-medium text-white/80 max-w-xl">
            {isAr 
              ? "نساعد المشترين العراقيين على الاستثمار بأمان وثقة." 
              : "Helping Iraqi buyers invest safely and confidently with curated projects and full support."}
          </p>

          <div className="mt-12 flex w-full flex-col gap-4 sm:flex-row lg:justify-start">
            <Link 
              href={`/${lang}/all-properties`}
              className="btn-brand px-10 text-center"
            >
              {isAr ? "استكشف العقارات" : "Explore Properties"}
            </Link>

            <button 
              onClick={openConsultation}
              className="btn-secondary px-12 !bg-white/10 !text-white backdrop-blur-md border border-white/20 hover:!bg-white hover:!text-black transition-all"
            >
              {isAr ? "استشارة مجانية" : "Free Consultation"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}