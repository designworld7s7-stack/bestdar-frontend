'use client';

import React, { useState } from 'react';
import { X, Clock, Globe, ShieldCheck, MessageCircle, Check, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
// Connect to your new client file
import { createClient } from '@/utils/supabase/client';

export default function ConsultationModal({ lang, isOpen, onClose }: any) {
  // 1. ALL HOOKS MUST BE AT THE TOP
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // For boutique submission feel
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  
  // Details State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isAr = lang === 'ar';
  const supabase = createClient();

  // 2. THE CONDITIONAL RETURN MUST BE BELOW THE HOOKS
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedCountry('');
      setSelectedDate('');
      setSelectedTime('');
      setFullName('');
      setEmail('');
      setPhone('');
    }, 300);
  };
const generatedDays = Array.from({ length: 8 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  
  return {
    isoDate: date.toISOString().split('T')[0], // القيمة البرمجية: "2026-02-26" [cite: 2026-02-26]
    dayName: date.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { weekday: 'short' }), // "الخميس" أو "Thu" [cite: 2026-02-26]
    dayNumber: date.getDate(), // "26" [cite: 2026-02-26]
    monthName: date.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short' }) // "فبراير" أو "Feb" [cite: 2026-02-26]
  };
});
  const handleFinalSubmit = async () => {
  setLoading(true);

  // نرسل الـ selectedDate مباشرة لأنه أصبح يحتوي على الصيغة المطلوبة [cite: 2026-02-26]
  const { error } = await supabase
    .from('leads')
    .insert([{
      full_name: fullName,
      email: email,
      phone: phone,
      source: 'consultation',
      consultation_date: selectedDate, // سيرسل "2026-02-26" تلقائياً [cite: 2026-02-26]
      consultation_time: selectedTime,
      target_city: selectedCountry,
      country_code: selectedCountry === 'UAE' ? 'ae' : 'tr'
    }]);

  setLoading(false);
  if (!error) {
    setStep(3);
  } else {
    alert(isAr ? "خطأ: " + error.message : "Error: " + error.message);
  }
};
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[600] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[1000px] h-[90vh] lg:h-[700px] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row border-0">
        
        <button onClick={handleClose} className="absolute top-8 right-10 text-[#6B7280] hover:text-black z-20">
          <X size={24} />
        </button>

        {/* SIDEBAR */}
        <div className={`hidden lg:flex w-[320px] bg-[#F8F9FA] p-10 flex-col justify-between border-r border-gray-100`} dir={isAr ? "rtl" : "ltr"}>
  <div className="space-y-8">
    <h4 className="text-xl font-medium uppercase tracking-tight text-start">
      {isAr ? "ماذا تتوقع؟" : "What to expect?"}
    </h4>
    <ul className="space-y-6">
      {[
        { 
          icon: <Clock size={18}/>, 
          text: isAr ? "جلسة خبير لمدة ٣٠ دقيقة" : "30-minute expert session" 
        },
        { 
          icon: <Globe size={18}/>, 
          text: isAr ? "تحليل السوق (تركيا/الإمارات)" : "Market analysis (Turkey/UAE)" 
        },
        { 
          icon: <ShieldCheck size={18}/>, 
          text: isAr ? "ترشيح مشاريع مخصصة لك" : "Personalized project matching" 
        }
      ].map((item, i) => (
        <li key={i} className="flex gap-4 items-center text-[11px] font-medium text-gray-500">
          <span className="text-[#12AD65] shrink-0">{item.icon}</span>
          <span className="leading-relaxed">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* WhatsApp Section */}
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
    <p className="text-[12px] font-medium uppercase tracking-tighter text-[#6B7280] mb-4 text-center">
      {isAr ? "تفضل واتساب؟" : "Prefer WhatsApp?"}
    </p>
    <a 
      href="https://wa.me/9647759147343" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-full"
    >
      <button className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-medium text-[12px] uppercase tracking-tighter hover:scale-105 transition-all cursor-pointer">
        <MessageCircle size={16} />
        {isAr ? "راسلنا الآن" : "Message Now"}
      </button>
    </a>
  </div>
</div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-6 lg:p-12 flex flex-col overflow-y-auto lg:overflow-visible">
          
          {/* Progress Header */}
          <div className="flex items-center justify-center gap-4 mb-10" dir={isAr ? "rtl" : "ltr"}>
  {/* Step 1 */}
  <div className={clsx("flex items-center gap-2", step >= 1 ? "text-[#12AD65]" : "text-[#6B7280]")}>
    <span className={clsx("w-6 h-6 rounded-full border-2 flex items-center justify-center text-[12px] font-medium", step >= 1 ? "border-[#12AD65]" : "border-[#6B7280]")}>
      ١
    </span>
    <span className="text-[12px] font-medium uppercase tracking-tighter">
      {isAr ? "اختر الوقت" : "Select Time"}
    </span>
  </div>

  {/* Connecting Line */}
  <div className="h-[1px] w-8 bg-gray-100" />

  {/* Step 2 */}
  <div className={clsx("flex items-center gap-2", step >= 2 ? "text-[#12AD65]" : "text-[#6B7280]")}>
    <span className={clsx("w-6 h-6 rounded-full border-2 flex items-center justify-center text-[12px] font-medium", step >= 2 ? "border-[#12AD65]" : "border-[#6B7280]")}>
      ٢
    </span>
    <span className="text-[12px] font-medium uppercase tracking-tighter">
      {isAr ? "بياناتك" : "Your Details"}
    </span>
  </div>
</div>

      {/* STEP 1: DATE & TIME */}
{step === 1 && (
  <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="space-y-8 flex-1">
      
     {/* 📅 SECTION: SELECT DATE (Dynamic Grid) */}
<div className="w-full" dir={isAr ? "rtl" : "ltr"}>
  <label className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-5 px-1">
    {isAr ? "اختر اليوم" : "Select Date"}
  </label>
  
  <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
    {generatedDays.map((item) => {
      const isSelected = selectedDate === item.isoDate;
      return (
        <button 
          key={item.isoDate}
          type="button"
          onClick={() => setSelectedDate(item.isoDate)}
          className={clsx(
            "flex flex-col items-center justify-center p-4 rounded-[20px] transition-all duration-300 border",
            isSelected 
              ? "bg-[#12AD65] border-[#12AD65] shadow-lg shadow-[#12AD65]/30 scale-105" 
              : "bg-white border-gray-100 hover:border-[#12AD65]/30 hover:bg-gray-50"
          )}
        >
          {/* اسم اليوم (مترجم تلقائياً) */}
          <span className={clsx("text-[9px] uppercase font-bold mb-1", isSelected ? "text-white/70" : "text-gray-400")}>
            {item.dayName}
          </span>
          {/* رقم اليوم */}
          <span className={clsx("text-lg font-black leading-none", isSelected ? "text-white" : "text-black")}>
            {item.dayNumber}
          </span>
          {/* اسم الشهر (اختياري، يظهر في الموبايل أو عند الحاجة) */}
          <span className={clsx("text-[8px] mt-1 font-bold", isSelected ? "text-white/50" : "text-gray-300")}>
            {item.monthName}
          </span>
        </button>
      );
    })}
  </div>
</div>

      {/* ⏰ SECTION: SELECT TIME (Grouped Grid) */}
      <div className="w-full">
        <label className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block mb-5">
          {isAr ? "الوقت المتاح" : "Available Slots"}
        </label>
        
        {selectedDate ? (
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {['10:00 AM', '11:00 AM', '12:00 PM', '1:30 PM', '2:00 PM', '3:30 PM', '4:00 PM', '5:30 PM', '6:00 PM', '7:30 PM', '8:00 PM', '9:30 PM'].map((time) => (
              <button 
                key={time}
                onClick={() => setSelectedTime(time)}
                className={clsx(
                  "py-4 rounded-2xl text-[11px] font-extrabold transition-all border transition-all duration-300",
                  selectedTime === time 
                    ? "bg-black text-white border-black shadow-xl" 
                    : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        ) : (
          <div className="h-40 bg-gray-50/50 rounded-[32px] flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-100">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <Calendar className="text-[#12AD65]" size={20} />
             </div>
             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
               {isAr ? "الرجاء اختيار اليوم أولاً" : "Pick a date to see times"}
             </p>
          </div>
        )}
      </div>
    </div>

    {/* ACTION BUTTON */}
    <button 
      disabled={!selectedTime}
      onClick={() => setStep(2)}
      className="w-full bg-[#12AD65] text-white py-5 rounded-[24px] font-black text-[12px] uppercase tracking-[0.2em] mt-10 disabled:opacity-20 disabled:grayscale transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#12AD65]/20"
    >
      {isAr ? "متابعة" : "Continue"}
    </button>
  </div>
)}

          {/* STEP 2: YOUR DETAILS */}
         {step === 2 && (
  <div 
    className="flex-1 animate-in slide-in-from-right-4 duration-500 flex flex-col justify-center"
    dir={isAr ? "rtl" : "ltr"}
  >
    {/* Heading */}
    <h2 className="text-2xl font-medium mb-8 tracking-[0.1em] uppercase text-center">
      {isAr ? "أدخل التفاصيل" : "Enter Details"}
    </h2>

    <div className="max-w-md mx-auto w-full space-y-4">
      {/* 1. Full Name */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm text-start">
        <span className="text-[8px] font-medium text-[#4B5563] uppercase block mb-1">
          {isAr ? "الاسم الكامل" : "Full Name"}
        </span>
        <input 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text" 
          placeholder={isAr ? "أدخل اسمك هنا" : "John Doe"} 
          className="w-full bg-transparent border-0 p-0 text-sm font-medium focus:ring-0 outline-none text-black" 
        />
      </div>

      {/* 2. Email Address */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm text-start">
        <span className="text-[8px] font-medium text-[#4B5563] uppercase block mb-1">
          {isAr ? "البريد الإلكتروني" : "Email Address"}
        </span>
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" 
          dir="ltr"
          placeholder="john@example.com" 
          className="w-full bg-transparent border-0 p-0 text-sm font-medium focus:ring-0 outline-none text-black text-start" 
        />
      </div>

      {/* 3. WhatsApp Number */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm text-start">
        <span className="text-[8px] font-medium text-[#4B5563] uppercase block mb-1">
          {isAr ? "رقم الواتساب" : "WhatsApp Number"}
        </span>
        <input 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel" 
          dir="ltr"
          placeholder="+964 770 ..." 
          className="w-full bg-transparent border-0 p-0 text-sm font-medium focus:ring-0 outline-none text-black text-start" 
        />
      </div>
                
                <div>
                  <label className="text-[9px] font-medium uppercase tracking-tighter text-[#4B5563] block mb-3 text-center mt-2">
                    {isAr ? "دولة الاهتمام" : "Country of Interest"}
                  </label>
                  <div className="flex gap-3">
                    {['Turkey', 'UAE'].map((country) => (
                      <button 
                        key={country} 
                        type="button"
                        onClick={() => setSelectedCountry(country)}
                        className={clsx(
                          "flex-1 py-4 rounded-2xl font-medium text-[12px] uppercase transition-all tracking-tighter shadow-sm border",
                          selectedCountry === country 
                            ? "bg-[#12AD65]/10 border-[#12AD65] text-[#12AD65]" 
                            : "bg-gray-50 border-transparent text-[#4B5563] hover:bg-gray-100"
                        )}
                      >
                        {isAr && country === 'Turkey' ? "تركيا" : isAr && country === 'UAE' ? "الإمارات" : country}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                disabled={!selectedCountry || !fullName || !phone || loading}
                onClick={handleFinalSubmit} // Triggers the Supabase insert
                className="w-full bg-black text-white py-5 rounded-2xl font-medium text-[11px] uppercase tracking-tighter mt-10 shadow-2xl disabled:opacity-20 transition-all flex items-center justify-center gap-3"
              >
                {loading ? (isAr ? "جاري التأكيد..." : "Confirming...") : (isAr ? "تأكيد الموعد" : "Confirm Call")}
              </button>
              
              {!loading && (
                <button onClick={() => setStep(1)} className="w-full text-center text-[#4B5563] text-[12px] font-medium uppercase mt-6 hover:text-black">
                  {isAr ? "الرجوع لاختيار الوقت" : "Back to Time Selection"}
                </button>
              )}
            </div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {step === 3 && (
  <div 
    className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-700"
    dir={isAr ? "rtl" : "ltr"}
  >
    {/* Success Icon */}
    <div className="w-20 h-20 bg-[#12AD65] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-[#12AD65]/20">
      <Check size={40} className="text-white" />
    </div>

    {/* Confirmed Header */}
    <h2 className="text-3xl font-medium mb-4 uppercase">
      {isAr ? "تم التأكيد!" : "Confirmed!"}
    </h2>

    {/* Date & Time Display */}
    <p className="text-[#4B5563] text-xs font-medium uppercase tracking-tight mb-2">
      {/* عرض التاريخ بصيغة مقروءة بناءً على اللغة [cite: 2026-02-26] */}
      {isAr 
        ? `${new Date(selectedDate).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })} في تمام الساعة ${selectedTime}`
        : `${new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at ${selectedTime}`
      }
    </p>

    {/* Information Text */}
    <p className="text-[#4B5563] text-[11px] max-w-xs mx-auto leading-relaxed">
      {isAr 
        ? "يرجى التحقق من تطبيق واتساب للحصول على رابط التأكيد وتفاصيل المستشار الخاص بك." 
        : "Check your WhatsApp for the confirmation link and consultant details."}
    </p>

    {/* Close Button */}
    <button 
      onClick={handleClose} 
      className="mt-12 text-[#4B5563] text-[12px] font-medium uppercase hover:text-black transition-colors"
    >
      {isAr ? "إغلاق النافذة" : "Close Window"}
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );
}