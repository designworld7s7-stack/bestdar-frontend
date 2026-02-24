'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // استيراد المحسن الذكي للصور
import { useModals } from "@/context/modal-context";

interface HeroProps {
  lang: string;
  dynamicData?: { text?: string; image?: string };
}

export default function Hero({ lang, dynamicData }: HeroProps) {
  const isAr = lang === 'ar';
  const { openConsultation } = useModals();

  const heroImage = dynamicData?.image || '/hero-bg.jpg';
  
  const heroTitle = dynamicData?.text || (isAr 
    ? "اشتري عقارات في تركيا والإمارات بكل ثقة وشفافية" 
    : "Buy Real Estate in Turkey & UAE With Trust, Transparency, and Expertise");

  return (
    <section className="relative w-full min-h-[80vh] flex items-center lg:min-h-screen overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-black z-0"> 
        
        {/* المكون الذكي للصور - تم استبدال img بـ Image */}
        <Image 
          src={heroImage} 
          alt="Luxury Cityscape" 
          fill // يملأ كامل مساحة السيكشن
          priority // خاصية "الأولوية القصوى" لضمان أسرع تحميل ممكن للصورة الرئيسية
          quality={90} // نرفع الجودة قليلاً هنا للحفاظ على هيبة الفخامة
          className="object-cover brightness-[0.45] transition-opacity duration-1000" 
          sizes="100vw" // تأخذ كامل عرض الشاشة دائماً
        />
        
        {/* التدرج اللوني فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 pt-32 pb-20 lg:px-12 lg:pt-0">
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-start lg:max-w-3xl">
          
          <h1 className="text-[36px] lg:text-[72px] font-medium leading-[1.1] text-white uppercase tracking-[0.05em] whitespace-pre-line">
            {heroTitle}
          </h1>

          <p className="mt-8 text-base lg:text-lg font-medium text-white/80 max-w-xl">
            {isAr 
              ? "نساعد المشترين العراقيين على الاستثمار بأمان وثقة." 
              : "Helping Iraqi buyers invest safely and confidently with curated projects and full support."}
          </p>

          <div className="mt-12 flex w-full flex-col gap-4 sm:flex-row lg:justify-start">
            <Link 
              href={`/${lang}/all-properties`}
              className="btn-brand px-10 text-center flex items-center justify-center"
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