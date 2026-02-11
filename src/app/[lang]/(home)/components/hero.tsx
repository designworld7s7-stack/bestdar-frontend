"use client";
import React from 'react';
import Link from 'next/link';
import { useModals } from "@/context/modal-context";
export default function Hero({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const brandGreen = "#12AD65";
const { openConsultation } = useModals();
  return (
    <section className="relative w-full min-h-[80vh] flex items-center lg:min-h-screen">
      
      {/* Background Image - Absolute inset-0 makes it cover the padding area too */}
      <div className="absolute inset-0">
        {/* Mobile: Light gray gradient | Desktop: Your City Image */}
        <div className="absolute inset-0 bg-[#F3F4F6] lg:hidden" /> 
        <img 
          src="/hero-bg.jpg" 
          alt="Luxury Cityscape" 
          className="hidden lg:block h-full w-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent hidden lg:block" />
      </div>

      {/* Main Content Container - pt-32 adds space below Nav without shrinking the image */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-32 pb-20 lg:px-12 lg:pt-0">
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-start lg:max-w-3xl">
          
          <h1 className="text-[36px] lg:text-[72px] font-medium leading-[1.1] text-brand-black lg:text-white uppercase tracking-[0.05em]">
  {isAr 
    ? "اشتري عقارات في تركيا والإمارات بكل ثقة وشفافية" 
    : "Buy Real Estate in Turkey & UAE With Trust, Transparency, and Expertise"}
</h1>

<p className="mt-8 text-lg font-medium text-gray-600 lg:text-gray-200/80 max-w-xl">
  {isAr 
    ? "نساعد المشترين العراقيين على الاستثمار بأمان وثقة." 
    : "Helping Iraqi buyers invest safely and confidently with curated projects and full support."}
</p>

<div className="mt-12 flex w-full flex-col gap-4 sm:flex-row lg:justify-start">
  {/* Using Global Button Utility [cite: 2026-02-04] */}
  <Link 
    href={`/${lang}/all-properties`}
    className="btn-brand px-10"
  >
    {isAr ? "استكشف العقارات" : "Explore Properties"}
  </Link>

  {/* Using Global Secondary Utility with Consultation [cite: 2026-02-04] */}
  <button 
    onClick={openConsultation}
    className="btn-secondary px-12 !bg-white/10 !text-white backdrop-blur-md border border-white/20 hover:!bg-white hover:!text-black"
  >
    {isAr ? "استشارة مجانية" : "Free Consultation"}
  </button>

          </div>
        </div>
      </div>
    </section>
  );
}