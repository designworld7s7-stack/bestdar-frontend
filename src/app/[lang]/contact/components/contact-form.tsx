'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client'; // Using the verified client path

export default function ContactForm({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const supabase = createClient();

  // Form State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('leads')
      .insert([{
        ...formData,
        source: 'contact_page', // Identifying the lead source
      }]);

    setLoading(false);
    if (!error) {
      setSuccess(true);
      setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      alert(isAr ? "حدث خطأ ما. يرجى المحاولة لاحقاً." : "Something went wrong. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="bg-white p-12 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[500px]">
        <CheckCircle2 size={64} className="text-[#12AD65] mb-6" />
        <h2 className="text-3xl font-bold text-black mb-4">
          {isAr ? "شكراً لتواصلك معنا" : "Thank You for Reaching Out"}
        </h2>
        <p className="text-gray-500 max-w-sm">
          {isAr ? "لقد استلمنا رسالتك وسنقوم بالرد عليك في أقرب وقت ممكن." : "We have received your message and will get back to you as soon as possible."}
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-8 text-sm font-bold uppercase tracking-widest text-[#12AD65] hover:text-black transition-colors"
        >
          {isAr ? "إرسال رسالة أخرى" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label={isAr ? "الاسم الكامل" : "Full Name"} 
            placeholder="John Doe" 
            required
            value={formData.full_name}
            onChange={(val: string) => setFormData({...formData, full_name: val})}
          />
          <InputField 
            label={isAr ? "البريد الإلكتروني" : "Email Address"} 
            placeholder="john@example.com" 
            type="email" 
            required
            value={formData.email}
            onChange={(val: string) => setFormData({...formData, email: val})}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label={isAr ? "رقم الهاتف (اختياري)" : "Phone Number (Optional)"} 
            placeholder="+964 ..." 
            value={formData.phone}
            onChange={(val: string) => setFormData({...formData, phone: val})}
          />
          <InputField 
            label={isAr ? "الموضوع" : "Subject"} 
            placeholder={isAr ? "استفسار استثماري" : "Investment Inquiry"} 
            value={formData.subject}
            onChange={(val: string) => setFormData({...formData, subject: val})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter ml-1">
            {isAr ? "الرسالة" : "Message"}
          </label>
          <textarea 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={5}
            className="w-full bg-[#F8F9FA] rounded-2xl p-5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#12AD65]/20 transition-all border-none text-black"
            placeholder={isAr ? "كيف يمكننا مساعدتك اليوم؟" : "How can we help you today?"}
          />
        </div>

        <button 
          disabled={loading}
          className="w-full btn-brand py-5 rounded-2xl font-medium text-sm uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-[#0f8f53] transition-all shadow-lg shadow-[#12AD65]/20 group disabled:opacity-50"
        >
          {loading ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال الرسالة" : "Send Message")}
          {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
        </button>
      </form>
    </div>
  );
}

function InputField({ label, placeholder, type = "text", required, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter ml-1">{label}</label>
      <input 
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#F8F9FA] rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#12AD65]/20 transition-all border-none text-black"
      />
    </div>
  );
}