'use client';

import React, { useState } from 'react';
import { X, Clock, Globe, ShieldCheck, MessageCircle, Check, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

export default function ConsultationModal({ lang, isOpen, onClose }: any) {
  // 1. ALL HOOKS MUST BE AT THE TOP
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(''); // Moved up

  const isAr = lang === 'ar';

  // 2. THE CONDITIONAL RETURN MUST BE BELOW THE HOOKS
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedCountry('');
      setSelectedDate('');
      setSelectedTime('');
    }, 300);
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[600] flex items-center justify-center p-4">
      {/* 1. Organized Container: Fixed height prevents "skyscraper" */}
      <div className="bg-white w-full max-w-[1000px] h-[90vh] lg:h-[700px] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row border-0">
        
        <button onClick={handleClose} className="absolute top-8 right-10 text-gray-300 hover:text-black z-20">
          <X size={24} />
        </button>

        {/* SIDEBAR: Match the style from ScheduleCallPage.png */}
        <div className="hidden lg:flex w-[320px] bg-[#F8F9FA] p-10 flex-col justify-between border-r border-gray-100">
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase tracking-tight">What to expect?</h4>
            <ul className="space-y-6">
              {[
                { icon: <Clock size={18}/>, text: "30-minute expert session" },
                { icon: <Globe size={18}/>, text: "Market analysis (Turkey/UAE)" },
                { icon: <ShieldCheck size={18}/>, text: "Personalized project matching" }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center text-[11px] font-bold text-gray-500">
                  <span className="text-[#12AD65]">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-4 text-center">Prefer WhatsApp?</p>
            <button className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
              <MessageCircle size={16} />
              Message Now
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-6 lg:p-12 flex flex-col overflow-y-auto lg:overflow-visible">
          
          {/* Progress Header: Organized */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className={clsx("flex items-center gap-2", step >= 1 ? "text-[#12AD65]" : "text-gray-300")}>
              <span className={clsx("w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black", step >= 1 ? "border-[#12AD65]" : "border-gray-200")}>1</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Select Time</span>
            </div>
            <div className="h-[1px] w-8 bg-gray-100" />
            <div className={clsx("flex items-center gap-2", step >= 2 ? "text-[#12AD65]" : "text-gray-300")}>
              <span className={clsx("w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black", step >= 2 ? "border-[#12AD65]" : "border-gray-200")}>2</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Your Details</span>
            </div>
          </div>

          {/* STEP 1: DATE & TIME */}
          {step === 1 && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-500">
              <div className="flex flex-col lg:flex-row gap-8 flex-1">
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Select Date</label>
                  <div className="space-y-2">
                    {['Friday, Dec 12', 'Saturday, Dec 13', 'Sunday, Dec 14', 'Monday, Dec 15'].map((date) => (
                      <button 
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={clsx(
                          "w-full text-left p-4 rounded-2xl text-xs font-bold transition-all border-0",
                          selectedDate === date ? "bg-[#12AD65] text-white shadow-lg shadow-[#12AD65]/20" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        )}
                      >{date}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Select Time</label>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '5:00 PM', '6:30 PM'].map((time) => (
                        <button 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={clsx(
                            "py-4 rounded-2xl text-[10px] font-black transition-all border-0 shadow-sm",
                            selectedTime === time ? "bg-black text-white" : "bg-gray-50 text-gray-400"
                          )}
                        >{time}</button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full bg-gray-50/50 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-100">
                       <Calendar className="text-gray-200 mb-2" size={32} />
                       <p className="text-[10px] font-bold text-gray-300 uppercase leading-relaxed">Choose date first</p>
                    </div>
                  )}
                </div>
              </div>
              <button 
                disabled={!selectedTime}
                onClick={() => setStep(2)}
                className="w-full bg-[#12AD65] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest mt-8 disabled:opacity-20 transition-all"
              >Continue</button>
            </div>
          )}

         {/* STEP 2: YOUR DETAILS */}
   
         {step === 2 && (
            <div className="flex-1 animate-in slide-in-from-right-4 duration-500 flex flex-col justify-center">
              <h2 className="text-2xl font-black mb-8 tracking-tighter uppercase text-center">Enter Details</h2>
              <div className="max-w-md mx-auto w-full space-y-4">
                <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                  <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">Full Name</span>
                  <input type="text" placeholder="John Doe" className="w-full bg-transparent border-0 p-0 text-sm font-bold focus:ring-0 outline-none" />
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                  <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">Email Address</span>
                  <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-0 p-0 text-sm font-bold focus:ring-0 outline-none" />
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                  <span className="text-[8px] font-black text-gray-400 uppercase block mb-1">WhatsApp Number</span>
                  <input type="tel" placeholder="+964 770 ..." className="w-full bg-transparent border-0 p-0 text-sm font-bold focus:ring-0 outline-none" />
                </div>
              

              {/* FUNCTIONAL COUNTRY SELECTION */}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-3 text-center mt-2">
                  {isAr ? "دولة الاهتمام" : "Country of Interest"}
                </label>
                <div className="flex gap-3">
                  {['Turkey', 'UAE'].map((country) => (
                    <button 
                      key={country} 
                      type="button"
                      onClick={() => setSelectedCountry(country)} // Set the state here
                      className={clsx(
                        "flex-1 py-4 rounded-2xl font-black text-[10px] uppercase transition-all tracking-widest shadow-sm border",
                        selectedCountry === country 
                          ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" // Active Style
                          : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100" // Inactive Style
                      )}
                    >
                      {isAr && country === 'Turkey' ? "تركيا" : isAr && country === 'UAE' ? "الإمارات" : country}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              disabled={!selectedCountry} // Button stays disabled until a country is picked
              onClick={() => setStep(3)}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest mt-10 shadow-2xl disabled:opacity-20 transition-all"
            >
              {isAr ? "تأكيد الموعد" : "Confirm Call"}
            </button>
            <button onClick={() => setStep(1)} className="w-full text-center text-gray-400 text-[10px] font-black uppercase mt-6 hover:text-black">
              {isAr ? "الرجوع لاختيار الوقت" : "Back to Time Selection"}
            </button>
          </div>
        )}

          {/* STEP 3: CONFIRMATION */}
          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-700">
              <div className="w-20 h-20 bg-[#12AD65] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-[#12AD65]/20">
                <Check size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase">Confirmed!</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-tight mb-2">{selectedDate} at {selectedTime}</p>
              <p className="text-gray-400 text-[11px] max-w-xs mx-auto leading-relaxed">Check your WhatsApp for the confirmation link and consultant details.</p>
              <button onClick={handleClose} className="mt-12 text-gray-400 text-[10px] font-black uppercase hover:text-black">Close Window</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}