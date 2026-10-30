'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Heart,
  MapPin,
  ExternalLink,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';
import { isPropertySaved, toggleSavedProperty } from '@/lib/wishlist';

interface PropertyCardProps {
  property: {
    id: string;
    slug: string;
    title: string;
    price: number;
    bedrooms?: number | null;
    bathrooms?: number | null;
    carpetAreaSqFt: number;
    propertyType: string;
    listingType: string;
    city: string;
    localityName: string;
    images?: string | null;
    truthScore: number;
    isVerified: boolean;
    isFeatured?: boolean;
    isPromoted?: boolean;
    promotedUntil?: string | Date | null;
    reraId?: string | null;
    organization?: {
      name: string;
      logo?: string | null;
      isVerified?: boolean;
    } | null;
    user?: {
      name: string;
      avatar?: string | null;
      phone?: string | null;
    } | null;
  };
  onCompare?: (property: any) => void;
  isCompared?: boolean;
}

export default function PropertyCard({ property, onCompare, isCompared = false }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isPropertySaved(property.id || property.slug));

    const handleUpdate = () => {
      setIsSaved(isPropertySaved(property.id || property.slug));
    };

    window.addEventListener('estateos_wishlist_updated', handleUpdate);
    return () => window.removeEventListener('estateos_wishlist_updated', handleUpdate);
  }, [property.id, property.slug]);

  // Parse images JSON safely
  let imageList: string[] = [];
  try {
    if (property.images) {
      imageList = typeof property.images === 'string' ? JSON.parse(property.images) : property.images;
    }
  } catch (e) {
    imageList = [];
  }
  const coverImage = imageList[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleSavedProperty(property);
    setIsSaved(next);
  };

  return (
    <div className="group card-luxury rounded-2xl overflow-hidden flex flex-col bg-white border border-charcoal-200/80 hover:border-gold-accent/50 transition-all duration-300">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
        <img
          src={coverImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          {property.isPromoted && (
            <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-400 text-forest-950 rounded-md shadow-md flex items-center gap-1 border border-yellow-300">
              <Sparkles className="w-3 h-3 fill-forest-950" />
              Promoted
            </span>
          )}
          <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-forest-900/90 text-white rounded-md backdrop-blur-sm shadow-sm border border-forest-700">
            {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
          </span>
          {property.isFeatured && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-gold-accent text-forest-950 rounded-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-forest-950" />
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleSave}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-charcoal-700 hover:text-red-500 hover:bg-white shadow-md transition-all active:scale-95"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-red-500' : ''}`} />
        </button>

        {/* Bottom Truth Score Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest-950/85 backdrop-blur-md border border-gold-accent/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-gold-accent" />
            <span className="text-xs font-bold text-white tracking-tight">
              Truth Score: <strong className="text-gold-light">{property.truthScore}</strong>/100
            </span>
          </div>

          {property.isVerified && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              <span>RERA Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Type */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-xl sm:text-2xl font-black text-forest-900 tracking-tight font-serif">
                {formatCurrencyINR(property.price)}
              </span>
              {property.listingType === 'RENT' && (
                <span className="text-xs text-charcoal-500 font-medium"> /month</span>
              )}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 px-2 py-0.5 bg-slate-100 rounded">
              {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug}`} className="block group-hover:text-forest-700 transition-colors">
            <h3 className="font-bold text-charcoal-900 text-sm sm:text-base line-clamp-1 leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs text-charcoal-500 mt-1.5 mb-4 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0" />
            <span>{property.localityName}, {property.city}</span>
          </p>

          {/* Key specs (Beds, Baths, Area) */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-charcoal-100 text-charcoal-700 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-forest-700" />
              <span>{property.bedrooms || '-'} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-forest-700" />
              <span>{property.bathrooms || '-'} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-forest-700" />
              <span>{property.carpetAreaSqFt} sq.ft</span>
            </div>
          </div>
        </div>

        {/* Footer: Organization & CTA */}
        <div className="pt-4 mt-4 border-t border-charcoal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={property.organization?.logo || property.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80'}
              alt={property.organization?.name || property.user?.name || 'Agent'}
              className="w-7 h-7 rounded-full object-cover border border-forest-200"
            />
            <div className="text-[11px] leading-tight">
              <p className="font-bold text-forest-900 truncate max-w-[120px]">
                {property.organization?.name || property.user?.name || 'EstateOS Partner'}
              </p>
              <span className="text-[10px] text-charcoal-400">Verified Partner</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onCompare && (
              <button
                onClick={() => onCompare(property)}
                className={`px-2 py-1.5 text-[11px] font-bold rounded-lg border transition-all ${
                  isCompared
                    ? 'bg-forest-900 text-white border-forest-900'
                    : 'bg-white text-charcoal-600 border-charcoal-200 hover:border-forest-700'
                }`}
              >
                {isCompared ? 'Compared' : 'Compare'}
              </button>
            )}

            <Link
              href={`/property/${property.slug}`}
              className="px-3 py-1.5 text-xs font-bold text-white bg-forest-900 hover:bg-forest-800 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>View</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
