'use client';

import React, { useEffect, useState } from 'react';
// Corrected Imports: Importing siblings from the same folder
import ProjectHeader from './project-header';
import ProjectGallery from './project-galery'; 
import ProjectMobileCard from './project-mobile-card';
import KeyFacts from './key-facts';
import ProjectOverview from './project-overview';
import PricingOverview from './pricing-overview';
import PaymentPlan from './payment-plan';
import ProjectNeighborhood from './project-neighborhood';
import ProjectAmenities from './project-amenities';
import FloorPlans from './floor-plans';
import AboutDeveloper from './about-developer';
import SimilarProjects from './similar-projects';
import StickyMobileBar from './sticky-mobile-bar';
import ReservationForm from './reservation-form';
import InterestedModal from './interested-modal';
import { createClient } from '@/utils/supabase/client';
// Global Shared Components
import FloatingExpertBtn from '@/components/shared/floating-expert-btn';
import BackButton from '@/components/shared/back-button';
import ProjectCard from '@/components/shared/project-card';


interface ProjectClientProps {
  project: any;
  lang: string;
  similarProjects: any[]; // Add this line [cite: 2026-02-09]
}

export default function ProjectClient({ project, lang, similarProjects }: ProjectClientProps) {
  // 1. يجب تعريف supabase و user و setUser هنا ليعمل الكود بالأسفل
  const supabase = createClient(); 
  const [user, setUser] = useState<any>(null);
  const [isInterestedOpen, setIsInterestedOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const isAr = lang === 'ar';
  // Initialize state with the first unit from the database
  const [activeUnit, setActiveUnit] = useState<any>(project.project_units?.[0] || null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedUnit, setSelectedUnit] = useState(project.units?.[0] || null);

useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

useEffect(() => {
    if (project.units?.length > 0 && !selectedUnit) {
      setSelectedUnit(project.units[0]);
    }
  }, [project.units]);
useEffect(() => {
    if (project.units?.length > 0 && !selectedUnit) {
      setSelectedUnit(project.units[0]);
    }
  }, [project.units]);
  return (
    <main className="bg-white min-h-screen pb-32 lg:pb-0">
      
      <div className="hidden lg:block pt-6 px-12">
        <BackButton lang={lang} />
      </div>

     <ProjectHeader 
        title={project.title}
        location={project.location}
        price={project.price}
        id={project.id}
        lang={lang}
        // Match the prop name used in ProjectHeader
        onInterestClick={() => setIsModalOpen(true)} 
      />

      {/* Added lang and projectTitle to fix your Gallery error */}
   <ProjectGallery 
  lang={lang}
  projectTitle={project.title}
  projectId={project.id}
  image_url={project.image_url || []} 
/>

      <ProjectMobileCard 
        title={project.title} 
        location={project.location} 
        price={project.price} 
        lang={lang} 
      />

      <div className="py-10">
        <KeyFacts lang={lang} project={project} />
      </div>

      <ProjectOverview lang={lang} project={project} />

    <PricingOverview 
  lang={lang}
  units={project.units}
  onUnitSelect={setSelectedUnit}
  selectedUnitId={selectedUnit?.id}
  isGated={!user} // تفعيل القفل تلقائياً
/>

      {/* 4. Payment Plan */}
<PaymentPlan 
  lang={lang}
  activeUnit={selectedUnit} 
  isGated={!user} 
  // قمنا بتغييرها هنا لتفتح مودال الحجز
  onInterestClick={() => setIsReservationOpen(true)} 
/>

  
      {/* Reservation Modal */}
      {isReservationOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300] flex items-center justify-center p-6">
    <div className="bg-white w-full max-w-[440px] p-6 lg:p-12 rounded-[40px] relative">
      <button 
        onClick={() => setIsReservationOpen(false)}
        className="absolute top-8 right-10 uppercase text-[12px] text-gray-500"
      >
        {lang === 'ar' ? 'إغلاق' : 'Close'}
      </button>
      
      {/* ADD project={project} HERE */}
      <ReservationForm 
        lang={lang} 
        unit={activeUnit} 
        project={project} 
      />
    </div>
  </div>
)}

     <ProjectNeighborhood 
  lang={lang}
  description={project.description}
  landmarks={project.landmarks}
  mapLongitude={project.map_longitude} // هنا الربط مع سوبابيس
  mapLatitude={project.map_latitude}   // هنا الربط مع سوبابيس
/>
      <ProjectAmenities lang={lang} project={project} />

   <FloorPlans 
  lang={lang}
  databasePlans={project.floor_plans} // الربط مع بيانات سوبابيس
  isGated={!user} // تفعيل القفل تلقائياً: إذا كان user يساوي null سيصبح isGated = true
/>
      <AboutDeveloper lang={lang} project={project} />
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-medium mb-10 uppercase tracking-tight">
            {isAr ? "مشاريع مماثلة" : "Similar Projects"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProjects?.map((item) => (
  <ProjectCard 
  key={project.id}
  slug={project.slug}
  title={project.title}
  developer={project.developer}
  location={project.location}
  price={project.price}
  deliveryDate={project.delivery_date}
  lang={lang}
  // التغيير هنا: مرر البيانات تحت اسم thumbnail_url
  thumbnail_url={project.thumbnail_url || project.image} 
/>
))}
          </div>
        </div>
      </section>

      <FloatingExpertBtn lang={lang} />
     <StickyMobileBar 
  lang={lang} 
  onInterestClick={() => setIsModalOpen(true)} // تأكد أنها setIsModalOpen
/>

{/* 2. النافذة المنبثقة (المهتمين) */}
<InterestedModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  project={project}
  lang={lang}
/>
  
    </main>
  );
}