'use client';

import React, { useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import InvestorStatus from './components/investor-status';
import ProfileInfo from './components/profile-info';
import Preferences from './components/preferences';
import HelpCard from './components/help-card';
import EditProfileModal from './components/edit-profile-modal';
import EditPreferencesModal from './components/edit-preferences-modal';

export default function ProfilePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const isAr = resolvedParams.lang === 'ar';
  const supabase = createClient();

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
const [totalInvested, setTotalInvested] = useState(0);

useEffect(() => {
  async function fetchInvestment() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('total_invested, investor_tier')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setTotalInvested(data.total_invested || 0); // This is your 500k or 700k
      }
    }
  }
  fetchInvestment();
}, []);

 useEffect(() => {
  async function getProfile() {
    const { data: { user } } = await supabase.auth.getUser(); // Get auth user for email

    if (user) {
    const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();

if (data) {
  setProfileData({
    ...data,
    // Ensure this matches the EXACT column name in your Supabase table
    total_invested: data.total_invested || 0 
  });
}
      if (!error) {
        // Merge auth email into the profile data
        setProfileData({ ...data, email: user.email }); 
      }
    }
    setLoading(false);
  }
  getProfile();
}, [supabase]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="animate-pulse text-[#12AD65] font-medium tracking-widest uppercase">
        {isAr ? "جاري التحميل..." : "Loading Profile..."}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 sm:pt-32 pb-20 px-4 sm:px-8 lg:px-16 text-black">
      <div className="max-w-[1140px] mx-auto space-y-8">
        
        {/* Dynamic Investor Status - passing the real tier */}
        {profileData?.is_investor && (
       <InvestorStatus 
  isAr={isAr} 
  tier={profileData?.investor_tier} 
  totalInvested={profileData?.total_invested || 0} 
/>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-8">
            <ProfileInfo 
              isAr={isAr} 
              profile={profileData} 
              onEdit={() => setIsProfileModalOpen(true)} 
            />
            <div className="hidden lg:block">
              <HelpCard isAr={isAr} />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <Preferences 
              isAr={isAr} 
              preferences={profileData} 
              onEdit={() => setIsPrefModalOpen(true)} 
            />
            <div className="lg:hidden mt-4">
              <HelpCard isAr={isAr} />
            </div>
          </div>
        </div>
      </div>

     {isProfileModalOpen && (
  <EditProfileModal 
    isAr={isAr} 
    onClose={() => setIsProfileModalOpen(false)} 
    {...({ profile: profileData } as any)} 
  />
)}

      {isPrefModalOpen && (
  <EditPreferencesModal 
    isAr={isAr} 
    onClose={() => setIsPrefModalOpen(false)} 
    {...({ preferences: profileData } as any)} 
  />
)}
    </div>
  );
}