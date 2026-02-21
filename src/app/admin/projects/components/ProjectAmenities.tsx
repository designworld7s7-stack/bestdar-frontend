'use client';

import React from 'react';
import { ListPlus } from 'lucide-react';
// نخرج مرتين (../../) للوصول إلى الملف المشترك في admin/components/UI.tsx
import { Section, Input } from '../../components/UI';

// تعريف خيارات المرافق هنا ليكون المكون مستقلاً تماماً
const AMENITY_OPTIONS = [
  { id: 'pool', label_en: 'Swimming Pool', label_ar: 'مسبح', icon: '🏊‍♂️' },
  { id: 'gym', label_en: 'Fitness Center', label_ar: 'نادي رياضي', icon: '🏋️‍♂️' },
  { id: 'parking', label_en: 'Private Parking', label_ar: 'مواقف خاصة', icon: '🚗' },
  { id: 'security', label_en: '24/7 Security', label_ar: 'أمن وحراسة', icon: '🛡️' },
  { id: 'sauna', label_en: 'Sauna & Steam', label_ar: 'سونا وبخار', icon: '🧖' },
  { id: 'turkish_hammam', label_en: 'Turkish Hammam', label_ar: 'حمام تركي', icon: '🧼' },
  { id: 'kids_play', label_en: 'Kids Play Area', label_ar: 'منطقة ألعاب أطفال', icon: '🎠' },
  { id: 'garden', label_en: 'Landscaped Garden', label_ar: 'حدائق ومنتزهات', icon: '🌳' },
  { id: 'cinema', label_en: 'Outdoor Cinema', label_ar: 'سينما خارجية', icon: '🎬' },
  { id: 'sports_court', label_en: 'Sports Courts', label_ar: 'ملاعب رياضية', icon: '🎾' },
  { id: 'beach', label_en: 'Private Beach', label_ar: 'شاطئ خاص', icon: '🏖️' },
  { id: 'valet', label_en: 'Valet Parking', label_ar: 'خدمة صف السيارات', icon: '🤵' },
];

interface ProjectAmenitiesProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectAmenities({ formData, setFormData }: ProjectAmenitiesProps) {
  return (
    <Section title="6. Amenities & Facilities" icon={<ListPlus size={20} className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {AMENITY_OPTIONS.map((item) => {
          const isSelected = formData.amenities?.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const current = formData.amenities || [];
                const updated = isSelected 
                  ? current.filter((i: string) => i !== item.id) 
                  : [...current, item.id];
                setFormData({...formData, amenities: updated});
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected 
                ? 'border-[#12AD65] bg-[#12AD65]/5 shadow-sm shadow-[#12AD65]/10' 
                : 'border-slate-100 hover:border-slate-300 bg-white'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[9px] font-black text-slate-800 uppercase text-center leading-tight">{item.label_en}</span>
              <span className="text-[9px] text-slate-400 font-bold text-center mt-0.5" dir="rtl">{item.label_ar}</span>
            </button>
          );
        })}
      </div>

      {/* حقل نصي إضافي - تم تعديله ليستخدم custom_amenities بدلاً من landmarks */}
      <div className="mt-6 pt-4 border-t border-slate-50">
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Other Amenities (Custom)</p>
       <Input 
  label="Additional Features (separate with commas)" 
  value={formData.custom_amenities || ''} // يجب أن يكون custom_amenities وليس landmarks
  onChange={(v: string) => setFormData({...formData, custom_amenities: v})} 
/>
      </div>
    </Section>
  );
}