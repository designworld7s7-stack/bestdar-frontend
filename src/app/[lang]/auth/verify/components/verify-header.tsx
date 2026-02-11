'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthHeader({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const pathname = usePathname();

  // Determine if we are on login or signup to show the opposite link
  const isLoginPage = pathname.includes('/login');

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 sm:px-12 sm:py-8 flex items-center justify-between bg-transparent">
      {/* 1. BRAND LOGO */}
      <Link href={`/${params.lang}`} className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-[#12AD65] transition-colors">
            <span className="text-white font-medium text-xs">BD</span>
        </div>
        <span className="text-xl font-medium tracking-[0.1em] text-black uppercase">
          Best <span className="text-[#12AD65]">Dar</span>
        </span>
      </Link>

      {/* 2. ACTIONS: Language & Auth Toggle */}
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Language Switcher */}
        <Link 
          href={pathname.replace(`/${params.lang}`, isAr ? '/en' : '/ar')}
          className="text-[12px] font-medium uppercase tracking-tighter text-[#4B5563] hover:text-black transition-colors"
        >
          {isAr ? "EN" : "عربي"}
        </Link>

        {/* Dynamic Auth Toggle */}
        <Link 
          href={isLoginPage ? `/${params.lang}/auth/signup` : `/${params.lang}/auth/login`}
          className="hidden sm:block text-[12px] font-medium uppercase tracking-tighter text-black hover:text-[#12AD65] transition-colors"
        >
          {isLoginPage ? (isAr ? "إنشاء حساب" : "Sign Up") : (isAr ? "دخول" : "Log In")}
        </Link>
        
        {/* Mobile Call to Action Button */}
        <Link 
          href={isLoginPage ? `/${params.lang}/auth/signup` : `/${params.lang}/auth/login`}
          className="sm:hidden bg-black text-white px-5 py-2.5 rounded-full text-[11px] font-medium uppercase tracking-tighter active:scale-95 transition-all"
        >
           {isLoginPage ? (isAr ? "سجل" : "Join") : (isAr ? "دخول" : "Login")}
        </Link>
      </div>
    </header>
  );
}