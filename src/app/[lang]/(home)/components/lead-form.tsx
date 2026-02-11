'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, DollarSign, MapPin, MessageSquare, Send, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

// --- Custom Dropdown Component to Kill the "Chrome Blue" ---
function CustomSelect({ label, options, icon: Icon, onSelect, lang }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

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
        <span className={selected ? "text-black" : "text-[#4B5563]"}>
          {selected || label}
        </span>
        <ChevronDown size={16} className={clsx("absolute right-4 transition-transform", isOpen && "rotate-180")} />
      </div>

      {/* Custom Menu - White with Light Shadow as requested */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => { setSelected(opt); onSelect(opt); setIsOpen(false); }}
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
  const inputClass = `w-full bg-[#F8F9FA] border-2 border-transparent rounded-xl py-4 px-12 text-sm font-medium transition-all focus:border-[#12AD65] focus:bg-white outline-none`;
  const iconClass = `absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] group-focus-within:text-[#12AD65] transition-colors`;

  return (
    <section className="flex flex-col lg:flex-row min-h-[850px] bg-white overflow-hidden">
      {/* Left Branding Side */}
      <div className="relative w-full lg:w-1/2 bg-black flex flex-col justify-end p-12 lg:p-24">
        <div className="absolute inset-0 opacity-40 grayscale">
           <img src="/lead-bg.jpg" alt="Interior" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10">
          <p className="text-3xl lg:text-5xl font-medium text-white leading-tight italic tracking-[0.1em]">
            {isAr ? "\"نحن لا نجد العقارات فحسب، بل نصنع موروثات استثمارية.\"" : "\"We don't just find properties. We craft investment legacies.\""}
          </p>
          <div className="h-2 w-20 bg-[#12AD65] mt-8" />
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-[#F9FAFB]">
        <div className="w-full max-w-xl bg-white rounded-[48px] p-8 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.04)]">
          
          <div className="mb-12">
            <h2 className="text-4xl font-medium text-brand-black tracking-[0.1em]">
              {isAr ? "احصل على استشارة" : "Get Personal Assistance"}
            </h2>
            <p className="text-[#4B5563] mt-3 font-medium text-sm lg:text-base">
              {isAr ? "فريقنا سيقودك إلى أفضل الفرص." : "Let our team guide you to the best opportunities."}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <User size={18} className={iconClass} />
              <input type="text" placeholder={isAr ? "الاسم الكامل" : "Full Name"} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <Phone size={18} className={iconClass} />
                <input type="tel" placeholder={isAr ? "رقم الهاتف" : "Phone Number"} className={inputClass} />
              </div>
              <div className="relative group">
                <Mail size={18} className={iconClass} />
                <input type="email" placeholder={isAr ? "الايميل" : "Email"} className={inputClass} />
              </div>
            </div>

            {/* Custom Selects that kill the "Blue" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomSelect 
                label={isAr ? "الميزانية" : "Select Budget"}
                icon={DollarSign}
                options={["Under 200k", "200k - 500k", "500k - 1m", "More than 1m"]}
                onSelect={(val: string) => console.log(val)}
              />
              <CustomSelect 
                label={isAr ? "المنطقة" : "Place of Interest"}
                icon={MapPin}
                options={["Turkey", "UAE", "Both", "Other"]}
                onSelect={(val: string) => console.log(val)}
              />
            </div>

            <div className="relative group">
              <MessageSquare size={18} className="absolute left-4 top-5 text-[#4B5563] group-focus-within:text-[#12AD65]" />
              <textarea rows={4} placeholder={isAr ? "رسالتك" : "Message"} className={`${inputClass} resize-none`} />
            </div>

            <button className="w-full btn-brand py-6 rounded-2xl font-medium text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:bg-black hover:shadow-2xl active:scale-95 shadow-lg shadow-[#12AD65]/20">
              {isAr ? "إرسال" : "Submit Inquiry"}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}