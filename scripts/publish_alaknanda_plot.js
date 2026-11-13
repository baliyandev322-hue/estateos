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
    console.log('Connecting to database...');

    // 1. Get Siddhartha Real Estate & Construction
    const org = await prisma.organization.findUnique({
      where: { slug: 'siddhartha-real-estate-and-construction' }
    });

    if (!org) {
      throw new Error('Siddhartha organization not found!');
    }

    const slug = '180-gaj-corner-plot-park-facing-alaknanda-dham-meerut';
    const images = ['/uploads/alaknanda-dham/corner-plot-180gaj.jpg'];

    const amenities = [
      '180 Gaj (1,620 Sq.Ft) Corner Plot',
      'North Facing Direct Society Park View',
      'Two Frontages: 30 Ft (East) x 54 Ft (North)',
      '30 Feet Wide Roads on Both Sides',
      'East + North Vastu Compliant Corner',
      'Gated Township with 24x7 Security & Wide Roads',
      'Immediate Registry & Hassle-Free Transfer',
      'Slight On-Table Negotiation for Serious Buyers'
    ];

    const description = `🌟 EXCLUSIVE CORNER RESIDENTIAL PLOT FOR SALE IN ALAKNANDA DHAM, MEERUT 🌟

📍 Location: Alaknanda Dham (Prime Gated Society, Ganganagar / Mawana Road, Meerut)
📐 Plot Size: 180 Sq. Yards (180 गज | 1,620 Sq.Ft)
🧭 Dimensions & Facing:
• Corner Plot with Two Frontages:
  - East Front: 30 Feet
  - North Front: 54 Feet (Direct Park Facing)
• Vastu Compliant East + North Orientation
🛣️ Road Width: 30 Feet Wide Concrete Roads on BOTH Sides
🌳 View: Directly overlooking lush green society park with clear view
💰 Demand Price: ₹75,000/- Per Sq. Yard (गज) | Total: ₹1,35,00,000/- (₹1.35 Crore)
🤝 Negotiation: On-table slight negotiation available for genuine buyers.

Key Highlights:
✔️ Perfect 30x54 ft dimension corner plot ideal for a luxury dream villa or duplex
✔️ Dual-road corner layout ensures ample natural light, ventilation, and premium parking
✔️ Situated inside peaceful, secure and high-profile residential township Alaknanda Dham
✔️ Rapid connectivity to Mawana Road, Ganganagar, Garh Road & Delhi-Meerut Expressway
✔️ Clear title, ready registry and immediate possession

Official Channel Partner: Siddhartha Real Estate & Construction
Direct Call / WhatsApp: 7252861624`;

    const data = {
      title: '180 Gaj Corner Residential Plot (East + North Facing), Alaknanda Dham, Meerut',
      slug,
      description,
      price: 13500000, // ₹1.35 Cr (180 * 75,000)
      pricePerSqFt: 8333,
      carpetAreaSqFt: 1620, // 180 * 9
      propertyType: 'PLOT',
      listingType: 'SALE',
      status: 'AVAILABLE',
      facing: 'NORTH_EAST',
      address: 'Corner Plot, 30 Ft Park Avenue, Alaknanda Dham, Meerut',
      localityName: 'Alaknanda Dham',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250001',
      possessionStatus: 'READY_TO_MOVE',
      reraId: 'ALAKNANDA-DHAM-MDA-CORNER-PLOT',
      images: JSON.stringify(images),
      amenities: JSON.stringify(amenities),
      truthScore: 98,
      isVerified: true,
      isFeatured: true,
      isPromoted: true,
      organization: { connect: { id: org.id } }
    };

    const property = await prisma.property.upsert({
      where: { slug },
      update: data,
      create: data
    });

    console.log('SUCCESS_PUBLISHED_ALAKNANDA_PLOT:', {
      id: property.id,
      slug: property.slug,
      title: property.title,
      price: property.price,
      truthScore: property.truthScore
    });
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((e) => {
  console.error('ERROR_PUBLISHING_ALAKNANDA_PLOT:', e);
  process.exit(1);
});
