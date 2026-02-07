import React from 'react';
import GuideHeader from './components/guide-header';
import HeroGuide from './components/hero-guide';
import PropertyFilter from '@/components/shared/property-filter';
import ArticleGrid from './components/article-grid';
import GuideSidebar from './components/guide-sidebar';

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Header Section */}
      <GuideHeader lang={lang} />

      {/* 2. Featured Article */}
      <HeroGuide 
        id="featured-2026"
        title={isAr ? "دليل شراء العقارات في تركيا للعراقيين 2026" : "How Iraqis Can Buy Property in Turkey: The Ultimate 2026 Guide"}
        description={isAr 
          ? "تعرف على المشهد القانوني، والمزايا الضريبية، وكيفية تأمين استثمارك خطوة بخطوة." 
          : "Navigate the legal landscape, uncover tax advantages, and secure your investment with our walkthrough."}
        image="/guides/hero-bg.jpg"
        date="Feb 06, 2026"
        lang={lang}
      />

      {/* 3. Specialized Guide Filter */}
      <PropertyFilter type="all" lang={lang} variant="guide" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        
        {/* MOBILE ONLY: Most Read directly under the filter */}
        <div className="lg:hidden mb-12">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             {/* We manually render the Most Read logic here for precise mobile placement */}
             <MostReadList lang={lang} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* 4. The Article Grid: 3-cols on desktop */}
          <div className="flex-1">
            <ArticleGrid lang={lang} />
          </div>

          {/* 5. The Sidebar Section */}
          <aside className="w-full lg:w-[400px] flex flex-col gap-10">
            {/* Desktop Only: Most Read */}
            <div className="hidden lg:block">
              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <MostReadList lang={lang} />
              </div>
            </div>

            {/* Newsletter: Under grid on mobile, bottom of sidebar on desktop */}
            <NewsletterCard lang={lang} />
          </aside>
          
        </div>
      </div>
    </main>
  );
}

/** * Modular components used for the responsive layout shuffle 
 * to keep the page.tsx clean
 */

function MostReadList({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="h-1.5 w-1.5 rounded-full bg-[#12AD65]" />
        <h3 className="text-sm font-black text-black uppercase tracking-widest">
          {isAr ? "الأكثر قراءة" : "Most Read"}
        </h3>
      </div>
      <div className="flex flex-col gap-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="group cursor-pointer flex gap-6 items-start">
            <span className="text-4xl font-black text-gray-100 group-hover:text-[#12AD65] transition-colors">0{num}</span>
            <p className="text-sm font-black text-gray-600 leading-tight group-hover:text-black">
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
      <h3 className="text-2xl font-black text-white mb-3">{isAr ? "رؤى أسبوعية" : "Weekly Insights"}</h3>
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-10">
        {isAr ? "أحدث الاتجاهات في بريدك" : "Latest trends in your inbox"}
      </p>
      <input 
        type="email" 
        placeholder={isAr ? "بريدك الإلكتروني" : "Email address"} 
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-xs mb-4 outline-none focus:border-[#12AD65]"
      />
      <button className="w-full bg-[#12AD65] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0f8f53] transition-all">
        {isAr ? "اشتراك" : "Subscribe Now"}
      </button>
    </div>
  );
}