'use client';
// مكون عالمي يحل مشاكل CORB و Cookies للأبد
export const SafeImage = ({ src, alt, className, ...props }: any) => {
  if (!src) return null;
  
  // إضافة كسر الكاش وتجاوز Cookies سوبابيس تلقائياً
  const safeSrc = src.includes('supabase.co') 
    ? `${src}${src.includes('?') ? '&' : '?'}t=${Date.now()}` 
    : src;

  return (
    <img 
      src={safeSrc} 
      alt={alt} 
      className={className}
      crossOrigin="anonymous" // هذا يحل تعارض الـ Cookies عالمياً
      loading="lazy"
      {...props}
    />
  );
};