import React from 'react';
import Link from 'next/link';
import '../globals.css'; // <--- أضف هذا السطر فوراً (تأكد من المسار الصحيح لملف الـ CSS)
import { LayoutDashboard, Building2, Users, Globe, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
          <aside className="w-64 bg-slate-900 text-white fixed h-full z-50">
            <div className="p-6">
              <h1 className="text-xl font-bold text-[#12AD65] flex items-center gap-2">
                Best Dar <span className="text-xs bg-[#12AD65]/20 px-2 py-0.5 rounded text-white">Admin</span>
              </h1>
            </div>
            <nav className="mt-4 px-4 space-y-2">
              <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} label="Overview" />
              <SidebarLink href="/admin/projects" icon={<Building2 size={18} />} label="Projects" />
              <SidebarLink href="/admin/leads" icon={<Users size={18} />} label="Leads" />
              <SidebarLink href="/admin/site-content" icon={<Globe size={18} />} label="Site Content" />
              <SidebarLink href="/admin/settings" icon={<Settings size={18} />} label="Settings" />
            </nav>
          </aside>
          <main className="flex-1 ml-64 p-8">
            <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
              <h2 className="font-semibold text-lg">Admin Dashboard Control</h2>
              <Link href="/" className="text-sm text-gray-500 hover:text-black">View Website →</Link>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
      {icon}
      {label}
    </Link>
  );
}