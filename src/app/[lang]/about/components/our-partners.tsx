'use client';

import React from 'react';

export default function OurPartners({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const partners = [
    { name: "EMAAR", logo: "/partners/emaar.svg" },
    { name: "DAMAC", logo: "/partners/damac.svg" },
    { name: "SOBHA", logo: "/partners/sobha.svg" },
    { name: "ALDAR", logo: "/partners/aldar.svg" },
    { name: "NAKHEEL", logo: "/partners/nakheel.svg" }
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-t border-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Subtle Section Header */}
        <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-12 lg:mb-16">
          {isAr ? "شركاء التطوير العقاري الموثوقون" : "Our Trusted Development Partners"}
        </p>

        {/* Partners Grid: 2-cols on mobile, 5-cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-12 lg:gap-20 opacity-40">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex justify-center transition-all duration-500 hover:opacity-100 hover:scale-110 grayscale hover:grayscale-0 cursor-default"
            >
              {/* Using text-based placeholder for logos per partners.png visual */}
              <span className="text-xl lg:text-3xl font-serif font-bold text-slate-800 tracking-widest uppercase">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}