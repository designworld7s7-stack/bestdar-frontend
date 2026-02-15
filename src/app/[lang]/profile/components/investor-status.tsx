'use client';

import React from 'react';
import { Award, Sparkles, Quote } from 'lucide-react';

interface InvestorStatusProps {
  isAr: boolean;
  tier: string;
  totalInvested: number; // New prop to drive the dynamic bar
}

export default function InvestorStatus({ isAr, tier, totalInvested }: InvestorStatusProps) {
  
  // 1. Force the tier to match your object keys (e.g., "gold" becomes "Gold")
  const normalizedTier = tier 
    ? (tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()) 
    : 'Silver';

  const TIER_LIMITS = { 
    Silver: 250000, 
    Gold: 1000000, 
    Platinum: 5000000 
  };
  
  const TIER_CONFIG = {
    Silver: {
      color: '#C0C0C0',
      title: isAr ? "رحلة النمو تبدأ هنا" : "The Journey of Growth Starts Here",
      message: isAr 
        ? "بصفتك عضواً فضياً، تركيزنا هو تمهيد الطريق لك..." 
        : "As a Silver member, our focus is on paving the way for you...",
      limit: TIER_LIMITS.Silver
    },
    Gold: {
      color: '#D4AF37',
      title: isAr ? "فهم تطلعاتك هو أولويتنا" : "Understanding Your Aspirations",
      message: isAr 
        ? "في الفئة الذهبية، ننتقل من توفير البيانات إلى فهم الاحتياجات..." 
        : "In the Gold tier, we move from data to understanding...",
      limit: TIER_LIMITS.Gold
    },
    // ... Platinum config
  };

  // 2. Use the normalizedTier to pull the correct data
  const current = TIER_CONFIG[normalizedTier as keyof typeof TIER_CONFIG] || TIER_CONFIG.Silver;

  // 3. Calculate percentage against the correct limit (1M for Gold)
 
 const progressPercentage = current.limit > 0 
  ? Math.min((totalInvested / current.limit) * 100, 100) 
  : 0;

console.log("Math Check:", totalInvested, "/", current.limit, "=", progressPercentage);
 

  return (
    <div className="bg-black rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden relative">
      
      <div 
        className="absolute top-0 right-0 w-80 h-80 opacity-20 blur-[120px] -mr-32 -mt-32 transition-all duration-1000" 
        style={{ backgroundColor: current.color }}
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:items-center justify-between relative z-10">
        
        <div className="flex-1 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2" style={{ color: current.color }}>
              <Award size={18} />
              <span className="text-[12px] font-bold uppercase tracking-[0.2em]">
                {isAr ? "نادي المستثمرين" : "Investor Club"}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[48px] font-medium text-white tracking-tight leading-none uppercase">
              {tier} <span className="text-gray-600">Member</span>
            </h2>
          </div>

          {/* Dynamic Progress Bar based on investment */}
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                {isAr ? "التقدم نحو المستوى التالي" : "Progress to Next Milestone"}
              </span>
              <span className="text-white text-[14px] font-medium">{Math.floor(progressPercentage)}%</span>
            </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
  <div 
    className="h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
    style={{ 
      // Change 'tierColor' to 'current.color'
      backgroundColor: current.color, 
      width: `${progressPercentage}%` 
    }} 
  />
</div>
          </div>
        </div>

        {/* Personalized Message Card (No "Learn More") */}
        <div className="lg:w-[450px] bg-white/[0.03] backdrop-blur-md rounded-[32px] p-8 sm:p-10 border border-white/10 relative">
          <Quote className="absolute top-6 right-8 text-white/5" size={60} />
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <Sparkles size={16} style={{ color: current.color }} />
              <h3 className="text-white text-[18px] sm:text-[20px] font-medium tracking-tight">
                {current.title}
              </h3>
            </div>
            
            <p className="text-gray-400 text-[15px] sm:text-[16px] leading-relaxed font-light">
              {current.message}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}