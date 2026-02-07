'use client';

import React from 'react';

export default function GuideIntro({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <section className="py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl">
        {/* 1. Section Title */}
        <h2 className="text-3xl lg:text-5xl font-black text-black mb-8 tracking-tighter uppercase">
          {isAr ? "المقدمة" : "Introduction"}
        </h2>

        {/* 2. Primary Intro Text */}
        <div className="space-y-6">
          <p className="text-lg lg:text-2xl text-gray-500 leading-relaxed font-medium">
            {isAr ? (
              "سواء كنت تبحث عن منزل لقضاء العطلات في نخلة جميرا أو وحدة إيجارية ذات عائد مرتفع في وسط مدينة دبي، فإن هذا الدليل سيرشدك عبر أساسيات سوق العقارات في الإمارات العربية المتحدة."
            ) : (
              "Whether you are seeking a holiday home in Palm Jumeirah or a high-yield rental unit in Downtown Dubai, this guide will walk you through the essentials of the UAE property market."
            )}
          </p>

          {/* 3. Sub-text for depth */}
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            {isAr ? (
              "لقد صممنا هذا الدليل خصيصاً للمستثمرين العراقيين الذين يتطلعون إلى تنويع محافظهم الاستثمارية في واحدة من أكثر أسواق العقارات ديناميكية في العالم."
            ) : (
              "We have designed this guide specifically for Iraqi investors looking to diversify their portfolios in one of the world's most dynamic real estate markets."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}