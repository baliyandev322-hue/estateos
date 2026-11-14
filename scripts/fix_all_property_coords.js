const { PrismaClient } = require('@prisma/client');

async function run() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL
      }
    }
  });

  try {
    console.log('Fixing property coordinates in database...');

    const updates = [
      // 1. Ganga Sagar 80 Gaj Duplex
      {
        slug: '80-gaj-luxury-3bhk-duplex-house-gangasagar-ganganagar-meerut',
        lat: 29.0067,
        lng: 77.7577,
        address: 'Main Divider Road, Ganga Sagar Colony, Ganganagar, Meerut'
      },
      // 2. 180 Gaj Park Facing Villa Ganganagar
      {
        slug: '180-gaj-park-facing-4bhk-luxury-duplex-villa-ganganagar-meerut',
        lat: 29.0067,
        lng: 77.7577,
        address: 'Park Facing Avenue, Ganganagar, Meerut'
      },
      // 3. 112 Gaj Kothi Mawana Road
      {
        slug: '112-gaj-luxury-3bhk-kothi-main-mawana-road-meerut',
        lat: 29.0125,
        lng: 77.7450,
        address: 'Near Main Mawana Road, Meerut'
      },
      // 4. 180 Gaj Alaknanda Dham Corner Plot
      {
        slug: '180-gaj-corner-plot-park-facing-alaknanda-dham-meerut',
        lat: 29.0100,
        lng: 77.7550,
        address: 'Corner Plot, 30 Ft Park Avenue, Alaknanda Dham, Meerut'
      },
      // 5. Vasu Residency Garh Road
      {
        slug: 'vasu-residency-zila-panchayat-approved-plots-garh-road-meerut',
        lat: 28.9750,
        lng: 77.7350,
        address: 'Main Garh Road Highway, Near Ring Road, Meerut'
      },
      // 6. Shyam Residency Rohta Road Bypass
      {
        slug: 'shyam-residency-mda-approved-residential-plots-rohta-road-bypass-meerut',
        lat: 28.9845,
        lng: 77.6712,
        address: 'Near Delhi-Haridwar Bypass, Rohta Road, Meerut'
      },
      // 7. Vardhman Emerald Greens Modipuram
      {
        slug: 'vardhman-emerald-greens-mda-approved-plots-nh58-modipuram-meerut',
        lat: 29.0650,
        lng: 77.7120,
        address: 'NH-58 Delhi-Dehradun Highway, Modipuram, Meerut'
      },
      // 8. 6BHK Luxury Duplex Villa Modipuram
      {
        slug: '6bhk-mda-approved-luxury-duplex-villa-modipuram-roorkee-road-meerut',
        lat: 29.0650,
        lng: 77.7120,
        address: 'Roorkee Road, Modipuram, Meerut'
      },
      // 9. 2200 Sq.Ft Commercial Hall Shamli
      {
        slug: '2200-sqft-brand-new-commercial-hall-room-washroom-rent-shamli',
        lat: 29.4485,
        lng: 77.3111,
        address: 'Main Highway Road, Shamli, Uttar Pradesh'
      },
      // 10. Uday City & Abhay Green City Shamli
      {
        slug: 'uday-city-abhay-green-city-residential-plots-shamli',
        lat: 29.4485,
        lng: 77.3111,
        address: 'Near Good Mandi, Bheswal Road & Collectorate, Shamli'
      }
    ];

    for (const item of updates) {
      const updated = await prisma.property.updateMany({
        where: { slug: item.slug },
        data: {
          latitude: item.lat,
          longitude: item.lng
        }
      });
      console.log(`Updated [${item.slug}]: lat=${item.lat}, lng=${item.lng} (${updated.count} matched)`);
    }

    // Also update any other Meerut properties that have null coordinates
    const remainingMeerut = await prisma.property.updateMany({
      where: {
        city: 'Meerut',
        latitude: null
      },
      data: {
        latitude: 28.9845,
        longitude: 77.7064
      }
    });
    console.log(`Updated remaining Meerut properties: ${remainingMeerut.count}`);

    console.log('SUCCESS_COORDINATES_FIXED_IN_DATABASE');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(console.error);
