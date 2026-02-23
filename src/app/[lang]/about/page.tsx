import React from 'react';
import { createClient } from '@/utils/supabase/server'; // 🌟 1. استيراد سوبابيس للسيرفر

import AboutHero from './components/about-hero';
import OurStory from './components/our-story';
import OurMission from './components/our-mission';
import WhyUs from './components/why-us';
import ClientCentric from './components/client-centric';
import HowWeWork from './components/how-we-work';
import MeetTheTeam from './components/meet-the-team';
import OurPartners from './components/our-partners';
import AboutCTA from './components/about-cta';
import BackButton from '@/components/shared/back-button';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  // 🌟 2. الاتصال بقاعدة البيانات
  const supabase = await createClient();

  // 🌟 3. جلب كل بيانات صفحة "من نحن" دفعة واحدة باستخدام مفاتيحها
  const { data: aboutContent } = await supabase
    .from('site_content')
    .select('*')
    .in('section_key', ['about_hero', 'about_story', 'client_centric', 'about_team']);

  // 🌟 4. دالة الاستخراج الذكية
  const getSection = (key: string) => {
    const section = aboutContent?.find((s) => s.section_key === key);
    return {
      text: isAr ? (section?.content_ar || section?.content_en) : section?.content_en,
      image: section?.image_url || ''
    };
  };

  // 🌟 5. تجهيز البيانات لكل قسم
  const heroData = getSection('about_hero');
  const storyData = getSection('about_story');
  const centricData = getSection('client_centric');
  const teamData = getSection('about_team');

  return (
    <main className="bg-white min-h-screen">
      {/* Desktop-Only Navigation */}
      <div className="hidden lg:block pt-8 px-12">
        <BackButton lang={lang} />
      </div>

      {/* 🌟 6. تمرير البيانات الديناميكية للأقسام المحددة */}
      
      {/* 1. Hero: Split screen boardroom aesthetic */}
      <AboutHero lang={lang} dynamicData={heroData} />

      {/* 2. Our Story: Grayscale architectural narrative */}
      <OurStory lang={lang} dynamicData={storyData} />

      {/* 3. Our Mission: Minimalist 3-column principles */}
      <OurMission lang={lang} />

      {/* 4. Why Us: Dark "Vault" grid for advantages */}
      <WhyUs lang={lang} />

      {/* 5. Client Centric: Handshake visual and bold promises */}
      <ClientCentric lang={lang} dynamicData={centricData} />

      {/* 6. How We Work: Step-by-step process cards */}
      <HowWeWork lang={lang} />

      {/* 7. Meet The Team: Professional advisor profiles */}
      <MeetTheTeam lang={lang} dynamicData={teamData} />

      {/* 8. Our Partners: Grayscale developer marquee */}
      <OurPartners lang={lang} />

      {/* 9. Final CTA: Consultation & WhatsApp trigger */}
      <AboutCTA lang={lang} />
    </main>
  );
}