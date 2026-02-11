'use client';

import React from 'react';
import { Search, ShieldCheck, Lightbulb } from 'lucide-react';

export default function OurMission({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const missions = [
    {
      icon: <Search size={32} />,
      title: isAr ? "الشفافية" : "Transparency",
      description: isAr 
        ? "معلومات واضحة، لا رسوم خفية، ومشاريع تم التحقق منها يمكنك الوثوق بها."
        : "Clear information, no hidden fees, and verified projects you can trust."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: isAr ? "الأمان" : "Security",
      description: isAr 
        ? "عملية قانونية وآمنة وموثوقة تضمن حماية استثمارك."
        : "A safe, legal, and trusted process ensuring your investment is protected."
    },
    {
      icon: <Lightbulb size={32} />,
      title: isAr ? "التوجيه" : "Guidance",
      description: isAr 
        ? "دعم خطوة بخطوة من مكالمتك الأولى حتى توقيع العقد النهائي."
        : "Step-by-step support from your first call to the final contract signing."
    }
  ];

  return (
    <section className="bg-white py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-medium text-black tracking-[0.1em] mb-6">
            {isAr ? "مهمتنا" : "Our Mission"}
          </h2>
          <p className="text-[#4B5563] font-medium text-sm lg:text-lg max-w-2xl mx-auto">
            {isAr 
              ? "نحن نسترشد بمبادئ أساسية تمنح الأولوية لأمانك ونجاحك."
              : "Guided by core principles that prioritize your safety and success."}
          </p>
        </div>

        {/* Mission Grid: Horizontal for Desktop, Vertical Stack for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {missions.map((item, index) => (
            <div 
              key={index}
              className="group bg-white p-10 lg:p-14 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Icon Container with subtle green circle */}
              <div className="h-20 w-20 rounded-full bg-[#12AD65]/5 flex items-center justify-center text-[#12AD65] mb-8 group-hover:bg-[#12AD65] group-hover:text-white transition-colors duration-500">
                {item.icon}
              </div>

              <h3 className="text-xl lg:text-2xl font-medium text-black mb-6">
                {item.title}
              </h3>
              
              <p className="text-gray-500 text-sm lg:text-base font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}