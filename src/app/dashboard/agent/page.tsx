import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AgentDashboardClient from './AgentDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AgentDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  // Multi-tenant Org check
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

  // Organization properties
  const properties = await prisma.property.findMany({
    where: user.orgId ? { orgId: user.orgId } : { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  // Organization Leads
  const leads = await prisma.lead.findMany({
    where: user.orgId ? { orgId: user.orgId } : { assignedToId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      property: {
        select: { title: true, price: true, slug: true },
      },
    },
  });

  // Appointments
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
    <AgentDashboardClient
      user={user}
      org={org}
      initialProperties={properties as any}
      initialLeads={leads as any}
      initialAppointments={appointments as any}
    />
  );
}
