import PropertyHeader from "../(properties)/components/property-header";
import CityGrid from "../(properties)/components/city-grid";
import PropertyFilter from "@/components/shared/property-filter";
import PropertyGrid from "../(properties)/components/property-grid";
import LocalGuides from "../(properties)/components/local-guides";

// Specific UAE Data
const uaeCities = [
  { name: "Dubai", subTitle: "The City of Gold", projectCount: 85, image: "/cities/dubai.jpg" },
  { name: "Abu Dhabi", subTitle: "Capital Luxury", projectCount: 34, image: "/cities/abudhabi.jpg" },
  { name: "Sharjah", subTitle: "Cultural Heritage", projectCount: 12, image: "/cities/sharjah.jpg" },
];

const uaeProjects = [
  { id: "uae1", title: "Palm Jumeirah Signature", developer: "Nakheel", location: "Dubai", price: "$1,200,000", image: "/prop-uae-1.jpg", deliveryDate: "Delivery 2026" },
  { id: "uae2", title: "Yas Island Waterfront", developer: "Aldar", location: "Abu Dhabi", price: "$850,000", image: "/prop-uae-2.jpg", deliveryDate: "Ready to Move" },
];

const uaeGuides = [
  { id: "ug1", title: "UAE Golden Visa Guide for Iraqis", description: "How to secure long-term residency through property investment.", image: "/guide-uae-1.jpg" },
  { id: "ug2", title: "Buying Off-Plan in Dubai", description: "Everything you need to know about escrow accounts and payment plans.", image: "/guide-uae-2.jpg" },
];

export default async function UaePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Header: Hidden on mobile, contains Back Button on Desktop */}
      <PropertyHeader 
        lang={lang}
        title={isAr ? "عقارات في الإمارات" : "Properties in UAE"}
        description={isAr 
          ? "اكتشف أفضل الفرص الاستثمارية في دبي، أبو ظبي، والشارقة." 
          : "Discover the best investment opportunities across Dubai, Abu Dhabi, and Sharjah."}
      />

      {/* 2. City Cards */}
      <CityGrid 
        lang={lang} 
        country="uae" 
        cities={uaeCities} 
      />

      {/* 3. Filter: Using the UAE type logic we built */}
      <div className="lg:mt-8">
        <PropertyFilter type="uae" lang={lang} />
      </div>

      {/* 4. Projects Grid */}
      <PropertyGrid 
        lang={lang} 
        projects={uaeProjects} 
      />

      {/* 5. UAE Specific Guides */}
      <LocalGuides 
        lang={lang} 
        country={isAr ? "الإمارات" : "UAE"} 
        guides={uaeGuides} 
      />
    </main>
  );
}