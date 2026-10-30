import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdSenseBanner from '@/components/AdSenseBanner';
import { ArticleJsonLd } from '@/components/StructuredData';
import { Clock, Calendar, User, ChevronRight, Share2, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  // Increment view counter async
  prisma.article.update({
    where: { id: article.id },
    data: { viewsCount: { increment: 1 } },
  }).catch(() => {});

  const relatedArticles = await prisma.article.findMany({
    where: { id: { not: article.id } },
    take: 2,
    orderBy: { viewsCount: 'desc' },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <ArticleJsonLd article={article} />
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
              {new Date(article.publishedAt).toLocaleDateString('en-IN', {
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

          <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-gold-accent flex items-center justify-center font-bold">
                E
              </div>
              <div>
                <p className="font-bold text-forest-950">{article.authorName}</p>
                <span className="text-[10px] text-charcoal-400">EstateOS Regulatory Editorial Council</span>
              </div>
            </div>

            <div className="text-xs text-charcoal-400">
              {article.viewsCount} readers
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

          {article.tags && (
            <div className="mt-8 pt-6 border-t border-charcoal-100 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-charcoal-400 mr-2">Tags:</span>
              {article.tags.split(',').map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-charcoal-700 text-xs font-medium">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Lower AdSense Banner */}
        <AdSenseBanner slotId="article-in-article-banner-02" />

        {/* Related Guides */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="font-serif font-bold text-xl text-forest-950 mb-4">
              Related PropTech Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/guide/${rel.slug}`}
                  className="p-4 bg-white rounded-2xl border border-charcoal-200 hover:border-gold-accent transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase text-forest-700 bg-forest-50 px-2 py-0.5 rounded">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-charcoal-900 group-hover:text-forest-800 mt-2 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-charcoal-500 mt-1 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
