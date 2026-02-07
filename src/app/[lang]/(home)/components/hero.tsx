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
          
          <h1 className="text-[36px] font-black leading-[1.1] text-brand-black lg:text-white lg:text-[72px] tracking-tighter">
            {isAr 
              ? "اشتري عقارات في تركيا والإمارات بكل ثقة وشفافية" 
              : "Buy Real Estate in Turkey & UAE With Trust, Transparency, and Expertise"}
          </h1>

          <p className="mt-8 text-lg font-medium text-gray-600 lg:text-gray-200 max-w-xl">
            {isAr 
              ? "نساعد المشترين العراقيين على الاستثمار بأمان وثقة." 
              : "Helping Iraqi buyers invest safely and confidently with curated projects and full support."}
          </p>

          <div className="mt-12 flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link 
              href={`/${lang}/properties`}
              style={{ backgroundColor: brandGreen }}
              className="rounded-2xl lg:rounded-xl px-10 py-5 text-[15px] font-black text-white shadow-xl shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              Explore Properties
            </Link>
            <button 
          onClick={openConsultation} // 3. This triggers the modal in layout.tsx
          className="bg-[#12AD65] text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#12AD65]/20"
        >
          {isAr ? "استشارة مجانية" : "Free Consultation"}
        </button>
          </div>
        </div>
      </div>
    </section>
  );
}