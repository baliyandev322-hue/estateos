import { NextResponse } from 'next/server';
import { checkPhonePeStatus } from '@/lib/phonepe';
import prisma from '@/lib/prisma';
import { sendTelegramAdminAlert } from '@/lib/telegramAlertService';

export const dynamic = 'force-dynamic';

async function handleCallback(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Check for transaction ID in query or request body
    let txnId = searchParams.get('txnId');
    const itemType = searchParams.get('itemType') || 'SUBSCRIPTION';
    const planId = searchParams.get('planId') || 'PROFESSIONAL';
    const cycle = searchParams.get('cycle') || 'MONTHLY';
    const targetId = searchParams.get('targetId') || '';
    const targetSlug = searchParams.get('targetSlug') || '';

    if (!txnId && request.method === 'POST') {
      try {
        const formData = await request.formData();
        txnId = (formData.get('transactionId') as string) || (formData.get('merchantTransactionId') as string);
      } catch {
        // Fallback to JSON if not form data
        try {
          const json = await request.json();
          txnId = json.transactionId || json.merchantTransactionId;
        } catch {}
      }
    }

    if (!txnId) {
      return NextResponse.redirect(new URL('/payment-failed?reason=missing_transaction_id', request.url), 303);
    }

    // Verify payment status with PhonePe PG servers
    const statusResult = await checkPhonePeStatus(txnId);

    // In UAT Sandbox, PhonePe provides simulation. If statusResult succeeds or sandbox test:
    const isSuccess = statusResult.success && statusResult.code === 'PAYMENT_SUCCESS';

    if (isSuccess) {
      const amount = statusResult.amount || 499;
      const invoiceNo = `INV-PHPE-${Date.now().toString().slice(-6)}`;

      // 1. Record payment in database safely
      try {
        const defaultOrg = await prisma.organization.findFirst();
        if (defaultOrg) {
          await prisma.payment.create({
            data: {
              orgId: defaultOrg.id,
              amount,
              currency: 'INR',
              status: 'SUCCESS',
              razorpayOrderId: txnId, // Using field to store PhonePe Txn ID
              razorpayPaymentId: statusResult.phonePeTransactionId || txnId,
              invoiceNo,
              planName: planId || itemType,
            },
          });
        }
      } catch (dbErr) {
        console.warn('[PhonePe Callback] DB payment record warning:', dbErr);
      }

      // 2. Dispatch real-time Telegram Push Notification to Founder Phone!
      sendTelegramAdminAlert({
        leadType: 'CONTACT_FORM',
        applicantName: `Verified Subscriber (${itemType})`,
        phone: 'PhonePe PG Live',
        amount,
        bank: 'PhonePe UPI / NetBanking',
        propertyTitle: targetSlug || itemType,
        commission: Math.round(amount * 0.98), // Net after PG fees
        message: `PhonePe Transaction ID: ${txnId} | Code: ${statusResult.code}`,
      }).catch((e) => console.warn('Telegram payment alert notice:', e));

      const successUrl = new URL('/payment-success', request.url);
      successUrl.searchParams.set('txnId', txnId);
      successUrl.searchParams.set('amount', amount.toString());
      successUrl.searchParams.set('itemType', itemType);
      successUrl.searchParams.set('planId', planId);
      successUrl.searchParams.set('targetSlug', targetSlug);
      successUrl.searchParams.set('invoiceNo', invoiceNo);

      return NextResponse.redirect(successUrl, 303);
    } else {
      const failedUrl = new URL('/payment-failed', request.url);
      failedUrl.searchParams.set('txnId', txnId);
      failedUrl.searchParams.set('reason', statusResult.message || 'Payment not completed');
      return NextResponse.redirect(failedUrl, 303);
    }
  } catch (err: any) {
    console.error('[PhonePe Callback] Exception:', err);
    return NextResponse.redirect(new URL('/payment-failed?reason=server_error', request.url), 303);
  }
}

export async function GET(request: Request) {
  return handleCallback(request);
}

export async function POST(request: Request) {
  return handleCallback(request);
}
