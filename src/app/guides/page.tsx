import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdSenseBanner from '@/components/AdSenseBanner';
import { BookOpen, Clock, ChevronRight, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category || 'All';

  const where: any = { isPublished: true };
  if (selectedCategory !== 'All') {
    where.category = selectedCategory;
  }

  const articles = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
  });

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
