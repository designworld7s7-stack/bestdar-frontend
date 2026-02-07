'use client';

import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import SocialActions from '@/components/shared/social-actions';

export default function GuideSidebar({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  
  const toc = [
    { id: 'introduction', label: isAr ? 'المقدمة' : 'Introduction' },
    { id: 'why-invest', label: isAr ? 'لماذا الاستثمار في الإمارات؟' : 'Why Invest in UAE?' },
    { id: 'legal-framework', label: isAr ? 'الإطار القانوني' : 'Legal Framework' },
    { id: 'golden-visa', label: isAr ? 'برنامج الفيزا الذهبية' : 'Golden Visa Program' },
    { id: 'top-locations', label: isAr ? 'أفضل مواقع الاستثمار' : 'Top Locations' },
  ];

  // Following links for your social accounts
  const followLinks = [
    { icon: <MessageCircle size={18} />, href: 'https://wa.me/yournumber', label: 'WhatsApp' },
    { icon: <Facebook size={18} />, href: 'https://facebook.com/bestdar', label: 'Facebook' },
    { icon: <Instagram size={18} />, href: 'https://instagram.com/bestdar', label: 'Instagram' },
  ];

  return (
    <aside className="sticky top-32 space-y-12">
      {/* 1. TABLE OF CONTENTS */}
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-8">
          {isAr ? "المحتويات" : "Contents"}
        </h5>
        <ul className="space-y-5">
          {toc.map((item, i) => (
            <li key={item.id} className="group flex items-center">
              <div className={clsx(
                "w-[2px] h-4 transition-colors mr-5 rtl:ml-5 rtl:mr-0",
                i === 0 ? "bg-[#12AD65]" : "bg-transparent group-hover:bg-gray-100"
              )} />
              <button 
                className={clsx(
                  "text-[12px] font-bold transition-all text-left rtl:text-right",
                  i === 0 ? "text-[#12AD65]" : "text-gray-400 hover:text-black"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. FOLLOW US: Horizontal Row */}
      <div className="pt-8 border-t border-gray-50">
        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6">
          {isAr ? "تابعنا" : "Follow Best Dar"}
        </h5>
        <div className="flex items-center gap-3">
          {followLinks.map((social, i) => (
            <a 
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-[#12AD65] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}