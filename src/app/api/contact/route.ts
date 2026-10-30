import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { contactRegistry } from '@/lib/contactRegistry';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, email, phone, and message are required' },
        { status: 400 }
      );
    }

    // Save to persistent registry
    const entry = contactRegistry.add({
      name,
      email,
      phone,
      subject: subject || 'General Marketplace Inquiry',
      message,
    });

    // Try saving to database as lead/inquiry
    try {
      await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          message: `[Contact Form - ${subject || 'Inquiry'}]: ${message}`,
          source: 'CONTACT_PAGE',
          status: 'NEW',
        },
      });
    } catch (dbErr) {
      console.warn('Database save skipped for contact inquiry, using memory registry:', dbErr);
    }

    // Speed-to-lead concierge WhatsApp link
    const cleanPhone = phone.replace(/\D/g, '');
    const alertMsg = `🛎️ *EstateOS Concierge Alert*\n\nTicket: *${entry.ticketId}*\nFrom: *${name}*\nEmail: ${email}\nPhone: ${phone}\nTopic: *${subject || 'General'}*\nMessage: "${message}"`;
    const whatsappAlertUrl = `https://wa.me/919876543210?text=${encodeURIComponent(alertMsg)}`;

    return NextResponse.json({
      success: true,
      ticketId: entry.ticketId,
      message: 'Your message has been assigned to our concierge desk.',
      whatsappAlertUrl,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to process contact inquiry' }, { status: 500 });
  }
}

export async function GET() {
  const submissions = contactRegistry.getAll();
  return NextResponse.json({ success: true, count: submissions.length, submissions });
}
