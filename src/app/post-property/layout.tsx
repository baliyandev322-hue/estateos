import type { Metadata } from 'next';
import React from 'react';
import { BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Post Property Free in Muzaffarnagar & UP (60 Sec) | EstateOS',
  description: 'Post your residential plot, flat, shop or commercial property for free in Muzaffarnagar & UP. Reach genuine verified buyers directly with zero brokerage.',
  keywords: 'post property free in muzaffarnagar, sell property online free up, post property online free without brokerage, list flat plot muzaffarnagar',
  alternates: {
    canonical: 'https://www.estateospro.in/post-property',
  },
  openGraph: {
    title: 'Post Property Free in Muzaffarnagar & UP (60 Sec) | EstateOS',
    description: 'Post your residential plot, flat, shop or commercial property for free in Muzaffarnagar & UP. Reach genuine verified buyers directly with zero brokerage.',
    url: 'https://www.estateospro.in/post-property',
    type: 'website',
  },
};

export default function PostPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Post Property Free', url: '/post-property' },
        ]}
      />
      {children}
    </>
  );
}
