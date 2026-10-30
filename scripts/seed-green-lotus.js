const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const agentOrg = await prisma.organization.findUnique({ where: { slug: 'apex-heritage-realty' } });
  const agentUser = await prisma.user.findUnique({ where: { email: 'agent@estateos.com' } });

  const existing = await prisma.property.findFirst({
    where: { slug: 'green-lotus-avenue-2bhk-it-city-mohali' }
  });

  if (!existing) {
    const prop = await prisma.property.create({
      data: {
        title: 'Green Lotus Avenue 2BHK Luxury Smart Home',
        slug: 'green-lotus-avenue-2bhk-it-city-mohali',
        description: 'RERA certified 2BHK luxury apartment located in Sector 82 IT City, Mohali. Adjoining international airport road, 2km from Fortis Hospital, Ryan International School and IT corporate campuses. Features complete DG power backup, club gymnasium, children play park, and landscaped green avenues.',
        propertyType: 'APARTMENT',
        listingType: 'SALE',
        price: 5800000, // ₹58 Lakhs
        pricePerSqFt: 4833,
        maintenanceFees: 2200,
        bedrooms: 2,
        bathrooms: 2,
        balconies: 2,
        carpetAreaSqFt: 980,
        superBuiltUpSqFt: 1200,
        furnishing: 'SEMI_FURNISHED',
        parkingSpaces: 1,
        floorNo: 5,
        totalFloors: 12,
        facing: 'NORTH_EAST',
        possessionStatus: 'READY_TO_MOVE',
        ageOfProperty: 0,
        address: 'Tower Cedar, Green Lotus Avenue, Sector 82 Alpha, IT City',
        localityName: 'Sector 82 IT City',
        city: 'Mohali',
        state: 'Punjab',
        pinCode: '140306',
        latitude: 30.6558,
        longitude: 76.7324,
        reraId: 'PBRERA-SAS80-PR0512',
        truthScore: 92,
        truthScoreDetails: JSON.stringify({
          agentIdentityVerified: true,
          reraOfficialCheck: 'VERIFIED_ACTIVE',
          ownershipTitleAudit: 'CLEAR_RECORD_2026',
          physicalInspectionAudit: 'VERIFIED_ON_SITE',
          completenessScore: 96,
          priceBenchmark: 'BELOW_CIRCLE_RATE_VALUE',
        }),
        isVerified: true,
        isFeatured: false,
        status: 'AVAILABLE',
        amenities: JSON.stringify([
          'Clubhouse & Gym',
          'Childrens Play Park',
          'Jogging Track',
          'CCTV & 24/7 Gated Security',
          '100% Power Backup',
          'EV Charging Points',
        ]),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        ]),
        viewsCount: 289,
        enquiriesCount: 14,
        orgId: agentOrg ? agentOrg.id : undefined,
        userId: agentUser ? agentUser.id : undefined,
      }
    });

    // Verification audit
    await prisma.truthScoreAudit.create({
      data: {
        propertyId: prop.id,
        identityVerified: true,
        reraVerified: true,
        ownershipVerified: true,
        physicalVerification: true,
        documentCompletenessScore: 96,
        priceBenchmarkingScore: 94,
        auditNotes: 'Direct RERA registry validated. Title verified clear for 13 years at SAS Nagar sub-registrar.',
        disclaimer: 'Verified under Punjab RERA Act statutory disclosure standards.',
      }
    });

    console.log('[CREATED] Green Lotus Avenue 2BHK in Supabase DB!');
  } else {
    console.log('[ALREADY EXISTS] Green Lotus Avenue in DB!');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
