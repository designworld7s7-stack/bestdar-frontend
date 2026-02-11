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
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-medium mb-2">{isAr ? "لنستوعب احتياجاتك" : "Let’s Understand Your Needs"}</h2>
                <p className="text-[#4B5563] text-[11px] leading-relaxed">
                  {isAr ? "أجب على 3 أسئلة سريعة لنعطيك تفاصيل دقيقة" : "Answer 3 quick questions so we can give you accurate details."}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[12px] font-medium uppercase tracking-tighter block mb-3">Planning to buy?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Ready now', '1–3 months', '3–6 months', 'Just exploring'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelections({...selections, timing: opt})}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-[12px] font-bold border transition-all",
                          selections.timing === opt ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
                        )}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium uppercase tracking-tighter block mb-3">Prefer to pay?</label>
                  <div className="flex gap-2">
                    {['Cash', 'Installments', 'Not sure'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelections({...selections, payment: opt})}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-[12px] font-medium border transition-all",
                          selections.payment === opt ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
                        )}
                      >{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-medium uppercase tracking-tighter block mb-3">Documents status?</label>
                  <div className="flex gap-2">
                    {['Ready', 'Need help', 'Not sure'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelections({...selections, status: opt})}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-[12px] font-bold border transition-all",
                          selections.status === opt ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" : "bg-gray-50 border-transparent text-gray-500"
                        )}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button onClick={handleClose} className="text-[12px] font-medium uppercase">{isAr ? "إلغاء" : "Cancel"}</button>
                <button 
                  disabled={!selections.timing || !selections.payment || !selections.status}
                  onClick={() => setStep(2)}
                  className="bg-gray-100 disabled:opacity-30 text-black px-8 py-4 rounded-2xl font-medium text-[12px] uppercase tracking-tighter"
                >
                  {isAr ? "متابعة" : "Continue"}
                </button>
              </div>
            </div>
          )}

         
         {/* STEP 2: INFO FORM */}
{step === 2 && (
  <form action={handleAction} className="space-y-6">
    {/* BRIDGE DATA FROM STEP 1 */}
    <input type="hidden" name="planning_timeline" value={selections.timing} />
    <input type="hidden" name="payment_preference" value={selections.payment} />
    <input type="hidden" name="document_status" value={selections.status} />
    
    {/* SOURCE IDENTIFIER */}
    <input type="hidden" name="source" value="interested_modal" />
    <input type="hidden" name="project_id" value={project?.id} />

              {/* Pills Visualization */}
              <div className="flex flex-wrap justify-center gap-2 py-2">
               {[selections.timing, selections.payment, selections.status].map((s, index) => (
                  <div key={`${s}-${index}`}  className="px-3 py-1.5 bg-[#12AD65]/5 border border-[#12AD65]/20 rounded-full flex items-center gap-2">
                    <CheckCircle2 size={10} className="text-[#12AD65]" />
                    <span className="text-[9px] font-bold text-[#12AD65]">{s}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                  <span className="text-[8px] font-medium uppercase block mb-1">Full Name</span>
                  <input name="full_name" type="text" placeholder="Enter name" required className="w-full bg-transparent border-0 p-0 text-xs font-bold focus:ring-0 outline-none" />
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                  <span className="text-[8px] font-medium uppercase block mb-1">WhatsApp / Phone</span>
                  <input name="phone" type="tel" placeholder="+964..." required className="w-full bg-transparent border-0 p-0 text-xs font-medium focus:ring-0 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                    <span className="text-[8px] font-medium uppercase block mb-1">Email (Optional)</span>
                    <input name="email" type="email" placeholder="email@example.com" className="w-full bg-transparent border-0 p-0 text-xs font-medium focus:ring-0 outline-none" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 shadow-sm">
                    <span className="text-[8px] font-medium uppercase block mb-1">Preferred Time</span>
                    <input name="preferred_time" type="text" placeholder="e.g. Morning" className="w-full bg-transparent border-0 p-0 text-xs font-medium focus:ring-0 outline-none" />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#12AD65] text-white py-5 rounded-2xl font-medium text-[12px] uppercase tracking-tighter shadow-xl shadow-[#12AD65]/20 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الطلب" : "Send Request")}
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