'use client';

import React, { useState } from 'react';
import { LayoutGrid, Plus, Loader2 } from 'lucide-react';
import { Section, Input } from '../../components/UI';
import { createClient } from '@/utils/supabase/client';
// استيراد الدستور لضمان توحيد المسارات
import { MEDIA_CONFIG } from './ProjectMedia'; 

interface ProjectFloorPlansProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectFloorPlans({ formData, setFormData }: ProjectFloorPlansProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleFloorPlanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const slug = formData.slug?.trim().toLowerCase();

    if (!slug) {
      alert("يرجى إدخال الـ Slug أولاً لتحديد مجلد المخططات");
      return;
    }
    if (files.length === 0) return;

    try {
      setUploading(true);
      // استخدام المسار الموحد من الدستور
      const folderPath = MEDIA_CONFIG.getFloorFolder(slug);

      const uploadPromises = files.map(async (file) => {
        // تنظيف اسم الملف
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = `${folderPath}/${fileName}`;

        const { error } = await supabase.storage
          .from(MEDIA_CONFIG.bucket)
          .upload(filePath, file, { 
            upsert: true,
            contentType: file.type // منع CORB
          });

        if (error) throw error;
      });

      await Promise.all(uploadPromises);
      
      // حفظ اسم المجلد فقط (ليقوم السيرفر بعمل list لاحقاً)
      setFormData({ ...formData, floor_plan_urls: folderPath });
      alert(`تم رفع ${files.length} مخططات بنجاح في: ${folderPath}`);
    } catch (error: any) {
      alert("خطأ في رفع المخططات: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Section title="5. Floor Plans" icon={<LayoutGrid className="text-[#12AD65]"/>}>
      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <Input 
            label="Floor Plan Folder/Path" 
            value={formData.floor_plan_urls || ''} 
            onChange={(v: string) => setFormData({...formData, floor_plan_urls: v})} 
          />
          
          <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-[#12AD65]/10 hover:bg-[#12AD65]/20 text-[#12AD65] px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border border-[#12AD65]/20">
              <input 
                type="file" 
                multiple // تفعيل الرفع المتعدد للمخططات
                className="hidden" 
                onChange={handleFloorPlanUpload} 
                accept="image/*"
              />
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} 
              Upload Floor Plans
            </label>
            
            {formData.floor_plan_urls && (
              <span className="text-[10px] text-[#12AD65] font-bold bg-[#12AD65]/5 px-2 py-1 rounded-md border border-[#12AD65]/10">
                ✅ Folder: {formData.floor_plan_urls}
              </span>
            )}
          </div>
          
          <p className="text-[10px] text-slate-400 italic">
            Tip: Upload all floor plans at once. They will be stored in a dedicated folder named after the project slug.
          </p>
        </div>
      </div>
    </Section>
  );
}