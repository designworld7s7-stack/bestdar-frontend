'use client';

import React, { useEffect, useRef } from 'react';
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

// Set the access token outside the component
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

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
  landmarks, 
  mapLongitude, 
  mapLatitude 
}: NeighborhoodProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isAr = lang === 'ar';

  // Helper function to pick icons based on landmark name/type
  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'travel': case 'airport': return <Plane size={16} />;
      case 'shopping': case 'mall': return <Building2 size={16} />;
      case 'leisure': case 'beach': return <Utensils size={16} />;
      default: return <Car size={16} />;
    }
  };

  useEffect(() => {
    // Only initialize if container exists and coordinates are valid
    if (!mapContainer.current || !mapLongitude || !mapLatitude) return;
    if (map.current) return; // Prevent double initialization

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Clean boutique style
      center: [mapLongitude, mapLatitude],
      zoom: 14,
      pitch: 45, // Adds a premium 3D perspective
    });

    // Add Navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add Custom Brand Marker
    const marker = new mapboxgl.Marker({ color: '#12AD65' })
      .setLngLat([mapLongitude, mapLatitude])
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapLongitude, mapLatitude]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Text & Landmarks Side */}
        <div className="flex-1 space-y-8 order-1">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#12AD65]">
              <MapPin size={18} />
              <span className="text-[11px] font-medium uppercase tracking-tight">
                {isAr ? "الموقع والجوار" : "Location & Neighborhood"}
              </span>
            </div>
            <h3 className="text-3xl lg:text-5xl font-medium text-black uppercase tracking-[0.05em]">
              {isAr ? "اكتشف المنطقة" : "Explore the Area"}
            </h3>
            <p className="text-[#4B5563] text-sm lg:text-lg font-medium leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Dynamic Distance Cards */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {landmarks?.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-50 transition-transform hover:scale-[1.02]">
                <div className="text-[#12AD65] bg-[#12AD65]/5 p-3 rounded-xl">
                  {getIcon(item.type)}
                </div>
                <div>
                  <p className="text-[9px] font-medium text-[#4B5563] uppercase tracking-tighter">
                    {item.name}
                  </p>
                  <p className="text-sm font-bold text-black">{item.time}</p>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Mapbox Container */}
        <div className="flex-1 min-h-[400px] lg:h-[650px] w-full bg-gray-100 rounded-[40px] overflow-hidden relative shadow-sm order-2">
          {!mapLongitude || !mapLatitude ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Navigation className="animate-pulse mr-2" /> 
              {isAr ? "إحداثيات الخريطة غير متوفرة" : "Map coordinates not provided"}
            </div>
          ) : (
            <div ref={mapContainer} className="w-full h-full" />
          )}
        </div>
      </div>
    </section>
  );
}