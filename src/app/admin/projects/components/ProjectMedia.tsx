'use client';

import React, { useState, useEffect } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
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
  // ✨ الحالة الجديدة لحفظ الصور المرفوعة وعرضها للترتيب
  const [galleryList, setGalleryList] = useState<{name: string, url: string}[]>([]);
  const supabase = createClient();

  // ✨ دالة لجلب الصور الحالية من المجلد لعرضها
  const fetchGalleryImages = async () => {
    if (!formData.image_url) return;
    
    const { data: files, error } = await supabase.storage
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

  // جلب الصور عند تحميل المكون أو تغير المسار
  useEffect(() => {
    fetchGalleryImages();
  }, [formData.image_url]);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const folderPath = MEDIA_CONFIG.getGalleryFolder(formData.slug);

    if (!folderPath) {
      alert("يرجى إدخال الـ Slug أولاً");
      return;
    }

    try {
      setUploadingGallery(true);
      const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = `${folderPath}/${fileName}`;
        await supabase.storage.from(MEDIA_CONFIG.bucket).upload(filePath, file);
      });

      await Promise.all(uploadPromises);
      setFormData({ ...formData, image_url: folderPath });
      await fetchGalleryImages(); // تحديث القائمة فوراً بعد الرفع
    } catch (error: any) {
      alert("خطأ: " + error.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleOrderChange = (fileName: string, orderValue: number) => {
    // تحديث مصفوفة الترتيب في formData
    const currentOrder = formData.gallery_order || {};
    setFormData({
      ...formData,
      gallery_order: { ...currentOrder, [fileName]: orderValue }
    });
  };

  return (
    <Section title="2. Media & Gallery" icon={<ImageIcon className="text-[#12AD65]"/>}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* مربع الرفع */}
          <div className="p-6 border-2 border-dashed rounded-2xl border-gray-100 hover:border-[#12AD65] transition-colors">
            <label className="text-sm font-bold block mb-4 text-slate-700">Project Gallery Images</label>
            <input type="file" multiple onChange={handleGalleryUpload} accept="image/*" className="text-xs" />
            {uploadingGallery && <Loader2 className="animate-spin text-[#12AD65] mt-4" />}
          </div>

          {/* معاينة وترتيب الصور */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-400 block mb-4">Set Image Order</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-2">
              {galleryList.map((file) => (
                <div key={file.name} className="relative group aspect-square">
                  <img src={file.url} className="w-full h-full object-cover rounded-xl border-2 border-transparent group-hover:border-[#12AD65] transition-all" />
                  <input 
                    type="number" 
                    value={formData.gallery_order?.[file.name] || ''}
                    placeholder="#"
                    className="absolute -top-2 -right-2 w-8 h-8 text-center rounded-lg border-2 border-[#12AD65] bg-white text-[10px] font-bold shadow-lg focus:ring-2 ring-[#12AD65] outline-none"
                    onChange={(e) => handleOrderChange(file.name, parseInt(e.target.value))}
                  />
                </div>
              ))}
              {galleryList.length === 0 && <p className="col-span-full text-center text-[10px] text-slate-400 py-10">Upload images to start ordering</p>}
            </div>
          </div>
        </div>

        {/* المخططات والمصغرة تتبع هنا... (نفس كودك السابق) */}
      </div>
    </Section>
  );
}