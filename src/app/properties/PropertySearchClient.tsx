'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import CompareModal from '@/components/CompareModal';
import MarketplaceMap from '@/components/MarketplaceMap';
import {
  Filter,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  RotateCcw,
  Scale,
  Sparkles,
  LayoutGrid,
  Map,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface PropertySearchClientProps {
  initialProperties: any[];
  totalCount: number;
  currentPage: number;
  limit: number;
  initialParams: any;
  localities: { name: string; city: string }[];
}

export default function PropertySearchClient({
  initialProperties,
  totalCount,
  currentPage,
  limit,
  initialParams,
  localities,
}: PropertySearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local form state
  const [city, setCity] = useState(initialParams.city || 'All');
  const [search, setSearch] = useState(initialParams.search || '');
  const [listingType, setListingType] = useState(initialParams.listingType || 'ALL');
  const [propertyType, setPropertyType] = useState(initialParams.propertyType || 'ALL');
  const [bedrooms, setBedrooms] = useState(initialParams.bedrooms || '');
  const [verifiedOnly, setVerifiedOnly] = useState(initialParams.verified === 'true');
  const [sort, setSort] = useState(initialParams.sort || 'newest');
  const [minPrice, setMinPrice] = useState(initialParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialParams.maxPrice || '');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Compare properties state
  const [comparedList, setComparedList] = useState<any[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (city && city !== 'All') params.set('city', city);
    if (search) params.set('search', search);
    if (listingType && listingType !== 'ALL') params.set('listingType', listingType);
    if (propertyType && propertyType !== 'ALL') params.set('propertyType', propertyType);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (verifiedOnly) params.set('verified', 'true');
    if (sort) params.set('sort', sort);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    params.set('page', '1');

    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setCity('All');
    setSearch('');
    setListingType('ALL');
    setPropertyType('ALL');
    setBedrooms('');
    setVerifiedOnly(false);
    setSort('newest');
    setMinPrice('');
    setMaxPrice('');
    router.push('/properties');
  };

  const handleToggleCompare = (property: any) => {
    const exists = comparedList.find((p) => p.id === property.id);
    if (exists) {
      setComparedList(comparedList.filter((p) => p.id !== property.id));
    } else {
      if (comparedList.length >= 4) {
        alert('You can compare a maximum of 4 properties simultaneously.');
        return;
      }
      setComparedList([...comparedList, property]);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-500 mb-1">
              <span>Home</span>
              <span>/</span>
              <span className="text-forest-900 font-bold">Property Marketplace</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-forest-950">
              Verified Properties for Sale &amp; Rent
            </h1>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Showing {initialProperties.length} of {totalCount} RERA-audited properties
            </p>
          </div>

          {/* Compare Pill floating bar trigger if properties selected */}
          {comparedList.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 text-gold-accent font-bold text-xs uppercase tracking-wider shadow-lg border border-gold-accent/40 animate-bounce"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Selected ({comparedList.length})</span>
            </button>
          )}
        </div>

        {/* Layout Grid: Filters Sidebar + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-charcoal-200 p-5 shadow-sm space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
                <span className="font-bold text-sm text-forest-900 flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-gold-accent" />
                  Filter Criteria
                </span>
                <button
                  onClick={handleReset}
                  className="text-[11px] text-charcoal-500 hover:text-red-500 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Keyword / Locality Search */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Search Keywords
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                    placeholder="e.g. Sector 82, Penthouse, Carter Rd"
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg pl-8 pr-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
                  />
                  <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Listing Type Tabs */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Purpose
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                  {['ALL', 'SALE', 'RENT'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setListingType(type)}
                      className={`py-1.5 rounded-md transition-all ${
                        listingType === type
                          ? 'bg-forest-900 text-white shadow-sm'
                          : 'text-charcoal-600 hover:text-forest-900'
                      }`}
                    >
                      {type === 'ALL' ? 'All' : type === 'SALE' ? 'Buy' : 'Rent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  City / Market
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
                >
                  <option value="All">All Cities</option>
                  <option value="Muzaffarnagar">Muzaffarnagar (UP)</option>
                  <option value="Mohali">Mohali / Chandigarh</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Property Category
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
                >
                  <option value="ALL">All Categories</option>
                  <option value="APARTMENT">Apartments</option>
                  <option value="PENTHOUSE">Sky Penthouses</option>
                  <option value="VILLA">Luxury Villas</option>
                  <option value="COMMERCIAL">Commercial Office Floors</option>
                </select>
              </div>

              {/* Bedrooms (BHK) */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Bedrooms (BHK)
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                  {['', '2', '3', '4'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setBedrooms(val)}
                      className={`py-1.5 rounded-lg border text-center transition-all ${
                        bedrooms === val
                          ? 'bg-forest-900 text-white border-forest-900 shadow-sm'
                          : 'bg-slate-50 text-charcoal-700 border-charcoal-200 hover:border-forest-600'
                      }`}
                    >
                      {val === '' ? 'Any' : `${val}+ BHK`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range with Indian Crore / Lakh Formatting */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                    Budget Range
                  </label>
                  {(minPrice || maxPrice) && (
                    <button
                      onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                      className="text-[10px] text-charcoal-400 hover:text-red-600 font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                  {[
                    { label: 'Under ₹50 Lakh', min: '', max: '5000000' },
                    { label: '₹50 L – ₹1.5 Cr', min: '5000000', max: '15000000' },
                    { label: '₹1.5 Cr – ₹5 Cr', min: '15000000', max: '50000000' },
                    { label: '₹5 Cr – ₹15 Cr', min: '50000000', max: '150000000' },
                  ].map((preset) => {
                    const isSelected = minPrice === preset.min && maxPrice === preset.max;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setMinPrice(preset.min);
                          setMaxPrice(preset.max);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-left truncate ${
                          isSelected
                            ? 'bg-forest-900 text-gold-accent border-forest-900'
                            : 'bg-slate-50 text-charcoal-700 border-charcoal-200 hover:border-forest-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-[10px] text-charcoal-400 font-semibold mb-0.5">Min Price</span>
                    <input
                      type="number"
                      placeholder="Min (₹)"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-700 font-mono"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] text-charcoal-400 font-semibold mb-0.5">Max Price</span>
                    <input
                      type="number"
                      placeholder="Max (₹)"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-700 font-mono"
                    />
                  </div>
                </div>

                {/* Real-time formatted preview badge */}
                {(minPrice || maxPrice) && (
                  <div className="mt-2 p-2 rounded-lg bg-forest-50 border border-forest-200 text-[11px] text-forest-900 font-bold flex items-center justify-between">
                    <span className="text-charcoal-500 font-normal">Active Filter:</span>
                    <span className="text-forest-950 font-black">
                      {minPrice ? formatCurrencyINR(Number(minPrice)) : '₹0'} – {maxPrice ? formatCurrencyINR(Number(maxPrice)) : 'Any'}
                    </span>
                  </div>
                )}
              </div>

              {/* Truth Score / Verified Filter Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-forest-900 focus:ring-forest-800"
                  />
                  <span className="text-xs font-bold text-forest-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-accent" />
                    RERA Verified Only
                  </span>
                </label>
              </div>

              {/* Submit Filter Button */}
              <button
                onClick={applyFilters}
                className="w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md border border-forest-700 hover:border-gold-accent transition-all"
              >
                Apply Search Filters
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {/* Top Toolbar (Sort & Counts) */}
            <div className="bg-white rounded-xl border border-charcoal-200 px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <span className="text-xs font-bold text-charcoal-700">
                Found <strong className="text-forest-900">{totalCount}</strong> matching listings
              </span>

              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold border border-charcoal-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-forest-900 text-white shadow-sm'
                        : 'text-charcoal-600 hover:text-forest-900'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5 text-gold-accent" />
                    <span>Grid View</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      viewMode === 'map'
                        ? 'bg-forest-900 text-white shadow-sm'
                        : 'text-charcoal-600 hover:text-forest-900'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5 text-gold-accent" />
                    <span>Interactive Map</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-charcoal-500 font-medium whitespace-nowrap hidden sm:inline">
                    Sort:
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('sort', e.target.value);
                      router.push(`/properties?${params.toString()}`);
                    }}
                    className="text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-2.5 py-1 text-charcoal-800 focus:outline-none focus:border-forest-700"
                  >
                    <option value="newest">Newly Listed</option>
                    <option value="truth_score">Highest Truth Score™</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Grid or Map View */}
            {viewMode === 'map' ? (
              <MarketplaceMap properties={initialProperties} />
            ) : initialProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {initialProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onCompare={handleToggleCompare}
                    isCompared={comparedList.some((p) => p.id === prop.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-charcoal-200 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-forest-50 text-forest-700 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-forest-950">No matching properties found</h3>
                <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto">
                  Try broadening your budget, switching cities, or removing the verified filter to see more options.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-forest-900 text-white rounded-lg text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('page', pg.toString());
                      router.push(`/properties?${params.toString()}`);
                    }}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pg
                        ? 'bg-forest-900 text-white shadow'
                        : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-forest-700'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Modal */}
      <CompareModal
        properties={comparedList}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setComparedList(comparedList.filter((p) => p.id !== id))}
        onClear={() => {
          setComparedList([]);
          setIsCompareOpen(false);
        }}
      />
    </div>
  );
}
