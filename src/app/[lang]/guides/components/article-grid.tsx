'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/shared/article-card';

// Mock data to test the "Load More" logic
const MOCK_ARTICLES = Array(18).fill(null).map((_, i) => ({
  id: `guide-${i}`,
  title: i % 2 === 0 ? "Investing in UAE Real Estate: The Complete" : "How to Obtain Turkish Citizenship 2026",
  excerpt: "Discover how to secure your wealth, obtain residency, and navigate the foreign markets effectively.",
  image: "/guide-placeholder.jpg",
  category: i % 2 === 0 ? "UAE GUIDE" : "TURKEY GUIDE",
  date: "Feb 06, 2026",
  location: i % 2 === 0 ? "Dubai, UAE" : "Istanbul, TR"
}));

export default function ArticleGrid({ lang }: { lang: string }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const isAr = lang === 'ar';

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // New 6 guides appear
  };

  return (
    <div className="w-full">
      {/* The 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {MOCK_ARTICLES.slice(0, visibleCount).map((article) => (
          <ArticleCard 
            key={article.id}
            {...article}
            lang={lang}
          />
        ))}
      </div>

      {/* Load More Button Section */}
      {visibleCount < MOCK_ARTICLES.length && (
        <div className="mt-16 lg:mt-24 flex justify-center">
          <button 
            onClick={handleLoadMore}
            className="px-12 py-4 rounded-full border border-gray-200 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:border-[#12AD65] hover:text-[#12AD65]"
          >
            {isAr ? "تحميل المزيد" : "Load More Articles"}
          </button>
        </div>
      )}
    </div>
  );
}