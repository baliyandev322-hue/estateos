import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  let host = 'UNKNOWN';
  try {
    const parsed = new URL(dbUrl);
    host = parsed.host;
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
      propertiesCount,
      usersCount,
      orgsCount,
      properties,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'ERROR',
      host,
      message: error?.message || 'Database connection error',
      code: error?.code,
    }, { status: 500 });
  }
}
