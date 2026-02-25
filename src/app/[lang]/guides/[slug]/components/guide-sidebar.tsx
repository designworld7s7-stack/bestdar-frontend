'use client';

import React, { useState, useEffect, ReactElement } from 'react';
import { Facebook, Instagram, MessageCircle, LucideProps } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface GuideSidebarProps {
  lang: string;
  links?: { title: string; url: string }[]; // هذه هي الروابط المفيدة (Useful Resources)
  toc?: { id: string; label: string }[]; 
  whatsappNumber?: string; 
}

export default function GuideSidebar({ lang, links: usefulLinks = [], toc = [] }: GuideSidebarProps) {
  const isAr = lang === 'ar';
  const supabase = createClient();
  
  // قمنا بتغيير اسم الحالة إلى socialData لتجنب التعارض مع links (Useful Resources)
  const [socialData, setSocialData] = useState<any>({});

  // 1. جلب بيانات التواصل من سوبابيس
  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('section_key, content_en')
        .filter('section_key', 'ilike', 'contact_%');

      if (data) {
        const linksObj = data.reduce((acc: any, item: any) => {
          acc[item.section_key] = item.content_en;
          return acc;
        }, {});
        setSocialData(linksObj);
      }
    };
    fetchSocialLinks();
  }, [supabase]);

  // 2. إعداد روابط المتابعة (Social Links)
  const followLinks = [
    { 
      label: "WhatsApp", 
      icon: <MessageCircle />, 
      href: `https://wa.me/${(socialData.contact_whatsapp || '9647759147343').replace(/\D/g, '')}` 
    },
    { 
      label: "Facebook", 
      icon: <Facebook />, 
      href: socialData.contact_facebook || 'https://web.facebook.com/profile.php?id=100083809742358' 
    },
    { 
      label: "Instagram", 
      icon: <Instagram />, 
      href: socialData.contact_instagram || 'https://www.instagram.com/best_dar/' 
    },
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
                  className="text-[14px] font-semibold text-[#4B5563] hover:text-[#12AD65] transition-all duration-300 flex items-center gap-3 w-full text-start"
                >
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

      {/* 2. USEFUL RESOURCES (النسخة المحدثة والذكية) */}
{usefulLinks.map((link, i) => {
  // 🛠️ تنظيف الرابط وتصحيحه تلقائياً
  const rawUrl = link.url || '';
  const cleanUrl = rawUrl.replace('undefined', '');
  const finalUrl = cleanUrl.startsWith('/') ? `/${lang}${cleanUrl}` : cleanUrl;

  // 🛠️ اختيار العنوان الصحيح للظهور
  const displayTitle = link.title || (isAr ? "عرض المشروع" : "View Project");

  if (!cleanUrl || cleanUrl === `/${lang}/projects/`) return null;

  return (
    <li key={i}>
      <a 
        href={finalUrl}
        className="flex items-center justify-between text-[13px] font-medium text-[#4B5563] hover:text-[#12AD65] group"
      >
        <span>{displayTitle}</span>
        <span className="group-hover:translate-x-1 transition-transform">
          {isAr ? '←' : '→'}
        </span>
      </a>
    </li>
  );
})}

      {/* 3. FOLLOW US (الروابط القادمة من سوبابيس) */}
      <div className="pt-8 border-t border-gray-100">
        <h5 className="text-[11px] font-bold uppercase tracking-tight text-[#374151] mb-6">
          {isAr ? "تابعنا" : "Follow Best Dar"}
        </h5>
        <div className="flex items-center gap-3">
          {followLinks.map((social, i) => (
            <a 
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
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