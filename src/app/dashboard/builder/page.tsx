import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import BuilderDashboardClient from './BuilderDashboardClient';

export const dynamic = 'force-dynamic';

export default async function BuilderDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const org = user.orgId
    ? await prisma.organization.findUnique({
        where: { id: user.orgId },
        include: {
          subscriptions: {
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      })
    : null;

  const properties = await prisma.property.findMany({
    where: user.orgId ? { orgId: user.orgId } : { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  const leads = await prisma.lead.findMany({
    where: user.orgId ? { orgId: user.orgId } : { assignedToId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      property: {
        select: { title: true, price: true, slug: true },
      },
    },
  });

  const appointments = await prisma.appointment.findMany({
    where: user.orgId ? { property: { orgId: user.orgId } } : { property: { userId: user.id } },
    orderBy: { scheduledDate: 'asc' },
    include: {
      property: {
        select: { title: true, slug: true },
      },
    },
  });

  return (
    <BuilderDashboardClient
      user={user}
      org={org}
      properties={properties as any}
      leads={leads as any}
      appointments={appointments as any}
    />
  );
}
