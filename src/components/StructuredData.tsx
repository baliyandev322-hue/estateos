import React from 'react';

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
    images?: string | null;
    slug: string;
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
    url: `https://estateos.in/property/${property.slug}`,
    image: imageList,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
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
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EstateOS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://estateos.in/logo.png',
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
