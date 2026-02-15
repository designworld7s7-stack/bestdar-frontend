'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { createClient } from '../../../../utils/supabase/client';
export default function Footer({ lang }: { lang: string }) {
  const supabase = createClient();
  const isAr = lang === 'ar';
  const brandGreen = "#12AD65";
const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const quickLinks = [
    { name: isAr ? "الرئيسية" : "Home", href: `/${lang}` },
    { name: isAr ? "مشاريع تركيا" : "Turkey Projects", href: `/${lang}/turkey` },
    { name: isAr ? "مشاريع الإمارات" : "UAE Projects", href: `/${lang}/uae` },
    { name: isAr ? "نادي المستثمرين" : "Investor Club", href: `/${lang}/investor-club` },
    { name: isAr ? "الأدلة" : "Guides", href: `/${lang}/guides` },
    { name: isAr ? "اتصل بنا" : "Contact Us", href: `/${lang}/contact` },
  ];
const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true); // تأكد من مطابقة الاسم المستخدم هنا مع التعريف أعلاه
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, source: 'footer' }]);

      if (error) throw error;

      alert(isAr ? "شكراً لاشتراكك!" : "Thank you for subscribing!");
      setEmail("");
    } catch (err: any) {
      if (err.code === '23505') {
        alert(isAr ? "هذا البريد مسجل بالفعل." : "This email is already registered.");
      } else {
        alert(isAr ? "حدث خطأ فني." : "A technical error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About */}
        <div className="flex flex-col gap-6">
  <Link href={`/${lang}`}>
  <img 
    src="/logo-white.svg" 
    alt="Best Dar" 
    className="h-12 w-auto object-contain" 
  />
</Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {isAr 
                ? "توجيه عقاري متميز للمستثمرين العراقيين في تركيا والإمارات العربية المتحدة. نصيحة موثوقة، فرص حصرية." 
                : "Premium real estate guidance for Iraqi investors in Turkey and UAE. Trusted advice, exclusive opportunities."}
            </p>
            <span className="text-[12px] font-medium uppercase tracking-[0.3em] text-gray-700">
              Since 2025
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-tight mb-8">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-white text-sm font-medium transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-tight mb-8">
              {isAr ? "اتصل بنا" : "Contact Us"}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group">
                <div className="text-[#12AD65] transition-transform group-hover:scale-110">
                  <Phone size={20} />
                </div>
                <a href="tel:+9647801234567" className="text-gray-500 hover:text-white text-sm font-bold transition-colors">
                  +964 780 123 4567
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="text-[#12AD65] transition-transform group-hover:scale-110">
                  <Mail size={20} />
                </div>
                <a href="mailto:info@bestdar.iq" className="text-gray-500 hover:text-white text-sm font-bold transition-colors">
                  info@bestdar.iq
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-tight mb-8">
              {isAr ? "اشترك للتحديثات" : "Subscribe for Updates"}
            </h4>
            <p className="text-gray-500 text-sm mb-6">
              {isAr 
                ? "احصل على أحدث رؤى السوق وقوائم العقارات الحصرية." 
                : "Get the latest market insights and exclusive property listings delivered to your inbox."}
            </p>
         <form className="space-y-3" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                required
                value={email} // الآن المتغير email معرف
                onChange={(e) => setEmail(e.target.value)} // الآن setEmail معرف
                placeholder={isAr ? "بريدك الإلكتروني" : "Your Email Address"}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white outline-none focus:border-[#12AD65] transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading} // استخدام isLoading بدلاً من loading
                className="w-full bg-[#12AD65] text-white py-4 rounded-xl font-medium text-[12px] uppercase tracking-tight flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {isLoading ? (isAr ? "جاري الاشتراك..." : "Subscribing...") : (isAr ? "اشترك" : "Subscribe")}
                {!isLoading && <Send size={14} />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
            <p className="text-gray-600 text-[10px] lg:text-[12px] font-bold uppercase tracking-tighter">
              © 2026 Best Dar. All rights reserved.
            </p>
            
            {/* إضافة رابط سياسة الخصوصية هنا لجوجل */}
            <Link 
              href={`/${lang}/privacy`} 
              className="text-gray-600 hover:text-[#12AD65] text-[10px] lg:text-[12px] font-bold uppercase tracking-tighter transition-colors"
            >
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
          </div>
          
          <div className="flex items-center gap-6 text-gray-500">
            <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}