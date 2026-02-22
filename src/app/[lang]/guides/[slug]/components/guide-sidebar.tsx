'use client';

import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import React, { ReactElement } from 'react';
import { LucideProps } from 'lucide-react'; 

interface GuideSidebarProps {
  lang: string;
  links?: { title: string; url: string }[]; 
  toc?: { id: string; label: string }[]; 
  whatsappNumber?: string; 
}

export default function GuideSidebar({ lang, links, toc = [], whatsappNumber }: GuideSidebarProps) {
  const isAr = lang === 'ar';
  
  const followLinks = [
    { 
      icon: <MessageCircle size={18} />, 
      href: `https://wa.me/${whatsappNumber || '971XXXXXXXX'}`, 
      label: 'WhatsApp'
    },
    { icon: <Facebook size={18} />, href: 'https://facebook.com/bestdar', label: 'Facebook' },
    { icon: <Instagram size={18} />, href: 'https://instagram.com/bestdar', label: 'Instagram' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, 
        behavior: 'smooth'
      });
    }
  };

  return (
    // أضفنا الكلاسات هنا لعمل "كارت" بظل خفيف وخلفية بيضاء مع حواف دائرية وبادينج (p-8)
    <aside className="sticky top-32 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 rounded-3xl p-8 space-y-12" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 1. TABLE OF CONTENTS */}
      {toc && toc.length > 0 && (
        <div>
          <h5 className="text-[12px] font-bold uppercase tracking-tight text-[#374151] mb-6">
            {isAr ? "المحتويات" : "Contents"}
          </h5>
          <ul className="space-y-4">
            {toc.map((item) => (
              <li key={item.id} className="group">
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className="text-[14px] font-semibold text-[#4B5563] hover:text-[#12AD65] transition-all duration-300 flex items-center gap-3"
                >
                  {/* تغيير اتجاه السهم بناءً على اللغة */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#12AD65]">
                    {isAr ? '←' : '→'}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. DYNAMIC USEFUL RESOURCES */}
      {links && links.length > 0 && (
        <div className="pt-8 border-t border-gray-100">
          <h5 className="text-[12px] font-bold uppercase tracking-tight text-[#374151] mb-6">
            {isAr ? "روابط مفيدة" : "Useful Resources"}
          </h5>
          <ul className="space-y-4">
            {links.map((link, i) => (
              <li key={i}>
                <a 
                  href={link.url}
                  className="text-[13px] font-medium text-[#4B5563] hover:text-[#12AD65] transition-colors block leading-tight"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. FOLLOW US */}
      <div className="pt-8 border-t border-gray-100">
        <h5 className="text-[11px] font-bold uppercase tracking-tight text-[#374151] mb-6">
          {isAr ? "تابعنا" : "Follow Best Dar"}
        </h5>
        <div className="flex items-center gap-3">
          {followLinks.map((social, i) => (
            <a 
              key={i}
              href={social.href}
              className="h-11 w-11 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#374151] hover:text-[#12AD65] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              aria-label={social.label}
            >
              {React.cloneElement(social.icon as ReactElement<LucideProps>, { 
                size: 18, 
                strokeWidth: 2 
              })}
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}