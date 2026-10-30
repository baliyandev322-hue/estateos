import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PropertyDetailClient from './PropertyDetailClient';

export const dynamic = 'force-dynamic';

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
    console.warn('Failed to load property details from DB:', err);
  }

  if (!property) {
    notFound();
  }

  return (
    <PropertyDetailClient
      property={property as any}
      similarProperties={similarProperties as any}
    />
  );
}
