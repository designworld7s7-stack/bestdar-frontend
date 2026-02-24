'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  MapPin, 
  Plane, 
  Building2, 
  Utensils, 
  Car, 
  Navigation 
} from 'lucide-react';

// 1. تحديث الـ Props لتستقبل كائن project
interface NeighborhoodProps {
  lang: string;
  project: any;
}

export default function ProjectNeighborhood({ lang, project }: NeighborhoodProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const isAr = lang === 'ar';

  // 2. استخراج البيانات العربية مباشرة من الكائن
  let rawLandmarks = isAr ? (project?.landmarks_ar || project?.landmarks) : project?.landmarks;
  let safeLandmarks: any[] = [];
  
  if (typeof rawLandmarks === 'string') {
    try { safeLandmarks = JSON.parse(rawLandmarks); } catch (e) { safeLandmarks = []; }
  } else if (Array.isArray(rawLandmarks)) {
    safeLandmarks = rawLandmarks;
  }

  // 2. الفلتر الآمن للخريطة (يضمن أن الإحداثيات أرقام صحيحة ويقرأ الأسماء البديلة)
  const mapLongitude = Number(project?.map_longitude || project?.longitude);
  const mapLatitude = Number(project?.map_latitude || project?.latitude);

  // 3. وصف الحي
  const description = isAr 
    ? (project?.neighborhood_description_ar || project?.neighborhood_description)
    : project?.neighborhood_description;

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'travel': case 'airport': return <Plane size={16} />;
      case 'shopping': case 'mall': return <Building2 size={16} />;
      case 'leisure': case 'beach': return <Utensils size={16} />;
      default: return <Car size={16} />;
    }
  };

  // نستخدم useEffect للتأكد من أن المكون جاهز (Mounting)
  useEffect(() => {
    setMapLoaded(true);
  }, []);

useEffect(() => {
    if (!mapLoaded || !mapContainer.current || !mapLongitude || !mapLatitude) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;
    mapboxgl.accessToken = token;

    if (mapInstanceRef.current) return;

    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11', 
        center: [mapLongitude, mapLatitude],
        zoom: 14,
        pitch: 45,
        antialias: true 
      });

      mapInstanceRef.current = map;

      // --- الجزء المضاف لحل مشكلة الموبايل ---
      const resizer = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.resize();
        }
      });

      if (mapContainer.current) {
        resizer.observe(mapContainer.current);
      }
      // ------------------------------------

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      new mapboxgl.Marker({ color: '#12AD65' })
        .setLngLat([mapLongitude, mapLatitude])
        .addTo(map);

      map.on('load', () => {
        map.resize();
      });

      // تعديل الـ Cleanup ليشمل الـ resizer
      return () => {
        resizer.disconnect(); // إيقاف المراقب
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      console.error("Mapbox error:", err);
    }
  }, [mapLoaded, mapLongitude, mapLatitude]);

 return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24">
      {/* قمنا بتغيير التوزيع من flex إلى grid لمنحك تحكماً أدق في المساحات */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* الجانب النصي والمعالم */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-10 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <div className="h-[1px] w-8 bg-[#12AD65]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
                {isAr ? "الموقع والجوار" : "The Neighborhood"}
              </span>
            </div>

            <h3 className="text-4xl lg:text-6xl font-black text-black uppercase tracking-tighter leading-[0.9] mb-4">
              {isAr ? "اكتشف المنطقة" : "Explore the Area"}
            </h3>

            <div className="relative">
              <p className="text-[#4B5563] text-base lg:text-xl font-medium leading-relaxed border-l-2 border-gray-100 pl-6 py-2">
                {description || (isAr ? "يقع المشروع في منطقة استراتيجية." : "Located in a strategic area.")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {safeLandmarks?.map((item: any, idx: number) => (
    <div key={idx} className="group bg-white p-6 rounded-[32px] flex items-center gap-5 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-gray-50 transition-all hover:bg-[#12AD65] hover:border-[#12AD65]">
      <div className="text-[#12AD65] bg-[#12AD65]/5 p-4 rounded-2xl group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
        {getIcon(item.type)}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white/70 transition-colors">
          {item.name}
        </p>
        {/* التعديل هنا: سيعرض القيمة المدخلة في سوبابيس سواء كانت "10 MIN" أو "5 KM" */}
        <p className="text-xl font-black text-black group-hover:text-white transition-colors uppercase">
          {item.time} 
        </p>
      </div>
    </div>
  ))}
</div>
        </div>

        {/* جانب الخريطة */}
        <div className="lg:col-span-7 w-full h-[450px] lg:h-[700px] bg-gray-100 rounded-[40px] overflow-hidden relative shadow-sm order-1 lg:order-2">
          {!mapLongitude || !mapLatitude ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
              <Navigation className="animate-pulse" size={20} /> 
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isAr ? "إحداثيات غير متوفرة" : "No Coordinates"}
              </span>
            </div>
          ) : (
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
          )}
        </div>
      </div>
    </section>
  );
}