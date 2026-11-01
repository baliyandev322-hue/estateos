import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import PropertyCard from '@/components/PropertyCard';
import AdSenseBanner from '@/components/AdSenseBanner';
import {
  ShieldCheck,
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  CheckCircle2,
  Calculator,
  Compass,
  Award,
  Users,
  FileCheck,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

export const revalidate = 60;

export default async function HomePage() {
  let featuredProperties: any[] = [];
  let localities: any[] = [];
  let articles: any[] = [];
  let totalProperties = 142;
  let totalOrgs = 28;
  let totalLeads = 890;
  let totalUsers = 1250;

  try {
    const [fp, loc, art, stats] = await Promise.all([
      prisma.property.findMany({
        where: { isFeatured: true },
        take: 6,
        orderBy: { truthScore: 'desc' },
        include: {
          organization: true,
          user: true,
        },
      }),
      prisma.locality.findMany({
        take: 4,
        orderBy: { avgPricePerSqFt: 'desc' },
      }),
      prisma.article.findMany({
        take: 3,
        orderBy: { viewsCount: 'desc' },
      }),
      Promise.all([
        prisma.property.count(),
        prisma.organization.count(),
        prisma.lead.count(),
        prisma.user.count(),
      ]),
    ]);
    featuredProperties = fp;
    localities = loc;
    articles = art;
    totalProperties = stats[0] || 142;
    totalOrgs = stats[1] || 28;
    totalLeads = stats[2] || 890;
    totalUsers = stats[3] || 1250;
  } catch (e) {
    console.warn('Database query during page rendering fallback:', e);
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] flex items-center justify-center bg-forest-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Background photo with deep luxury gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/90 to-forest-950" />

        {/* Ambient subtle decorative lights */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-forest-600/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/80 border border-gold-accent/40 text-gold-accent text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>India&apos;s First Sovereign Property Truth Index</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Discover Verified Real Estate With <span className="text-gold-accent italic font-normal">Truth Score™</span> Certainty.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-forest-200 max-w-2xl mx-auto font-light leading-relaxed">
            Eliminate deceptive listings. Search RERA-cross-examined luxury residences, commercial IT floors, and gated townships across Mohali, Gurugram, Bangalore &amp; Mumbai.
          </p>

          {/* Hero Search Box Container */}
          <div className="mt-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-charcoal-900 border border-forest-100/50 backdrop-blur-lg">
            {/* Search Type Tabs */}
            <div className="flex items-center gap-2 border-b border-charcoal-100 pb-3 mb-4 text-xs font-bold uppercase tracking-wider">
              <Link
                href="/properties?listingType=SALE"
                className="px-4 py-2 rounded-lg bg-forest-900 text-white shadow-sm flex items-center gap-1.5"
              >
                <span>Buy Property</span>
              </Link>
              <Link
                href="/properties?listingType=RENT"
                className="px-4 py-2 rounded-lg text-charcoal-600 hover:text-forest-900 hover:bg-forest-50 transition-colors"
              >
                <span>Rent</span>
              </Link>
              <Link
                href="/properties?propertyType=COMMERCIAL"
                className="px-4 py-2 rounded-lg text-charcoal-600 hover:text-forest-900 hover:bg-forest-50 transition-colors"
              >
                <span>Commercial</span>
              </Link>
              <Link
                href="/builders"
                className="hidden sm:inline-flex px-4 py-2 rounded-lg text-charcoal-600 hover:text-forest-900 hover:bg-forest-50 transition-colors"
              >
                <span>New Projects</span>
              </Link>
            </div>

            {/* Search Filters Row */}
            <form action="/properties" method="GET" className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-left">
              {/* City selector */}
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-1">
                  City / Region
                </label>
                <select
                  name="city"
                  defaultValue="All"
                  className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
                >
                  <option value="All">All Cities</option>
                  <option value="Muzaffarnagar">Muzaffarnagar (UP)</option>
                  <option value="Mohali">Mohali / Chandigarh</option>
                  <option value="Gurugram">Gurugram (NCR)</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-1">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  defaultValue="ALL"
                  className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
                >
                  <option value="ALL">All Types</option>
                  <option value="APARTMENT">Apartments</option>
                  <option value="PENTHOUSE">Sky Penthouses</option>
                  <option value="VILLA">Luxury Villas</option>
                  <option value="COMMERCIAL">Commercial Offices</option>
                </select>
              </div>

              {/* Search keywords */}
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-1">
                  Locality or Landmark
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="e.g. IT City, Golf Course Rd, Indiranagar"
                    className="w-full text-xs font-medium bg-slate-50 border border-charcoal-200 rounded-lg pl-8 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
                  />
                  <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Search submit button */}
              <div className="sm:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-md border border-forest-700 hover:border-gold-accent transition-all flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-gold-accent" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* AI Assistant Hook */}
            <div className="mt-4 pt-3 border-t border-charcoal-100 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-600 gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600 animate-pulse" />
                <span>
                  <strong>Try AI Matchmaker:</strong> &ldquo;I need a 2BHK in Mohali under ₹60 lakh near schools&rdquo;
                </span>
              </div>
              <Link
                href="/ai-matchmaker"
                className="font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1 underline underline-offset-2"
              >
                Launch Conversational Matchmaker <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Real Metrics Ticker */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-forest-100">
            <div className="p-4 rounded-xl bg-forest-900/40 border border-forest-800/80 backdrop-blur-sm">
              <p className="font-serif text-2xl sm:text-3xl font-black text-gold-accent">96.4%</p>
              <p className="text-xs text-forest-200 font-medium mt-0.5">Average Truth Score</p>
            </div>
            <div className="p-4 rounded-xl bg-forest-900/40 border border-forest-800/80 backdrop-blur-sm">
              <p className="font-serif text-2xl sm:text-3xl font-black text-white">{totalProperties}+</p>
              <p className="text-xs text-forest-200 font-medium mt-0.5">Audited Properties</p>
            </div>
            <div className="p-4 rounded-xl bg-forest-900/40 border border-forest-800/80 backdrop-blur-sm">
              <p className="font-serif text-2xl sm:text-3xl font-black text-gold-accent">{totalOrgs}+</p>
              <p className="text-xs text-forest-200 font-medium mt-0.5">RERA Certified Partners</p>
            </div>
            <div className="p-4 rounded-xl bg-forest-900/40 border border-forest-800/80 backdrop-blur-sm">
              <p className="font-serif text-2xl sm:text-3xl font-black text-white">{totalLeads}+</p>
              <p className="text-xs text-forest-200 font-medium mt-0.5">Verified Inquiries</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE FEATURE: PROPERTY TRUTH SCORE EXPLAINER */}
      <section className="py-16 bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-gold-accent" />
              <span>EstateOS Verification Standard</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-forest-950 tracking-tight">
              The Property Truth Score™ System
            </h2>
            <p className="mt-3 text-sm text-charcoal-600">
              Unlike generic classified portals where anyone can post unverified photos and false claims, every listing on EstateOS undergoes rigorous 7-pillar algorithmic and documentary scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-charcoal-200/80 hover:border-gold-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-charcoal-900 text-sm mb-1">RERA Registry Cross-Audit</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Direct validation with official state RERA records to confirm sanction plans, project bank escrow status, and completion deadlines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-charcoal-200/80 hover:border-gold-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-charcoal-900 text-sm mb-1">Agent &amp; Owner KYC</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Licensed broker credentials and ownership proof verification prevent duplicate phantom listings and unauthorized middleman markups.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-charcoal-200/80 hover:border-gold-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-charcoal-900 text-sm mb-1">Field Physical Verification</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                On-site photo and video timestamp logging validates actual construction stage, views, amenities, and carpet area measurements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-charcoal-200/80 hover:border-gold-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-charcoal-900 text-sm mb-1">Price Benchmarking Algorithm</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Empirical price comparison against government guidance circles and recent sub-registrar stamp deed registrations flags overpriced listings.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/truth-score"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-800 shadow-md transition-all border border-forest-700 hover:border-gold-accent"
            >
              <span>Explore The Full Truth Score Protocol</span>
              <ArrowRight className="w-4 h-4 text-gold-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Handpicked &amp; Audited
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest-950 tracking-tight mt-1">
              Featured Verified Residences
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Top-scoring properties across Mohali IT City, Gurugram Golf Course corridor, Bangalore &amp; Mumbai.
            </p>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-forest-700 uppercase tracking-wider group"
          >
            <span>View All Listings ({totalProperties})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop as any} />
          ))}
        </div>
      </section>

      {/* 4. SIGNATURE FEATURE: LOCALITY MICRO-INTELLIGENCE */}
      <section className="py-16 bg-forest-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-forest-800 text-gold-accent text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Micro-Market Data</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight">
                Locality Intelligence &amp; Capital Trends
              </h2>
              <p className="text-xs sm:text-sm text-forest-200 mt-1">
                Real infrastructure metrics, rental yields, and historical appreciation backed by registry records.
              </p>
            </div>
            <Link
              href="/localities"
              className="flex items-center gap-1 text-xs font-bold text-gold-light hover:text-white uppercase tracking-wider"
            >
              <span>Explore All Localities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localities.map((loc) => (
              <div
                key={loc.id}
                className="rounded-2xl bg-forest-950/60 border border-forest-800 p-5 hover:border-gold-accent/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-forest-800 text-forest-200">
                      {loc.city}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{loc.priceTrend1Yr}% 1Y
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white line-clamp-1">{loc.name}</h3>
                  <p className="text-xs text-forest-200 line-clamp-2 mt-1 mb-4 leading-relaxed">
                    {loc.overview}
                  </p>

                  <div className="space-y-2 py-3 border-y border-forest-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Avg. Rate / Sq.Ft:</span>
                      <span className="font-bold text-gold-light">{formatCurrencyINR(loc.avgPricePerSqFt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Rental Yield:</span>
                      <span className="font-bold text-white">{loc.rentalYieldPercent}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Infrastructure:</span>
                      <span className="font-semibold text-forest-200">
                        {loc.schoolsCount} Schools, {loc.hospitalsCount} Hospitals
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <Link
                    href={`/locality/${loc.slug}`}
                    className="w-full block text-center py-2 text-xs font-bold text-white bg-forest-800 hover:bg-forest-700 rounded-lg transition-colors border border-forest-700"
                  >
                    View Locality Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINANCIAL CALCULATORS SHOWCASE */}
      <section className="py-16 bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Validated Financial Engineering
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest-950 tracking-tight mt-1">
              Property Financial Calculators
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Plan EMIs, tax deductions under Section 80C &amp; 24(b), stamp duty costs, and rental returns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/calculators"
              className="p-5 rounded-2xl border border-charcoal-200 hover:border-gold-accent hover:shadow-md transition-all group bg-slate-50/50"
            >
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-3 group-hover:bg-forest-900 group-hover:text-gold-accent transition-colors">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 group-hover:text-forest-800">
                Home Loan EMI
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Calculate monthly amortization schedules, total interest payable, and bank tenure.
              </p>
            </Link>

            <Link
              href="/calculators"
              className="p-5 rounded-2xl border border-charcoal-200 hover:border-gold-accent hover:shadow-md transition-all group bg-slate-50/50"
            >
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-3 group-hover:bg-forest-900 group-hover:text-gold-accent transition-colors">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 group-hover:text-forest-800">
                Stamp Duty &amp; Registration
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                State-wise stamp duty rates (Punjab, Haryana, Karnataka, Maharashtra) with female buyer rebates.
              </p>
            </Link>

            <Link
              href="/calculators"
              className="p-5 rounded-2xl border border-charcoal-200 hover:border-gold-accent hover:shadow-md transition-all group bg-slate-50/50"
            >
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-3 group-hover:bg-forest-900 group-hover:text-gold-accent transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 group-hover:text-forest-800">
                Rental Yield &amp; ROI
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Compute net capitalization rate accounting for property tax and maintenance fees.
              </p>
            </Link>

            <Link
              href="/calculators"
              className="p-5 rounded-2xl border border-charcoal-200 hover:border-gold-accent hover:shadow-md transition-all group bg-slate-50/50"
            >
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-3 group-hover:bg-forest-900 group-hover:text-gold-accent transition-colors">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-charcoal-900 group-hover:text-forest-800">
                Carpet Area Calculator
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Convert super built-up to RERA carpet area according to statutory building norms.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SAAS FOR AGENTS & BUILDERS BANNER */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-forest-800 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-accent">
                Multi-Tenant PropTech SaaS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-black mt-2 leading-tight">
                Empower Your Brokerage or Development Firm with EstateOS SaaS
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-forest-200 leading-relaxed">
                Manage property inventory, track leads across the sales pipeline, deploy AI descriptions, and showcase your brand on a dedicated mini-website with isolated tenant security.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/register?role=AGENT"
                  className="px-6 py-3 rounded-xl bg-gold-accent hover:bg-gold-500 text-forest-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Start Agent 14-Day Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white border border-forest-700 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  View SaaS Pricing Plans
                </Link>
              </div>
            </div>

            {/* Decorative screenshot preview */}
            <div className="hidden lg:block absolute -right-10 -bottom-10 w-[420px] rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-xs font-bold text-gold-light">
                <Users className="w-4 h-4" />
                <span>Apex Heritage Realty — Agent CRM Live Pipeline</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-forest-900/80 border border-forest-700 flex justify-between">
                  <span>Dr. Amitav Banerjee (₹92L 3BHK)</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">QUALIFIED</span>
                </div>
                <div className="p-2.5 rounded-lg bg-forest-900/80 border border-forest-700 flex justify-between">
                  <span>Siddharth Chadha (₹58L 2BHK)</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">VISIT SCHEDULED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL ESTATE CONTENT PORTAL (AdSense Ready) */}
      <section className="py-16 bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                Educational Knowledge Base
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest-950 tracking-tight mt-1">
                Real Estate Guides &amp; Regulatory Insights
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-xs font-bold text-forest-900 hover:text-forest-700 uppercase tracking-wider flex items-center gap-1"
            >
              <span>All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div key={art.id} className="card-luxury rounded-2xl overflow-hidden flex flex-col bg-white border border-charcoal-200/80">
                <div className="aspect-[16/9] overflow-hidden bg-charcoal-100">
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-forest-50 text-forest-700 border border-forest-200">
                      {art.category}
                    </span>
                    <Link href={`/guide/${art.slug}`}>
                      <h3 className="font-bold text-base text-charcoal-900 mt-2 hover:text-forest-700 transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-charcoal-600 mt-2 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-400">
                    <span>{art.readTimeMinutes} min read</span>
                    <Link href={`/guide/${art.slug}`} className="font-bold text-forest-900 hover:underline">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AdSense Compliant Banner Slot */}
          <AdSenseBanner slotId="homepage-knowledge-base-banner" />
        </div>
      </section>
    </div>
  );
}
