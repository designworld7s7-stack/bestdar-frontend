'use client';

import React from 'react';
import { Wallet, MapPin, Home, Pencil } from 'lucide-react';

interface PreferencesProps {
  isAr: boolean;
  onEdit: () => void; 
}
export default function Preferences({ isAr, onEdit }: PreferencesProps) {
  // Mock data based on your UI screenshot
  const cities = isAr ? ["بغداد", "أربيل"] : ["Baghdad", "Erbil"];
  const types = isAr ? ["فيلات", "شقق"] : ["Villas", "Apartments"];

  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 relative">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[22px] font-medium text-black tracking-tight">
          {isAr ? "تفضيلاتي" : "My Preferences"}
        </h2>
        {/* 4. Attach the function to the button */}
        <button 
          onClick={onEdit}
          className="text-[#12AD65] hover:bg-[#E8F7F0] p-2 rounded-full transition-colors"
        >
          <Pencil size={20} />
        </button>
      </div>

      <div className="space-y-10">
        {/* Budget Range */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-[#4B5563]">
            <Wallet size={18} />
            <span className="text-[13px] font-medium uppercase tracking-[0.1em]">
              {isAr ? "نطاق الميزانية" : "Budget Range"}
            </span>
          </div>
          <div className="bg-[#F8F9FA] px-6 py-4 rounded-2xl inline-block">
            <span className="text-[16px] font-medium text-black">$250k - $500k</span>
          </div>
        </section>

        {/* Preferred Cities */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-[#4B5563]">
            <MapPin size={18} />
            <span className="text-[13px] font-medium uppercase tracking-[0.1em]">
              {isAr ? "المدن المفضلة" : "Preferred Cities"}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <div key={city} className="bg-[#F8F9FA] px-6 py-3 rounded-xl border border-gray-50">
                <span className="text-[14px] font-bold text-black">{city}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Property Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-[#4B5563]">
            <Home size={18} />
            <span className="text-[13px] font-medium uppercase tracking-[0.1em]">
              {isAr ? "أنواع العقارات" : "Property Types"}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <div key={type} className="bg-[#F8F9FA] px-6 py-3 rounded-xl border border-gray-50">
                <span className="text-[14px] font-medium text-black">{type}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}