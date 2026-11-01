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
    "id": "prop-mzn-001",
    "slug": "royal-heritage-3bhk-luxury-floor-gandhi-colony-muzaffarnagar",
    "title": "Royal Heritage 3BHK Luxury Builder Floor in Gandhi Colony",
    "description": "Newly constructed premium 3 BHK builder floor with Italian marble flooring, modular German kitchen, and private terrace access near Verma Park, Gandhi Colony. Situated in a peaceful gated community with 24/7 security, dedicated stilt car parking, 100% power backup, and clear bank-loanable freehold registry.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 8200000,
    "pricePerSqFt": 4969,
    "maintenanceFees": 1500,
    "bedrooms": 3,
    "bathrooms": 3,
    "balconies": 2,
    "carpetAreaSqFt": 1420,
    "superBuiltUpSqFt": 1650,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 1,
    "totalFloors": 3,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 0,
    "address": "Gali No. 8, Near Verma Park, Gandhi Colony",
    "localityName": "Gandhi Colony",
    "city": "Muzaffarnagar",
    "state": "Uttar Pradesh",
    "pinCode": "251001",
    "latitude": 29.4727,
    "longitude": 77.7085,
    "reraId": "UPRERA-MZN-2024-0891",
    "truthScore": 95,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Dedicated Stilt Parking\",\"Italian Marble Flooring\",\"Modular Kitchen\",\"24/7 Security & CCTV\",\"Private Terrace Access\",\"100% DG Power Backup\",\"Submersible Water Supply\"]",
    "images": "[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "EstateOS Verified Consultants",
      "slug": "estateos-technologies",
      "reraNumber": "UPRERA-A-2024-9382",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Dev Baliyan",
      "phone": "+91 93685 93249",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    "id": "prop-mzn-002",
    "slug": "paramount-4bhk-designer-villa-new-mandi-muzaffarnagar",
    "title": "Paramount 4BHK Independent Designer Villa in New Mandi",
    "description": "Architectural masterpiece 4 BHK freehold independent kothi/villa in the affluent hub of New Mandi, Muzaffarnagar. Features a double-height grand entrance, landscaped front lawn, Italian marble, modular kitchen, branded Kohler fixtures, and dual car porch. Close to top schools and markets.",
    "propertyType": "VILLA",
    "listingType": "SALE",
    "price": 16500000,
    "pricePerSqFt": 6000,
    "maintenanceFees": 2000,
    "bedrooms": 4,
    "bathrooms": 4,
    "balconies": 3,
    "carpetAreaSqFt": 2400,
    "superBuiltUpSqFt": 2750,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 1,
    "totalFloors": 2,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Patel Nagar, Near Shiv Mandir, New Mandi",
    "localityName": "New Mandi",
    "city": "Muzaffarnagar",
    "state": "Uttar Pradesh",
    "pinCode": "251001",
    "latitude": 29.4682,
    "longitude": 77.7198,
    "reraId": "UPRERA-MZN-2023-0412",
    "truthScore": 96,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Private Front Lawn\",\"Double Height Ceiling\",\"Modular Kitchen with Chimney\",\"Branded Kohler Sanitaryware\",\"Dual Covered Car Porch\",\"24/7 CCTV Surveillance\",\"Solar Water Heater\"]",
    "images": "[\"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "EstateOS Verified Consultants",
      "slug": "estateos-technologies",
      "reraNumber": "UPRERA-A-2024-9382",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Dev Baliyan",
      "phone": "+91 93685 93249",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    "id": "prop-mzn-003",
    "slug": "prime-commercial-showroom-circular-road-muzaffarnagar",
    "title": "Prime High-Street Retail Showroom on Circular Road",
    "description": "High-visibility commercial frontage showroom with 35 ft main road exposure on Circular Road, Muzaffarnagar. Ideal for retail banks, jewelers, branded electronics, or corporate franchise headquarters with intense daily footfall and basement customer parking.",
    "propertyType": "COMMERCIAL",
    "listingType": "SALE",
    "price": 12500000,
    "pricePerSqFt": 8928,
    "maintenanceFees": 4500,
    "bedrooms": 0,
    "bathrooms": 2,
    "balconies": 0,
    "carpetAreaSqFt": 1200,
    "superBuiltUpSqFt": 1400,
    "furnishing": "UNFURNISHED",
    "parkingSpaces": 4,
    "floorNo": 0,
    "totalFloors": 3,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Near Meenakshi Chowk, Circular Road",
    "localityName": "Circular Road",
    "city": "Muzaffarnagar",
    "state": "Uttar Pradesh",
    "pinCode": "251001",
    "latitude": 29.4755,
    "longitude": 77.7022,
    "reraId": "UPRERA-COM-2024-1102",
    "truthScore": 93,
    "isVerified": true,
    "isFeatured": false,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"35 Ft Commercial Road Frontage\",\"Basement Customer Parking\",\"100% Power Backup DG\",\"High-Speed Lift Provision\",\"Fire Fighting System Approved\",\"Bank ATM Provision\"]",
    "images": "[\"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "EstateOS Verified Consultants",
      "slug": "estateos-technologies",
      "reraNumber": "UPRERA-A-2024-9382",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Dev Baliyan",
      "phone": "+91 93685 93249",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    "id": "prop-mzn-004",
    "slug": "green-valley-200-sqyd-freehold-residential-plot-roorkee-road-muzaffarnagar",
    "title": "200 Sq.Yd Freehold Residential Plot on Roorkee Highway Road",
    "description": "Gated township approved freehold residential plot (200 Gaj) on Roorkee Road corridor. Features wide 40-foot blacktop roads, underground electricity cabling, landscaped park, 24/7 security gate, and instant bank-loanable registry titles.",
    "propertyType": "PLOT",
    "listingType": "SALE",
    "price": 5200000,
    "pricePerSqFt": 2888,
    "maintenanceFees": 800,
    "bedrooms": 0,
    "bathrooms": 0,
    "balconies": 0,
    "carpetAreaSqFt": 1800,
    "superBuiltUpSqFt": 1800,
    "furnishing": "UNFURNISHED",
    "parkingSpaces": 2,
    "floorNo": 0,
    "totalFloors": 0,
    "facing": "NORTH",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 0,
    "address": "Green Valley Enclave, Roorkee Road",
    "localityName": "Roorkee Road",
    "city": "Muzaffarnagar",
    "state": "Uttar Pradesh",
    "pinCode": "251002",
    "latitude": 29.4921,
    "longitude": 77.7125,
    "reraId": "UPRERA-PLT-2025-0628",
    "truthScore": 94,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Gated Township with Security Guard\",\"40 Ft Wide Metal Road\",\"Underground Drainage & Electricity\",\"Landscaped Central Park\",\"Water Pipeline Connected\",\"Instant Freehold Registry\"]",
    "images": "[\"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "EstateOS Verified Consultants",
      "slug": "estateos-technologies",
      "reraNumber": "UPRERA-A-2024-9382",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Dev Baliyan",
      "phone": "+91 93685 93249",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    "id": "cmvulex2r000kp3ljhwdv4mi4",
    "slug": "grand-azure-3bhk-luxury-residence-it-city-mohali",
    "title": "Grand Azure 3BHK Luxury Residence at IT City",
    "description": "Experience ultra-refined living at Grand Azure in Sector 82 IT City, Mohali. Designed with floor-to-ceiling soundproof acoustic glass, Italian marble flooring, and panoramic balconies overlooking landscaped central greens. Situated 5 minutes from Shaheed Bhagat Singh International Airport, Infosys campus, and Amity University. Comes with EV charging bays and automated clubhouse membership.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 9200000,
    "pricePerSqFt": 5257,
    "maintenanceFees": 3800,
    "bedrooms": 3,
    "bathrooms": 3,
    "balconies": 3,
    "carpetAreaSqFt": 1450,
    "superBuiltUpSqFt": 1750,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 8,
    "totalFloors": 14,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Tower Sapphire, Grand Azure, Sector 82 Alpha, IT City",
    "localityName": "Sector 82 IT City",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "140306",
    "latitude": 30.6558,
    "longitude": 76.7324,
    "reraId": "PBRERA-SAS80-PR0612",
    "truthScore": 94,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Infinity Swimming Pool\",\"State-of-the-Art Gymnasium\",\"EV Car Charging Station\",\"24/7 Multi-Tier Biometric Security\",\"High-Speed Schindler Elevators\",\"Clubhouse & Banquet Hall\",\"Rooftop Tennis & Pickleball Court\",\"100% DG Power Backup\"]",
    "images": "[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvulex8n000mp3ljzrj6yf88",
    "slug": "the-camellias-signature-4bhk-sky-mansion-gurugram",
    "title": "The Camellias Signature 4BHK Sky Mansion",
    "description": "Nestled along the Golf Course Road corridor, this iconic 4BHK Penthouse offers breathtaking unrestricted vistas of the Aravalli hills and the championship golf greens. Features private high-speed elevator access, double-height ceilings, temperature-controlled indoor pool, and bespoke German modular kitchen.",
    "propertyType": "PENTHOUSE",
    "listingType": "SALE",
    "price": 48500000,
    "pricePerSqFt": 11547,
    "maintenanceFees": 12500,
    "bedrooms": 4,
    "bathrooms": 5,
    "balconies": 4,
    "carpetAreaSqFt": 3600,
    "superBuiltUpSqFt": 4200,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 4,
    "floorNo": 22,
    "totalFloors": 26,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 2,
    "address": "Tower Imperial, Golf Course Extension Road, Sector 54",
    "localityName": "Golf Course Extension Road",
    "city": "Gurugram",
    "state": "Haryana",
    "pinCode": "122018",
    "latitude": null,
    "longitude": null,
    "reraId": "HRERA-PKL-GGM-882-2021",
    "truthScore": 98,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Private Plunge Pool\",\"Private Elevator Landing\",\"Concierge & Valet Service\",\"Spa & Sauna Wellness Suite\",\"Helipad Access\",\"Wine Cellar & Cigar Lounge\",\"Smart Home IoT Automation\"]",
    "images": "[\"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvulexe0000op3ljyqdx80bq",
    "slug": "heritage-gardenia-2bhk-smart-apartment-mohali",
    "title": "Heritage Gardenia 2BHK Smart Apartment",
    "description": "Affordable luxury designed for young professionals and small families. Located in Mohali Sector 82 adjoining upcoming aero commercial hub. Includes modular fittings, wooden bedroom floors, and close proximity to Fortis Hospital and Ryan International School.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 5800000,
    "pricePerSqFt": 4833,
    "maintenanceFees": 2400,
    "bedrooms": 2,
    "bathrooms": 2,
    "balconies": 2,
    "carpetAreaSqFt": 980,
    "superBuiltUpSqFt": 1200,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 1,
    "floorNo": 4,
    "totalFloors": 11,
    "facing": "NORTH",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 0,
    "address": "Tower Magnolia, Heritage Gardenia, Sector 82",
    "localityName": "Sector 82 IT City",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "140306",
    "latitude": null,
    "longitude": null,
    "reraId": "PBRERA-SAS80-PR0499",
    "truthScore": 91,
    "isVerified": true,
    "isFeatured": false,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Badminton Court\",\"Jogging Track\",\"Childrens Play Park\",\"CCTV Surveillance\",\"Power Backup\",\"Intercom Facility\"]",
    "images": "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvulexj2000qp3ljw2plwe17",
    "slug": "boutique-3bhk-penthouse-indiranagar-bangalore",
    "title": "Boutique 3BHK Penthouse with Private Terrace in Indiranagar",
    "description": "Exclusive standalone floor residence situated on a quiet cul-de-sac off 100 Feet Road, Indiranagar. Features teakwood paneling, landscaped private rooftop patio, Italian kitchen with Miele appliances, and automated solar water heating.",
    "propertyType": "PENTHOUSE",
    "listingType": "RENT",
    "price": 95000,
    "pricePerSqFt": 43,
    "maintenanceFees": 6000,
    "bedrooms": 3,
    "bathrooms": 3,
    "balconies": 2,
    "carpetAreaSqFt": 2200,
    "superBuiltUpSqFt": 2600,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 3,
    "totalFloors": 3,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 3,
    "address": "14th Main, HAL 2nd Stage, Indiranagar",
    "localityName": "Indiranagar",
    "city": "Bangalore",
    "state": "Karnataka",
    "pinCode": "560038",
    "latitude": null,
    "longitude": null,
    "reraId": "EXEMPT_STANDALONE_EXISTING",
    "truthScore": 89,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Private Landscaped Terrace\",\"Dedicated Covered Parking\",\"Full Power Backup\",\"Smart Lock Access\",\"Solar Water Heater\"]",
    "images": "[\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvulexqd000sp3lj2cd4b0ux",
    "slug": "bandra-seaside-boulevard-4bhk-sea-facing-villa-mumbai",
    "title": "Bandra Seaside Boulevard 4BHK Sea-Facing Villa",
    "description": "Ultra-exclusive coastal estate located along Carter Road, Bandra West. Commanding direct views of the Arabian Sea with private plunge pool, Portuguese-inspired courtyards, subterranean home theater, and bulletproof acoustic glass insulation.",
    "propertyType": "VILLA",
    "listingType": "SALE",
    "price": 320000000,
    "pricePerSqFt": 64000,
    "maintenanceFees": 45000,
    "bedrooms": 4,
    "bathrooms": 6,
    "balconies": 5,
    "carpetAreaSqFt": 5000,
    "superBuiltUpSqFt": 6200,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 4,
    "floorNo": 1,
    "totalFloors": 3,
    "facing": "WEST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Carter Road, Bandra West",
    "localityName": "Bandra West",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400050",
    "latitude": null,
    "longitude": null,
    "reraId": "P51800029311",
    "truthScore": 99,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Direct Arabian Sea View\",\"Private Swimming Pool\",\"Home Cinema Room\",\"Private Garden Courtyard\",\"Staff Quarters\",\"Biometric Smart Security\"]",
    "images": "[\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvulexvg000up3ljcip01xbi",
    "slug": "cyber-towers-grade-a-commercial-it-office-space-hyderabad",
    "title": "Cyber Towers Grade-A Commercial IT Office Space",
    "description": "Pre-leased institutional-grade IT office floor in Gachibowli Financial District. Leased to a multinational SaaS firm on a 9-year lease with 15% escalation every 3 years. Immediate rental yield of 8.9% per annum with zero vacancy risk.",
    "propertyType": "COMMERCIAL",
    "listingType": "SALE",
    "price": 65000000,
    "pricePerSqFt": 10000,
    "maintenanceFees": 15000,
    "bedrooms": 0,
    "bathrooms": 0,
    "balconies": 0,
    "carpetAreaSqFt": 6500,
    "superBuiltUpSqFt": 8500,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 10,
    "floorNo": 7,
    "totalFloors": 18,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 3,
    "address": "Tower 3, Cyber Gateway Park, Gachibowli",
    "localityName": "Gachibowli Financial District",
    "city": "Hyderabad",
    "state": "Telangana",
    "pinCode": "500032",
    "latitude": null,
    "longitude": null,
    "reraId": "P02400001844",
    "truthScore": 96,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Central Chilled Water HVAC\",\"24/7 Redundant Optical Fiber Lines\",\"100% Dual Grid Power Backup\",\"Multi-Level Car Parking\",\"Food Court & Executive Cafeteria\",\"NFPA Compliant Fire Fighting System\"]",
    "images": "[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvuq3lh00001mp7lbso8zz2y",
    "slug": "green-lotus-avenue-2bhk-it-city-mohali",
    "title": "Green Lotus Avenue 2BHK Luxury Smart Home",
    "description": "RERA certified 2BHK luxury apartment located in Sector 82 IT City, Mohali. Adjoining international airport road, 2km from Fortis Hospital, Ryan International School and IT corporate campuses. Features complete DG power backup, club gymnasium, children play park, and landscaped green avenues.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 5800000,
    "pricePerSqFt": 4833,
    "maintenanceFees": 2200,
    "bedrooms": 2,
    "bathrooms": 2,
    "balconies": 2,
    "carpetAreaSqFt": 980,
    "superBuiltUpSqFt": 1200,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 1,
    "floorNo": 5,
    "totalFloors": 12,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 0,
    "address": "Tower Cedar, Green Lotus Avenue, Sector 82 Alpha, IT City",
    "localityName": "Sector 82 IT City",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "140306",
    "latitude": 30.6558,
    "longitude": 76.7324,
    "reraId": "PBRERA-SAS80-PR0512",
    "truthScore": 92,
    "isVerified": true,
    "isFeatured": false,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Clubhouse & Gym\",\"Childrens Play Park\",\"Jogging Track\",\"CCTV & 24/7 Gated Security\",\"100% Power Backup\",\"EV Charging Points\"]",
    "images": "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pxxn0001y0fmf2lqiso7",
    "slug": "dlf-the-arbour-4bhk-luxury-sector-63-gurugram",
    "title": "DLF The Arbour 4BHK Ultra-Luxury High-Rise Residence",
    "description": "DLF The Arbour in Sector 63, Gurugram, sets a new benchmark in luxury. Low-density enclave on Golf Course Extension Road with 85% open verdant greens, double-height entrance lobbies, private elevator zones, and state-of-the-art air purification systems.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 78000000,
    "pricePerSqFt": 19746,
    "maintenanceFees": 18000,
    "bedrooms": 4,
    "bathrooms": 5,
    "balconies": 4,
    "carpetAreaSqFt": 3150,
    "superBuiltUpSqFt": 3950,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 3,
    "floorNo": 16,
    "totalFloors": 39,
    "facing": "NORTH_EAST",
    "possessionStatus": "UNDER_CONSTRUCTION",
    "ageOfProperty": 0,
    "address": "Tower Cedar, DLF The Arbour, Sector 63",
    "localityName": "Golf Course Extension Road",
    "city": "Gurugram",
    "state": "Haryana",
    "pinCode": "122102",
    "latitude": 28.4022,
    "longitude": 77.0784,
    "reraId": "HRERA-PKL-GGM-1445-2023",
    "truthScore": 96,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Olympic-Length Temperature Controlled Pool\",\"Concierge Butler Service\",\"Private High-Speed Elevator\",\"Bespoke Cigar Lounge & Wine Cellar\",\"EV Supercharging Stalls\",\"3-Tier Biometric Facial Recognition\"]",
    "images": "[\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8py870003y0fm607fwm6k",
    "slug": "m3m-golfestate-3bhk-fairway-residence-gurugram",
    "title": "M3M Golfestate 3BHK Fairway Residence",
    "description": "Impeccable golf-course facing suites on Golf Course Extension Road. Expansive balconies overlooking a 9-hole executive golf course. Includes private pool lounge access, world-class club, and quick jump to Cyber City.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 43500000,
    "pricePerSqFt": 14500,
    "maintenanceFees": 12500,
    "bedrooms": 3,
    "bathrooms": 4,
    "balconies": 3,
    "carpetAreaSqFt": 2400,
    "superBuiltUpSqFt": 3000,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 11,
    "totalFloors": 25,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 2,
    "address": "Fairway West Tower, M3M Golfestate, Sector 65",
    "localityName": "Golf Course Extension Road",
    "city": "Gurugram",
    "state": "Haryana",
    "pinCode": "122018",
    "latitude": 28.4095,
    "longitude": 77.0671,
    "reraId": "HRERA-PKL-GGM-882-2018",
    "truthScore": 93,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"9-Hole Executive Golf Course View\",\"Rooftop Infinity Lap Pool\",\"Tennis & Squash Academies\",\"VR Gaming Zone & Private Theatre\",\"Fine-Dining Al-Fresco Restaurant\"]",
    "images": "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pyik0005y0fmxpwa7nwu",
    "slug": "homeland-regalia-4bhk-presidential-suite-mohali",
    "title": "Homeland Regalia 4BHK Presidential Suite",
    "description": "The golden standard of luxury in Greater Mohali Sector 77. Features automated Italian modular kitchen, wrap-around sunset sundeck, high-ceiling master suite with walk-in closet, and 5-tier security.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 28500000,
    "pricePerSqFt": 8142,
    "maintenanceFees": 6500,
    "bedrooms": 4,
    "bathrooms": 5,
    "balconies": 4,
    "carpetAreaSqFt": 2800,
    "superBuiltUpSqFt": 3500,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 14,
    "totalFloors": 22,
    "facing": "NORTH",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Block Imperial, Homeland Regalia, Sector 77",
    "localityName": "Sector 77 Mohali",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "160071",
    "latitude": 30.6865,
    "longitude": 76.7185,
    "reraId": "PBRERA-SAS80-PR0391",
    "truthScore": 95,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Sky Lounge on 22nd Floor\",\"Heated Indoor Lap Pool\",\"Squash Court & Bowling Alley\",\"Covered Multi-Level Basements\",\"EV Car Charging Station\"]",
    "images": "[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pysk0007y0fmz5ddf4rp",
    "slug": "marbella-grand-3bhk-luxury-home-sector-82-mohali",
    "title": "Marbella Grand 3BHK Earth & Sky Luxury Home",
    "description": "Located in the nerve center of IT City Mohali, Marbella Grand delivers Mediterranean architectural elegance. Direct access to International Airport Road, Spanish clubhouse, and lush central boulevard.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 13500000,
    "pricePerSqFt": 6428,
    "maintenanceFees": 4500,
    "bedrooms": 3,
    "bathrooms": 3,
    "balconies": 3,
    "carpetAreaSqFt": 1700,
    "superBuiltUpSqFt": 2100,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 9,
    "totalFloors": 19,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Tower Valencia, Marbella Grand, Sector 82A, IT City",
    "localityName": "Sector 82 IT City",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "140306",
    "latitude": 30.6621,
    "longitude": 76.7389,
    "reraId": "PBRERA-SAS80-PR0488",
    "truthScore": 94,
    "isVerified": true,
    "isFeatured": false,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Spanish Lifestyle Clubhouse\",\"Open-Air Amphitheatre\",\"Jogging & Cycling Track\",\"Children Adventure Park\",\"Pharmacy & Convenience Mart\"]",
    "images": "[\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pz2k0009y0fmis4qlfmu",
    "slug": "jlpl-falcon-view-3bhk-sector-66a-mohali",
    "title": "JLPL Falcon View 3BHK Premium High-Rise",
    "description": "Strategically positioned in Sector 66A right adjoining Chandigarh. 16 acres of lush landscaped podium, uninterrupted panoramic Shivalik mountain vistas, and world-class sports facilities.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 16500000,
    "pricePerSqFt": 6653,
    "maintenanceFees": 4800,
    "bedrooms": 3,
    "bathrooms": 4,
    "balconies": 3,
    "carpetAreaSqFt": 1980,
    "superBuiltUpSqFt": 2480,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 12,
    "totalFloors": 16,
    "facing": "NORTH",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 3,
    "address": "Tower A3, JLPL Falcon View, Sector 66A",
    "localityName": "Sector 66A Mohali",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "160062",
    "latitude": 30.6811,
    "longitude": 76.7452,
    "reraId": "PBRERA-SAS80-PR0112",
    "truthScore": 92,
    "isVerified": true,
    "isFeatured": false,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Panoramic Shivalik Views\",\"Swimming Pool with Kids Splash\",\"Gymnasium & Aerobics Studio\",\"Piped Natural Gas (PNG)\",\"100% Power Backup\"]",
    "images": "[\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pzcl000by0fm43374al2",
    "slug": "omaxe-the-lake-3bhk-waterfront-penthouse-new-chandigarh",
    "title": "Omaxe The Lake 3BHK Waterfront Penthouse",
    "description": "Waterfront living in New Chandigarh (Mullanpur). 25-acre township centered around artificial lakes and water bodies, offering private rooftop terrace, Jacuzzi, and unobstructed views of the Shivalik range.",
    "propertyType": "PENTHOUSE",
    "listingType": "SALE",
    "price": 24500000,
    "pricePerSqFt": 7852,
    "maintenanceFees": 6200,
    "bedrooms": 3,
    "bathrooms": 4,
    "balconies": 3,
    "carpetAreaSqFt": 2450,
    "superBuiltUpSqFt": 3120,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 21,
    "totalFloors": 21,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 2,
    "address": "Tower Victoria, Omaxe The Lake, New Chandigarh",
    "localityName": "New Chandigarh Mullanpur",
    "city": "Chandigarh",
    "state": "Punjab",
    "pinCode": "140901",
    "latitude": 30.7958,
    "longitude": 76.7112,
    "reraId": "PBRERA-SAS80-PR0045",
    "truthScore": 93,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Waterfront Artificial Lake Views\",\"Private Terrace Jacuzzi\",\"Floating Club & Restaurant\",\"Tennis & Cricket Practice Nets\",\"Eco-Friendly Solar Lighting\"]",
    "images": "[\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pzms000dy0fm2tkfgo77",
    "slug": "ats-knightsbridge-4bhk-grand-manor-sector-124-noida",
    "title": "ATS Knightsbridge 4BHK Grand Manor at Sector 124",
    "description": "Iconic twin skyscraper towers towering over the Yamuna River and Delhi border. Single apartment per floor, 12-ft ceiling heights, private elevator lobby, and ultra-high acoustic insulation.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 115000000,
    "pricePerSqFt": 19166,
    "maintenanceFees": 24000,
    "bedrooms": 4,
    "bathrooms": 6,
    "balconies": 4,
    "carpetAreaSqFt": 4800,
    "superBuiltUpSqFt": 6000,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 4,
    "floorNo": 27,
    "totalFloors": 47,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Tower A, ATS Knightsbridge, Sector 124",
    "localityName": "Sector 124 Noida Expressway",
    "city": "Noida",
    "state": "Uttar Pradesh",
    "pinCode": "201301",
    "latitude": 28.5441,
    "longitude": 77.3325,
    "reraId": "UPRERAPRJ3574",
    "truthScore": 97,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"1 Apartment Per Floor Architecture\",\"Private Dedicated Elevators\",\"Temperature Regulated Indoor Pool\",\"Helipad Access\",\"Sub-Zero & Wolf Fitted Gourmet Kitchen\",\"24/7 Diplomatic Grade Security\"]",
    "images": "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8pzwu000fy0fmwsdt5v8p",
    "slug": "gulshan-dynasty-4bhk-wellness-sector-144-noida",
    "title": "Gulshan Dynasty 4BHK Wellness Luxury Residence",
    "description": "Noida's first platinum-certified green luxury residence. Built on Sector 144 Noida Expressway, equipped with hydroponic organic farming, oxygen-boosted clubhouse, and dedicated pet care sanctuary.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 62000000,
    "pricePerSqFt": 13191,
    "maintenanceFees": 14000,
    "bedrooms": 4,
    "bathrooms": 5,
    "balconies": 3,
    "carpetAreaSqFt": 3600,
    "superBuiltUpSqFt": 4700,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 3,
    "floorNo": 18,
    "totalFloors": 34,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "Tower Imperial, Gulshan Dynasty, Sector 144",
    "localityName": "Sector 144 Noida",
    "city": "Noida",
    "state": "Uttar Pradesh",
    "pinCode": "201306",
    "latitude": 28.4891,
    "longitude": 77.4215,
    "reraId": "UPRERAPRJ9588",
    "truthScore": 95,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Platinum Certified Green Architecture\",\"Hydroponic Farm & Herb Gardens\",\"Oxygen-Enriched Clubhouse\",\"On-Site Diagnostic Healthcare Clinic\",\"Dedicated Pet Grooming Care Area\"]",
    "images": "[\"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q06t000hy0fm7zixhixh",
    "slug": "vasant-vihar-sovereign-5bhk-diplomatic-villa-delhi",
    "title": "Vasant Vihar Sovereign 5BHK Diplomatic Villa",
    "description": "Prestigious independent bungalow nestled on a 600 sq. yard freehold plot in South Delhi's elite enclave. Features private manicured lawns, basement home theatre, heated pool, and separate staff quarters.",
    "propertyType": "VILLA",
    "listingType": "SALE",
    "price": 420000000,
    "pricePerSqFt": 64615,
    "maintenanceFees": 0,
    "bedrooms": 5,
    "bathrooms": 7,
    "balconies": 5,
    "carpetAreaSqFt": 5400,
    "superBuiltUpSqFt": 6500,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 5,
    "floorNo": 1,
    "totalFloors": 3,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 4,
    "address": "Block E, Vasant Vihar",
    "localityName": "Vasant Vihar South Delhi",
    "city": "Delhi",
    "state": "Delhi",
    "pinCode": "110057",
    "latitude": 28.5614,
    "longitude": 77.1611,
    "reraId": "DLRERA-VV-2022-09",
    "truthScore": 98,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Private Heated Swimming Pool\",\"Private 8-Car Driveway & Basements\",\"Dolby Atmos 12-Seater Private Cinema\",\"Otis Internal Glass Hydraulic Lift\",\"Perimeter Infrared Security & CCTV\",\"Separate Driver & Domestic Quarters\"]",
    "images": "[\"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q0h5000jy0fmdr10ttz6",
    "slug": "total-environment-3bhk-earth-home-hennur-bangalore",
    "title": "Total Environment In That Quiet Earth 3BHK Earth Home",
    "description": "Iconic handcrafted architecture by Total Environment on Hennur Main Road. Features terrace gardens with natural timber decking, exposed wire-cut red brickwork, and imported Italian cabinetry.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 31500000,
    "pricePerSqFt": 11052,
    "maintenanceFees": 8500,
    "bedrooms": 3,
    "bathrooms": 3,
    "balconies": 2,
    "carpetAreaSqFt": 2250,
    "superBuiltUpSqFt": 2850,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 6,
    "totalFloors": 14,
    "facing": "EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 2,
    "address": "Tower Towering Green, Off Hennur Main Road",
    "localityName": "Hennur Road Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "pinCode": "560077",
    "latitude": 13.0645,
    "longitude": 77.6521,
    "reraId": "PRM/KA/RERA/1251/446/PR/180507/001650",
    "truthScore": 94,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Private Terrace Garden with Drip Irrigation\",\"Handcrafted Exposed Brick Finish\",\"Bio-Pond & Forest Trail Walkway\",\"Squash & Badminton Courts\",\"Central RO Water Purifying Grid\"]",
    "images": "[\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q0qx000ly0fm7ktbvomc",
    "slug": "prestige-tech-pacific-grade-a-it-floor-outer-ring-road-bangalore",
    "title": "Prestige Tech Pacific Grade-A IT Floor",
    "description": "Fully furnished, enterprise grade IT office plate with 120 workstations, 4 executive boardrooms, and cafeteria. Leased to multinational tech tenant yielding 8.2% annual net capitalization yield.",
    "propertyType": "COMMERCIAL",
    "listingType": "SALE",
    "price": 145000000,
    "pricePerSqFt": 14500,
    "maintenanceFees": 35000,
    "bedrooms": 0,
    "bathrooms": 6,
    "balconies": 0,
    "carpetAreaSqFt": 8500,
    "superBuiltUpSqFt": 10000,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 12,
    "floorNo": 4,
    "totalFloors": 11,
    "facing": "NORTH",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 3,
    "address": "Wing B, Prestige Tech Pacific, Marathahalli Outer Ring Road",
    "localityName": "Outer Ring Road Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "pinCode": "560103",
    "latitude": 12.9372,
    "longitude": 77.6925,
    "reraId": "PRM/KA/RERA/1251/308/PR/171015/000452",
    "truthScore": 96,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"100% Redundant DG Generator Backup\",\"Dual Substation HT Power Grid\",\"Central VRV High-Efficiency Air Conditioning\",\"BMS Automated Building System\",\"Grade-A Fire Suppressant Sprinklers\"]",
    "images": "[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q10s000ny0fm03hwsfyw",
    "slug": "lodha-world-one-4bhk-sky-mansion-lower-parel-mumbai",
    "title": "Lodha World One 4BHK Sky Mansion at Lower Parel",
    "description": "Soar above South Mumbai in India's most iconic skyscraper tower. Designed by Armani/Casa, commanding 360-degree Arabian Sea and Mahalaxmi Racecourse views with private observatory terrace.",
    "propertyType": "PENTHOUSE",
    "listingType": "SALE",
    "price": 360000000,
    "pricePerSqFt": 60000,
    "maintenanceFees": 48000,
    "bedrooms": 4,
    "bathrooms": 6,
    "balconies": 3,
    "carpetAreaSqFt": 4600,
    "superBuiltUpSqFt": 6000,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 4,
    "floorNo": 62,
    "totalFloors": 76,
    "facing": "WEST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 3,
    "address": "Floor 62, Lodha World One, Senapati Bapat Marg, Lower Parel",
    "localityName": "Lower Parel South Mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400013",
    "latitude": 18.9958,
    "longitude": 72.8288,
    "reraId": "P51900008962",
    "truthScore": 97,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Armani/Casa Designed Sky Suite\",\"Private High-Altitude Heated Jacuzzi\",\"360-Degree Arabian Sea Panorama\",\"Resident Helicopter Pad Access\",\"St. Moritz Spa & Private Screening Theatre\"]",
    "images": "[\"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q1ax000py0fmif5sr0pl",
    "slug": "carter-road-3bhk-waterfront-designer-residence-bandra-mumbai",
    "title": "Carter Road 3BHK Waterfront Designer Residence",
    "description": "Turnkey luxury rental on premier Carter Road promenade. Floor-to-ceiling glass capturing sunset waves, Italian leather furnishings, and dedicated valet parking.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "price": 380000,
    "pricePerSqFt": 180,
    "maintenanceFees": 20000,
    "bedrooms": 3,
    "bathrooms": 3,
    "balconies": 2,
    "carpetAreaSqFt": 1850,
    "superBuiltUpSqFt": 2100,
    "furnishing": "FULLY_FURNISHED",
    "parkingSpaces": 2,
    "floorNo": 8,
    "totalFloors": 14,
    "facing": "WEST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 2,
    "address": "Blue Horizon, Carter Road, Bandra West",
    "localityName": "Bandra West Mumbai",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400050",
    "latitude": 19.0682,
    "longitude": 72.8245,
    "reraId": "P51800031890",
    "truthScore": 95,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": false,
    "status": "AVAILABLE",
    "amenities": "[\"Direct Arabian Sea Sunset View\",\"Fully Furnished Designer Interiors\",\"Valet Parking & 24/7 Concierge Desk\",\"High-Speed Fibre Internet Grid\",\"Rooftop Fitness Studio\"]",
    "images": "[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q1l2000ry0fmq8sxtnpp",
    "slug": "it-city-central-boulevard-sco-showroom-mohali",
    "title": "IT City Central Boulevard Grade-A SCO Commercial Showroom",
    "description": "Triple-storey commercial SCO building (Basement + Ground + 2 Floors) with 100% frontage on 200-ft PR-7 Airport Road. Ideal for multinational bank, luxury car showroom, or flagship retail.",
    "propertyType": "COMMERCIAL",
    "listingType": "SALE",
    "price": 48000000,
    "pricePerSqFt": 9600,
    "maintenanceFees": 12000,
    "bedrooms": 0,
    "bathrooms": 4,
    "balconies": 0,
    "carpetAreaSqFt": 3800,
    "superBuiltUpSqFt": 5000,
    "furnishing": "UNFURNISHED",
    "parkingSpaces": 6,
    "floorNo": 1,
    "totalFloors": 3,
    "facing": "NORTH",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "SCO 42-43, Central Boulevard, Sector 82 IT City",
    "localityName": "Sector 82 IT City",
    "city": "Mohali",
    "state": "Punjab",
    "pinCode": "140306",
    "latitude": 30.6598,
    "longitude": 76.7312,
    "reraId": "PBRERA-SAS80-PR0719",
    "truthScore": 93,
    "isVerified": true,
    "isFeatured": false,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"200-Ft Airport Road Main Frontage\",\"Basement Private Storage & Parking\",\"Provision for High-Speed Capsule Glass Lift\",\"Dedicated Transformer Substation\",\"Ample Surface Visitor Car Parking\"]",
    "images": "[\"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  },
  {
    "id": "cmvv8q1v2000ty0fma8wdwqjn",
    "slug": "trump-towers-4bhk-signature-glass-sector-69-gurugram",
    "title": "Trump Towers Delhi NCR 4BHK Signature Glass Residence",
    "description": "Iconic all-glass silhouette dominating the NCR skyline. Double-height living rooms with 22-foot ceilings, temperature-controlled infinity edge pool, 24/7 Trump white-glove valet, and private dining hall.",
    "propertyType": "APARTMENT",
    "listingType": "SALE",
    "price": 95000000,
    "pricePerSqFt": 21111,
    "maintenanceFees": 22000,
    "bedrooms": 4,
    "bathrooms": 5,
    "balconies": 3,
    "carpetAreaSqFt": 3600,
    "superBuiltUpSqFt": 4500,
    "furnishing": "SEMI_FURNISHED",
    "parkingSpaces": 3,
    "floorNo": 32,
    "totalFloors": 47,
    "facing": "NORTH_EAST",
    "possessionStatus": "READY_TO_MOVE",
    "ageOfProperty": 1,
    "address": "East Tower, Trump Towers Delhi NCR, Sector 69",
    "localityName": "Golf Course Extension Road",
    "city": "Gurugram",
    "state": "Haryana",
    "pinCode": "122101",
    "latitude": 28.3995,
    "longitude": 77.0345,
    "reraId": "HRERA-PKL-GGM-112-2018",
    "truthScore": 97,
    "isVerified": true,
    "isFeatured": true,
    "isPromoted": true,
    "status": "AVAILABLE",
    "amenities": "[\"Trump White-Glove Global Concierge\",\"22-Ft Double-Height Cathedral Living Room\",\"Temperature Controlled Glass Infinity Pool\",\"Private Sommelier Wine Tasting Room\",\"Chauffeur Rest Lounge & Car Spa\"]",
    "images": "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80\"]",
    "organization": {
      "name": "Apex Heritage Realty",
      "reraNumber": "PBRERA-SAS80-REA0419",
      "phone": "+91 93685 93249"
    },
    "user": {
      "name": "Rahul Sharma",
      "phone": "+91 93685 93249",
      "licenseNo": "RERA-PB-AGT-2023-0941"
    }
  }
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
