import PropertyHeader from "@/app/[lang]/(properties)/components/property-header";
import CityGrid from "@/app/[lang]/(properties)/components/city-grid";
import PropertyGrid from "@/app/[lang]/(properties)/components/property-grid";
import LocalGuides from "@/app/[lang]/(properties)/components/local-guides";
import PropertyFilter from "@/components/shared/property-filter";
import { createClient } from '@/utils/supabase/server'; // Direct fetch for better control

export default async function TurkeyPage({ params, searchParams }: any) {
  const { lang } = await params;
  const filters = await searchParams;
  const supabase = await createClient();
 const isAr = lang === 'ar';
  // 1. FETCH PROJECTS (Existing logic)
  let query = supabase
    .from('projects')
    .select(`*, thumbnail_url, project_units!inner (has_installments)`) // Added thumbnail_url!
    .eq('country_code', 'tr');
  
  // ... apply your filters (city, type, installments) ...
  const { data: turkeyProjects } = await query.order('created_at', { ascending: false });

const { data: citiesFromDb } = await supabase
  .from('cities')
  .select('name_en, image_url')
  .eq('country', 'Turkey');

  // دالة مساعدة للحصول على رابط الصورة من سوبابيس بناءً على اسم المدينة
const getCityImage = (cityName: string) => {
  const city = citiesFromDb?.find(c => c.name_en.toLowerCase() === cityName.toLowerCase());
  return city?.image_url || `/cities/${cityName.toLowerCase()}.jpg`; // صورة احتياطية إذا لم يجد الرابط
};
 
  // We filter projects by location to get real counts
  const getCityCount = (cityName: string) => 
    turkeyProjects?.filter(p => p.location?.toLowerCase().includes(cityName.toLowerCase())).length || 0;

  const dynamicCities = [
  { name: "Istanbul", subTitle: "Cultural Capital", projectCount: getCityCount("Istanbul"), image: getCityImage("Istanbul") },
  { name: "Antalya", subTitle: "Tourism Hub", projectCount: getCityCount("Antalya"), image: getCityImage("Antalya") },
  { name: "Alanya", subTitle: "Coastal Living", projectCount: getCityCount("Alanya"), image: getCityImage("Alanya") },
  { name: "Ankara", subTitle: "The Capital", projectCount: getCityCount("Ankara"), image: getCityImage("Ankara") },
  { name: "Trabzon", subTitle: "Black Sea Gem", projectCount: getCityCount("Trabzon"), image: getCityImage("Trabzon") },
];

  return (
    <main className="bg-white min-h-screen">
      <PropertyHeader 
  lang={lang}
  title={isAr ? "عقارات في تركيا" : "Properties in Turkey"}
  description={isAr 
    ? "استكشف أفضل الفرص العقارية في إسطنبول، أنطاليا، وأنقرة مع خيارات تناسب السكن والاستثمار." 
    : "Explore the finest real estate opportunities across Istanbul, Antalya, and Ankara for living and investment."}
/>

      {/* Pass the dynamicCities instead of the static turkeyCities */}
      <CityGrid 
        lang={lang} 
        country="turkey" 
        cities={dynamicCities} 
      />

      <div className="lg:mt-8">
        <PropertyFilter type="turkey" lang={lang} />
      </div>

      <PropertyGrid 
        lang={lang} 
        projects={turkeyProjects || []} 
      />
      
      {/* ... LocalGuides ... */}
    </main>
  );
}