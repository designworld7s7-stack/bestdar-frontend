'use client';

import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { submitLead } from '@/app/actions/leads'; // Your Server Action

export default function InterestedModal({ lang, isOpen, onClose, project }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const isAr = lang === 'ar';

  const [selections, setSelections] = useState({
    timing: '',
    payment: '',
    status: ''
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelections({ timing: '', payment: '', status: '' });
      setLoading(false);
    }, 300); 
  };

  // Logic to handle form submission via Server Action
  async function handleAction(formData: FormData) {
    setLoading(true);
    const result = await submitLead(formData);
    
    if (result.success) {
      setStep(3); // Move to Success Step
    } else {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[500] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl relative overflow-hidden transition-all duration-300">
        
        <button onClick={handleClose} className="absolute top-6 right-8 text-[#6B7280] hover:text-black z-10">
          <X size={20} />
        </button>

        <div className="p-8 lg:p-10">
          
          {/* STEP 1: NEEDS DISCOVERY */}
{step === 1 && (
  <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
    <div className="text-center">
      <h2 className="text-xl font-medium mb-2">
        {isAr ? "لنستوعب احتياجاتك" : "Let’s Understand Your Needs"}
      </h2>
      <p className="text-[#4B5563] text-[11px] leading-relaxed">
        {isAr ? "أجب على 3 أسئلة سريعة لنعطيك تفاصيل دقيقة" : "Answer 3 quick questions so we can give you accurate details."}
      </p>
    </div>

    <div className="space-y-6">
      {/* 1. التوقيت - Timing */}
      <div>
        <label className="text-[12px] font-medium uppercase tracking-tighter block mb-3">
          {isAr ? "متى تخطط للشراء؟" : "Planning to buy?"}
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'Ready now', label: isAr ? 'جاهز الآن' : 'Ready now' },
            { id: '1–3 months', label: isAr ? '١–٣ أشهر' : '1–3 months' },
            { id: '3–6 months', label: isAr ? '٣–٦ أشهر' : '3–6 months' },
            { id: 'Just exploring', label: isAr ? 'أستطلع فقط' : 'Just exploring' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelections({...selections, timing: opt.id})}
              className={clsx(
                "px-4 py-2.5 rounded-full text-[12px] font-bold border transition-all",
                selections.timing === opt.id ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. طريقة الدفع - Payment */}
      <div>
        <label className="text-[12px] font-medium uppercase tracking-tighter block mb-3">
          {isAr ? "طريقة الدفع المفضلة؟" : "Prefer to pay?"}
        </label>
        <div className="flex gap-2">
          {[
            { id: 'Cash', label: isAr ? 'كاش' : 'Cash' },
            { id: 'Installments', label: isAr ? 'تقسيط' : 'Installments' },
            { id: 'Not sure', label: isAr ? 'غير متأكد' : 'Not sure' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelections({...selections, payment: opt.id})}
              className={clsx(
                "px-4 py-2.5 rounded-full text-[12px] font-medium border transition-all",
                selections.payment === opt.id ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. حالة الأوراق - Documents */}
      <div>
        <label className="text-[12px] font-medium uppercase tracking-tighter block mb-3">
          {isAr ? "حالة الأوراق الثبوتية؟" : "Documents status?"}
        </label>
        <div className="flex gap-2">
          {[
            { id: 'Ready', label: isAr ? 'جاهزة' : 'Ready' },
            { id: 'Need help', label: isAr ? 'أحتاج مساعدة' : 'Need help' },
            { id: 'Not sure', label: isAr ? 'غير متأكد' : 'Not sure' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelections({...selections, status: opt.id})}
              className={clsx(
                "px-4 py-2.5 rounded-full text-[12px] font-bold border transition-all",
                selections.status === opt.id ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Buttons Footer */}
    <div className={`flex justify-between items-center pt-4 ${isAr ? 'flex-row-reverse' : ''}`}>
      <button onClick={handleClose} className="text-[12px] font-medium uppercase text-gray-400 hover:text-black transition-colors">
        {isAr ? "إلغاء" : "Cancel"}
      </button>
      <button 
        disabled={!selections.timing || !selections.payment || !selections.status}
        onClick={() => setStep(2)}
        className="bg-black text-white px-10 py-4 rounded-2xl font-bold text-[12px] uppercase tracking-tight hover:bg-[#12AD65] transition-all disabled:opacity-20"
      >
        {isAr ? "متابعة" : "Continue"}
      </button>
    </div>
  </div>
)}
         
         {/* STEP 2: INFO FORM */}
{step === 2 && (
  <form action={handleAction} className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
    {/* BRIDGE DATA FROM STEP 1 - تبقى بالإنجليزية للسيستم [cite: 2026-02-26] */}
    <input type="hidden" name="planning_timeline" value={selections.timing} />
    <input type="hidden" name="payment_preference" value={selections.payment} />
    <input type="hidden" name="document_status" value={selections.status} />
    
    <input type="hidden" name="source" value="interested_modal" />
    <input type="hidden" name="project_id" value={project?.id} />

    {/* Pills Visualization - ترجمة الاختيارات السابقة للعرض فقط [cite: 2026-02-26] */}
    <div className="flex flex-wrap justify-center gap-2 py-2">
      {[
        { val: selections.timing, map: { 'Ready now': 'جاهز الآن', '1–3 months': '١–٣ أشهر', '3–6 months': '٣–٦ أشهر', 'Just exploring': 'أستطلع فقط' } },
        { val: selections.payment, map: { 'Cash': 'كاش', 'Installments': 'تقسيط', 'Not sure': 'غير متأكد' } },
        { val: selections.status, map: { 'Ready': 'جاهزة', 'Need help': 'أحتاج مساعدة', 'Not sure': 'غير متأكد' } }
      ].map((item, index) => {
        // نختار الترجمة العربية أو القيمة الإنجليزية بناءً على اللغة الحالية [cite: 2026-02-26]
        const displayLabel = isAr ? (item.map as any)[item.val] : item.val;
        return (
          <div key={index} className="px-3 py-1.5 bg-[#12AD65]/5 border border-[#12AD65]/20 rounded-full flex items-center gap-2">
            <CheckCircle2 size={10} className="text-[#12AD65]" />
            <span className="text-[9px] font-bold text-[#12AD65]">{displayLabel}</span>
          </div>
        );
      })}
    </div>

    <div className="space-y-3">
      {/* Full Name */}
      <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-start">
        <span className="text-[8px] font-medium uppercase block mb-1">
          {isAr ? "الاسم الكامل" : "Full Name"}
        </span>
        <input 
          name="full_name" 
          type="text" 
          placeholder={isAr ? "أدخل الاسم هنا" : "Enter name"} 
          required 
          className="w-full bg-transparent border-0 p-0 text-xs font-bold focus:ring-0 outline-none" 
        />
      </div>

      {/* Phone - جعلنا اتجاهه دائماً LTR للأرقام [cite: 2026-02-26] */}
      <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-start">
        <span className="text-[8px] font-medium uppercase block mb-1">
          {isAr ? "واتساب / الهاتف" : "WhatsApp / Phone"}
        </span>
        <input 
          name="phone" 
          type="tel" 
          placeholder="+964..." 
          dir="ltr" 
          required 
          className="w-full bg-transparent border-0 p-0 text-xs font-medium focus:ring-0 outline-none text-start" 
        />
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-start">
          <span className="text-[8px] font-medium uppercase block mb-1">
            {isAr ? "البريد الإلكتروني (اختياري)" : "Email (Optional)"}
          </span>
          <input 
            name="email" 
            type="email" 
            placeholder="email@example.com" 
            dir="ltr"
            className="w-full bg-transparent border-0 p-0 text-xs font-medium focus:ring-0 outline-none text-start" 
          />
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 shadow-sm text-start">
          <span className="text-[8px] font-medium uppercase block mb-1">
            {isAr ? "الوقت المفضل للتواصل" : "Preferred Time"}
          </span>
          <input 
            name="preferred_time" 
            type="text" 
            placeholder={isAr ? "مثال: الصباح" : "e.g. Morning"} 
            className="w-full bg-transparent border-0 p-0 text-xs font-medium focus:ring-0 outline-none" 
          />
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <button 
      type="submit"
      disabled={loading}
      className="w-full bg-[#12AD65] text-white py-5 rounded-2xl font-medium text-[12px] uppercase tracking-tighter shadow-xl shadow-[#12AD65]/20 hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الطلب الآن" : "Send Request")}
    </button>
  </form>
)}

          {/* STEP 3: CONFIRMATION */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#12AD65] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#12AD65]/20">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-medium mb-3">{isAr ? "شكراً لك!" : "Thank you!"}</h2>
              <p className="text-[#4B5563] text-xs leading-relaxed mb-10 px-6">
                {isAr ? "سيتصل بك مستشارنا عبر WhatsApp قريباً." : "Our consultant will contact you via WhatsApp shortly with matching offers."}
              </p>
              <button onClick={handleClose} className="text-[#4B5563] text-[12px] font-medium uppercase hover:text-black">
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}