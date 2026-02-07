import GuideCard from '@/components/shared/guide-card';

export default function LocalGuides({ country, lang, guides }: { country: string, lang: string, guides: any[] }) {
  const isAr = lang === 'ar';
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 border-t border-gray-100">
      <h2 className="text-3xl lg:text-4xl font-black text-black tracking-tighter mb-12">
        {country} {lang === 'ar' ? "أدلة الشراء في" : "Buying Guides"}
      </h2>
      
      {/* Changed flex-col to grid for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {guides.map((guide: any) => (
          <GuideCard key={guide.id} {...guide} lang={lang} />
        ))}
      </div>
    </section>
  );
}