import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { CURATED_PROPERTIES } from '@/lib/curatedProperties';
import BuyerDashboardClient from './BuyerDashboardClient';

export const dynamic = 'force-dynamic';

export default async function BuyerDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  let savedItems: any[] = [];
  let appointments: any[] = [];
  let recommended: any[] = [];

  try {
    const res = await Promise.all([
      prisma.savedProperty.findMany({
        where: { userId: user.id },
        include: {
          property: {
            include: { organization: true },
          },
        },
      }),
      prisma.appointment.findMany({
        where: { userId: user.id },
        include: { property: true },
        orderBy: { scheduledDate: 'asc' },
      }),
      prisma.property.findMany({
        take: 3,
        where: { isFeatured: true },
        include: { organization: true },
      }),
    ]);

    savedItems = res[0] || [];
    appointments = res[1] || [];
    recommended = res[2] || [];
  } catch (err) {
    console.warn('Fallback mode in BuyerDashboardPage:', err);
  }

  if (recommended.length === 0) {
    recommended = CURATED_PROPERTIES.slice(0, 3);
  }

  return (
    <BuyerDashboardClient
      user={user}
      serverSaved={savedItems}
      appointments={appointments}
      recommended={recommended}
    />
  );
}
