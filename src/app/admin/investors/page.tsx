import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { 
  User, Wallet, MapPin, Phone, 
  Mail, Briefcase, Bookmark, Globe, ExternalLink, Building2 
} from 'lucide-react';

export default async function InvestorsHub() {
  const supabase = await createClient();

  // جلب البيانات من الـ View المحدث (تأكد أنك قمت بعمل Drop و Create للـ View كما فعلنا)
  const { data: investors, error } = await supabase
    .from('admin_investor_directory')
    .select('*');

  if (error) return <div className="p-10 text-red-500">Error loading investors: {error.message}</div>;

  return (
    <div className="p-4 lg:p-8 space-y-8 bg-[#F9FAFB] min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investors Hub</h1>
          <p className="text-gray-500">Manage your leads and analyze investor profiles with deep insights.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border shadow-sm text-sm font-medium">
            Total: <span className="text-[#12AD65]">{investors?.length || 0}</span>
          </div>
        </div>
      </header>

      {/* Grid of Investor Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {investors?.map((investor) => (
          <div key={investor.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row gap-6">
              
              {/* Profile Side - الأساسيات والمالية */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                    {investor.avatar_url ? (
                      <img src={investor.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{investor.full_name || 'Anonymous User'}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        investor.investor_tier === 'VIP' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {investor.investor_tier || 'Standard'}
                      </span>
                      {investor.is_investor && (
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Investor</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <span className="truncate">{investor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-bold text-[#12AD65]">
                    <Phone size={16} className="text-gray-400" />
                    <span>{investor.whatsapp_number || investor.account_phone || 'No Phone'}</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <Wallet size={14} /> Budget
                        </div>
                        <span className="font-bold text-gray-900">{investor.budget || 'Not set'}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <Briefcase size={14} /> Total Invested
                        </div>
                        <span className="font-bold text-[#12AD65]">{investor.total_invested || '$0'}</span>
                    </div>
                </div>
              </div>

              {/* Interests Side - المعلومات الجغرافية ونوع العقار */}
              <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-6 pt-6 sm:pt-0 space-y-5">
                
                {/* الموقع والمدن */}
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MapPin size={14} className="text-[#12AD65]" /> Location Preferences
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {/* عرض الدول */}
                    {investor.countries_of_interest?.map((c: string) => (
                      <span key={c} className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase">{c}</span>
                    ))}
                    {/* عرض المدن */}
                    {investor.cities_of_interest?.map((city: string) => (
                      <span key={city} className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-[10px] font-bold">{city}</span>
                    ))}
                    {(!investor.countries_of_interest && !investor.cities_of_interest) && (
                        <span className="text-gray-400 text-xs italic">No areas specified</span>
                    )}
                  </div>
                </div>

                {/* نوع العقار */}
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Building2 size={14} className="text-[#12AD65]" /> Property Types
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {investor.property_types?.map((type: string) => (
                      <span key={type} className="bg-[#12AD65]/10 text-[#12AD65] px-3 py-1 rounded-lg text-[10px] font-bold border border-[#12AD65]/20">
                        {type}
                      </span>
                    ))}
                    {(!investor.property_types || investor.property_types.length === 0) && (
                      <span className="text-gray-400 text-xs italic">Not specified</span>
                    )}
                  </div>
                </div>

                {/* Engagement */}
                <div className="pt-2 border-t border-dashed border-gray-100">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight flex items-center gap-2">
                        <Bookmark size={12} /> Saved
                    </span>
                    <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">{investor.total_saved}</span>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="flex gap-2 pt-2">
                  <a 
                    href={`https://wa.me/${investor.whatsapp_number?.replace(/\D/g,'')}`} 
                    target="_blank"
                    className="flex-1 bg-[#12AD65] text-white text-center py-3 rounded-2xl text-[11px] font-bold hover:bg-[#0e8a50] transition-all shadow-lg shadow-[#12AD65]/10"
                  >
                    Contact via WhatsApp
                  </a>
                  <button className="p-3 bg-gray-100 rounded-2xl text-gray-600 hover:bg-gray-200 transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}