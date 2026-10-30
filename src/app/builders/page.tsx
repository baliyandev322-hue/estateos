import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Building2, CheckCircle2, ShieldCheck, MapPin, Award, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CURATED_BUILDERS = [
  {
    id: 'bld-1',
    name: 'Apex Heritage Infra Ltd.',
    slug: 'apex-heritage-realty',
    type: 'BUILDER_DEV',
    city: 'Mohali',
    state: 'Punjab',
    reraRegistration: 'PBRERA-PR-0291',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80',
    experienceYears: 18,
    totalProjectsDelivered: 14,
    underConstructionUnits: 680,
    truthScore: 95,
    overview: 'Pioneering IGBC Platinum certified sustainable residential towers in Sector 82 IT City Mohali.',
    properties: [
      { id: 'p1', title: 'Grand Azure Residences', price: 9200000, slug: 'grand-azure-residences' },
    ],
  },
  {
    id: 'bld-2',
    name: 'Green Lotus Infrastructure LLP',
    slug: 'green-lotus-infrastructure',
    type: 'BUILDER_DEV',
    city: 'Mohali & Zirakpur',
    state: 'Punjab',
    reraRegistration: 'PBRERA-PR-0188',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    experienceYears: 14,
    totalProjectsDelivered: 9,
    underConstructionUnits: 450,
    truthScore: 92,
    overview: 'Specialists in green architecture, solar-powered multi-tier apartments, and zero-discharge communities.',
    properties: [
      { id: 'p2', title: 'Green Lotus Avenue Smart Homes', price: 5800000, slug: 'green-lotus-avenue-2bhk-it-city-mohali' },
    ],
  },
  {
    id: 'bld-3',
    name: 'DLF Homes Ltd.',
    slug: 'dlf-homes',
    type: 'BUILDER_DEV',
    city: 'Panchkula & Gurugram',
    state: 'Haryana',
    reraRegistration: 'HRERA-PKL-128-2023',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
    experienceYears: 75,
    totalProjectsDelivered: 120,
    underConstructionUnits: 3200,
    truthScore: 97,
    overview: 'India premier publicly listed developer delivering signature township developments and luxury villas.',
    properties: [
      { id: 'p4', title: 'The Valley Gardens Luxury Floors', price: 17500000, slug: 'the-valley-gardens-villa-panchkula' },
    ],
  },
];

export default async function BuildersDirectoryPage() {
  let builders: any[] = [];
  try {
    builders = await prisma.organization.findMany({
      where: { type: 'BUILDER_DEV' },
      include: {
        properties: {
          select: { id: true, title: true, price: true, slug: true },
        },
      },
    });
  } catch (err) {
    console.warn('Failed to load builders from DB, using curated developer network:', err);
  }

  if (!builders || builders.length === 0) {
    builders = CURATED_BUILDERS;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4" />
            <span>Audited Corporate Developers</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            Certified RERA Developers &amp; Builders
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Direct access to institutional grade developers with 100% scheduled escrow compliance and state layout sanctions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {builders.map((builder) => (
            <div
              key={builder.id}
              className="card-luxury rounded-2xl bg-white border border-charcoal-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-forest-950 text-gold-accent flex items-center justify-center font-serif font-black text-lg shadow-sm border border-gold-accent/30">
                    <Building2 className="w-7 h-7 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-forest-950 text-base">{builder.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-600 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-accent" />
                      <span>{builder.city || 'Punjab / Haryana / NCR'}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>RERA: {builder.reraRegistration || 'Govt Registered'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
                  {builder.overview || 'Institutional real estate developer delivering master-planned residential and commercial projects.'}
                </p>

                {builder.properties && builder.properties.length > 0 && (
                  <div>
                    <span className="text-[10px] text-charcoal-500 uppercase font-bold block mb-2">Active Developments</span>
                    <div className="space-y-1.5">
                      {builder.properties.slice(0, 2).map((p: any) => (
                        <Link
                          key={p.id}
                          href={`/property/${p.slug}`}
                          className="block p-2 bg-slate-50 hover:bg-forest-50/50 rounded-lg text-xs font-semibold text-charcoal-800 transition-colors"
                        >
                          <span className="line-clamp-1">{p.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 border-t border-charcoal-100 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-forest-900">
                  Truth Score: <strong className="text-emerald-700">{builder.truthScore || 94}/100</strong>
                </span>
                <Link
                  href={`/properties?search=${encodeURIComponent(builder.name)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest-900 hover:underline"
                >
                  <span>Explore Projects</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
