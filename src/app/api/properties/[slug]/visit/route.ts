import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getCurrentUser();
    const { slug } = params;
    const { visitorName, visitorPhone, visitorEmail, scheduledDate, timeSlot, notes } = await request.json();

    if (!visitorName || !visitorPhone || !scheduledDate || !timeSlot) {
      return NextResponse.json({ error: 'Name, phone, date, and slot are required' }, { status: 400 });
    }

    const property = await prisma.property.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        propertyId: property.id,
        userId: user?.id || null,
        visitorName,
        visitorPhone,
        visitorEmail: visitorEmail || null,
        scheduledDate: new Date(scheduledDate),
        timeSlot,
        notes: notes || null,
        status: 'PENDING',
      },
    });

    // Also register lead into the pipeline
    if (property.orgId) {
      await prisma.lead.create({
        data: {
          name: visitorName,
          phone: visitorPhone,
          email: visitorEmail || '',
          message: `Site visit scheduled for ${new Date(scheduledDate).toLocaleDateString('en-IN')} at ${timeSlot}. Notes: ${notes || 'None'}`,
          source: 'PORTAL',
          status: 'SITE_VISIT_SCHEDULED',
          propertyId: property.id,
          orgId: property.orgId,
          assignedToId: property.userId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Property site inspection successfully booked. The property concierge will confirm your slot.',
      appointmentId: appointment.id,
    });
  } catch (error: any) {
    console.error('Error booking visit:', error);
    return NextResponse.json({ error: 'Failed to book site inspection' }, { status: 500 });
  }
}
