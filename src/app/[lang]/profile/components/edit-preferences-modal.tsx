'use client';

import React, { useState } from 'react';
import { X, Wallet, MapPin, Home, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client'; //

interface EditPreferencesModalProps {
  isAr: boolean;
  onClose: () => void;
  preferences: any; // Add this to receive existing data
}

export default function EditPreferencesModal({ isAr, onClose, preferences }: EditPreferencesModalProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  // Initialize state with real data from Supabase
  const [selectedCities, setSelectedCities] = useState<string[]>(preferences?.cities_of_interest || []);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(preferences?.property_types || []);
  const [selectedBudget, setSelectedBudget] = useState(preferences?.budget || '');

  const toggleSelection = (item: string, state: string[], setter: any) => {
    if (state.includes(item)) {
      setter(state.filter(i => i !== item));
    } else {
      setter([...state, item]);
    }
  };

  // THE SAVE LOGIC
  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        budget: selectedBudget,
        cities_of_interest: selectedCities,
        property_types: selectedTypes
      })
      .eq('id', preferences.id);

    if (!error) {
      window.location.reload(); // Refresh to update the Card
      onClose();
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[500px] rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh]">
        
        {/* 1. HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <h2 className="text-[20px] font-medium text-black">
            {isAr ? "تعديل التفضيلات" : "Edit Preferences"}
          </h2>
          <button onClick={onClose} className="text-[#4B5563] hover:text-black transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        {/* 2. MODAL CONTENT (Scrollable) */}
        <div className="p-8 space-y-10 overflow-y-auto">
          
          {/* Budget Range */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <Wallet size={18} />
              <span className="text-[14px] font-medium">{isAr ? "نطاق الميزانية" : "Budget Range"}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['$200k - $500k', '$500k - $750k', '$750k - $1M', '$1M+'].map((range) => (
                <button 
                  key={range}
                  onClick={() => setSelectedBudget(range)}
                  className={`py-4 rounded-xl font-medium text-[14px] border transition-all ${selectedBudget === range ? 'bg-[#E8F7F0] border-[#12AD65] text-[#12AD65]' : 'bg-white border-gray-100 text-[#4B5563]'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </section>

          {/* Preferred Cities */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <MapPin size={18} />
              <span className="text-[14px] font-medium">{isAr ? "المدن المفضلة" : "Preferred Cities"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Antalya', 'Alanya', 'Istanbul', 'Ankara', 'Trabzon', 'Abu Dhabi', 'Dubai', 'Sharjah'].map((city) => (
                <button 
                  key={city}
                  onClick={() => toggleSelection(city, selectedCities, setSelectedCities)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-[13px] border transition-all ${selectedCities.includes(city) ? 'bg-[#12AD65] border-[#12AD65] text-white shadow-lg' : 'bg-white border-gray-100 text-[#7D899D]'}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </section>

          {/* Property Types */}
          <section className="space-y-4 pb-4">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <Home size={18} />
              <span className="text-[14px] font-medium">{isAr ? "أنواع العقارات" : "Property Types"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Villas', 'Apartments', 'Commercial', 'Land', 'Penthouses'].map((type) => (
                <button 
                  key={type}
                  onClick={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-[13px] border transition-all ${selectedTypes.includes(type) ? 'bg-[#12AD65] border-[#12AD65] text-white shadow-lg' : 'bg-white border-gray-100 text-[#7D899D]'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* 3. FOOTER ACTION */}
        <div className="p-8 pt-4 border-t border-gray-50">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#111111] text-white py-5 rounded-[20px] font-medium text-[14px] uppercase tracking-[0.15em] shadow-2xl hover:bg-black active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isAr ? "حفظ التفضيلات" : "Save Preferences")}
          </button>
        </div>
      </div>
    </div>
  );
}