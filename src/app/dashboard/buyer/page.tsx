import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { Heart, Calendar, MessageSquare, Sparkles, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function BuyerDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const [savedItems, appointments, recommended] = await Promise.all([
    prisma.savedProperty.findMany({
      where: { userId: user.id },
      include: {
        property: {
          include: { organization: true },
        },
      },
    }),
    prisma.appointment.findMany({
      where: { userId: user.id },
      include: { property: true },
      orderBy: { scheduledDate: 'asc' },
    }),
    prisma.property.findMany({
      take: 2,
      where: { isFeatured: true },
      include: { organization: true },
    }),
  ]);

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
            className="px-4 py-2.5 rounded-xl bg-forest-900 text-gold-accent font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
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
                  {appointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                            {app.status}
                          </span>
                          <span className="text-xs font-bold text-charcoal-700">
                            {new Date(app.scheduledDate).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })} • {app.timeSlot}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-forest-950">
                          {app.property?.title}
                        </h4>
                        <p className="text-xs text-charcoal-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-forest-600" />
                          <span>{app.property?.localityName}, {app.property?.city}</span>
                        </p>
                      </div>

                      <Link
                        href={`/property/${app.property?.slug}`}
                        className="px-3 py-1.5 bg-forest-900 text-white rounded-lg text-xs font-bold text-center"
                      >
                        View Property
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-500">No upcoming property visits booked.</p>
              )}
            </div>

            {/* Saved Wishlist Properties */}
            <div className="bg-white rounded-3xl border border-charcoal-200 p-6 shadow-sm">
              <h2 className="font-serif font-bold text-lg text-forest-950 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span>Saved Wishlist ({savedItems.length})</span>
              </h2>

              {savedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-charcoal-200 bg-slate-50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-serif font-bold text-sm text-forest-900">
                            {formatCurrencyINR(item.property.price)}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-forest-100 text-forest-800">
                            Score: {item.property.truthScore}/100
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-forest-950 line-clamp-1">
                          {item.property.title}
                        </h4>
                        <p className="text-xs text-charcoal-500 mt-1">
                          {item.property.localityName}, {item.property.city}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-charcoal-200/60 flex justify-between items-center text-xs">
                        <span className="text-charcoal-600 font-medium">
                          {item.property.bedrooms} BHK • {item.property.carpetAreaSqFt} sq.ft
                        </span>
                        <Link
                          href={`/property/${item.property.slug}`}
                          className="font-bold text-forest-900 hover:underline flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-charcoal-500">You haven&apos;t saved any properties yet.</p>
              )}
            </div>
          </div>

          {/* Right Column: AI Suggestions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-forest-950 text-white rounded-3xl p-6 border border-forest-800 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-gold-accent" />
                <h3 className="font-serif font-bold text-base">
                  AI Algorithmic Matches
                </h3>
              </div>
              <p className="text-xs text-forest-200 leading-relaxed mb-4">
                Properties matching your search velocity in Mohali and Gurugram high-appreciation sectors:
              </p>

              <div className="space-y-3">
                {recommended.map((prop) => (
                  <div key={prop.id} className="p-3 rounded-xl bg-forest-900 border border-forest-800 text-xs">
                    <span className="font-bold text-gold-light block font-serif">
                      {formatCurrencyINR(prop.price)}
                    </span>
                    <h5 className="font-bold text-white line-clamp-1 mt-0.5">{prop.title}</h5>
                    <p className="text-forest-300 text-[11px] mt-0.5">{prop.localityName}, {prop.city}</p>
                    <Link
                      href={`/property/${prop.slug}`}
                      className="mt-2 block text-center py-1.5 bg-forest-800 hover:bg-forest-700 text-gold-accent rounded-lg font-bold text-[11px]"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
