'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useModals } from "@/context/modal-context";
import { createClient } from '@/utils/supabase/client'; //

export default function Hero({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const { openConsultation } = useModals();
  const supabase = createClient();

  // 1. KEEP YOUR ORIGINAL IMAGE AS THE DEFAULT (Avoids White Space)
  const [heroImage, setHeroImage] = useState('/hero-bg.jpg');

  useEffect(() => {
  async function fetchHeroImage() {
    try {
      const { data, error } = await supabase
        .from('site_content') // The table name is correct
        .select('image_url')  // We want the URL
        .eq('section_key', 'home_hero') // Search inside 'section_key' for 'home_hero'
        .single(); // Get exactly one row

      if (error) {
        console.error("Supabase Error:", error.message);
        return;
      }

      if (data?.image_url) {
        setHeroImage(data.image_url); // Update the state
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }
  fetchHeroImage();
}, [supabase]);

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
        
        {/* Changed text-brand-black to text-white for mobile */}
        <h1 className="text-[36px] lg:text-[72px] font-medium leading-[1.1] text-white uppercase tracking-[0.05em]">
          {isAr 
            ? "اشتري عقارات في تركيا والإمارات بكل ثقة وشفافية" 
            : "Buy Real Estate in Turkey & UAE With Trust, Transparency, and Expertise"}
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