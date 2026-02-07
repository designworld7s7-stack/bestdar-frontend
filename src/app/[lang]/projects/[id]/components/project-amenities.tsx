'use client';

import React from 'react';
import { 
  Waves, Dumbbell, ShieldCheck, UserCheck, 
  Car, Baby, Cpu, ThermometerSun 
} from 'lucide-react';

export default function ProjectAmenities({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const amenities = [
    { icon: <Waves size={24} />, label: isAr ? "مسبح" : "Swimming Pool" },
    { icon: <Dumbbell size={24} />, label: isAr ? "نادي رياضي" : "Modern Gym" },
    { icon: <ShieldCheck size={24} />, label: isAr ? "أمن 24/7" : "24/7 Security" },
    { icon: <UserCheck size={24} />, label: isAr ? "خدمة كونسيرج" : "Concierge" },
    { icon: <Car size={24} />, label: isAr ? "موقف داخلي" : "Indoor Parking" },
    { icon: <Baby size={24} />, label: isAr ? "منطقة ألعاب" : "Kids Play Area" },
    { icon: <Cpu size={24} />, label: isAr ? "منزل ذكي" : "Smart Home System" },
    { icon: <ThermometerSun size={24} />, label: isAr ? "سبا وساونا" : "Spa & Sauna" },
  ];

  return (
    <section className="bg-[#050505] py-16 lg:py-32 px-4 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="mb-12 lg:mb-20 text-center lg:text-left">
          <h3 className="text-2xl lg:text-4xl font-black text-white tracking-tighter uppercase mb-4">
            {isAr ? "مرافق المشروع" : "Project Amenities"}
          </h3>
          <div className="h-1 w-12 bg-[#12AD65] rounded-full mx-auto lg:mx-0" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {amenities.map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-[0_20px_60px_rgba(18,173,101,0.15)] hover:-translate-y-2 cursor-default"
            >
              <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-full border-2 border-[#12AD65]/10 flex items-center justify-center text-[#12AD65] mb-6 group-hover:bg-[#12AD65] group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>

              <span className="text-sm lg:text-base font-black text-black tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}