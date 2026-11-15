const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL
    }
  }
});

async function main() {
  console.log('Optimizing organization logos...');
  
  // 1. Get Vishal's logo and write to public/uploads/vishal-avatar.jpg if needed
  const vishalOrg = await prisma.organization.findFirst({
    where: { slug: { contains: 'vishal' } }
  });
  if (vishalOrg && vishalOrg.logo && vishalOrg.logo.startsWith('data:image')) {
    const base64Data = vishalOrg.logo.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync('public/uploads/vishal-avatar.jpg', Buffer.from(base64Data, 'base64'));
    console.log('Wrote public/uploads/vishal-avatar.jpg');
    
    await prisma.organization.update({
      where: { id: vishalOrg.id },
      data: { logo: '/uploads/vishal-avatar.jpg' }
    });
    console.log('Updated Vishal Choudhary logo URL');
  }

  // 2. Update Rajeev Tomar logo
  const rajeevOrg = await prisma.organization.findFirst({
    where: { slug: { contains: 'rajeev' } }
  });
  if (rajeevOrg) {
    await prisma.organization.update({
      where: { id: rajeevOrg.id },
      data: { logo: '/uploads/rajeev-tomar-logo.jpg' }
    });
    console.log('Updated Rajeev Tomar logo URL');
  }

  // 3. Update Vipul Goswami logo
  const vipulOrg = await prisma.organization.findFirst({
    where: { slug: { contains: 'vipul' } }
  });
  if (vipulOrg) {
    await prisma.organization.update({
      where: { id: vipulOrg.id },
      data: { logo: '/uploads/vipul-avatar.jpg' }
    });
    console.log('Updated Vipul Goswami logo URL');
  }

  console.log('ORGANIZATION_LOGOS_OPTIMIZED_SUCCESSFULLY');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
