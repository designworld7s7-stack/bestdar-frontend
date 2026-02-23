import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Users, Eye, Bookmark, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. جلب البيانات الحية من قاعدة البيانات بالتوازي
  const [
    { count: usersCount },
    { count: leadsCount },
    { count: viewsCount },
    { count: savedCount },
    { data: topContent }
  ] = await Promise.all([
    supabase.from('app_users').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
    supabase.from('saved_items').select('*', { count: 'exact', head: true }),
    // جلب الإحصائيات من الـ VIEW التي أنشأناها
    supabase.from('top_content_stats').select('*').limit(6)
  ]);

  const stats = [
    { label: 'Total Investors', value: usersCount || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Website Views', value: viewsCount || 0, icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'New Leads', value: leadsCount || 0, icon: MessageSquare, color: 'text-[#12AD65]', bg: 'bg-[#12AD65]/10' },
    { label: 'Saved Properties', value: savedCount || 0, icon: Bookmark, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8 p-2">
      {/* 2. بطاقات الإحصائيات الحية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-900">{stat.value.toLocaleString()}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. جدول المحتوى الأكثر زيارة (يقرأ من الـ View) */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-[#12AD65]" size={22} />
              Most Visited Content
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                  <th className="px-8 py-4 font-bold">Page Path</th>
                  <th className="px-8 py-4 font-bold">Type</th>
                  <th className="px-8 py-4 font-bold text-right">Total Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topContent?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-4 text-sm font-medium text-gray-700 truncate max-w-[280px]">
                      {item.page_path}
                    </td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        item.content_type === 'project' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {item.content_type}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 font-bold text-gray-900">
                        {item.total_views}
                        <ArrowUpRight size={14} className="text-gray-300 group-hover:text-[#12AD65]" />
                      </div>
                    </td>
                  </tr>
                ))}
                {(!topContent || topContent.length === 0) && (
                  <tr>
                    <td colSpan={3} className="px-8 py-10 text-center text-gray-400 italic text-sm">
                      No traffic data recorded yet. Visit some projects to see results!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. رسالة ترحيبية أو ملاحظات النظام */}
        <div className="space-y-6">
          <div className="bg-[#0A0A0A] p-8 rounded-[32px] text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">Welcome back!</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your dashboard is now connected to live data. You can track investor interests and project performance in real-time.
            </p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">System Status</span>
              <span className="text-[#12AD65] text-xs font-bold uppercase">Healthy</span>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Quick Insight</h4>
            <p className="text-sm text-gray-500">
              The metrics above help you identify which properties are getting the most attention from your Middle Eastern buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}