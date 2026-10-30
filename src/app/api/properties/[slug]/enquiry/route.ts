import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { name, email, phone, message, budgetMin, budgetMax, source = 'PORTAL' } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const property = await prisma.property.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: {
        user: true,
        organization: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email: email || '',
        phone,
        message: message || `Inquiry for ${property.title}`,
        source,
        budgetMin: budgetMin ? parseFloat(budgetMin) : undefined,
        budgetMax: budgetMax ? parseFloat(budgetMax) : undefined,
        status: 'NEW',
        propertyId: property.id,
        orgId: property.orgId,
        assignedToId: property.userId,
      },
    });

    // Update enquiry counter
    await prisma.property.update({
      where: { id: property.id },
      data: { enquiriesCount: { increment: 1 } },
    });

    // Goldmine #5: Speed-to-lead automated WhatsApp Alert link
    const targetAgentPhone = (property.user?.phone || property.organization?.phone || '9876543210').replace(/\D/g, '');
    const cleanAgentPhone = targetAgentPhone.length === 10 ? `91${targetAgentPhone}` : targetAgentPhone;
    const alertText = `🚨 *EstateOS Priority Lead Alert*\n\nBuyer: *${name}*\nPhone: *${phone}*\nEmail: ${email || 'N/A'}\nProperty: *${property.title}*\nBudget: ₹${property.price >= 10000000 ? (property.price / 10000000).toFixed(2) + ' Cr' : (property.price / 100000).toFixed(2) + ' Lakh'}\nNote: "${message || 'Interested in site inspection'}"\n\n⚡ Speed-to-lead: Call buyer now!`;
    const whatsappAgentAlertUrl = `https://wa.me/${cleanAgentPhone}?text=${encodeURIComponent(alertText)}`;

    // Buyer direct WhatsApp with agent
    const buyerConnectText = `Hi, I just submitted an inquiry for *${property.title}* on EstateOS. My name is ${name}. Please share the brochure and schedule a site visit.`;
    const whatsappBuyerConnectUrl = `https://wa.me/${cleanAgentPhone}?text=${encodeURIComponent(buyerConnectText)}`;

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been directly dispatched to the verified agent/builder.',
      leadId: lead.id,
      whatsappAgentAlertUrl,
      whatsappBuyerConnectUrl,
    });
  } catch (error: any) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
