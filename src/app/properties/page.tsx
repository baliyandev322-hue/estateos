import React from 'react';
import PropertySearchClient from './PropertySearchClient';
import prisma from '@/lib/prisma';
import { CURATED_PROPERTIES, filterCuratedProperties } from '@/lib/curatedProperties';

export const revalidate = 60;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const params = searchParams || {};
  const search = params.search || '';
  const city = params.city || '';
  const locality = params.locality || '';
  const propertyType = params.propertyType || '';
  const listingType = params.listingType || '';
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;
  const bedrooms = params.bedrooms ? parseInt(params.bedrooms) : undefined;
  const verified = params.verified === 'true';
  const sort = params.sort || 'newest';
  const page = Math.max(1, parseInt(params.page || '1'));
  const limit = 12;

  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { address: { contains: search } },
      { localityName: { contains: search } },
      { city: { contains: search } },
    ];
  }
  if (city && city !== 'All') where.city = city;
  if (locality) where.localityName = { contains: locality };
  if (propertyType && propertyType !== 'ALL') where.propertyType = propertyType;
  if (listingType && listingType !== 'ALL') where.listingType = listingType;
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }
  if (bedrooms && bedrooms > 0) where.bedrooms = { gte: bedrooms };
  if (verified) where.isVerified = true;

  let orderBy: any = [{ isPromoted: 'desc' }, { createdAt: 'desc' }];
  if (sort === 'price_asc') orderBy = [{ isPromoted: 'desc' }, { price: 'asc' }];
  else if (sort === 'price_desc') orderBy = [{ isPromoted: 'desc' }, { price: 'desc' }];
  else if (sort === 'truth_score') orderBy = [{ isPromoted: 'desc' }, { truthScore: 'desc' }];

  let total = 0;
  let properties: any[] = [];
  let localities: any[] = [];

  try {
    const res = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          organization: true,
          user: true,
        },
      }),
      prisma.locality.findMany({
        select: { name: true, city: true },
      }),
    ]);
    total = res[0];
    properties = res[1];
    localities = res[2];
  } catch (err) {
    console.warn('Database query fallback triggered in properties search:', err);
  }

  // Resilient fallback: If DB returned 0 items or threw an error, populate with curated verified properties
  if (!properties || properties.length === 0) {
    const filteredFallback = filterCuratedProperties({
      search,
      city,
      locality,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      bedrooms,
      verified,
      sort,
    });
    total = filteredFallback.length;
    properties = filteredFallback.slice((page - 1) * limit, page * limit);
  }

  if (!localities || localities.length === 0) {
    localities = [
      { name: 'Golf Course Extension Road', city: 'Gurugram' },
      { name: 'Sector 82 IT City', city: 'Mohali' },
      { name: 'Indiranagar', city: 'Bangalore' },
      { name: 'Bandra West', city: 'Mumbai' },
      { name: 'Gachibowli Financial District', city: 'Hyderabad' },
    ];
  }

  return (
    <PropertySearchClient
      initialProperties={properties as any}
      totalCount={total}
      currentPage={page}
      limit={limit}
      initialParams={params}
      localities={localities}
    />
  );
}
