'use client';

import React, { useState, useTransition } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';

export default function ReservationForm({ lang, unit, project }: any) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const isAr = lang === 'ar';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Stop the page from refreshing
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitLead(formData);
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.error || "Submission failed");
      }
    });
  };

  if (isSuccess) {
  return (
    <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300" dir={isAr ? "rtl" : "ltr"}>
  <div className="flex justify-center">
    <CheckCircle2 size={48} className="text-[#12AD65]" />
  </div>
  <h3 className="text-[#12AD65] font-bold text-xl">
    {isAr ? "تم إرسال طلبك بنجاح" : "Request Sent Successfully"}
  </h3>
  <p className="text-gray-500 text-sm">
    {isAr 
      ? `سنتواصل معك بخصوص الوحدة #${unit?.id}` 
      : `We will contact you regarding Unit #${unit?.id}`}
  </p>
</div>
  );
}

  return (
<form onSubmit={handleSubmit} className="w-full space-y-4" dir={isAr ? "rtl" : "ltr"}>
  {/* Hidden Inputs - تبقى القيم برمجية بالإنجليزية لضمان الربط [cite: 2026-02-26] */}
  <input type="hidden" name="project_id" value={project?.property_ref || project?.id || ''} />
  <input type="hidden" name="unit_id" value={unit?.unit_ref || unit?.id || ''} />
  {/* هنا نستخدم title و title_ar التي اعتمدناها في الدروس السابقة [cite: 2026-02-25] */}
  <input type="hidden" name="project_name" value={isAr ? project?.title_ar : project?.title} />

  {/* Unit Identification Card */}
  <div className="bg-gray-50 rounded-[22px] p-4 lg:p-8 flex justify-between items-center shadow-inner">
    <div className="text-start">
      <span className="text-[8px] font-medium text-[#4B5563] uppercase tracking-tighter block mb-0.5">
        {isAr ? "رقم الوحدة" : "Unit ID"}
      </span>
      <span className="text-base lg:text-xl font-medium text-black">#{unit?.id}</span>
    </div>
    <div className="text-end">
      <span className="text-[8px] font-medium text-[#4B5563] uppercase tracking-tighter block mb-0.5">
        {isAr ? "السعر" : "Price"}
      </span>
      <span className="text-base lg:text-xl font-medium text-[#12AD65]">
        ${unit?.price?.toLocaleString()}
      </span>
    </div>
  </div>

  {/* Input Fields */}
  <div className="space-y-3">
    <input 
      name="full_name" 
      required 
      placeholder={isAr ? "الاسم الكامل" : "Full Name"} 
      className="w-full p-4 bg-gray-50 rounded-xl text-start outline-none focus:ring-1 focus:ring-[#12AD65] transition-all"
    />
    
    <div className="flex w-full gap-2">
      <select 
        name="country_code" 
        dir="ltr"
        className="bg-gray-50 border-0 rounded-xl px-2 text-[9px] font-medium shadow-sm outline-none w-[75px]"
      >
        <option value="+964">+964</option>
        <option value="+971">+971</option>
        <option value="+90">+90</option>
      </select>
      <input 
        name="phone" 
        required 
        dir="ltr"
        placeholder={isAr ? "رقم الهاتف" : "Phone"} 
        className="w-full p-4 bg-gray-50 rounded-xl text-start outline-none focus:ring-1 focus:ring-[#12AD65] transition-all"
      />
    </div>
  </div>

  {/* Trust Shield */}
  <div className="flex items-center gap-3 text-[#4B5563] px-1">
    <ShieldCheck size={14} className="text-[#12AD65] shrink-0" />
    <p className="text-[8px] font-medium uppercase tracking-tighter leading-none">
      {isAr ? "سيتم التواصل معك قريباً بواسطة خبير" : "Expert will contact you shortly"}
    </p>
  </div>

  {/* Submit Button */}
  <button 
    type="submit" 
    disabled={isPending}
    className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase text-[12px] tracking-widest hover:bg-[#12AD65] transition-all disabled:opacity-50 active:scale-95"
  >
    {isPending 
      ? (isAr ? "جاري الاتصال..." : "Connecting...") 
      : (isAr ? "تأكيد الطلب" : "Confirm Request")}
  </button>
</form>
  );
}