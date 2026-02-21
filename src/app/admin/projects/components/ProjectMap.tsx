'use client';

import React from 'react';
import { Map } from 'lucide-react';
import { Section, Input, Textarea } from '../../components/UI';

interface ProjectMapProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ProjectMap({ formData, setFormData }: ProjectMapProps) {
  
  /**
   * دالة مساعدة لتحويل مصفوفة الـ JSON القادمة من Supabase إلى نص 
   * لكي يتمكن المستخدم من رؤيتها وتعديلها في حقل الإدخال.
   */
  const formatLandmarksValue = (val: any) => {
    if (!val) return '';
    // إذا كانت البيانات مصفوفة (JSONB)، نستخرج الأسماء ونحولها لنص مفصول بفاصلة
    if (Array.isArray(val)) {
      return val.map(item => item.name).join(', ');
    }
    return val; // إذا كانت نصاً عادياً أصلاً
  };

  return (
    <Section title="4. Neighborhood & Map" icon={<Map className="text-[#12AD65]"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea 
          label="Neighborhood Description (EN)" 
          value={formData.neighborhood_description} 
          onChange={(v: string) => setFormData({...formData, neighborhood_description: v})} 
        />
        <Textarea 
          label="وصف الحي (AR)" 
          dir="rtl" 
          value={formData.neighborhood_description_ar} 
          onChange={(v: string) => setFormData({...formData, neighborhood_description_ar: v})} 
        />
      </div>

      <div className="mt-6 space-y-4">
        {/* حقل المعالم بالإنجليزية - الآن يدعم التحويل من JSON لـ Text */}
        <Input 
          label="Landmarks (EN) - Separate with commas" 
          value={formatLandmarksValue(formData.landmarks)} 
          onChange={(v: string) => setFormData({...formData, landmarks: v})} 
          placeholder="e.g. Dubai Mall, Burj Khalifa"
        />
        
        {/* حقل المعالم بالعربية - يدعم التحويل أيضاً */}
        <Textarea 
          label="المعالم القريبة (AR)" 
          dir="rtl" 
          value={formatLandmarksValue(formData.landmarks_ar)} 
          onChange={(v: string) => setFormData({...formData, landmarks_ar: v})} 
          placeholder="مثال: دبي مول، برج خليفة"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <Input 
            label="Map Longitude" 
            value={formData.map_longitude} 
            onChange={(v: string) => setFormData({...formData, map_longitude: v})} 
          />
          <Input 
            label="Map Latitude" 
            value={formData.map_latitude} 
            onChange={(v: string) => setFormData({...formData, map_latitude: v})} 
          />
          <Input 
            label="Map Location URL" 
            value={formData.map_location_url} 
            onChange={(v: string) => setFormData({...formData, map_location_url: v})} 
          />
        </div>
      </div>
    </Section>
  );
}