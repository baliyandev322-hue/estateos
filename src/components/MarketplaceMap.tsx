'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { formatCurrencyINR } from '@/lib/utils';
import { ShieldCheck, MapPin } from 'lucide-react';

interface MarketplaceMapProps {
  properties: any[];
}

export default function MarketplaceMap({ properties }: MarketplaceMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Coordinate defaults for Indian metro cities
  const cityCoords: Record<string, [number, number]> = {
    Mohali: [30.6558, 76.7324],
    Gurugram: [28.4116, 77.0858],
    Bangalore: [12.9784, 77.6408],
    Mumbai: [19.0596, 72.8295],
    Hyderabad: [17.4401, 78.3489],
  };

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Default center on first property or Mohali/Delhi
      const firstProp = properties[0];
      const initialCenter = firstProp?.latitude && firstProp?.longitude
        ? [firstProp.latitude, firstProp.longitude]
        : cityCoords[firstProp?.city] || [28.4116, 77.0858];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter as [number, number],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: true,
      });
      mapInstanceRef.current = map;

      // Clean CartoDB Voyager tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const markers: any[] = [];

      properties.forEach((prop, idx) => {
        const cLat = prop.latitude || cityCoords[prop.city]?.[0] || 28.4116 + idx * 0.02;
        const cLng = prop.longitude || cityCoords[prop.city]?.[1] || 77.0858 + idx * 0.02;

        let imageList: string[] = [];
        try {
          imageList = typeof prop.images === 'string' ? JSON.parse(prop.images) : prop.images || [];
        } catch (e) {
          imageList = [];
        }
        const img = imageList[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';

        // Price badge marker
        const priceIcon = L.divIcon({
          className: 'marketplace-price-pin',
          html: `
            <div style="background-color: #0F2E1E; border: 2px solid #D4AF37; color: white; padding: 4px 8px; border-radius: 20px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 14px rgba(0,0,0,0.35); display: flex; align-items: center; gap: 4px; white-space: nowrap; cursor: pointer; transform: scale(1); transition: transform 0.2s;">
              <span style="color: #D4AF37;">★</span> ${formatCurrencyINR(prop.price)}
            </div>
          `,
          iconSize: [90, 28],
          iconAnchor: [45, 14],
        });

        const marker = L.marker([cLat, cLng], { icon: priceIcon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: inherit; width: 220px; padding: 2px;">
            <div style="width: 100%; height: 110px; border-radius: 8px; overflow: hidden; background: #eee; margin-bottom: 6px;">
              <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <strong style="color: #0F2E1E; font-size: 12px; display: block; line-height: 1.3;">${prop.title}</strong>
            <p style="margin: 2px 0 0; color: #545C70; font-size: 11px;">${prop.localityName}, ${prop.city}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px solid #eee;">
              <span style="font-weight: 900; color: #0F2E1E; font-size: 13px;">${formatCurrencyINR(prop.price)}</span>
              <a href="/property/${prop.slug}" style="display: inline-block; background: #0F2E1E; color: white; padding: 3px 8px; border-radius: 6px; font-weight: bold; font-size: 10px; text-decoration: none;">View</a>
            </div>
          </div>
        `);

        markers.push(marker);
      });

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

  return (
    <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm relative">
      <div className="p-3 bg-forest-950 text-white flex items-center justify-between text-xs">
        <span className="font-bold flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gold-accent" />
          Interactive Real Estate Map ({properties.length} Verified Properties Plotted)
        </span>
        <span className="text-[10px] text-forest-300">Click any price badge to preview</span>
      </div>
      <div ref={mapContainerRef} className="w-full h-[580px] z-10" />
    </div>
  );
}
