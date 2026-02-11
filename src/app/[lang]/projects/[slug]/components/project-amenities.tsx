'use client';

import React from 'react';
import { 
  Waves, Dumbbell, ShieldCheck, UserCheck, 
  Car, Baby, Cpu, ThermometerSun, Leaf, 
  Trees, Palmtree, CheckCircle2 
} from 'lucide-react';

export default function ProjectAmenities({ lang, project }: { lang: string, project: any }) {
  const isAr = lang === 'ar';

  // 1. Icon Dictionary: Map keywords to Lucide icons
  const getIcon = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('pool') || lowerText.includes('مسبح')) return <Waves size={28} strokeWidth={1.2} />;
    if (lowerText.includes('gym') || lowerText.includes('نادي')) return <Dumbbell size={28} strokeWidth={1.2} />;
    if (lowerText.includes('garden') || lowerText.includes('حديق')) return <Trees size={28} strokeWidth={1.2} />;
    if (lowerText.includes('park') || lowerText.includes('موقف')) return <Car size={28} strokeWidth={1.2} />;
    if (lowerText.includes('security') || lowerText.includes('أمن')) return <ShieldCheck size={28} strokeWidth={1.2} />;
    if (lowerText.includes('kids') || lowerText.includes('أطفال')) return <Baby size={28} strokeWidth={1.2} />;
    if (lowerText.includes('smart') || lowerText.includes('ذكي')) return <Cpu size={28} strokeWidth={1.2} />;
    if (lowerText.includes('spa') || lowerText.includes('سبا')) return <ThermometerSun size={28} strokeWidth={1.2} />;
    
    return <CheckCircle2 size={28} strokeWidth={1.2} />; // Default Icon
  };

  // 2. Data Processing (Safe String splitting)
  const rawValue = project?.amenities;
  let displayList: string[] = [];

  if (typeof rawValue === 'string' && rawValue.trim() !== "") {
    displayList = rawValue.split(',').map(item => item.trim()).filter(Boolean);
  } else if (Array.isArray(rawValue)) {
    displayList = rawValue.filter(Boolean);
  }

  // 3. Fallback
  if (displayList.length === 0) {
    displayList = isAr 
      ? ["مسبح عائلي", "حدائق خاصة", "منطقة ألعاب", "أمن 24 ساعة"] 
      : ["Swimming Pool", "Private Gardens", "Kids Play Area", "24/7 Security"];
  }

  return (
    <section className="bg-[#050505] py-20 lg:py-32 px-4 lg:px-12">
      <div className="max-w-[1440px] mx-auto text-center">
        
        <div className="mb-16 lg:mb-24">
          <span className="text-[#12AD65] text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">
            {isAr ? "المرافق والخدمات" : "World-Class Amenities"}
          </span>
          <h2 className="text-white text-3xl lg:text-5xl font-medium uppercase tracking-tight">
            {isAr ? "تجربة حياة متكاملة" : "Crafted for Excellence"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayList.map((text: string, index: number) => (
            <div 
              key={index}
              className="group bg-[#111] border border-white/5 rounded-[32px] lg:rounded-[40px] p-8 lg:p-12 flex flex-col items-center justify-center transition-all duration-700 hover:border-[#12AD65]/30 hover:-translate-y-2"
            >
              <div className="text-[#12AD65] mb-8 group-hover:scale-110 transition-all duration-700">
                {getIcon(text)}
              </div>
              <span className="text-white text-[12px] lg:text-[14px] font-bold uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}