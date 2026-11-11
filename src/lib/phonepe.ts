import crypto from 'crypto';

/**
 * PhonePe Payment Gateway Engine for EstateOS
 * Standard Checkout Integration (UPI Intent, Dynamic QR, NetBanking, Cards)
 * Follows PhonePe PG API v1 Specifications
 */

export interface PhonePeConfig {
  merchantId: string;
  saltKey: string;
  saltIndex: string;
  env: 'UAT' | 'PRODUCTION';
}

export function getPhonePeConfig(): PhonePeConfig {
  const env = (process.env.PHONEPE_ENV || 'UAT').toUpperCase() === 'PRODUCTION' ? 'PRODUCTION' : 'UAT';
  
  // Official PhonePe UAT Sandbox test credentials as fallback for developer sandbox
  const merchantId = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT86';
  const saltKey = process.env.PHONEPE_SALT_KEY || '96434309-7796-489d-8924-ab56988a6076';
  const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';

  return { merchantId, saltKey, saltIndex, env };
}

export function getPhonePeBaseUrl(env: 'UAT' | 'PRODUCTION'): string {
  return env === 'PRODUCTION'
    ? 'https://api.phonepe.com/apis/hermes'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
}

/**
 * Generates PhonePe X-VERIFY checksum for API requests
 * Formula: SHA256(payload + apiEndpoint + saltKey) + "###" + saltIndex
 */
export function generateChecksum(payload: string, endpoint: string, saltKey: string, saltIndex: string): string {
  const data = payload + endpoint + saltKey;
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return `${hash}###${saltIndex}`;
}

export interface InitiatePaymentParams {
  transactionId: string;
  merchantUserId: string;
  amountInRupees: number;
  redirectUrl: string;
  callbackUrl?: string;
  mobileNumber?: string;
  note?: string;
}

export interface InitiatePaymentResult {
  success: boolean;
  redirectUrl?: string;
  transactionId: string;
  error?: string;
}

/**
 * Initiates a standard checkout payment on PhonePe
 * Returns the official PhonePe checkout URL (supporting UPI Intent, QR, NetBanking, Cards)
 */
export async function initiatePhonePePayment(params: InitiatePaymentParams): Promise<InitiatePaymentResult> {
  const config = getPhonePeConfig();
  const baseUrl = getPhonePeBaseUrl(config.env);
  const endpoint = '/pg/v1/pay';

  const amountInPaise = Math.round(params.amountInRupees * 100);

  const payloadObject = {
    merchantId: config.merchantId,
    merchantTransactionId: params.transactionId,
    merchantUserId: params.merchantUserId || `MUID_${Date.now()}`,
    amount: amountInPaise,
    redirectUrl: params.redirectUrl,
    redirectMode: 'REDIRECT',
    callbackUrl: params.callbackUrl || params.redirectUrl,
    mobileNumber: (params.mobileNumber || '9999999999').replace(/\D/g, '').slice(-10),
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payloadObject)).toString('base64');
  const checksum = generateChecksum(base64Payload, endpoint, config.saltKey, config.saltIndex);

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      body: JSON.stringify({
        request: base64Payload,
      }),
    });

    const data = await res.json();

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return {
        success: true,
        redirectUrl: data.data.instrumentResponse.redirectInfo.url,
        transactionId: params.transactionId,
      };
    } else {
      console.warn('[PhonePe PG] API response error:', data.message || 'Unknown error');
      return {
        success: false,
        transactionId: params.transactionId,
        error: data.message || 'Failed to initiate PhonePe transaction',
      };
    }
  } catch (err: any) {
    console.error('[PhonePe PG] Network exception during initiate:', err?.message || err);
    return {
      success: false,
      transactionId: params.transactionId,
      error: 'Network error contacting PhonePe gateway',
    };
  }
}

/**
 * Checks live payment status directly from PhonePe server
 * Endpoint: /pg/v1/status/{merchantId}/{merchantTransactionId}
 */
export async function checkPhonePeStatus(transactionId: string): Promise<{
  success: boolean;
  code: string;
  message: string;
  amount?: number;
  phonePeTransactionId?: string;
  paymentState?: 'COMPLETED' | 'FAILED' | 'PENDING';
}> {
  const config = getPhonePeConfig();
  const baseUrl = getPhonePeBaseUrl(config.env);
  const endpoint = `/pg/v1/status/${config.merchantId}/${transactionId}`;

  // Formula for status: SHA256("/pg/v1/status/" + merchantId + "/" + transactionId + saltKey) + "###" + saltIndex
  const checksum = generateChecksum('', endpoint, config.saltKey, config.saltIndex);

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': config.merchantId,
      },
    });

    const data = await res.json();

    if (data.code === 'PAYMENT_SUCCESS') {
      return {
        success: true,
        code: data.code,
        message: data.message || 'Payment Successful',
        amount: (data.data?.amount || 0) / 100,
        phonePeTransactionId: data.data?.transactionId,
        paymentState: 'COMPLETED',
      };
    } else if (data.code === 'PAYMENT_PENDING') {
      return {
        success: false,
        code: data.code,
        message: data.message || 'Payment Pending',
        amount: (data.data?.amount || 0) / 100,
        paymentState: 'PENDING',
      };
    } else {
      return {
        success: false,
        code: data.code || 'PAYMENT_ERROR',
        message: data.message || 'Payment Failed',
        paymentState: 'FAILED',
      };
    }
  } catch (err: any) {
    console.error('[PhonePe PG] Error checking payment status:', err?.message || err);
    return {
      success: false,
      code: 'NETWORK_EXCEPTION',
      message: 'Could not connect to PhonePe status server',
      paymentState: 'FAILED',
    };
  }
}
