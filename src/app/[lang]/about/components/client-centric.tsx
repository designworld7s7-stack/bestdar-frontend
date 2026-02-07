'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ClientCentric({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const features = [
    {
      text: isAr ? "توجيه شخصي بناءً على ميزانيتك" : "Personalized guidance based on your budget"
    },
    {
      text: isAr ? "بيئة استشارية خالية من الضغوط" : "Zero-pressure consultation environment"
    },
    {
      text: isAr ? "تواصل واضح وصادق في جميع الأوقات" : "Clear, honest communication at all times"
    }
  ];

  return (
    <section className="bg-[#0A0A0A] py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Featured Image: Vertical first on mobile */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="/about/client-handshake.jpg" 
                alt="Professional consultation" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              {/* Subtle green glow behind image to match dark aesthetic */}
              <div className="absolute -inset-4 bg-[#12AD65]/5 blur-3xl -z-10" />
            </div>
          </div>

          {/* Text Content Area */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-8">
              {isAr ? "نهج يركز على العميل" : "Client-Centric Approach"}
            </h2>

            <p className="text-gray-400 text-sm lg:text-lg font-medium leading-relaxed mb-10 max-w-xl">
              {isAr 
                ? "لكل عميل هدف فريد. نحن نأخذ الوقت الكافي لفهم احتياجاتك، ونقدم توصيات مخصصة للمشاريع، وندعمك في كل مرحلة من رحلتك الاستثمارية. لا ضغط، لا تحيز — تركيزنا على ما هو مناسب لك."
                : "Every client has a unique goal. We take time to understand your needs, offer tailored project recommendations, and support you through every stage of your investment journey. No pressure, no bias — our focus is on what’s right for you."}
            </p>

            {/* Feature List with Brand Green Icons */}
            <div className="space-y-6">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 text-[#12AD65]">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="text-white text-base lg:text-xl font-bold tracking-tight">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}