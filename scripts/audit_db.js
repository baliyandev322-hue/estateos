const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkMore() {
  const tables = await prisma.$queryRawUnsafe(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public';
  `);
  console.log('All public tables:', tables);

  const policies = await prisma.$queryRawUnsafe(`
    SELECT schemaname, tablename, policyname, permissive, roles, cmd 
    FROM pg_policies 
    WHERE schemaname = 'public';
  `);
  console.log(`Found ${policies.length} active security policies in public schema.`);
}

checkMore().finally(() => prisma.$disconnect());
