const assert = require('assert');

// Simulate a 1x1 transparent PNG magic byte buffer
// PNG header: 89 50 4E 47 0D 0A 1A 0A
const testPngBuffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
  0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
  0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
]);

async function runTest() {
  console.log('--- TESTING CLOUD STORAGE ENGINE ---');
  
  // Set Vercel simulation
  process.env.VERCEL = '1';
  
  // Dynamic import of compiled or ts-node or plain test
  const { uploadToCloudStorage } = await import('../src/lib/cloudStorage.ts');
  
  const result = await uploadToCloudStorage(testPngBuffer, 'test_sample.png', 'image/png');
  
  console.log('Upload Result on simulated Vercel Serverless:', {
    provider: result.provider,
    urlLength: result.url.length,
    urlPrefix: result.url.substring(0, 30),
    size: result.size
  });
  
  assert(result.url, 'Upload Result: URL must be present');
  assert(result.size > 0, 'Upload Result: Size must be greater than 0');
  assert(['cloudinary', 'supabase', 'data-uri', 'local'].includes(result.provider), 'Provider must be valid');
  
  console.log('[PASS] Cloud Storage upload handles serverless environment without filesystem crash!');
}

runTest().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
