'use client';

import React, { useState } from 'react';
import InvestorStatus from './components/investor-status';
import ProfileInfo from './components/profile-info';
import Preferences from './components/preferences';
import HelpCard from './components/help-card';
import EditProfileModal from './components/edit-profile-modal';
import EditPreferencesModal from './components/edit-preferences-modal';

export default function ProfilePage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  
  // 1. STATE MANAGEMENT
  // In a real app, 'isInvestor' would come from your auth provider/database
  const [isInvestor] = useState(true); 
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 sm:pt-32 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1140px] mx-auto space-y-8">
        
        {/* TOP SECTION: Wide Investor Status */}
        {isInvestor && <InvestorStatus isAr={isAr} />}

        {/* MAIN GRID: Handling Desktop (Side-by-Side) and Mobile (Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Identity & Support */}
          <div className="lg:col-span-4 space-y-8">
            <ProfileInfo 
              isAr={isAr} 
              onEdit={() => setIsProfileModalOpen(true)} 
            />
            
            {/* DESKTOP HELP: Sits under profile on large screens */}
            <div className="hidden lg:block">
              <HelpCard isAr={isAr} />
            </div>
          </div>

          {/* RIGHT COLUMN: User Preferences */}
          <div className="lg:col-span-8 space-y-8">
            <Preferences 
              isAr={isAr} 
              onEdit={() => setIsPrefModalOpen(true)} 
            />

            {/* MOBILE HELP: Sits at the very bottom on small screens */}
            <div className="lg:hidden mt-4">
              <HelpCard isAr={isAr} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODALS: Conditional rendering */}
      
      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <EditProfileModal 
          isAr={isAr} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}

      {/* Preferences Edit Modal */}
      {isPrefModalOpen && (
        <EditPreferencesModal 
          isAr={isAr} 
          onClose={() => setIsPrefModalOpen(false)} 
        />
      )}
    </div>
  );
}