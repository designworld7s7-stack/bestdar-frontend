'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; //

export default function MeetTheTeam({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const supabase = createClient();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      const { data } = await supabase
        .from('team')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (data) setTeamMembers(data);
    }
    fetchTeam();
  }, [supabase]);

  return (
    <section className="bg-white py-16 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        <div className="mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-6xl font-medium text-black tracking-[0.1em] mb-4 lg:mb-6">
            {isAr ? "تعرف على الفريق" : "Meet the Team"}
          </h2>
          <p className="text-[#4B5563] font-medium text-base lg:text-lg">
            {isAr ? "الخبراء المخصصون لنجاحك." : "The experts dedicated to your success."}
          </p>
        </div>

      {/* Container: Flexbox handles perfect centering for 2 cards */}
<div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
  {teamMembers.map((member) => (
    <div 
      key={member.id}
      className="flex flex-col bg-white rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 hover:shadow-xl group w-full md:w-[340px] lg:w-[380px]"
    >
      {/* Photo Area */}
      <div className="aspect-[5/4] w-full overflow-hidden">
        <img 
          src={member.image_url} 
          alt={isAr ? member.name_ar : member.name_en} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
      </div>

      {/* Detail Area - Centered for symmetry */}
      <div className="p-8 lg:p-10 text-center" dir={isAr ? 'rtl' : 'ltr'}>
        <h3 className="text-2xl font-medium text-black mb-1">
          {isAr ? member.name_ar : member.name_en}
        </h3>
        <p className="text-[#12AD65] text-xs font-medium uppercase tracking-tighter mb-4">
          {isAr ? member.role_ar : member.role_en}
        </p>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          {isAr ? member.bio_ar : member.bio_en}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}