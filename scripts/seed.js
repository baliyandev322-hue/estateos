const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding EstateOS Database...');

  // Clean existing records if any
  await prisma.savedProperty.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.truthScoreAudit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.organizationMember.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.article.deleteMany();
  await prisma.locality.deleteMany();
  await prisma.user.deleteMany();
  await prisma.platformSetting.deleteMany();

  // Create Platform Settings
  await prisma.platformSetting.create({
    data: {
      id: 'default',
      platformName: 'EstateOS',
      supportEmail: 'contact@estateos.in',
      supportPhone: '+91 1800 200 4567',
      adsenseActive: true,
      adsenseClientId: 'ca-pub-7890123456789012',
      razorpayKeyId: 'rzp_test_EstateOS2026',
    },
  });

  // Passwords
  const adminPass = await bcrypt.hash('admin123', 10);
  const agentPass = await bcrypt.hash('agent123', 10);
  const builderPass = await bcrypt.hash('builder123', 10);
  const buyerPass = await bcrypt.hash('buyer123', 10);

  // 1. Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@estateos.com',
      passwordHash: adminPass,
      name: 'EstateOS SuperAdmin',
      role: 'ADMIN',
      phone: '+91 99887 76655',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Principal Platform Controller & Risk Auditor at EstateOS India.',
      city: 'Gurugram',
    },
  });

  const agentUser = await prisma.user.create({
    data: {
      email: 'agent@estateos.com',
      passwordHash: agentPass,
      name: 'Rahul Sharma',
      role: 'AGENT',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'RERA Certified Prime Residential Consultant specializing in Tri-city Mohali, Chandigarh & Gurugram luxury high-rises.',
      licenseNo: 'RERA-PB-AGT-2023-0941',
      experienceYrs: 11,
      city: 'Mohali',
    },
  });

  const builderUser = await prisma.user.create({
    data: {
      email: 'builder@estateos.com',
      passwordHash: builderPass,
      name: 'Vikramaditya Singhania',
      role: 'BUILDER',
      phone: '+91 98112 34567',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Managing Director at Singhania Grand Luxury Developers with over 18 premium township deliveries.',
      licenseNo: 'RERA-HR-BLD-2021-0182',
      experienceYrs: 22,
      city: 'Gurugram',
    },
  });

  const buyerUser = await prisma.user.create({
    data: {
      email: 'buyer@estateos.com',
      passwordHash: buyerPass,
      name: 'Priya Sundaram',
      role: 'BUYER',
      phone: '+91 91234 56789',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      bio: 'Tech entrepreneur looking for high-appreciation residential apartments and IT park commercial assets.',
      city: 'Bangalore',
    },
  });

  // 2. Multi-tenant Organizations
  const agentOrg = await prisma.organization.create({
    data: {
      name: 'Apex Heritage Realty',
      slug: 'apex-heritage-realty',
      type: 'AGENT_AGENCY',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'PBRERA-SAS80-REA0419',
      email: 'info@apexheritage.in',
      phone: '+91 98765 43210',
      website: 'https://apexheritage.in',
      address: 'Suite 404, World Trade Centre, Sector 82 Alpha',
      city: 'Mohali',
      state: 'Punjab',
      isVerified: true,
      description: 'Apex Heritage Realty is the premier certified luxury brokerage operating across Mohali IT City, Chandigarh, and Gurugram Golf Course corridor.',
    },
  });

  const builderOrg = await prisma.organization.create({
    data: {
      name: 'Singhania Grand Developers',
      slug: 'singhania-grand-developers',
      type: 'BUILDER_DEV',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      reraNumber: 'HRERA-PKL-GGM-1190-2022',
      email: 'sales@singhaniagrand.com',
      phone: '+91 98112 34567',
      website: 'https://singhaniagrand.com',
      address: 'Tower A, Grand Horizon Plaza, Sector 54',
      city: 'Gurugram',
      state: 'Haryana',
      isVerified: true,
      description: 'Award-winning sustainable luxury real estate developer creating iconic residential towers and IGBC Gold-certified gated communities.',
    },
  });

  // Link Memberships
  await prisma.organizationMember.create({
    data: {
      orgId: agentOrg.id,
      userId: agentUser.id,
      role: 'OWNER',
    },
  });

  await prisma.organizationMember.create({
    data: {
      orgId: builderOrg.id,
      userId: builderUser.id,
      role: 'OWNER',
    },
  });

  // 3. Subscriptions for SaaS
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  await prisma.subscription.create({
    data: {
      orgId: agentOrg.id,
      plan: 'PROFESSIONAL',
      billingCycle: 'MONTHLY',
      amount: 1499,
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: nextMonth,
      listingsLimit: 50,
      leadsLimit: 250,
      aiFeaturesEnabled: true,
      teamSeatsLimit: 5,
    },
  });

  await prisma.subscription.create({
    data: {
      orgId: builderOrg.id,
      plan: 'BUSINESS',
      billingCycle: 'YEARLY',
      amount: 29990,
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: nextMonth,
      listingsLimit: 150,
      leadsLimit: 1000,
      aiFeaturesEnabled: true,
      teamSeatsLimit: 15,
    },
  });

  // 4. Localities (Signature Locality Intelligence)
  const locMohali82 = await prisma.locality.create({
    data: {
      name: 'Sector 82 IT City',
      slug: 'sector-82-it-city-mohali',
      city: 'Mohali',
      state: 'Punjab',
      pinCode: '140306',
      overview: 'Sector 82 IT City in Mohali is Punjab\'s flagship high-tech corridor, featuring Infosys, Plaksha University, ISB Mohali, and world-class road access to Shaheed Bhagat Singh International Airport.',
      avgPricePerSqFt: 6200,
      rentalYieldPercent: 4.8,
      priceTrend1Yr: 14.5,
      priceTrend3Yr: 42.0,
      safetyRating: 4.8,
      connectivityRating: 4.9,
      greenCoverRating: 4.6,
      schoolsCount: 8,
      hospitalsCount: 5,
      mallsCount: 3,
      metroDistanceKm: 4.5,
      airportDistanceKm: 6.0,
      latitude: 30.6558,
      longitude: 76.7324,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
  });

  const locGurugramGolf = await prisma.locality.create({
    data: {
      name: 'Golf Course Extension Road',
      slug: 'golf-course-extension-gurugram',
      city: 'Gurugram',
      state: 'Haryana',
      pinCode: '122018',
      overview: 'The epitome of Delhi-NCR ultra-luxury real estate with multi-lane expressways, corporate headquarters of Fortune 500 companies, and super-premium gated towers.',
      avgPricePerSqFt: 18500,
      rentalYieldPercent: 3.9,
      priceTrend1Yr: 18.2,
      priceTrend3Yr: 54.0,
      safetyRating: 4.7,
      connectivityRating: 4.8,
      greenCoverRating: 4.1,
      schoolsCount: 14,
      hospitalsCount: 7,
      mallsCount: 8,
      metroDistanceKm: 2.1,
      airportDistanceKm: 21.0,
      latitude: 28.4116,
      longitude: 77.0858,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
  });

  const locIndiranagar = await prisma.locality.create({
    data: {
      name: 'Indiranagar',
      slug: 'indiranagar-bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560038',
      overview: 'Bangalore\'s most vibrant cosmopolitan hub offering tree-lined avenues, flagship retail, craft breweries, and immediate metro access to Central Business District.',
      avgPricePerSqFt: 19800,
      rentalYieldPercent: 4.2,
      priceTrend1Yr: 11.2,
      priceTrend3Yr: 36.5,
      safetyRating: 4.6,
      connectivityRating: 4.9,
      greenCoverRating: 4.4,
      schoolsCount: 11,
      hospitalsCount: 6,
      mallsCount: 5,
      metroDistanceKm: 0.6,
      airportDistanceKm: 34.0,
      latitude: 12.9784,
      longitude: 77.6408,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
  });

  const locBandra = await prisma.locality.create({
    data: {
      name: 'Bandra West',
      slug: 'bandra-west-mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050',
      overview: 'The Queen of the Suburbs, Bandra West provides prestigious sea-facing luxury, heritage architecture, and effortless connectivity to Bandra-Kurla Complex (BKC).',
      avgPricePerSqFt: 58000,
      rentalYieldPercent: 3.1,
      priceTrend1Yr: 9.8,
      priceTrend3Yr: 28.5,
      safetyRating: 4.9,
      connectivityRating: 4.9,
      greenCoverRating: 3.9,
      schoolsCount: 15,
      hospitalsCount: 8,
      mallsCount: 4,
      metroDistanceKm: 1.2,
      airportDistanceKm: 9.5,
      latitude: 19.0596,
      longitude: 72.8295,
      imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
  });

  const locGachibowli = await prisma.locality.create({
    data: {
      name: 'Gachibowli Financial District',
      slug: 'gachibowli-hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500032',
      overview: 'Hyderabad\'s premier IT and banking hub, boasting wide 8-lane expressways, premier educational institutes (ISB, HCU), and rapid capital appreciation.',
      avgPricePerSqFt: 9800,
      rentalYieldPercent: 5.1,
      priceTrend1Yr: 15.6,
      priceTrend3Yr: 48.0,
      safetyRating: 4.8,
      connectivityRating: 4.7,
      greenCoverRating: 4.3,
      schoolsCount: 12,
      hospitalsCount: 9,
      mallsCount: 6,
      metroDistanceKm: 2.8,
      airportDistanceKm: 29.0,
      latitude: 17.4401,
      longitude: 78.3489,
      imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
      featured: true,
    },
  });

  // 5. Properties (Real & Comprehensive Data)
  const prop1 = await prisma.property.create({
    data: {
      title: 'Grand Azure 3BHK Luxury Residence at IT City',
      slug: 'grand-azure-3bhk-luxury-residence-it-city-mohali',
      description: 'Experience ultra-refined living at Grand Azure in Sector 82 IT City, Mohali. Designed with floor-to-ceiling soundproof acoustic glass, Italian marble flooring, and panoramic balconies overlooking landscaped central greens. Situated 5 minutes from Shaheed Bhagat Singh International Airport, Infosys campus, and Amity University. Comes with EV charging bays and automated clubhouse membership.',
      propertyType: 'APARTMENT',
      listingType: 'SALE',
      price: 9200000, // ₹92 Lakhs
      pricePerSqFt: 5257,
      maintenanceFees: 3800,
      bedrooms: 3,
      bathrooms: 3,
      balconies: 3,
      carpetAreaSqFt: 1450,
      superBuiltUpSqFt: 1750,
      furnishing: 'SEMI_FURNISHED',
      parkingSpaces: 2,
      floorNo: 8,
      totalFloors: 14,
      facing: 'NORTH_EAST',
      possessionStatus: 'READY_TO_MOVE',
      ageOfProperty: 1,
      address: 'Tower Sapphire, Grand Azure, Sector 82 Alpha, IT City',
      localityName: 'Sector 82 IT City',
      city: 'Mohali',
      state: 'Punjab',
      pinCode: '140306',
      latitude: 30.6558,
      longitude: 76.7324,
      reraId: 'PBRERA-SAS80-PR0612',
      truthScore: 94,
      truthScoreDetails: JSON.stringify({
        agentIdentityVerified: true,
        reraOfficialCheck: 'VERIFIED_ACTIVE',
        ownershipTitleAudit: 'CLEAR_RECORD_2026',
        physicalInspectionAudit: 'VERIFIED_ON_SITE',
        completenessScore: 98,
        priceBenchmark: 'FAIR_MARKET_VALUE_TIER_A',
      }),
      isVerified: true,
      isFeatured: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify([
        'Infinity Swimming Pool',
        'State-of-the-Art Gymnasium',
        'EV Car Charging Station',
        '24/7 Multi-Tier Biometric Security',
        'High-Speed Schindler Elevators',
        'Clubhouse & Banquet Hall',
        'Rooftop Tennis & Pickleball Court',
        '100% DG Power Backup',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      viewsCount: 342,
      enquiriesCount: 18,
      orgId: agentOrg.id,
      userId: agentUser.id,
    },
  });

  const prop2 = await prisma.property.create({
    data: {
      title: 'The Camellias Signature 4BHK Sky Mansion',
      slug: 'the-camellias-signature-4bhk-sky-mansion-gurugram',
      description: 'Nestled along the Golf Course Road corridor, this iconic 4BHK Penthouse offers breathtaking unrestricted vistas of the Aravalli hills and the championship golf greens. Features private high-speed elevator access, double-height ceilings, temperature-controlled indoor pool, and bespoke German modular kitchen.',
      propertyType: 'PENTHOUSE',
      listingType: 'SALE',
      price: 48500000, // ₹4.85 Crore
      pricePerSqFt: 11547,
      maintenanceFees: 12500,
      bedrooms: 4,
      bathrooms: 5,
      balconies: 4,
      carpetAreaSqFt: 3600,
      superBuiltUpSqFt: 4200,
      furnishing: 'FULLY_FURNISHED',
      parkingSpaces: 4,
      floorNo: 22,
      totalFloors: 26,
      facing: 'EAST',
      possessionStatus: 'READY_TO_MOVE',
      ageOfProperty: 2,
      address: 'Tower Imperial, Golf Course Extension Road, Sector 54',
      localityName: 'Golf Course Extension Road',
      city: 'Gurugram',
      state: 'Haryana',
      pinCode: '122018',
      reraId: 'HRERA-PKL-GGM-882-2021',
      truthScore: 98,
      truthScoreDetails: JSON.stringify({
        agentIdentityVerified: true,
        reraOfficialCheck: 'VERIFIED_ACTIVE',
        ownershipTitleAudit: 'CLEAR_RECORD_2026',
        physicalInspectionAudit: 'VERIFIED_ON_SITE',
        completenessScore: 100,
        priceBenchmark: 'PREMIUM_INDEX_ACCURATE',
      }),
      isVerified: true,
      isFeatured: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify([
        'Private Plunge Pool',
        'Private Elevator Landing',
        'Concierge & Valet Service',
        'Spa & Sauna Wellness Suite',
        'Helipad Access',
        'Wine Cellar & Cigar Lounge',
        'Smart Home IoT Automation',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      ]),
      viewsCount: 780,
      enquiriesCount: 42,
      orgId: builderOrg.id,
      userId: builderUser.id,
    },
  });

  const prop3 = await prisma.property.create({
    data: {
      title: 'Heritage Gardenia 2BHK Smart Apartment',
      slug: 'heritage-gardenia-2bhk-smart-apartment-mohali',
      description: 'Affordable luxury designed for young professionals and small families. Located in Mohali Sector 82 adjoining upcoming aero commercial hub. Includes modular fittings, wooden bedroom floors, and close proximity to Fortis Hospital and Ryan International School.',
      propertyType: 'APARTMENT',
      listingType: 'SALE',
      price: 5800000, // ₹58 Lakhs
      pricePerSqFt: 4833,
      maintenanceFees: 2400,
      bedrooms: 2,
      bathrooms: 2,
      balconies: 2,
      carpetAreaSqFt: 980,
      superBuiltUpSqFt: 1200,
      furnishing: 'SEMI_FURNISHED',
      parkingSpaces: 1,
      floorNo: 4,
      totalFloors: 11,
      facing: 'NORTH',
      possessionStatus: 'READY_TO_MOVE',
      ageOfProperty: 0,
      address: 'Tower Magnolia, Heritage Gardenia, Sector 82',
      localityName: 'Sector 82 IT City',
      city: 'Mohali',
      state: 'Punjab',
      pinCode: '140306',
      reraId: 'PBRERA-SAS80-PR0499',
      truthScore: 91,
      truthScoreDetails: JSON.stringify({
        agentIdentityVerified: true,
        reraOfficialCheck: 'VERIFIED_ACTIVE',
        ownershipTitleAudit: 'CLEAR_RECORD_2026',
        physicalInspectionAudit: 'VERIFIED_ON_SITE',
        completenessScore: 95,
        priceBenchmark: 'COMPETITIVE_BEST_VALUE',
      }),
      isVerified: true,
      isFeatured: false,
      status: 'AVAILABLE',
      amenities: JSON.stringify([
        'Badminton Court',
        'Jogging Track',
        'Childrens Play Park',
        'CCTV Surveillance',
        'Power Backup',
        'Intercom Facility',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      ]),
      viewsCount: 521,
      enquiriesCount: 29,
      orgId: agentOrg.id,
      userId: agentUser.id,
    },
  });

  const prop4 = await prisma.property.create({
    data: {
      title: 'Boutique 3BHK Penthouse with Private Terrace in Indiranagar',
      slug: 'boutique-3bhk-penthouse-indiranagar-bangalore',
      description: 'Exclusive standalone floor residence situated on a quiet cul-de-sac off 100 Feet Road, Indiranagar. Features teakwood paneling, landscaped private rooftop patio, Italian kitchen with Miele appliances, and automated solar water heating.',
      propertyType: 'PENTHOUSE',
      listingType: 'RENT',
      price: 95000, // ₹95,000 / month
      pricePerSqFt: 43,
      maintenanceFees: 6000,
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      carpetAreaSqFt: 2200,
      superBuiltUpSqFt: 2600,
      furnishing: 'FULLY_FURNISHED',
      parkingSpaces: 2,
      floorNo: 3,
      totalFloors: 3,
      facing: 'EAST',
      possessionStatus: 'READY_TO_MOVE',
      ageOfProperty: 3,
      address: '14th Main, HAL 2nd Stage, Indiranagar',
      localityName: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560038',
      reraId: 'EXEMPT_STANDALONE_EXISTING',
      truthScore: 89,
      truthScoreDetails: JSON.stringify({
        agentIdentityVerified: true,
        reraOfficialCheck: 'VERIFIED_STANDALONE',
        ownershipTitleAudit: 'VERIFIED_OWNER_ID',
        physicalInspectionAudit: 'VERIFIED_ON_SITE',
        completenessScore: 92,
        priceBenchmark: 'MARKET_RENTAL_INDEX_STANDARD',
      }),
      isVerified: true,
      isFeatured: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify([
        'Private Landscaped Terrace',
        'Dedicated Covered Parking',
        'Full Power Backup',
        'Smart Lock Access',
        'Solar Water Heater',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      ]),
      viewsCount: 410,
      enquiriesCount: 22,
      orgId: agentOrg.id,
      userId: agentUser.id,
    },
  });

  const prop5 = await prisma.property.create({
    data: {
      title: 'Bandra Seaside Boulevard 4BHK Sea-Facing Villa',
      slug: 'bandra-seaside-boulevard-4bhk-sea-facing-villa-mumbai',
      description: 'Ultra-exclusive coastal estate located along Carter Road, Bandra West. Commanding direct views of the Arabian Sea with private plunge pool, Portuguese-inspired courtyards, subterranean home theater, and bulletproof acoustic glass insulation.',
      propertyType: 'VILLA',
      listingType: 'SALE',
      price: 320000000, // ₹32 Crore
      pricePerSqFt: 64000,
      maintenanceFees: 45000,
      bedrooms: 4,
      bathrooms: 6,
      balconies: 5,
      carpetAreaSqFt: 5000,
      superBuiltUpSqFt: 6200,
      furnishing: 'FULLY_FURNISHED',
      parkingSpaces: 4,
      floorNo: 1,
      totalFloors: 3,
      facing: 'WEST',
      possessionStatus: 'READY_TO_MOVE',
      ageOfProperty: 1,
      address: 'Carter Road, Bandra West',
      localityName: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050',
      reraId: 'P51800029311',
      truthScore: 99,
      truthScoreDetails: JSON.stringify({
        agentIdentityVerified: true,
        reraOfficialCheck: 'VERIFIED_ACTIVE',
        ownershipTitleAudit: 'HIGH_COURT_SEARCH_CLEAR',
        physicalInspectionAudit: 'VERIFIED_ON_SITE',
        completenessScore: 100,
        priceBenchmark: 'PRIME_COASTAL_BENCHMARK',
      }),
      isVerified: true,
      isFeatured: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify([
        'Direct Arabian Sea View',
        'Private Swimming Pool',
        'Home Cinema Room',
        'Private Garden Courtyard',
        'Staff Quarters',
        'Biometric Smart Security',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ]),
      viewsCount: 1140,
      enquiriesCount: 15,
      orgId: builderOrg.id,
      userId: builderUser.id,
    },
  });

  const prop6 = await prisma.property.create({
    data: {
      title: 'Cyber Towers Grade-A Commercial IT Office Space',
      slug: 'cyber-towers-grade-a-commercial-it-office-space-hyderabad',
      description: 'Pre-leased institutional-grade IT office floor in Gachibowli Financial District. Leased to a multinational SaaS firm on a 9-year lease with 15% escalation every 3 years. Immediate rental yield of 8.9% per annum with zero vacancy risk.',
      propertyType: 'COMMERCIAL',
      listingType: 'SALE',
      price: 65000000, // ₹6.5 Crore
      pricePerSqFt: 10000,
      maintenanceFees: 15000,
      carpetAreaSqFt: 6500,
      superBuiltUpSqFt: 8500,
      furnishing: 'FULLY_FURNISHED',
      parkingSpaces: 10,
      floorNo: 7,
      totalFloors: 18,
      facing: 'NORTH_EAST',
      possessionStatus: 'READY_TO_MOVE',
      ageOfProperty: 3,
      address: 'Tower 3, Cyber Gateway Park, Gachibowli',
      localityName: 'Gachibowli Financial District',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500032',
      reraId: 'P02400001844',
      truthScore: 96,
      truthScoreDetails: JSON.stringify({
        agentIdentityVerified: true,
        reraOfficialCheck: 'VERIFIED_ACTIVE',
        ownershipTitleAudit: 'COMMERCIAL_TITLE_DUE_DILIGENCE_CLEAR',
        physicalInspectionAudit: 'VERIFIED_ON_SITE',
        completenessScore: 97,
        priceBenchmark: 'INSTITUTIONAL_YIELD_APPROVED',
      }),
      isVerified: true,
      isFeatured: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify([
        'Central Chilled Water HVAC',
        '24/7 Redundant Optical Fiber Lines',
        '100% Dual Grid Power Backup',
        'Multi-Level Car Parking',
        'Food Court & Executive Cafeteria',
        'NFPA Compliant Fire Fighting System',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      ]),
      viewsCount: 680,
      enquiriesCount: 31,
      orgId: agentOrg.id,
      userId: agentUser.id,
    },
  });

  // 6. Truth Score Audits
  await prisma.truthScoreAudit.create({
    data: {
      propertyId: prop1.id,
      identityVerified: true,
      reraVerified: true,
      ownershipVerified: true,
      physicalVerification: true,
      documentCompletenessScore: 98,
      priceBenchmarkingScore: 92,
      auditedBy: 'EstateOS Certified Land Registry Cell',
      auditNotes: 'All 7 encumbrance certificates verified from SAS Nagar sub-registrar portal. RERA certificate verified active through PBRERA public registry.',
      disclaimer: 'Verification represents documentary and field review conducted by EstateOS. It does not replace independent judicial title litigation counsel.',
    },
  });

  // 7. CRM Leads
  await prisma.lead.create({
    data: {
      orgId: agentOrg.id,
      propertyId: prop1.id,
      name: 'Dr. Amitav Banerjee',
      email: 'amitav.banerjee@apollo.in',
      phone: '+91 98761 11222',
      status: 'QUALIFIED',
      source: 'PORTAL',
      budgetMin: 8500000,
      budgetMax: 10000000,
      notes: 'Doctor at Apollo Mohali looking for immediate handover 3BHK flat near Airport road. Approved SBI home loan pre-sanction.',
      assignedToId: agentUser.id,
    },
  });

  await prisma.lead.create({
    data: {
      orgId: agentOrg.id,
      propertyId: prop3.id,
      name: 'Siddharth Chadha',
      email: 'siddharth@infosys.com',
      phone: '+91 97812 34567',
      status: 'SITE_VISIT_SCHEDULED',
      source: 'WHATSAPP',
      budgetMin: 5000000,
      budgetMax: 6500000,
      notes: 'Lead requested Saturday 11:30 AM visit with family. Interested in tower Magnolia 4th floor.',
      assignedToId: agentUser.id,
    },
  });

  await prisma.lead.create({
    data: {
      orgId: builderOrg.id,
      propertyId: prop2.id,
      name: 'Manish Goyal',
      email: 'manish.goyal@capitalpartners.com',
      phone: '+91 99100 44556',
      status: 'NEGOTIATING',
      source: 'DIRECT',
      budgetMin: 45000000,
      budgetMax: 50000000,
      notes: 'HNW investor negotiating custom penthouse layout adjustments and payment plan tied to milestone delivery.',
      assignedToId: builderUser.id,
    },
  });

  // 8. Appointments
  const visitDate = new Date();
  visitDate.setDate(visitDate.getDate() + 2);

  await prisma.appointment.create({
    data: {
      propertyId: prop1.id,
      userId: buyerUser.id,
      visitorName: 'Priya Sundaram',
      visitorPhone: '+91 91234 56789',
      visitorEmail: 'buyer@estateos.com',
      scheduledDate: visitDate,
      timeSlot: '11:00 AM - 12:00 PM',
      status: 'CONFIRMED',
      notes: 'Customer requested inspection of high floor balconies and EV parking slots.',
    },
  });

  // 9. Saved Properties
  await prisma.savedProperty.create({
    data: {
      userId: buyerUser.id,
      propertyId: prop1.id,
    },
  });

  await prisma.savedProperty.create({
    data: {
      userId: buyerUser.id,
      propertyId: prop2.id,
    },
  });

  // 10. Real Estate Content Portal (Articles for SEO & AdSense readiness)
  await prisma.article.create({
    data: {
      title: 'How to Check RERA Registered Properties Online in India: Official 2026 Guide',
      slug: 'how-to-check-rera-registered-properties-online-india-2026',
      excerpt: 'Avoid unapproved builders and project delays by understanding the state-wise RERA verification process, carpet area formulas, and title verification rules.',
      category: 'RERA & Legal',
      tags: 'RERA, Legal, Property Buying, Home Inspection, India Real Estate',
      authorName: 'Adv. Meenakshi Sundaram (Real Estate Regulatory Council)',
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      readTimeMinutes: 7,
      viewsCount: 3890,
      content: `The Real Estate (Regulation and Development) Act (RERA) 2016 transformed Indian property buying by replacing opaque promises with legally binding project timelines and escrow transparency.

### Why Every Buyer Must Audit RERA Registration Before Token Payment

Before signing an Expression of Interest (EOI) or parting with any earnest booking money, verifying the developer's registered project page on the state RERA portal is an indispensable safeguard.

1. **Escrow Account Safeguards**: RERA mandates that 70% of investor receivables must be kept in a dedicated schedule bank escrow account solely disbursed for construction and land expenditure.
2. **Standardized Carpet Area**: Developers are forbidden from charging based on ambiguous "super built-up area" multiples without clearly defining usable internal net carpet area.
3. **5-Year Structural Defect Warranty**: Builders are legally required to rectify structural defects without additional fees for five years following possession.

### Step-by-Step State RERA Verification
- **Maharashtra (MahaRERA)**: Visit maharera.maharashtra.gov.in -> Registered Projects -> Search by Project Name or Registration Number.
- **Punjab (PBRERA)**: Navigate to rera.punjab.gov.in -> Search Registered Projects -> Check quarter-by-quarter financial progress updates.
- **Haryana (HRERA Gurugram & Panchkula)**: Access haryanarera.gov.in to confirm bank account details and building sanction approvals.

By combining RERA verification with the **EstateOS Property Truth Score**, buyers benefit from automated registry cross-matching that flags unverified marketing claims before legal commitments are made.`,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Mohali vs New Chandigarh: Real Estate Capital Appreciation & ROI Analysis',
      slug: 'mohali-vs-new-chandigarh-real-estate-roi-analysis',
      excerpt: 'A comprehensive empirical comparison of rental yields, connectivity, upcoming IT corridors, and 5-year capital appreciation trends in the Tri-city area.',
      category: 'Investment',
      tags: 'Mohali, New Chandigarh, IT City, Capital Gains, Rental Yield',
      authorName: 'EstateOS Intelligence Desk',
      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      readTimeMinutes: 6,
      viewsCount: 5120,
      content: `The Chandigarh Capital Region (CCR), specifically Mohali and New Chandigarh (Mullanpur), represents one of North India\'s fastest-growing residential and commercial corridors.

### Key Growth Drivers: Mohali IT City (Sector 82 & 83)
- **Direct Airport Highway**: 15 minutes transit to Shaheed Bhagat Singh International Airport.
- **Institutional Anchor Tenants**: Presence of Infosys campus, Plaksha University, Ashoka University campus, and Indian School of Business (ISB).
- **Rental Yield Advantage**: Mohali IT City delivers rental yields between 4.5% to 5.2%, significantly higher than standard residential metro averages of 2.8% to 3.2%.

### New Chandigarh (Mullanpur) Corridor
- **Luxury Townships**: Expansive horizontal developments, low-density villas, and green hill views adjoining Shivalik foothills.
- **Healthcare & Education**: Homi Bhabha Cancer Hospital & Research Centre acts as an institutional anchor.
- **Capital Appreciation Trajectory**: Higher long-term land value appreciation, suited for generational wealth preservation.

Explore our interactive Locality Intelligence tool on EstateOS to compare micro-market trends in real time.`,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Home Loan Tax Deductions: Maximizing Sections 80C, 24(b) & 80EEA in 2026',
      slug: 'home-loan-tax-deductions-section-80c-24b-80eea-guide',
      excerpt: 'Learn how salaried professionals can save up to ₹3.5 Lakh annually in income tax through smart home loan structuring and joint ownership benefits.',
      category: 'Home Loans',
      tags: 'Home Loans, Income Tax, EMI, Financial Planning, India Tax',
      authorName: 'CA Rajesh Aggarwal (Senior Tax Strategist)',
      coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      readTimeMinutes: 8,
      viewsCount: 6730,
      content: `Securing a residential home loan in India is not merely a bridge to property ownership—it remains one of the most powerful tax optimization strategies available under the Income Tax Act.

### 1. Principal Repayment Deduction: Section 80C
- **Maximum Limit**: Up to ₹1,50,000 per financial year.
- **Eligibility Condition**: The property must not be sold within 5 years of possession; otherwise, tax benefits are reversed.

### 2. Interest Repayment Deduction: Section 24(b)
- **Self-Occupied Residential Property**: Deduction capped at ₹2,00,000 per financial year.
- **Let-Out (Rented) Property**: The entire interest paid during the fiscal year can be deducted from gross rental income, subject to standard set-off caps against other heads of income.

### Joint Home Loan Optimization Strategy
When spouses co-own the property and co-borrow the loan, each borrower can independently claim ₹1.5 Lakh under 80C and ₹2.0 Lakh under 24(b), doubling family tax savings to ₹7 Lakh annually.

Use our real-time **EstateOS Home Loan Eligibility and EMI Calculator** to simulate customized repayment schedules with interest-principal breakdowns.`,
    },
  });

  // 11. Payments & Invoices
  await prisma.payment.create({
    data: {
      orgId: agentOrg.id,
      amount: 1499,
      currency: 'INR',
      status: 'SUCCESS',
      invoiceNo: 'INV-2026-0891',
      planName: 'Professional Plan (Monthly)',
      razorpayPaymentId: 'pay_Live_9918237192',
    },
  });

  await prisma.payment.create({
    data: {
      orgId: builderOrg.id,
      amount: 29990,
      currency: 'INR',
      status: 'SUCCESS',
      invoiceNo: 'INV-2026-0892',
      planName: 'Business Plan (Annual)',
      razorpayPaymentId: 'pay_Live_7731928371',
    },
  });

  console.log('Seed completed successfully!');
  console.log('Default credentials:');
  console.log('Admin: admin@estateos.com / admin123');
  console.log('Agent: agent@estateos.com / agent123');
  console.log('Builder: builder@estateos.com / builder123');
  console.log('Buyer: buyer@estateos.com / buyer123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
