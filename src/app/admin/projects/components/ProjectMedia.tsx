'use client';

import React, { useState } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Section, Input } from '../../components/UI';
import { MEDIA_CONFIG } from "@/constants/media";// 1. التعديل الجوهري: تحويل الوجهة إلى الباكت الذي أثبت نجاحه


interface ProjectMediaProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectMedia({ formData, setFormData }: ProjectMediaProps) {
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingFloor, setUploadingFloor] = useState(false);
  const supabase = createClient();

  // دالة رفع الجاليري (ترفع الآن إلى project-images)
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const folderPath = MEDIA_CONFIG.getGalleryFolder(formData.slug);

    if (!folderPath) {
      alert("يرجى إدخال الـ Slug أولاً لإنشاء مجلد المشروع");
      return;
    }
    if (files.length === 0) return;

    try {
      setUploadingGallery(true);
      const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = `${folderPath}/${fileName}`;

        const { error } = await supabase.storage
          .from(MEDIA_CONFIG.bucket)
          .upload(filePath, file, { 
            upsert: true,
            contentType: file.type // يضمن التعرف على الملف كصورة لمنع CORB
          });

        if (error) throw error;
      });

      await Promise.all(uploadPromises);
      
      // نخزن فقط اسم المجلد لكي يقوم الـ Frontend بعمل list له
      setFormData({ ...formData, image_url: folderPath });
      alert(`تم رفع ${files.length} صور إلى مجلد ${folderPath} بنجاح!`);
    } catch (error: any) {
      alert("خطأ في الرفع: " + error.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  // دالة رفع المخططات (ترفع الآن إلى project-images)
  const handleFloorPlanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const folderPath = MEDIA_CONFIG.getFloorFolder(formData.slug);

    if (!folderPath || files.length === 0) return;

    try {
      setUploadingFloor(true);
      const uploadPromises = files.map(async (file) => {
        const filePath = `${folderPath}/${file.name}`;
        const { error } = await supabase.storage
          .from(MEDIA_CONFIG.bucket)
          .upload(filePath, file, { 
            upsert: true,
            contentType: file.type 
          });
        if (error) throw error;
      });

      await Promise.all(uploadPromises);
      setFormData({ ...formData, floor_plan_urls: folderPath });
      alert(`تم رفع المخططات إلى مجلد ${folderPath} بنجاح!`);
    } catch (error: any) {
      alert("خطأ: " + error.message);
    } finally {
      setUploadingFloor(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const folderPath = MEDIA_CONFIG.getGalleryFolder(formData.slug);
    if (!file || !folderPath) return;

    try {
      const fileName = `thumb-${Date.now()}-${file.name}`;
      const filePath = `${folderPath}/${fileName}`;

      const { error } = await supabase.storage
        .from(MEDIA_CONFIG.bucket)
        .upload(filePath, file, { 
          upsert: true, 
          contentType: file.type 
        });

      if (error) throw error;

      const { data } = supabase.storage.from(MEDIA_CONFIG.bucket).getPublicUrl(filePath);
      setFormData({ ...formData, thumbnail_url: data.publicUrl });
      alert("تم رفع المصغرة بنجاح!");
    } catch (error: any) {
      alert("خطأ: " + error.message);
    }
  };

  return (
    <Section title="2. Media & Gallery" icon={<ImageIcon className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border-2 border-dashed rounded-xl border-gray-100">
          <label className="text-sm font-bold block mb-2">Project Images (Auto-Folder)</label>
          <input type="file" multiple onChange={handleGalleryUpload} accept="image/*" className="text-xs" />
          {uploadingGallery && <Loader2 className="animate-spin text-[#12AD65] mt-2" />}
        </div>

        <div className="p-4 border-2 border-dashed rounded-xl border-gray-100">
          <label className="text-sm font-bold block mb-2">Floor Plans (Auto-Folder)</label>
          <input type="file" multiple onChange={handleFloorPlanUpload} accept="image/*" className="text-xs" />
          {uploadingFloor && <Loader2 className="animate-spin text-[#12AD65] mt-2" />}
        </div>

        <div className="md:col-span-2 space-y-3">
          <Input 
            label="Thumbnail URL" 
            value={formData.thumbnail_url || ''} 
            onChange={(v: string) => setFormData({...formData, thumbnail_url: v})} 
          />
          <label className="cursor-pointer bg-[#12AD65] text-white px-4 py-2 rounded-lg text-xs inline-block">
            <input type="file" className="hidden" onChange={handleThumbnailUpload} accept="image/*" />
            Upload Thumbnail
          </label>
        </div>
      </div>
    </Section>
  );
}