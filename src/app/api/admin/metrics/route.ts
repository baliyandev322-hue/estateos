import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAuthUser(['ADMIN']);

    const [
      totalUsers,
      totalProperties,
      verifiedProperties,
      totalLeads,
      totalOrgs,
      activeSubscriptions,
      payments,
      recentUsers,
      recentProperties,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.property.count(),
      prisma.property.count({ where: { isVerified: true } }),
      prisma.lead.count(),
      prisma.organization.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.payment.aggregate({ _sum: { amount: true }, _count: true }),
      prisma.user.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
      prisma.property.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { organization: { select: { name: true } }, user: { select: { name: true } } },
      }),
    ]);

    return NextResponse.json({
      metrics: {
        totalUsers,
        totalProperties,
        verifiedProperties,
        pendingProperties: totalProperties - verifiedProperties,
        totalLeads,
        totalOrgs,
        activeSubscriptions,
        totalRevenue: payments._sum.amount || 0,
        transactionsCount: payments._count || 0,
      },
      recentUsers,
      recentProperties,
    });
  } catch (error: any) {
    console.error('Admin metrics error:', error);
    return NextResponse.json({ error: error.message || 'Unauthorized' }, { status: 403 });
  }
}
