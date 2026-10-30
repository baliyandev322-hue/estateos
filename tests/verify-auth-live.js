const https = require('https');

function post(url, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let resBody = '';
      res.on('data', d => resBody += d);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: resBody }));
    });
    req.on('error', e => resolve({ error: e.message }));
    req.write(data);
    req.end();
  });
}

function get(url, cookie) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const headers = cookie ? { Cookie: cookie } : {};
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'GET',
      headers
    }, res => {
      let resBody = '';
      res.on('data', d => resBody += d);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, len: resBody.length }));
    });
    req.on('error', e => resolve({ error: e.message }));
    req.end();
  });
}

async function run() {
  console.log('--- TESTING LIVE VERCEL AUTH & DASHBOARDS ---');
  
  // 1. New user registration
  const rand = Math.floor(Math.random() * 100000);
  const regEmail = 'client_' + rand + '@testmail.com';
  console.log('1. Registering new random user:', regEmail);
  const regRes = await post('https://estateos-ashen.vercel.app/api/auth/register', {
    name: 'Client ' + rand,
    email: regEmail,
    password: 'Password@123',
    role: 'BUYER'
  });
  console.log('Registration Status:', regRes.status, 'Body:', regRes.body);

  // 2. Roles test
  const roles = [
    { email: 'admin@estateos.com', pass: 'admin123', path: '/dashboard/admin', role: 'ADMIN' },
    { email: 'agent@estateos.com', pass: 'agent123', path: '/dashboard/agent', role: 'AGENT' },
    { email: 'builder@estateos.com', pass: 'builder123', path: '/dashboard/builder', role: 'BUILDER' },
    { email: 'buyer@estateos.com', pass: 'buyer123', path: '/dashboard/buyer', role: 'BUYER' },
  ];

  for (const r of roles) {
    const loginRes = await post('https://estateos-ashen.vercel.app/api/auth/login', {
      email: r.email,
      password: r.pass
    });
    const setCookie = loginRes.headers['set-cookie'];
    const cookieHeader = setCookie ? setCookie.map(c => c.split(';')[0]).join('; ') : '';
    console.log(`Login [${r.role}] (${r.email}): HTTP ${loginRes.status}, Cookie: ${!!cookieHeader}`);

    if (cookieHeader) {
      const dashRes = await get('https://estateos-ashen.vercel.app' + r.path, cookieHeader);
      console.log(`Dashboard [${r.path}]: HTTP ${dashRes.status}, Payload Size: ${dashRes.len} bytes`);
    }
  }

  // 3. Test invalid password
  const badLogin = await post('https://estateos-ashen.vercel.app/api/auth/login', {
    email: 'admin@estateos.com',
    password: 'wrong_password_test'
  });
  console.log('Bad Password Test Status (Expected 401):', badLogin.status);
}

run();
