'use client';

import React from 'react';
import { LayoutGrid } from 'lucide-react';
// نخرج مرتين (../../) للوصول إلى admin/components/UI.tsx المشترك
import { Section, Input } from '../../components/UI';

interface ProjectDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectDetails({ formData, setFormData }: ProjectDetailsProps) {
  return (
    <Section title="3. Key Details & Specs" icon={<LayoutGrid className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Input 
          label="Bedrooms" 
          type="number" 
          value={formData.bedrooms} 
          onChange={(v: string) => setFormData({...formData, bedrooms: Number(v)})} 
        />
        <Input 
          label="Bathrooms" 
          type="number" 
          value={formData.bathrooms} 
          onChange={(v: string) => setFormData({...formData, bathrooms: Number(v)})} 
        />
        <Input 
          label="Area (SQFT)" 
          type="number" 
          value={formData.area_sqft} 
          onChange={(v: string) => setFormData({...formData, area_sqft: Number(v)})} 
        />
        <Input 
          label="Total Floors" 
          type="number" 
          value={formData.total_floors} 
          onChange={(v: string) => setFormData({...formData, total_floors: Number(v)})} 
        />
        <Input 
          label="View Type" 
          value={formData.view_type} 
          onChange={(v: string) => setFormData({...formData, view_type: v})} 
        />
        <Input 
          label="نوع الإطلالة (AR)" 
          dir="rtl" 
          value={formData.view_type_ar} 
          onChange={(v: string) => setFormData({...formData, view_type_ar: v})} 
        />
        <Input 
          label="Orientation" 
          value={formData.orientation} 
          onChange={(v: string) => setFormData({...formData, orientation: v})} 
        />
        <Input 
          label="الاتجاه (AR)" 
          dir="rtl" 
          value={formData.orientation_ar} 
          onChange={(v: string) => setFormData({...formData, orientation_ar: v})} 
        />
      </div>
    </Section>
  );
}