import PropertyHeader from "@/app/[lang]/(properties)/components/property-header";
import CityGrid from "@/app/[lang]/(properties)/components/city-grid";
import PropertyGrid from "@/app/[lang]/(properties)/components/property-grid";
import LocalGuides from "@/app/[lang]/(properties)/components/local-guides";
import PropertyFilter from "@/components/shared/property-filter";

// Mock Data - In a real scenario, this would come from a database or /data folder
const turkeyCities = [
  { name: "Istanbul", subTitle: "Cultural Capital", projectCount: 42, image: "/cities/istanbul.jpg" },
  { name: "Antalya", subTitle: "Tourism Hub", projectCount: 18, image: "/cities/antalya.jpg" },
  { name: "Alanya", subTitle: "Coastal Living", projectCount: 12, image: "/cities/alanya.jpg" },
  { name: "Ankara", subTitle: "The Capital", projectCount: 9, image: "/cities/ankara.jpg" },
  { name: "Trabzon", subTitle: "Black Sea Gem", projectCount: 7, image: "/cities/trabzon.jpg" },
];

const turkeyProjects = [
  { id: "tr1", title: "Bosphorus Residences", developer: "Emaar Turkey", location: "Istanbul", price: "$180,000", image: "/prop-1.jpg", deliveryDate: "Delivery 2024" },
  { id: "tr2", title: "Mediterranean Villas", developer: "Antalya Homes", location: "Antalya", price: "$650,000", image: "/prop-2.jpg", deliveryDate: "Delivery 2025" },
  { id: "tr3", title: "Trabzon Green Valley", developer: "Black Sea Invest", location: "Trabzon", price: "$150,000", image: "/prop-3.jpg", deliveryDate: "Ready to Move" },
];

const turkeyGuides = [
  { id: "g1", title: "The Ultimate Guide to Buying Property in Turkey", description: "Everything Iraqi investors need to know about laws and taxes.", image: "/guide-tr-1.jpg" },
  { id: "g2", title: "Turkish Citizenship by Investment Program", description: "Step-by-step guide to obtaining a passport through real estate.", image: "/guide-tr-2.jpg" },
];

export default async function TurkeyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Header: Hidden on mobile, contains Back Button on Desktop */}
      <PropertyHeader 
        lang={lang}
        title={isAr ? "عقارات في تركيا" : "Properties in Turkey"}
        description={isAr 
          ? "استكشف أفضل المشاريع العقارية في اسطنبول، أنطاليا، ألانيا، أنقرة، وطرابزون." 
          : "Explore top real estate projects across Istanbul, Antalya, Alanya, Ankara, and Trabzon."}
      />

      {/* 2. City Cards: Starts page on mobile, grid on desktop */}
      <CityGrid 
        lang={lang} 
        country="turkey" 
        cities={turkeyCities} 
      />

      {/* 3. Filter: Sticky logic can be added here */}
      <div className="lg:mt-8">
        <PropertyFilter type="turkey" lang={lang} />
      </div>

      {/* 4. Projects: 3-column grid for Desktop, Vertical Stack for Mobile */}
      <PropertyGrid 
        lang={lang} 
        projects={turkeyProjects} 
      />

      {/* 5. Guides: Vertical stack for both platforms */}
      <LocalGuides 
        lang={lang} 
        country={isAr ? "تركيا" : "Turkey"} 
        guides={turkeyGuides} 
      />
    </main>
  );
}