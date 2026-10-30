const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const props = await prisma.property.findMany({
    select: { id: true, title: true, slug: true, city: true, price: true }
  });
  console.log('Current Properties in DB count:', props.length);
  console.log(props);
}

main().finally(() => prisma.$disconnect());
