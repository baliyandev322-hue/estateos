import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendAdminLeadAlert } from '@/lib/emailService';
import { sendTelegramAdminAlert } from '@/lib/telegramAlertService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      role = 'BUYER', // 'BUYER' posting requirement or 'BROKER_PITCH' pitching inventory
      name,
      phone,
      email,
      city,
      locality,
      propertyType = 'PLOT',
      budgetText,
      requirementText,
      targetDemandTitle,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and mobile number are required.' },
        { status: 400 }
      );
    }

    const isBrokerPitch = role === 'BROKER_PITCH';
    const sourceTag = isBrokerPitch ? 'BROKER_INBOUND_PITCH' : 'BUYER_REQUIREMENT';

    const fullMessage = isBrokerPitch
      ? `[BROKER PITCH for "${targetDemandTitle || 'Buyer Demand'}"] City: ${city || 'N/A'} | Details: ${requirementText || 'Has matching unit'}`
      : `[BUYER REQUIREMENT] Looking for ${propertyType} in ${locality || ''}, ${city || ''} | Budget: ${budgetText || 'Flexible'} | Need: ${requirementText || 'Urgent purchase'}`;

    let savedId = `req_${Date.now()}`;
    try {
      const created = await prisma.lead.create({
        data: {
          name,
          phone,
          email: email || `${phone.replace(/\D/g, '').slice(-10)}@estateospro.in`,
          message: fullMessage,
          source: sourceTag,
          status: 'NEW',
          notes: JSON.stringify({
            role,
            city: city || 'Meerut',
            locality: locality || '',
            propertyType,
            budgetText: budgetText || '',
            targetDemandTitle: targetDemandTitle || '',
          }),
        },
      });
      savedId = created.id;
    } catch (dbErr) {
      console.warn('Buyer requirement fallback log:', dbErr);
    }

    // Trigger instant Telegram + Email Alert to Founder
    await sendTelegramAdminAlert({
      leadType: isBrokerPitch ? 'PROPERTY_INQUIRY' : 'CONTACT_FORM',
      applicantName: isBrokerPitch ? `🤝 BROKER PITCH: ${name}` : `🔥 BUYER DEMAND: ${name}`,
      phone,
      amount: budgetText || 'Not specified',
      propertyTitle: isBrokerPitch
        ? `Responding to: ${targetDemandTitle || 'Buyer Demand'} (${city || 'Western UP'})`
        : `${propertyType} in ${locality ? locality + ', ' : ''}${city || 'Western UP'}`,
      message: requirementText || fullMessage,
    }).catch((e) => console.warn('Telegram alert error:', e));

    sendAdminLeadAlert({
      leadType: isBrokerPitch ? 'PROPERTY_ENQUIRY' : 'CONTACT_FORM',
      name: `${isBrokerPitch ? '[BROKER PITCH]' : '[BUYER DEMAND]'} ${name}`,
      phone,
      email: email || undefined,
      details: {
        Role: isBrokerPitch ? 'Property Dealer / Builder Pitching Inventory' : 'Active Buyer Looking to Purchase',
        City: city || 'Western UP',
        Locality: locality || 'Any Prime Location',
        Budget: budgetText || 'Flexible',
      },
      message: fullMessage,
    }).catch((e) => console.warn('Admin email alert notice:', e));

    return NextResponse.json({
      success: true,
      id: savedId,
      message: isBrokerPitch
        ? 'Your inventory pitch has been received! Our EstateOS Desk will connect you directly with this verified buyer.'
        : 'Your property requirement is now LIVE! Verified brokers & developers with matching units will reach out via EstateOS Desk.',
    });
  } catch (err: any) {
    console.error('Buyer requirement API error:', err);
    return NextResponse.json({ error: 'Failed to submit requirement' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbRequirements = await prisma.lead.findMany({
      where: { source: 'BUYER_REQUIREMENT' },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: {
        id: true,
        name: true,
        message: true,
        notes: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ requirements: dbRequirements });
  } catch (err) {
    return NextResponse.json({ requirements: [] });
  }
}
