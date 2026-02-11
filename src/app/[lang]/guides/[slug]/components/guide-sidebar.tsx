'use client';


import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import React, { ReactElement } from 'react';
import { LucideProps } from 'lucide-react'; // Import this for type safety
// Update the interface to accept dynamic links from the database
interface GuideSidebarProps {
  lang: string;
  links?: { title: string; url: string }[]; // Matches your sidebar_links column
}

export default function GuideSidebar({ lang, links }: GuideSidebarProps) {
  const isAr = lang === 'ar';
  
  const toc = [
    { id: 'introduction', label: isAr ? 'المقدمة' : 'Introduction' },
    { id: 'why-invest', label: isAr ? 'لماذا الاستثمار في الإمارات؟' : 'Why Invest in UAE?' },
    { id: 'legal-framework', label: isAr ? 'الإطار القانوني' : 'Legal Framework' },
    { id: 'golden-visa', label: isAr ? 'برنامج الفيزا الذهبية' : 'Golden Visa Program' },
    { id: 'top-locations', label: isAr ? 'أفضل مواقع الاستثمار' : 'Top Locations' },
  ];

  const followLinks = [
    { icon: <MessageCircle size={18} />, href: 'https://wa.me/yournumber', label: 'WhatsApp' },
    { icon: <Facebook size={18} />, href: 'https://facebook.com/bestdar', label: 'Facebook' },
    { icon: <Instagram size={18} />, href: 'https://instagram.com/bestdar', label: 'Instagram' },
  ];

  return (
    <aside className="sticky top-32 space-y-12">
      {/* 1. TABLE OF CONTENTS */}
      <div>
        <h5 className="text-[12px] font-bold uppercase tracking-tight text-[#374151] mb-6">
          {isAr ? "المحتويات" : "Contents"}
        </h5>
        <ul className="space-y-5">
          {toc.map((item, i) => (
            <li key={item.id} className="group flex items-center">
              <div className={clsx(
                "w-[2px] h-4 transition-colors mr-5 rtl:ml-5 rtl:mr-0",
                i === 0 ? "bg-[#12AD65]" : "bg-transparent group-hover:bg-gray-200"
              )} />
              <button 
                className={clsx(
                  "text-[13px] font-medium transition-all text-left rtl:text-right tracking-tight",
                  i === 0 ? "text-[#12AD65] font-bold" : "text-[#4B5563] hover:text-black"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. DYNAMIC USEFUL RESOURCES: Pulling from the "Seed" */}
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
      {/* Cast the icon as a ReactElement with LucideProps to tell 
          TypeScript that 'size' and 'strokeWidth' are valid.
      */}
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