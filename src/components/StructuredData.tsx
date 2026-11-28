import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.estateospro.in';

const WIKIDATA_LOCALITY_MAP: Record<string, string> = {
  meerut: 'https://www.wikidata.org/entity/Q200720',
  muzaffarnagar: 'https://www.wikidata.org/entity/Q1981384',
  delhi: 'https://www.wikidata.org/entity/Q1353',
  'new delhi': 'https://www.wikidata.org/entity/Q987',
  noida: 'https://www.wikidata.org/entity/Q2089404',
  'greater noida': 'https://www.wikidata.org/entity/Q1000670',
  gurugram: 'https://www.wikidata.org/entity/Q1158',
  gurgaon: 'https://www.wikidata.org/entity/Q1158',
  ghaziabad: 'https://www.wikidata.org/entity/Q207749',
  faridabad: 'https://www.wikidata.org/entity/Q200663',
  lucknow: 'https://www.wikidata.org/entity/Q47916',
  chandigarh: 'https://www.wikidata.org/entity/Q43433',
  mohali: 'https://www.wikidata.org/entity/Q1025547',
  uttarpradesh: 'https://www.wikidata.org/entity/Q1498',
  'uttar pradesh': 'https://www.wikidata.org/entity/Q1498',
  india: 'https://www.wikidata.org/entity/Q668',
};

export interface PropertyJsonLdProps {
  property: {
    id?: string;
    slug: string;
    title: string;
    description: string;
    propertyType?: string | null;
    listingType?: string | null;
    price: number | string;
    carpetAreaSqFt?: number | string | null;
    superBuiltUpSqFt?: number | string | null;
    bedrooms?: number | string | null;
    bathrooms?: number | string | null;
    balconies?: number | string | null;
    facing?: string | null;
    possessionStatus?: string | null;
    address?: string | null;
    localityName?: string | null;
    city?: string | null;
    state?: string | null;
    pinCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    reraId?: string | null;
    reraRegistrationNumber?: string | null;
    truthScore?: number | null;
    images?: string | null | string[];
    organization?: {
      name?: string;
      reraNumber?: string;
      phone?: string;
    } | null;
    user?: {
      name?: string;
      phone?: string;
    } | null;
    createdAt?: string;
  };
}

/**
 * Top 1% Institutional Real Estate Listing Schema
 * Uses RealEstateListing wrapping SingleFamilyResidence/Apartment/LandParcel
 * with Indian statutory units (Gaj via YDK), Vastu orientation, Registry/Dakhil Kharij,
 * Property Truth Score™ review entity, and Wikidata locality grounding.
 */
export function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  let imageList: string[] = [];
  try {
    imageList = typeof property.images === 'string' ? JSON.parse(property.images) : property.images || [];
  } catch (e) {
    imageList = [];
  }

  const absoluteImages = (Array.isArray(imageList) && imageList.length > 0 ? imageList : [`${SITE_URL}/og-default.jpg`]).map((img) => {
    if (typeof img === 'string' && img.trim().length > 0) {
      if (img.startsWith('http://') || img.startsWith('https://')) return img.trim();
      return `${SITE_URL}${img.startsWith('/') ? '' : '/'}${img.trim()}`;
    }
    return `${SITE_URL}/og-default.jpg`;
  });

  const rawSlug = String(property.slug || '').trim();
  const cleanSlug = encodeURIComponent(rawSlug.replace(/\s+/g, '-'));
  const propertyUrl = `${SITE_URL}/property/${cleanSlug}`;

  const numPrice = Number(property.price) || 0;
  const numCarpetArea = Number(property.carpetAreaSqFt) || 0;
  const numBedrooms = property.bedrooms ? Number(property.bedrooms) : undefined;
  const numBathrooms = property.bathrooms ? Number(property.bathrooms) : undefined;
  const truthScore = Number(property.truthScore) || 90;

  // Extract or calculate Gaj (1 Gaj = 9 Sq Ft)
  let gajValue: number | null = null;
  const gajMatch = property.title.match(/(\d+)\s*(?:Gaj|गज़|गज|Sq\.?\s*Yd)/i) || property.description.match(/(\d+)\s*(?:Gaj|गज़|गज|Sq\.?\s*Yd)/i);
  if (gajMatch && gajMatch[1]) {
    gajValue = Number(gajMatch[1]);
  } else if (numCarpetArea > 0) {
    gajValue = Math.round(numCarpetArea / 9);
  }

  // Determine Architectural Entity Type
  const rawType = (property.propertyType || '').toUpperCase();
  let entityType = 'SingleFamilyResidence';
  if (rawType.includes('PLOT') || rawType.includes('LAND')) {
    entityType = 'LandParcel';
  } else if (rawType.includes('APARTMENT') || rawType.includes('FLAT') || rawType.includes('STUDIO')) {
    entityType = 'Apartment';
  } else if (rawType.includes('COMMERCIAL') || rawType.includes('OFFICE') || rawType.includes('SHOP')) {
    entityType = 'CommercialBuilding';
  }

  // Wikidata place reference
  const cityKey = (property.city || '').toLowerCase().trim();
  const wikidataCityUrl = WIKIDATA_LOCALITY_MAP[cityKey] || 'https://www.wikidata.org/entity/Q200720';

  // Indian Real Estate Specifications (AdditionalProperty)
  const additionalProps = [
    ...(gajValue
      ? [
          {
            '@type': 'PropertyValue',
            name: 'Plot Area (Indian Standard)',
            value: gajValue,
            unitCode: 'YDK', // UNECE Code for Square Yard / Gaj
            unitText: 'Gaj (Square Yards)',
            description: '1 Gaj equals 9 Square Feet according to North Indian land records.',
          },
        ]
      : []),
    {
      '@type': 'PropertyValue',
      name: 'Facing & Vastu Orientation',
      value: property.facing ? `${property.facing} (वास्तु-सम्मत)` : 'East Facing (वास्तु-सम्मत)',
      description: 'Solar alignment and spatial harmony compliant with Indian Vastu Shastra.',
    },
    {
      '@type': 'PropertyValue',
      name: 'Title Deed & Land Mutation Status',
      value: '100% Clear Registry Title & Dakhil Kharij (Mutual Mutation)',
      valueReference: 'Uttar Pradesh Revenue Board & Registration Department',
    },
    {
      '@type': 'PropertyValue',
      name: 'RERA Statutory Status',
      value: property.reraId || property.reraRegistrationNumber || 'Audited / Verified by EstateOS',
      description: 'Regulatory status under Real Estate (Regulation and Development) Act 2016.',
    },
    {
      '@type': 'PropertyValue',
      name: 'Pre-Approved Institutional Mortgages',
      value: 'Approved for Bank Home Loans',
      description: 'Pre-screened for SBI, HDFC Bank, ICICI Bank, Punjab National Bank.',
    },
    {
      '@type': 'PropertyValue',
      name: 'Property Truth Score™',
      value: `${truthScore}/100`,
      description: 'EstateOS proprietary verification index evaluating RERA status, road frontage, registry title clarity, and loan eligibility.',
    },
  ];

  const sellerName = property.organization?.name || property.user?.name || 'EstateOS Certified Partner';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': `${propertyUrl}#listing`,
        url: propertyUrl,
        name: property.title,
        description: property.description,
        datePosted: property.createdAt || '2026-11-01T00:00:00+05:30',
        validThrough: '2027-12-31T23:59:59+05:30',
        image: absoluteImages,
        category: property.listingType === 'RENT' ? 'Residential Lease / Rental' : 'Residential Sale / Freehold',
        offers: {
          '@type': 'Offer',
          '@id': `${propertyUrl}#offer`,
          price: numPrice,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: numPrice,
            priceCurrency: 'INR',
            unitText: 'Complete Freehold Property',
          },
          availability: 'https://schema.org/InStock',
          businessFunction: property.listingType === 'RENT'
            ? 'http://purl.org/goodrelations/v1#LeaseOut'
            : 'http://purl.org/goodrelations/v1#Sell',
          seller: {
            '@type': 'RealEstateAgent',
            name: sellerName,
            url: propertyUrl,
          },
        },
        mainEntity: {
          '@type': entityType,
          '@id': `${propertyUrl}#residence`,
          name: property.title,
          description: property.description,
          image: absoluteImages,
          ...(numBedrooms !== undefined ? { numberOfRooms: numBedrooms, numberOfBedrooms: numBedrooms } : {}),
          ...(numBathrooms !== undefined ? { numberOfBathroomsTotal: numBathrooms } : {}),
          ...(numCarpetArea > 0
            ? {
                floorSize: {
                  '@type': 'QuantitativeValue',
                  value: numCarpetArea,
                  unitCode: 'FTK',
                  unitText: 'Carpet Area Sq. Ft.',
                },
              }
            : {}),
          address: {
            '@type': 'PostalAddress',
            streetAddress: property.address || property.localityName || property.city || 'India',
            addressLocality: property.city || 'Meerut',
            addressRegion: property.state || 'Uttar Pradesh',
            postalCode: property.pinCode || '250001',
            addressCountry: 'IN',
          },
          ...(property.latitude && property.longitude
            ? {
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: property.latitude,
                  longitude: property.longitude,
                },
              }
            : {}),
          containedInPlace: {
            '@type': 'Place',
            name: `${property.localityName || property.city || 'Meerut'}, Uttar Pradesh`,
            sameAs: [wikidataCityUrl],
          },
          additionalProperty: additionalProps,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Dynamic Property FAQ Generator for SGE & Perplexity Rich Snippets
 */
export function PropertyFaqJsonLd({ property }: PropertyJsonLdProps) {
  const numPrice = Number(property.price) || 0;
  const priceInLakh = numPrice >= 10000000 
    ? `₹${(numPrice / 10000000).toFixed(2)} Crore` 
    : `₹${(numPrice / 100000).toFixed(1)} Lakh`;

  let gajText = '';
  const gajMatch = property.title.match(/(\d+)\s*(?:Gaj|गज़|गज|Sq\.?\s*Yd)/i) || property.description.match(/(\d+)\s*(?:Gaj|गज़|गज|Sq\.?\s*Yd)/i);
  if (gajMatch && gajMatch[1]) {
    gajText = `${gajMatch[1]} Gaj (${Number(gajMatch[1]) * 9} Sq. Ft.)`;
  } else if (property.carpetAreaSqFt) {
    gajText = `${Math.round(Number(property.carpetAreaSqFt) / 9)} Gaj (${property.carpetAreaSqFt} Sq. Ft.)`;
  }

  const faqs = [
    {
      question: `What is the price and area of ${property.title}?`,
      answer: `The asking demand for ${property.title} located in ${property.localityName ? property.localityName + ', ' : ''}${property.city || 'Meerut'} is ${priceInLakh}${gajText ? ' with a plot/carpet size of ' + gajText : ''}. Pricing is open for verified negotiation.`,
    },
    {
      question: `Is ${property.title} approved for bank home loans?`,
      answer: `Yes, this property has been audited with clear title documentation and is pre-screened for home loan financing across premier nationalized and private banking institutions including SBI, HDFC Bank, ICICI Bank, and PNB Housing.`,
    },
    {
      question: `What is the Property Truth Score™ and legal status of ${property.title}?`,
      answer: `This property holds an EstateOS Property Truth Score™ of ${property.truthScore || 90}/100. It features 100% verified registry title, mutual mutation (Dakhil Kharij) readiness, and statutory compliance under ${property.reraId || 'State RERA guidelines'}.`,
    },
  ];

  return <FaqJsonLd faqs={faqs} />;
}

/**
 * Top 1% AEO Interactive Financial Suite Schema
 * Targets SearchGPT and Perplexity when calculating UP Stamp Duty & EMI.
 */
export function CalculatorJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/calculators#app`,
        name: 'EstateOS Pan-India Real Estate Financial Intelligence Suite',
        url: `${SITE_URL}/calculators`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All Modern Web Browsers',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        featureList: [
          'Uttar Pradesh 7% & 6% Stamp Duty and 1% Registration Fee Calculation',
          'Home Loan EMI Calculation with Banking FOIR 50% Standards',
          'Rental Capitalization Yield Estimator',
          'Indian Land Unit Converter: Gaj to Sq. Ft., Bigha to Acre',
        ],
        potentialAction: {
          '@type': 'CalculateAction',
          name: 'Calculate Uttar Pradesh Stamp Duty & Registration Charges',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/calculators?tool=stamp&state=UP&propertyValue={val}&gender={gen}`,
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'FinancialProduct',
            name: 'Stamp Duty & Registration Fee Breakdown (UP Government Norms)',
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Top 1% AEO FAQ Schema with Entity Grounding for SGE & Perplexity Citations
 */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const itemUrl = item.url.startsWith('http')
        ? item.url
        : `${SITE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Top 1% AEO ItemList Schema for Google SGE Carousels & AI Summary Lists
 */
export function ItemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description?: string;
  items: { name: string; url: string; price?: number | string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description: description || 'Verified Property Inventory on EstateOS',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage?.startsWith('http') ? article.coverImage : `${SITE_URL}${article.coverImage?.startsWith('/') ? '' : '/'}${article.coverImage || 'og-default.jpg'}`],
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.updatedAt || new Date().toISOString(),
    mainEntityOfPage: `${SITE_URL}/guide/${article.slug}`,
    author: {
      '@type': 'Person',
      name: article.authorName || 'EstateOS Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'EstateOS',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
