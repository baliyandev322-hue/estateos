const https = require('https');

https.get('https://estateos-ashen.vercel.app/pricing', (res) => {
  let data = '';
  res.on('data', (c) => (data += c));
  res.on('end', () => {
    const matches = data.match(/static\/chunks\/[^"']+\.js/g) || [];
    console.log(`Found ${matches.length} chunks on pricing page`);
    matches.forEach((m) => {
      https.get('https://estateos-ashen.vercel.app/_next/' + m, (cres) => {
        let cd = '';
        cres.on('data', (d) => (cd += d));
        cres.on('end', () => {
          if (cd.includes('Google Pay') && cd.includes('PhonePe UPI')) {
            console.log('SUCCESS: Live chunk contains Razorpay UPI Modal in:', m);
          }
        });
      });
    });
  });
});
