const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LOCALITIES = [
  {
    slug: 'rohta-road-bypass-meerut',
    name: 'Rohta Road Bypass & NH-58',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    pinCode: '250002',
    overview: 'Rapidly developing MDA & RERA compliant corridor along Meerut-Delhi highway and Rohta Road with direct access to Delhi-Meerut Expressway and rapid RRTS.',
    avgPricePerSqFt: 5200,
    rentalYieldPercent: 4.5,
    priceTrend1Yr: 15.6,
    priceTrend3Yr: 42.0,
    safetyRating: 4.7,
    connectivityRating: 4.9,
    greenCoverRating: 4.5,
    metroDistanceKm: 3.5,
    airportDistanceKm: 65.0,
    schoolsCount: 16,
    hospitalsCount: 7,
    mallsCount: 4,
    latitude: 28.9845,
    longitude: 77.6710,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    slug: 'ganganagar-mawana-road-meerut',
    name: 'Ganganagar & Mawana Road',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    pinCode: '250001',
    overview: 'Premier upscale residential colony in Meerut featuring modern duplex kothis, Ganga Sagar Colony, wide divider roads, top schools, and lush green parks.',
    avgPricePerSqFt: 6200,
    rentalYieldPercent: 4.8,
    priceTrend1Yr: 16.2,
    priceTrend3Yr: 45.0,
    safetyRating: 4.8,
    connectivityRating: 4.7,
    greenCoverRating: 4.6,
    metroDistanceKm: 4.5,
    airportDistanceKm: 68.0,
    schoolsCount: 18,
    hospitalsCount: 8,
    mallsCount: 5,
    latitude: 28.9950,
    longitude: 77.7550,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    slug: 'main-garh-road-meerut',
    name: 'Main Garh Road & Ring Road',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    pinCode: '250004',
    overview: 'Major growth corridor connected to Meerut Ring Road with mega gated townships like Vasu Residency, top medical institutions, and high investment return.',
    avgPricePerSqFt: 3800,
    rentalYieldPercent: 4.2,
    priceTrend1Yr: 17.5,
    priceTrend3Yr: 48.0,
    safetyRating: 4.6,
    connectivityRating: 4.8,
    greenCoverRating: 4.4,
    metroDistanceKm: 5.0,
    airportDistanceKm: 70.0,
    schoolsCount: 14,
    hospitalsCount: 6,
    mallsCount: 3,
    latitude: 28.9680,
    longitude: 77.7420,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    slug: 'bheswal-road-shamli',
    name: 'Bheswal Road & Highway Corridor',
    city: 'Shamli',
    state: 'Uttar Pradesh',
    pinCode: '247776',
    overview: 'Thriving investment corridor in Shamli near Delhi-Dehradun Expressway junction, housing gated residential townships like Uday City & Abhay Green City.',
    avgPricePerSqFt: 2800,
    rentalYieldPercent: 4.0,
    priceTrend1Yr: 18.2,
    priceTrend3Yr: 52.0,
    safetyRating: 4.5,
    connectivityRating: 4.6,
    greenCoverRating: 4.5,
    metroDistanceKm: 12.0,
    airportDistanceKm: 85.0,
    schoolsCount: 12,
    hospitalsCount: 5,
    mallsCount: 2,
    latitude: 29.4485,
    longitude: 77.3110,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
];

async function main() {
  console.log('Seeding Meerut and Shamli localities...');
  for (const loc of LOCALITIES) {
    const upserted = await prisma.locality.upsert({
      where: { slug: loc.slug },
      update: loc,
      create: loc,
    });
    console.log(`Upserted locality: ${upserted.name} (${upserted.city})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
