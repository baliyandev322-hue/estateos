import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.estateospro.in';

interface PropertyJsonLdProps {
  property: {
    title: string;
    description: string;
    price: number;
    carpetAreaSqFt: number;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    images?: string | null | string[];
    slug: string;
    reraRegistrationNumber?: string | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
  };
}

export function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  let imageList: string[] = [];
  try {
    imageList = typeof property.images === 'string' ? JSON.parse(property.images) : property.images || [];
  } catch (e) {
    imageList = [];
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/property/${property.slug}`,
    image: imageList.length > 0 ? imageList : [`${SITE_URL}/og-default.jpg`],
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.pinCode,
      addressCountry: 'IN',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.carpetAreaSqFt,
      unitCode: 'FTK',
    },
    numberOfRooms: property.bedrooms || undefined,
    numberOfBathroomsTotal: property.bathrooms || undefined,
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
    image: [article.coverImage || `${SITE_URL}/og-default.jpg`],
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
        url: `${SITE_URL}/logo.png`,
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
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
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
