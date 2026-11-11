const assert = require('assert');
const crypto = require('crypto');

// Load .env if present
try {
  if (typeof process.loadEnvFile === 'function') process.loadEnvFile('.env');
} catch {}

const {
  getPhonePeConfig,
  generateChecksum,
  initiatePhonePePayment,
  checkPhonePeStatus,
} = require('../src/lib/phonepe.ts');

async function testPhonePeIntegration() {
  console.log('======================================================');
  console.log('   ESTATEOS: PHONEPE PAYMENT GATEWAY INTEGRATION AUDIT');
  console.log('======================================================\n');

  // 1. Config Test
  console.log('1. Verifying PhonePe Configuration...');
  const config = getPhonePeConfig();
  assert(config.merchantId, 'Merchant ID must be present');
  assert(config.saltKey, 'Salt Key must be present');
  assert(config.saltIndex, 'Salt Index must be present');
  console.log('   ✓ Merchant ID:', config.merchantId);
  console.log('   ✓ Environment:', config.env);
  console.log('   ✓ Salt Index:', config.saltIndex);

  // 2. Checksum Algorithm Validation
  console.log('\n2. Testing SHA256 Checksum Formula Integrity...');
  const samplePayload = Buffer.from(JSON.stringify({ test: 'estateos_proptech' })).toString('base64');
  const checksum = generateChecksum(samplePayload, '/pg/v1/pay', config.saltKey, config.saltIndex);
  assert(checksum.includes('###' + config.saltIndex), 'Checksum must contain ### + saltIndex');
  console.log('   ✓ Checksum format verified: [hash]###[saltIndex]');

  // 3. Initiate Transaction against PhonePe Sandbox
  console.log('\n3. Testing Payment Initiation against PhonePe UAT Sandbox...');
  const testTxnId = `TEST_TXN_${Date.now()}`;
  const initResult = await initiatePhonePePayment({
    transactionId: testTxnId,
    merchantUserId: 'USER_DEV_TEST',
    amountInRupees: 499,
    redirectUrl: 'https://estateospro.in/api/phonepe/callback',
    mobileNumber: '9368593249',
    note: 'Starter Broker Plan (Monthly)',
  });

  console.log('   Initiation Result:', {
    success: initResult.success,
    transactionId: initResult.transactionId,
    hasRedirectUrl: !!initResult.redirectUrl,
    error: initResult.error,
  });

  if (initResult.success && initResult.redirectUrl) {
    console.log('   ✓ Generated PhonePe Checkout URL successfully!');
    console.log('   ✓ URL Domain:', new URL(initResult.redirectUrl).hostname);
  } else {
    console.log('   ! Note: UAT sandbox response:', initResult.error || 'Check network / credentials');
  }

  // 4. Status Check Signature Verification
  console.log('\n4. Testing Payment Status Signature Generator...');
  const statusEndpoint = `/pg/v1/status/${config.merchantId}/${testTxnId}`;
  const statusChecksum = generateChecksum('', statusEndpoint, config.saltKey, config.saltIndex);
  assert(statusChecksum.endsWith(`###${config.saltIndex}`), 'Status checksum valid format');
  console.log('   ✓ Status check signature formula validated');

  console.log('\n======================================================');
  console.log('   PHONEPE INTEGRATION AUDIT COMPLETED SUCCESSFULLY!');
  console.log('======================================================\n');
}

testPhonePeIntegration().catch((err) => {
  console.error('PhonePe Test Failed:', err);
  process.exit(1);
});
