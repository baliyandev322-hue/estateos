'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Trash2,
  Search,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';
import { getSavedProperties, removeSavedProperty } from '@/lib/wishlist';

interface BuyerDashboardClientProps {
  user: any;
  serverSaved: any[];
  appointments: any[];
  recommended: any[];
}

export default function BuyerDashboardClient({
  user,
  serverSaved,
  appointments,
  recommended,
}: BuyerDashboardClientProps) {
  const [savedItems, setSavedItems] = useState<any[]>(serverSaved);

  useEffect(() => {
    // Read persistent wishlist from localStorage
    const localSaved = getSavedProperties();
    if (localSaved.length > 0) {
      // Merge local with server avoiding duplicates
      const map = new Map();
      localSaved.forEach((p) => {
        map.set(p.id || p.slug, {
          id: p.id || p.slug,
          property: p,
          isLocal: true,
        });
      });
      serverSaved.forEach((item) => {
        const id = item.property?.id || item.property?.slug;
        if (id && !map.has(id)) {
          map.set(id, item);
        }
      });
      setSavedItems(Array.from(map.values()));
    }

    const handleUpdate = () => {
      const refreshed = getSavedProperties();
      setSavedItems(
        refreshed.map((p) => ({
          id: p.id || p.slug,
          property: p,
          isLocal: true,
        }))
      );
    };

    window.addEventListener('estateos_wishlist_updated', handleUpdate);
    return () => window.removeEventListener('estateos_wishlist_updated', handleUpdate);
  }, [serverSaved]);

  const handleRemove = (propId: string) => {
    removeSavedProperty(propId);
    setSavedItems((prev) =>
      prev.filter((item) => item.property?.id !== propId && item.property?.slug !== propId)
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-forest-800"
            />
            <div>
              <h1 className="font-serif text-2xl font-black text-forest-950">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Buyer &amp; Investor Workspace • Verified ID Account
              </p>
            </div>
          </div>

          <Link
            href="/ai-matchmaker"
            className="px-4 py-2.5 rounded-xl bg-forest-900 text-gold-accent font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:bg-forest-800 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-gold-accent" />
            <span>Launch AI Matchmaker</span>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Saved Properties & Scheduled Visits */}
          <div className="lg:col-span-8 space-y-8">
            {/* Scheduled Site Visits */}
            <div className="bg-white rounded-3xl border border-charcoal-200 p-6 shadow-sm">
              <h2 className="font-serif font-bold text-lg text-forest-950 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-forest-800" />
                <span>My Scheduled Property Walkthroughs ({appointments.length})</span>
              </h2>

              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((apt: any) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                          {apt.status || 'CONFIRMED'}
                        </span>
                        <h4 className="font-bold text-sm text-forest-950">
                          {apt.property?.title || 'Luxury Residence Walkthrough'}
                        </h4>
                        <p className="text-xs text-charcoal-500">
                          Date: {new Date(apt.scheduledDate).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })} • Time: {apt.timeSlot || '11:00 AM'}
                        </p>
                      </div>

                      <Link
                        href={`/property/${apt.property?.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-forest-900 text-white font-bold text-xs flex items-center gap-1 whitespace-nowrap self-start sm:self-center"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3 text-gold-accent" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-500">No scheduled visits yet.</p>
              )}
            </div>

            {/* Saved Wishlist Properties (Real LocalStorage Synced) */}
            <div className="bg-white rounded-3xl border border-charcoal-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  <span>Saved Wishlist ({savedItems.length})</span>
                </h2>
                <span className="text-[11px] text-charcoal-400 font-semibold">
                  Synced across devices &amp; sessions
                </span>
              </div>

              {savedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedItems.map((item: any) => {
                    const prop = item.property;
                    let img =
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                    try {
                      const parsed = JSON.parse(prop?.images || '[]');
                      if (parsed[0]) img = parsed[0];
                    } catch (e) {}

                    return (
                      <div
                        key={item.id || prop?.id || prop?.slug}
                        className="rounded-2xl border border-charcoal-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group bg-white"
                      >
                        <div className="h-40 w-full relative overflow-hidden bg-charcoal-100">
                          <img
                            src={img}
                            alt={prop?.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 bg-forest-950/85 backdrop-blur-md text-gold-accent font-bold text-[10px] px-2 py-0.5 rounded-full border border-gold-accent/30">
                            Truth Score: {prop?.truthScore || 92}/100
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemove(prop?.id || prop?.slug)}
                            aria-label="Remove from Wishlist"
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-rose-50 text-charcoal-500 hover:text-rose-600 flex items-center justify-center transition-colors shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-serif font-bold text-sm text-forest-950 line-clamp-1">
                              {prop?.title}
                            </p>
                            <p className="text-xs text-charcoal-500 mt-0.5">
                              {prop?.bedrooms ? `${prop.bedrooms} BHK • ` : ''}
                              {prop?.carpetAreaSqFt} sq.ft • {prop?.city}
                            </p>
                            <p className="font-serif font-black text-sm text-forest-900 mt-2">
                              {formatCurrencyINR(prop?.price || 0)}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-charcoal-100 flex items-center justify-between">
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                              RERA Verified
                            </span>
                            <Link
                              href={`/property/${prop?.slug}`}
                              className="text-xs font-bold text-forest-900 hover:text-forest-700 flex items-center gap-1"
                            >
                              <span>View</span>
                              <ExternalLink className="w-3 h-3 text-gold-accent" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-charcoal-200 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-charcoal-500 flex items-center justify-center mx-auto">
                    <Heart className="w-5 h-5 text-charcoal-400" />
                  </div>
                  <h4 className="text-sm font-bold text-forest-950">No Shortlisted Homes Yet</h4>
                  <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                    Click the Heart icon on any luxury apartment, villa, or penthouse card to shortlist it here.
                  </p>
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 text-white font-bold text-xs"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Browse Properties</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Suggestions & Pre-Approved Loan Status */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-forest-950 to-forest-900 text-white rounded-3xl p-6 shadow-xl border border-forest-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent">
                Financing Desk
              </span>
              <h3 className="font-serif font-bold text-lg mt-1 text-white">
                Pre-Approved Home Loan
              </h3>
              <p className="text-xs text-forest-200 mt-2 leading-relaxed">
                Connect with our partner banks (HDFC, SBI, ICICI) with preferential 8.35% p.a. interest rates.
              </p>

              <div className="mt-4 p-3 bg-forest-900/60 rounded-xl border border-forest-700 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-forest-300">Sanction Ceiling:</span>
                  <span className="font-mono font-bold text-gold-accent">Up to ₹5.00 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-300">Processing TAT:</span>
                  <span className="font-mono font-bold text-emerald-400">48 Hours</span>
                </div>
              </div>

              <Link
                href="/calculators"
                className="mt-4 w-full py-2.5 rounded-xl bg-gold-accent text-forest-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-gold-light transition-colors"
              >
                <span>Calculate EMI &amp; Apply</span>
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-charcoal-200 p-6 shadow-sm">
              <h3 className="font-serif font-bold text-base text-forest-950 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-accent" />
                <span>Featured Recommendations</span>
              </h3>

              <div className="space-y-3">
                {recommended.map((prop: any) => (
                  <Link
                    key={prop.id}
                    href={`/property/${prop.slug}`}
                    className="p-3 rounded-2xl bg-slate-50 border border-charcoal-200 hover:border-forest-700 transition-colors flex items-center gap-3 group block"
                  >
                    <div className="w-12 h-12 rounded-xl bg-charcoal-200 overflow-hidden shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80"
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-forest-950 truncate group-hover:text-forest-700">
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-charcoal-500">
                        {prop.city} • {formatCurrencyINR(prop.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
