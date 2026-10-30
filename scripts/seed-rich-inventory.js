const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NEW_PROPERTIES = [
  // 1. Gurugram - DLF The Arbour
  {
    title: 'DLF The Arbour 4BHK Ultra-Luxury High-Rise Residence',
    slug: 'dlf-the-arbour-4bhk-luxury-sector-63-gurugram',
    description: 'DLF The Arbour in Sector 63, Gurugram, sets a new benchmark in luxury. Low-density enclave on Golf Course Extension Road with 85% open verdant greens, double-height entrance lobbies, private elevator zones, and state-of-the-art air purification systems.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 78000000, // ₹7.8 Cr
    pricePerSqFt: 19746,
    maintenanceFees: 18000,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 4,
    carpetAreaSqFt: 3150,
    superBuiltUpSqFt: 3950,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 3,
    floorNo: 16,
    totalFloors: 39,
    facing: 'NORTH_EAST',
    possessionStatus: 'UNDER_CONSTRUCTION',
    ageOfProperty: 0,
    address: 'Tower Cedar, DLF The Arbour, Sector 63',
    localityName: 'Golf Course Extension Road',
    city: 'Gurugram',
    state: 'Haryana',
    pinCode: '122102',
    latitude: 28.4022,
    longitude: 77.0784,
    reraId: 'HRERA-PKL-GGM-1445-2023',
    truthScore: 96,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Olympic-Length Temperature Controlled Pool',
      'Concierge Butler Service',
      'Private High-Speed Elevator',
      'Bespoke Cigar Lounge & Wine Cellar',
      'EV Supercharging Stalls',
      '3-Tier Biometric Facial Recognition'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 842,
    enquiriesCount: 31,
  },

  // 2. Gurugram - M3M Golfestate
  {
    title: 'M3M Golfestate 3BHK Fairway Residence',
    slug: 'm3m-golfestate-3bhk-fairway-residence-gurugram',
    description: 'Impeccable golf-course facing suites on Golf Course Extension Road. Expansive balconies overlooking a 9-hole executive golf course. Includes private pool lounge access, world-class club, and quick jump to Cyber City.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 43500000, // ₹4.35 Cr
    pricePerSqFt: 14500,
    maintenanceFees: 12500,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    carpetAreaSqFt: 2400,
    superBuiltUpSqFt: 3000,
    furnishing: 'FULLY_FURNISHED',
    parkingSpaces: 2,
    floorNo: 11,
    totalFloors: 25,
    facing: 'EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 2,
    address: 'Fairway West Tower, M3M Golfestate, Sector 65',
    localityName: 'Golf Course Extension Road',
    city: 'Gurugram',
    state: 'Haryana',
    pinCode: '122018',
    latitude: 28.4095,
    longitude: 77.0671,
    reraId: 'HRERA-PKL-GGM-882-2018',
    truthScore: 93,
    isVerified: true,
    isFeatured: true,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      '9-Hole Executive Golf Course View',
      'Rooftop Infinity Lap Pool',
      'Tennis & Squash Academies',
      'VR Gaming Zone & Private Theatre',
      'Fine-Dining Al-Fresco Restaurant'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 520,
    enquiriesCount: 19,
  },

  // 3. Mohali - Homeland Regalia
  {
    title: 'Homeland Regalia 4BHK Presidential Suite',
    slug: 'homeland-regalia-4bhk-presidential-suite-mohali',
    description: 'The golden standard of luxury in Greater Mohali Sector 77. Features automated Italian modular kitchen, wrap-around sunset sundeck, high-ceiling master suite with walk-in closet, and 5-tier security.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 28500000, // ₹2.85 Cr
    pricePerSqFt: 8142,
    maintenanceFees: 6500,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 4,
    carpetAreaSqFt: 2800,
    superBuiltUpSqFt: 3500,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 2,
    floorNo: 14,
    totalFloors: 22,
    facing: 'NORTH',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 1,
    address: 'Block Imperial, Homeland Regalia, Sector 77',
    localityName: 'Sector 77 Mohali',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '160071',
    latitude: 30.6865,
    longitude: 76.7185,
    reraId: 'PBRERA-SAS80-PR0391',
    truthScore: 95,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Sky Lounge on 22nd Floor',
      'Heated Indoor Lap Pool',
      'Squash Court & Bowling Alley',
      'Covered Multi-Level Basements',
      'EV Car Charging Station'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 680,
    enquiriesCount: 27,
  },

  // 4. Mohali - Marbella Grand
  {
    title: 'Marbella Grand 3BHK Earth & Sky Luxury Home',
    slug: 'marbella-grand-3bhk-luxury-home-sector-82-mohali',
    description: 'Located in the nerve center of IT City Mohali, Marbella Grand delivers Mediterranean architectural elegance. Direct access to International Airport Road, Spanish clubhouse, and lush central boulevard.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 13500000, // ₹1.35 Cr
    pricePerSqFt: 6428,
    maintenanceFees: 4500,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    carpetAreaSqFt: 1700,
    superBuiltUpSqFt: 2100,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 2,
    floorNo: 9,
    totalFloors: 19,
    facing: 'NORTH_EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 1,
    address: 'Tower Valencia, Marbella Grand, Sector 82A, IT City',
    localityName: 'Sector 82 IT City',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '140306',
    latitude: 30.6621,
    longitude: 76.7389,
    reraId: 'PBRERA-SAS80-PR0488',
    truthScore: 94,
    isVerified: true,
    isFeatured: false,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Spanish Lifestyle Clubhouse',
      'Open-Air Amphitheatre',
      'Jogging & Cycling Track',
      'Children Adventure Park',
      'Pharmacy & Convenience Mart'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 410,
    enquiriesCount: 16,
  },

  // 5. Mohali - Falcon View
  {
    title: 'JLPL Falcon View 3BHK Premium High-Rise',
    slug: 'jlpl-falcon-view-3bhk-sector-66a-mohali',
    description: 'Strategically positioned in Sector 66A right adjoining Chandigarh. 16 acres of lush landscaped podium, uninterrupted panoramic Shivalik mountain vistas, and world-class sports facilities.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 16500000, // ₹1.65 Cr
    pricePerSqFt: 6653,
    maintenanceFees: 4800,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    carpetAreaSqFt: 1980,
    superBuiltUpSqFt: 2480,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 2,
    floorNo: 12,
    totalFloors: 16,
    facing: 'NORTH',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 3,
    address: 'Tower A3, JLPL Falcon View, Sector 66A',
    localityName: 'Sector 66A Mohali',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '160062',
    latitude: 30.6811,
    longitude: 76.7452,
    reraId: 'PBRERA-SAS80-PR0112',
    truthScore: 92,
    isVerified: true,
    isFeatured: false,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Panoramic Shivalik Views',
      'Swimming Pool with Kids Splash',
      'Gymnasium & Aerobics Studio',
      'Piped Natural Gas (PNG)',
      '100% Power Backup'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 380,
    enquiriesCount: 14,
  },

  // 6. New Chandigarh - Omaxe The Lake
  {
    title: 'Omaxe The Lake 3BHK Waterfront Penthouse',
    slug: 'omaxe-the-lake-3bhk-waterfront-penthouse-new-chandigarh',
    description: 'Waterfront living in New Chandigarh (Mullanpur). 25-acre township centered around artificial lakes and water bodies, offering private rooftop terrace, Jacuzzi, and unobstructed views of the Shivalik range.',
    propertyType: 'PENTHOUSE',
    listingType: 'SALE',
    price: 24500000, // ₹2.45 Cr
    pricePerSqFt: 7852,
    maintenanceFees: 6200,
    bedrooms: 3,
    bathrooms: 4,
    balconies: 3,
    carpetAreaSqFt: 2450,
    superBuiltUpSqFt: 3120,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 2,
    floorNo: 21,
    totalFloors: 21,
    facing: 'EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 2,
    address: 'Tower Victoria, Omaxe The Lake, New Chandigarh',
    localityName: 'New Chandigarh Mullanpur',
    city: 'Chandigarh',
    state: 'Punjab',
    pinCode: '140901',
    latitude: 30.7958,
    longitude: 76.7112,
    reraId: 'PBRERA-SAS80-PR0045',
    truthScore: 93,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Waterfront Artificial Lake Views',
      'Private Terrace Jacuzzi',
      'Floating Club & Restaurant',
      'Tennis & Cricket Practice Nets',
      'Eco-Friendly Solar Lighting'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 560,
    enquiriesCount: 22,
  },

  // 7. Noida - ATS Knightsbridge
  {
    title: 'ATS Knightsbridge 4BHK Grand Manor at Sector 124',
    slug: 'ats-knightsbridge-4bhk-grand-manor-sector-124-noida',
    description: 'Iconic twin skyscraper towers towering over the Yamuna River and Delhi border. Single apartment per floor, 12-ft ceiling heights, private elevator lobby, and ultra-high acoustic insulation.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 115000000, // ₹11.5 Cr
    pricePerSqFt: 19166,
    maintenanceFees: 24000,
    bedrooms: 4,
    bathrooms: 6,
    balconies: 4,
    carpetAreaSqFt: 4800,
    superBuiltUpSqFt: 6000,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 4,
    floorNo: 27,
    totalFloors: 47,
    facing: 'NORTH_EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 1,
    address: 'Tower A, ATS Knightsbridge, Sector 124',
    localityName: 'Sector 124 Noida Expressway',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pinCode: '201301',
    latitude: 28.5441,
    longitude: 77.3325,
    reraId: 'UPRERAPRJ3574',
    truthScore: 97,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      '1 Apartment Per Floor Architecture',
      'Private Dedicated Elevators',
      'Temperature Regulated Indoor Pool',
      'Helipad Access',
      'Sub-Zero & Wolf Fitted Gourmet Kitchen',
      '24/7 Diplomatic Grade Security'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 920,
    enquiriesCount: 42,
  },

  // 8. Noida - Gulshan Dynasty
  {
    title: 'Gulshan Dynasty 4BHK Wellness Luxury Residence',
    slug: 'gulshan-dynasty-4bhk-wellness-sector-144-noida',
    description: 'Noida\'s first platinum-certified green luxury residence. Built on Sector 144 Noida Expressway, equipped with hydroponic organic farming, oxygen-boosted clubhouse, and dedicated pet care sanctuary.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 62000000, // ₹6.2 Cr
    pricePerSqFt: 13191,
    maintenanceFees: 14000,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    carpetAreaSqFt: 3600,
    superBuiltUpSqFt: 4700,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 3,
    floorNo: 18,
    totalFloors: 34,
    facing: 'EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 1,
    address: 'Tower Imperial, Gulshan Dynasty, Sector 144',
    localityName: 'Sector 144 Noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pinCode: '201306',
    latitude: 28.4891,
    longitude: 77.4215,
    reraId: 'UPRERAPRJ9588',
    truthScore: 95,
    isVerified: true,
    isFeatured: true,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Platinum Certified Green Architecture',
      'Hydroponic Farm & Herb Gardens',
      'Oxygen-Enriched Clubhouse',
      'On-Site Diagnostic Healthcare Clinic',
      'Dedicated Pet Grooming Care Area'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 460,
    enquiriesCount: 18,
  },

  // 9. Delhi - Vasant Vihar Villa
  {
    title: 'Vasant Vihar Sovereign 5BHK Diplomatic Villa',
    slug: 'vasant-vihar-sovereign-5bhk-diplomatic-villa-delhi',
    description: 'Prestigious independent bungalow nestled on a 600 sq. yard freehold plot in South Delhi\'s elite enclave. Features private manicured lawns, basement home theatre, heated pool, and separate staff quarters.',
    propertyType: 'VILLA',
    listingType: 'SALE',
    price: 420000000, // ₹42 Cr
    pricePerSqFt: 64615,
    maintenanceFees: 0,
    bedrooms: 5,
    bathrooms: 7,
    balconies: 5,
    carpetAreaSqFt: 5400,
    superBuiltUpSqFt: 6500,
    furnishing: 'FULLY_FURNISHED',
    parkingSpaces: 5,
    floorNo: 1,
    totalFloors: 3,
    facing: 'NORTH_EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 4,
    address: 'Block E, Vasant Vihar',
    localityName: 'Vasant Vihar South Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pinCode: '110057',
    latitude: 28.5614,
    longitude: 77.1611,
    reraId: 'DLRERA-VV-2022-09',
    truthScore: 98,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Private Heated Swimming Pool',
      'Private 8-Car Driveway & Basements',
      'Dolby Atmos 12-Seater Private Cinema',
      'Otis Internal Glass Hydraulic Lift',
      'Perimeter Infrared Security & CCTV',
      'Separate Driver & Domestic Quarters'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 1420,
    enquiriesCount: 54,
  },

  // 10. Bangalore - Total Environment
  {
    title: 'Total Environment In That Quiet Earth 3BHK Earth Home',
    slug: 'total-environment-3bhk-earth-home-hennur-bangalore',
    description: 'Iconic handcrafted architecture by Total Environment on Hennur Main Road. Features terrace gardens with natural timber decking, exposed wire-cut red brickwork, and imported Italian cabinetry.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 31500000, // ₹3.15 Cr
    pricePerSqFt: 11052,
    maintenanceFees: 8500,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 2250,
    superBuiltUpSqFt: 2850,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 2,
    floorNo: 6,
    totalFloors: 14,
    facing: 'EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 2,
    address: 'Tower Towering Green, Off Hennur Main Road',
    localityName: 'Hennur Road Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pinCode: '560077',
    latitude: 13.0645,
    longitude: 77.6521,
    reraId: 'PRM/KA/RERA/1251/446/PR/180507/001650',
    truthScore: 94,
    isVerified: true,
    isFeatured: true,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Private Terrace Garden with Drip Irrigation',
      'Handcrafted Exposed Brick Finish',
      'Bio-Pond & Forest Trail Walkway',
      'Squash & Badminton Courts',
      'Central RO Water Purifying Grid'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 610,
    enquiriesCount: 23,
  },

  // 11. Bangalore - Commercial Tech Hub
  {
    title: 'Prestige Tech Pacific Grade-A IT Floor',
    slug: 'prestige-tech-pacific-grade-a-it-floor-outer-ring-road-bangalore',
    description: 'Fully furnished, enterprise grade IT office plate with 120 workstations, 4 executive boardrooms, and cafeteria. Leased to multinational tech tenant yielding 8.2% annual net capitalization yield.',
    propertyType: 'COMMERCIAL',
    listingType: 'SALE',
    price: 145000000, // ₹14.5 Cr
    pricePerSqFt: 14500,
    maintenanceFees: 35000,
    bedrooms: 0,
    bathrooms: 6,
    balconies: 0,
    carpetAreaSqFt: 8500,
    superBuiltUpSqFt: 10000,
    furnishing: 'FULLY_FURNISHED',
    parkingSpaces: 12,
    floorNo: 4,
    totalFloors: 11,
    facing: 'NORTH',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 3,
    address: 'Wing B, Prestige Tech Pacific, Marathahalli Outer Ring Road',
    localityName: 'Outer Ring Road Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pinCode: '560103',
    latitude: 12.9372,
    longitude: 77.6925,
    reraId: 'PRM/KA/RERA/1251/308/PR/171015/000452',
    truthScore: 96,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      '100% Redundant DG Generator Backup',
      'Dual Substation HT Power Grid',
      'Central VRV High-Efficiency Air Conditioning',
      'BMS Automated Building System',
      'Grade-A Fire Suppressant Sprinklers'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 880,
    enquiriesCount: 39,
  },

  // 12. Mumbai - Lodha World One Penthouse
  {
    title: 'Lodha World One 4BHK Sky Mansion at Lower Parel',
    slug: 'lodha-world-one-4bhk-sky-mansion-lower-parel-mumbai',
    description: 'Soar above South Mumbai in India\'s most iconic skyscraper tower. Designed by Armani/Casa, commanding 360-degree Arabian Sea and Mahalaxmi Racecourse views with private observatory terrace.',
    propertyType: 'PENTHOUSE',
    listingType: 'SALE',
    price: 360000000, // ₹36 Cr
    pricePerSqFt: 60000,
    maintenanceFees: 48000,
    bedrooms: 4,
    bathrooms: 6,
    balconies: 3,
    carpetAreaSqFt: 4600,
    superBuiltUpSqFt: 6000,
    furnishing: 'FULLY_FURNISHED',
    parkingSpaces: 4,
    floorNo: 62,
    totalFloors: 76,
    facing: 'WEST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 3,
    address: 'Floor 62, Lodha World One, Senapati Bapat Marg, Lower Parel',
    localityName: 'Lower Parel South Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400013',
    latitude: 18.9958,
    longitude: 72.8288,
    reraId: 'P51900008962',
    truthScore: 97,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Armani/Casa Designed Sky Suite',
      'Private High-Altitude Heated Jacuzzi',
      '360-Degree Arabian Sea Panorama',
      'Resident Helicopter Pad Access',
      'St. Moritz Spa & Private Screening Theatre'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 1950,
    enquiriesCount: 62,
  },

  // 13. Mumbai - Luxury Bandra Sea-Facing Rental
  {
    title: 'Carter Road 3BHK Waterfront Designer Residence',
    slug: 'carter-road-3bhk-waterfront-designer-residence-bandra-mumbai',
    description: 'Turnkey luxury rental on premier Carter Road promenade. Floor-to-ceiling glass capturing sunset waves, Italian leather furnishings, and dedicated valet parking.',
    propertyType: 'APARTMENT',
    listingType: 'RENT',
    price: 380000, // ₹3.8 Lakh / mo
    pricePerSqFt: 180,
    maintenanceFees: 20000,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 1850,
    superBuiltUpSqFt: 2100,
    furnishing: 'FULLY_FURNISHED',
    parkingSpaces: 2,
    floorNo: 8,
    totalFloors: 14,
    facing: 'WEST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 2,
    address: 'Blue Horizon, Carter Road, Bandra West',
    localityName: 'Bandra West Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400050',
    latitude: 19.0682,
    longitude: 72.8245,
    reraId: 'P51800031890',
    truthScore: 95,
    isVerified: true,
    isFeatured: true,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Direct Arabian Sea Sunset View',
      'Fully Furnished Designer Interiors',
      'Valet Parking & 24/7 Concierge Desk',
      'High-Speed Fibre Internet Grid',
      'Rooftop Fitness Studio'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 780,
    enquiriesCount: 35,
  },

  // 14. Mohali - Sector 82 Commercial Retail Showroom
  {
    title: 'IT City Central Boulevard Grade-A SCO Commercial Showroom',
    slug: 'it-city-central-boulevard-sco-showroom-mohali',
    description: 'Triple-storey commercial SCO building (Basement + Ground + 2 Floors) with 100% frontage on 200-ft PR-7 Airport Road. Ideal for multinational bank, luxury car showroom, or flagship retail.',
    propertyType: 'COMMERCIAL',
    listingType: 'SALE',
    price: 48000000, // ₹4.8 Cr
    pricePerSqFt: 9600,
    maintenanceFees: 12000,
    bedrooms: 0,
    bathrooms: 4,
    balconies: 0,
    carpetAreaSqFt: 3800,
    superBuiltUpSqFt: 5000,
    furnishing: 'UNFURNISHED',
    parkingSpaces: 6,
    floorNo: 1,
    totalFloors: 3,
    facing: 'NORTH',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 1,
    address: 'SCO 42-43, Central Boulevard, Sector 82 IT City',
    localityName: 'Sector 82 IT City',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '140306',
    latitude: 30.6598,
    longitude: 76.7312,
    reraId: 'PBRERA-SAS80-PR0719',
    truthScore: 93,
    isVerified: true,
    isFeatured: false,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      '200-Ft Airport Road Main Frontage',
      'Basement Private Storage & Parking',
      'Provision for High-Speed Capsule Glass Lift',
      'Dedicated Transformer Substation',
      'Ample Surface Visitor Car Parking'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 490,
    enquiriesCount: 28,
  },

  // 15. Gurugram - Trump Towers
  {
    title: 'Trump Towers Delhi NCR 4BHK Signature Glass Residence',
    slug: 'trump-towers-4bhk-signature-glass-sector-69-gurugram',
    description: 'Iconic all-glass silhouette dominating the NCR skyline. Double-height living rooms with 22-foot ceilings, temperature-controlled infinity edge pool, 24/7 Trump white-glove valet, and private dining hall.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 95000000, // ₹9.5 Cr
    pricePerSqFt: 21111,
    maintenanceFees: 22000,
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    carpetAreaSqFt: 3600,
    superBuiltUpSqFt: 4500,
    furnishing: 'SEMI_FURNISHED',
    parkingSpaces: 3,
    floorNo: 32,
    totalFloors: 47,
    facing: 'NORTH_EAST',
    possessionStatus: 'READY_TO_MOVE',
    ageOfProperty: 1,
    address: 'East Tower, Trump Towers Delhi NCR, Sector 69',
    localityName: 'Golf Course Extension Road',
    city: 'Gurugram',
    state: 'Haryana',
    pinCode: '122101',
    latitude: 28.3995,
    longitude: 77.0345,
    reraId: 'HRERA-PKL-GGM-112-2018',
    truthScore: 97,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Trump White-Glove Global Concierge',
      '22-Ft Double-Height Cathedral Living Room',
      'Temperature Controlled Glass Infinity Pool',
      'Private Sommelier Wine Tasting Room',
      'Chauffeur Rest Lounge & Car Spa'
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]),
    viewsCount: 1650,
    enquiriesCount: 58,
  }
];

async function seedRichInventory() {
  console.log('Seeding 15 additional ultra-luxury properties into Supabase PostgreSQL...');
  
  // Find an existing agent or builder user to link
  const agentUser = await prisma.user.findFirst({
    where: { role: 'AGENT' }
  });
  const org = await prisma.organization.findFirst();

  let addedCount = 0;
  for (const item of NEW_PROPERTIES) {
    const existing = await prisma.property.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      await prisma.property.create({
        data: {
          ...item,
          userId: agentUser ? agentUser.id : null,
          orgId: org ? org.id : null,
          truthScoreDetails: JSON.stringify({
            agentIdentityVerified: true,
            reraOfficialCheck: 'VERIFIED_ACTIVE',
            ownershipTitleAudit: 'CLEAR_RECORD_2026',
            physicalInspectionAudit: 'VERIFIED_ON_SITE',
            completenessScore: 97,
            priceBenchmark: 'FAIR_MARKET_VALUE_TIER_A',
          }),
        }
      });
      console.log(`[ADDED] ${item.title}`);
      addedCount++;
    } else {
      console.log(`[SKIP] Already exists: ${item.slug}`);
    }
  }

  const total = await prisma.property.count();
  console.log(`\nInventory expansion complete! Added: ${addedCount}. Total Properties in DB: ${total}`);
  await prisma.$disconnect();
}

seedRichInventory().catch(err => {
  console.error('Error seeding properties:', err);
  process.exit(1);
});
