'use client';

import { useState } from 'react';
import { Section, Input, Checkbox } from '../../components/UI';
import { ImageIcon, UploadCloud, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function GuideHeroSection({ data, update }: any) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `cover-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`; 

    // 🎯 تم التحديث إلى guide-images بناءً على طلبك
    const { error: uploadError } = await supabase.storage
      .from('guide-images') 
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('guide-images')
      .getPublicUrl(filePath);

    update('image_url', publicUrlData.publicUrl);
    setUploading(false);
  };

  return (
    <Section title="2. Hero & Media" icon={<ImageIcon size={20} className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cover Image</label>
            <label className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-[#12AD65] bg-[#12AD65]/5 text-[#12AD65] rounded-2xl cursor-pointer hover:bg-[#12AD65]/10 transition-all font-bold">
              {uploading ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
              {uploading ? 'Uploading...' : 'Click to Upload Image'}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
            </label>
            
            <div className="mt-2 text-xs text-slate-400 text-center">Or</div>
            <Input placeholder="Paste image URL directly" value={data.image_url} onChange={(v: string) => update('image_url', v)} />
          </div>

          {/* 🎯 تم إضافة خيارات التحكم بالعرض هنا */}
          <div className="p-6 bg-white border border-slate-100 rounded-[24px] flex flex-col md:flex-row gap-6 md:gap-8">
           <Checkbox 
    label="Published" 
    checked={data.published} // 👈 عدل هذه
    onChange={(v: boolean) => update('published', v)} // 👈 وعدل هذه
  />
            <Checkbox 
              label="Featured (Home Page)" 
              checked={data.is_featured} 
              onChange={(v: boolean) => update('is_featured', v)} 
            />
            <Checkbox 
              label="Hero (Guides Page)" 
              checked={data.is_hero} 
              onChange={(v: boolean) => update('is_hero', v)} 
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center border-2 border-slate-100 rounded-[32px] bg-slate-50 overflow-hidden h-48 md:h-full relative">
          {uploading ? (
            <div className="text-[#12AD65] flex flex-col items-center gap-2">
              <Loader2 className="animate-spin" size={32} />
              <span className="text-xs font-bold uppercase">Processing...</span>
            </div>
          ) : data.image_url ? (
            <img src={data.image_url} alt="Cover Preview" className="w-full h-full object-cover" />
          ) : (
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Image Preview</p>
          )}
        </div>
      </div>
    </Section>
  );
}