const https = require('https');

function post(path, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'estateos-ashen.vercel.app',
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve({ status: res.statusCode, body: b }));
    });
    req.on('error', e => resolve({ error: e.message }));
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve) => {
    https.get('https://estateos-ashen.vercel.app' + path, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve({ status: res.statusCode, body: b }));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function testAll() {
  console.log('=== VERIFYING LIVE UPGRADES ON VERCEL ===\n');

  // 1. Contact API
  console.log('1. Testing Contact Form API...');
  const contact = await post('/api/contact', {
    name: 'Dev Baliyan',
    email: 'dev@test.com',
    phone: '9876543210',
    subject: 'RERA Verification Dispute or Report',
    message: 'Requesting audited CC certificate copy for Grand Azure.'
  });
  console.log('Contact API Status:', contact.status, 'Response:', contact.body);

  // 2. RERA Verification API
  console.log('\n2. Testing Statutory RERA Verification API...');
  const rera = await get('/api/rera/verify?regNo=PBRERA-SAS80-PR0612');
  console.log('RERA Verify Status:', rera.status, 'Response:', rera.body.slice(0, 300));

  // 3. AI Description Generator
  console.log('\n3. Testing AI Property Description Generator API...');
  const desc = await post('/api/ai/description-generator', {
    title: 'Grand Azure Residences 3BHK',
    bedrooms: 3,
    bathrooms: 3,
    locality: 'Sector 82 IT City',
    city: 'Mohali',
    carpetAreaSqFt: 1450,
  });
  console.log('AI Generator Status:', desc.status, 'Response:', desc.body.slice(0, 300));

  // 4. Property Enquiry
  console.log('\n4. Testing Property Enquiry API...');
  const enq = await post('/api/properties/grand-azure-residences/enquiry', {
    name: 'Rohit Khanna',
    phone: '9811122233',
    email: 'rohit@investor.com',
    message: 'Interested in booking penthouse unit',
  });
  console.log('Enquiry Status:', enq.status, 'Response:', enq.body);

  // 5. Property Visit
  console.log('\n5. Testing Property Visit API...');
  const vis = await post('/api/properties/grand-azure-residences/visit', {
    visitorName: 'Rohit Khanna',
    visitorPhone: '9811122233',
    scheduledDate: '2026-11-10',
    timeSlot: '02:00 PM',
  });
  console.log('Visit Status:', vis.status, 'Response:', vis.body);

  // 6. Agents & Builders Directory Render
  console.log('\n6. Testing Agents & Builders Directories...');
  const agents = await get('/agents');
  const builders = await get('/builders');
  console.log('Agents Page Status:', agents.status, 'Has Luxury Cards:', agents.body.includes('card-luxury'));
  console.log('Builders Page Status:', builders.status, 'Has Luxury Cards:', builders.body.includes('card-luxury'));
}

testAll();
