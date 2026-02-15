import PropertyHeader from "../(properties)/components/property-header";
import CityGrid from "../(properties)/components/city-grid";
import PropertyFilter from "@/components/shared/property-filter";
import PropertyGrid from "../(properties)/components/property-grid";
import LocalGuides from "../(properties)/components/local-guides";
import { createClient } from '@/utils/supabase/server';

// src/app/[lang]/(properties)/uae/page.tsx

export default async function UaePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ city?: string, propertyType?: string, installments?: string, delivery?: string }> 
}) {
  const { lang } = await params;
  const filters = await searchParams;
  const isAr = lang === 'ar';
  const supabase = await createClient();

  // 1. Fetch UAE Projects
  let query = supabase
  .from('projects')
  .select(`
    *,
    thumbnail_url,
    project_units!inner (
      has_installments
    )
  `)
  .eq('country_code', 'ae');

  if (filters.city) query = query.ilike('location', `%${filters.city}%`);
  if (filters.propertyType) query = query.ilike('property_type', filters.propertyType);
  if (filters.installments === 'true') {
    query = query.eq('project_units.has_installments', true);
  }

  const { data: projects } = await query.order('created_at', { ascending: false });

// 1. جلب بيانات مدن الإمارات من سوبابيس
const { data: uaeCitiesFromDb } = await supabase
  .from('cities')
  .select('name_en, image_url')
  .eq('country', 'UAE');

// دالة جلب الصورة بناءً على الاسم
const getUaeCityImage = (cityName: string) => {
  const city = uaeCitiesFromDb?.find(c => c.name_en.toLowerCase() === cityName.toLowerCase());
  return city?.image_url || `/cities/${cityName.toLowerCase()}.jpg`; 
};

  // 2. Dynamic City Counts
  const getCityCount = (cityName: string) => 
    projects?.filter(p => p.location?.toLowerCase().includes(cityName.toLowerCase())).length || 0;

  // 2. مصفوفة المدن المحدثة بالصور الديناميكية
const dynamicCities = [
  { 
    name: "Dubai", 
    subTitle: isAr ? "عاصمة الاستثمار" : "Investment Hub", 
    projectCount: getCityCount("Dubai"), 
    image: getUaeCityImage("Dubai") 
  },
  { 
    name: "Abu Dhabi", 
    subTitle: isAr ? "العاصمة" : "The Capital", 
    projectCount: getCityCount("Abu Dhabi"), 
    image: getUaeCityImage("Abu Dhabi") 
  },
  { 
    name: "Sharjah", 
    subTitle: isAr ? "الوجهة العائلية" : "Family Destination", 
    projectCount: getCityCount("Sharjah"), 
    image: getUaeCityImage("Sharjah") 
  },
];

  // NOTE: Guides fetch disabled to focus on properties

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
        cities={dynamicCities} 
      />

      <div className="lg:mt-8">
        <PropertyFilter type="uae" lang={lang} />
      </div>

      <PropertyGrid 
        lang={lang} 
        projects={projects || []} 
      />

      {/* LocalGuides section removed to focus on one guide section elsewhere */}
    </main>
  );
}