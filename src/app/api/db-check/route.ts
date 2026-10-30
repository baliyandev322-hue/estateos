import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
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
      database: 'Supabase PostgreSQL',
      propertiesCount,
      usersCount,
      orgsCount,
      properties,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'ERROR',
      message: error?.message || 'Database connection error',
      code: error?.code,
    }, { status: 500 });
  }
}
