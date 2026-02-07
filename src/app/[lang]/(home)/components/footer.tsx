'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const brandGreen = "#12AD65";

  const quickLinks = [
    { name: isAr ? "الرئيسية" : "Home", href: `/${lang}` },
    { name: isAr ? "مشاريع تركيا" : "Turkey Projects", href: `/${lang}/turkey` },
    { name: isAr ? "مشاريع الإمارات" : "UAE Projects", href: `/${lang}/uae` },
    { name: isAr ? "نادي المستثمرين" : "Investor Club", href: `/${lang}/investor-club` },
    { name: isAr ? "الأدلة" : "Guides", href: `/${lang}/guides` },
    { name: isAr ? "اتصل بنا" : "Contact Us", href: `/${lang}/contact` },
  ];

  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand \u0026 About */}
          <div className="flex flex-col gap-6">
            <img src="/logo-white.svg" alt="Best Dar" className="h-10 w-auto self-start" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {isAr 
                ? "توجيه عقاري متميز للمستثمرين العراقيين في تركيا والإمارات العربية المتحدة. نصيحة موثوقة، فرص حصرية." 
                : "Premium real estate guidance for Iraqi investors in Turkey and UAE. Trusted advice, exclusive opportunities."}
            </p>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
              Since 2025
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">
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
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">
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
                <a href="mailto:info@eliteestate.iq" className="text-gray-500 hover:text-white text-sm font-bold transition-colors">
                  info@eliteestate.iq
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">
              {isAr ? "اشترك للتحديثات" : "Subscribe for Updates"}
            </h4>
            <p className="text-gray-500 text-sm mb-6">
              {isAr 
                ? "احصل على أحدث رؤى السوق وقوائم العقارات الحصرية." 
                : "Get the latest market insights and exclusive property listings delivered to your inbox."}
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={isAr ? "بريدك الإلكتروني" : "Your Email Address"}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white outline-none focus:border-[#12AD65] transition-all"
              />
              <button className="w-full bg-[#12AD65] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
                {isAr ? "اشترك" : "Subscribe"}
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            © 2025 Elite Estate. All rights reserved.
          </p>
          
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