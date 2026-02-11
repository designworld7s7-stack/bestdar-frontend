'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/shared/article-card';

export default function GuideGrid({ initialGuides, lang }: { initialGuides: any[], lang: string }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const isAr = lang === 'ar';

  // We only show the slice here; the actual filtering happens via the PropertyFilter 
  // or we can sync them. For now, let's fix the layout.
  const visibleGuides = initialGuides.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 3-Column Grid for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {visibleGuides.map((guide) => (
          <ArticleCard 
            key={guide.id}
            id={guide.slug}
            title={guide.title}
            excerpt={guide.excerpt}
            image={guide.image_url || "/images/guides/placeholder.jpg"} 
            category={guide.category}
            lang={lang}
            date={new Date(guide.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
            location={guide.country_code === 'tr' ? (isAr ? 'تركيا' : 'Turkey') : (isAr ? 'الإمارات' : 'UAE')}
          />
        ))}
      </div>

      {/* Clean, Centered Load More */}
      {visibleCount < initialGuides.length && (
        <button 
          onClick={() => setVisibleCount(prev => prev + 6)}
          className="mt-20 px-10 py-3 border border-gray-200 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
        >
          {isAr ? "تحميل المزيد" : "Load More Articles"}
        </button>
      )}
    </div>
  );
}