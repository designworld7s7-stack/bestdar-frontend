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
    <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
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
   <form onSubmit={handleSubmit} className="w-full space-y-4">
       {/* Ensure every hidden input has a VALUE and a NAME */}
      <input type="hidden" name="project_id" value={project?.property_ref || project?.id || ''} />
<input type="hidden" name="unit_id" value={unit?.unit_ref || unit?.id || ''} />
<input type="hidden" name="project_name" value={isAr ? project?.title_ar : project?.title_en} />

      {/* Unit Identification */}
      <div className="bg-gray-50 rounded-[22px] p-4 lg:p-8 flex justify-between items-center shadow-inner">
        <div>
          <span className="text-[8px] font-medium text-[#4B5563] uppercase tracking-tighter block mb-0.5">Unit ID</span>
          <span className="text-base lg:text-xl font-medium text-black">#{unit?.id}</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] font-medium text-[#4B5563] uppercase tracking-tighter block mb-0.5">Price</span>
          <span className="text-base lg:text-xl font-medium text-[#12AD65]">${unit?.price?.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <input 
        name="full_name" 
        required 
        placeholder="Full Name" 
        className="w-full p-4 bg-gray-50 rounded-xl"
      />
        
        <div className="flex w-full gap-2">
          <select name="country_code" className="bg-gray-50 border-0 rounded-xl px-2 text-[9px] font-medium shadow-sm outline-none w-[75px]">
            <option value="+964">+964</option>
            <option value="+971">+971</option>
            <option value="+90">+90</option>
          </select>
          <input 
        name="phone" 
        required 
        placeholder="Phone" 
        className="w-full p-4 bg-gray-50 rounded-xl"
      />
        </div>
      </div>

      <div className="flex items-center gap-3 text-[#4B5563] px-1">
        <ShieldCheck size={14} className="text-[#12AD65] shrink-0" />
        <p className="text-[8px] font-medium uppercase tracking-tighter leading-none">
          {isAr ? "سيتم التواصل معك قريباً" : "Expert will contact you shortly"}
        </p>
      </div>

     <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-black text-white py-4 rounded-xl disabled:opacity-50"
      >
        {isPending ? "Connecting..." : "Confirm Request"}
      </button>
    </form>
  );
}