'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Mail, Download, Send, Users, X, Save, Clock, Calendar, RefreshCw } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { sendNewsletter } from '@/app/actions/sendEmail';

export default function NewsletterHub() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [content, setContent] = useState({ title: '', body: '', date: '', status: 'draft' });
  
  const supabase = createClient();

  const fetchSubs = async () => {
    setIsRefreshing(true);
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Supabase Error:", error);
      toast.error("Security/Policy Error: " + error.message);
    } else {
      setSubscribers(data || []);
      if (data && data.length > 0) toast.success(`Loaded ${data.length} subscribers`);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleExport = () => {
    if (subscribers.length === 0) return toast.error("No data to export");
    const csvContent = "data:text/csv;charset=utf-8,Email,Source,Date\n" 
      + subscribers.map(s => `${s.email},${s.source},${s.created_at}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
  };

  const saveInsight = async (targetStatus: 'draft' | 'scheduled') => {
  if (!content.title || !content.body) return toast.error("Please fill all fields");
  
  setLoading(true);

  // إذا اختار المستخدم "Schedule" ولم يضع تاريخاً، نعتبرها "Send Now"
  if (targetStatus === 'scheduled' && !content.date) {
    const emailList = subscribers.map(s => s.email);
    
    // تنفيذ الإرسال الحقيقي عبر Resend
    const res = await sendNewsletter(emailList, content.title, content.body);
    
    if (res.success) {
      toast.success("Done! Emails delivered to all subscribers.");
    } else {
      toast.error("Sending failed. Check Resend dashboard.");
      setLoading(false);
      return;
    }
  }

  // حفظ نسخة في قاعدة بيانات سوبابيس للتوثيق
  const { error } = await supabase.from('newsletter_insights').insert([{
    title: content.title,
    content: content.body,
    status: targetStatus === 'scheduled' && !content.date ? 'sent' : targetStatus,
    scheduled_at: content.date || null
  }]);

  if (!error) {
    setIsModalOpen(false);
    setContent({ title: '', body: '', date: '', status: 'draft' });
    if (targetStatus === 'draft') toast.success("Saved to drafts");
  }
  
  setLoading(false);
};

  return (
    <div className="max-w-full space-y-8">
      <Toaster position="top-right" />
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Newsletter Hub</h1>
          <p className="text-slate-500 font-medium">Manage your {subscribers.length} loyal subscribers.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 bg-white border-2 border-slate-100 px-5 py-2.5 rounded-2xl text-[11px] font-black hover:bg-slate-50 transition-all">
            <Download size={16} /> EXPORT CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#12AD65] text-white px-8 py-2.5 rounded-2xl text-[11px] font-black hover:shadow-lg hover:shadow-[#12AD65]/30 transition-all">
            <Send size={16} /> NEW INSIGHT
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Subscriber List Table */}
        <div className="xl:col-span-2 bg-white rounded-[35px] border border-slate-100 shadow-sm overflow-hidden min-h-[450px] flex flex-col">
          <div className="p-7 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-bold text-slate-800 flex items-center gap-3">
              <Users size={20} className="text-[#12AD65]" /> 
              Subscribers List
            </h3>
            <button onClick={fetchSubs} className={`p-2 rounded-xl transition-all ${isRefreshing ? 'animate-spin text-[#12AD65]' : 'text-slate-400 hover:bg-slate-100'}`}>
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-x-auto">
            {subscribers.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Email Address</th>
                    <th className="px-8 py-5">Source</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold text-slate-700">{sub.email}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase">
                          {sub.source || 'Direct'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="inline-flex items-center gap-1.5 text-[#12AD65] text-[10px] font-black">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#12AD65] animate-pulse" /> ACTIVE
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 opacity-30">
                <Mail size={60} strokeWidth={1} />
                <p className="mt-4 font-bold uppercase tracking-widest text-xs">No Data Synchronized</p>
              </div>
            )}
          </div>
        </div>

        {/* 🗓️ Schedule & Marketing Side */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
               <div className="w-12 h-12 bg-[#12AD65] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#12AD65]/20">
                  <Clock className="text-white" size={24} />
               </div>
               <h3 className="text-2xl font-bold mb-3 tracking-tight">Schedule Update</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                 Reach your investors at the perfect time. Draft and schedule market trends now.
               </p>
               <button 
                onClick={() => { setIsModalOpen(true); setContent({...content, status: 'scheduled'}) }}
                className="w-full bg-[#12AD65] py-4 rounded-2xl text-[12px] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#12AD65]/20"
               >
                 START SCHEDULING
               </button>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-5">
                <Send size={200} />
             </div>
          </div>
        </div>
      </div>

      {/* --- Insight Builder Modal مع زر الجدولة --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Calendar size={20} className="text-[#12AD65]" />
                {content.status === 'scheduled' ? 'Schedule Monthly Insight' : 'Create New Insight'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Insight Title</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#12AD65] rounded-2xl outline-none font-bold transition-all"
                  placeholder="e.g. Why Invest in Dubai Marina this March?"
                  value={content.title}
                  onChange={(e) => setContent({...content, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Content Description</label>
                <textarea 
                  rows={6}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#12AD65] rounded-2xl outline-none text-sm leading-relaxed transition-all"
                  placeholder="Share your market expertise..."
                  value={content.body}
                  onChange={(e) => setContent({...content, body: e.target.value})}
                />
              </div>

              {/* حقل اختيار التاريخ يظهر بوضوح عند الجدولة */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 block">Scheduled Launch (Optional)</label>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-blue-500" />
                  <input 
                    type="datetime-local" 
                    className="bg-transparent w-full outline-none text-sm font-bold text-blue-700"
                    value={content.date}
                    onChange={(e) => setContent({...content, date: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-4">
              <button 
                onClick={() => saveInsight('draft')} 
                disabled={loading}
                className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl text-xs font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <Save size={16} /> SAVE DRAFT
              </button>
              <button 
                onClick={() => saveInsight('scheduled')} 
                disabled={loading}
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar size={16} /> {content.date ? 'CONFIRM SCHEDULE' : 'SEND TO ALL'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}