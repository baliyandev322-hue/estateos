const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } }
});

async function run() {
  const p = await prisma.property.findMany({
    where: { isFeatured: true },
    take: 8,
    orderBy: [
      { truthScore: 'desc' },
      { isPromoted: 'desc' },
      { updatedAt: 'desc' }
    ],
    select: {
      title: true,
      city: true,
      truthScore: true,
      organization: { select: { name: true, phone: true } }
    }
  });

  console.log('HOMEPAGE_FEATURED_PROPERTIES:');
  p.forEach((item, idx) => {
    console.log(`${idx + 1}. [Score: ${item.truthScore}] ${item.title} -> ${item.organization?.name} (${item.organization?.phone})`);
  });
}

run().finally(() => prisma.$disconnect());
