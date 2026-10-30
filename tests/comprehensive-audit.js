const https = require('https');

function request(path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve) => {
    const postData = body ? JSON.stringify(body) : null;
    const reqHeaders = { ...headers };
    if (postData) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }
    const req = https.request({
      hostname: 'estateos-ashen.vercel.app',
      path,
      method,
      headers: reqHeaders
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve({ status: res.statusCode, body: b.slice(0, 300) }));
    });
    req.on('error', e => resolve({ error: e.message }));
    if (postData) req.write(postData);
    req.end();
  });
}

async function auditAllEndpoints() {
  const tests = [
    // Pages
    { name: 'Home Page', path: '/', method: 'GET' },
    { name: 'Properties Page', path: '/properties', method: 'GET' },
    { name: 'Property Detail Page', path: '/property/grand-azure-residences', method: 'GET' },
    { name: 'AI Matchmaker Page', path: '/ai-matchmaker', method: 'GET' },
    { name: 'Calculators Page', path: '/calculators', method: 'GET' },
    { name: 'Pricing Page', path: '/pricing', method: 'GET' },
    { name: 'Localities Page', path: '/localities', method: 'GET' },
    { name: 'Truth Score Page', path: '/truth-score', method: 'GET' },
    { name: 'Guides Page', path: '/guides', method: 'GET' },
    { name: 'Single Guide Page', path: '/guide/rera-carpet-area-guide', method: 'GET' },
    { name: 'Agents Page', path: '/agents', method: 'GET' },
    { name: 'Builders Page', path: '/builders', method: 'GET' },
    { name: 'Contact Page', path: '/contact', method: 'GET' },
    { name: 'About Page', path: '/about', method: 'GET' },
    { name: 'Privacy Page', path: '/privacy', method: 'GET' },
    { name: 'Terms Page', path: '/terms', method: 'GET' },
    { name: 'Disclaimer Page', path: '/disclaimer', method: 'GET' },

    // APIs - Public
    { name: 'API: Properties List', path: '/api/properties', method: 'GET' },
    { name: 'API: Property Detail', path: '/api/properties/grand-azure-residences', method: 'GET' },
    { name: 'API: AI Matchmaker', path: '/api/ai/matchmaker', method: 'POST', body: { prompt: '3bhk in Mohali under 1.5 Cr' } },
    { name: 'API: Localities', path: '/api/localities', method: 'GET' },
    { name: 'API: Articles', path: '/api/articles', method: 'GET' },
    { name: 'API: DB Check', path: '/api/db-check', method: 'GET' },
    { name: 'API: Property Enquiry', path: '/api/properties/grand-azure-residences/enquiry', method: 'POST', body: { name: 'Test User', phone: '9876543210' } },
    { name: 'API: Property Visit', path: '/api/properties/grand-azure-residences/visit', method: 'POST', body: { visitorName: 'Test User', visitorPhone: '9876543210', scheduledDate: '2026-11-01', timeSlot: '11:00 AM' } },
    { name: 'API: Property Boost', path: '/api/properties/grand-azure-residences/boost', method: 'POST', body: { days: 7 } },
    { name: 'API: DSA Loan Leads', path: '/api/dsa/loan-leads', method: 'POST', body: { applicantName: 'Dev', phone: '9876543210', loanAmount: 5000000 } },
    { name: 'API: Subscriptions Create Order', path: '/api/subscriptions/create-order', method: 'POST', body: { planTier: 'PRO', billingPeriod: 'monthly' } },
  ];

  console.log('Running audit of all pages and endpoints...\n');
  for (const t of tests) {
    const res = await request(t.path, t.method, t.body);
    console.log(`[HTTP ${res.status}] ${t.name.padEnd(30)} -> ${t.path}`);
    if (res.status >= 400) {
      console.log('       Error Payload:', res.body);
    }
  }
}

auditAllEndpoints();
