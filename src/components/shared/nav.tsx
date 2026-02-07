'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Crucial for the fix
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronRight, User, Bookmark, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { name: 'Turkey', href: '/turkey' },
  { name: 'UAE', href: '/uae' },
  { name: 'Investor Club', href: '/investor-club' },
  { name: 'Guides', href: '/guides' },
  { name: 'Contact', href: '/contact' },
  { name: 'About Us', href: '/about' },
];

export default function Navbar({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Needed for Portals
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const pathname = usePathname();
  const router = useRouter();
  const isRtl = lang === 'ar';
  const brandGreen = "#12AD65";
useEffect(() => {
  const closeMenus = () => {
    setShowLangMenu(false);
    setShowUserMenu(false);
  };
  if (showLangMenu || showUserMenu) {
    window.addEventListener('click', closeMenus);
  }
  return () => window.removeEventListener('click', closeMenus);
}, [showLangMenu, showUserMenu]);
  // Handle mounting state and body scroll
  useEffect(() => {
    setMounted(true);
    if (isOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleLangSwitch = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
    setShowLangMenu(false);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <nav className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl saturate-150 shadow-premium">
        <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          
          {/* LEFT: Logo/Hamburger */}
          <div className="flex items-center">
            <button className="lg:hidden p-2 -ms-2" onClick={() => setIsOpen(true)}>
              <Menu size={26} />
            </button>
            <Link href={`/${lang}`} className="hidden lg:flex items-center">
              <span className="text-xl font-black tracking-tighter text-brand-black">BEST <span style={{ color: brandGreen }}>DAR</span></span>
            </Link>
          </div>

          {/* CENTER: Desktop Links / Mobile Logo */}
          <div className="flex items-center">
            <Link href={`/${lang}`} className="absolute left-1/2 -translate-x-1/2 lg:hidden">
              <span className="text-lg font-black tracking-tighter text-brand-black">BEST <span style={{ color: brandGreen }}>DAR</span></span>
            </Link>
            <div className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link key={link.name} href={`/${lang}${link.href}`} className="group relative py-1 text-[13px] font-bold text-gray-700 hover:text-black">
                  {link.name}
                  <span className={clsx("absolute -bottom-1 start-0 h-[2px] bg-[#12AD65] transition-all", pathname.includes(link.href) ? "w-full" : "w-0 group-hover:w-full")} />
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Auth/Lang */}
          <div className="flex items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-6">
               <div className="relative">
  <button 
    onClick={(e) => {
      e.stopPropagation(); // Prevents immediate closing
      setShowLangMenu(!showLangMenu);
      setShowUserMenu(false); // Close user menu if open
    }}
    className="text-[13px] font-black text-gray-400 hover:text-black transition-colors flex items-center gap-1"
  >
    {lang === 'en' ? 'EN' : 'AR'} 
    <span className={clsx("transition-transform duration-200", showLangMenu && "rotate-180")}>⌄</span>
  </button>

  {showLangMenu && (
    <div className="absolute top-full mt-4 w-32 -inline-start-4 rounded-xl bg-white p-2 shadow-premium ring-1 ring-black/5 z-[110]">
      <button 
        onClick={() => handleLangSwitch('en')} 
        className={clsx(
          "w-full rounded-lg px-4 py-2 text-left text-[12px] font-bold transition-colors",
          lang === 'en' ? "text-[#12AD65] bg-green-50" : "hover:bg-gray-50"
        )}
      >
        English
      </button>
      <button 
        onClick={() => handleLangSwitch('ar')} 
        className={clsx(
          "w-full rounded-lg px-4 py-2 text-right text-[12px] font-bold transition-colors",
          lang === 'ar' ? "text-[#12AD65] bg-green-50" : "hover:bg-gray-50"
        )}
      >
        العربية
      </button>
    </div>
  )}
</div>
              <div className="flex items-center gap-5 ps-6 border-s border-gray-100">
                {!isLoggedIn ? (
                  <><Link href={`/${lang}/login`} className="text-[13px] font-black">Login</Link>
                  <Link href={`/${lang}/signup`} style={{ backgroundColor: brandGreen }} className="rounded-full px-6 py-2 text-[13px] font-black text-white shadow-lg">Sign Up</Link></>
                ) : (
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border"><User size={20}/></button>
                )}
              </div>
            </div>
            {isLoggedIn ? <Link href={`/${lang}/profile`} className="h-9 w-9 lg:hidden rounded-full bg-gray-100 flex items-center justify-center"><User size={18}/></Link> : <div className="w-10 lg:hidden" />}
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU PORTAL --- */}
      {createPortal(
        <div className={clsx(
          "fixed inset-0 z-[99999] flex flex-col bg-white transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-0 opacity-100 visible" : (isRtl ? "translate-x-full" : "-translate-x-full") + " opacity-0 invisible"
        )}>
          <div className="flex items-center justify-between p-6 bg-white border-b border-gray-50">
            <button onClick={() => setIsOpen(false)} className="p-2 -ms-2"><X size={26} /></button>
            <span className="text-lg font-black tracking-tighter">BEST <span style={{ color: brandGreen }}>DAR</span></span>
            <div className="w-10" /> 
          </div>

          <div className="flex gap-4 px-6 py-4 bg-white">
            <Link href={`/${lang}/login`} onClick={() => setIsOpen(false)} className="flex-1 rounded-2xl bg-gray-50 py-4 text-center text-sm font-black">Login</Link>
            <Link href={`/${lang}/signup`} onClick={() => setIsOpen(false)} style={{ backgroundColor: brandGreen }} className="flex-1 rounded-2xl py-4 text-center text-sm font-black text-white">Sign Up</Link>
          </div>

          <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto bg-white">
            {navLinks.map((link) => (
              <Link key={link.name} href={`/${lang}${link.href}`} onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-2xl p-4 text-gray-900 active:bg-gray-50">
                <span className="text-base font-bold">{link.name}</span>
                <ChevronRight size={18} className={clsx("text-gray-300", isRtl && "rotate-180")} />
              </Link>
            ))}
          </div>

          <div className="px-6 pb-12 bg-white border-t border-gray-50">
            <p className="mb-4 mt-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Language</p>
            <div className="flex rounded-2xl bg-gray-100 p-1.5 shadow-inner">
              <button onClick={() => handleLangSwitch('en')} className={clsx("flex-1 rounded-xl py-3 text-xs font-black transition-all", lang === 'en' ? "bg-white text-black shadow-sm" : "text-gray-400")}>ENGLISH</button>
              <button onClick={() => handleLangSwitch('ar')} className={clsx("flex-1 rounded-xl py-3 text-xs font-black transition-all", lang === 'ar' ? "bg-white text-black shadow-sm" : "text-gray-400")}>العربية</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}