import CityCard from '@/components/shared/city-card';

export default function CityGrid({ country, lang, cities }: { country: 'turkey' | 'uae', lang: string, cities: any[] }) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-10 relative isolate overflow-hidden">
      
      {/* Container: التمرير يعمل فقط هنا داخلياً */}
      <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-x-visible pb-10 no-scrollbar snap-x snap-mandatory">
        {cities.map((city) => (
          <div 
            key={city.name} 
            /* تعديل الحجم: 
               - [240px] يحافظ على الحجم الصغير والأنيق للبطاقة.
               - snap-start تجعل البداية من طرف الشاشة بشكل مرتب.
            */
            className="min-w-[240px] sm:min-w-[280px] lg:min-w-full relative transition-all duration-300 snap-start"
          >
            <CityCard {...city} lang={lang} country={country} />
          </div>
        ))}
      </div>
    </section>
  );
}