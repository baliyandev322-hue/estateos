import React from 'react';
import prisma from '@/lib/prisma';
import LocalitiesClient from './LocalitiesClient';

export const dynamic = 'force-dynamic';

export default async function LocalitiesPage() {
  const localities = await prisma.locality.findMany({
    orderBy: { avgPricePerSqFt: 'desc' },
  });

  return <LocalitiesClient localities={localities as any} />;
}
