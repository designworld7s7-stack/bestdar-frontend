'use client';

import React from 'react';
import { Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function ContactInfo({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

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

        {/* Call */}
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-2xl bg-[#12AD65]/10 flex items-center justify-center text-[#12AD65]">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter mb-1">{isAr ? "اتصل بنا" : "Call Us"}</p>
            <p className="text-sm font-medium text-black text-left" dir="ltr">+90 555 123 4567</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <p className="text-[12px] font-medium uppercase text-[#4B5563] tracking-tighter mb-6">{isAr ? "تابعنا" : "Follow Us"}</p>
        <div className="flex gap-4">
          <SocialButton icon={<Facebook size={18} />} href="#" />
          <SocialButton icon={<Instagram size={18} />} href="#" />
          <SocialButton icon={<MessageCircle size={18} />} href="#" />
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a href={href} className="h-12 w-12 rounded-full border border-gray-100 flex items-center justify-center text-[#4B5563] hover:text-[#12AD65] hover:border-[#12AD65] transition-all bg-white shadow-sm">
      {icon}
    </a>
  );
}