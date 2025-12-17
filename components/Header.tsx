"use client";

import Link from "next/link";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from '@/lib/auth';

function AuthArea({ mobile }: { mobile?: boolean }) {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }

    if (menuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  if (loading) {
    return (
      <div className={mobile ? 'py-2' : ''}>
        <span className="text-sm text-gray-600">Loading…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={mobile ? 'flex flex-col gap-2' : 'flex items-center gap-2'}>
        <Link href="/auth/login" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 text-center">
          Login
        </Link>
        <Link href="/auth/login/signup" className="text-sm font-medium text-indigo-600">
          Sign up
        </Link>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-sm font-medium text-gray-900">
          {profile?.full_name ?? user.email}
        </Link>
        <button
          onClick={async () => {
            await signOut();
            router.push('/');
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((s) => !s)}
        aria-expanded={menuOpen}
        className="flex items-center gap-3"
      >
        {profile?.avatar_url ? (
          <Image src={profile.avatar_url} alt={profile?.full_name ?? user.email ?? 'Avatar'} width={36} height={36} className="rounded-full" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            {(profile?.full_name ?? user.email ?? '')?.charAt(0)?.toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-gray-900 text-start hidden sm:inline">{profile?.full_name ?? user.email}</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-md z-50">
          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Profile
          </Link>
          <button
            onClick={async () => {
              setMenuOpen(false);
              await signOut();
              router.push('/');
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
  const isEn = pathname === "/en" || pathname.startsWith("/en/");

  // Switch keeps the same sub-path when possible
  const switchHref = isAr
    ? pathname.replace(/^\/ar(?=\/|$)/, "/en")
    : isEn
    ? pathname.replace(/^\/en(?=\/|$)/, "/ar")
    : "/ar"; // fallback if you're on "/"

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href={isAr ? "/ar" : "/en"} className="text-xl font-bold text-gray-900 whitespace-nowrap">
            BestDar
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Properties
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Guides
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Investor Club
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href={switchHref} className="text-sm font-medium text-gray-700 hover:text-gray-900">
              EN / AR
            </Link>
            {/* Auth area */}
            <AuthArea />
          </div>

          <button
            className="md:hidden rounded-lg border border-gray-300 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 md:hidden">
            <Link href="#" className="text-sm font-medium text-gray-700">
              Properties
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700">
              Guides
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700">
              Investor Club
            </Link>

            <div className="mt-2 flex flex-col gap-2">
              <Link href={switchHref} className="text-sm font-medium text-gray-700 text-start">
                EN / AR
              </Link>
              <AuthArea mobile />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
