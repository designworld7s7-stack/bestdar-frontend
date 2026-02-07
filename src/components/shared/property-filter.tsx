'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Home, Calendar, CreditCard, ChevronDown, X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface FilterProps {
  type: string;
  lang: string;
  variant?: 'property' | 'guide';
}

export default function PropertyFilter({ type, lang, variant = 'property' }: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAr = lang === 'ar';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [installmentsOnly, setInstallmentsOnly] = useState(false);
  
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
    category: ["Turkey Guide", "UAE Guide", "Market Trends", "Legal Guide", "Lifestyle", "Investment Strategy", "Citizenship", "Buying Tips"],
    country: ["Turkey", "UAE", "Both", "Other"],
    sort: ["Date", "Popularity"]
  } : {
    city: type === 'turkey' ? ["Istanbul", "Alanya", "Antalya", "Ankara", "Trabzon"] : ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
    propertyType: ["Villa", "Apartment", "Townhouse", "Duplex"],
    delivery: ["Ready to Move", "Under Construction", "Off-Plan"]
  };

  const handleSelect = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setActiveDropdown(null);
  };

  const resetFilters = () => setSelections({ city: "", propertyType: "", delivery: "", category: "", country: "", sort: "Date" });

  return (
    <div ref={filterRef} className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 mb-12 relative z-[90]">
      
      {/* MOBILE TRIGGER */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border-none mb-2"
      >
        <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest text-black">
          <SlidersHorizontal size={18} className="text-[#12AD65]" />
          {isAr ? (variant === 'guide' ? "تصفية المقالات" : "تصفية متقدمة") : (variant === 'guide' ? "Filter Articles" : "Advanced Filter")}
        </div>
        <ChevronDown size={18} className={clsx("transition-transform duration-300", isExpanded && "rotate-180")} />
      </button>

      {/* MOBILE CONTENT */}
      <div className={clsx(
        "lg:hidden flex flex-col gap-3 transition-all duration-500 overflow-hidden",
        isExpanded ? "max-h-[1200px] opacity-100 mt-4" : "max-h-0 opacity-0"
      )}>
        {variant === 'guide' ? (
          <>
            <MobileDropdown label="Category" options={options.category} value={selections.category} onSelect={(v: string) => handleSelect('category', v)} isAr={isAr} />
            <MobileDropdown label="Country" options={options.country} value={selections.country} onSelect={(v: string) => handleSelect('country', v)} isAr={isAr} />
            <MobileDropdown label="Sort By" options={options.sort} value={selections.sort} onSelect={(v: string) => handleSelect('sort', v)} isAr={isAr} />
          </>
        ) : (
          <>
            <MobileDropdown label={isAr ? "المدن" : "Cities"} options={options.city} value={selections.city} onSelect={(v: string) => handleSelect('city', v)} isAr={isAr} />
            <MobileDropdown label={isAr ? "نوع العقار" : "Property Type"} options={options.propertyType} value={selections.propertyType} onSelect={(v: string) => handleSelect('propertyType', v)} isAr={isAr} />
            <MobileDropdown label={isAr ? "تاريخ التسليم" : "Delivery Date"} options={options.delivery} value={selections.delivery} onSelect={(v: string) => handleSelect('delivery', v)} isAr={isAr} />
            <button onClick={() => setInstallmentsOnly(!installmentsOnly)} className={clsx("py-5 rounded-xl font-black text-[10px] uppercase", installmentsOnly ? "bg-[#12AD65] text-white" : "bg-[#F8F9FA] text-gray-500")}>
              {isAr ? "أقساط فقط" : "Installments Only"}
            </button>
          </>
        )}
        <button onClick={resetFilters} className="flex items-center justify-center gap-2 py-4 text-gray-400 text-[10px] font-black uppercase"><RotateCcw size={14} /> {isAr ? "إعادة ضبط" : "Reset"}</button>
      </div>

      {/* DESKTOP FILTER BAR */}
      {variant === 'guide' ? (
        <div className="hidden lg:flex items-center justify-between bg-white p-6 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-none">
          <div className="flex items-center gap-6">
            <InlineDropdown label="Category" value={selections.category} options={options.category} onSelect={(v: string) => handleSelect('category', v)} isOpen={activeDropdown === 'category'} toggle={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')} />
            <InlineDropdown label="Country" value={selections.country} options={options.country} onSelect={(v: string) => handleSelect('country', v)} isOpen={activeDropdown === 'country'} toggle={() => setActiveDropdown(activeDropdown === 'country' ? null : 'country')} />
            <button onClick={resetFilters} className="flex items-center gap-2 text-gray-300 hover:text-red-500 text-[11px] font-black uppercase tracking-widest ml-4 transition-all">
              <X size={14} /> {isAr ? "إعادة ضبط" : "Reset"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-[11px] font-black uppercase tracking-widest">Sort by:</span>
            <InlineDropdown label="" value={selections.sort} options={options.sort} onSelect={(v: string) => handleSelect('sort', v)} isOpen={activeDropdown === 'sort'} toggle={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')} isSort />
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-4 bg-white p-3 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-none">
          <FilterDropdown label={isAr ? "المدينة" : "Cities"} icon={MapPin} value={selections.city} options={options.city} isOpen={activeDropdown === 'city'} toggle={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')} onSelect={(v: string) => handleSelect('city', v)} isAr={isAr} />
          <FilterDropdown label={isAr ? "نوع العقار" : "Property Type"} icon={Home} value={selections.propertyType} options={options.propertyType} isOpen={activeDropdown === 'propertyType'} toggle={() => setActiveDropdown(activeDropdown === 'propertyType' ? null : 'propertyType')} onSelect={(v: string) => handleSelect('propertyType', v)} isAr={isAr} />
          <FilterDropdown label={isAr ? "التسليم" : "Delivery Date"} icon={Calendar} value={selections.delivery} options={options.delivery} isOpen={activeDropdown === 'delivery'} toggle={() => setActiveDropdown(activeDropdown === 'delivery' ? null : 'delivery')} onSelect={(v: string) => handleSelect('delivery', v)} isAr={isAr} />
          <button onClick={() => setInstallmentsOnly(!installmentsOnly)} className={clsx("px-8 py-4 rounded-xl font-black text-[10px] uppercase", installmentsOnly ? "bg-[#12AD65] text-white shadow-lg shadow-[#12AD65]/20" : "bg-[#F8F9FA] text-gray-500 hover:bg-[#F1F3F5]")}>
            {isAr ? "تقسيط" : "Installment"}
          </button>
          <button onClick={resetFilters} className="p-4 text-gray-300 hover:text-red-500 transition-colors"><X size={20} /></button>
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
        {label && <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}:</span>}
        <span className="text-[11px] font-black text-black uppercase tracking-widest">{value || "All"}</span>
        <ChevronDown size={14} className={clsx("text-gray-300 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute top-[120%] left-0 w-full min-w-[200px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 z-[100]">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => onSelect(opt)} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-[#F8F9FA] hover:text-[#12AD65] cursor-pointer transition-colors">{opt}</div>
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
        <div className="flex flex-col items-start"><span className="text-[9px] font-black uppercase text-gray-400 mb-1">{label}</span><span className={clsx("text-xs font-bold", value ? "text-black" : "text-gray-300")}>{value || (isAr ? "اختر..." : "Select...")}</span></div>
        <ChevronDown size={16} className={clsx("text-gray-300 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="mt-2 bg-white rounded-xl shadow-inner overflow-hidden">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => { onSelect(opt); setIsOpen(false); }} className="px-5 py-4 text-xs font-bold text-gray-600 border-b border-gray-50 last:border-none">{opt}</div>
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
          <Icon size={18} className={clsx(isOpen || value ? "text-[#12AD65]" : "text-gray-400")} />
          <span className={clsx("text-[11px] font-black uppercase tracking-widest", value ? "text-black" : "text-gray-400")}>{value || label}</span>
        </div>
        <ChevronDown size={14} className={clsx("text-gray-300 transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute top-[115%] left-0 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-3 z-[100]">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => onSelect(opt)} className="px-6 py-3 text-[11px] font-black uppercase text-gray-500 hover:text-[#12AD65] cursor-pointer transition-colors">{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}