'use client';

import React from 'react';

export default function OurStory({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="bg-[#F8F9FA] py-24 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Text Content Area */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl lg:text-6xl font-black text-black tracking-tighter">
                  {isAr ? "قصتنا" : "Our Story"}
                </h2>
                {/* Brand Green Accent Bar */}
                <div className="h-1 w-16 bg-[#12AD65] rounded-full" />
              </div>

              <div className="space-y-6">
                <p className="text-gray-500 text-sm lg:text-lg font-medium leading-relaxed">
                  {isAr 
                    ? "تأسست بيست دار برؤية واضحة لسد الفجوة بين المستثمرين العراقيين والأسواق العقارية الدولية، حيث بدأنا رحلتنا للقضاء على حالة عدم اليقين المرتبطة غالباً بالاستثمارات العابرة للحدود."
                    : "Founded with a clear vision to bridge the gap between Iraqi investors and international real estate markets, we started our journey to eliminate the uncertainty often associated with cross-border investments."}
                </p>

                <p className="text-gray-500 text-sm lg:text-lg font-medium leading-relaxed">
                  {isAr 
                    ? "لقد أدركنا أن العديد من المشترين واجهوا معلومات مضللة ونقصاً في الشفافية. أصبحت مهمتنا بسيطة: توفير مسار آمن ومعتمد ومهني للمستثمرين لبناء الثروة في تركيا والإمارات."
                    : "We recognized that many buyers faced misinformation and lack of transparency. Our mission became simple: to provide a safe, verified, and professional pathway for investors to build wealth in Turkey and the UAE."}
                </p>
              </div>

              {/* Featured Quote */}
              <div className="pl-6 border-l-4 border-[#12AD65] italic py-2">
                <p className="text-black text-base lg:text-xl font-bold leading-relaxed">
                  {isAr 
                    ? "\"نحن لا نبيع العقارات فحسب؛ بل نبني جسوراً من الثقة والازدهار لعملائنا.\""
                    : "\"We don't just sell properties; we build bridges of trust and prosperity for our clients.\""}
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Visual */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
              <img 
                src="/about/skyscraper-view.jpg" 
                alt="Modern Tower View" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}