import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    const where: any = {};
    if (city && city !== 'All') {
      where.city = city;
    }

    const localities = await prisma.locality.findMany({
      where,
      orderBy: { avgPricePerSqFt: 'desc' },
    });

    return NextResponse.json({ localities });
  } catch (error: any) {
    console.error('Error fetching localities:', error);
    return NextResponse.json({ error: 'Failed to fetch localities' }, { status: 500 });
  }
}
