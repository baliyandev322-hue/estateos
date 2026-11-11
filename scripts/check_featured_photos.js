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

  const totalProps = await prisma.property.count();
  console.log('Total Properties in DB:', totalProps);
}

main().finally(() => prisma.$disconnect());
