'use client';

import React from 'react';
import { Calendar, ArrowRight, MessageCircle, Wallet } from 'lucide-react';

export default function PaymentPlan({ lang, activeUnit, isGated, onInterestClick }: any) {
  const isAr = lang === 'ar';

  const price = activeUnit?.price || 0;
  const dpPct = activeUnit?.down_payment_pct || 0; 
  const months = activeUnit?.installment_months || 0; 
  const isCashOnly = months === 0;

  // Adaptive Math
  const downPaymentAmount = price * (dpPct / 100);
  const installmentTotalPct = activeUnit?.installment_total_pct || 60;
  const monthlyPayment = months > 0 ? (price * (installmentTotalPct / 100)) / months : 0;

  return (
    <section className={`w-full max-w-[1440px] mx-auto mb-16 px-4 lg:px-12 transition-all duration-700 ${isGated ? 'blur-2xl' : 'blur-0'}`}>
      <div className="bg-[#050505] rounded-[32px] lg:rounded-[48px] p-8 lg:p-16 shadow-2xl relative border border-white/5">
        
        {/* Professional Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h3 className="text-white text-2xl lg:text-4xl font-bold uppercase tracking-tight mb-3">
            {isAr ? "خطة الدفع الذكية" : "Smart Payment Vault"}
          </h3>
          <p className="text-[#12AD65] text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.2em]">
             #{activeUnit?.id || '---'} — ${price.toLocaleString()}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 mb-8">
            
            {/* LEFT SIDE: Adaptive Card */}
            <div className="bg-[#111] border border-white/10 p-8 lg:p-10 rounded-[24px] lg:rounded-[32px] flex flex-col justify-center min-h-[220px]">
              {isCashOnly ? (
                /* CLEAN CASH CARD */
                <div className="text-left">
                  <div className="w-10 h-10 bg-[#12AD65]/10 rounded-xl flex items-center justify-center mb-6">
                    <Wallet className="text-[#12AD65]" size={20} />
                  </div>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">
                    {isAr ? "طريقة الدفع" : "Payment Method"}
                  </span>
                  <span className="text-3xl lg:text-4xl text-white font-medium tracking-tight uppercase">
                    {isAr ? "نقداً بالكامل" : "100% Full Cash"}
                  </span>
                  <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-tighter">
                    {isAr ? "خصومات حصرية للدفع النقدي" : "Instant cash payment discounts available"}
                  </p>
                </div>
              ) : (
                /* CALCULATOR */
                <>
                  {dpPct > 0 && (
                    <div className="mb-8">
                      <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-2">
                        {isAr ? "الدفعة الأولى" : "Down Payment"} ({dpPct}%)
                      </span>
                      <span className="text-3xl lg:text-4xl text-white font-medium tracking-tight">${downPaymentAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#12AD65] text-[10px] uppercase tracking-widest block mb-2">{isAr ? "القسط الشهري" : "Monthly Installment"}</span>
                    <span className="text-3xl lg:text-4xl text-[#12AD65] font-medium tracking-tight">${Math.round(monthlyPayment).toLocaleString()}</span>
                    <span className="text-gray-500 text-[10px] uppercase block mt-2">{months} {isAr ? "شهراً" : "Months"}</span>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT SIDE: Milestones */}
            <div className="bg-[#111] border border-white/10 p-8 lg:p-10 rounded-[24px] lg:rounded-[32px]">
               <h4 className="text-white text-[11px] font-bold uppercase mb-6 flex items-center gap-2 tracking-widest">
                 <Calendar size={14} className="text-[#12AD65]" />
                 {isAr ? "الجدول الزمني" : "Schedule Milestones"}
               </h4>
               <div className="text-gray-300 text-sm lg:text-base whitespace-pre-line leading-relaxed">
                 {activeUnit?.payment_milestones || (isAr ? "تواصل معنا للحصول على التفاصيل" : "Contact us for schedule details.")}
               </div>
            </div>
          </div>

         {/* ACTION BUTTON: Only one version will show at a time */}
<div className="w-full">
  {isCashOnly ? (
    /* 1. WHATSAPP VERSION (For Property #6 / Cash) */
    <a 
      href={`https://wa.me/YOUR_NUMBER?text=I am interested in the Cash Offer for ${activeUnit?.property_ref || activeUnit?.id}`} 
      target="_blank"
      className="w-full bg-[#12AD65] hover:bg-[#0f8e52] text-white py-5 rounded-xl lg:rounded-2xl font-bold text-[11px] lg:text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all"
    >
      <MessageCircle size={18} />
      {isAr ? "تواصل عبر واتساب" : "WhatsApp"}
    </a>
  ) : (
    /* 2. RESERVATION VERSION (For Installment Plans) */
    <button 
      onClick={onInterestClick}
      className="w-full bg-[#12AD65] hover:bg-[#0f8e52] text-white py-5 rounded-xl lg:rounded-2xl font-bold text-[11px] lg:text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
    >
      {isAr ? "طلب حجز الوحدة" : "Request Unit Reservation"}
      <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
    </button>
  )}
</div>
        </div>
      </div>
    </section>
  );
}