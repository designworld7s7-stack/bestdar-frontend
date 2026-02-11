import CityCard from '@/components/shared/city-card';

export default function CityGrid({ country, lang, cities }: { country: 'turkey' | 'uae', lang: string, cities: any[] }) {
  return (
   <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 relative isolate">
  <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-visible pb-10 no-scrollbar">
    {cities.map((city) => (
      <div 
        key={city.name} 
        className="min-w-[200px] lg:min-w-full relative transition-all duration-300 hover:z-[999]"
      >
        <CityCard {...city} lang={lang} country={country} />
      </div>
    ))}
  </div>
</section>
  );
}