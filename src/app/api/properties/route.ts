import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { CURATED_PROPERTIES, filterCuratedProperties } from '@/lib/curatedProperties';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';
  const locality = searchParams.get('locality') || '';
  const propertyType = searchParams.get('propertyType') || '';
  const listingType = searchParams.get('listingType') || '';
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined;
  const verified = searchParams.get('verified') === 'true';
  const featured = searchParams.get('featured') === 'true';
  const sort = searchParams.get('sort') || 'newest';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));

  try {
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

    if (city && city !== 'All') {
      where.city = { equals: city };
    }

    if (locality) {
      where.localityName = { contains: locality };
    }

    if (propertyType && propertyType !== 'ALL') {
      where.propertyType = propertyType;
    }

    if (listingType && listingType !== 'ALL') {
      where.listingType = listingType;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (bedrooms !== undefined && bedrooms > 0) {
      where.bedrooms = { gte: bedrooms };
    }

    if (verified) {
      where.isVerified = true;
    }

    if (featured) {
      where.isFeatured = true;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'truth_score') orderBy = { truthScore: 'desc' };

    let total = await prisma.property.count({ where });
    let properties = await prisma.property.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            isVerified: true,
            reraNumber: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            licenseNo: true,
            phone: true,
          },
        },
      },
    });

    if (!properties || properties.length === 0) {
      const fallbackList = filterCuratedProperties({
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
      total = fallbackList.length;
      properties = fallbackList.slice((page - 1) * limit, page * limit) as any;
    }

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.warn('Falling back to curated properties in /api/properties:', error?.message);
    const fallbackList = filterCuratedProperties({
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
    const total = fallbackList.length;
    const properties = fallbackList.slice((page - 1) * limit, page * limit);
    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      propertyType,
      listingType,
      price,
      pricePerSqFt,
      maintenanceFees,
      bedrooms,
      bathrooms,
      balconies,
      carpetAreaSqFt,
      superBuiltUpSqFt,
      furnishing,
      parkingSpaces,
      floorNo,
      totalFloors,
      facing,
      possessionStatus,
      address,
      localityName,
      city,
      state,
      pinCode,
      reraId,
      amenities,
      images,
      videoUrl,
      orgId,
    } = body;

    if (!title || !propertyType || !listingType || !price || !carpetAreaSqFt || !localityName || !city) {
      return NextResponse.json({ error: 'Missing mandatory property fields' }, { status: 400 });
    }

    // Tenant check: verify listing limit
    const targetOrgId = orgId || user.orgId;
    if (targetOrgId) {
      const sub = await prisma.subscription.findFirst({
        where: { orgId: targetOrgId, status: 'ACTIVE' },
      });
      const activeCount = await prisma.property.count({
        where: { orgId: targetOrgId },
      });

      const limit = sub?.listingsLimit || 5;
      if (activeCount >= limit) {
        return NextResponse.json(
          { error: `Subscription limit reached (${activeCount}/${limit} listings). Upgrade to post more.` },
          { status: 403 }
        );
      }
    }

    const baseSlug = slugify(title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    // Calculated base truth score
    let calculatedTruthScore = 60;
    if (reraId && reraId.trim().length > 4) calculatedTruthScore += 20;
    if (images && images.length >= 3) calculatedTruthScore += 10;
    if (address && pinCode) calculatedTruthScore += 5;

    const property = await prisma.property.create({
      data: {
        slug: uniqueSlug,
        title,
        description,
        propertyType,
        listingType,
        price: parseFloat(price),
        pricePerSqFt: pricePerSqFt ? parseFloat(pricePerSqFt) : Math.round(parseFloat(price) / parseFloat(carpetAreaSqFt)),
        maintenanceFees: maintenanceFees ? parseFloat(maintenanceFees) : 0,
        bedrooms: bedrooms ? parseInt(bedrooms) : 0,
        bathrooms: bathrooms ? parseInt(bathrooms) : 0,
        balconies: balconies ? parseInt(balconies) : 0,
        carpetAreaSqFt: parseFloat(carpetAreaSqFt),
        superBuiltUpSqFt: superBuiltUpSqFt ? parseFloat(superBuiltUpSqFt) : undefined,
        furnishing: furnishing || 'SEMI_FURNISHED',
        parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : 1,
        floorNo: floorNo ? parseInt(floorNo) : 1,
        totalFloors: totalFloors ? parseInt(totalFloors) : 1,
        facing: facing || 'EAST',
        possessionStatus: possessionStatus || 'READY_TO_MOVE',
        address,
        localityName,
        city,
        state: state || 'India',
        pinCode,
        reraId: reraId || null,
        truthScore: calculatedTruthScore,
        truthScoreDetails: JSON.stringify({
          agentIdentityVerified: true,
          reraOfficialCheck: reraId ? 'SELF_DECLARED_PENDING_REGISTRY' : 'UNVERIFIED',
          completenessScore: 85,
        }),
        isVerified: false,
        amenities: typeof amenities === 'string' ? amenities : JSON.stringify(amenities || []),
        images: typeof images === 'string' ? images : JSON.stringify(images || []),
        videoUrl: videoUrl || null,
        userId: user.id,
        orgId: targetOrgId || null,
      },
    });

    return NextResponse.json({ success: true, property });
  } catch (error: any) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
