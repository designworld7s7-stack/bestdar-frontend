'use client';

import React, { useState, useEffect } from 'react';
import { Mail, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '../../../../utils/supabase/client';

interface MostReadGuide {
  slug: string;
  title_en: string;
  title_ar: string;
  views_count: number;
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
  }, [lang]);

  const fetchMostRead = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('slug, title_en, title_ar, views_count')
        .order('views_count', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("🔴 Supabase Error:", error.message);
        return;
      }
      if (data) setMostRead(data as MostReadGuide[]);
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
      
      {/* 1. قسم الأكثر قراءة (Most Read) [cite: 2026-02-27] */}
      {mostRead.length > 0 && (
        <div className="bg-[#0A0A0A] p-8 rounded-[32px] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={18} className="text-[#12AD65]" />
            <h3 className="text-white text-lg font-medium tracking-tight">
              {isAr ? "الأكثر قراءة" : "Most Read"}
            </h3>
          </div>
          
          <div className="space-y-6">
            {mostRead.map((item) => (
              <Link 
                key={item.slug} 
                href={`/${lang}/guides/${item.slug}`}
                className="group block no-underline"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white text-[15px] font-bold leading-snug group-hover:text-[#12AD65] transition-colors mb-1">
                    {isAr ? item.title_ar : item.title_en}
                  </p>
                  <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1 opacity-70">
                    <TrendingUp size={10} />
                    {item.views_count} {isAr ? 'مشاهدة' : 'views'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. قسم النشرة الإخبارية (Newsletter) [cite: 2026-02-27] */}
      <div className="bg-[#0A0A0A] p-8 rounded-[32px] text-center shadow-2xl relative border border-white/5">
        <div className="relative z-10">
          <h2 className="text-white text-2xl mb-2 font-medium">
            {isAr ? "رؤى أسبوعية" : "Weekly Insights"}
          </h2>
          <p className="text-gray-400 text-[10px] mb-8 uppercase tracking-[0.2em] leading-relaxed opacity-60">
            {isAr ? "أحدث تقارير السوق في بريدك" : "Latest market trends in your inbox"}
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3"> 
            <div className="relative">
              <Mail 
                className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500`} 
                size={14} 
              />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"} 
                className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 ${isAr ? 'pr-11' : 'pl-11'} text-white text-xs font-medium outline-none focus:border-[#12AD65] transition-all`}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#12AD65] text-white rounded-xl font-bold cursor-pointer hover:bg-white hover:text-black transition-all disabled:opacity-50"
            >
              {isLoading ? (isAr ? "جاري..." : "Subscribing...") : (isAr ? "اشتراك" : "Subscribe")}
            </button>
          </form>
        </div>
        
        {/* خلفية جمالية */}
        <div className="absolute top-0 right-0 w-full h-full bg-[#12AD65] opacity-[0.02] pointer-events-none" />
      </div>
    </div>
  );
}