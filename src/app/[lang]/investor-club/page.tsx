import ClubHeader from "./components/club-header";
import ClubPrinciples from "./components/club-principles";
import StrategySafety from "./components/strategy-safety";
import TierScene from "./components/tier-scene";
import TierMatrix from "./components/tier-matrix";
import JoinPath from "./components/join-path";
import ClubCTA from "./components/club-cta";
import { createClient } from '@/utils/supabase/server'; // 🌟 1. استيراد عميل سوبابيس للسيرفر

export default async function InvestorClubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  // 🌟 2. الاتصال بقاعدة البيانات
  const supabase = await createClient();

  // 🌟 3. جلب كل ما يخص نادي المستثمرين دفعة واحدة
  const { data: clubContent } = await supabase
    .from('site_content')
    .select('*')
    .in('section_key', ['investor_club', 'tier_silver', 'tier_gold', 'tier_platinum']);

  // 🌟 4. دالة استخراج وترجمة البيانات
  const getSection = (key: string) => {
    const section = clubContent?.find((s) => s.section_key === key);
    return {
      text: isAr ? (section?.content_ar || section?.content_en) : section?.content_en,
      image: section?.image_url || ''
    };
  };

  // 🌟 5. تجهيز البيانات لكل مكون
 const principlesData = getSection('investor_club'); 
  
  const silverData = getSection('tier_silver');
  const goldData = getSection('tier_gold');
  const platinumData = getSection('tier_platinum');

  return (
    <main className="min-h-screen">
      {/* 1. Black Section: The Entrance */}
      {/* 🌟 6. تمرير البيانات للغلاف */}
      <ClubHeader lang={lang} />

      {/* 2. White Section: Why Us & Principles */}
     <ClubPrinciples lang={lang} dynamicData={principlesData} />

      {/* 3. Black Section: Security & Approach */}
      <StrategySafety lang={lang} />

      {/* 4. White Section: The 3D Depth Tiers */}
      {/* 🌟 7. تمرير بيانات البطاقات الثلاث إلى قسم الـ Tiers */}
      <TierScene 
        lang={lang} 
        dynamicTiers={{
          silver: silverData,
          gold: goldData,
          platinum: platinumData
        }} 
      />

      {/* 5. Black Section: Comparison Matrix */}
      <TierMatrix lang={lang} />

      {/* 6. White Section: The Joining Journey */}
      <JoinPath lang={lang} />

      {/* 7. Final White Section: The CTA */}
      <ClubCTA isAr={isAr} />
    </main>
  );
}