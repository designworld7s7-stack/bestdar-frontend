'use client';

import React from 'react';
import { Building2 } from 'lucide-react';
// نخرج مرتين (../../) للوصول إلى الملف المشترك في admin/components/UI.tsx
import { Section, Input, Textarea } from '../../components/UI';

interface ProjectDeveloperProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectDeveloper({ formData, setFormData }: ProjectDeveloperProps) {
  return (
    <Section title="7. Developer & Overview" icon={<Building2 className="text-[#12AD65]"/>}>
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea 
          label="Overview Text (EN)" 
          value={formData.overview_text} 
          onChange={(v: string) => setFormData({...formData, overview_text: v})} 
        />
        <Textarea 
          label="نص عام عن المشروع (AR)" 
          dir="rtl" 
          value={formData.overview_text_ar} 
          onChange={(v: string) => setFormData({...formData, overview_text_ar: v})} 
        />
      </div>

      {/* Developer Details Section */}
      <div className="mt-8 pt-8 border-t border-slate-100">
        <Input 
          label="Developer Name" 
          value={formData.developer_name} 
          onChange={(v: string) => setFormData({...formData, developer_name: v})} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Textarea 
            label="Dev Description (EN)" 
            value={formData.dev_description} 
            onChange={(v: string) => setFormData({...formData, dev_description: v})} 
          />
          <Textarea 
            label="وصف المطور (AR)" 
            dir="rtl" 
            value={formData.dev_description_ar} 
            onChange={(v: string) => setFormData({...formData, dev_description_ar: v})} 
          />
        </div>
      </div>
    </Section>
  );
}