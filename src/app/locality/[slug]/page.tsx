import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PropertyCard from '@/components/PropertyCard';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/StructuredData';
import {
  MapPin,
  TrendingUp,
  Percent,
  ShieldCheck,
  Building,
  School,
  Hospital,
  ShoppingBag,
  Train,
  Plane,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const revalidate = 300;

const FALLBACK_LOCALITIES_MAP: Record<string, any> = {
  'sector-82-it-city-mohali': {
    id: 'loc-1',
    slug: 'sector-82-it-city-mohali',
    name: 'Sector 82 IT City',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '140306',
    overview: 'High-growth institutional & technology corridor adjoining international airport highway.',
    avgPricePerSqFt: 5450,
    rentalYieldPercent: 4.8,
    priceTrend1Yr: 12.4,
    priceTrend3Yr: 36.2,
    safetyRating: 4.6,
    connectivityRating: 4.8,
    greenCoverRating: 4.4,
    metroDistanceKm: 4.2,
    airportDistanceKm: 9.5,
    schoolsCount: 14,
    hospitalsCount: 6,
    mallsCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  'golf-course-extension-gurugram': {
    id: 'loc-2',
    slug: 'golf-course-extension-gurugram',
    name: 'Golf Course Extension',
    city: 'Gurugram',
    state: 'Haryana',
    pinCode: '122018',
    overview: 'Ultra-prime luxury residential corridor with championship golf views and Fortune 500 commercial headquarters.',
    avgPricePerSqFt: 18500,
    rentalYieldPercent: 4.2,
    priceTrend1Yr: 14.8,
    priceTrend3Yr: 48.6,
    safetyRating: 4.8,
    connectivityRating: 4.9,
    greenCoverRating: 4.2,
    metroDistanceKm: 2.1,
    airportDistanceKm: 18.0,
    schoolsCount: 22,
    hospitalsCount: 8,
    mallsCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  'new-chandigarh-mullanpur': {
    id: 'loc-3',
    slug: 'new-chandigarh-mullanpur',
    name: 'New Chandigarh (Mullanpur)',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '140901',
    overview: 'Master-planned eco-city with wide green belts, MediCity healthcare hub, and upcoming metro connectivity.',
    avgPricePerSqFt: 6200,
    rentalYieldPercent: 4.1,
    priceTrend1Yr: 15.2,
    priceTrend3Yr: 42.0,
    safetyRating: 4.7,
    connectivityRating: 4.5,
    greenCoverRating: 4.9,
    metroDistanceKm: 6.0,
    airportDistanceKm: 22.0,
    schoolsCount: 10,
    hospitalsCount: 4,
    mallsCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  },
  'indiranagar-bangalore': {
    id: 'loc-4',
    slug: 'indiranagar-bangalore',
    name: 'Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pinCode: '560038',
    overview: 'Cosmopolitan high-street residential haven favored by tech founders, venture capitalists, and global expatriates.',
    avgPricePerSqFt: 16800,
    rentalYieldPercent: 4.5,
    priceTrend1Yr: 10.8,
    priceTrend3Yr: 32.5,
    safetyRating: 4.9,
    connectivityRating: 4.9,
    greenCoverRating: 4.3,
    metroDistanceKm: 0.8,
    airportDistanceKm: 38.0,
    schoolsCount: 18,
    hospitalsCount: 12,
    mallsCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
};

export async function generateStaticParams() {
  return Object.keys(FALLBACK_LOCALITIES_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  let loc = FALLBACK_LOCALITIES_MAP[slug];
  if (!loc) {
    try {
      loc = await prisma.locality.findUnique({ where: { slug } });
    } catch (e) {}
  }

  const name = loc?.name || 'Micro-Market';
  const city = loc?.city || 'India';
  const rate = loc?.avgPricePerSqFt ? `₹${loc.avgPricePerSqFt.toLocaleString('en-IN')}/sq.ft` : 'Rates';

  const title = `${name}, ${city} Real Estate Rates (${rate}) & Price Trends 2026 | EstateOS`;
  const description = `Live property price trends, 1-yr appreciation (+${loc?.priceTrend1Yr || 12}%), rental yields (${loc?.rentalYieldPercent || 4.5}%), and verified RERA residential inventory in ${name}, ${city}.`;
  const canonicalUrl = `https://www.estateospro.in/locality/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [{ url: loc?.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LocalityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let locality = FALLBACK_LOCALITIES_MAP[slug];
  if (!locality) {
    try {
      locality = await prisma.locality.findUnique({ where: { slug } });
    } catch (e) {}
  }

  if (!locality) {
    notFound();
  }

  let properties: any[] = [];
  try {
    properties = await prisma.property.findMany({
      where: {
        OR: [
          { localityName: { contains: locality.name, mode: 'insensitive' } },
          { city: locality.city },
        ],
      },
      take: 4,
    });
  } catch (e) {}

  const faqs = [
    {
      question: `What is the average real estate price per sq.ft in ${locality.name}, ${locality.city}?`,
      answer: `The average property price in ${locality.name} currently stands at approximately ₹${locality.avgPricePerSqFt.toLocaleString('en-IN')} per sq.ft with an annual capital appreciation of +${locality.priceTrend1Yr}%.`,
    },
    {
      question: `What is the typical rental yield in ${locality.name}?`,
      answer: `Gross rental yields in ${locality.name} average around ${locality.rentalYieldPercent}%, outperforming standard national metro averages.`,
    },
    {
      question: `Is ${locality.name} safe and well-connected?`,
      answer: `${locality.name} boasts an infrastructure safety rating of ${locality.safetyRating}/5.0 and connectivity rating of ${locality.connectivityRating}/5.0, with proximity to metro lines (${locality.metroDistanceKm} km) and international airports (${locality.airportDistanceKm} km).`,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Localities', url: '/localities' },
          { name: `${locality.name}, ${locality.city}`, url: `/locality/${slug}` },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-500 mb-6">
          <Link href="/localities" className="hover:text-forest-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Localities</span>
          </Link>
          <span>/</span>
          <span className="text-forest-900 font-bold">{locality.city}</span>
          <span>/</span>
          <span className="text-charcoal-800">{locality.name}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-forest-950 text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url('${locality.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-accent border border-gold-400/30 text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>PIN: {locality.pinCode} • {locality.state}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight mb-3">
              {locality.name}, {locality.city}
            </h1>
            <p className="text-forest-100 text-sm sm:text-base leading-relaxed mb-6">
              {locality.overview}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/properties?city=${encodeURIComponent(locality.city)}`}
                className="px-6 py-3 rounded-xl bg-gold-accent text-forest-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <span>View Properties in {locality.city}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Micro-Market Data Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-5 bg-white rounded-2xl border border-charcoal-200 shadow-sm">
            <div className="text-xs text-charcoal-400 font-bold uppercase tracking-wider mb-1">Avg Price / Sq.Ft</div>
            <div className="text-2xl font-black font-serif text-forest-900">
              ₹{locality.avgPricePerSqFt.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+{locality.priceTrend1Yr}% 1-Yr Trend</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-charcoal-200 shadow-sm">
            <div className="text-xs text-charcoal-400 font-bold uppercase tracking-wider mb-1">Rental Yield</div>
            <div className="text-2xl font-black font-serif text-forest-900">
              {locality.rentalYieldPercent}%
            </div>
            <div className="text-[11px] text-charcoal-500 mt-1">
              High Tenant Occupancy
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-charcoal-200 shadow-sm">
            <div className="text-xs text-charcoal-400 font-bold uppercase tracking-wider mb-1">3-Yr Capital Growth</div>
            <div className="text-2xl font-black font-serif text-forest-900">
              +{locality.priceTrend3Yr}%
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              High Growth Tier
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-charcoal-200 shadow-sm">
            <div className="text-xs text-charcoal-400 font-bold uppercase tracking-wider mb-1">Safety & Liveability</div>
            <div className="text-2xl font-black font-serif text-forest-900">
              {locality.safetyRating} / 5.0
            </div>
            <div className="text-[11px] text-forest-700 font-bold mt-1">
              Audited Micro-Market
            </div>
          </div>
        </div>

        {/* Infrastructure & Amenities */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 mb-10 shadow-sm">
          <h2 className="font-serif text-xl sm:text-2xl font-black text-forest-950 mb-6">
            Civic Infrastructure &amp; Proximity
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100">
              <Train className="w-6 h-6 text-forest-800 mx-auto mb-2" />
              <div className="text-lg font-bold text-forest-950">{locality.metroDistanceKm} km</div>
              <div className="text-xs text-charcoal-500">Metro Station</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100">
              <Plane className="w-6 h-6 text-forest-800 mx-auto mb-2" />
              <div className="text-lg font-bold text-forest-950">{locality.airportDistanceKm} km</div>
              <div className="text-xs text-charcoal-500">Airport</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100">
              <School className="w-6 h-6 text-forest-800 mx-auto mb-2" />
              <div className="text-lg font-bold text-forest-950">{locality.schoolsCount}+</div>
              <div className="text-xs text-charcoal-500">Schools</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100">
              <Hospital className="w-6 h-6 text-forest-800 mx-auto mb-2" />
              <div className="text-lg font-bold text-forest-950">{locality.hospitalsCount}+</div>
              <div className="text-xs text-charcoal-500">Hospitals</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100">
              <ShoppingBag className="w-6 h-6 text-forest-800 mx-auto mb-2" />
              <div className="text-lg font-bold text-forest-950">{locality.mallsCount}+</div>
              <div className="text-xs text-charcoal-500">Malls &amp; Retail</div>
            </div>
          </div>
        </div>

        {/* Locality FAQs */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif text-xl sm:text-2xl font-black text-forest-950 mb-6">
            Frequently Asked Questions about {locality.name}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-charcoal-100">
                <h3 className="font-bold text-sm text-forest-950 mb-1">{faq.question}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
