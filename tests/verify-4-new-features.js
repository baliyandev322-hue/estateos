const https = require('https');

function get(path, headers = {}) {
  return new Promise((resolve) => {
    https.get('https://estateos-ashen.vercel.app' + path, { headers }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve({ status: res.statusCode, body: b }));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function testAll() {
  console.log('=== VERIFYING 4 NEW FEATURES ON LIVE PRODUCTION ===\n');

  // 1. Google Verification Tag in Layout
  console.log('1. Checking Google Search Console Tag in HTML...');
  const home = await get('/');
  const hasGtag = home.body.includes('google-site-verification');
  const hasSchema = home.body.includes('schema.org') && home.body.includes('RealEstateAgent');
  console.log('Has google-site-verification tag:', hasGtag);
  console.log('Has RealEstateAgent JSON-LD schema:', hasSchema);

  // 2. Map View Elements on /properties
  console.log('\n2. Checking Interactive Map Radar on /properties...');
  const propsPage = await get('/properties');
  const hasMapToggle = propsPage.body.includes('Interactive Map') || propsPage.body.includes('Map Radar');
  console.log('Properties page status:', propsPage.status, 'Has Interactive Map View toggle:', hasMapToggle);

  // 3. Login as Agent and check Agent Dashboard
  console.log('\n3. Checking Agent Dashboard Profile Settings Tab...');
  const agentLogin = await new Promise(resolve => {
    const data = JSON.stringify({ email: 'agent@estateos.com', password: 'agent123' });
    const req = https.request('https://estateos-ashen.vercel.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      const cookie = res.headers['set-cookie'];
      resolve(cookie ? cookie.map(c => c.split(';')[0]).join('; ') : '');
    });
    req.write(data);
    req.end();
  });

  if (agentLogin) {
    const agentDash = await get('/dashboard/agent', { Cookie: agentLogin });
    const hasProfileTab = agentDash.body.includes('Profile & Agency Settings') || agentDash.body.includes('RERA Professional Credentials');
    console.log('Agent Dashboard Status:', agentDash.status, 'Has Profile & Agency Tab:', hasProfileTab);
  }

  // 4. Login as Builder and check Builder Dashboard
  console.log('\n4. Checking Builder Dashboard Add Phase Modal & Escrow Tab...');
  const builderLogin = await new Promise(resolve => {
    const data = JSON.stringify({ email: 'builder@estateos.com', password: 'builder123' });
    const req = https.request('https://estateos-ashen.vercel.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      const cookie = res.headers['set-cookie'];
      resolve(cookie ? cookie.map(c => c.split(';')[0]).join('; ') : '');
    });
    req.write(data);
    req.end();
  });

  if (builderLogin) {
    const builderDash = await get('/dashboard/builder', { Cookie: builderLogin });
    const hasAddTowerBtn = builderDash.body.includes('Add New Phase / Tower');
    const hasEscrowTab = builderDash.body.includes('Developer Profile & Escrow Settings');
    console.log('Builder Dashboard Status:', builderDash.status, 'Has Add Phase Button:', hasAddTowerBtn, 'Has Escrow Tab:', hasEscrowTab);
  }
}

testAll();
