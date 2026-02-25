'use client';

import React, { useState, useEffect } from 'react';
import { ImageIcon, Loader2, LayoutGrid, Upload } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Section, Input } from '../../components/UI';
import { MEDIA_CONFIG } from "@/constants/media";

interface ProjectMediaProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectMedia({ formData, setFormData }: ProjectMediaProps) {
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingFloor, setUploadingFloor] = useState(false);
  const [galleryList, setGalleryList] = useState<{name: string, url: string}[]>([]);
  const supabase = createClient();

  // 1. جلب الصور الحالية للترتيب
  const fetchGalleryImages = async () => {
    if (!formData.image_url) return;
    const { data: files } = await supabase.storage
      .from(MEDIA_CONFIG.bucket)
      .list(formData.image_url);

    if (files) {
      const imagesWithUrls = files
        .filter(f => !f.name.includes('.empty'))
        .map(f => ({
          name: f.name,
          url: supabase.storage.from(MEDIA_CONFIG.bucket).getPublicUrl(`${formData.image_url}/${f.name}`).data.publicUrl
        }));
      setGalleryList(imagesWithUrls);
    }
  };

  useEffect(() => { fetchGalleryImages(); }, [formData.image_url]);

  // 2. دالة رفع الجاليري
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const folderPath = MEDIA_CONFIG.getGalleryFolder(formData.slug);
    if (!folderPath || files.length === 0) return;

    try {
      setUploadingGallery(true);
      await Promise.all(files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        await supabase.storage.from(MEDIA_CONFIG.bucket).upload(`${folderPath}/${fileName}`, file);
      }));
      setFormData({ ...formData, image_url: folderPath });
      await fetchGalleryImages();
    } finally { setUploadingGallery(false); }
  };

  // 3. دالة رفع المخططات (تم استعادتها)
  const handleFloorPlanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const folderPath = MEDIA_CONFIG.getFloorFolder(formData.slug);
    if (!folderPath || files.length === 0) return;

    try {
      setUploadingFloor(true);
      await Promise.all(files.map(async (file) => {
        await supabase.storage.from(MEDIA_CONFIG.bucket).upload(`${folderPath}/${file.name}`, file);
      }));
      setFormData({ ...formData, floor_plan_urls: folderPath });
      alert("تم رفع المخططات بنجاح!");
    } finally { setUploadingFloor(false); }
  };

  // 4. دالة رفع الصورة المصغرة (تم استعادتها)
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const folderPath = MEDIA_CONFIG.getGalleryFolder(formData.slug);
    if (!file || !folderPath) return;

    try {
      const fileName = `thumb-${Date.now()}-${file.name}`;
      await supabase.storage.from(MEDIA_CONFIG.bucket).upload(`${folderPath}/${fileName}`, file);
      const { data } = supabase.storage.from(MEDIA_CONFIG.bucket).getPublicUrl(`${folderPath}/${fileName}`);
      setFormData({ ...formData, thumbnail_url: data.publicUrl });
      alert("تم رفع المصغرة بنجاح!");
    } catch (err) { console.error(err); }
  };

  const handleOrderChange = (fileName: string, orderValue: number) => {
    const currentOrder = formData.gallery_order || {};
    setFormData({ ...formData, gallery_order: { ...currentOrder, [fileName]: orderValue } });
  };

  return (
    <Section title="2. Media & Gallery" icon={<ImageIcon className="text-[#12AD65]"/>}>
      <div className="space-y-10">
        
        {/* الصف الأول: الجاليري والترتيب */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 border-2 border-dashed rounded-2xl border-gray-100 bg-white shadow-sm">
            <label className="text-sm font-black block mb-4 text-slate-800">1. Upload Gallery Images</label>
            <input type="file" multiple onChange={handleGalleryUpload} accept="image/*" className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#12AD65]/10 file:text-[#12AD65] hover:file:bg-[#12AD65]/20 cursor-pointer" />
            {uploadingGallery && <Loader2 className="animate-spin text-[#12AD65] mt-4" />}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-4 tracking-widest">Image Sort Order</label>
            <div className="grid grid-cols-3 gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {galleryList.map((file) => (
                <div key={file.name} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm">
                  <img src={file.url} className="w-full h-full object-cover" />
                  <input 
                    type="number" 
                    value={formData.gallery_order?.[file.name] || ''}
                    placeholder="#"
                    className="absolute top-1 right-1 w-7 h-7 text-center rounded-md border border-[#12AD65]/30 bg-white/90 text-[10px] font-bold text-[#12AD65] shadow-sm outline-none focus:border-[#12AD65]"
                    onChange={(e) => handleOrderChange(file.name, parseInt(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-gray-50" />

        {/* الصف الثاني: المخططات والمصغرة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* رافع المخططات */}
          <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid size={18} className="text-[#12AD65]" />
              <label className="text-sm font-black text-slate-800">2. Floor Plans</label>
            </div>
            <input type="file" multiple onChange={handleFloorPlanUpload} accept="image/*" className="text-xs w-full mb-3" />
            <Input label="Floor Plans Path" value={formData.floor_plan_urls || ''} readOnly className="bg-slate-50 border-none text-[10px]" />
            {uploadingFloor && <Loader2 className="animate-spin text-[#12AD65] mt-2" />}
          </div>

          {/* رافع المصغرة */}
          <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Upload size={18} className="text-[#12AD65]" />
              <label className="text-sm font-black text-slate-800">3. Main Thumbnail</label>
            </div>
            <label className="cursor-pointer bg-[#12AD65] hover:bg-[#0f8e52] text-white px-6 py-2 rounded-xl text-xs font-bold transition-all inline-block mb-3">
              <input type="file" className="hidden" onChange={handleThumbnailUpload} accept="image/*" />
              Choose Thumbnail
            </label>
            <Input label="Thumbnail Public URL" value={formData.thumbnail_url || ''} readOnly className="bg-slate-50 border-none text-[10px]" />
          </div>
        </div>

      </div>
    </Section>
  );
}