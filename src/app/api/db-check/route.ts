import { NextResponse } from 'next/server';
import prisma, { getEffectiveDatabaseUrl } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser().catch(() => null);
  const isAdmin = user?.role === 'ADMIN';

  try {
    const propertiesCount = await prisma.property.count();

    if (!isAdmin) {
      return NextResponse.json({
        status: 'CONNECTED',
        propertiesCount,
      });
    }

    const effectiveUrl = getEffectiveDatabaseUrl();
    let host = 'UNKNOWN';
    try {
      host = new URL(effectiveUrl).host;
    } catch {}

    let rawEnvHost = 'NOT_SET';
    try {
      if (process.env.DATABASE_URL) {
        rawEnvHost = new URL(process.env.DATABASE_URL).host;
      }
    } catch {}

    const [usersCount, orgsCount, properties] = await Promise.all([
      prisma.user.count(),
      prisma.organization.count(),
      prisma.property.findMany({
        select: { id: true, title: true, slug: true, price: true, city: true },
        take: 6,
      }),
    ]);

    return NextResponse.json({
      status: 'CONNECTED',
      host,
      rawEnvHost,
      propertiesCount,
      usersCount,
      orgsCount,
      properties,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'ERROR',
        ...(isAdmin ? { message: error?.message || 'Database connection error', code: error?.code } : {}),
      },
      { status: 500 }
    );
  }
}
