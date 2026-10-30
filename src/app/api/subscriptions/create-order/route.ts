import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const PLAN_TIERS: Record<string, { price: number; name: string }> = {
  FREE: { price: 0, name: 'Free' },
  STARTER: { price: 499, name: 'Starter' },
  PROFESSIONAL: { price: 1499, name: 'Professional' },
  BUSINESS: { price: 2999, name: 'Business' },
  ENTERPRISE: { price: 5999, name: 'Enterprise' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, billingCycle = 'MONTHLY' } = body;

    if (!plan || !PLAN_TIERS[plan]) {
      return NextResponse.json({ error: 'Invalid subscription plan selected' }, { status: 400 });
    }

    const tier = PLAN_TIERS[plan];
    const baseAmount = billingCycle === 'YEARLY' ? tier.price * 10 : tier.price;
    const amountInPaise = Math.round(baseAmount * 100);

    const user = await getCurrentUser().catch(() => null);

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      'rzp_test_EstateOS2026';
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // If real Razorpay keys are configured, create real order via Razorpay API
    if (
      keySecret &&
      keySecret !== 'your_razorpay_secret' &&
      keyId !== 'rzp_test_placeholder' &&
      baseAmount > 0
    ) {
      try {
        const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: {
              plan,
              billingCycle,
              userId: user?.id || 'guest',
              orgId: user?.orgId || 'apex_realty_org',
            },
          }),
        });

        if (rzpRes.ok) {
          const rzpData = await rzpRes.json();
          if (rzpData.id) {
            orderId = rzpData.id;
          }
        }
      } catch (err) {
        console.warn('Razorpay live order creation fallback to sandbox:', err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      amountInRupees: baseAmount,
      currency: 'INR',
      keyId,
      plan,
      planName: tier.name,
      billingCycle,
      customer: {
        name: user?.name || 'Rahul Sharma (Licensed Agent)',
        email: user?.email || 'agent@estateos.com',
        contact: user?.phone || '9876543210',
      },
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Razorpay order' },
      { status: 500 }
    );
  }
}
