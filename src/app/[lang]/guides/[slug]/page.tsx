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
// 1. Dynamic Metadata (تدعم اللغتين)
export async function generateMetadata({ params }: any) {
  const { lang, slug } = await params;
  const supabase = await createClient();
  const { data: guide } = await supabase.from('guides').select('title, title_ar').eq('slug', slug).single();
  
  // تحديد العنوان حسب اللغة
  const isAr = lang === 'ar';
  const displayTitle = isAr ? (guide?.title_ar || guide?.title) : guide?.title;

  return { 
    title: displayTitle ? `Best Dar | ${displayTitle}` : 'Best Dar | Guide' 
  };
}

export default async function GuideDetailsPage({ params }: any) {
  const { lang, slug } = await params; 
  const supabase = await createClient();
  const isAr = lang === 'ar';

  // 1. جلب بيانات الدليل (Guide Data)
  const { data: guide, error: guideError } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single();

  // التحقق من وجود الدليل
  if (guideError || !guide) {
    notFound(); 
  }

  // 2. تفعيل التتبع وجلب البيانات الجانبية بالتوازي
  // قمنا بإضافة trackingResult لنعرف حالة العملية في الـ Terminal
  const [{ data: relatedGuides }, trackingResult] = await Promise.all([
    supabase.from('guides').select('*').neq('slug', slug).limit(3),
    
    // تسجيل الزيارة في جدول page_views
    supabase.from('page_views').insert([{
      content_id: guide.id.toString(), // تحويله لنص لضمان التوافق
      content_type: 'guide',
      page_path: `/${lang}/guides/${slug}`
    }])
  ]);

  // 3. فحص نتيجة التتبع في الـ Terminal (للمراقبة فقط)
  if (trackingResult.error) {
    console.error("❌ GUIDE TRACKING ERROR:", trackingResult.error.message);
  } else {
    console.log("✅ GUIDE VIEW RECORDED:", slug);
  }

  // ------------------------------------------------------------------
  // 🎯 منطق الترجمة الذكي: تجهيز المتغيرات قبل تمريرها للمكونات
  // إذا كانت اللغة عربية ولم يكن هناك نص عربي، سيتم عرض الإنجليزي كخيار بديل
  // ------------------------------------------------------------------
  const displayTitle = isAr ? (guide.title_ar || guide.title) : guide.title;
  const displaySubtitle = isAr ? (guide.subtitle_ar || guide.subtitle) : guide.subtitle;
  const displayIntro = isAr ? (guide.intro_text_ar || guide.intro_text) : guide.intro_text;
  const displayContent = isAr ? (guide.content_ar || guide.content) : guide.content;
  const displaySidebarLinks = isAr ? (guide.sidebar_links_ar || guide.sidebar_links) : guide.sidebar_links;
  
  // لا تنسَ الـ Callout الذي أضفناه اليوم! 
  // يمكنك تمريره لـ GuideContent أو أي مكون تراه مناسباً
  const displayCallout = isAr ? (guide.callout_ar || guide.callout) : guide.callout;

  // 3. ثانياً: الآن فقط يمكننا حساب وقت القراءة (لأن displayContent أصبح موجوداً)
  // ونقوم بتحويله إلى String ليتطابق مع الـ Interface الخاص بك
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