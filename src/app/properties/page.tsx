import React from 'react';
import PropertySearchClient from './PropertySearchClient';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const search = searchParams.search || '';
  const city = searchParams.city || '';
  const locality = searchParams.locality || '';
  const propertyType = searchParams.propertyType || '';
  const listingType = searchParams.listingType || '';
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const bedrooms = searchParams.bedrooms ? parseInt(searchParams.bedrooms) : undefined;
  const verified = searchParams.verified === 'true';
  const sort = searchParams.sort || 'newest';
  const page = Math.max(1, parseInt(searchParams.page || '1'));
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

  const [total, properties, localities] = await Promise.all([
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

  return (
    <PropertySearchClient
      initialProperties={properties as any}
      totalCount={total}
      currentPage={page}
      limit={limit}
      initialParams={searchParams}
      localities={localities}
    />
  );
}
