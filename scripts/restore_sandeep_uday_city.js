const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } }
});

async function run() {
  console.log('Restoring Sandeep Baliyan (Balaji Group) & Uday City Shamli...');

  // 1. Restore Sandeep Baliyan's Organization
  const org = await prisma.organization.upsert({
    where: { slug: 'balaji-group-shamli' },
    update: {
      name: 'Balaji Group & Real Estate',
      phone: '+91 95200 92996',
      logo: '/images/properties/uday-city-shamli-main.jpg',
      reraNumber: 'UP-GOVT-143-APPROVED',
      city: 'Shamli',
      state: 'Uttar Pradesh',
      isVerified: true
    },
    create: {
      slug: 'balaji-group-shamli',
      name: 'Balaji Group & Real Estate',
      phone: '+91 95200 92996',
      logo: '/images/properties/uday-city-shamli-main.jpg',
      reraNumber: 'UP-GOVT-143-APPROVED',
      city: 'Shamli',
      state: 'Uttar Pradesh',
      isVerified: true
    }
  });

  // 2. Restore Uday City & Abhay Green City Property
  const prop = await prisma.property.update({
    where: { slug: 'uday-city-abhay-green-city-residential-plots-shamli' },
    data: {
      orgId: org.id,
      truthScore: 99,
      isFeatured: true,
      isPromoted: true,
      status: 'AVAILABLE'
    }
  });

  console.log('SUCCESS_RESTORED_SANDEEP_UDAY_CITY:', {
    propTitle: prop.title,
    orgName: org.name,
    phone: org.phone,
    truthScore: prop.truthScore,
    isFeatured: prop.isFeatured
  });
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
