import PropertyHeader from "@/app/[lang]/(properties)/components/property-header";
import CityGrid from "@/app/[lang]/(properties)/components/city-grid";
import PropertyGrid from "@/app/[lang]/(properties)/components/property-grid";
import LocalGuides from "@/app/[lang]/(properties)/components/local-guides";
import PropertyFilter from "@/components/shared/property-filter";
import { createClient } from '@/utils/supabase/server'; // Direct fetch for better control

// Keep mock cities for UI layout until you decide to move them to Supabase
const turkeyCities = [
  { name: "Istanbul", subTitle: "Cultural Capital", projectCount: 42, image: "/cities/istanbul.jpg" },
  { name: "Antalya", subTitle: "Tourism Hub", projectCount: 18, image: "/cities/antalya.jpg" },
  { name: "Alanya", subTitle: "Coastal Living", projectCount: 12, image: "/cities/alanya.jpg" },
  { name: "Ankara", subTitle: "The Capital", projectCount: 9, image: "/cities/ankara.jpg" },
  { name: "Trabzon", subTitle: "Black Sea Gem", projectCount: 7, image: "/cities/trabzon.jpg" },
];

export default async function TurkeyPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ city?: string, propertyType?: string, installments?: string, delivery?: string }> 
}) {
  const { lang } = await params;
  const filters = await searchParams; // Await searchParams for Next.js 15
  const isAr = lang === 'ar';
  const supabase = await createClient();

  // 1. Build Query for Turkey
 let query = supabase
  .from('projects')
  .select(`
    *,
    project_units!inner (
      has_installments
    )
  `)
  .eq('country_code', 'tr'); // Hard-coded for this page

// Apply the sub-filters
if (filters.city) query = query.ilike('location', `%${filters.city}%`);
if (filters.propertyType) query = query.ilike('property_type', filters.propertyType);

// The crucial fix for the button
if (filters.installments === 'true') {
  query = query.eq('project_units.has_installments', true);
}

  const { data: turkeyProjects } = await query.order('created_at', { ascending: false });

  return (
    <main className="bg-white min-h-screen">
      <PropertyHeader 
        lang={lang}
        title={isAr ? "عقارات في تركيا" : "Properties in Turkey"}
        description={isAr 
          ? "استكشف أفضل المشاريع العقارية في اسطنبول، أنطاليا، ألانيا، أنقرة، وطرابزون." 
          : "Explore top real estate projects across Istanbul, Antalya, Alanya, Ankara, and Trabzon."}
      />

      <CityGrid 
        lang={lang} 
        country="turkey" 
        cities={turkeyCities} 
      />

      <div className="lg:mt-8">
        <PropertyFilter type="turkey" lang={lang} />
      </div>

      <PropertyGrid 
        lang={lang} 
        projects={turkeyProjects || []} 
      />

      <LocalGuides 
        lang={lang} 
        country={isAr ? "تركيا" : "Turkey"} 
        // We will make this dynamic in the next step!
        guides={[]} 
      />
    </main>
  );
}