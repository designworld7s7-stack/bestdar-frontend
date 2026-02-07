'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export default function InvestorStatus({ isAr }: { isAr: boolean }) {
  const benefits = isAr 
    ? ["أولوية الوصول للمشاريع الجديدة", "مستشار استثماري مخصص", "خصم 1.5% على رسوم المنصة", "تقارير تحليل السوق الربع سنوية"]
    : ["Priority access to new developments", "Dedicated investment advisor", "1.5% reduced platform fees", "Quarterly market analysis reports"];

  return (
    <div className="bg-black rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden relative">
      
      {/* Decorative Gradient Flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#12AD65] opacity-10 blur-[100px] -mr-32 -mt-32" />

      <div className="flex flex-col lg:flex-row gap-10 lg:items-center justify-between relative z-10">
        
        {/* LEFT: Tier & Progress */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <Award size={16} />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                {isAr ? "حالة نادي المستثمرين" : "Investor Club Status"}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-black text-white tracking-tighter">
              {isAr ? "عضو ذهبي" : "Gold Member"}
            </h2>
            <p className="text-gray-400 text-[14px] sm:text-[16px] font-medium">
              {isAr ? "استمتع بعروض حصرية خارج السوق ورسوم مخفضة." : "Unlock exclusive off-market deals and lower fees."}
            </p>
          </div>

          {/* Progress Bar Section */}
          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{isAr ? "إجمالي الاستثمار" : "Total Invested"}</p>
                <p className="text-white text-[18px] font-black">$150,000</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{isAr ? "المستوى التالي" : "Next Tier"}</p>
                <p className="text-gray-300 text-[14px] font-bold">$500,000</p>
              </div>
            </div>
            
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#12AD65] w-[30%] rounded-full shadow-[0_0_15px_rgba(18,173,101,0.5)]" />
            </div>
            
            <p className="text-gray-500 text-[11px] font-bold">
              {isAr ? "$350,000 للوصول للمستوى البلاتيني" : "$350,000 to Platinum"}
            </p>
          </div>
        </div>

        {/* RIGHT: Benefits Card */}
        <div className="lg:w-[400px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
          <ul className="space-y-5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <CheckCircle2 className="text-[#12AD65] mt-1 shrink-0" size={18} />
                <span className="text-gray-600 text-[14px] sm:text-[15px] font-bold leading-tight group-hover:text-black transition-colors">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}