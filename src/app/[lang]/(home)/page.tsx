import Hero from "./components/hero";
import TurkeySection from "./components/turkey";
import UaeSection from "./components/uae";
import InvestorClub from "./components/investor-club";
import GuidesSection from "./components/guides";
import LeadForm from "./components/lead-form";
import Footer from "./components/footer";
import { createClient } from '@/utils/supabase/server'; //

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // 1. Initialize Supabase
  const supabase = await createClient();

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
  .eq('is_featured_home', true) // <--- Updated column name
  .eq('country_code', 'tr');

// Fetch UAE projects using the correct column name
const { data: uaeFeatured } = await supabase
  .from('projects') 
  .select('*')
  .eq('is_featured_home', true) // <--- Updated column name
  .eq('country_code', 'ae');



  return (
    <main className="bg-white">
      <Hero lang={lang} />
      <TurkeySection projects={turkeyFeatured || []} lang={lang} />
      <UaeSection projects={uaeFeatured || []} lang={lang} />
      <InvestorClub lang={lang} />
      
      {/* 3. Pass the fetched guides here */}
      <GuidesSection lang={lang} guides={featuredGuides || []} />
      
      <LeadForm lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}