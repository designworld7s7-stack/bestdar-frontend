'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronRight, User, Bookmark, LogOut, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/utils/supabase/client';

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
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // الحالة الديناميكية الحقيقية
  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const isRtl = lang === 'ar';
  const brandGreen = "#12AD65";

 useEffect(() => {
  const fetchUserAndRole = async () => {
    // 1. جلب المستخدم الأساسي
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      try {
        // 2. جلب الدور من جدول profiles بناءً على الـ id (كما يظهر في صورتك 924)
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', user.id)
          .single();

        // 3. دمج الدور والاسم مع كائن المستخدم في الحالة (State)
        setUser({
          ...user,
          role: profile?.role || 'user', // إذا لم يجد دوراً، سيعطيه دور user افتراضياً
          display_name: profile?.full_name || user.email
        });
      } catch (err) {
        console.error("Error fetching role:", err);
        setUser(user); // العودة للمستخدم الأساسي في حال فشل جلب الدور
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
    router.push(`/${lang}`);
    router.refresh(); // لضمان تحديث حالة النافبار فوراً
  };

  const userInitial = user?.user_metadata?.full_name 
    ? user.user_metadata.full_name.charAt(0).toUpperCase() 
    : (user?.email?.charAt(0).toUpperCase() || "U");

  if (!mounted) return null;

  return (
    <>
<nav className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl saturate-150 shadow-premium">
  <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
    
    {/* الجانب الأيسر: زر المنيو والشعار */}
    <div className="flex items-center gap-4">
      {/* زر المنيو للموبايل فقط */}
      <button className="lg:hidden p-2 -ms-2" onClick={() => setIsOpen(true)}>
        <Menu size={26} />
      </button>
          <div className="flex-shrink-0">
<Link href={`/${lang}`} className="block flex-shrink-0">
        <img 
          src="/logo-black.svg" 
          alt="Best Dar" 
          className="h-8 w-auto lg:h-9 object-contain transition-all duration-300" 
        />
      </Link>
    </div>
 
          
</div>
         {/* الجانب الأيمن: روابط التنقل */}
    <div className="flex items-center">
      <div className="hidden items-center gap-10 lg:flex">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={`/${lang}${link.href}`} 
            className="group relative py-1 text-[15px] font-bold uppercase tracking-tight text-gray-700 hover:text-black transition-all"
          >
            {link.name}
            <span className={clsx(
              "absolute -bottom-1 start-0 h-[2px] bg-[#12AD65] transition-all", 
              pathname.includes(link.href) ? "w-full" : "w-0 group-hover:w-full"
            )} />
          </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-6">
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); setShowUserMenu(false); }} 
                  className="text-[13px] font-bold text-[#4B5563] hover:text-black transition-colors flex items-center gap-1 uppercase"
                >
                  {lang} <span className={clsx("transition-transform duration-200", showLangMenu && "rotate-180")}>⌄</span>
                </button>
                {showLangMenu && (
                  <div className="absolute top-full mt-2 w-32 rounded-xl bg-white p-2 shadow-premium ring-1 ring-black/5">
                    <button onClick={() => handleLangSwitch('en')} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-gray-50 rounded-lg">ENGLISH</button>
                    <button onClick={() => handleLangSwitch('ar')} className="w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-gray-50 rounded-lg">العربية</button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-5 ps-6 border-s border-gray-100">
                {!user ? (
                  <>
                    <Link href={`/${lang}/auth/login`} className="text-[15px] font-bold uppercase tracking-tight">{isRtl ? "دخول" : "Login"}</Link>
                    <Link href={`/${lang}/auth/signup`} style={{ backgroundColor: brandGreen }} className="rounded-full px-6 py-2 text-[14px] font-bold uppercase tracking-tight text-white shadow-lg">{isRtl ? "سجل" : "Sign Up"}</Link>
                  </>
                ) : (
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); setShowLangMenu(false); }} 
                      style={{ backgroundColor: brandGreen }}
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm transition-transform active:scale-95 relative z-[120]"
                    >
                      {userInitial}
                    </button>
                    {showUserMenu && (
                      <div className={clsx("absolute top-full mt-4 w-64 rounded-[24px] bg-white py-3 shadow-premium ring-1 ring-black/5 z-[130]", isRtl ? "left-0" : "right-0")}>
                        <Link href={`/${lang}/profile`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 group">
                          <User size={18} className="text-[#12AD65]" />
                          <span className="text-[15px] font-bold">{isRtl ? "ملفي الشخصي" : "My Profile"}</span>
                        </Link>
                        {/* إعادة قسم Saved للديسكتوب */}
                        <Link href={`/${lang}/saved`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 group">
                          <Bookmark size={18} className="text-[#12AD65]" />
                          <span className="text-[15px] font-bold">{isRtl ? "المحفوظات" : "Saved"}</span>
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 group">
                          <LogOut size={18} className="text-[#4B5563] group-hover:text-red-500" />
                          <span className="text-[15px] font-bold text-[#4B5563] group-hover:text-red-500">{isRtl ? "خروج" : "Logout"}</span>
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

      {createPortal(
        <div className={clsx(
          "fixed inset-0 z-[99999] flex flex-col bg-white transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-0 opacity-100 visible" : (isRtl ? "translate-x-full" : "-translate-x-full") + " opacity-0 invisible"
        )}>
          <div className="flex items-center justify-between p-6 bg-white border-b border-gray-50">
            <button onClick={() => setIsOpen(false)} className="p-2 -ms-2"><X size={26} /></button>
            <span className="text-lg font-medium tracking-[0.1em]">BEST <span style={{ color: brandGreen }}>DAR</span></span>
            <div className="w-10" /> 
          </div>

          <div className="px-6 py-10 flex flex-col items-center border-b border-gray-50">
            {!user ? (
              <div className="flex gap-4 w-full">
                <Link href={`/${lang}/auth/login`} onClick={() => setIsOpen(false)} className="flex-1 rounded-2xl bg-gray-50 py-4 text-center text-sm font-medium">Login</Link>
                <Link href={`/${lang}/auth/signup`} onClick={() => setIsOpen(false)} style={{ backgroundColor: brandGreen }} className="flex-1 rounded-2xl py-4 text-center text-sm font-medium text-white">Sign Up</Link>
              </div>
            ) : (
              <>
                <div style={{ backgroundColor: brandGreen }} className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-medium mb-4 shadow-xl shadow-green-100">
                  {userInitial}
                </div>
                <h3 className="text-xl font-medium text-brand-black mb-1">{user.user_metadata?.full_name || "Investor"}</h3>
                <div className="flex items-center gap-1 text-[#12AD65]">
                  <ShieldCheck size={14} />
                  <span className="text-[11px] font-medium uppercase tracking-tight">{isRtl ? "عضو موثق" : "Verified Member"}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {user && (
              <div className="grid grid-cols-3 gap-3 px-2">
                <Link href={`/${lang}/profile`} onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center py-5 bg-[#F8F9FA] rounded-[24px] gap-2 active:scale-95 transition-all">
                  <User size={20} className="text-[#12AD65]" />
                  <span className="text-[11px] font-medium text-gray-500">{isRtl ? "ملفي" : "Profile"}</span>
                </Link>
                {/* إعادة قسم Saved للموبايل */}
                <Link href={`/${lang}/saved`} onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center py-5 bg-[#F8F9FA] rounded-[24px] gap-2 active:scale-95 transition-all">
                  <Bookmark size={20} className="text-[#12AD65]" />
                  <span className="text-[11px] font-medium text-gray-500">{isRtl ? "المحفوظات" : "Saved"}</span>
                </Link>
                <button onClick={handleLogout} className="flex flex-col items-center justify-center py-5 bg-red-50/40 rounded-[24px] gap-2 active:scale-95 transition-all group">
                  <LogOut size={20} className="text-red-400 group-hover:text-red-600" />
                  <span className="text-[11px] font-medium text-red-400">{isRtl ? "خروج" : "Logout"}</span>
                </button>
              </div>
            )}

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={`/${lang}${link.href}`} onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-2xl p-4 text-gray-900 active:bg-gray-50 group">
                  <span className="text-[15px] font-medium group-hover:text-[#12AD65] transition-colors">{link.name}</span>
                  <ChevronRight size={18} className={clsx("text-[#6B7280]", isRtl && "rotate-180")} />
                </Link>
              ))}
            </div>
          </div>

          <div className="px-6 pb-12 bg-white">
            <p className="mb-4 text-center text-[12px] font-medium uppercase tracking-tight text-[#4B5563]">{isRtl ? "اللغة" : "Language"}</p>
            <div className="flex rounded-2xl bg-gray-100 p-1.5 shadow-inner">
              <button onClick={() => handleLangSwitch('en')} className={clsx("flex-1 rounded-xl py-3 text-[11px] font-medium transition-all", lang === 'en' ? "bg-white text-black shadow-sm" : "text-[#4B5563]")}>ENGLISH</button>
              <button onClick={() => handleLangSwitch('ar')} className={clsx("flex-1 rounded-xl py-3 text-[11px] font-medium transition-all", lang === 'ar' ? "bg-white text-black shadow-sm" : "text-[#4B5563]")}>العربية</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}