'use client';

import React from 'react';
import { Wallet, MapPin, Home, Pencil } from 'lucide-react';

interface PreferencesProps {
  isAr: boolean;
  onEdit: () => void; 
  preferences: any; 
}

export default function Preferences({ isAr, onEdit, preferences }: PreferencesProps) {
  // Use the NEW column names from your SQL script
  const cities = preferences?.cities_of_interest || [];
  const types = preferences?.property_types || [];
  const budgetDisplay = preferences?.budget || (isAr ? "غير محدد" : "Not specified");

  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 relative h-full">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[22px] font-medium text-black tracking-tight">
          {isAr ? "تفضيلاتي" : "My Preferences"}
        </h2>
        <button 
          onClick={onEdit}
          className="text-[#12AD65] hover:bg-[#E8F7F0] p-2 rounded-full transition-colors active:scale-90"
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
          <div className="bg-[#F8F9FA] px-6 py-4 rounded-2xl inline-block border border-gray-50">
            <span className="text-[16px] font-bold text-black">{budgetDisplay}</span>
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
            {cities.length > 0 ? cities.map((city: string) => (
              <div key={city} className="bg-[#F8F9FA] px-6 py-3 rounded-xl border border-gray-100">
                <span className="text-[14px] font-bold text-black">{city}</span>
              </div>
            )) : (
              <p className="text-gray-400 text-sm italic">{isAr ? "لم يتم تحديد مدن" : "No locations set"}</p>
            )}
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
            {types.length > 0 ? types.map((type: string) => (
              <div key={type} className="bg-[#F8F9FA] px-6 py-3 rounded-xl border border-gray-100">
                <span className="text-[14px] font-bold text-black">{type}</span>
              </div>
            )) : (
              <p className="text-gray-400 text-sm italic">{isAr ? "لم يتم تحديد أنواع" : "No types set"}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}