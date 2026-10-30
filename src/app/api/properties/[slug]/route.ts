import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const property = await prisma.property.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        organization: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            bio: true,
            licenseNo: true,
            experienceYrs: true,
          },
        },
        verificationAudits: {
          orderBy: { lastAuditDate: 'desc' },
          take: 1,
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Increment views async
    prisma.property.update({
      where: { id: property.id },
      data: { viewsCount: { increment: 1 } },
    }).catch((e) => console.error('Failed to increment views', e));

    // Similar properties in same city or locality
    const similarProperties = await prisma.property.findMany({
      where: {
        id: { not: property.id },
        city: property.city,
      },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        bedrooms: true,
        bathrooms: true,
        carpetAreaSqFt: true,
        city: true,
        localityName: true,
        images: true,
        truthScore: true,
        propertyType: true,
        listingType: true,
      },
    });

    return NextResponse.json({ property, similarProperties });
  } catch (error: any) {
    console.error('Error fetching property detail:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;
    const property = await prisma.property.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Check ownership or admin
    if (user.role !== 'ADMIN' && property.userId !== user.id && property.orgId !== user.orgId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updated = await prisma.property.update({
      where: { id: property.id },
      data: body,
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (error: any) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;
    const property = await prisma.property.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (user.role !== 'ADMIN' && property.userId !== user.id && property.orgId !== user.orgId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.property.delete({
      where: { id: property.id },
    });

    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
