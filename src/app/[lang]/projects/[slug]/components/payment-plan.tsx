'use client';

import React from 'react';
import { Calendar, ArrowRight, MessageCircle, Wallet, Lock as LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentPlan({ lang, activeUnit, isGated, onInterestClick }: any) {
  const isAr = lang === 'ar';
  const router = useRouter();

  const price = activeUnit?.price || 0;
  const dpPct = activeUnit?.down_payment_pct || 0; 
  const months = activeUnit?.installment_months || 0; 
  const isCashOnly = months === 0;

  const downPaymentAmount = price * (dpPct / 100);
  const installmentTotalPct = activeUnit?.installment_total_pct || 60;
  const monthlyPayment = months > 0 ? (price * (installmentTotalPct / 100)) / months : 0;
console.log("🛠️ CHECK 2 - Active Unit in Vault:", activeUnit);
  return (
    <section className="w-full max-w-[1440px] mx-auto mb-16 px-4 lg:px-12">
      <div className="bg-[#050505] rounded-[32px] lg:rounded-[48px] shadow-2xl relative group border border-white/5 overflow-hidden">
        
        {/* 1. Vault Lock Overlay */}
        {isGated && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center border border-white/10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#12AD65]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="h-16 w-16 bg-[#12AD65] rounded-full shadow-[0_0_40px_rgba(18,173,101,0.4)] flex items-center justify-center text-white mb-6 mx-auto animate-pulse">
                <LockIcon size={30} />
              </div>
              <h4 className="text-white text-xl lg:text-3xl font-bold uppercase tracking-tight mb-3">
                {isAr ? "الخزنة الذكية مقفلة" : "Vault Access Restricted"}
              </h4>
              <p className="text-gray-400 text-[12px] lg:text-sm mb-10 max-w-xs leading-relaxed mx-auto">
                {isAr 
                  ? "هذه التفاصيل المالية حصرية للأعضاء. سجل دخولك الآن لفتح حسابات الدفع الكاملة." 
                  : "These financial details are exclusive to members. Sign in to unlock the full payment breakdown."}
              </p>
              <button 
                onClick={() => router.push(`/${lang}/auth/signup`)}
                className="bg-[#12AD65] hover:bg-[#0f8e52] text-white px-12 py-4 rounded-2xl font-bold text-[11px] lg:text-[13px] uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-[0_10px_20px_rgba(18,173,101,0.2)]"
              >
                {isAr ? "سجل للمشاهدة" : "Unlock Now"}
              </button>
            </div>
          </div>
        )}

        {/* 2. Content Area */}
        <div className={`p-8 lg:p-16 transition-all duration-700 ${isGated ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
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
              {/* Left Side: Summary */}
              <div className="bg-[#111] border border-white/10 p-8 lg:p-10 rounded-[24px] lg:rounded-[32px] flex flex-col justify-center min-h-[220px]">
                {isCashOnly ? (
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
                  </div>
                ) : (
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

              {/* Right Side: Milestones (Connected to AR column) */}
             <div className="bg-[#111] border border-white/10 p-8 lg:p-10 rounded-[24px] lg:rounded-[32px]">
  <h4 className="text-white text-[11px] font-bold uppercase mb-6 flex items-center gap-2 tracking-widest">
    <Calendar size={14} className="text-[#12AD65]" />
    {isAr ? "الجدول الزمني للدفع" : "Payment Milestones"}
  </h4>
  
  <div className="text-gray-300 text-sm lg:text-base whitespace-pre-line leading-relaxed font-medium">
    {isAr ? (
      // المنطق العربي: الأولوية للميلستون ثم الملخص
      activeUnit?.payment_milestones_ar || 
      activeUnit?.payment_summary_ar || 
      activeUnit?.payment_milestones || // كخيار أخير إذا لم يوجد محتوى عربي
      "تواصل معنا للحصول على تفاصيل الجدول الزمني"
    ) : (
      // المنطق الإنجليزي
      activeUnit?.payment_milestones || 
      activeUnit?.payment_summary || 
      "Contact us for the detailed payment schedule."
    )}
  </div>
</div>
            </div>

            <div className="w-full">
              {isCashOnly ? (
                <a 
                  href={`https://wa.me/9647759147343?text=${encodeURIComponent("I am interested in this unit...")}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#12AD65] hover:bg-[#0f8e52] text-white py-5 rounded-xl lg:rounded-2xl font-bold text-[11px] flex items-center justify-center gap-3 transition-all"
                >
                  <MessageCircle size={18} />
                  {isAr ? "تواصل عبر واتساب" : "WhatsApp"}
                </a>
              ) : (
                <button 
                  onClick={onInterestClick}
                  className="w-full bg-[#12AD65] hover:bg-[#0f8e52] text-white py-5 rounded-xl lg:rounded-2xl font-bold text-[11px] flex items-center justify-center gap-3 transition-all"
                >
                  {isAr ? "طلب حجز الوحدة" : "Request Unit Reservation"}
                  <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}