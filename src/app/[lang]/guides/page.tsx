// src/app/[lang]/guides/page.tsx
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import GuideHeader from './components/guide-header';
import HeroGuide from './components/hero-guide';
import PropertyFilter from '@/components/shared/property-filter';
import GuideGrid from './components/guide-grid';

export const dynamic = 'force-dynamic';

export default async function GuidesPage({ params, searchParams }: any) {
  const { lang } = await params;
  
  // 1. Capture the Filter & Sort values from the URL
  const { country, category, sort } = await searchParams;
  
  const supabase = await createClient();
  const isAr = lang === 'ar';

  // 2. Start the query
  let query = supabase.from('guides').select('*');

  // 3. Apply Country Filter (tr, ae, both, other)
  if (country && country !== 'all') {
    query = query.eq('country_code', country);
  }

  // 4. Apply Category Filter
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  // 5. Apply Sorting (Date or Popularity)
  if (sort === 'popularity') {
    query = query.order('views_count', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: guides } = await query;

  // Use the first guide of the FILTERED results as the Hero
  const featured = guides?.[0];
  
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* 1. HEADER & HERO (Always Top) */}
       <GuideHeader lang={lang} />

        {featured && (
          <div className="mb-12">
            <HeroGuide 
              id={featured.slug}
              title={featured.title}
              description={featured.excerpt}
              image={featured.image_url || "/guides/hero-bg.jpg"}
              date={new Date(featured.created_at).toLocaleDateString()}
              lang={lang}
            />
          </div>
        )}

        {/* 2. FILTER */}
        <PropertyFilter type="all" lang={lang} variant="guide" />

        {/* 3. RESPONSIVE GRID LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mt-16">
  
  {/* MOBILE ORDER 1: Most Read (Desktop: Sidebar Top) */}
  {/* Reduced width to 320px for a slimmer look */}
  <aside className="w-full lg:w-[320px] order-1 lg:order-2 flex flex-col gap-8">
    
    {/* Reduced padding from p-10 to p-8 */}
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
      <MostReadList lang={lang} />
    </div>
    
    {/* Newsletter: Hidden on mobile here, moved to order-3 */}
    <div className="hidden lg:block">
       <NewsletterCard lang={lang} />
    </div>
  </aside>

  {/* MOBILE ORDER 2: The Article Grid */}
  <div className="flex-1 order-2 lg:order-1">
    <GuideGrid initialGuides={guides || []} lang={lang} />
  </div>

  {/* MOBILE ORDER 3: Newsletter (Bottom on mobile) */}
  <div className="lg:hidden order-3 w-full">
    <NewsletterCard lang={lang} />
  </div>
  
</div>
      </div>
    </main>
  );
}

/** * Modular Sidebar Components */

function MostReadList({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="h-1.5 w-1.5 rounded-full bg-[#12AD65]" />
        <h3 className="text-sm font-medium text-black uppercase tracking-tighter">
          {isAr ? "الأكثر قراءة" : "Most Read"}
        </h3>
      </div>
      <div className="flex flex-col gap-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="group cursor-pointer flex gap-6 items-start">
            <span className="text-4xl font-medium text-gray-100 group-hover:text-[#12AD65] transition-colors">0{num}</span>
            <p className="text-sm font-medium text-gray-600 leading-tight group-hover:text-black">
              {isAr ? "دليل الضرائب العقارية في تركيا" : "Understanding Property Taxes in Turkey"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function NewsletterCard({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  return (
    <div className="bg-[#0A0A0A] p-10 rounded-[40px] text-center border border-white/5">
      <h3 className="text-2xl font-medium text-white mb-3">{isAr ? "رؤى أسبوعية" : "Weekly Insights"}</h3>
      <p className="text-gray-500 text-[12px] font-medium uppercase tracking-tighter mb-10">
        {isAr ? "أحدث الاتجاهات في بريدك" : "Latest trends in your inbox"}
      </p>
      <input 
        type="email" 
        placeholder={isAr ? "بريدك الإلكتروني" : "Email address"} 
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-xs mb-4 outline-none focus:border-[#12AD65]"
      />
      <button className="w-full bg-[#12AD65] text-white py-4 rounded-2xl font-medium text-[12px] uppercase tracking-tighter hover:bg-[#0f8f53] transition-all">
        {isAr ? "اشتراك" : "Subscribe Now"}
      </button>
    </div>
  );
}