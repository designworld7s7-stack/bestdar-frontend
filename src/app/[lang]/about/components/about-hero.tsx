'use client';

import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { useModals } from "@/context/modal-context";

// 🌟 1. إضافة الـ Interface لتعريف البيانات القادمة من السيرفر
interface AboutHeroProps {
  lang: string;
  dynamicData?: { text?: string; image?: string };
}

export default function AboutHero({ lang, dynamicData }: AboutHeroProps) {
  const isAr = lang === 'ar';
  const { openConsultation } = useModals();

  // 🌟 2. استخدام الصورة الديناميكية فوراً بدون تأخير (أو الصورة الافتراضية)
  const imageUrl = dynamicData?.image || '/about/hero-boardroom.jpg';
  
  // 🌟 3. استخدام النص الديناميكي القادم من لوحة التحكم كوصف للقسم (مع بقاء نصك الأصلي كاحتياطي)
  const descriptionText = dynamicData?.text || (isAr 
    ? "نحن نوجه المشترين خطوة بخطوة - من اختيار العقار المناسب إلى إتمام الاستثمار بأمان وثقة."
    : "We guide buyers step-by-step — from choosing the right property to completing the investment safely and securely.");

  return (
    <section className="bg-white pt-20 lg:pt-40 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content Area */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block bg-[#12AD65]/10 text-[#12AD65] text-[12px] font-medium uppercase tracking-tight py-2 px-4 rounded-full mb-8">
              {isAr ? "من نحن" : "Who We Are"}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-medium text-black leading-tight tracking-tight mb-8">
              {isAr ? (
                <>مساعدة المشترين من الشرق الأوسط على الاستثمار <span className="text-[#12AD65]">بثقة في تركيا والإمارات</span></>
              ) : (
                <>Helping Middle Eastern Buyers Invest <span className="text-[#12AD65]">Confidently in Turkey & UAE</span></>
              )}
            </h1>

            {/* 🌟 4. حقن النص الديناميكي هنا (استخدمنا whitespace-pre-line لدعم الأسطر المتعددة) */}
            <p className="text-gray-500 text-sm lg:text-lg font-medium leading-relaxed mb-12 max-w-xl whitespace-pre-line">
              {descriptionText}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={openConsultation}
                className="btn-brand flex items-center gap-3"
              >
                <Calendar size={18} />
                {isAr ? "حجز استشارة" : "Book Consultation"}
              </button>
              
              <a 
                href="https://wa.me/9647759147343"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-3"
              >
                <MessageCircle size={18} className="text-[#12AD65]" />
                {isAr ? "اتصال واتساب" : "WhatsApp Contact"}
              </a>
            </div>
          </div>

          {/* Featured Image - Now Dynamic from Server */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)]">
              <img 
                src={imageUrl} 
                alt="Boutique Boardroom" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}