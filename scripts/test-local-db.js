const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.property.count();
  console.log('Local Prisma Property Count:', count);
  const orgs = await prisma.organization.count();
  console.log('Local Prisma Organization Count:', orgs);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
