'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client'; // تأكد من صحة المسار حسب مشروعك

export default function ContactInfo({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const supabase = createClient();
  const [links, setLinks] = useState<any>({});

  // جلب البيانات ديناميكياً
  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('section_key, content_en')
        .filter('section_key', 'ilike', 'contact_%');

      if (data) {
        const linksObj = data.reduce((acc: any, item: any) => {
          acc[item.section_key] = item.content_en;
          return acc;
        }, {});
        setLinks(linksObj);
      }
    };
    fetchLinks();
  }, [supabase]);

  // تجهيز الروابط الحقيقية مع القيم الاحتياطية
  const whatsapp = links.contact_whatsapp || '9647759147343';
  const facebook = links.contact_facebook || 'https://web.facebook.com/profile.php?id=100083809742358';
  const instagram = links.contact_instagram || 'https://www.instagram.com/best_dar/';

  return (
    <div className="flex flex-col h-full">
      <div className="mb-12">
        <h2 className="text-3xl font-medium text-black mb-6 tracking-[0.1em]">
          {isAr ? "ابقَ على تواصل" : "Get in Touch"}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
          {isAr 
            ? "سواء كان لديك سؤال حول عقار، أو بحاجة إلى نصيحة استثمارية، فريقنا مستعد للإجابة."
            : "Whether you have a question about a property or need investment advice, our team is ready to answer."}
        </p>
      </div>

      <div className="space-y-10 mb-20">
        {/* Email */}
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-2xl bg-[#12AD65]/10 flex items-center justify-center text-[#12AD65]">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter mb-1">{isAr ? "راسلنا" : "Email Us"}</p>
            <p className="text-sm font-medium text-black">info@iraqinvest.com</p>
          </div>
        </div>

        {/* Call - مربوط بالواتساب ديناميكياً */}
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-2xl bg-[#12AD65]/10 flex items-center justify-center text-[#12AD65]">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter mb-1">{isAr ? "اتصل بنا" : "Call Us"}</p>
            <a href={`tel:${whatsapp}`} className="text-sm font-medium text-black text-left block" dir="ltr">
              +{whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* Social Media - مربوطة ديناميكياً الآن */}
      <div>
        <p className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter mb-6">{isAr ? "تابعنا" : "Follow Us"}</p>
        <div className="flex gap-4">
          <SocialButton icon={<Facebook size={18} />} href={facebook} />
          <SocialButton icon={<Instagram size={18} />} href={instagram} />
          <SocialButton icon={<MessageCircle size={18} />} href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} />
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="h-12 w-12 rounded-full border border-gray-100 flex items-center justify-center text-[#4B5563] hover:text-[#12AD65] hover:border-[#12AD65] transition-all bg-white shadow-sm"
    >
      {icon}
    </a>
  );
}