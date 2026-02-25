'use client';

import React from 'react';
import ProjectCard from '@/components/shared/project-card';

export default function PropertyGrid({ 
  projects, 
  lang 
}: { 
  projects: any[], 
  lang: string 
}) {
  return (
    <div className="w-full">
      {/* GRID LOGIC: 
        1 column on mobile 
        2 columns on tablet
        3 columns on desktop
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {projects?.map((project) => (
  <div key={project.id} className="h-full">
   <ProjectCard 
  key={project.id} 
  slug={project.slug} 
  title={project.title}
  // ✅ إضافة العنوان العربي لضمان الترجمة [cite: 2026-02-25]
  title_ar={project.title_ar} 
  
  developer={project.developer_name || 'Boutique Developer'}
  // ✅ اختياري: إضافة اسم المطور بالعربي إذا كان متوفراً في القاعدة
  developer_ar={project.developer_name_ar} 
  
  location={project.location}
  // ✅ إضافة الموقع بالعربي لضمان تجربة مستخدم كاملة [cite: 2026-02-25]
  location_ar={project.location_ar} 
  
  price={`${project.currency || '$'} ${project.price?.toLocaleString()}`}
  
  // ✅ استخدام العمود الصحيح للصور الذي اعتمدناه
  thumbnail_url={project.thumbnail_url || '/placeholder-project.jpg'} 
  
  deliveryDate={project.delivery_date || 'Ready to Move'}
  lang={lang} 
/>
  </div>
))}
      </div>
      
      {/* Fallback for empty results */}
      {(!projects || projects.length === 0) && (
        <div className="py-20 text-center text-gray-400 uppercase tracking-widest text-sm">
          {lang === 'ar' ? 'لا توجد عقارات مطابقة' : 'No properties found'}
        </div>
      )}
    </div>
  );
}