import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    const { slug } = params;
    const body = await request.json().catch(() => ({}));
    const rawDays = body.days ? parseInt(body.days, 10) : 7;
    const days = Number.isFinite(rawDays) ? Math.min(365, Math.max(1, rawDays)) : 7;
    const plan = body.plan || 'WEEKLY_BOOST';
    const amount = body.amount || (days >= 30 ? 1499 : 499);

    const property = await prisma.property.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const isOwner =
      user.role === 'ADMIN' ||
      property.userId === user.id ||
      (Boolean(user.orgId) && property.orgId === user.orgId);

    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden: You do not own this listing' }, { status: 403 });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    const updated = await prisma.property.update({
      where: { id: property.id },
      data: {
        isPromoted: true,
        promotedUntil: expiryDate,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Property "${property.title}" successfully promoted to Top-Rank until ${expiryDate.toLocaleDateString('en-IN')}!`,
      propertyId: updated.id,
      isPromoted: updated.isPromoted,
      promotedUntil: updated.promotedUntil,
      plan,
      amount,
    });
  } catch (error: any) {
    console.error('Error boosting property:', error);
    return NextResponse.json({ error: 'Failed to boost property' }, { status: 500 });
  }
}
