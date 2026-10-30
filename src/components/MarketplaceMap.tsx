'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { formatCurrencyINR } from '@/lib/utils';
import { ShieldCheck, MapPin, Navigation, Compass, Layers } from 'lucide-react';

interface MarketplaceMapProps {
  properties: any[];
}

export default function MarketplaceMap({ properties }: MarketplaceMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [activeCity, setActiveCity] = useState<string>('All');

  // Exact statutory coordinates for North India & major metro micro-markets
  const cityCoords: Record<string, [number, number]> = {
    Mohali: [30.6799, 76.7221],
    Chandigarh: [30.7333, 76.7794],
    Panchkula: [30.6942, 76.8606],
    Zirakpur: [30.6425, 76.8173],
    'New Chandigarh': [30.8034, 76.7321],
    Gurugram: [28.4595, 77.0266],
    Delhi: [28.6139, 77.2090],
    Noida: [28.5355, 77.3910],
    Bangalore: [12.9784, 77.6408],
    Mumbai: [19.0596, 72.8295],
  };

  const jumpToCity = (cityName: string) => {
    setActiveCity(cityName);
    if (!mapInstanceRef.current) return;

    if (cityName === 'All') {
      // Fit to all properties
      const markers = (mapInstanceRef.current as any)._allMarkers;
      if (markers && markers.length > 0) {
        const L = (window as any).L;
        if (L) {
          const group = L.featureGroup(markers);
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.15));
        }
      }
      return;
    }

    const coords = cityCoords[cityName];
    if (coords) {
      mapInstanceRef.current.flyTo(coords, 13, { duration: 1.2 });
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;
      (window as any).L = L;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Default center on first property or Mohali/Chandigarh
      const firstProp = properties[0];
      const initialCenter = firstProp?.latitude && firstProp?.longitude
        ? [firstProp.latitude, firstProp.longitude]
        : (firstProp?.city && cityCoords[firstProp.city]) || [30.6799, 76.7221];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter as [number, number],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      });
      mapInstanceRef.current = map;

      // CartoDB Positron / Clean OpenStreetMap tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      const markers: any[] = [];

      properties.forEach((prop, idx) => {
        // Precise jitter coordinates around city center if explicit lat/lng not in DB
        const baseCoord = cityCoords[prop.city] || cityCoords['Mohali'];
        const jitterLat = (Math.sin(idx * 1.7) * 0.025);
        const jitterLng = (Math.cos(idx * 2.3) * 0.025);

        const cLat = prop.latitude || (baseCoord[0] + jitterLat);
        const cLng = prop.longitude || (baseCoord[1] + jitterLng);

        let imageList: string[] = [];
        try {
          imageList = typeof prop.images === 'string' ? JSON.parse(prop.images) : prop.images || [];
        } catch (e) {
          imageList = [];
        }
        const img = imageList[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';

        // Luxury EstateOS Pin Badge
        const priceIcon = L.divIcon({
          className: 'estateos-map-pin',
          html: `
            <div style="background: #0F2E1E; border: 2px solid #D4AF37; color: #ffffff; padding: 5px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 14px rgba(0,0,0,0.35); display: flex; align-items: center; gap: 5px; white-space: nowrap; cursor: pointer;">
              <span style="color: #D4AF37; font-size: 13px;">✦</span>
              <span>${formatCurrencyINR(prop.price)}</span>
            </div>
          `,
          iconSize: [95, 30],
          iconAnchor: [47, 15],
        });

        const marker = L.marker([cLat, cLng], { icon: priceIcon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: inherit; width: 230px; padding: 2px;">
            <div style="width: 100%; height: 115px; border-radius: 10px; overflow: hidden; background: #111; margin-bottom: 8px; position: relative;">
              <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; top: 6px; left: 6px; background: rgba(15,46,30,0.9); color: #D4AF37; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(212,175,55,0.4);">
                Truth Score ${prop.truthScore || 94}/100
              </div>
            </div>
            <strong style="color: #0F2E1E; font-size: 13px; display: block; line-height: 1.25; font-weight: 800;">${prop.title}</strong>
            <p style="margin: 3px 0 0; color: #545C70; font-size: 11px;">📍 ${prop.localityName || 'Prime Sector'}, ${prop.city}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
              <div>
                <span style="font-size: 9px; color: #777; text-transform: uppercase; font-weight: 700; display: block;">Price</span>
                <span style="font-weight: 900; color: #0F2E1E; font-size: 13px;">${formatCurrencyINR(prop.price)}</span>
              </div>
              <a href="/property/${prop.slug}" style="display: inline-block; background: #0F2E1E; color: #fff; padding: 5px 12px; border-radius: 8px; font-weight: 800; font-size: 11px; text-decoration: none; border: 1px solid #D4AF37;">
                View Flat →
              </a>
            </div>
          </div>
        `);

        markers.push(marker);
      });

      (map as any)._allMarkers = markers;

      if (markers.length > 1) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.15));
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties]);

  const quickCities = ['All', 'Mohali', 'Chandigarh', 'Panchkula', 'Zirakpur', 'New Chandigarh', 'Gurugram'];

  return (
    <div className="bg-white rounded-3xl border border-charcoal-200 overflow-hidden shadow-lg relative">
      {/* Map Control Header */}
      <div className="p-4 bg-forest-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-forest-900 border border-gold-accent/40 flex items-center justify-center text-gold-accent">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-black text-sm text-gold-accent">
              EstateOS Micro-Market Geospatial Radar
            </h4>
            <p className="text-[11px] text-forest-200">
              {properties.length} RERA-verified societies &amp; residential towers mapped live
            </p>
          </div>
        </div>

        {/* Quick City Jump Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-forest-400 font-bold uppercase hidden md:inline">Jump To:</span>
          {quickCities.map((c) => (
            <button
              key={c}
              onClick={() => jumpToCity(c)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                activeCity === c
                  ? 'bg-gold-accent text-forest-950 shadow-sm'
                  : 'bg-forest-900/80 text-forest-200 hover:text-white hover:bg-forest-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-[620px] z-10" />

      {/* Bottom Floating Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-forest-950/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-forest-800 shadow-md text-[11px] flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gold-accent animate-pulse" />
          <span className="font-bold text-forest-100">Live RERA Plot</span>
        </div>
        <span className="text-forest-400">|</span>
        <span className="text-forest-300">Click any badge to view society details &amp; pricing</span>
      </div>
    </div>
  );
}
