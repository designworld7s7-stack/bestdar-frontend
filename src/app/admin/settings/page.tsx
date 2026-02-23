'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Save, Loader2, Globe, Home, Users, Diamond, MessageSquare, UploadCloud, ImageIcon } from 'lucide-react';
import { Input } from '../components/UI';
import TeamMembersManager from '../components/TeamMembersManager';

export default function SiteSettingsPage() {
  const supabase = createClient();
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [activeTab, setActiveTab] = useState('global');

  // 1. حالة الإعدادات العامة
  const [settings, setSettings] = useState({
    id: 1, whatsapp_number: '', phone_number: '', contact_email: '', 
    facebook_url: '', instagram_url: '', promo_banner_en: '', promo_banner_ar: '', promo_active: false
  });

  // 2. حالة محتوى الأقسام (مصفوفة لكل الأقسام)
  const [contentList, setContentList] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      // جلب الإعدادات
      const { data: settingsData } = await supabase.from('site_settings').select('*').limit(1).single();
      if (settingsData) setSettings(settingsData);

      // جلب كل محتوى الأقسام
      const { data: contentData } = await supabase.from('site_content').select('*');
      if (contentData) setContentList(contentData);

      setLoadingFetch(false);
    };
    fetchAllData();
  }, [supabase]);

  // دالة الحفظ الشاملة
  const handleSave = async () => {
    setLoadingSave(true);
    try {
      // 1. حفظ الإعدادات
      await supabase.from('site_settings').update(settings).eq('id', settings.id);
      
      // 2. حفظ كل الأقسام التي تم تعديلها (Upsert لتحديث الموجود أو إضافته إذا لم يكن موجوداً)
      if (contentList.length > 0) {
        await supabase.from('site_content').upsert(contentList, { onConflict: 'section_key' });
      }
      
      alert('تم حفظ جميع التعديلات بنجاح! 🎉');
    } catch (error) {
      alert('Error saving data!');
    }
    setLoadingSave(false);
  };

  const updateSetting = (key: string, value: any) => setSettings(p => ({ ...p, [key]: value }));
  
  const updateContent = (sectionKey: string, field: string, value: string) => {
    setContentList(prev => {
      const exists = prev.find(item => item.section_key === sectionKey);
      if (exists) {
        return prev.map(item => item.section_key === sectionKey ? { ...item, [field]: value } : item);
      } else {
        // إذا لم يكن القسم موجوداً في قاعدة البيانات بعد، نقوم بإنشائه في الـ State
        return [...prev, { section_key: sectionKey, [field]: value }];
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, sectionKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${sectionKey}-${Date.now()}.${fileExt}`;
    
    // 🌟 التغيير هنا: استخدمنا 'cities-assets' بدلاً من 'site-images'
    const { error } = await supabase.storage.from('cities-assets').upload(fileName, file);
    
    if (!error) {
      const { data } = supabase.storage.from('cities-assets').getPublicUrl(fileName);
      updateContent(sectionKey, 'image_url', data.publicUrl);
    } else {
      // أضفنا رسالة الخطأ هنا لتساعدنا إذا حدث أي شيء
      alert('Error uploading image: ' + error.message);
    }
  };

  // --- مكون مساعد (Helper Component) لإنشاء بطاقة أي قسم بسهولة ---
  const ContentBlock = ({ sectionKey, title, hasImage = true }: { sectionKey: string, title: string, hasImage?: boolean }) => {
    const item = contentList.find(c => c.section_key === sectionKey) || { content_en: '', content_ar: '', image_url: '' };
    
    return (
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-6">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">{title} ({sectionKey})</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-1">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">English Content</label>
               <textarea 
                 value={item.content_en || ''} onChange={(e) => updateContent(sectionKey, 'content_en', e.target.value)}
                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm min-h-[120px] outline-none focus:border-[#12AD65] transition-all"
               />
            </div>
            <div className="space-y-1" dir="rtl">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">المحتوى العربي</label>
               <textarea 
                 value={item.content_ar || ''} onChange={(e) => updateContent(sectionKey, 'content_ar', e.target.value)}
                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm min-h-[120px] outline-none focus:border-[#12AD65] transition-all"
               />
            </div>
          </div>

          {hasImage && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section Image</label>
              <div className="h-[260px] rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group">
                {item.image_url ? (
                  <img src={item.image_url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-all" />
                ) : (
                  <ImageIcon size={32} className="text-slate-300 mb-2" />
                )}
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                  <span className="bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                    <UploadCloud size={16} /> Upload Image
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, sectionKey)} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loadingFetch) return <div className="p-20 text-center animate-pulse font-bold text-slate-400">Loading Configuration...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto pb-24 space-y-8">
      
      {/* Header & Save Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Site Configuration</h1>
          <p className="text-slate-500 mt-1">Manage all global settings and page contents in one place</p>
        </div>
        <button 
          onClick={handleSave} disabled={loadingSave}
          className="bg-[#12AD65] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#12AD65]/20 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {loadingSave ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {loadingSave ? 'SAVING...' : 'SAVE ALL CHANGES'}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        {[
          { id: 'global', icon: Globe, label: 'Global Settings' },
          { id: 'home', icon: Home, label: 'Home Page' },
          { id: 'about', icon: Users, label: 'About & Team' },
          { id: 'club', icon: Diamond, label: 'Investor Club' },
          { id: 'misc', icon: MessageSquare, label: 'Forms & Misc' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-[#12AD65]/10 text-[#12AD65]' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT --- */}
      
      {/* TAB 1: Global Settings */}
      {activeTab === 'global' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full mb-2"><h3 className="text-lg font-bold">Contact & Social</h3></div>
            <Input label="WhatsApp Number" value={settings.whatsapp_number} onChange={(v: string) => updateSetting('whatsapp_number', v)} />
            <Input label="Email Address" value={settings.contact_email} onChange={(v: string) => updateSetting('contact_email', v)} />
            <Input label="Facebook URL" value={settings.facebook_url} onChange={(v: string) => updateSetting('facebook_url', v)} />
            <Input label="Instagram URL" value={settings.instagram_url} onChange={(v: string) => updateSetting('instagram_url', v)} />
          </div>

          <div className="bg-amber-50 rounded-[32px] p-8 shadow-sm border border-amber-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-amber-900">Campaign Banner (Top Bar)</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm font-bold text-amber-700">Banner Active</span>
                <input type="checkbox" checked={settings.promo_active} onChange={(e) => updateSetting('promo_active', e.target.checked)} className="w-5 h-5 accent-[#12AD65]" />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="English Message" value={settings.promo_banner_en} onChange={(v: string) => updateSetting('promo_banner_en', v)} />
              <Input label="Arabic Message" value={settings.promo_banner_ar} onChange={(v: string) => updateSetting('promo_banner_ar', v)} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Home Page */}
      {activeTab === 'home' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <ContentBlock sectionKey="home_hero" title="Main Hero Banner" />
          <ContentBlock sectionKey="client_centric" title="Client Centric Section" />
        </div>
      )}

      {/* TAB 3: About & Team */}
      {activeTab === 'about' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <ContentBlock sectionKey="about_hero" title="About Us Hero" />
          <ContentBlock sectionKey="our_story" title="Our Story Section" />
          <ContentBlock sectionKey="team_section" title="Team Banner/Intro" />
          <TeamMembersManager />
        </div>
      )}

      {/* TAB 4: Investor Club */}
      {activeTab === 'club' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <ContentBlock sectionKey="investor_club" title="Investor Club Hero" />
          <ContentBlock sectionKey="tier_silver" title="Silver Tier Details" />
          <ContentBlock sectionKey="tier_gold" title="Gold Tier Details" />
          <ContentBlock sectionKey="tier_platinum" title="Platinum Tier Details" />
        </div>
      )}

      {/* TAB 5: Forms & Misc */}
      {activeTab === 'misc' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <ContentBlock sectionKey="lead_form_side" title="Side Image for Lead Forms" />
        </div>
      )}

    </div>
  );
}