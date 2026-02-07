'use client';

import React from 'react';
import { MapPin, Navigation, Car, Train, Utensils, School } from 'lucide-react';

export default function ProjectNeighborhood({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const distances = [
    { icon: <Car size={16} />, label: isAr ? "مطار دبي الدولي" : "DXB Airport", time: "15 min" },
    { icon: <Train size={16} />, label: isAr ? "محطة المترو" : "Metro Station", time: "5 min" },
    { icon: <Utensils size={16} />, label: isAr ? "وسط المدينة" : "Downtown", time: "10 min" },
    { icon: <School size={16} />, label: isAr ? "المدرسة الدولية" : "Int. School", time: "8 min" },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        <div className="flex-1 space-y-8 order-1">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <MapPin size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                {isAr ? "الموقع والجوار" : "Location & Neighborhood"}
              </span>
            </div>
            <h3 className="text-3xl lg:text-5xl font-black text-black tracking-tighter uppercase">
              {isAr ? "اكتشف المنطقة" : "Explore the Area"}
            </h3>
            <p className="text-gray-500 text-sm lg:text-lg font-medium leading-relaxed max-w-xl">
              {isAr 
                ? "يقع المشروع في منطقة استراتيجية تجمع بين هدوء الطبيعة وحيوية المدينة."
                : "The project is located in a strategic area that combines tranquility with vitality."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {distances.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-100/50">
                <div className="text-[#12AD65]">{item.icon}</div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-black text-black">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 order-2 lg:order-3">
            <button className="w-full lg:w-auto bg-black text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#12AD65] transition-all shadow-xl shadow-black/10">
              {isAr ? "جدولة استشارة الموقع" : "Schedule Site Consultation"}
            </button>
          </div>
        </div>

        {/* Forced Visibility for Mobile Map */}
        <div className="flex-1 min-h-[400px] lg:h-[600px] w-full bg-gray-100 rounded-[32px] lg:rounded-[40px] overflow-hidden relative shadow-inner order-3 lg:order-2">
          <div className="absolute inset-0 bg-[#f0f0f0] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-gray-400">
                <Navigation size={40} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">Interactive Map Loading...</span>
              </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#12AD65]/20 animate-ping rounded-full" />
              <div className="relative bg-white p-3 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#12AD65] rounded-lg flex items-center justify-center text-white shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="text-[10px] font-black uppercase pr-2 whitespace-nowrap">Project Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}