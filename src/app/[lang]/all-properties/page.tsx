import React from 'react';
import { createClient } from '@/utils/supabase/server';
import PropertyFilter from '@/components/shared/property-filter'; 
import ProjectCard from '@/components/shared/project-card';
import BackButton from '@/components/shared/back-button';

// Next.js 15: searchParams is a Promise
export default async function AllPropertiesPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ 
    country?: string, 
    city?: string, 
    propertyType?: string, 
    delivery?: string,
    installments?: string // ADD THIS LINE
  }> 
}) {
  const { lang } = await params;
  // Await searchParams to get the current filters
  const filters = await searchParams; 
  const isAr = lang === 'ar';
  
  const supabase = await createClient();

  // 1. Initialize the query
 let query = supabase
  .from('projects')
  .select(`
    *,
    project_units!inner (
      has_installments
    )
  `);

// Project Level Filters
if (filters.country) query = query.eq('country_code', filters.country);
if (filters.city) query = query.ilike('location', `%${filters.city}%`);
if (filters.propertyType) query = query.ilike('property_type', filters.propertyType);
if (filters.delivery) query = query.ilike('delivery_date', filters.delivery);

// Units Level Filter
if (filters.installments === 'true') {
  query = query.eq('project_units.has_installments', true);
}

const { data: projects } = await query.order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-white pb-24 pt-24 sm:pt-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="hidden lg:flex mb-10">
          <BackButton lang={lang} /> 
        </div>

        <div className="mb-14">
          <h1 className="text-[42px] sm:text-[68px] font-medium tracking-[0.1em] text-black uppercase leading-[0.85]">
            {isAr ? "كافة العقارات" : "All Properties"}
          </h1>
          <div className="w-24 h-2.5 rounded-full bg-[#12AD65]" />
        </div>

        <div className="mb-20">
          <PropertyFilter lang={lang} type="all" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects && projects.length > 0 ? (
  projects.map((project) => (
    <ProjectCard 
      key={project.id}
      slug={project.slug}
      title={project.title}
      developer={project.developer_name}
      location={project.location}
      price={`${project.currency || '$'} ${project.price?.toLocaleString()}`}
      
      // ✅ CHANGE THIS LINE: Match the prop name and the column name
      thumbnail_url={project.thumbnail_url || '/placeholder-project.jpg'}
      
      deliveryDate={project.delivery_date}
      lang={lang}
    />
  ))
) : (
            <div className="col-span-full py-20 text-center text-gray-400 uppercase tracking-widest text-sm">
              {isAr ? 'لا توجد عقارات مطابقة' : 'No properties found matching your filters'}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-3 mt-24">
          <button className="w-14 h-14 rounded-2xl font-medium text-xs bg-black text-white shadow-2xl scale-110">1</button>
        </div>
      </div>
    </main>
  );
}