'use client';

import React from 'react';
import Link from 'next/link';
import { X, Check, ShieldCheck, Scale, ArrowRight } from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface CompareModalProps {
  properties: any[];
  onRemove: (id: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({
  properties,
  onRemove,
  onClear,
  isOpen,
  onClose,
}: CompareModalProps) {
  if (!isOpen || properties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-charcoal-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-forest-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-gold-accent" />
            <h2 className="font-serif font-bold text-lg">Compare Verified Properties ({properties.length}/4)</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClear}
              className="text-xs text-forest-200 hover:text-white underline"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center hover:bg-forest-700 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-x-auto flex-1">
          <div className="min-w-[650px] grid grid-cols-4 gap-4">
            {/* Attributes column */}
            <div className="space-y-4 pt-48 font-bold text-xs text-charcoal-500 uppercase tracking-wider border-r border-charcoal-100 pr-3">
              <div className="h-8 flex items-center">Price</div>
              <div className="h-8 flex items-center">Truth Score™</div>
              <div className="h-8 flex items-center">Property Type</div>
              <div className="h-8 flex items-center">Configuration</div>
              <div className="h-8 flex items-center">Carpet Area</div>
              <div className="h-8 flex items-center">Rate / Sq.Ft</div>
              <div className="h-8 flex items-center">Location</div>
              <div className="h-8 flex items-center">RERA Status</div>
              <div className="h-10 flex items-center">Action</div>
            </div>

            {/* Compared properties */}
            {properties.map((prop) => {
              let imageList = [];
              try {
                imageList = typeof prop.images === 'string' ? JSON.parse(prop.images) : prop.images;
              } catch (e) {
                imageList = [];
              }
              const img = imageList[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';

              return (
                <div key={prop.id} className="relative flex flex-col space-y-4 border border-charcoal-200 rounded-xl p-3 bg-slate-50/60">
                  <button
                    onClick={() => onRemove(prop.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-charcoal-500 hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-32 rounded-lg overflow-hidden bg-charcoal-100">
                    <img src={img} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-xs text-forest-950 line-clamp-2 h-8">
                    {prop.title}
                  </h4>

                  {/* Attributes Values */}
                  <div className="h-8 flex items-center font-serif font-black text-sm text-forest-900">
                    {formatCurrencyINR(prop.price)}
                  </div>

                  <div className="h-8 flex items-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-forest-100 text-forest-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-accent" />
                      {prop.truthScore}/100
                    </span>
                  </div>

                  <div className="h-8 flex items-center text-xs font-semibold text-charcoal-700">
                    {prop.propertyType} ({prop.listingType})
                  </div>

                  <div className="h-8 flex items-center text-xs font-medium text-charcoal-700">
                    {prop.bedrooms || 0} BHK / {prop.bathrooms || 0} Bath
                  </div>

                  <div className="h-8 flex items-center text-xs font-medium text-charcoal-700">
                    {prop.carpetAreaSqFt} sq.ft
                  </div>

                  <div className="h-8 flex items-center text-xs font-medium text-charcoal-700">
                    {formatCurrencyINR(prop.pricePerSqFt || Math.round(prop.price / prop.carpetAreaSqFt))}/sq.ft
                  </div>

                  <div className="h-8 flex items-center text-xs font-medium text-charcoal-700 truncate">
                    {prop.localityName}, {prop.city}
                  </div>

                  <div className="h-8 flex items-center text-xs font-semibold text-emerald-700">
                    {prop.isVerified ? '✓ Verified RERA' : 'In Review'}
                  </div>

                  <div className="h-10 flex items-center pt-2">
                    <Link
                      href={`/property/${prop.slug}`}
                      className="w-full text-center py-2 px-3 text-xs font-bold text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
