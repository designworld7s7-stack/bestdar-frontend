'use client';

import React from 'react';

export default function MeetTheTeam({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  const team = [
    {
      name: isAr ? "أحمد العراقي" : "Ahmed Al-Iraqi",
      role: isAr ? "مستشار استثمار أول" : "Senior Investment Advisor",
      bio: isAr 
        ? "متخصص في مساعدة المستثمرين على التنقل في الأسواق المعقدة بكل سهولة وثقة."
        : "Dedicated to helping investors navigate the complex market with ease and confidence.",
      image: "/about/team-ahmed.jpg"
    },
    {
      name: isAr ? "سارة حسن" : "Sarah Hassan",
      role: isAr ? "مستشارة قانونية" : "Legal Consultant",
      bio: isAr 
        ? "خبيرة في القوانين العقارية الدولية لضمان أمان استثماراتك."
        : "Expert in international real estate law to ensure your investments are protected.",
      image: "/about/team-sarah.jpg"
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Header */}
        <div className="mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-6xl font-black text-black tracking-tighter mb-4 lg:mb-6">
            {isAr ? "تعرف على الفريق" : "Meet the Team"}
          </h2>
          <p className="text-gray-400 font-medium text-base lg:text-lg">
            {isAr ? "الخبراء المخصصون لنجاحك." : "The experts dedicated to your success."}
          </p>
        </div>

        {/* Team Grid: Vertical Stack for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className="flex flex-col bg-white rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 transition-all duration-500 hover:shadow-xl"
            >
              {/* Photo Area */}
              <div className="aspect-[5/4] w-full overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Detail Area */}
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl lg:text-3xl font-black text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-[#12AD65] text-xs lg:text-sm font-black uppercase tracking-widest mb-6">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm lg:text-base font-medium leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}