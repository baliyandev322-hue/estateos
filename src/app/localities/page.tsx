import React from 'react';
import prisma from '@/lib/prisma';
import LocalitiesClient from './LocalitiesClient';

export const dynamic = 'force-dynamic';

const FALLBACK_LOCALITIES = [
  {
    id: 'loc-1',
    slug: 'sector-82-it-city-mohali',
    name: 'Sector 82 IT City',
    city: 'Mohali',
    state: 'Punjab',
    pinCode: '140306',
    overview: 'High-growth institutional & technology corridor adjoining international airport highway.',
    avgPricePerSqFt: 5450,
    rentalYieldPercent: 4.8,
    priceTrend1Yr: 12.4,
    priceTrend3Yr: 36.2,
    safetyRating: 4.6,
    connectivityRating: 4.8,
    greenCoverRating: 4.4,
    metroDistanceKm: 4.2,
    airportDistanceKm: 9.5,
    schoolsCount: 14,
    hospitalsCount: 6,
    mallsCount: 5,
    latitude: 30.6558,
    longitude: 76.7324,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'loc-2',
    slug: 'golf-course-extension-gurugram',
    name: 'Golf Course Extension',
    city: 'Gurugram',
    state: 'Haryana',
    pinCode: '122018',
    overview: 'Ultra-prime luxury residential corridor with championship golf views and Fortune 500 commercial headquarters.',
    avgPricePerSqFt: 14200,
    rentalYieldPercent: 4.2,
    priceTrend1Yr: 14.8,
    priceTrend3Yr: 48.6,
    safetyRating: 4.8,
    connectivityRating: 4.9,
    greenCoverRating: 4.1,
    metroDistanceKm: 1.8,
    airportDistanceKm: 18.0,
    schoolsCount: 22,
    hospitalsCount: 8,
    mallsCount: 9,
    latitude: 28.4116,
    longitude: 77.0784,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
];

export default async function LocalitiesPage() {
  let localities: any[] = [];
  try {
    localities = await prisma.locality.findMany({
      orderBy: { avgPricePerSqFt: 'desc' },
    });
  } catch (err) {
    console.warn('Failed to load localities from DB, using fallback:', err);
  }

  if (!localities || localities.length === 0) {
    localities = FALLBACK_LOCALITIES;
  }

  return <LocalitiesClient localities={localities as any} />;
}
