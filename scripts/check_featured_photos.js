const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const featured = await prisma.property.findMany({
    where: { isFeatured: true },
    select: { id: true, slug: true, title: true, city: true, images: true },
  });
  console.log('Featured Properties on Homepage:', featured.length);
  featured.forEach((f, i) => {
    console.log(`${i + 1}. [${f.city}] ${f.title}`);
    console.log(`   Images: ${f.images?.slice(0, 120)}...`);
  });

  const allProps = await prisma.property.findMany({
    select: { id: true, slug: true, city: true, status: true, isFeatured: true, images: true },
  });
  console.log('Total Properties in DB:', allProps.length);
  allProps.forEach((p, idx) => {
    const imgSrc = p.images?.includes('unsplash.com')
      ? 'UNSPLASH'
      : p.images?.includes('/images/corridors/')
      ? 'CORRIDOR_POSTER'
      : p.images?.includes('/images/properties/')
      ? 'LOCAL_REAL_PHOTO'
      : (p.images || '').slice(0, 40);
    console.log(`  [${idx + 1}] ${p.city} | status=${p.status} | featured=${p.isFeatured} | ${imgSrc} | ${p.slug}`);
  });
}

main().finally(() => prisma.$disconnect());
