const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testFetch() {
  const slug = 'the-camellias-signature-4bhk-sky-mansion-gurugram';
  try {
    const prop = await prisma.property.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: {
        organization: true,
        user: true,
        verificationAudits: {
          orderBy: { lastAuditDate: 'desc' },
          take: 1,
        },
      },
    });
    console.log('Result found:', prop ? prop.title : 'NULL');
  } catch (e) {
    console.error('Query error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

testFetch();
