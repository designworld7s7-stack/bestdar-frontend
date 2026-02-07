'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, Globe } from 'lucide-react';

export default function EditProfileModal({ isAr, onClose }: { isAr: boolean, onClose: () => void }) {
  // Local state for form fields
  const [formData, setFormData] = useState({
    name: "Ahmed Al-Mansour",
    email: "ahmed@example.com",
    phone: "+964 790 123 4567",
    country: "Iraq"
  });

  const handleSave = () => {
    console.log("Saving Profile Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[480px] rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <h2 className="text-[20px] font-black text-black">{isAr ? "تعديل الملف الشخصي" : "Edit Profile"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
        </div>

        <div className="p-8 space-y-6">
          {/* Input Field Helper */}
          {[
            { id: 'name', label: isAr ? 'الاسم الكامل' : 'Full Name', icon: User },
            { id: 'email', label: isAr ? 'البريد الإلكتروني' : 'Email Address', icon: Mail },
            { id: 'phone', label: isAr ? 'رقم الهاتف' : 'Phone Number', icon: Phone },
            { id: 'country', label: isAr ? 'البلد' : 'Country', icon: Globe },
          ].map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                {field.label}
              </label>
              <div className="relative">
                <field.icon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="text"
                  value={(formData as any)[field.id]}
                  onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                  className="w-full bg-[#FAFAFA] pl-14 pr-6 py-4 rounded-2xl text-[15px] font-bold shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 transition-all"
                />
              </div>
            </div>
          ))}

          <button 
            onClick={handleSave}
            className="w-full bg-black text-white py-5 mt-4 rounded-2xl font-black text-[14px] uppercase tracking-widest shadow-2xl hover:bg-[#12AD65] transition-all"
          >
            {isAr ? "حفظ التغييرات" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}