import { NextResponse } from 'next/server';
import prisma, { getEffectiveDatabaseUrl } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const effectiveUrl = getEffectiveDatabaseUrl();
  let host = 'UNKNOWN';
  try {
    const parsed = new URL(effectiveUrl);
    host = parsed.host;
  } catch (e) {}

  let rawEnvHost = 'NOT_SET';
  try {
    if (process.env.DATABASE_URL) {
      rawEnvHost = new URL(process.env.DATABASE_URL).host;
    }
  } catch (e) {}

  try {
    const [propertiesCount, usersCount, orgsCount] = await Promise.all([
      prisma.property.count(),
      prisma.user.count(),
      prisma.organization.count(),
    ]);

    const properties = await prisma.property.findMany({
      select: { id: true, title: true, slug: true, price: true, city: true },
      take: 6,
    });

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
    return NextResponse.json({
      status: 'ERROR',
      host,
      rawEnvHost,
      message: error?.message || 'Database connection error',
      code: error?.code,
    }, { status: 500 });
  }
}
