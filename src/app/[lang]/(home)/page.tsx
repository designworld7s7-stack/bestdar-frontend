import Hero from "./components/hero";
import TurkeySection from "./components/turkey";
import UaeSection from "./components/uae";
import InvestorClub from "./components/investor-club";
import GuidesSection from "./components/guides";
import LeadForm from "./components/lead-form";
import Footer from "./components/footer";
import { createClient } from '@/utils/supabase/server'; 

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  // 1. Initialize Supabase
  const supabase = await createClient();

  // ---------------------------------------------------------
  // 🌟 الجديد: جلب محتوى الأقسام الثابتة من لوحة التحكم
  // ---------------------------------------------------------
  const { data: pageContent } = await supabase
    .from('site_content')
    .select('*')
    .in('section_key', ['home_hero', 'investor_club', 'lead_form_side']); // ضع هنا كل مفاتيح الصفحة

  // دالة مساعدة سحرية لاستخراج النص حسب اللغة والصورة لكل قسم
  const getSection = (key: string) => {
    const section = pageContent?.find((s) => s.section_key === key);
    return {
      text: isAr ? (section?.content_ar || section?.content_en) : section?.content_en,
      image: section?.image_url || ''
    };
  };

  // استخراج البيانات الجاهزة للأقسام
  const heroData = getSection('home_hero');
  const clubData = getSection('investor_club');
  const leadFormData = getSection('lead_form_side');
  // ---------------------------------------------------------

  // 2. Fetch the 4 featured guides
  const { data: featuredGuides } = await supabase
    .from('guides')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(4);

  // Fetch Turkey projects using the correct column name
  const { data: turkeyFeatured } = await supabase
    .from('projects') 
    .select('*')
    .eq('is_featured_home', true) 
    .eq('country_code', 'tr');

  // Fetch UAE projects using the correct column name
  const { data: uaeFeatured } = await supabase
    .from('projects') 
    .select('*')
    .eq('is_featured_home', true) 
    .eq('country_code', 'ae');

  return (
    <main className="bg-white">
      {/* تمرير البيانات الديناميكية للمكونات */}
      <Hero lang={lang} dynamicData={heroData} />
      
      <TurkeySection projects={turkeyFeatured || []} lang={lang} />
      <UaeSection projects={uaeFeatured || []} lang={lang} />
      
      {/* تمرير بيانات نادي المستثمرين */}
      <InvestorClub lang={lang}  />
      
      <GuidesSection lang={lang} guides={featuredGuides || []} />
      
      {/* تمرير صورة نموذج التواصل الجانبية إذا أردت */}
      <LeadForm lang={lang} dynamicData={leadFormData} />
      
      <Footer lang={lang} />
    </main>
  );
}