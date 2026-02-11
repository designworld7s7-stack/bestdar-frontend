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
              slug={project.slug}
              title={project.title}
              developer={project.developer_name || 'Boutique Developer'}
              location={project.location}
              // Currency and formatting applied to raw price
              price={`${project.currency || '$'} ${project.price?.toLocaleString()}`}
              image={project.image_url || '/prop-1.jpg'} 
              deliveryDate={project.delivery_date || 'Ready'}
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