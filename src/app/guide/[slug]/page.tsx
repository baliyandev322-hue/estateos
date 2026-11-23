import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdSenseBanner from '@/components/AdSenseBanner';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/StructuredData';
import { Clock, Calendar, ChevronRight, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import { CURATED_GUIDES, CURATED_GUIDES_MAP } from '@/lib/curatedGuides';

export const revalidate = 300;

export async function generateStaticParams() {
  return CURATED_GUIDES.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  let article: any = CURATED_GUIDES_MAP[slug];

  if (!article) {
    try {
      article = await prisma.article.findUnique({ where: { slug } });
    } catch (e) {}
  }

  const title = article ? `${article.title} | EstateOS Intelligence` : 'Real Estate Editorial Guide | EstateOS';
  const description = article?.excerpt || 'Authoritative insights on RERA statutory guidelines, property taxation, and real estate micro-market metrics.';
  const canonicalUrl = `https://www.estateospro.in/guide/${slug}`;
  const imgUrl = article?.coverImage || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80';

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [{ url: imgUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imgUrl],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let article: any = CURATED_GUIDES_MAP[slug] || null;
  let relatedArticles: any[] = [];

  if (!article) {
    try {
      article = await prisma.article.findUnique({
        where: { slug },
      });

      if (article) {
        prisma.article.update({
          where: { id: article.id },
          data: { viewsCount: { increment: 1 } },
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('Failed to fetch article from DB, checking curated registry:', err);
    }
  }

  // Populate related articles
  relatedArticles = CURATED_GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  // Fallback to first curated guide if not found
  if (!article) {
    article = CURATED_GUIDES[0];
  }

  const faqs = article.faqs || [];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Guides & Legal', url: '/guides' },
          { name: article.title, url: `/guide/${slug}` },
        ]}
      />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-500 mb-6">
          <Link href="/guides" className="hover:text-forest-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Guides</span>
          </Link>
          <span>/</span>
          <span className="text-forest-900 font-bold">{article.category}</span>
        </div>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-forest-50 text-forest-800 border border-forest-200">
              {article.category}
            </span>
            <span className="text-xs text-charcoal-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
            <span className="text-xs text-charcoal-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt || Date.now()).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-black text-forest-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal italic border-l-4 border-gold-accent pl-4">
            {article.excerpt}
          </p>

          <div className="mt-6 pt-4 border-t border-charcoal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-charcoal-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-gold-accent flex items-center justify-center font-bold">
                E
              </div>
              <div>
                <p className="font-bold text-forest-950">{article.authorName}</p>
                <span className="text-[10px] text-charcoal-400">{article.authorTitle || 'EstateOS Regulatory Editorial Council'}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Statutory Fact-Checked (RERA &amp; Revenue Code Compliant)</span>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="mt-6 aspect-[16/9] rounded-3xl overflow-hidden shadow-md border border-charcoal-200">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Top AdSense Banner in Educational Guide */}
        <AdSenseBanner slotId="article-in-article-banner-01" />

        {/* Content Body */}
        <div className="mt-8 bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-10 shadow-sm">
          <article className="prose prose-forest max-w-none text-charcoal-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </article>
        </div>

        {/* Fact-Checked AEO FAQs Section */}
        {faqs.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-charcoal-100">
              <HelpCircle className="w-5 h-5 text-forest-900" />
              <h2 className="font-serif font-bold text-lg sm:text-xl text-forest-950">
                Frequently Asked Regulatory &amp; Valuation Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-charcoal-200/70">
                  <h3 className="font-bold text-sm text-forest-950 mb-1.5 flex items-start gap-2">
                    <span className="text-gold-accent font-black">Q{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lower AdSense Banner */}
        <AdSenseBanner slotId="article-in-article-banner-02" />

        {/* Related Guides */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="font-serif font-bold text-xl text-forest-950 mb-4">
              Authoritative Real Estate &amp; Legal Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/guide/${rel.slug}`}
                  className="p-4 bg-white rounded-2xl border border-charcoal-200 hover:border-gold-accent transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-forest-700 bg-forest-50 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-sm text-charcoal-900 group-hover:text-forest-800 mt-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-charcoal-500 mt-1 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-charcoal-100 text-[11px] font-bold text-forest-900 flex items-center justify-between">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
