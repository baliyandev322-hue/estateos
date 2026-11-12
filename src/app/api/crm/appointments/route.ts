import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const where: any = {};
    if (user.role === 'BUYER') {
      where.userId = user.id;
    } else if (user.role !== 'ADMIN') {
      // Find appointments where property belongs to user's org
      if (user.orgId) {
        where.property = { orgId: user.orgId };
      } else {
        where.property = { userId: user.id };
      }
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { scheduledDate: 'asc' },
      include: {
        property: {
          select: { id: true, title: true, slug: true, address: true, city: true, images: true },
        },
      },
    });

    return NextResponse.json({ appointments });
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status, notes } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
    }

    const allowedStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid appointment status' }, { status: 400 });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        property: { select: { orgId: true, userId: true } },
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const hasAccess =
      user.role === 'ADMIN' ||
      appointment.userId === user.id ||
      appointment.property?.userId === user.id ||
      (Boolean(user.orgId) && appointment.property?.orgId === user.orgId);

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}
