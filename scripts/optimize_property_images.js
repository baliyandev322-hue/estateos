const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL
    }
  }
});

const UPDATES = [
  {
    slug: 'vasu-residency-zila-panchayat-approved-plots-garh-road-meerut',
    images: [
      '/uploads/vasu-residency/grand-gate.jpg',
      '/uploads/vasu-residency/3d-layout-plan.jpg',
      '/uploads/vasu-residency/entrance-boulevard.jpg'
    ]
  },
  {
    slug: '80-gaj-luxury-3bhk-duplex-house-gangasagar-ganganagar-meerut',
    images: [
      '/uploads/gangasagar-80gaj/front-elevation.jpg',
      '/uploads/gangasagar-80gaj/elevation-close.jpg',
      '/uploads/gangasagar-80gaj/side-angle-villa.jpg',
      '/uploads/gangasagar-80gaj/divider-road-wide.jpg',
      '/uploads/gangasagar-80gaj/divider-road-approach.jpg',
      '/uploads/gangasagar-80gaj/street-view.jpg',
      '/uploads/gangasagar-80gaj/green-road.jpg'
    ]
  },
  {
    slug: '6bhk-mda-approved-luxury-duplex-villa-modipuram-roorkee-road-meerut',
    images: [
      '/uploads/vipul-duplex/elevation.jpg',
      '/uploads/vipul-duplex/hall.jpg',
      '/uploads/vipul-duplex/kitchen.jpg',
      '/uploads/vipul-duplex/terrace.jpg',
      '/uploads/vipul-duplex/wardrobe.jpg'
    ]
  },
  {
    slug: '2200-sqft-brand-new-commercial-hall-room-washroom-rent-shamli',
    images: [
      '/uploads/vishal-hall/front.jpg',
      '/uploads/vishal-hall/hall1.jpg',
      '/uploads/vishal-hall/flooring.jpg',
      '/uploads/vishal-hall/ceiling.jpg'
    ]
  },
  {
    slug: '180-gaj-corner-plot-park-facing-alaknanda-dham-meerut',
    images: [
      '/uploads/alaknanda-dham/corner-plot-180gaj.jpg'
    ]
  }
];

async function main() {
  console.log('Optimizing property image URLs in database...');
  for (const item of UPDATES) {
    const updated = await prisma.property.update({
      where: { slug: item.slug },
      data: {
        images: JSON.stringify(item.images)
      },
      select: { slug: true, title: true }
    });
    console.log(`Updated images for: ${updated.slug}`);
  }
  console.log('ALL_PROPERTY_IMAGES_OPTIMIZED_SUCCESSFULLY');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
