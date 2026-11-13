const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('Connecting to database...');

  // 1. Ensure Organization has the official gold logo and verified phone
  const org = await prisma.organization.upsert({
    where: { slug: 'siddhartha-real-estate-and-construction' },
    update: {
      name: 'Siddhartha Real Estate & Construction',
      logo: '/uploads/siddharth-logo.svg',
      phone: '7252861624',
      reraNumber: 'Verified Real Estate Builder & Contractor',
      city: 'Meerut',
      state: 'Uttar Pradesh'
    },
    create: {
      slug: 'siddhartha-real-estate-and-construction',
      name: 'Siddhartha Real Estate & Construction',
      logo: '/uploads/siddharth-logo.svg',
      phone: '7252861624',
      reraNumber: 'Verified Real Estate Builder & Contractor',
      city: 'Meerut',
      state: 'Uttar Pradesh'
    }
  });

  console.log('Organization updated:', org.name, org.logo);

  const images = [
    '/uploads/siddharth-112gaj/chandelier-living.jpg',
    '/uploads/siddharth-112gaj/staircase-vanity.jpg',
    '/uploads/siddharth-112gaj/washbasin-mirror.jpg',
    '/uploads/siddharth-112gaj/bedroom-wardrobe.jpg',
    '/uploads/siddharth-112gaj/terrace-sitout.jpg',
    '/uploads/siddharth-112gaj/modular-kitchen.jpg',
    '/uploads/siddharth-112gaj/staircase-ceiling.jpg',
    '/uploads/siddharth-112gaj/bedroom-interior.jpg',
    '/uploads/siddharth-112gaj/staircase-railing.jpg'
  ];

  const features = [
    '112 Gaj (1,008 Sq.Ft Carpet Area)',
    'West Facing (पश्चिम मुखी) Vastu Aligned',
    'Just Off Main Mawana Road, Meerut',
    '3 BHK Luxury Independent Kothi',
    'Designer Gold Crystal Chandelier in Living Area',
    'Full Modular Kitchen with Premium Cabinets',
    'Floor-to-Ceiling Wardrobes with Upper Lofts & Display Shelf',
    'Modern Staircase with SS Railing & Backlit Mirror Vanity',
    'Private Terrace Sitout with Vertical Garden Wall',
    'Complete False Ceiling with Multi-Layer Cove Lights',
    'Home Loan Available from Leading Nationalized Banks'
  ];

  const description = `Brand new, ultra-luxury 112 Gaj (1,008 Sq.Ft) 3BHK modern duplex kothi located in close proximity to Main Mawana Road, Meerut. 

West facing (पश्चिम फेस) with complete Vastu harmony. Built by Siddhartha Real Estate & Construction with top-tier construction standards and luxury interior architecture.

Highlights:
- 112 Gaj Super Built-up / 1,008 Sq.Ft carpet area
- 3 spacious bedrooms with designer wardrobes & full-height lofts
- Magnificent double-height living hall featuring a grand gold crystal chandelier
- Modern semi-modular kitchen with high-gloss cabinets and durable slab
- Contemporary bathrooms with backlit LED vanity mirror & marble washbasins
- Designer balcony / open terrace sitout with lush vertical green grass and wall sconces
- Wide cemented road access directly connecting to Main Mawana Road, Meerut
- Clean registry papers, immediate possession, and ready bank loan assistance

Demand: ₹75,00,000/- (₹75 Lakh). For site visit and direct builder booking, call Siddhartha Real Estate & Construction at 7252861624.`;

  const property = await prisma.property.upsert({
    where: { slug: '112-gaj-luxury-3bhk-kothi-main-mawana-road-meerut' },
    update: {
      title: '112 Gaj West Facing 3BHK Luxury Modern Kothi, Main Mawana Road, Meerut',
      description,
      price: 7500000,
      carpetAreaSqFt: 1008,
      propertyType: 'VILLA',
      listingType: 'SALE',
      bedrooms: 3,
      bathrooms: 3,
      facing: 'WEST',
      address: 'Near Main Mawana Road, Meerut, Uttar Pradesh 250001',
      localityName: 'Main Mawana Road',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250001',
      organization: { connect: { id: org.id } },
      images: JSON.stringify(images),
      amenities: JSON.stringify(features),
      truthScore: 96,
      isVerified: true,
      isFeatured: true
    },
    create: {
      slug: '112-gaj-luxury-3bhk-kothi-main-mawana-road-meerut',
      title: '112 Gaj West Facing 3BHK Luxury Modern Kothi, Main Mawana Road, Meerut',
      description,
      price: 7500000,
      carpetAreaSqFt: 1008,
      propertyType: 'VILLA',
      listingType: 'SALE',
      bedrooms: 3,
      bathrooms: 3,
      facing: 'WEST',
      address: 'Near Main Mawana Road, Meerut, Uttar Pradesh 250001',
      localityName: 'Main Mawana Road',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250001',
      organization: { connect: { id: org.id } },
      images: JSON.stringify(images),
      amenities: JSON.stringify(features),
      truthScore: 96,
      isVerified: true,
      isFeatured: true
    }
  });

  console.log('SUCCESS_PUBLISHED_112_GAJ_KOTHI:', {
    id: property.id,
    slug: property.slug,
    title: property.title,
    price: property.price,
    orgId: property.orgId
  });
}

run()
  .catch((e) => {
    console.error('ERROR_PUBLISHING:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
