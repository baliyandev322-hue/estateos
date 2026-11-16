import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.estateospro.in';

interface PropertyJsonLdProps {
  property: {
    title: string;
    description: string;
    price: number | string;
    carpetAreaSqFt?: number | string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    pinCode?: string | null;
    localityName?: string | null;
    images?: string | null | string[];
    slug: string;
    reraRegistrationNumber?: string | null;
    reraId?: string | null;
    bedrooms?: number | string | null;
    bathrooms?: number | string | null;
  };
}

export function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  let imageList: string[] = [];
  try {
    imageList = typeof property.images === 'string' ? JSON.parse(property.images) : property.images || [];
  } catch (e) {
    imageList = [];
  }

  // Ensure every image URL is a valid, absolute HTTP(S) URL
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
  const numBedrooms = property.bedrooms !== null && property.bedrooms !== undefined && Number(property.bedrooms) > 0
    ? Number(property.bedrooms)
    : undefined;
  const numBathrooms = property.bathrooms !== null && property.bathrooms !== undefined && Number(property.bathrooms) > 0
    ? Number(property.bathrooms)
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: property.title,
    description: property.description,
    url: propertyUrl,
    image: absoluteImages,
    offers: {
      '@type': 'Offer',
      price: numPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      priceValidUntil: '2027-12-31',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address || property.localityName || property.city || 'India',
      addressLocality: property.city || 'Meerut',
      addressRegion: property.state || 'Uttar Pradesh',
      postalCode: property.pinCode || '250001',
      addressCountry: 'IN',
    },
    ...(numCarpetArea > 0
      ? {
          floorSize: {
            '@type': 'QuantitativeValue',
            value: numCarpetArea,
            unitCode: 'FTK',
          },
        }
      : {}),
    ...(numBedrooms !== undefined ? { numberOfRooms: numBedrooms } : {}),
    ...(numBathrooms !== undefined ? { numberOfBathroomsTotal: numBathrooms } : {}),
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
