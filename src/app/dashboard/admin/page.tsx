import React from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const [
    totalUsers,
    totalProperties,
    verifiedCount,
    totalLeads,
    totalOrgs,
    revenueAgg,
    allProperties,
    allUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
    prisma.property.count({ where: { isVerified: true } }),
    prisma.lead.count(),
    prisma.organization.count(),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
      take: 25,
      include: {
        organization: true,
        user: true,
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ]);

  return (
    <AdminDashboardClient
      user={user}
      metrics={{
        totalUsers,
        totalProperties,
        verifiedCount,
        pendingCount: totalProperties - verifiedCount,
        totalLeads,
        totalOrgs,
        totalRevenue: revenueAgg._sum.amount || 0,
      }}
      initialProperties={allProperties as any}
      initialUsers={allUsers as any}
    />
  );
}
