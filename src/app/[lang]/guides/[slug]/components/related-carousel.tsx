'use client';

import React from 'react';
import ArticleCard from '@/components/shared/article-card';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedCarouselProps {
  lang: string;
  guides: any[]; // The data is now passed in as a prop
}

export default function RelatedCarousel({ lang, guides }: RelatedCarouselProps) {
  const isAr = lang === 'ar';

  // If the server found no related guides, hide the section
  if (!guides || guides.length === 0) return null;

  return (
    <section className="py-20 lg:py-32">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl lg:text-4xl font-medium text-black tracking-[0.1em] uppercase">
          {isAr ? "أدلة ذات صلة" : "Related Guides"}
        </h2>
        <Link 
          href={`/${lang}/guides`} 
          className="hidden lg:flex items-center gap-2 text-[#12AD65] font-medium text-[11px] uppercase tracking-[0.1em] hover:gap-4 transition-all"
        >
          {isAr ? "عرض الكل" : "View All"}
          <MoveRight size={16} />
        </Link>
      </div>

      <div className="relative">
        <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pb-10 lg:pb-0 no-scrollbar snap-x snap-mandatory">
          {guides.map((article) => (
            <div key={article.id} className="min-w-[85vw] lg:min-w-0 snap-center">
              <ArticleCard 
                id={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image_url || "/images/guides/placeholder.jpg"}
                category={article.category}
                date={new Date(article.created_at).toLocaleDateString()}
                location={article.country_code === 'tr' ? 'Turkey' : 'UAE'}
                lang={lang} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}