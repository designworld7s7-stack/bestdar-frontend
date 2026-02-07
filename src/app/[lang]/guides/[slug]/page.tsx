import React from 'react';
import GuideHero from './components/guide-hero';
import GuideIntro from './components/guide-intro';
import GuideContent from './components/guide-content';
import GatedSection from './components/gated-section';
import GuideSidebar from './components/guide-sidebar';
import RelatedCarousel from './components/related-carousel';
import GuideCTA from './components/guide-cta';
import ExpertAction from './components/expert-action';

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  return { title: `Best Dar | ${slug.replace(/-/g, ' ')}` };
}

export default async function GuideDetailsPage({ params }: any) {
  const { lang } = await params;

  return (
    <main className="relative min-h-screen bg-white">
      {/* 1. HERO: Now with pt-20 to prevent navbar overlap on mobile */}
      <div className="pt-0 lg:pt-0">
        <GuideHero lang={lang} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 py-12 lg:py-24">
          
          <article className="flex-1 max-w-4xl">
            {/* The Intro section now starts clearly below the Hero */}
            <GuideIntro lang={lang} />
            <GuideContent lang={lang} />
            <GatedSection lang={lang} />
          </article>

          <aside className="hidden lg:block w-[320px]">
            <GuideSidebar lang={lang} />
          </aside>
        </div>

        <div className="border-t border-gray-50 pt-10 pb-32 lg:pb-0">
          <RelatedCarousel lang={lang} />
          <GuideCTA lang={lang} />
        </div>
      </div>

      <ExpertAction lang={lang} />
    </main>
  );
}