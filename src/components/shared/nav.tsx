'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronRight, User, Bookmark, LogOut, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/utils/supabase/client';

export default function Navbar({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [user, setUser] = useState<any>(null);

  const isAr = lang === 'ar';
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const brandGreen = "#12AD65";

  // 1. مصفوفة الروابط - قمنا بإزالة تكرار الـ lang هنا لتبسيط المنطق [cite: 2026-02-27]
  const navLinks = [
    { name: isAr ? "تركيا" : "Turkey", slug: "turkey" },
    { name: isAr ? "الإمارات" : "UAE", slug: "uae" },
    { name: isAr ? "نادي المستثمرين" : "Investor Club", slug: "investor-club" },
    { name: isAr ? "الأدلة" : "Guides", slug: "guides" },
    { name: isAr ? "اتصل بنا" : "Contact", slug: "contact" },
    { name: isAr ? "من نحن" : "About Us", slug: "about" },
  ];

  useEffect(() => {
    const fetchUserAndRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', user.id)
            .single();

          setUser({
            ...user,
            role: profile?.role || 'user',
            display_name: profile?.full_name || user.email
          });
        } catch (err) {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserAndRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
        fetchUserAndRole();
        router.refresh();
      } else if (_event === 'SIGNED_OUT') {
        setUser(null);
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    window.location.href = `/${lang}`;
  };

  const userInitial = user?.display_name?.charAt(0).toUpperCase() || "U";

  if (!mounted) return null;

  return (
    <>
      <nav 
        dir={isAr ? "rtl" : "ltr"} 
        className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl saturate-150 shadow-premium"
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ms-2" onClick={() => setIsOpen(true)}>
              <Menu size={26} />
            </button>
            <Link href={`/${lang}`} className="block flex-shrink-0">
              <img 
                src="/logo-black.svg" 
                alt="Best Dar" 
                className="h-8 w-auto lg:h-9 object-contain" 
              />
            </Link>
          </div>

          {/* روابط الديسكتوب - تم تصحيح الـ href [cite: 2026-02-27] */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.slug} 
                href={`/${lang}/${link.slug}`} 
                className="group relative py-1 text-[13px] font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-all"
              >
                {link.name}
                <span className={clsx(
                  "absolute -bottom-1 start-0 h-[2px] bg-[#12AD65] transition-all", 
                  pathname.includes(link.slug) ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </div>

          {/* الجانب الأيمن (اللغة والمستخدم) [cite: 2026-02-27] */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6">
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); setShowUserMenu(false); }} 
                  className="text-[13px] font-bold text-[#4B5563] hover:text-black transition-colors flex items-center gap-1 uppercase"
                >
                  {lang} <span className={clsx("transition-transform duration-200", showLangMenu && "rotate-180")}>⌄</span>
                </button>
                {showLangMenu && (
                  <div className={clsx("absolute top-full mt-2 w-32 rounded-xl bg-white p-2 shadow-premium ring-1 ring-black/5", isAr ? "right-0" : "left-0")}>
                    <button onClick={() => handleLangSwitch('en')} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-gray-50 rounded-lg">ENGLISH</button>
                    <button onClick={() => handleLangSwitch('ar')} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-gray-50 rounded-lg">العربية</button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-5 ps-6 border-s border-gray-100">
                {!user ? (
                  <>
                    <Link href={`/${lang}/auth/login`} className="text-[14px] font-bold uppercase tracking-widest">{isAr ? "دخول" : "Login"}</Link>
                    <Link href={`/${lang}/auth/signup`} style={{ backgroundColor: brandGreen }} className="rounded-full px-6 py-2 text-[13px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#12AD65]/20 hover:brightness-110 transition-all">
                      {isAr ? "سجل" : "Sign Up"}
                    </Link>
                  </>
                ) : (
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); setShowLangMenu(false); }} 
                      style={{ backgroundColor: brandGreen }}
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#12AD65]/20"
                    >
                      {userInitial}
                    </button>
                    {showUserMenu && (
                      <div className={clsx("absolute top-full mt-4 w-64 rounded-[24px] bg-white py-3 shadow-premium ring-1 ring-black/5 z-[130]", isAr ? "left-0" : "right-0")}>
                        <Link href={`/${lang}/profile`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                          <User size={18} className="text-[#12AD65]" />
                          <span className="text-[14px] font-bold">{isAr ? "ملفي الشخصي" : "My Profile"}</span>
                        </Link>
                        <Link href={`/${lang}/saved`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                          <Bookmark size={18} className="text-[#12AD65]" />
                          <span className="text-[14px] font-bold">{isAr ? "المحفوظات" : "Saved"}</span>
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 text-red-500">
                          <LogOut size={18} />
                          <span className="text-[14px] font-bold">{isAr ? "خروج" : "Logout"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* بوابة الموبايل (Mobile Portal) [cite: 2026-02-27] */}
      {mounted && createPortal(
        <div className={clsx(
          "fixed inset-0 z-[99999] flex flex-col bg-white transition-all duration-500",
          isOpen ? "translate-x-0 opacity-100 visible" : (isAr ? "translate-x-full" : "-translate-x-full") + " opacity-0 invisible"
        )}>
          <div className="flex items-center justify-between p-6 bg-white border-b border-gray-50" dir={isAr ? "rtl" : "ltr"}>
            <button onClick={() => setIsOpen(false)} className="p-2"><X size={26} /></button>
            <span className="text-lg font-bold tracking-widest">BEST <span style={{ color: brandGreen }}>DAR</span></span>
            <div className="w-10" /> 
          </div>

          <div className="px-6 py-10 flex flex-col items-center border-b border-gray-50" dir={isAr ? "rtl" : "ltr"}>
            {!user ? (
              <div className="flex gap-4 w-full">
                <Link href={`/${lang}/auth/login`} onClick={() => setIsOpen(false)} className="flex-1 rounded-2xl bg-gray-50 py-4 text-center text-sm font-bold uppercase">Login</Link>
                <Link href={`/${lang}/auth/signup`} onClick={() => setIsOpen(false)} style={{ backgroundColor: brandGreen }} className="flex-1 rounded-2xl py-4 text-center text-sm font-bold text-white uppercase shadow-lg shadow-green-100">Sign Up</Link>
              </div>
            ) : (
              <>
                <div style={{ backgroundColor: brandGreen }} className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-xl">
                  {userInitial}
                </div>
                <h3 className="text-xl font-bold mb-1">{user.display_name}</h3>
                <div className="flex items-center gap-1 text-[#12AD65]">
                  <ShieldCheck size={14} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{isAr ? "عضو موثق" : "Verified Member"}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto" dir={isAr ? "rtl" : "ltr"}>
            {user && (
              <div className="grid grid-cols-3 gap-3">
                <Link href={`/${lang}/profile`} onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center py-5 bg-gray-50 rounded-[24px] gap-2">
                  <User size={20} className="text-[#12AD65]" />
                  <span className="text-[10px] font-bold uppercase">{isAr ? "ملفي" : "Profile"}</span>
                </Link>
                <Link href={`/${lang}/saved`} onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center py-5 bg-gray-50 rounded-[24px] gap-2">
                  <Bookmark size={20} className="text-[#12AD65]" />
                  <span className="text-[10px] font-bold uppercase">{isAr ? "المحفوظات" : "Saved"}</span>
                </Link>
                <button onClick={handleLogout} className="flex flex-col items-center justify-center py-5 bg-red-50/50 rounded-[24px] gap-2 text-red-500">
                  <LogOut size={20} />
                  <span className="text-[10px] font-bold uppercase">{isAr ? "خروج" : "Logout"}</span>
                </button>
              </div>
            )}

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.slug} href={`/${lang}/${link.slug}`} onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-2xl p-4 text-gray-900 active:bg-gray-50 group">
                  <span className="text-[14px] font-bold uppercase tracking-widest group-hover:text-[#12AD65] transition-colors">{link.name}</span>
                  <ChevronRight size={18} className={clsx("text-gray-300", isAr && "rotate-180")} />
                </Link>
              ))}
            </div>
          </div>

          <div className="px-6 pb-12 bg-white" dir={isAr ? "rtl" : "ltr"}>
            <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400">{isAr ? "اللغة" : "Language"}</p>
            <div className="flex rounded-2xl bg-gray-50 p-1.5 border border-gray-100">
              <button onClick={() => handleLangSwitch('en')} className={clsx("flex-1 rounded-xl py-3 text-[11px] font-bold transition-all", lang === 'en' ? "bg-white text-black shadow-sm" : "text-gray-400")}>ENGLISH</button>
              <button onClick={() => handleLangSwitch('ar')} className={clsx("flex-1 rounded-xl py-3 text-[11px] font-bold transition-all", lang === 'ar' ? "bg-white text-black shadow-sm" : "text-gray-400")}>العربية</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}