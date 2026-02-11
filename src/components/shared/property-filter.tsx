'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Home, Calendar, CreditCard, ChevronDown, X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface FilterProps {
  type?: string; // Optional for the "All Properties" view
  lang: string;
  isRtl?: boolean; // Added to satisfy the TypeScript check in page.tsx
  variant?: 'property' | 'guide';
}

export default function PropertyFilter({ type = 'all', lang, isRtl, variant = 'property' }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [installmentsOnly, setInstallmentsOnly] = useState(false);
  const isAr = lang === 'ar' || isRtl === true; // Supports both prop styles
  
  const [selections, setSelections] = useState<Record<string, string>>({
    city: "", propertyType: "", delivery: "", category: "", country: "", sort: "Date"
  });

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

const options: Record<string, string[]> = variant === 'guide' ? {
    // These must match your Supabase 'category' column
    category: ["Market Trends", "Legal Guide", "Lifestyle", "Investment Strategy", "Citizenship", "Buying Tips"],
    // These match your 'country_code' logic
    country: ["Turkey", "UAE", "Both", "Other"],
    // These match the order logic in page.tsx
    sort: ["Date", "Popularity"]
} : {
    country: ["Turkey", "UAE", "Others"],
    // STRICT CITY ISOLATION LOGIC [cite: 2026-02-04]
    city: (selections.country === 'Turkey' || (type === 'turkey' && !selections.country))
        ? ["Istanbul", "Antalya", "Alanya", "Ankara", "Trabzon"] 
        : (selections.country === 'UAE' || (type === 'uae' && !selections.country))
        ? ["Abu Dhabi", "Dubai", "Sharjah"] 
        : ["Istanbul", "Antalya", "Alanya", "Ankara", "Trabzon", "Abu Dhabi", "Dubai", "Sharjah"], // Full 8-city list [cite: 2026-02-04]
    
    propertyType: ["Villa", "Apartment", "Townhouse", "Duplex", "Commercial"],
    delivery: ["Ready", "Under Construction", "Plan"],
    // Added Sort options as you requested earlier [cite: 2026-02-04]
    sort: ["Newest", "Lower to Higher", "Higher to Lower"]
};

  // 1. REPLACE your handleSelect with this
const handleSelect = (key: string, value: string) => {
  setSelections(prev => ({ ...prev, [key]: value }));
  setActiveDropdown(null);

  // Update the URL so Supabase knows to filter
  const params = new URLSearchParams(searchParams.toString());
 if (value && value !== "All") {
  
    // Map UI names to Supabase codes (e.g., Turkey -> tr)
    // Translation Layer: Converts UI labels to Supabase-friendly codes
    let urlValue = value.toLowerCase().replace(/\s+/g, '_'); // e.g., "Legal Guide" -> "legal_guide"
    if (value === "Turkey") urlValue = "tr";
    if (value === "UAE") urlValue = "ae";
    if (value === "Both") urlValue = "both";
    if (value === "Other") urlValue = "other";
   params.set(key, urlValue);
  } else {
    params.delete(key);
  }

  router.push(`${pathname}?${params.toString()}`, { scroll: false });
};
  const resetFilters = () => {
  setSelections({ city: "", propertyType: "", delivery: "", category: "", country: "", sort: "Date" });
  router.push(pathname, { scroll: false }); 
};

  return (
    <div ref={filterRef} className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 mb-12 relative z-[90]">
      
      {/* MOBILE TRIGGER */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border-none mb-2"
      >
        <div className="flex items-center gap-3 font-medium text-[12px] uppercase tracking-tighter text-black">
          <SlidersHorizontal size={18} className="text-[#12AD65]" />
          {isAr ? (variant === 'guide' ? "تصفية المقالات" : "تصفية متقدمة") : (variant === 'guide' ? "Filter Articles" : "Advanced Filter")}
        </div>
        <ChevronDown size={18} className={clsx("transition-transform duration-300", isExpanded && "rotate-180")} />
      </button>

      {/* MOBILE CONTENT */}
<div className={clsx(
  "lg:hidden flex flex-col gap-3 transition-all duration-500 overflow-hidden",
  isExpanded ? "max-h-[1400px] opacity-100 mt-4" : "max-h-0 opacity-0"
)}>
  {variant === 'guide' ? (
    <>
      <MobileDropdown label="Category" options={options.category} value={selections.category} onSelect={(v: string) => handleSelect('category', v)} isAr={isAr} />
      <MobileDropdown label="Country" options={options.country} value={selections.country} onSelect={(v: string) => handleSelect('country', v)} isAr={isAr} />
      <MobileDropdown label="Sort By" options={options.sort} value={selections.sort} onSelect={(v: string) => handleSelect('sort', v)} isAr={isAr} />
    </>
  ) : (
    <>
      {/* 1. Dynamic Country Dropdown for Mobile [cite: 2026-02-04] */}
      {type === 'all' && (
        <MobileDropdown 
          label={isAr ? "الدولة" : "Country"} 
          options={options.country} 
          value={selections.country} 
          onSelect={(v: string) => handleSelect('country', v)} 
          isAr={isAr} 
        />
      )}

      {/* 2. Dynamic City List (Now matches the 8-city logic) [cite: 2026-02-04] */}
      <MobileDropdown 
        label={isAr ? "المدينة" : "Cities"} 
        options={options.city} 
        value={selections.city} 
        onSelect={(v: string) => handleSelect('city', v)} 
        isAr={isAr} 
      />

      <MobileDropdown label={isAr ? "نوع العقار" : "Property Type"} options={options.propertyType} value={selections.propertyType} onSelect={(v: string) => handleSelect('propertyType', v)} isAr={isAr} />
      <MobileDropdown label={isAr ? "تاريخ التسليم" : "Delivery Date"} options={options.delivery} value={selections.delivery} onSelect={(v: string) => handleSelect('delivery', v)} isAr={isAr} />
      
      {/* 3. Sort By for Mobile [cite: 2026-02-04] */}
      <MobileDropdown 
        label={isAr ? "ترتيب حسب" : "Sort By"} 
        options={options.sort} 
        value={selections.sort} 
        onSelect={(v: string) => handleSelect('sort', v)} 
        isAr={isAr} 
      />

      <button 
  onClick={() => {
    const nextVal = !installmentsOnly;
    setInstallmentsOnly(nextVal);
    // This tells the URL to add/remove the filter
    handleSelect('installments', nextVal ? 'true' : 'all');
  }} 
  className={clsx(
    "py-5 rounded-xl font-medium text-[12px] uppercase", 
    installmentsOnly ? "btn-brand shadow-lg" : "bg-[#F8F9FA] text-gray-500"
  )}
>
  {isAr ? "أقساط فقط" : "Installments Only"}
</button>
    </>
  )}
  <button onClick={resetFilters} className="flex items-center justify-center gap-2 py-4 text-[#4B5563] text-[12px] font-medium uppercase">
    <RotateCcw size={14} /> {isAr ? "إعادة ضبط" : "Reset"}
  </button>
</div>

      {/* DESKTOP FILTER BAR */}
      {variant === 'guide' ? (
    <div className="hidden lg:flex items-center justify-between bg-white p-6 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-none">
        <div className="flex items-center gap-6">
            <InlineDropdown label="Category" value={selections.category} options={options.category} onSelect={(v: string) => handleSelect('category', v)} isOpen={activeDropdown === 'category'} toggle={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')} />
            <InlineDropdown label="Country" value={selections.country} options={options.country} onSelect={(v: string) => handleSelect('country', v)} isOpen={activeDropdown === 'country'} toggle={() => setActiveDropdown(activeDropdown === 'country' ? null : 'country')} />
            <button onClick={resetFilters} className="flex items-center gap-2 text-[#6B7280] hover:text-red-500 text-[11px] font-medium uppercase tracking-tighter ml-4 transition-all">
                <X size={14} /> {isAr ? "إعادة ضبط" : "Reset"}
            </button>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-[#4B5563] text-[11px] font-medium uppercase tracking-tighter">Sort by:</span>
            <InlineDropdown label="" value={selections.sort} options={options.sort} onSelect={(v: string) => handleSelect('sort', v)} isOpen={activeDropdown === 'sort'} toggle={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} isSort />
        </div>
    </div>
) : (
        <div className="hidden lg:flex items-center gap-4 bg-white p-3 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-none">
        {/* 1. Country: Only show if type is 'all' [cite: 2026-02-04] */}
        {type === 'all' && (
            <FilterDropdown 
                label={isAr ? "الدولة" : "Country"} 
                icon={MapPin} 
                value={selections.country} 
                options={options.country} 
                isOpen={activeDropdown === 'country'} 
                toggle={() => setActiveDropdown(activeDropdown === 'country' ? null : 'country')} 
                onSelect={(v: string) => handleSelect('country', v)} 
                isAr={isAr} 
            />
        )}
  {/* 2. City, Property Type, and Delivery [cite: 2026-02-04] */}
        <FilterDropdown label={isAr ? "المدينة" : "Cities"} icon={MapPin} value={selections.city} options={options.city} isOpen={activeDropdown === 'city'} toggle={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')} onSelect={(v: string) => handleSelect('city', v)} isAr={isAr} />
        <FilterDropdown label={isAr ? "نوع العقار" : "Property Type"} icon={Home} value={selections.propertyType} options={options.propertyType} isOpen={activeDropdown === 'propertyType'} toggle={() => setActiveDropdown(activeDropdown === 'propertyType' ? null : 'propertyType')} onSelect={(v: string) => handleSelect('propertyType', v)} isAr={isAr} />
        <FilterDropdown label={isAr ? "التسليم" : "Delivery"} icon={Calendar} value={selections.delivery} options={options.delivery} isOpen={activeDropdown === 'delivery'} toggle={() => setActiveDropdown(activeDropdown === 'delivery' ? null : 'delivery')} onSelect={(v: string) => handleSelect('delivery', v)} isAr={isAr} />

  {/* 3. Action Buttons [cite: 2026-02-04] */}
       <button 
  onClick={() => {
    const nextVal = !installmentsOnly;
    setInstallmentsOnly(nextVal);
    // This is the bridge to the URL
    handleSelect('installments', nextVal ? 'true' : 'all');
  }} 
  className={clsx(
    "px-8 py-4 rounded-xl font-medium text-[12px] uppercase tracking-tighter transition-all", 
    installmentsOnly ? "btn-brand shadow-lg shadow-[#12AD65]/20" : "bg-[#F8F9FA] text-gray-500 hover:bg-[#F1F3F5]"
  )}
>
  {isAr ? "تقسيط" : "Installment"}
</button>
        
        <button onClick={resetFilters} className="p-4 text-[#6B7280] hover:text-red-500 transition-colors">
            <RotateCcw size={20} />
        </button>
        
    </div>
    
)}

 
    </div>
  );
}

// SUPPORT COMPONENTS

function InlineDropdown({ label, value, options, onSelect, isOpen, toggle, isSort = false }: any) {
  return (
    <div className="relative">
      <div onClick={toggle} className={clsx("flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer transition-all", isSort ? "bg-[#F8F9FA]" : "bg-[#F8F9FA] hover:bg-gray-50")}>
        {label && <span className="text-[11px] font-medium text-[#4B5563] uppercase tracking-tighter">{label}:</span>}
        <span className="text-[11px] font-medium text-black uppercase tracking-tighter">{value || "All"}</span>
        <ChevronDown size={14} className={clsx("text-[#6B7280] transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute top-[120%] left-0 w-full min-w-[200px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 z-[100]">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => onSelect(opt)} className="px-6 py-3 text-[12px] font-medium uppercase tracking-tighter text-gray-500 hover:bg-[#F8F9FA] hover:text-[#12AD65] cursor-pointer transition-colors">{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ label, options, value, onSelect, isAr }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <div onClick={() => setIsOpen(!isOpen)} className={clsx("flex items-center justify-between w-full bg-[#F8F9FA] p-5 rounded-xl transition-all", isOpen && "bg-white shadow-inner")}>
        <div className="flex flex-col items-start"><span className="text-[9px] font-medium uppercase text-[#4B5563] mb-1">{label}</span><span className={clsx("text-xs font-medium", value ? "text-black" : "text-[#6B7280]")}>{value || (isAr ? "اختر..." : "Select...")}</span></div>
        <ChevronDown size={16} className={clsx("text-[#6B7280] transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="mt-2 bg-white rounded-xl shadow-inner overflow-hidden">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => { onSelect(opt); setIsOpen(false); }} className="px-5 py-4 text-xs font-medium text-gray-600 border-b border-gray-50 last:border-none">{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ label, icon: Icon, value, options, isOpen, toggle, onSelect, isAr }: any) {
  return (
    <div className="relative flex-1">
      <div onClick={toggle} className={clsx("relative flex items-center justify-between bg-[#F8F9FA] rounded-xl py-4 px-6 cursor-pointer transition-all", isOpen ? "bg-white shadow-inner" : "hover:bg-gray-50", value && "bg-white")}>
        <div className="flex items-center gap-3">
          <Icon size={18} className={clsx(isOpen || value ? "text-[#12AD65]" : "text-[#4B5563]")} />
          <span className={clsx("text-[11px] font-medium uppercase tracking-tighter", value ? "text-black" : "text-[#4B5563]")}>{value || label}</span>
        </div>
        <ChevronDown size={14} className={clsx("text-[#6B7280] transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute top-[115%] left-0 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 z-[100]">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => onSelect(opt)} className="px-6 py-3 text-[11px] font-medium uppercase text-gray-500 hover:text-[#12AD65] cursor-pointer transition-colors">{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}