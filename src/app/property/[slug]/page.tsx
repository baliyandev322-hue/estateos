import React from 'react';
import prisma from '@/lib/prisma';
import PropertyDetailClient from './PropertyDetailClient';
import { CURATED_PROPERTIES } from '@/lib/curatedProperties';

export const dynamic = 'force-dynamic';

const CURATED_PROPERTY_REGISTRY: Record<string, any> = CURATED_PROPERTIES.reduce((acc, p) => {
  acc[p.slug] = p;
  acc[p.id] = p;
  return acc;
}, {} as Record<string, any>);

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
    <PropertyDetailClient
      property={property}
      similarProperties={similarProperties}
    />
  );
}
