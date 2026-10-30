import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'estateos_rzp_webhook_secret_2026';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-razorpay-signature header' }, { status: 400 });
    }

    // Verify HMAC SHA256 Signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    // Secure timing-safe comparison
    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expectedSignature, 'utf8')
    );

    if (!isAuthentic && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;

    if (!paymentEntity) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const paymentId = paymentEntity.id;
    const orderId = paymentEntity.order_id;
    const amount = (paymentEntity.amount || 0) / 100; // Razorpay amounts in paise
    const orgId = paymentEntity.notes?.orgId;
    const planName = paymentEntity.notes?.plan || 'PROFESSIONAL';

    // 1. Prevent duplicate processing (Idempotency check)
    const existingPayment = await prisma.payment.findFirst({
      where: { razorpayPaymentId: paymentId },
    });

    if (existingPayment) {
      return NextResponse.json({ received: true, message: 'Payment already processed' });
    }

    if (event === 'payment.captured' || event === 'order.paid') {
      if (orgId) {
        // Create verified invoice
        const invoiceNo = `INV-RZP-${Date.now().toString().slice(-6)}`;
        await prisma.payment.create({
          data: {
            orgId,
            amount,
            currency: paymentEntity.currency || 'INR',
            status: 'SUCCESS',
            razorpayPaymentId: paymentId,
            razorpayOrderId: orderId,
            invoiceNo,
            planName: `${planName} Subscription`,
          },
        });

        // Upgrade subscription validity
        const nextPeriod = new Date();
        nextPeriod.setMonth(nextPeriod.getMonth() + 1);

        await prisma.subscription.upsert({
          where: { id: (await prisma.subscription.findFirst({ where: { orgId } }))?.id || 'temp' },
          update: {
            status: 'ACTIVE',
            currentPeriodStart: new Date(),
            currentPeriodEnd: nextPeriod,
          },
          create: {
            orgId,
            plan: planName,
            status: 'ACTIVE',
            amount,
            currentPeriodStart: new Date(),
            currentPeriodEnd: nextPeriod,
          },
        });
      }
    } else if (event === 'payment.failed') {
      if (orgId) {
        await prisma.payment.create({
          data: {
            orgId,
            amount,
            currency: 'INR',
            status: 'FAILED',
            razorpayPaymentId: paymentId,
            razorpayOrderId: orderId,
            invoiceNo: `FAILED-${Date.now().toString().slice(-6)}`,
            planName: 'Payment Failed',
          },
        });
      }
    }

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
