const https = require('https');

https.get('https://estateos-ashen.vercel.app/api/db-check', res => {
  let b = '';
  res.on('data', d => b += d);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('BODY:', b);
  });
});
