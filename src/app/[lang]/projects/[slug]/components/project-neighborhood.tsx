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

interface NeighborhoodProps {
  lang: string;
  description: string;
  landmarks: any[];
  mapLongitude: number;
  mapLatitude: number;
}

export default function ProjectNeighborhood({ 
  lang, 
  description, 
  landmarks = [], 
  mapLongitude, 
  mapLatitude 
}: NeighborhoodProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false); // حالة للتأكد من جاهزية المكون
  const isAr = lang === 'ar';

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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Text & Landmarks Side */}
        <div className="flex-1 flex flex-col justify-center space-y-10 order-2 lg:order-1">
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
              <p className="text-[#4B5563] text-base lg:text-xl font-medium leading-relaxed max-w-xl border-l-2 border-gray-100 pl-6 py-2">
                {description || (isAr ? "يقع المشروع في منطقة استراتيجية." : "Located in a strategic area.")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {landmarks?.map((item, idx) => (
              <div key={idx} className="group bg-white p-6 rounded-[32px] flex items-center gap-5 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-gray-50 transition-all hover:bg-[#12AD65] hover:border-[#12AD65]">
                <div className="text-[#12AD65] bg-[#12AD65]/5 p-4 rounded-2xl group-hover:bg-white/20 group-hover:text-white transition-colors">
                  {getIcon(item.type)}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white/70 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-lg font-black text-black group-hover:text-white transition-colors">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapbox Container */}
<div className="w-full h-[400px] lg:h-[600px] bg-gray-100 rounded-[40px] overflow-hidden relative shadow-sm order-1 lg:order-2">
  {!mapLongitude || !mapLatitude ? (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
      <Navigation className="animate-pulse" size={20} /> 
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {isAr ? "إحداثيات غير متوفرة" : "No Coordinates"}
      </span>
    </div>
  ) : (
    /* استخدام w-full h-full مع absolute يضمن ملء الحاوية بالكامل */
    <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
  )}
</div>
      </div>
    </section>
  );
}