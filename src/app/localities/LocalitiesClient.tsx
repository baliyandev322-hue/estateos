'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  TrendingUp,
  MapPin,
  Building,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Plane,
  Train,
  Scale,
  X,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';
import AdSenseBanner from '@/components/AdSenseBanner';

interface LocalitiesClientProps {
  localities: any[];
}

export default function LocalitiesClient({ localities }: LocalitiesClientProps) {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<any[]>([]);

  const filteredLocalities = localities.filter((loc) => {
    const matchesCity = selectedCity === 'All' || loc.city === selectedCity;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const toggleCompare = (loc: any) => {
    if (compareList.some((item) => item.id === loc.id)) {
      setCompareList(compareList.filter((item) => item.id !== loc.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 localities at a time.');
        return;
      }
      setCompareList([...compareList, loc]);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>Micro-Market Data Intelligence</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-forest-950 tracking-tight">
            Locality Intelligence &amp; Capital Trends
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Data-backed capital growth, rental yields, civic infrastructure indices, and connectivity benchmarks across premier Indian growth corridors.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-4 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Mohali', 'Gurugram', 'Bangalore', 'Mumbai', 'Hyderabad'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCity === c
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-slate-100 text-charcoal-700 hover:bg-forest-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search locality name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg pl-8 pr-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
            />
            <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Compare Localities Floating Tray */}
        {compareList.length > 0 && (
          <div className="mb-10 bg-forest-950 text-white rounded-2xl p-6 border border-gold-accent/40 shadow-xl animate-in slide-in-from-top-4">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800 mb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-gold-accent" />
                <h3 className="font-serif font-bold text-base">
                  Compare Localities ({compareList.length}/3 Selected)
                </h3>
              </div>
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-forest-300 hover:text-white underline"
              >
                Clear Selection
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map((loc) => (
                <div key={loc.id} className="p-4 rounded-xl bg-forest-900 border border-forest-800 relative">
                  <button
                    onClick={() => toggleCompare(loc)}
                    className="absolute top-3 right-3 text-forest-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h4 className="font-bold text-sm text-white mb-2">{loc.name} ({loc.city})</h4>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Avg Rate:</span>
                      <strong className="text-gold-light">{formatCurrencyINR(loc.avgPricePerSqFt)}/sq.ft</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">1Y Capital Growth:</span>
                      <span className="text-emerald-400 font-bold">+{loc.priceTrend1Yr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Rental Yield:</span>
                      <span className="text-white font-bold">{loc.rentalYieldPercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Airport Distance:</span>
                      <span className="text-white font-medium">{loc.airportDistanceKm} km</span>
                    </div>
                  </div>

                  <Link
                    href={`/properties?city=${loc.city}&search=${encodeURIComponent(loc.name)}`}
                    className="mt-3 block text-center py-1.5 bg-forest-800 hover:bg-forest-700 text-gold-light text-[11px] font-bold rounded-lg border border-forest-700"
                  >
                    View Properties in {loc.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Localities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocalities.map((loc) => {
            const isComparing = compareList.some((c) => c.id === loc.id);

            return (
              <div
                key={loc.id}
                className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm hover:border-gold-accent hover:shadow-md transition-all flex flex-col justify-between"
              >
                {loc.imageUrl && (
                  <div className="aspect-[16/9] overflow-hidden bg-charcoal-100 relative">
                    <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-forest-900/90 text-white font-bold text-[10px] uppercase">
                      {loc.city}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-forest-950/90 text-gold-accent font-bold text-xs border border-gold-accent/40">
                      +{loc.priceTrend1Yr}% 1Y
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-forest-950">{loc.name}</h3>
                    <p className="text-xs text-charcoal-600 mt-1 line-clamp-2 leading-relaxed">
                      {loc.overview}
                    </p>

                    {/* Micro Data Badges */}
                    <div className="mt-4 pt-3 border-t border-charcoal-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-charcoal-500 font-medium">Avg Capital Rate:</span>
                        <strong className="text-forest-950 font-bold">{formatCurrencyINR(loc.avgPricePerSqFt)} / sq.ft</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal-500 font-medium">Rental Yield:</span>
                        <strong className="text-emerald-700 font-bold">{loc.rentalYieldPercent}% p.a.</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal-500 font-medium">3-Year Appreciation:</span>
                        <span className="font-bold text-forest-900">+{loc.priceTrend3Yr}%</span>
                      </div>
                    </div>

                    {/* Infrastructure Icons */}
                    <div className="mt-4 grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-[11px] text-charcoal-600 font-medium">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-forest-700" />
                        <span>{loc.schoolsCount} Schools</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartPulse className="w-3.5 h-3.5 text-forest-700" />
                        <span>{loc.hospitalsCount} Hospitals</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5 text-forest-700" />
                        <span>{loc.mallsCount} Retail</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-charcoal-100 flex items-center gap-2">
                    <button
                      onClick={() => toggleCompare(loc)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        isComparing
                          ? 'bg-forest-900 text-white border-forest-900'
                          : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-forest-700'
                      }`}
                    >
                      {isComparing ? 'Comparing' : 'Compare'}
                    </button>
                    <Link
                      href={`/properties?city=${loc.city}&search=${encodeURIComponent(loc.name)}`}
                      className="px-3 py-2 bg-forest-100 hover:bg-forest-200 text-forest-900 text-xs font-bold rounded-lg transition-colors"
                    >
                      View Listings
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory & Limitation Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-100 border border-charcoal-200 text-xs text-charcoal-500 leading-relaxed">
          <p>
            <strong>Data Disclosure &amp; Source Methodology:</strong> Locality intelligence indices, rental yield estimates, and historical capital appreciation figures are derived from aggregated public sub-registrar conveyance records, municipality GIS surveys, and active verified listings on EstateOS. Future infrastructure projects and appreciation rates are speculative estimates and should not be construed as investment guarantees.
          </p>
        </div>

        {/* AdSense Banner */}
        <AdSenseBanner slotId="localities-directory-banner" />
      </div>
    </div>
  );
}
