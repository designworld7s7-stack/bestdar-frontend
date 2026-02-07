'use client';

import React, { useState, use } from 'react';
import ProjectHeader from './components/project-header';
import ProjectGallery from './components/project-galery';
import ProjectMobileCard from './components/project-mobile-card';
import KeyFacts from './components/key-facts';
import ProjectOverview from './components/project-overview';
import PricingOverview from './components/pricing-overview';
import PaymentPlan from './components/payment-plan';
import ProjectNeighborhood from './components/project-neighborhood';
import ProjectAmenities from './components/project-amenities';
import FloorPlans from './components/floor-plans';
import AboutDeveloper from './components/about-developer';
import SimilarProjects from './components/similar-projects';
import StickyMobileBar from './components/sticky-mobile-bar';
import FloatingExpertBtn from '@/components/shared/floating-expert-btn';
import BackButton from '@/components/shared/back-button';
import ReservationForm from './components/reservation-form';
import InterestedModal from './components/interested-modal';
interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default function ProjectPage({ params }: PageProps) {
  const { lang, id } = use(params);
  const DEVELOPER_MODE_SHOW_CONTENT = true;
const [isInterestedOpen, setIsInterestedOpen] = useState(false);
  // 1. ADD STATE: This connects your selection to the Payment Vault
  const [activeUnit, setActiveUnit] = useState<any>({
    id: '101',
    price: 180000,
    planType: 'monthly' // Default starting state
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInterest = () => setIsModalOpen(true);
const [isReservationOpen, setIsReservationOpen] = useState(false);
  const project = {
    title: "Marina Heights Residences",
    location: "Dubai, UAE",
    price: "$250,000",
    id: id
  };

  return (
    <main className="bg-white min-h-screen pb-32 lg:pb-0">
      
      {/* 1. Desktop Top Bar */}
      <div className="hidden lg:block pt-6 px-12">
        <BackButton lang={lang} />
      </div>

      {/* 2. Desktop Header */}
      <ProjectHeader 
        lang={lang}
        {...project} 
       onInterestClick={() => setIsInterestedOpen(true)}
        
      />

      {/* 3. Gallery (Starts first on Mobile) */}
      <ProjectGallery images={['/hero-1.jpg', '/hero-2.jpg']} />

      {/* 4. Mobile Info Card (ONLY under Gallery) */}
      <ProjectMobileCard {...project} lang={lang} />

      {/* 5. Property Details Sections */}
      <div className="py-10">
        <KeyFacts lang={lang} />
      </div>

      <ProjectOverview lang={lang} />

      {/* 6. Pricing & Payment Vault Connection */}
      <PricingOverview 
  lang={lang} 
  selectedUnitId={activeUnit?.id}
  onUnitSelect={(unit: any) => {
    setActiveUnit(unit); // This updates 'activeUnit' which 'PaymentPlan' is watching
  }} 
/>

     <PaymentPlan 
  lang={lang} 
  activeUnit={activeUnit} 
  onInterestClick={() => setIsReservationOpen(true)} // Check this name!
/>
{/* 7. Dedicated Reservation Modal */}
{isReservationOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300] flex items-center justify-center p-6">
    {/* Card Container: Reduced padding (p-6) for mobile */}
    <div className="bg-white w-full max-w-[440px] p-6 lg:p-12 rounded-[32px] lg:rounded-[40px] shadow-2xl relative overflow-hidden">
      
      {/* Close Button */}
      <button 
        onClick={() => setIsReservationOpen(false)}
        className="absolute top-8 right-10 font-black uppercase text-[10px] text-gray-400 hover:text-black transition-colors"
      >
        {lang === 'ar' ? 'إغلاق' : 'Close'}
      </button>
      
      {/* Header - Ensure this says RESERVATION not CONSULTATION */}
      <div className="mb-6 lg:mb-10">
        <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter">
          {lang === 'ar' ? 'حجز الوحدة' : 'Unit Reservation'}
        </h2>
        <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
          {lang === 'ar' ? 'تأكيد الحجز' : 'Confirming Reservation'}
        </p>
      </div>
      {/* This MUST be the ONLY component here */}
      <ReservationForm lang={lang} unit={activeUnit} />

    </div>
  </div>
)}
      {/* 7. Neighborhood & Amenities */}
      <ProjectNeighborhood lang={lang} />
      <ProjectAmenities lang={lang} />
      
      <FloorPlans 
        lang={lang} 
        isGated={!DEVELOPER_MODE_SHOW_CONTENT} 
      />

      <AboutDeveloper lang={lang} />
      <SimilarProjects lang={lang} />

      {/* 8. Persistent Actions */}
      <FloatingExpertBtn lang={lang} />
      <StickyMobileBar lang={lang} onInterestClick={() => setIsInterestedOpen(true)} 
      />

      {/* 9. Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-lg p-10 rounded-[40px] shadow-2xl relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-8 font-black uppercase text-[10px] text-gray-400 hover:text-black"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                {lang === 'ar' ? 'طلب استشارة' : 'Request Consultation'}
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                {lang === 'ar' 
                  ? 'سنتواصل معك بخصوص هذا العقار قريباً.' 
                  : 'An expert will contact you regarding this property shortly.'}
              </p>
              <div className="h-40 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center text-gray-300 font-black uppercase text-[10px]">
                Lead Form UI
              </div>
           </div>
        </div>
      )}
      <InterestedModal 
      lang={lang} 
      isOpen={isInterestedOpen} 
      onClose={() => setIsInterestedOpen(false)} 
    />
    </main>
  );
}