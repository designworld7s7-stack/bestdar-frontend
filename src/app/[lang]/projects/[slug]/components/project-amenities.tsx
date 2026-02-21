'use client';

import React from 'react';
import { 
  Waves, Dumbbell, ShieldCheck, UserCheck, 
  Car, Baby, Cpu, ThermometerSun, Leaf, 
  Trees, Palmtree, CheckCircle2 
} from 'lucide-react';

export default function ProjectAmenities({ lang, project }: { lang: string, project: any }) {
  const isAr = lang === 'ar';

  // 1. القاموس الموسع للترجمة والأيقونات
  // سنستخدم الـ ID الذي يرسله الداشبورد (مثل 'pool') لعرض الاسم الصحيح والأيقونة
  const AMENITY_MAP: any = {
    'pool': { en: 'Swimming Pool', ar: 'مسبح', icon: <Waves size={28} strokeWidth={1.2} /> },
    'gym': { en: 'Fitness Center', ar: 'نادي رياضي', icon: <Dumbbell size={28} strokeWidth={1.2} /> },
    'parking': { en: 'Private Parking', ar: 'مواقف خاصة', icon: <Car size={28} strokeWidth={1.2} /> },
    'security': { en: '24/7 Security', ar: 'أمن وحراسة', icon: <ShieldCheck size={28} strokeWidth={1.2} /> },
    'sauna': { en: 'Sauna & Steam', ar: 'سونا وبخار', icon: <ThermometerSun size={28} strokeWidth={1.2} /> },
    'turkish_hammam': { en: 'Turkish Hammam', ar: 'حمام تركي', icon: <CheckCircle2 size={28} strokeWidth={1.2} /> },
    'kids_play': { en: 'Kids Play Area', ar: 'منطقة ألعاب أطفال', icon: <Baby size={28} strokeWidth={1.2} /> },
    'garden': { en: 'Landscaped Garden', ar: 'حدائق ومنتزهات', icon: <Trees size={28} strokeWidth={1.2} /> },
    'cinema': { en: 'Outdoor Cinema', ar: 'سينما خارجية', icon: <CheckCircle2 size={28} strokeWidth={1.2} /> },
    'sports_court': { en: 'Sports Courts', ar: 'ملاعب رياضية', icon: <Dumbbell size={28} strokeWidth={1.2} /> },
    'beach': { en: 'Private Beach', ar: 'شاطئ خاص', icon: <Palmtree size={28} strokeWidth={1.2} /> },
    'valet': { en: 'Valet Parking', ar: 'خدمة صف السيارات', icon: <UserCheck size={28} strokeWidth={1.2} /> },
  };

  // 2. معالجة البيانات بأمان شديد (Safe Data Processing)
  let displayList: any[] = [];
  const rawValue = project?.amenities;

  try {
    if (Array.isArray(rawValue)) {
      displayList = rawValue;
    } else if (typeof rawValue === 'string') {
      // إذا كانت مخزنة كنص مفصول بفاصلة
      displayList = rawValue.split(',').map(i => i.trim()).filter(Boolean);
    }
  } catch (e) {
    console.error("Error processing amenities:", e);
    displayList = [];
  }

  // 3. الحل البديل إذا كانت البيانات فارغة (Fallback)
  if (!displayList || displayList.length === 0) {
    displayList = ['pool', 'gym', 'security', 'garden']; // أمثلة افتراضية
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
          {displayList.map((id: string, index: number) => {
            // جلب البيانات من القاموس بناءً على المعرف (ID)
            const item = AMENITY_MAP[id] || { 
              en: id, 
              ar: id, 
              icon: <CheckCircle2 size={28} strokeWidth={1.2} /> 
            };

            return (
              <div 
                key={index}
                className="group bg-[#111] border border-white/5 rounded-[32px] lg:rounded-[40px] p-8 lg:p-12 flex flex-col items-center justify-center transition-all duration-700 hover:border-[#12AD65]/30 hover:-translate-y-2"
              >
                <div className="text-[#12AD65] mb-8 group-hover:scale-110 transition-all duration-700">
                  {item.icon}
                </div>
                <span className="text-white text-[12px] lg:text-[14px] font-bold uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100">
                  {isAr ? item.ar : item.en}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}