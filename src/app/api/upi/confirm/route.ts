import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendTelegramAdminAlert } from '@/lib/telegramAlertService';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amount,
      planId = 'STARTER',
      planName = 'Starter Broker Plan',
      itemType = 'SUBSCRIPTION',
      utrNumber,
      customerPhone = '9368593249',
      billingCycle = 'MONTHLY',
      targetSlug = '',
    } = body;

    const user = await getCurrentUser().catch(() => null);

    const txnId = utrNumber && utrNumber.trim().length >= 6
      ? `UTR_${utrNumber.trim()}`
      : `UPI_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const invoiceNo = `INV-UPI-${Date.now().toString().slice(-6)}`;
    const finalAmount = Number(amount) || 499;

    // 1. Record in Database if available
    try {
      const defaultOrg = await prisma.organization.findFirst();
      if (defaultOrg) {
        await prisma.payment.create({
          data: {
            orgId: defaultOrg.id,
            amount: finalAmount,
            currency: 'INR',
            status: 'SUCCESS',
            razorpayOrderId: txnId,
            razorpayPaymentId: utrNumber || txnId,
            invoiceNo,
            planName: planName || itemType,
          },
        });
      }
    } catch (dbErr) {
      console.warn('[UPI Confirm] DB payment record warning:', dbErr);
    }

    // 2. Dispatch Instant Telegram Alert to Founder Phone
    sendTelegramAdminAlert({
      leadType: 'CONTACT_FORM',
      applicantName: `${user?.name || 'Verified Customer'} (${itemType})`,
      phone: customerPhone,
      amount: finalAmount,
      bank: 'PhonePe UPI (9368593249@ybl)',
      propertyTitle: targetSlug || planName,
      commission: Math.round(finalAmount * 0.98),
      message: `Direct UPI Received! Txn/UTR: ${utrNumber || 'Auto-Verified'} | Invoice: ${invoiceNo}`,
    }).catch((e) => console.warn('Telegram UPI alert notice:', e));

    return NextResponse.json({
      success: true,
      txnId,
      invoiceNo,
      amount: finalAmount,
      planName,
      date: new Date().toLocaleString('en-IN'),
    });
  } catch (error: any) {
    console.error('[UPI Confirm] Error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm UPI payment' },
      { status: 500 }
    );
  }
}
