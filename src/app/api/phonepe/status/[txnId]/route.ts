import { NextResponse } from 'next/server';
import { checkPhonePeStatus } from '@/lib/phonepe';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { txnId: string } }
) {
  try {
    const txnId = params.txnId;
    if (!txnId) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    const status = await checkPhonePeStatus(txnId);
    return NextResponse.json(status);
  } catch (error: any) {
    console.error('[PhonePe Status Check] Error:', error);
    return NextResponse.json({ error: 'Failed to query PhonePe status' }, { status: 500 });
  }
}
