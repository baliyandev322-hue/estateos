export interface CuratedProperty {
  id: string;
  slug: string;
  title: string;
  description: string;
  propertyType: 'APARTMENT' | 'VILLA' | 'PENTHOUSE' | 'PLOT' | 'COMMERCIAL' | 'STUDIO';
  listingType: 'SALE' | 'RENT';
  price: number;
  pricePerSqFt?: number;
  maintenanceFees?: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetAreaSqFt: number;
  superBuiltUpSqFt: number;
  furnishing: 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED';
  parkingSpaces: number;
  floorNo: number;
  totalFloors: number;
  facing: string;
  possessionStatus: 'READY_TO_MOVE' | 'UNDER_CONSTRUCTION' | 'NEW_LAUNCH';
  ageOfProperty: number;
  address: string;
  localityName: string;
  city: string;
  state: string;
  pinCode: string;
  latitude: number;
  longitude: number;
  reraId: string;
  truthScore: number;
  truthScoreDetails?: string;
  isVerified: boolean;
  isFeatured: boolean;
  isPromoted?: boolean;
  status: string;
  amenities: string;
  images: string;
  organization: {
    id?: string;
    name: string;
    slug?: string;
    logo?: string;
    reraNumber?: string;
    phone?: string;
    isVerified?: boolean;
  };
  user: {
    id?: string;
    name: string;
    phone?: string;
    avatar?: string;
    licenseNo?: string;
  };
  verificationAudits?: any[];
  viewsCount?: number;
  enquiriesCount?: number;
  createdAt?: string;
}

export const CURATED_PROPERTIES: CuratedProperty[] = [
  {
    id: 'prop-azure-mohali-01',
    slug: 'grand-azure-3bhk-luxury-residence-it-city-mohali',
    title: 'Grand Azure 3BHK Luxury Residence at IT City',
    description: 'Experience ultra-refined living at Grand Azure in Sector 82 IT City, Mohali. Designed with floor-to-ceiling soundproof acoustic glass, Italian marble flooring, and panoramic balconies overlooking landscaped central greens. Situated 5 minutes from Shaheed Bhagat Singh International Airport, Infosys campus, and Amity University. Comes with EV charging bays and automated clubhouse membership.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 9200000,
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
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Infinity Swimming Pool',
      'State-of-the-Art Gymnasium',
      'EV Car Charging Station',
      '24/7 Multi-Tier Biometric Security',
      'Clubhouse & Banquet Hall',
      '100% DG Power Backup',
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ]),
    organization: {
      id: 'org-apex-mohali',
      name: 'Apex Heritage Realty',
      slug: 'apex-heritage-realty',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'PBRERA-SAS80-REA0419',
      phone: '+91 98765 43210',
      isVerified: true,
    },
    user: {
      id: 'usr-agent-rahul',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      licenseNo: 'RERA-PB-AGT-2023-0941',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    verificationAudits: [
      {
        identityVerified: true,
        reraVerified: true,
        ownershipVerified: true,
        physicalVerification: true,
        documentCompletenessScore: 98,
        priceBenchmarkingScore: 95,
        auditNotes: 'Direct RERA registry validated. Title verified clear for 30 years at SAS Nagar sub-registrar.',
        disclaimer: 'Official verified record under Punjab RERA audit standards.',
      },
    ],
  },
  {
    id: 'prop-camellias-ggn-02',
    slug: 'the-camellias-signature-4bhk-sky-mansion-gurugram',
    title: 'The Camellias Signature 4BHK Sky Mansion',
    description: 'Nestled along the Golf Course Road corridor, this iconic 4BHK Penthouse offers breathtaking unrestricted vistas of the Aravalli hills and the championship golf greens. Features private high-speed elevator access, double-height ceilings, temperature-controlled indoor pool, and bespoke German modular kitchen.',
    propertyType: 'PENTHOUSE',
    listingType: 'SALE',
    price: 48500000,
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
    latitude: 28.4116,
    longitude: 77.0784,
    reraId: 'HRERA-PKL-GGM-882-2021',
    truthScore: 98,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
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
    organization: {
      id: 'org-singhania-ggn',
      name: 'Singhania Grand Developers',
      slug: 'singhania-grand-developers',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'HRERA-PKL-GGM-1190-2022',
      phone: '+91 98112 34567',
      isVerified: true,
    },
    user: {
      id: 'usr-builder-vikram',
      name: 'Vikramaditya Singhania',
      phone: '+91 98112 34567',
      licenseNo: 'RERA-HR-BLD-2021-0182',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    verificationAudits: [
      {
        identityVerified: true,
        reraVerified: true,
        ownershipVerified: true,
        physicalVerification: true,
        documentCompletenessScore: 100,
        priceBenchmarkingScore: 98,
        auditNotes: 'Title cleared for 30 years registry records. All structural clearances approved.',
        disclaimer: 'Official verified record under Haryana RERA audit standards.',
      },
    ],
  },
  {
    id: 'prop-heritage-mohali-03',
    slug: 'heritage-gardenia-2bhk-smart-apartment-mohali',
    title: 'Heritage Gardenia 2BHK Smart Apartment',
    description: 'Affordable luxury designed for young professionals and small families. Located in Mohali Sector 82 adjoining upcoming aero commercial hub. Includes modular fittings, wooden bedroom floors, and close proximity to Fortis Hospital and Ryan International School.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 5800000,
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
    latitude: 30.6558,
    longitude: 76.7324,
    reraId: 'PBRERA-SAS80-PR0499',
    truthScore: 91,
    isVerified: true,
    isFeatured: false,
    isPromoted: false,
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
    organization: {
      id: 'org-apex-mohali',
      name: 'Apex Heritage Realty',
      slug: 'apex-heritage-realty',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'PBRERA-SAS80-REA0419',
      phone: '+91 98765 43210',
      isVerified: true,
    },
    user: {
      id: 'usr-agent-rahul',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      licenseNo: 'RERA-PB-AGT-2023-0941',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    verificationAudits: [
      {
        identityVerified: true,
        reraVerified: true,
        ownershipVerified: true,
        physicalVerification: true,
        documentCompletenessScore: 95,
        priceBenchmarkingScore: 92,
        auditNotes: 'Direct RERA registry validated. Title verified clear for 13 years at SAS Nagar sub-registrar.',
        disclaimer: 'Verified under Punjab RERA Act statutory disclosure standards.',
      },
    ],
  },
  {
    id: 'prop-indiranagar-blr-04',
    slug: 'boutique-3bhk-penthouse-indiranagar-bangalore',
    title: 'Boutique 3BHK Penthouse with Private Terrace in Indiranagar',
    description: 'Exclusive standalone floor residence situated on a quiet cul-de-sac off 100 Feet Road, Indiranagar. Features teakwood paneling, landscaped private rooftop patio, Italian kitchen with Miele appliances, and automated solar water heating.',
    propertyType: 'PENTHOUSE',
    listingType: 'RENT',
    price: 95000,
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
    latitude: 12.9784,
    longitude: 77.6408,
    reraId: 'EXEMPT_STANDALONE_EXISTING',
    truthScore: 89,
    isVerified: true,
    isFeatured: true,
    isPromoted: false,
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
    organization: {
      id: 'org-apex-mohali',
      name: 'Apex Heritage Realty',
      slug: 'apex-heritage-realty',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'PBRERA-SAS80-REA0419',
      phone: '+91 98765 43210',
      isVerified: true,
    },
    user: {
      id: 'usr-agent-rahul',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      licenseNo: 'RERA-PB-AGT-2023-0941',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  },
  {
    id: 'prop-bandra-mum-05',
    slug: 'bandra-seaside-boulevard-4bhk-sea-facing-villa-mumbai',
    title: 'Bandra Seaside Boulevard 4BHK Sea-Facing Villa',
    description: 'Ultra-exclusive coastal estate located along Carter Road, Bandra West. Commanding direct views of the Arabian Sea with private plunge pool, Portuguese-inspired courtyards, subterranean home theater, and bulletproof acoustic glass insulation.',
    propertyType: 'VILLA',
    listingType: 'SALE',
    price: 320000000,
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
    latitude: 19.0607,
    longitude: 72.8258,
    reraId: 'P51800029311',
    truthScore: 99,
    isVerified: true,
    isFeatured: true,
    isPromoted: true,
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
    organization: {
      id: 'org-singhania-ggn',
      name: 'Singhania Grand Developers',
      slug: 'singhania-grand-developers',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'HRERA-PKL-GGM-1190-2022',
      phone: '+91 98112 34567',
      isVerified: true,
    },
    user: {
      id: 'usr-builder-vikram',
      name: 'Vikramaditya Singhania',
      phone: '+91 98112 34567',
      licenseNo: 'RERA-HR-BLD-2021-0182',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
  },
  {
    id: 'prop-cybertowers-hyd-06',
    slug: 'cyber-towers-grade-a-commercial-it-office-space-hyderabad',
    title: 'Cyber Towers Grade-A Commercial IT Office Space',
    description: 'Pre-leased institutional-grade IT office floor in Gachibowli Financial District. Leased to a multinational SaaS firm on a 9-year lease with 15% escalation every 3 years. Immediate rental yield of 8.9% per annum with zero vacancy risk.',
    propertyType: 'COMMERCIAL',
    listingType: 'SALE',
    price: 65000000,
    pricePerSqFt: 10000,
    maintenanceFees: 15000,
    bedrooms: 0,
    bathrooms: 4,
    balconies: 0,
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
    latitude: 17.4435,
    longitude: 78.3772,
    reraId: 'P02400001844',
    truthScore: 96,
    isVerified: true,
    isFeatured: true,
    isPromoted: false,
    status: 'AVAILABLE',
    amenities: JSON.stringify([
      'Central Chilled-Water HVAC',
      '100% DG Power Redundancy',
      'Double-Glazed Heat-Reflective Facade',
      '10 High-Speed Destination Elevators',
      'Pre-Leased Institutional Tenant',
    ]),
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ]),
    organization: {
      id: 'org-singhania-ggn',
      name: 'Singhania Grand Developers',
      slug: 'singhania-grand-developers',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'HRERA-PKL-GGM-1190-2022',
      phone: '+91 98112 34567',
      isVerified: true,
    },
    user: {
      id: 'usr-builder-vikram',
      name: 'Vikramaditya Singhania',
      phone: '+91 98112 34567',
      licenseNo: 'RERA-HR-BLD-2021-0182',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
  },
  {
    id: 'prop-green-lotus-mohali-07',
    slug: 'green-lotus-avenue-2bhk-it-city-mohali',
    title: 'Green Lotus Avenue 2BHK Luxury Smart Home',
    description: 'RERA certified 2BHK luxury apartment located in Sector 82 IT City, Mohali. Adjoining international airport road, 2km from Fortis Hospital, Ryan International School and IT corporate campuses. Features complete DG power backup, club gymnasium, children play park, and landscaped green avenues.',
    propertyType: 'APARTMENT',
    listingType: 'SALE',
    price: 5800000,
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
    isVerified: true,
    isFeatured: false,
    isPromoted: false,
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
    organization: {
      id: 'org-apex-mohali',
      name: 'Apex Heritage Realty',
      slug: 'apex-heritage-realty',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
      reraNumber: 'PBRERA-SAS80-REA0419',
      phone: '+91 98765 43210',
      isVerified: true,
    },
    user: {
      id: 'usr-agent-rahul',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      licenseNo: 'RERA-PB-AGT-2023-0941',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  },
];

export function filterCuratedProperties(params: {
  search?: string;
  city?: string;
  locality?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  verified?: boolean;
  sort?: string;
}) {
  let list = [...CURATED_PROPERTIES];

  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.localityName.toLowerCase().includes(q)
    );
  }

  if (params.city && params.city !== 'All') {
    list = list.filter(p => p.city.toLowerCase() === params.city?.toLowerCase());
  }

  if (params.locality) {
    const loc = params.locality.toLowerCase();
    list = list.filter(p => p.localityName.toLowerCase().includes(loc));
  }

  if (params.propertyType && params.propertyType !== 'ALL') {
    list = list.filter(p => p.propertyType === params.propertyType);
  }

  if (params.listingType && params.listingType !== 'ALL') {
    list = list.filter(p => p.listingType === params.listingType);
  }

  if (params.minPrice !== undefined) {
    list = list.filter(p => p.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    list = list.filter(p => p.price <= params.maxPrice!);
  }

  if (params.bedrooms && params.bedrooms > 0) {
    list = list.filter(p => (p.bedrooms || 0) >= params.bedrooms!);
  }

  if (params.verified) {
    list = list.filter(p => p.isVerified);
  }

  // Sort
  if (params.sort === 'price_asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (params.sort === 'price_desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (params.sort === 'truth_score') {
    list.sort((a, b) => b.truthScore - a.truthScore);
  } else {
    // Default newest/promoted first
    list.sort((a, b) => (b.isPromoted ? 1 : 0) - (a.isPromoted ? 1 : 0));
  }

  return list;
}
