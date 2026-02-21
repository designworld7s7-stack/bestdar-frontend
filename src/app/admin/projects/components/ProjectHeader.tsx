'use client';
import React from 'react';
import { Globe } from 'lucide-react';
import { Section, Input, Checkbox } from '../../components/UI';
interface Props {
  formData: any;
  setFormData: (data: any) => void;
  generateSlug: (text: string) => string;
}

export default function ProjectHeader({ formData, setFormData, generateSlug }: Props) {
  return (
    <Section title="1. Header & Basic Info" icon={<Globe className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Title (English)" 
          value={formData.title} 
          onChange={(v: string) => setFormData({...formData, title: v, slug: generateSlug(v)})} 
        />
        <Input 
          label="العنوان (بالعربية)" 
          dir="rtl" 
          value={formData.title_ar} 
          onChange={(v: string) => setFormData({...formData, title_ar: v})} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Input label="Location (EN)" value={formData.location} onChange={(v: string) => setFormData({...formData, location: v})} />
        <Input label="الموقع (AR)" dir="rtl" value={formData.location_ar} onChange={(v: string) => setFormData({...formData, location_ar: v})} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Input label="Country Code" value={formData.country_code} onChange={(v: string) => setFormData({...formData, country_code: v})} />
        <Input label="Property Ref" value={formData.property_ref} onChange={(v: string) => setFormData({...formData, property_ref: v})} />
        <Input label="Property Type" value={formData.property_type} onChange={(v: string) => setFormData({...formData, property_type: v})} />
        <Input label="Currency" value={formData.currency} onChange={(v: string) => setFormData({...formData, currency: v})} />
        <Input label="Price" type="number" value={formData.price} onChange={(v: string) => setFormData({...formData, price: Number(v)})} />
        <Input label="Project Status (EN)" value={formData.project_status} onChange={(v: string) => setFormData({...formData, project_status: v})} />
        <Input label="حالة المشروع (AR)" dir="rtl" value={formData.project_status_ar} onChange={(v: string) => setFormData({...formData, project_status_ar: v})} />
        <Input label="Slug" value={formData.slug} onChange={(v: string) => setFormData({...formData, slug: v})} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
        <Input label="Delivery Date (EN)" value={formData.delivery_date} onChange={(v: string) => setFormData({...formData, delivery_date: v})} />
        <Input label="تاريخ التسليم (AR)" dir="rtl" value={formData.delivery_date_ar} onChange={(v: string) => setFormData({...formData, delivery_date_ar: v})} />
      </div>

      <div className="flex gap-8 mt-6 pt-4 border-t border-slate-100">
        <Checkbox label="Published on Site" checked={formData.is_published} onChange={(v: boolean) => setFormData({...formData, is_published: v})} />
        <Checkbox label="Featured Property" checked={formData.is_featured_home} onChange={(v: boolean) => setFormData({...formData, is_featured_home: v})} />
      </div>
    </Section>
  );
}