'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Trash2, Upload, UserPlus, Loader2 } from 'lucide-react';

interface TeamMember {
  id: number;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  bio_en: string;
  bio_ar: string;
  image_url: string;
  display_order: number;
  created_at?: string;
}

export default function TeamMembersManager() {
  const supabase = createClient();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newMember, setNewMember] = useState({
    name_en: '', name_ar: '',
    role_en: '', role_ar: '',
    bio_en: '', bio_ar: '',
    image_url: ''
  });

  const fetchMembers = async () => {
    const { data } = await supabase
      .from('team')
      .select('*')
      .order('display_order', { ascending: true }); // ترتيب حسب display_order
    if (data) setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const fileName = `team-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    // استخدام سلة 'cities-assets'
    const { error: uploadError } = await supabase.storage.from('cities-assets').upload(fileName, file);

    if (uploadError) {
        alert('Error uploading: ' + uploadError.message);
        setLoading(false);
        return;
    }
    
    const { data } = supabase.storage.from('cities-assets').getPublicUrl(fileName);
    setNewMember({ ...newMember, image_url: data.publicUrl });
    setLoading(false);
  };

  const handleAddMember = async () => {
    if (!newMember.name_en || !newMember.image_url) {
        alert("Please enter at least the English name and upload an image.");
        return;
    }
    setLoading(true);
    
    // حساب الترتيب ليكون في نهاية القائمة
    const nextOrder = members.length > 0 ? Math.max(...members.map(m => m.display_order || 0)) + 1 : 1;

    const { error } = await supabase.from('team').insert([{
      ...newMember,
      display_order: nextOrder
      // created_at يتم إضافته تلقائياً بواسطة قاعدة البيانات عادةً
    }]);

    if (!error) {
      setNewMember({ name_en: '', name_ar: '', role_en: '', role_ar: '', bio_en: '', bio_ar: '', image_url: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchMembers();
      alert('Team member added successfully!');
    } else {
        alert('Error adding member: ' + error.message);
    }
    setLoading(false);
  };

  const handleDeleteMember = async (id: number) => {
      if(!confirm("Are you sure you want to delete this member?")) return;
      const { error } = await supabase.from('team').delete().eq('id', id);
      if (!error) fetchMembers();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <UserPlus className="text-[#12AD65]" />
        Team Members Management
      </h2>

      {/* قائمة الموظفين الحاليين */}
      <div className="mb-12">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Current Team Members:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {members.map(member => (
                  <div key={member.id} className="relative group bg-gray-50 rounded-xl p-4 text-center border hover:border-[#12AD65] transition-all">
                      <button onClick={() => handleDeleteMember(member.id)} className="absolute top-2 right-2 p-2 bg-white text-red-500 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all shadow-sm" title="Delete">
                          <Trash2 size={16} />
                      </button>
                      <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 border-4 border-white shadow-md">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name_en} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">{member.name_en}</h4>
                      <p className="text-xs text-gray-500">{member.role_en}</p>
                  </div>
              ))}
               {members.length === 0 && <p className="text-gray-400 text-sm col-span-4">No members added yet.</p>}
          </div>
      </div>

      {/* نموذج إضافة موظف جديد */}
      <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200">
        <h3 className="text-lg font-medium mb-6 text-gray-800">Add New Member:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* رفع الصورة */}
          <div className="md:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 transition cursor-pointer relative bg-white" onClick={() => fileInputRef.current?.click()}>
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" hidden />
             {loading && !newMember.name_en ? <Loader2 className="animate-spin text-[#12AD65]" /> : (
                 newMember.image_url ? 
                 <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                   <img src={newMember.image_url} alt="Preview" className="w-full h-full object-cover" />
                 </div> :
                 <><Upload className="text-gray-400 mb-2" /><p className="text-sm text-gray-500 font-medium">Click to upload photo</p></>
             )}
          </div>

          <input type="text" placeholder="Name (EN)" value={newMember.name_en} onChange={e => setNewMember({...newMember, name_en: e.target.value})} className="w-full bg-white border-2 border-transparent rounded-xl py-3 px-4 text-sm outline-none focus:border-[#12AD65] transition-all" />
          <input type="text" placeholder="الاسم (عربي)" value={newMember.name_ar} onChange={e => setNewMember({...newMember, name_ar: e.target.value})} className="w-full bg-white border-2 border-transparent rounded-xl py-3 px-4 text-sm outline-none focus:border-[#12AD65] transition-all text-right" dir="rtl" />
          
          <input type="text" placeholder="Role (EN)" value={newMember.role_en} onChange={e => setNewMember({...newMember, role_en: e.target.value})} className="w-full bg-white border-2 border-transparent rounded-xl py-3 px-4 text-sm outline-none focus:border-[#12AD65] transition-all" />
          <input type="text" placeholder="الدور الوظيفي (عربي)" value={newMember.role_ar} onChange={e => setNewMember({...newMember, role_ar: e.target.value})} className="w-full bg-white border-2 border-transparent rounded-xl py-3 px-4 text-sm outline-none focus:border-[#12AD65] transition-all text-right" dir="rtl" />

          <textarea placeholder="Bio (EN)" rows={3} value={newMember.bio_en} onChange={e => setNewMember({...newMember, bio_en: e.target.value})} className="w-full bg-white border-2 border-transparent rounded-xl py-3 px-4 text-sm outline-none focus:border-[#12AD65] transition-all resize-none" />
          <textarea placeholder="النبذة (عربي)" rows={3} value={newMember.bio_ar} onChange={e => setNewMember({...newMember, bio_ar: e.target.value})} className="w-full bg-white border-2 border-transparent rounded-xl py-3 px-4 text-sm outline-none focus:border-[#12AD65] transition-all resize-none text-right" dir="rtl" />
        </div>

        <button onClick={handleAddMember} disabled={loading} className="w-full bg-[#12AD65] hover:bg-[#0e8a50] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-[#12AD65]/20">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Add Member To Team</>}
        </button>
      </div>
    </div>
  );
}