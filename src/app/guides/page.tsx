import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdSenseBanner from '@/components/AdSenseBanner';
import { BookOpen, Clock, ChevronRight, User } from 'lucide-react';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Real Estate Guides, RERA Legal Awareness & Property Tax Insights | EstateOS',
  description: 'Authoritative Indian real estate guides: How to verify RERA online, understand carpet area vs super built-up area, maximize home loan tax exemptions (80C & 24b), and analyze micro-market ROI.',
  keywords: 'rera verification guide, home loan tax deduction 80c 24b, carpet area formula, real estate legal advice india, property investment guide',
  alternates: {
    canonical: 'https://www.estateospro.in/guides',
  },
  openGraph: {
    title: 'Real Estate Guides & RERA Legal Awareness | EstateOS',
    description: 'Expert editorial articles on RERA legal awareness, home loan tax deductions, and capital growth corridors.',
    url: 'https://www.estateospro.in/guides',
    type: 'website',
  },
};

const FALLBACK_ARTICLES = [
  {
    id: 'art-1',
    title: 'How to Check RERA Registered Properties Online in India: Official 2026 Guide',
    slug: 'how-to-check-rera-registered-properties-online-india-2026',
    excerpt: 'Avoid unapproved builders and project delays by understanding the state-wise RERA verification process, carpet area formulas, and title verification rules.',
    category: 'RERA & Legal',
    authorName: 'Adv. Meenakshi Sundaram (Real Estate Regulatory Council)',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
  },
  {
    id: 'art-2',
    title: 'Carpet Area vs Super Built-Up Area: Statutory RERA Calculation & Loading Guide',
    slug: 'carpet-area-vs-super-built-up-area-rera-calculation-guide',
    excerpt: 'Understand how developers historically inflated square footage by 35% with loading and how Section 2(k) of RERA protects buyers today.',
    category: 'RERA & Legal',
    authorName: 'Adv. Ritu Khosla (Property Law Specialist)',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
  },
  {
    id: 'art-3',
    title: 'Mohali vs New Chandigarh: Real Estate Capital Appreciation & ROI Analysis',
    slug: 'mohali-vs-new-chandigarh-real-estate-roi-analysis',
    excerpt: 'A comprehensive empirical comparison of rental yields, connectivity, upcoming IT corridors, and 5-year capital appreciation trends in the Tri-city area.',
    category: 'Investment',
    authorName: 'EstateOS Intelligence Desk',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 6,
  },
  {
    id: 'art-4',
    title: 'Home Loan Tax Deductions: Maximizing Sections 80C, 24(b) & 80EEA in 2026',
    slug: 'home-loan-tax-deductions-section-80c-24b-80eea-guide',
    excerpt: 'Learn how salaried professionals can save up to ₹3.5 Lakh annually in income tax through smart home loan structuring and joint ownership benefits.',
    category: 'Home Loans',
    authorName: 'CA Rajesh Aggarwal (Senior Tax Strategist)',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 8,
  },
  {
    id: 'art-5',
    title: 'Dwarka Expressway & Golf Course Ext: Gurugram 2026-2030 Investment Masterplan',
    slug: 'dwarka-expressway-golf-course-extension-gurugram-investment-guide',
    excerpt: 'Deep-dive analysis into real estate yields, infrastructure milestones, metro expansion, and price trajectories across Sectors 102 to 113 in Gurugram.',
    category: 'Investment',
    authorName: 'Vikramjit Singh (Senior NCR Market Analyst)',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 9,
  },
  {
    id: 'art-6',
    title: 'Step-by-Step Guide: How to Get Instant Home Loan Pre-Sanction at Lowest Rates',
    slug: 'step-by-step-home-loan-pre-sanction-process-india',
    excerpt: 'Everything you need to know about CIBIL bureau scores, Fixed Obligation to Income Ratio (FOIR), and digital banking pre-approval workflows.',
    category: 'Home Loans',
    authorName: 'Pooja Narang (Banking & Mortgage Consultant)',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
  },
  {
    id: 'art-7',
    title: 'Stamp Duty & Property Registration Charges Across Indian States: 2026 Ready Reckoner',
    slug: 'stamp-duty-registration-charges-across-indian-states-2026',
    excerpt: 'Complete comparative breakdown of state-wise conveyance stamp duties, female concessions, sub-registrar fees, and circle rates for 2026.',
    category: 'Buying Guides',
    authorName: 'EstateOS Regulatory & Tax Cell',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 8,
  },
];

export default async function GuidesPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const params = searchParams || {};
  const selectedCategory = params.category || 'All';

  let articles: any[] = [];
  try {
    const where: any = { isPublished: true };
    if (selectedCategory !== 'All') {
      where.category = selectedCategory;
    }

    articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });
  } catch (err) {
    console.warn('Database offline or article fetch failed, serving fallback articles:', err);
  }

  // If database returned no articles or errored, use high-value curated fallback articles
  if (!articles || articles.length === 0) {
    articles = selectedCategory === 'All'
      ? FALLBACK_ARTICLES
      : FALLBACK_ARTICLES.filter((a) => a.category === selectedCategory);
    if (articles.length === 0) articles = FALLBACK_ARTICLES;
  }

  const categories = ['All', 'RERA & Legal', 'Investment', 'Home Loans', 'Buying Guides', 'City Guides'];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Educational Knowledge Base</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-forest-950 tracking-tight">
            Real Estate Guides &amp; Regulatory Insights
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Expert editorial articles on RERA legal awareness, home loan tax deductions, and capital growth corridors.
          </p>

          {/* Category Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/guides' : `/guides?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-forest-600'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="card-luxury rounded-2xl overflow-hidden flex flex-col bg-white border border-charcoal-200/80 justify-between"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-charcoal-100">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-forest-50 text-forest-700 border border-forest-200">
                      {art.category}
                    </span>
                    <span className="text-charcoal-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <Link href={`/guide/${art.slug}`}>
                    <h3 className="font-bold text-base text-forest-950 hover:text-forest-700 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-charcoal-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-charcoal-100 bg-slate-50/50 flex items-center justify-between text-xs">
                <span className="text-charcoal-500 font-medium truncate max-w-[170px]">
                  By {art.authorName}
                </span>
                <Link
                  href={`/guide/${art.slug}`}
                  className="font-bold text-forest-900 hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* AdSense Placement */}
        <AdSenseBanner slotId="guides-list-bottom-banner" />
      </div>
    </div>
  );
}
