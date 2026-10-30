import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { contactRegistry } from '@/lib/contactRegistry';
import { SITE_CONTACT } from '@/config/siteContact';
import { sendContactInquiryConfirmation } from '@/lib/emailService';

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

    // Dispatch branded transactional email acknowledgment
    await sendContactInquiryConfirmation({
      toEmail: email,
      name,
      ticketId: entry.ticketId,
      subject: subject || 'General Inquiry',
    }).catch((e) => console.warn('Email dispatch non-blocking notice:', e));

    // Speed-to-lead concierge WhatsApp link
    const cleanPhone = phone.replace(/\D/g, '');
    const alertMsg = `🛎️ *EstateOS Concierge Alert*\n\nTicket: *${entry.ticketId}*\nFrom: *${name}*\nEmail: ${email}\nPhone: ${phone}\nTopic: *${subject || 'General'}*\nMessage: "${message}"`;
    const conciergeWhatsApp = SITE_CONTACT.whatsappNumber.replace(/\D/g, '');
    const whatsappAlertUrl = `https://wa.me/${conciergeWhatsApp}?text=${encodeURIComponent(alertMsg)}`;

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
