'use client';

import React, { useState, useRef } from 'react';
import { Lock, ChevronLeft, ChevronRight, Maximize2, MoveHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

interface FloorPlan {
  id: string;
  title: string;
  size: string;
  image: string;
}

export default function FloorPlans({ lang, isGated = true }: { lang: string, isGated?: boolean }) {
  const isAr = lang === 'ar';
  const [activePlan, setActivePlan] = useState(0);

  // 1. Swipe Logic Refs
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const plans: FloorPlan[] = [
    { id: '1', title: 'Type A - 1 Bedroom', size: '85 m²', image: '/projects/plan-1.jpg' },
    { id: '2', title: 'Type B - 2 Bedroom', size: '120 m²', image: '/projects/plan-2.jpg' },
    { id: '3', title: 'Type C - Penthouse', size: '240 m²', image: '/projects/plan-3.jpg' },
  ];

  const nextPlan = () => setActivePlan((prev) => (prev + 1) % plans.length);
  const prevPlan = () => setActivePlan((prev) => (prev - 1 + plans.length) % plans.length);

  // 2. Touch Event Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      isAr ? prevPlan() : nextPlan(); // Respect RTL for Iraqi customers
    } else if (isRightSwipe) {
      isAr ? nextPlan() : prevPlan();
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-10 lg:mb-16">
        <h3 className="text-xl lg:text-3xl font-black text-black tracking-tighter uppercase">
          {isAr ? "مخططات الطوابق" : "Floor Plans"}
        </h3>
        <div className="h-1 w-12 bg-[#12AD65] rounded-full" />
      </div>

      <div className="relative group">
        {/* GATED OVERLAY */}
        {isGated && (
          <div className="absolute inset-0 z-30 backdrop-blur-xl bg-white/60 flex flex-col items-center justify-center rounded-[32px] lg:rounded-[40px] border border-gray-100 p-8 text-center">
            <div className="h-14 w-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#12AD65] mb-6">
              <Lock size={24} />
            </div>
            <h4 className="text-lg font-black text-black mb-2 uppercase tracking-tight">
              {isAr ? "المخططات الهندسية مقفلة" : "Architectural Plans Locked"}
            </h4>
            <p className="text-gray-500 text-[10px] lg:text-sm font-medium mb-8 max-w-xs">
              {isAr 
                ? "سجل لتصفح جميع المخططات التفصيلية والأبعاد الهندسية لكل وحدة." 
                : "Register to browse all detailed floor plans and architectural dimensions."}
            </p>
            <button className="bg-[#12AD65] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0f8f53] transition-all shadow-lg shadow-[#12AD65]/20">
              {isAr ? "سجل للمشاهدة" : "Register to View Plans"}
            </button>
          </div>
        )}

        {/* CAROUSEL CONTAINER: Added Touch Listeners */}
        <div 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={clsx(
            "relative overflow-hidden rounded-[32px] lg:rounded-[40px] bg-[#F8F9FA] border border-gray-100 shadow-sm", 
            isGated && "opacity-20 pointer-events-none"
          )}
        >
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activePlan * 100}%)` }}>
            {plans.map((plan) => (
              <div key={plan.id} className="min-w-full p-6 lg:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                
                {/* Plan Image */}
                <div className="w-full lg:w-3/5 aspect-square lg:aspect-video rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center p-4">
                  <img src={plan.image} alt={plan.title} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Plan Info */}
                <div className="w-full lg:w-2/5 flex flex-col gap-6 text-center lg:text-left">
                  <div>
                    <span className="text-[10px] font-black text-[#12AD65] uppercase tracking-widest block mb-2">
                      {isAr ? "وحدة حصرية" : "Exclusive Unit"}
                    </span>
                    <h4 className="text-2xl lg:text-4xl font-black text-black tracking-tight mb-2">{plan.title}</h4>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                      {isAr ? "المساحة الإجمالية" : "Total Area"}: <span className="text-black">{plan.size}</span>
                    </p>
                  </div>
                  
                  <div className="h-[1px] w-full bg-gray-100 hidden lg:block" />
                  
                  <button className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    <Maximize2 size={14} />
                    {isAr ? "عرض بملء الشاشة" : "View Full Screen"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation Arrows (Hidden on Mobile) */}
          <button onClick={prevPlan} className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg items-center justify-center text-black hover:bg-[#12AD65] hover:text-white transition-all z-10">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextPlan} className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg items-center justify-center text-black hover:bg-[#12AD65] hover:text-white transition-all z-10">
            <ChevronRight size={24} />
          </button>

          {/* Mobile Indicators: Added Pagination Dots */}
          <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {plans.map((_, idx) => (
              <div 
                key={idx} 
                className={clsx(
                  "h-1 rounded-full transition-all duration-300",
                  activePlan === idx ? "w-6 bg-[#12AD65]" : "w-2 bg-gray-300"
                )} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}