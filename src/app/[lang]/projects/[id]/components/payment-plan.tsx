'use client';

import React from 'react';
import { CreditCard, Wallet, Calendar, Info, Landmark, Check, MessageCircle } from 'lucide-react';

export default function PaymentPlan({ lang, activeUnit, isGated, onInterestClick }: any) {
  const isAr = lang === 'ar'; // Keep this one

  if (!activeUnit || !activeUnit.price) return null;

  const price = activeUnit.price;
  // REMOVED: const isAr = lang === 'ar'; <--- This was the cause of the error

  return (
    <section className={`py-24 px-4 lg:px-12 bg-[#050505] rounded-[40px] lg:rounded-[60px] mx-4 lg:mx-12 shadow-2xl relative z-10 transition-all duration-700 ${isGated ? 'blur-2xl' : 'blur-0'}`}>
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h3 className="text-white text-3xl lg:text-5xl font-black uppercase tracking-widest mb-4">
            {isAr ? "خطة الدفع الذكية" : "Smart Payment Vault"}
          </h3>
          <p className="text-[#12AD65] text-xs font-black uppercase tracking-[0.4em]">
            {isAr ? "حسابات مخصصة للوحدة" : "Tailored for Unit"} #{activeUnit.id} — ${price.toLocaleString()}
          </p>
        </div>

        {/* 1. Monthly Installment Layout */}
        {activeUnit.planType === 'monthly' && (
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white/5 border border-white/10 p-10 lg:p-14 rounded-[40px] backdrop-blur-xl">
              <CreditCard size={32} className="text-[#12AD65] mb-10" />
              <div className="space-y-10">
                <div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Down Payment (30%)</span>
                  <span className="text-4xl lg:text-5xl text-white font-black">${(price * 0.3).toLocaleString()}</span>
                </div>
                <div className="h-[1px] bg-white/10 w-full" />
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Monthly Payment</span>
                  <span className="text-4xl lg:text-5xl text-[#12AD65] font-black">${Math.round((price * 0.7) / 24).toLocaleString()}</span>
                  <span className="text-[10px] text-gray-500 block mt-2 tracking-widest uppercase">For 24 Months</span>
                </div>
              </div>
            </div>
            <div className="space-y-8 lg:pl-10 text-gray-400">
               <h4 className="text-white text-xl font-black uppercase tracking-tighter">Installment Advantage</h4>
               <p className="text-sm leading-relaxed">Secure this property with zero-interest monthly payments directly to the developer.</p>
               <button 
                 onClick={() => onInterestClick()} 
                 className="w-full bg-[#12AD65] text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-[#12AD65]/20 hover:bg-white hover:text-black transition-all"
               >
                 {isAr ? "طلب حجز الوحدة" : "Request Unit Reservation"}
               </button>
            </div>
          </div>
        )}

        {/* 2. Construction Milestones Layout */}
        {activeUnit.planType === 'milestone' && (
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="grid lg:grid-cols-4 gap-6">
              {[
                { label: 'Booking', pct: '10%', icon: <Wallet size={20}/> },
                { label: 'Foundation', pct: '20%', icon: <Landmark size={20}/> },
                { label: 'Structure', pct: '20%', icon: <Calendar size={20}/> },
                { label: 'Completion', pct: '50%', icon: <Check size={20}/> }
              ].map((m, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 flex flex-col justify-between h-48">
                  <div className="text-[#12AD65]">{m.icon}</div>
                  <div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">{m.label}</span>
                    <span className="text-2xl text-white font-black">{m.pct}</span>
                    <span className="text-[10px] text-gray-400 block mt-1">${(price * (parseInt(m.pct)/100)).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => onInterestClick()} 
                className="w-full max-w-md bg-[#12AD65] text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-[#12AD65]/20 hover:bg-white hover:text-black transition-all"
              >
                {isAr ? "طلب حجز خطة المعالم" : "Reserve Milestone Plan"}
              </button>
            </div>
          </div>
        )}

        {/* 3. Cash Only Layout */}
        {activeUnit.planType === 'cash' && (
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-12 lg:p-20 rounded-[40px] text-center">
            <div className="w-20 h-20 bg-[#12AD65]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Wallet size={40} className="text-[#12AD65]" />
            </div>
            <h4 className="text-white text-3xl font-black uppercase mb-4 tracking-tighter">Cash Special Offer</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-md mx-auto">
              Enjoy an exclusive 10% discount for full cash payment on this unit.
            </p>
            <div className="text-5xl text-[#12AD65] font-black mb-10">
              ${(price * 0.9).toLocaleString()}
            </div>
            <a 
              href={`https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(
                isAr 
                ? `مرحباً، أنا مهتم بعرض الكاش للوحدة رقم ${activeUnit.id}` 
                : `Hi, I am interested in the Cash Offer for Unit #${activeUnit.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#25D366] transition-all"
            >
              <MessageCircle size={18} />
              {isAr ? "تواصل عبر واتساب" : "Contact on WhatsApp"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}