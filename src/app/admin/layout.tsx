import React from 'react';
import Link from 'next/link';
import '../globals.css'; 
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Globe, 
  Settings, 
  BookOpen, 
  MessageSquare,
  ChevronRight,
  Mail // أضفنا أيقونة البريد هنا
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
          {/* --- القائمة الجانبية Sidebar --- */}
          <aside className="w-64 bg-slate-900 text-white fixed h-full z-50 flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <h1 className="text-xl font-bold text-[#12AD65] flex items-center gap-2">
                Best Dar <span className="text-[10px] bg-[#12AD65]/20 px-2 py-0.5 rounded text-[#12AD65] uppercase tracking-widest">Admin</span>
              </h1>
            </div>

            {/* أضفنا overflow-y-auto لضمان أنه إذا زادت الروابط يمكنك التمرير */}
            <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
              <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} label="Overview" />
              
              <div className="pt-4 pb-2 px-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Content</p>
              </div>
              <SidebarLink href="/admin/projects" icon={<Building2 size={18} />} label="Projects" />
              <SidebarLink href="/admin/guides" icon={<BookOpen size={18} />} label="Guides" />
              
              <div className="pt-4 pb-2 px-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiries & Marketing</p>
              </div>
              <SidebarLink href="/admin/investors" icon={<Users size={18} />} label="Investors" />
              <SidebarLink href="/admin/leads" icon={<MessageSquare size={18} />} label="Leads" />
              {/* الرابط الجديد للنشرة البريدية */}
              <SidebarLink href="/admin/newsletter" icon={<Mail size={18} />} label="Newsletter" />
              
              <div className="pt-4 border-t border-slate-800 mt-4">
                <SidebarLink href="/admin/settings" icon={<Settings size={18} />} label="Site Settings" />
              </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
               <Link href="/" className="flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors group">
                  <span className="flex items-center gap-2"><Globe size={14} /> View Website</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </aside>

          {/* --- المحتوى الرئيسي Main --- */}
          {/* تأكد من وجود ml-64 دائماً لكي لا يتداخل المحتوى مع الـ Sidebar */}
          <main className="flex-1 ml-64 min-h-screen flex flex-col relative">
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 px-8 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Control Center</h2>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Live System</span>
              </div>
            </header>

            {/* p-8 تعطي مساحة مريحة للمحتوى بالداخل */}
            <div className="p-8 flex-1 overflow-x-hidden">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 hover:text-[#12AD65] transition-all text-sm font-medium text-slate-300 group"
    >
      <span className="text-slate-500 group-hover:text-[#12AD65] transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}