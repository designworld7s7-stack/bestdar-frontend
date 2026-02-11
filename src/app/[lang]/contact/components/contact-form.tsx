'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function ContactForm({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label={isAr ? "الاسم الكامل" : "Full Name"} placeholder="John Doe" />
          <InputField label={isAr ? "البريد الإلكتروني" : "Email Address"} placeholder="john@example.com" type="email" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label={isAr ? "رقم الهاتف (اختياري)" : "Phone Number (Optional)"} placeholder="+964 ..." />
          <InputField label={isAr ? "الموضوع" : "Subject"} placeholder={isAr ? "استفسار استثماري" : "Investment Inquiry"} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter ml-1">
            {isAr ? "الرسالة" : "Message"}
          </label>
          <textarea 
            rows={5}
            className="w-full bg-[#F8F9FA] rounded-2xl p-5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#12AD65]/20 transition-all border-none"
            placeholder={isAr ? "كيف يمكننا مساعدتك اليوم؟" : "How can we help you today?"}
          />
        </div>

        <button className="w-full btn-brand py-5 rounded-2xl font-medium text-sm uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-[#0f8f53] transition-all shadow-lg shadow-[#12AD65]/20 group">
          {isAr ? "إرسال الرسالة" : "Send Message"}
          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

function InputField({ label, placeholder, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter ml-1">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#F8F9FA] rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#12AD65]/20 transition-all border-none"
      />
    </div>
  );
}