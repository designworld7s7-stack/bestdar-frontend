'use client';

import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '../../../../utils/supabase/client';

interface MostReadGuide {
  slug: string;
  title_en: string;
  title_ar: string;
  views: number;
}

export default function GuideSidebar({ lang }: { lang: string }) {
  const [mounted, setMounted] = useState(false);
  const [mostRead, setMostRead] = useState<MostReadGuide[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const isAr = lang === 'ar';
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    fetchMostRead();
  }, [lang]); // أضفنا lang هنا لضمان تحديث العناوين عند تبديل اللغة [cite: 2026-02-27]

  const fetchMostRead = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('slug, title_en, title_ar, views')
        .order('views', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("🔴 Supabase Error:", error.message);
        return;
      }
      if (data) setMostRead(data);
    } catch (err) {
      console.error("🔴 Fetch failed:", err);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, source: 'guide_sidebar' }]);

      if (error) throw error;
      alert(isAr ? "تم الاشتراك بنجاح! شكراً لك." : "Subscribed successfully! Thank you.");
      setEmail("");
    } catch (err: any) {
      console.error("🔴 Subscription error:", err);
      alert(isAr ? "حدث خطأ أو أنك مشترك بالفعل." : "Already subscribed or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full lg:max-w-[340px] space-y-8" dir={isAr ? "rtl" : "ltr"}>
      
      {/* 1. قسم الأكثر قراءة (Most Read) - بيانات ديناميكية بالكامل [cite: 2026-02-27] */}
      {mostRead.length > 0 && (
        <div className="bg-[#0A0A0A] p-8 rounded-[32px] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={18} className="text-[#12AD65]" />
            <h3 className="text-white text-lg font-medium tracking-tight">
              {isAr ? "الأكثر قراءة" : "Most Read"}
            </h3>
          </div>
          
          <div className="space-y-8">
            {mostRead.map((guide, idx) => (
              <Link 
                key={guide.slug} 
                href={`/${lang}/guides/${guide.slug}`} // تم تصحيح الرابط لمنع الـ 404 [cite: 2026-02-27]
                className="group flex gap-5 items-start no-underline"
              >
                <span className="text-gray-300 font-black text-2xl leading-none opacity-30 group-hover:text-[#12AD65] group-hover:opacity-100 transition-all">
                  0{idx + 1}
                </span>
                <p className="text-white text-[15px] font-bold leading-snug group-hover:text-[#12AD65] transition-colors">
                  {isAr ? guide.title_ar : guide.title_en}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. قسم النشرة الإخبارية (Newsletter) - تم إصلاح النقر [cite: 2026-02-27] */}
      <div className="bg-[#0A0A0A] p-8 rounded-[32px] text-center shadow-2xl relative overflow-hidden border border-white/5">
        <div className="relative z-20">
          <h2 className="text-white text-2xl mb-2 font-medium">
            {isAr ? "رؤى أسبوعية" : "Weekly Insights"}
          </h2>
          <p className="text-gray-400 text-[10px] mb-8 uppercase tracking-[0.2em] leading-relaxed opacity-60">
            {isAr ? "أحدث تقارير السوق في بريدك" : "Latest market trends in your inbox"}
          </p>
          
          {/* تم إضافة z-index عالي و pointer-events لضمان النقر [cite: 2026-02-27] */}
          <form onSubmit={handleSubscribe} className="relative z-50 flex flex-col gap-3 pointer-events-auto"> 
            <div className="relative">
              <Mail className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={14} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"} 
                className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 ${isAr ? 'pr-11' : 'pl-11'} text-white text-xs font-medium outline-none focus:border-[#12AD65]/50 transition-all relative z-50`}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="relative z-[110] w-full py-4 bg-[#12AD65] text-white rounded-xl font-bold cursor-pointer hover:brightness-110 active:scale-95 transition-all pointer-events-auto"
            >
              {isLoading ? (isAr ? "جاري..." : "Subscribing...") : (isAr ? "اشتراك" : "Subscribe")}
            </button>
          </form>
        </div>
        
        {/* خلفية جمالية - تأكد أنها z-0 لتكون تحت الفورم [cite: 2026-02-27] */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#12AD65] opacity-10 blur-[60px] z-0 pointer-events-none" />
      </div>
    </div>
  );
}