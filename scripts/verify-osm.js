const https = require('https');

https.get('https://estateos-ashen.vercel.app/property/green-lotus-avenue-2bhk-it-city-mohali', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const regex = /static\/chunks\/[^"']+\.js/g;
    const matches = data.match(regex) || [];
    console.log(`Found ${matches.length} chunks`);
    let found = false;
    let checked = 0;
    matches.forEach(chunk => {
      https.get('https://estateos-ashen.vercel.app/_next/' + chunk, cres => {
        let cdata = '';
        cres.on('data', d => cdata += d);
        cres.on('end', () => {
          checked++;
          if (cdata.includes('tile.openstreetmap.org')) {
            found = true;
            console.log('SUCCESS: Verified openstreetmap.org tile layer in live chunk:', chunk);
          }
          if (cdata.includes('cartocdn.com')) {
            console.log('WARNING: Still found cartocdn in:', chunk);
          }
          if (checked === matches.length && !found) {
            console.log('Checked all chunks. OSM not yet deployed or in different chunk.');
          }
        });
      });
    });
  });
});
