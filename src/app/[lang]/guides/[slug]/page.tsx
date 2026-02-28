import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

// استيراد مكوناتك
import GuideHero from './components/guide-hero';
import GuideIntro from './components/guide-intro';
import GuideContent from './components/guide-content';
import GatedSection from './components/gated-section';
import GuideSidebar from './components/guide-sidebar';
import RelatedCarousel from './components/related-carousel';
import GuideCTA from './components/guide-cta';
import ExpertAction from './components/expert-action';

const calculateReadingTime = (text: string) => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 220);
};

export default async function GuideDetailsPage({ params }: any) {
  const { lang, slug } = await params; 
  const supabase = await createClient();
  const isAr = lang === 'ar';

  // 1. جلب بيانات الدليل الأساسية [cite: 2026-02-28]
  const { data: guide, error: guideError } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single();

  if (guideError || !guide) {
    notFound(); 
  }

  // 2. تنفيذ ثلاث عمليات بالتوازي لسرعة الأداء:
  // - جلب المقالات ذات الصلة
  // - تسجيل الزيارة في جدول التتبع العام (page_views)
  // - زيادة عداد المشاهدات الفعلي في جدول guides [cite: 2026-02-28]
  const [{ data: relatedGuides }, trackingResult, incrementResult] = await Promise.all([
    supabase.from('guides').select('*').neq('slug', slug).limit(3),
    
    supabase.from('page_views').insert([{
      content_id: guide.id.toString(),
      content_type: 'guide',
      page_path: `/${lang}/guides/${slug}`
    }]),

    // زيادة العداد في السيرفر فوراً [cite: 2026-02-28]
    supabase.rpc('increment_views', { guide_slug: slug })
  ]);

  // للمراقبة في الـ Terminal فقط [cite: 2026-02-28]
  if (incrementResult.error) console.error("❌ Increment Error:", incrementResult.error.message);

  // 3. منطق الترجمة الكامل (لضمان عدم حدوث أخطاء في الـ JSX) [cite: 2026-02-28]
  const displayTitle = isAr ? (guide.title_ar || guide.title) : guide.title;
  const displaySubtitle = isAr ? (guide.subtitle_ar || guide.subtitle) : guide.subtitle;
  const displayIntro = isAr ? (guide.intro_text_ar || guide.intro_text) : guide.intro_text;
  const displayContent = isAr ? (guide.content_ar || guide.content) : guide.content;
  const displaySidebarLinks = isAr ? (guide.sidebar_links_ar || guide.sidebar_links) : guide.sidebar_links;
  const displayCallout = isAr ? (guide.callout_ar || guide.callout) : guide.callout;

  // 4. حساب وقت القراءة بناءً على المحتوى المعروض [cite: 2026-02-28]
  const timeInMinutes = calculateReadingTime(displayContent);
  const readingTime = isAr ? `${timeInMinutes} دقائق قراءة` : `${timeInMinutes} min read`;
  
  return (
    // أضفنا خاصية dir لدعم اتجاه النص من اليمين لليسار في حال كانت اللغة عربية
    <main className="relative min-h-screen bg-white" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="pt-0 lg:pt-0">
       <GuideHero 
  lang={lang}
  title={displayTitle}
  subtitle={displaySubtitle}
  image={guide.image_url} 
  category={guide.category}
  guideId={guide.id}
  readingTime={readingTime} // 👈 أضفنا هذا السطر
/>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 py-12 lg:py-24">
          
          <article className="flex-1 max-w-4xl">
            <GuideIntro lang={lang} intro={displayIntro} />
            
            {/* يمكنك تمرير الـ Callout هنا إذا قمت بتحديث مكون GuideContent لاستقباله */}
            <GuideContent lang={lang} content={displayContent} callout={displayCallout} />
            
            {/* <GatedSection lang={lang} data={guide.gated_content} /> */}
          </article>

          <aside className="hidden lg:block w-[320px]">
            <GuideSidebar 
              lang={lang} 
              links={displaySidebarLinks} // 👈 نمرر الروابط الصحيحة للغة
              whatsappNumber={guide.whatsapp_number} 
            />
          </aside>
        </div>

        <div className="border-t border-gray-50 pt-10 pb-32 lg:pb-0">
          <RelatedCarousel lang={lang} guides={relatedGuides || []} />
          <GuideCTA lang={lang} />
        </div>
      </div>

      <ExpertAction lang={lang} />
    </main>
  );
}