'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  Users, Phone, Mail, Calendar, BellRing, Search, 
  ArrowUpRight, MapPin, DollarSign, Clock, Building, 
  FileText, CalendarDays, Filter
} from 'lucide-react';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLeadToast, setNewLeadToast] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const supabase = createClient();

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setLeads(data);
      setLoading(false);
    };

    fetchLeads();

    // الاستماع المباشر (Realtime) للطلبات الجديدة
    const channel = supabase.channel('realtime_leads')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'leads' }, 
        (payload) => {
          setLeads((currentLeads) => [payload.new, ...currentLeads]);
          
          const clientName = payload.new.full_name || 'عميل جديد';
          const source = payload.new.source || 'الموقع';
          setNewLeadToast(`🚀 طلب جديد من ${clientName} عبر (${source})`);
          
          setTimeout(() => setNewLeadToast(null), 6000);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // تصفية العملاء بناءً على البحث (الاسم، الهاتف، أو المصدر)
  const filteredLeads = leads.filter(lead => 
    (lead.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lead.phone || '').includes(searchTerm) ||
    (lead.source?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // مكون فرعي صغير لعرض المعلومات بشكل أنيق (إذا كانت موجودة)
  const InfoBadge = ({ icon: Icon, label, value }: { icon: any, label: string, value: any }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
        <Icon size={14} className="text-[#12AD65] mt-0.5 shrink-0" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">{label}</p>
          <p className="text-sm font-semibold text-slate-700 leading-tight">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 relative">
      
      {/* إشعار الطلبات الحية */}
      {newLeadToast && (
        <div className="fixed top-8 right-8 z-50 bg-[#12AD65] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-white/20 p-2 rounded-full">
            <BellRing size={20} className="animate-bounce" />
          </div>
          <span className="font-bold">{newLeadToast}</span>
        </div>
      )}

      {/* الرأس وشريط البحث */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="text-[#12AD65]" size={32} /> CRM & Leads
          </h1>
          <p className="text-slate-500 mt-1">Manage all your incoming inquiries in real-time</p>
        </div>
        
        <div className="bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 min-w-[300px]">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search name, phone, or source..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm bg-transparent font-medium text-slate-700"
          />
        </div>
      </div>

      {/* قائمة العملاء المحتملين */}
      <div className="space-y-6">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-bold animate-pulse bg-white rounded-[32px] border border-slate-100">Loading Leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-4 text-slate-400 bg-white rounded-[32px] border border-slate-100">
            <Filter size={48} className="opacity-20" />
            <p>No leads found matching your criteria.</p>
          </div>
        ) : (
          filteredLeads.map((lead, index) => (
            <div key={lead.id || index} className="bg-white rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              
              {/* شريط المصدر (Source Badge) لتحديد من أين أتى العميل */}
              <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl opacity-90">
                {lead.source || 'Website Form'}
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* 1. معلومات العميل الأساسية */}
                <div className="flex-1 min-w-[250px]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-[#12AD65]/10 text-[#12AD65] flex items-center justify-center font-bold text-xl shrink-0">
                      {lead.full_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{lead.full_name || 'Unknown Client'}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1 flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(lead.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <a href={`tel:${lead.country_code}${lead.phone}`} className="flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-[#12AD65] transition-colors w-fit">
                      <div className="p-2 bg-slate-50 rounded-lg"><Phone size={16} className="text-slate-400" /></div>
                      <span dir="ltr">{lead.country_code} {lead.phone || 'No phone'}</span>
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-[#12AD65] transition-colors w-fit">
                        <div className="p-2 bg-slate-50 rounded-lg"><Mail size={16} className="text-slate-400" /></div>
                        {lead.email}
                      </a>
                    )}
                  </div>

                  {/* زر الواتساب المباشر */}
                  {lead.phone && (
                    <a 
                      href={`https://wa.me/${(lead.country_code || '')}${(lead.phone || '').replace(/[^0-9]/g, '')}`} 
                      target="_blank" rel="noreferrer"
                      className="mt-6 w-fit bg-[#12AD65]/10 text-[#12AD65] hover:bg-[#12AD65] hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                    >
                      Chat on WhatsApp <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                {/* 2. تفاصيل العقار والطلب (تظهر فقط إذا كانت موجودة) */}
                <div className="flex-[2] space-y-6">
                  
                  {/* الرسالة والموضوع */}
                  {(lead.subject || lead.message) && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      {lead.subject && <h4 className="font-bold text-slate-800 mb-2">{lead.subject}</h4>}
                      {lead.message && <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{lead.message}</p>}
                    </div>
                  )}

                  {/* شبكة معلومات التأهيل (Qualifying Data Grid) */}
                  <div className="flex flex-wrap gap-3">
                    <InfoBadge icon={MapPin} label="Target City" value={lead.target_city} />
                    <InfoBadge icon={DollarSign} label="Budget Range" value={lead.budget_range} />
                    <InfoBadge icon={Clock} label="Timeline" value={lead.planning_timeline} />
                    <InfoBadge icon={Building} label="Project ID" value={lead.project_id} />
                    <InfoBadge icon={FileText} label="Doc Status" value={lead.document_status} />
                    <InfoBadge icon={DollarSign} label="Payment" value={lead.payment_preference} />
                  </div>

                  {/* تفاصيل موعد الاستشارة (إذا كان النموذج يخص حجز موعد) */}
                  {(lead.consultation_date || lead.preferred_day) && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-50">
                      <div className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Requested Consultation</div>
                      <InfoBadge icon={CalendarDays} label="Date" value={lead.consultation_date} />
                      <InfoBadge icon={Clock} label="Time" value={lead.consultation_time} />
                      <InfoBadge icon={Calendar} label="Preferred Day" value={lead.preferred_day} />
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}