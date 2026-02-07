'use client';

import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function InterestedModal({ lang, isOpen, onClose }: any) {
  const [step, setStep] = useState(1);
  const isAr = lang === 'ar';

  // State to carry first-step data to the second step
  const [selections, setSelections] = useState({
    timing: '',
    payment: '',
    status: ''
  });
// THE FIX: Reset the modal state when closing
  const handleClose = () => {
    onClose(); // Close the modal first
    // Small timeout to wait for the closing animation before resetting
    setTimeout(() => {
      setStep(1);
      setSelections({ timing: '', payment: '', status: '' });
    }, 300); 
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[500] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[480px] rounded-[32px] shadow-2xl relative overflow-hidden transition-all duration-300">
        
        {/* Close Button */}
       <button onClick={handleClose} className="absolute top-6 right-8 text-gray-300 hover:text-black z-10">
          <X size={20} />
        </button>

        <div className="p-8 lg:p-10">
          
          {/* STEP 1: NEEDS DISCOVERY */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-black mb-2">Let’s Understand Your Needs</h2>
                <p className="text-gray-400 text-[11px] leading-relaxed">Answer 3 quick questions so we can give you accurate details.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Planning to buy?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Ready now', '1–3 months', '3–6 months', 'Just exploring'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelections({...selections, timing: opt})}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all",
                          selections.timing === opt ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
                        )}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Prefer to pay?</label>
                  <div className="flex gap-2">
                    {['Cash', 'Installments', 'Not sure'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelections({...selections, payment: opt})}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all",
                          selections.payment === opt ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
                        )}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Documents status?</label>
                  <div className="flex gap-2">
                    {['Ready', 'Need help', 'Not sure'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelections({...selections, status: opt})}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all",
                          selections.status === opt ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
                        )}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
               <button onClick={handleClose} className="text-gray-400 text-[10px] font-black uppercase">
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button 
                  disabled={!selections.timing || !selections.payment || !selections.status}
                  onClick={() => setStep(2)}
                  className="bg-gray-100 disabled:opacity-30 text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                  {isAr ? "متابعة" : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INFO WITH CARRIED ANSWERS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-black mb-1">Almost Done</h2>
                <p className="text-gray-400 text-[10px]">We respond in under 10 minutes.</p>
              </div>

              {/* Carried Answers Visual Pills */}
              <div className="flex flex-wrap justify-center gap-2 py-2">
                {[selections.timing, selections.payment, selections.status].map((s) => (
                  <div key={s} className="px-3 py-1.5 bg-[#12AD65]/5 border border-[#12AD65]/20 rounded-full flex items-center gap-2">
                    <CheckCircle2 size={10} className="text-[#12AD65]" />
                    <span className="text-[9px] font-bold text-[#12AD65]">{s}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                  <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">Full Name</span>
                  <input type="text" placeholder="Enter name" className="w-full bg-transparent border-0 p-0 text-xs font-bold focus:ring-0 outline-none" />
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                  <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">WhatsApp</span>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-gray-400">+964</span>
                    <input type="tel" placeholder="750 000 0000" className="w-full bg-transparent border-0 p-0 text-xs font-bold focus:ring-0 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                    <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">Email (Optional)</span>
                    <input type="email" placeholder="email@example.com" className="w-full bg-transparent border-0 p-0 text-xs font-bold focus:ring-0 outline-none" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                    <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">Preferred Time</span>
                    <input type="text" placeholder="e.g. Morning" className="w-full bg-transparent border-0 p-0 text-xs font-bold focus:ring-0 outline-none" />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(3)}
                className="w-full bg-[#12AD65] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#12AD65]/20"
              >Send Request</button>
            </div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#12AD65] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#12AD65]/20">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-black mb-3">Thank you!</h2>
              <p className="text-gray-400 text-xs leading-relaxed mb-10 px-6">Our consultant will contact you via WhatsApp shortly with matching offers.</p>
             <button onClick={handleClose} className="text-gray-400 text-[10px] font-black uppercase hover:text-black">
                {isAr ? "إغلاق" : "Close"}
              </button>
              </div>
          )}

        </div>
      </div>
    </div>
  );
}