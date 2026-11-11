import { NextResponse } from 'next/server';
import { initiatePhonePePayment } from '@/lib/phonepe';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const CATALOG: Record<string, { price: number; name: string }> = {
  // Broker SaaS Plans
  STARTER: { price: 499, name: 'Starter Broker Plan' },
  PROFESSIONAL: { price: 1499, name: 'Professional Broker Plan' },
  BUSINESS: { price: 2999, name: 'Business Broker Plan' },
  ENTERPRISE: { price: 5999, name: 'Enterprise Builder Plan' },

  // Micro-Transactions
  PROPERTY_BOOST: { price: 299, name: '7-Day Property Top Boost' },
  TRUTH_SCORE: { price: 299, name: 'Truth Score™ Title Audit PDF' },
  BUYER_PASS: { price: 499, name: 'Zero-Brokerage Direct Owner Pass' },
  LEAD_UNLOCK: { price: 99, name: 'Verified Buyer Lead Unlock' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      itemType = 'SUBSCRIPTION',
      planId,
      billingCycle = 'MONTHLY',
      customAmount,
      mobileNumber,
      targetId,
      targetSlug,
    } = body;

    let finalAmount = 0;
    let itemName = 'EstateOS Platform Service';

    if (itemType === 'SUBSCRIPTION' && planId && CATALOG[planId]) {
      const item = CATALOG[planId];
      finalAmount = billingCycle === 'YEARLY' ? item.price * 10 : item.price;
      itemName = `${item.name} (${billingCycle})`;
    } else if (CATALOG[itemType]) {
      finalAmount = CATALOG[itemType].price;
      itemName = CATALOG[itemType].name;
    } else if (customAmount && typeof customAmount === 'number' && customAmount > 0) {
      finalAmount = customAmount;
      itemName = body.itemName || 'Custom EstateOS Service';
    } else {
      return NextResponse.json({ error: 'Invalid item or plan selected' }, { status: 400 });
    }

    const user = await getCurrentUser().catch(() => null);

    const transactionId = `EOS_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Determine host origin dynamically
    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://www.estateospro.in';

    const redirectUrl = `${origin}/api/phonepe/callback?txnId=${transactionId}&itemType=${encodeURIComponent(
      itemType
    )}&planId=${encodeURIComponent(planId || '')}&cycle=${encodeURIComponent(
      billingCycle
    )}&targetId=${encodeURIComponent(targetId || '')}&targetSlug=${encodeURIComponent(targetSlug || '')}`;

    const phonePeResult = await initiatePhonePePayment({
      transactionId,
      merchantUserId: user?.id || `GUEST_${Date.now()}`,
      amountInRupees: finalAmount,
      redirectUrl,
      callbackUrl: redirectUrl,
      mobileNumber: mobileNumber || user?.phone || '9368593249',
      note: itemName,
    });

    if (phonePeResult.success && phonePeResult.redirectUrl) {
      return NextResponse.json({
        success: true,
        transactionId,
        redirectUrl: phonePeResult.redirectUrl,
        amount: finalAmount,
        itemName,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: phonePeResult.error || 'Unable to initiate PhonePe transaction',
          transactionId,
        },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error('[PhonePe Initiate] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error initiating PhonePe gateway' },
      { status: 500 }
    );
  }
}
