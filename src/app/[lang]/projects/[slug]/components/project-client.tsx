'use client';

import React, { useEffect, useState } from 'react';
// ... (كل الاستيرادات تبقى كما هي بدون تغيير)
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
import FloatingExpertBtn from '@/components/shared/floating-expert-btn';
import BackButton from '@/components/shared/back-button';
import ProjectCard from '@/components/shared/project-card';

interface ProjectClientProps {
  project: any;
  lang: string;
  similarProjects: any[];
}

export default function ProjectClient({ project, lang, similarProjects }: ProjectClientProps) {
  console.log("🛠️ CHECK 1 - Units from Server:", project.units);
  console.log("🔍 Data Check:", {
  lang: lang,
  title_ar: project.title_ar,
  displayTitle: project.displayTitle
});
  const supabase = createClient(); 
const [user, setUser] = useState<any>(null);
  const isAr = lang === 'ar';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
console.log("👨‍💻 CLIENT DEBUG - Received image_url:", project.image_url);
  // --- صمام الأمان المركزي (Data Sanitization) ---
  // نضمن أن المصفوفات هي مصفوفات فعلاً لتجنب خطأ .map is not a function
 const safeGallery = project.galleryImages || []; 
const safeFloorPlans = project.floorPlans || [];
const safeUnits = Array.isArray(project?.units) ? project.units : [];
const safeSimilar = Array.isArray(similarProjects) ? similarProjects : [];

  const [selectedUnit, setSelectedUnit] = useState(safeUnits[0] || null);
  const [activeUnit, setActiveUnit] = useState<any>(safeUnits[0] || null);
console.log("🔍 DEBUG - Project Data Structure:", {
  hasUnits: Array.isArray(project?.units),
  unitsType: typeof project?.units,
  unitsValue: project?.units,
  hasImages: Array.isArray(project?.images),
  imagesValue: project?.images,
  hasAmenities: Array.isArray(project?.amenities),
  amenitiesValue: project?.amenities
});
 useEffect(() => {
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };
  fetchUser();
}, [supabase]);

  // تحديث الوحدة المختارة عند تغير البيانات
  useEffect(() => {
    if (safeUnits.length > 0 && !selectedUnit) {
      setSelectedUnit(safeUnits[0]);
      setActiveUnit(safeUnits[0]);
    }
  }, [safeUnits]);
console.log("DATABASE CHECK:", { 
  raw_title_ar: project.title_ar, 
  raw_location_ar: project.location_ar 
});
  return (
    <main className="bg-white min-h-screen pb-32 lg:pb-0">
      
      <div className="hidden lg:block pt-6 px-12">
        <BackButton lang={lang} />
      </div>

      <ProjectHeader 
  lang={lang}
  project={project} /* 👈 هذا هو السطر السحري المفقود الذي تسبب في الخطأ */
  onInterestClick={() => setIsModalOpen(true)} 
/>

  <ProjectGallery 
  images={safeGallery} // تأكد أن الاسم هنا 'images'
  lang={lang}
  projectTitle={project.title}
  projectId={project.id}
/>

      <ProjectMobileCard 
        title={isAr ? (project.title_ar || project.title) : project.title} 
        location={isAr ? (project.location_ar || project.location) : project.location} 
        price={project.price} 
        lang={lang} 
      />

    <div className="py-10">
  <KeyFacts lang={lang} project={project} />
</div>

      <ProjectOverview lang={lang} project={project} />
      <PricingOverview 
        lang={lang}
        units={safeUnits} // نمرر المصفوفة الآمنة
        onUnitSelect={setSelectedUnit}
        selectedUnitId={selectedUnit?.id}
        isGated={!user} 
      />

     <PaymentPlan 
  lang={lang}
  activeUnit={selectedUnit} 
  isGated={!user} 
  onInterestClick={() => setIsReservationOpen(true)} 
/>

      {isReservationOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-[440px] p-6 lg:p-12 rounded-[40px] relative">
            <button 
              onClick={() => setIsReservationOpen(false)}
              className="absolute top-8 right-10 uppercase text-[12px] text-gray-500"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
            <ReservationForm 
              lang={lang} 
              unit={selectedUnit} 
              project={project} 
            />
          </div>
        </div>
      )}

     <ProjectNeighborhood 
  lang={lang}
  project={project} /* 👈 نمرر المشروع بالكامل هنا */
/>

      <ProjectAmenities lang={lang} project={project} />

   <FloorPlans 
  lang={lang}
  images={project.floorPlans} // تأكد أن الاسم هنا floorPlans وليس floor_plan_urls
  isGated={!user} 
/>

      <AboutDeveloper lang={lang} project={project} />
  

      <section className="bg-gray-50 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-medium mb-10 uppercase tracking-tight">
            {isAr ? "مشاريع مماثلة" : "Similar Projects"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeSimilar.map((item) => ( // نستخدم المصفوفة الآمنة
              <ProjectCard 
                key={item.id}
                slug={item.slug}
                title={isAr ? (item.title_ar || item.title) : item.title}
                developer={item.developer_name}
                location={isAr ? (item.location_ar || item.location) : item.location}
                price={item.price}
                deliveryDate={isAr ? (item.delivery_date_ar || item.delivery_date) : item.delivery_date}
                lang={lang}
                thumbnail_url={item.thumbnail_url || item.image_url} 
              />
            ))}
          </div>
        </div>
      </section>

      <FloatingExpertBtn lang={lang} />
      
      <StickyMobileBar 
        lang={lang} 
        onInterestClick={() => setIsModalOpen(true)} 
        propertyId={project?.property_ref} 
        propertyName={isAr ? project?.title_ar : project?.title}
      />

      <InterestedModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={project}
        lang={lang}
      />
    </main>
  );
}