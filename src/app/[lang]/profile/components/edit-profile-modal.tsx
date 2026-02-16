'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, Globe, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface EditProfileModalProps {
  isAr: boolean;
  onClose: () => void;
  profile: any;
}

export default function EditProfileModal({ isAr, onClose, profile }: EditProfileModalProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  // Added email to state to make it clickable/editable
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "", 
    whatsapp_number: profile?.whatsapp_number || "",
    country: profile?.country || "" 
  });

const handleSave = async () => {
  setLoading(true);

  // 1. تحديث البروفايل مع تصحيح اسم العمود
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: formData.full_name,
      whatsapp_number: formData.whatsapp_number,
      // نغير 'country' إلى الاسم الفعلي في قاعدة بياناتك
      countries_of_interest: formData.country, 
    })
    .eq('id', profile.id);

  if (profileError) {
    // لعلاج مشكلة الـ cache التي تظهر في الصورة، يمكنك محاولة إرسال تنبيه
    alert(isAr ? "حدث خطأ أثناء الحفظ" : "Error saving profile: " + profileError.message);
    setLoading(false);
    return;
  }

  // 2. تحديث الإيميل إذا لزم الأمر
  if (formData.email !== profile.email) {
    await supabase.auth.updateUser({ email: formData.email });
  }

  // نجاح العملية
  onClose();
  window.location.reload(); 
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[480px] rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
        
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
          <h2 className="text-[20px] font-medium text-black">{isAr ? "تعديل الملف الشخصي" : "Edit Profile"}</h2>
          <button onClick={onClose} className="text-[#4B5563] hover:text-black"><X size={24} /></button>
        </div>

        <div className="p-8 space-y-6">
          {/* 1. FULL NAME */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563] px-1">{isAr ? "الاسم الكامل" : "Full Name"}</label>
            <div className="relative">
              <User size={18} className={`absolute ${isAr ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-[#6B7280]`} />
              <input 
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className={`w-full bg-[#FAFAFA] ${isAr ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 rounded-2xl text-[15px] font-bold border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 text-black`}
              />
            </div>
          </div>

          {/* 2. EMAIL (Now clickable and positioned under Name) */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563] px-1">{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
            <div className="relative">
              <Mail size={18} className={`absolute ${isAr ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-[#6B7280]`} />
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full bg-[#FAFAFA] ${isAr ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 rounded-2xl text-[15px] font-bold border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 text-black`}
              />
            </div>
          </div>

          {/* 3. WHATSAPP */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563] px-1">{isAr ? "رقم الواتساب" : "WhatsApp Number"}</label>
            <div className="relative">
              <Phone size={18} className={`absolute ${isAr ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-[#6B7280]`} />
              <input 
                type="text"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                className={`w-full bg-[#FAFAFA] ${isAr ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 rounded-2xl text-[15px] font-bold border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 text-black`}
              />
            </div>
          </div>

          {/* 4. COUNTRY */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563] px-1">{isAr ? "البلد" : "Country"}</label>
            <div className="relative">
              <Globe size={18} className={`absolute ${isAr ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-[#6B7280]`} />
              <input 
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className={`w-full bg-[#FAFAFA] ${isAr ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-4 rounded-2xl text-[15px] font-bold border border-gray-100 outline-none focus:ring-2 focus:ring-[#12AD65]/10 text-black`}
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-black text-white py-5 mt-4 rounded-2xl font-medium uppercase tracking-tighter hover:bg-[#12AD65] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isAr ? "حفظ" : "Save")}
          </button>
        </div>
      </div>
    </div>
  );
}