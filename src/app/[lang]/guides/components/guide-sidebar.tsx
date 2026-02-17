'use client';

import React, { useState, useEffect } from 'react'; // أضف useEffect
import { Mail, ArrowRight } from 'lucide-react';
// المسار النسبي الصحيح بناءً على هيكلة مشروعك
import { createClient } from '../../../../utils/supabase/client'; 

export default function GuideSidebar({ lang }: { lang: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // إذا لم يكتمل التحميل، لا تعرض شيئاً أو اعرض هيكلاً بسيطاً
  if (!mounted) return null;
  const isAr = lang === 'ar';
  const supabase = createClient(); 

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("🟢 Button Clicked! Starting subscription process..."); // للتأكد من وصول النقرة
  
  if (!email) {
    console.error("🔴 Email is empty!");
    return;
  }

  setIsLoading(true);
  console.log("🟡 Sending to Supabase for email:", email);

  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, source: 'guide_sidebar' }]);

    if (error) {
      console.error("🔴 Supabase Error:", error.message, error.code); // سيخبرنا إذا كان الجدول مفقوداً أو الصلاحيات ناقصة
      throw error;
    }

    console.log("✅ Success! Supabase response:", data);
    alert(isAr ? "تم الاشتراك بنجاح!" : "Subscribed successfully!");
    setEmail("");
  } catch (err: any) {
    console.error("🔴 Catch Error Block:", err);
    alert(isAr ? "حدث خطأ أو أنك مشترك بالفعل." : "Error or already subscribed.");
  } finally {
    setIsLoading(false);
    console.log("⚪ Process finished.");
  }
};
 

  return (
    // تم حذف قسم Most Read من هنا لمنع التكرار في الصفحة
    <div className="w-full lg:max-w-[340px]">
      <div className="bg-[#0A0A0A] p-8 rounded-[32px] text-center shadow-2xl overflow-hidden relative">
        <div className="relative z-20">
          <h2 className="text-white text-2xl mb-2 font-medium">
            {isAr ? "رؤى أسبوعية" : "Weekly Insights"}
          </h2>
          <p className="text-gray-400 text-xs mb-8 uppercase tracking-widest leading-relaxed">
            {isAr ? "أحدث تقارير السوق في بريدك" : "Latest market trends in your inbox"}
          </p>
          
          <form 
  className="flex flex-col gap-3" 
  onSubmit={handleSubscribe} // الآن الدالة ستستقبل الـ event بشكل صحيح
> 
  <div className="relative">
    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
    <input 
      type="email" 
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"} 
      className="w-full bg-white rounded-xl py-3.5 px-10 text-black text-xs font-medium outline-none"
    />
  </div>

 <button 
      type="submit" // نغيره إلى submit ليرسل البيانات رسمياً
      disabled={isLoading}
    className="relative z-50 w-full py-3.5 gap-2 flex items-center justify-center bg-[#12AD65] text-white rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
  >
    {isLoading ? (isAr ? "جاري..." : "Loading...") : (isAr ? "اشتراك" : "Subscribe")}
    {!isLoading && (
      <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
    )}
  </button>
</form>
        </div>
        
        {/* تأثير الإضاءة الخلفية */}
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#12AD65] opacity-20 blur-[60px] z-0 pointer-events-none" />
      </div>
    </div>
  );
}