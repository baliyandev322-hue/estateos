const fs = require('fs');
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
    const slug = '80-gaj-luxury-3bhk-duplex-house-gangasagar-ganganagar-meerut';
    const files = [
      'front-elevation.jpg',
      'side-angle-villa.jpg',
      'elevation-close.jpg',
      'divider-road-wide.jpg',
      'divider-road-approach.jpg',
      'street-view.jpg',
      'green-road.jpg'
    ];

    const base64List = files.map(f => {
      const buf = fs.readFileSync(`public/uploads/gangasagar-80gaj/${f}`);
      return `data:image/jpeg;base64,${buf.toString('base64')}`;
    });

    await prisma.property.update({
      where: { slug },
      data: {
        images: JSON.stringify(base64List)
      }
    });

    console.log('SUCCESS_BASE64_GANGASAGAR_IMAGES_UPDATED:', base64List.length);
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(console.error);
