import PropertyHeader from "../(properties)/components/property-header";
import CityGrid from "../(properties)/components/city-grid";
import PropertyFilter from "@/components/shared/property-filter";
import PropertyGrid from "../(properties)/components/property-grid";
import LocalGuides from "../(properties)/components/local-guides";
import { createClient } from '@/utils/supabase/server';

const uaeCities = [
  { name: "Dubai", subTitle: "The City of Gold", projectCount: 85, image: "/cities/dubai.jpg" },
  { name: "Abu Dhabi", subTitle: "Capital Luxury", projectCount: 34, image: "/cities/abudhabi.jpg" },
  { name: "Sharjah", subTitle: "Cultural Heritage", projectCount: 12, image: "/cities/sharjah.jpg" },
];

export default async function UaePage({ 
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

  // 1. Build Query restricted to UAE ('ae')
  let query = supabase
  .from('projects')
  .select(`
    *,
    project_units!inner (
      has_installments
    )
  `)
  .eq('country_code', 'ae');

if (filters.city) query = query.ilike('location', `%${filters.city}%`);
if (filters.propertyType) query = query.ilike('property_type', filters.propertyType);

// This links the button click to the units table
if (filters.installments === 'true') {
  query = query.eq('project_units.has_installments', true);
}

  const { data: projects } = await query.order('created_at', { ascending: false });

  // 3. Fetch Guides for UAE dynamically
  const { data: dynamicGuides } = await supabase
    .from('guides')
    .select('*')
    .eq('country_code', 'ae')
    .limit(3);

  return (
    <main className="bg-white min-h-screen">
      <PropertyHeader 
        lang={lang}
        title={isAr ? "عقارات في الإمارات" : "Properties in UAE"}
        description={isAr 
          ? "اكتشف أفضل الفرص الاستثمارية في دبي، أبو ظبي، والشارقة." 
          : "Discover the best investment opportunities across Dubai, Abu Dhabi, and Sharjah."}
      />

      <CityGrid 
        lang={lang} 
        country="uae" 
        cities={uaeCities} 
      />

      <div className="lg:mt-8">
        <PropertyFilter type="uae" lang={lang} />
      </div>

      <PropertyGrid 
        lang={lang} 
        projects={projects || []} 
      />

      <LocalGuides 
        lang={lang} 
        country={isAr ? "الإمارات" : "UAE"} 
        // Use dynamic guides from Supabase
        guides={dynamicGuides || []} 
      />
    </main>
  );
}