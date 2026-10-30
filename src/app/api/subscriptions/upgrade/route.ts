import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

const PLAN_TIERS: Record<string, { price: number; listings: number; leads: number; ai: boolean; seats: number }> = {
  FREE: { price: 0, listings: 5, leads: 25, ai: false, seats: 1 },
  STARTER: { price: 499, listings: 10, leads: 50, ai: false, seats: 1 },
  PROFESSIONAL: { price: 1499, listings: 50, leads: 250, ai: true, seats: 5 },
  BUSINESS: { price: 2999, listings: 150, leads: 1000, ai: true, seats: 15 },
  ENTERPRISE: { price: 5999, listings: 9999, leads: 9999, ai: true, seats: 50 },
};

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.orgId) {
      return NextResponse.json({ error: 'Must belong to an organization to manage subscriptions' }, { status: 403 });
    }

    const { plan, billingCycle = 'MONTHLY' } = await request.json();

    if (!PLAN_TIERS[plan]) {
      return NextResponse.json({ error: 'Invalid subscription tier selected' }, { status: 400 });
    }

    const tier = PLAN_TIERS[plan];
    const calculatedAmount = billingCycle === 'YEARLY' ? tier.price * 10 : tier.price;

    const nextPeriod = new Date();
    if (billingCycle === 'YEARLY') {
      nextPeriod.setFullYear(nextPeriod.getFullYear() + 1);
    } else {
      nextPeriod.setMonth(nextPeriod.getMonth() + 1);
    }

    // Upsert subscription
    const existingSub = await prisma.subscription.findFirst({
      where: { orgId: user.orgId },
    });

    let subscription;
    if (existingSub) {
      subscription = await prisma.subscription.update({
        where: { id: existingSub.id },
        data: {
          plan,
          billingCycle,
          amount: calculatedAmount,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: nextPeriod,
          listingsLimit: tier.listings,
          leadsLimit: tier.leads,
          aiFeaturesEnabled: tier.ai,
          teamSeatsLimit: tier.seats,
        },
      });
    } else {
      subscription = await prisma.subscription.create({
        data: {
          orgId: user.orgId,
          plan,
          billingCycle,
          amount: calculatedAmount,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: nextPeriod,
          listingsLimit: tier.listings,
          leadsLimit: tier.leads,
          aiFeaturesEnabled: tier.ai,
          teamSeatsLimit: tier.seats,
        },
      });
    }

    // Create payment invoice record if paid
    if (calculatedAmount > 0) {
      const invoiceNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      await prisma.payment.create({
        data: {
          orgId: user.orgId,
          amount: calculatedAmount,
          currency: 'INR',
          status: 'SUCCESS',
          invoiceNo,
          planName: `${plan} Plan (${billingCycle})`,
          razorpayPaymentId: `pay_sim_${Date.now()}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Your account has been successfully upgraded to the ${plan} tier!`,
      subscription,
    });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Subscription operation failed' }, { status: 500 });
  }
}
