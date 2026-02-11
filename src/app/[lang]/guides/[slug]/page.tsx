import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import GuideHero from './components/guide-hero';
import GuideIntro from './components/guide-intro';
import GuideContent from './components/guide-content';
import GatedSection from './components/gated-section';
import GuideSidebar from './components/guide-sidebar';
import RelatedCarousel from './components/related-carousel';
import GuideCTA from './components/guide-cta';
import ExpertAction from './components/expert-action';

// 1. Dynamic Metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: guide } = await supabase.from('guides').select('title').eq('slug', slug).single();
  
  return { 
    title: guide ? `Best Dar | ${guide.title}` : 'Best Dar | Guide' 
  };
}

export default async function GuideDetailsPage({ params }: any) {
  const { lang, slug } = await params; // Await params for Next.js 15
  const supabase = await createClient();

  // 2. Fetch the guide data from the "Seed"
  const { data: guide, error: guideError } = await supabase
  .from('guides')
  .select('*')
  .eq('slug', slug)
  .single();

// 2. SAFETY CHECK: If guide is null or error occurs, trigger 404
if (guideError || !guide) {
  notFound(); 
}

// 3. Now it is safe to access guide.country_code
const { data: relatedGuides } = await supabase
  .from('guides')
  .select('*')
  .neq('slug', slug) // Exclude current article
  .limit(3);
  
  // If no guide is found, show 404
  if (!guide) notFound();

  return (
    <main className="relative min-h-screen bg-white">
      <div className="pt-0 lg:pt-0">
        {/* Pass all hero data from the DB */}
      <GuideHero 
  lang={lang} 
  title={guide.title}
  subtitle={guide.subtitle}
  image={guide.image_url} // This matches the Supabase 'image_url' column
  category={guide.category}
/>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 py-12 lg:py-24">
          
          <article className="flex-1 max-w-4xl">
            {/* Distribute specific content chunks to components */}
            <GuideIntro lang={lang} intro={guide.intro_text} />
            <GuideContent lang={lang} content={guide.content} />
            <GatedSection lang={lang} data={guide.gated_content} />
          </article>

          <aside className="hidden lg:block w-[320px]">
            <GuideSidebar lang={lang} links={guide.sidebar_links} />
          </aside>
        </div>

        <div className="border-t border-gray-50 pt-10 pb-32 lg:pb-0">
          {/* Use tags or country_code to find related guides */}
          <RelatedCarousel lang={lang} guides={relatedGuides || []} />
          <GuideCTA lang={lang} />
        </div>
      </div>

      <ExpertAction lang={lang} />
    </main>
  );
}