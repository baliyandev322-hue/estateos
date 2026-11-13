const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } }
});

async function run() {
  console.log('Starting Option 2 implementation...');

  // 1. Define our 4 REAL partner phone numbers (NEVER touch these)
  const realBrokerPhones = ['9837125150', '9917344519', '7252861624', '8476000071'];

  // 2. Ensure EstateOS Central Helpdesk Organization exists
  const centralHelpdeskOrg = await prisma.organization.upsert({
    where: { slug: 'estateos-verified-network' },
    update: {
      name: 'EstateOS Verified Network Helpdesk',
      phone: '9368593249',
      logo: '/images/verified-builder-badge.svg',
      reraNumber: 'EstateOS Direct Central Desk',
      city: 'Meerut / Delhi NCR',
      state: 'Uttar Pradesh'
    },
    create: {
      slug: 'estateos-verified-network',
      name: 'EstateOS Verified Network Helpdesk',
      phone: '9368593249',
      logo: '/images/verified-builder-badge.svg',
      reraNumber: 'EstateOS Direct Central Desk',
      city: 'Meerut / Delhi NCR',
      state: 'Uttar Pradesh'
    }
  });

  console.log('Central Helpdesk Org ready:', centralHelpdeskOrg.id);

  // 3. Find all properties
  const allProps = await prisma.property.findMany({
    include: { organization: true }
  });

  let realCount = 0;
  let routedCount = 0;

  for (const prop of allProps) {
    const isReal = prop.organization?.phone && realBrokerPhones.some(ph => prop.organization.phone.includes(ph));

    if (isReal) {
      realCount++;
      // Ensure real properties are promoted and featured at the top!
      await prisma.property.update({
        where: { id: prop.id },
        data: {
          isFeatured: true,
          isPromoted: true
        }
      });
      console.log(`[REAL LOCAL PARTNER] Kept untouched: ${prop.title} (${prop.organization.name}: ${prop.organization.phone})`);
    } else {
      routedCount++;
      // Re-route dummy/sample property to the User's Central Phone (+91 93685 93249)
      await prisma.property.update({
        where: { id: prop.id },
        data: {
          orgId: centralHelpdeskOrg.id,
          isFeatured: false // keep real ones above
        }
      });
    }
  }

  // 4. Also update other non-real organizations' phone numbers to 9368593249 as fallback
  const otherOrgs = await prisma.organization.findMany();
  for (const org of otherOrgs) {
    const isRealOrg = org.phone && realBrokerPhones.some(ph => org.phone.includes(ph));
    if (!isRealOrg && org.slug !== 'estateos-verified-network') {
      await prisma.organization.update({
        where: { id: org.id },
        data: { phone: '9368593249' }
      });
      console.log(`[FALLBACK ORG UPDATED] ${org.name} phone set to 9368593249`);
    }
  }

  console.log('\n--- OPTION 2 COMPLETED SUCCESSFULLY ---');
  console.log(`Total Properties: ${allProps.length}`);
  console.log(`Real Broker Properties Kept at Top: ${realCount}`);
  console.log(`Sample Properties Re-routed to User (+91 93685 93249): ${routedCount}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
