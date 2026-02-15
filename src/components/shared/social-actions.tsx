'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Share2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { createClient } from '@/utils/supabase/client'; // استيراد العميل

interface SocialActionsProps {
  lang?: string;
  title?: string;
  itemId: string; // أضفنا هذا لتمييز العنصر المراد حفظه
  itemType: 'project' | 'guide'; // أضفنا هذا لتصنيف النوع
}

export default function SocialActions({ 
  lang, 
  title,
  itemId,
  itemType
}: SocialActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  
  const currentLang = lang || pathname.split('/')[1] || 'en';
  const isAr = currentLang === 'ar';

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. التحقق من حالة الحفظ عند تحميل المكون
  useEffect(() => {
   const checkStatus = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user && itemId) {
    const { data, error } = await supabase
      .from('saved_items')
      .select('id') // نطلب الـ id فقط للتحقق
      .eq('user_id', user.id)
      .eq('item_id', itemId)
      .maybeSingle(); // استخدم maybeSingle بدلاً من single لتجنب خطأ الـ 406
    
    if (data) setIsSaved(true);
  }
};
    checkStatus();
  }, [itemId]);

  // 2. دالة الحفظ الذكية
const handleSave = async (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();

  // 1. جلب المستخدم الحالي أولاً
  const { data: { user } } = await supabase.auth.getUser();

  // 2. التحقق من وجود المستخدم والمعرف قبل المتابعة
  if (!user) {
    console.warn("User must be logged in to save.");
    return;
  }

  if (!itemId) {
    console.warn("Save failed: itemId is missing.");
    return;
  }

  setLoading(true);
  
  try {
    const { error } = await supabase
      .from('saved_items')
      .insert({ 
        user_id: user.id, // الآن 'user' أصبح معرّفاً هنا
        item_id: itemId, 
        item_type: itemType 
      });

    if (error) {
      console.error("Save Error Detail:", error.message);
    } else {
      setIsSaved(true);
    }
  } catch (err) {
    console.error("Unexpected error during save:", err);
  } finally {
    setLoading(false);
  }
};

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: title || 'Best Dar | Premium Real Estate', 
          url: url 
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      alert(isAr ? "تم نسخ الرابط" : "Link copied");
    }
  };

  const buttonStyle = "flex items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:scale-110 active:scale-95 h-11 w-11 disabled:opacity-50";

  return (
    <div className="flex items-center gap-3 relative z-[30]">
      <button 
        onClick={handleSave} 
        disabled={loading}
        className={buttonStyle} 
        type="button"
      >
        <Bookmark 
          size={20} 
          className={clsx(isSaved ? "fill-[#12AD65] text-[#12AD65]" : "text-black")} 
        />
      </button>
      
      <button onClick={handleShare} className={buttonStyle} type="button">
        <Share2 size={20} className="text-black" />
      </button>
    </div>
  );
}