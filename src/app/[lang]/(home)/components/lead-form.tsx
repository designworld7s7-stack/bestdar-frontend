'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MessageSquare, Landmark, Wallet, ChevronDown, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/utils/supabase/client'; //

// --- Custom Dropdown Component ---
function CustomSelect({ label, options, icon: Icon, onSelect, value, isAr }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "relative flex items-center w-full bg-[#F8F9FA] rounded-xl py-4 px-12 text-sm font-medium cursor-pointer transition-all border-2 border-transparent",
          isOpen ? "border-[#12AD65] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]" : "hover:bg-[#F1F3F5]"
        )}
      >
        <Icon size={18} className={clsx("absolute left-4 transition-colors", isOpen ? "text-[#12AD65]" : "text-[#4B5563]")} />
        <span className={clsx("transition-colors", value ? "text-black" : "text-[#4B5563]")}>
          {value || label}
        </span>
        <ChevronDown size={16} className={clsx("absolute right-4 transition-transform", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => { onSelect(opt); setIsOpen(false); }}
              className="px-6 py-3 text-sm font-bold text-gray-600 hover:bg-[#F8F9FA] hover:text-[#12AD65] cursor-pointer transition-colors"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeadForm({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const supabase = createClient();

  // --- Dynamic Photo State ---
  const [bgImage, setBgImage] = useState('/lead-bg.jpg'); // Fallback
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    budget_range: '',
    target_city: '',
    message: ''
  });

  // Fetch Background Photo
  useEffect(() => {
    async function fetchBrandingPhoto() {
      const { data } = await supabase
        .from('site_content')
        .select('image_url')
        .eq('section_key', 'lead_form_side')
        .single();
      if (data?.image_url) setBgImage(data.image_url);
    }
    fetchBrandingPhoto();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('leads')
      .insert([{
        ...formData,
        source: 'home_lead',
        country_code: formData.target_city === 'UAE' ? 'ae' : formData.target_city === 'Turkey' ? 'tr' : null
      }]);

    setLoading(false);
    if (!error) {
      setSuccess(true);
    } else {
      alert(isAr ? "حدث خطأ ما." : "Something went wrong.");
    }
  };

  const inputClass = `w-full bg-[#F8F9FA] border-2 border-transparent rounded-xl py-4 px-12 text-sm font-medium transition-all focus:border-[#12AD65] focus:bg-white outline-none text-black`;
  const iconClass = `absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] group-focus-within:text-[#12AD65] transition-colors`;

  return (
    <section className="flex flex-col lg:flex-row min-h-[850px] bg-white overflow-hidden">
      {/* Left Branding Side: Dynamic Photo */}
      <div className="relative w-full lg:w-1/2 bg-black flex flex-col justify-end p-12 lg:p-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40 grayscale">
          <img src={bgImage} alt="Boutique Interior" className="h-full w-full object-cover transition-opacity duration-1000" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="relative z-10">
          <p className="text-3xl lg:text-4xl font-medium text-white leading-tight italic tracking-[0.1em]">
            {isAr ? "\"نحن لا نجد العقارات فحسب، بل نصنع موروثات استثمارية.\"" : "\"We don't just find properties. We craft investment legacies.\""}
          </p>
          <div className="h-2 w-20 bg-[#12AD65] mt-8" />
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-[#F9FAFB]">
        <div className="w-full max-w-xl bg-white rounded-[48px] p-8 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.04)]">
          
          <div className="mb-8 md:mb-12">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-brand-black tracking-normal sm:tracking-[0.1em] leading-tight break-words">
    {success 
      ? (isAr ? "شكراً لك!" : "Thank You!") 
      : (isAr ? "احصل على استشارة" : "Get Personal Assistance")
    }
  </h2>
            <p className="text-[#4B5563] mt-3 font-medium text-sm lg:text-base">
               {success 
                ? (isAr ? "سنتواصل معك في أقرب وقت ممكن." : "Our team will reach out to you shortly.")
                : (isAr ? "فريقنا سيقودك إلى أفضل الفرص." : "Let our team guide you to the best opportunities.")}
            </p>
          </div>

          {!success && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative group">
                <User size={18} className={iconClass} />
                <input 
                  required
                  type="text" 
                  placeholder={isAr ? "الاسم الكامل" : "Full Name"} 
                  className={inputClass} 
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative group">
                  <Phone size={18} className={iconClass} />
                  <input 
                    required
                    type="tel" 
                    placeholder={isAr ? "رقم الهاتف" : "Phone Number"} 
                    className={inputClass} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="relative group">
                  <Mail size={18} className={iconClass} />
                  <input 
                    required
                    type="email" 
                    placeholder={isAr ? "الايميل" : "Email"} 
                    className={inputClass} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <CustomSelect 
                label={isAr ? "الميزانية" : "Budget"} icon={Wallet} 
                options={['$100k - $250k', '$250k - $500k', '$500k+']}
                value={formData.budget_range}
                onSelect={(val: string) => setFormData({...formData, budget_range: val})}
              />
                <CustomSelect 
                label={isAr ? "الوجهة" : "Target City"} icon={Landmark} 
                options={['Turkey', 'UAE', 'Both']}
                value={formData.target_city}
                onSelect={(val: string) => setFormData({...formData, target_city: val})}
              />
              </div>

              <div className="relative group">
                <MessageSquare size={18} className="absolute left-4 top-5 text-[#4B5563] group-focus-within:text-[#12AD65]" />
                <textarea 
                  rows={4} 
                  placeholder={isAr ? "رسالتك" : "Message"} 
                  className={`${inputClass} resize-none`} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full btn-brand py-6 rounded-2xl font-medium text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:bg-black hover:shadow-2xl active:scale-95 shadow-lg shadow-[#12AD65]/20 disabled:opacity-50"
              >
                
                {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الطلب" : "Send Inquiry")}
            </button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}