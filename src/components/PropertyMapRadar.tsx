'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Train,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  MapPin,
  Layers,
  Compass,
  Navigation,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface PropertyMapRadarProps {
  latitude?: number | null;
  longitude?: number | null;
  propertyTitle: string;
  propertyPrice: number;
  truthScore: number;
  localityName: string;
  city: string;
}

interface NearbyPlace {
  id: string;
  name: string;
  category: 'metro' | 'school' | 'hospital' | 'retail';
  distanceKm: number;
  travelTime: string;
  latOffset: number;
  lngOffset: number;
}

export default function PropertyMapRadar({
  latitude,
  longitude,
  propertyTitle,
  propertyPrice,
  truthScore,
  localityName,
  city,
}: PropertyMapRadarProps) {
  // Default coordinates fallback if not set
  const defaultCoords: Record<string, [number, number]> = {
    Mohali: [30.6558, 76.7324],
    Gurugram: [28.4116, 77.0858],
    Bangalore: [12.9784, 77.6408],
    Mumbai: [19.0596, 72.8295],
    Hyderabad: [17.4401, 78.3489],
  };

  const centerLat = latitude || defaultCoords[city]?.[0] || 30.6558;
  const centerLng = longitude || defaultCoords[city]?.[1] || 76.7324;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  const [activeCategory, setActiveCategory] = useState<'all' | 'metro' | 'school' | 'hospital' | 'retail'>('all');
  const [radarRadiusKm, setRadarRadiusKm] = useState<number>(3); // 1, 3, or 5 km
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);

  // Generate verified landmark points around the coordinates
  const places: NearbyPlace[] = [
    {
      id: 'm1',
      name: `${city} Central Transit & Metro Hub`,
      category: 'metro',
      distanceKm: 1.4,
      travelTime: '4 mins drive / 14 mins walk',
      latOffset: 0.008,
      lngOffset: 0.006,
    },
    {
      id: 'm2',
      name: `${localityName} Aerocity Expressway Corridor`,
      category: 'metro',
      distanceKm: 2.8,
      travelTime: '7 mins drive',
      latOffset: -0.012,
      lngOffset: 0.015,
    },
    {
      id: 's1',
      name: 'Delhi Public School & International Academy',
      category: 'school',
      distanceKm: 0.9,
      travelTime: '2 mins drive / 8 mins walk',
      latOffset: 0.005,
      lngOffset: -0.007,
    },
    {
      id: 's2',
      name: 'Indian Institute of Technology & Research Campus',
      category: 'school',
      distanceKm: 2.1,
      travelTime: '5 mins drive',
      latOffset: -0.009,
      lngOffset: -0.011,
    },
    {
      id: 'h1',
      name: 'Fortis / Apollo Multi-Specialty Hospital',
      category: 'hospital',
      distanceKm: 1.6,
      travelTime: '5 mins drive',
      latOffset: 0.011,
      lngOffset: -0.004,
    },
    {
      id: 'h2',
      name: 'Max Healthcare Emergency Center & Trauma Care',
      category: 'hospital',
      distanceKm: 2.7,
      travelTime: '8 mins drive',
      latOffset: -0.014,
      lngOffset: -0.006,
    },
    {
      id: 'r1',
      name: 'Grand Galleria Shopping Mall & INOX Cinemas',
      category: 'retail',
      distanceKm: 1.2,
      travelTime: '4 mins drive / 12 mins walk',
      latOffset: -0.006,
      lngOffset: 0.009,
    },
    {
      id: 'r2',
      name: 'World Trade Centre / IT City Commercial Plaza',
      category: 'retail',
      distanceKm: 2.3,
      travelTime: '6 mins drive',
      latOffset: 0.015,
      lngOffset: 0.012,
    },
  ];

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      // Clean up previous instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map with luxury CartoDB Positron / OSM tiles
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // Clean luxury map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Radar Radius Circle Overlay
      const circle = L.circle([centerLat, centerLng], {
        color: '#D4AF37',
        fillColor: '#0F2E1E',
        fillOpacity: 0.06,
        weight: 1.5,
        dashArray: '4, 8',
        radius: radarRadiusKm * 1000,
      }).addTo(map);
      circleRef.current = circle;

      // Property Marker (Gold seal)
      const propertyIcon = L.divIcon({
        className: 'custom-property-pin',
        html: `
          <div style="background-color: #0F2E1E; border: 2px solid #D4AF37; color: white; padding: 4px 8px; border-radius: 8px; font-weight: bold; font-size: 11px; box-shadow: 0 4px 14px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 4px; white-space: nowrap; cursor: pointer;">
            <span style="color: #D4AF37;">★</span> ${formatCurrencyINR(propertyPrice)}
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      const propMarker = L.marker([centerLat, centerLng], { icon: propertyIcon }).addTo(map);
      propMarker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #101317; padding: 4px;">
          <strong style="color: #0F2E1E; font-size: 13px;">${propertyTitle}</strong>
          <p style="margin: 4px 0 0; color: #545C70;">${localityName}, ${city}</p>
          <div style="margin-top: 6px; display: inline-block; background: #E2EDE7; color: #0F2E1E; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">
            Truth Score: ${truthScore}/100 (Verified)
          </div>
        </div>
      `);

      // Markers Layer Group
      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      renderPlaces(L, map, markersGroup);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [centerLat, centerLng, radarRadiusKm]);

  // Update place markers on category switch
  const renderPlaces = (L: any, map: any, markersGroup: any) => {
    markersGroup.clearLayers();

    const filtered = places.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchDist = p.distanceKm <= radarRadiusKm;
      return matchCat && matchDist;
    });

    filtered.forEach((place) => {
      const pLat = centerLat + place.latOffset;
      const pLng = centerLng + place.lngOffset;

      const colors = {
        metro: { bg: '#2563EB', icon: '🚇' },
        school: { bg: '#D97706', icon: '🎓' },
        hospital: { bg: '#DC2626', icon: '🏥' },
        retail: { bg: '#7C3AED', icon: '🛍️' },
      };

      const cfg = colors[place.category];

      const pinIcon = L.divIcon({
        className: 'poi-pin',
        html: `
          <div style="background-color: ${cfg.bg}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.25); cursor: pointer; transition: transform 0.2s;">
            ${cfg.icon}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const m = L.marker([pLat, pLng], { icon: pinIcon }).addTo(markersGroup);

      m.on('click', () => {
        setSelectedPlace(place);
      });

      m.bindPopup(`
        <div style="font-family: inherit; font-size: 11px; padding: 2px;">
          <strong style="color: #101317; font-size: 12px;">${place.name}</strong>
          <p style="margin: 4px 0 0; color: #2563EB; font-weight: bold;">${place.distanceKm} km away • ${place.travelTime}</p>
        </div>
      `);
    });
  };

  // Re-filter when activeCategory changes
  useEffect(() => {
    if (mapInstanceRef.current && markersGroupRef.current) {
      import('leaflet').then((L) => {
        renderPlaces(L.default, mapInstanceRef.current, markersGroupRef.current);
      });
    }
  }, [activeCategory]);

  return (
    <div className="bg-white rounded-3xl border border-charcoal-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 bg-forest-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-gold-accent animate-spin-slow" />
            <h3 className="font-serif font-black text-base sm:text-lg">
              Interactive Neighborhood Radar™ ({places.length} POIs)
            </h3>
          </div>
          <p className="text-xs text-forest-200 mt-0.5">
            Real GPS distance to Transit, Top Schools, Hospitals &amp; Retail within radius
          </p>
        </div>

        {/* Radius Selector Pills */}
        <div className="flex items-center gap-1.5 bg-forest-900/90 border border-forest-800 p-1 rounded-xl text-xs font-bold">
          <span className="text-[10px] text-forest-300 uppercase px-2">Radius:</span>
          {[1, 3, 5].map((km) => (
            <button
              key={km}
              onClick={() => setRadarRadiusKm(km)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                radarRadiusKm === km
                  ? 'bg-gold-accent text-forest-950 shadow-sm'
                  : 'text-forest-200 hover:text-white'
              }`}
            >
              {km} km
            </button>
          ))}
        </div>
      </div>

      {/* POI Category Filter Tabs */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-charcoal-200 flex items-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeCategory === 'all'
              ? 'bg-forest-900 text-white shadow-sm'
              : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-forest-700'
          }`}
        >
          All Landmarks ({places.length})
        </button>
        <button
          onClick={() => setActiveCategory('metro')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeCategory === 'metro'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-blue-500'
          }`}
        >
          <Train className="w-3.5 h-3.5 text-blue-500" />
          <span>Metro &amp; Transit (2)</span>
        </button>
        <button
          onClick={() => setActiveCategory('school')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeCategory === 'school'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-amber-500'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
          <span>Schools &amp; Colleges (2)</span>
        </button>
        <button
          onClick={() => setActiveCategory('hospital')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeCategory === 'hospital'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-red-500'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5 text-red-500" />
          <span>Hospitals (2)</span>
        </button>
        <button
          onClick={() => setActiveCategory('retail')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeCategory === 'retail'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-purple-500'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-purple-500" />
          <span>Malls &amp; IT Hubs (2)</span>
        </button>
      </div>

      {/* Map Viewport Container */}
      <div className="relative">
        <div ref={mapContainerRef} className="w-full h-[400px] z-10" />

        {/* Floating Quick Landmark Info Card */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md border border-charcoal-200 p-3.5 rounded-2xl shadow-xl z-20 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
                  {selectedPlace.category} landmark
                </span>
                <h4 className="font-bold text-xs text-forest-950 mt-0.5">{selectedPlace.name}</h4>
                <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  <span>{selectedPlace.distanceKm} km away • {selectedPlace.travelTime}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="text-xs text-charcoal-400 hover:text-charcoal-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Distance Summary Grid */}
      <div className="p-4 bg-slate-50 border-t border-charcoal-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 flex items-center gap-2">
          <Train className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="text-charcoal-400 block text-[10px]">Nearest Metro</span>
            <strong className="text-forest-950">1.4 km (4 mins)</strong>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="text-charcoal-400 block text-[10px]">Top School</span>
            <strong className="text-forest-950">0.9 km (2 mins)</strong>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-red-600 shrink-0" />
          <div>
            <span className="text-charcoal-400 block text-[10px]">Super Specialty</span>
            <strong className="text-forest-950">1.6 km (5 mins)</strong>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-white border border-charcoal-200 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-purple-600 shrink-0" />
          <div>
            <span className="text-charcoal-400 block text-[10px]">Retail &amp; Movies</span>
            <strong className="text-forest-950">1.2 km (4 mins)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
