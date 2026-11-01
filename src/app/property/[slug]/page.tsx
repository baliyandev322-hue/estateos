import React from 'react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import PropertyDetailClient from './PropertyDetailClient';
import { CURATED_PROPERTIES } from '@/lib/curatedProperties';
import { PropertyJsonLd, BreadcrumbJsonLd } from '@/components/StructuredData';

export const revalidate = 120;

export async function generateStaticParams() {
  return CURATED_PROPERTIES.map((p) => ({
    slug: p.slug,
  }));
}

const CURATED_PROPERTY_REGISTRY: Record<string, any> = CURATED_PROPERTIES.reduce((acc, p) => {
  acc[p.slug] = p;
  acc[p.id] = p;
  return acc;
}, {} as Record<string, any>);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  let property = CURATED_PROPERTY_REGISTRY[slug];
  if (!property) {
    try {
      property = await prisma.property.findFirst({
        where: { OR: [{ slug }, { id: slug }] },
      });
    } catch (e) {}
  }

  if (!property) {
    return {
      title: 'Verified Property Showcase | EstateOS PropTech Intelligence',
      description: 'Explore RERA-audited properties across India on EstateOS with verified Property Truth Scores™.',
    };
  }

  const priceInLakh = property.price >= 10000000 
    ? `₹${(property.price / 10000000).toFixed(2)} Cr` 
    : `₹${(property.price / 100000).toFixed(1)} Lakh`;

  const title = `${property.title} in ${property.localityName || property.city} (${priceInLakh}) | EstateOS`;
  const description = `${property.bedrooms ? property.bedrooms + ' BHK ' : ''}${property.propertyType || 'Residential Unit'} in ${property.localityName ? property.localityName + ', ' : ''}${property.city}. Carpet Area: ${property.carpetAreaSqFt} sq.ft. Property Truth Score™: ${property.truthScore || 90}/100. RERA Reg: ${property.reraRegistrationNumber || 'Audited'}.`;
  const canonicalUrl = `https://www.estateospro.in/property/${slug}`;

  let imgUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  if (Array.isArray(property.images) && property.images.length > 0) {
    imgUrl = property.images[0];
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [{ url: imgUrl, width: 1200, height: 630, alt: property.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imgUrl],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let property: any = null;
  let similarProperties: any[] = [];

  try {
    property = await prisma.property.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        organization: true,
        user: true,
        verificationAudits: {
          orderBy: { lastAuditDate: 'desc' },
          take: 1,
        },
      },
    });

    if (property) {
      similarProperties = await prisma.property.findMany({
        where: {
          id: { not: property.id },
          city: property.city,
        },
        take: 3,
        include: {
          organization: true,
          user: true,
        },
      });
    }
  } catch (err) {
    console.warn('Failed to load property details from DB, checking curated registry:', err);
  }

  // If not found in DB or DB connection had a blip, check our curated registry
  if (!property && CURATED_PROPERTY_REGISTRY[slug]) {
    property = CURATED_PROPERTY_REGISTRY[slug];
    similarProperties = CURATED_PROPERTIES.filter((p) => p.slug !== slug && p.id !== slug).slice(0, 3);
  }

  // If still not found, fallback to first curated property instead of dead 404
  if (!property) {
    property = CURATED_PROPERTIES[0];
    similarProperties = CURATED_PROPERTIES.slice(1, 4);
  }

  return (
    <>
      <PropertyJsonLd property={property} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Properties', url: '/properties' },
          { name: property.city || 'India', url: `/properties?city=${encodeURIComponent(property.city || '')}` },
          { name: property.title, url: `/property/${property.slug}` },
        ]}
      />
      <PropertyDetailClient
        property={property}
        similarProperties={similarProperties}
      />
    </>
  );
}
