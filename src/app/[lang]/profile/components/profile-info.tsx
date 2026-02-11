'use client';

import React from 'react';
import { User, Mail, Phone, Globe, Pencil, Camera } from 'lucide-react';

// FIX 1: Explicitly define the props interface
interface ProfileInfoProps {
  isAr: boolean;
  onEdit: () => void;
}

// FIX 2: Destructure onEdit from the props
export default function ProfileInfo({ isAr, onEdit }: ProfileInfoProps) {
  const fields = [
    { label: isAr ? "الاسم الكامل" : "FULL NAME", value: "Ahmed Al-Mansour", icon: User },
    { label: isAr ? "البريد الإلكتروني" : "EMAIL", value: "ahmed@example.com", icon: Mail },
    { label: isAr ? "الهاتف" : "PHONE", value: "+964 790 123 4567", icon: Phone },
    { label: isAr ? "البلد" : "COUNTRY", value: "Iraq", icon: Globe },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[22px] font-medium text-black tracking-tight">
          {isAr ? "ملفي الشخصي" : "My Profile"}
        </h2>
        {/* FIX 3: Optional - You can also add a main edit button here */}
        <button onClick={onEdit} className="text-[#12AD65] hover:bg-[#E8F7F0] p-2 rounded-full transition-all active:scale-90">
            <Pencil size={20} />
        </button>
      </div>

      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F2F4F7] rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <User size={40} className="text-[#6B7280]" />
          </div>
          {/* FIX 4: Avatar edit trigger */}
          <button onClick={onEdit} className="absolute bottom-1 right-1 btn-brand p-2 rounded-full border-4 border-white shadow-lg active:scale-90 transition-all">
            <Camera size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {fields.map((field, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F8F9FA] rounded-full flex items-center justify-center text-[#4B5563] group-hover:bg-[#E8F7F0] group-hover:text-[#12AD65] transition-colors">
                <field.icon size={18} />
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#6B7280] mb-0.5">{field.label}</p>
                <p className="text-[15px] font-medium text-black">{field.value}</p>
              </div>
            </div>
            {/* FIX 5: Individual field edit triggers */}
            <button onClick={onEdit} className="text-[#6B7280] hover:text-black transition-colors">
              <Pencil size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}