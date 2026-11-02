import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { sendAdminLeadAlert } from '@/lib/emailService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      propertyType = 'APARTMENT',
      listingType = 'SALE',
      price,
      carpetAreaSqFt,
      bedrooms = 0,
      bathrooms = 0,
      city = 'Muzaffarnagar',
      localityName,
      address,
      ownerName,
      ownerPhone,
      reraId,
      images = [],
    } = body;

    if (!title || !price || !carpetAreaSqFt || !localityName || !ownerPhone) {
      return NextResponse.json(
        { error: 'Please provide Title, Price, Area, Locality, and Contact Phone' },
        { status: 400 }
      );
    }

    const numPrice = parseFloat(price);
    const numArea = parseFloat(carpetAreaSqFt);
    const pricePerSqFt = numArea > 0 ? Math.round(numPrice / numArea) : 0;

    // Base slug
    let baseSlug = slugify(`${title}-${localityName}-${city}`);
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await prisma.property.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Default agent/org fallback for assignment
    const defaultOrg = await prisma.organization.findFirst({
      where: { slug: 'apex-heritage-realty' },
    });
    const defaultUser = await prisma.user.findFirst({
      where: { role: 'AGENT' },
    });

    const imagesJson = Array.isArray(images) && images.length > 0
      ? JSON.stringify(images)
      : JSON.stringify([
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ]);

    const property = await prisma.property.create({
      data: {
        slug,
        title,
        description: description || `${title} located in prime ${localityName}, ${city}. Verified residential/commercial offering with excellent connectivity and infrastructure.`,
        propertyType,
        listingType,
        price: numPrice,
        pricePerSqFt,
        carpetAreaSqFt: numArea,
        superBuiltUpSqFt: Math.round(numArea * 1.2),
        bedrooms: parseInt(bedrooms) || 0,
        bathrooms: parseInt(bathrooms) || 0,
        localityName,
        city,
        state: city === 'Muzaffarnagar' ? 'Uttar Pradesh' : 'India',
        pinCode: city === 'Muzaffarnagar' ? '251001' : '140306',
        address: address || `${localityName}, ${city}`,
        truthScore: reraId ? 95 : 91,
        isVerified: true,
        isFeatured: true,
        status: 'AVAILABLE',
        reraId: reraId || 'SELF_DECLARED_VERIFIED',
        images: imagesJson,
        orgId: defaultOrg?.id,
        userId: defaultUser?.id,
      },
    });

    // Send real-time instant alert to Admin via Resend & Nodemailer
    try {
      await sendAdminLeadAlert({
        leadType: 'PROPERTY_ENQUIRY',
        name: ownerName || 'Verified Partner',
        phone: ownerPhone,
        message: `New Property Listed: ${title} (${propertyType} for ${listingType}) in ${localityName}, ${city}. Price: ₹${numPrice.toLocaleString('en-IN')}. Link: https://www.estateospro.in/property/${slug}`,
        details: {
          slug,
          locality: localityName,
          city,
          price: numPrice,
        },
      });
    } catch (e) {
      console.warn('Admin notification for new property posting suppressed:', e);
    }

    return NextResponse.json({
      success: true,
      slug: property.slug,
      id: property.id,
      message: 'Property successfully published to EstateOS Marketplace!',
    });
  } catch (error: any) {
    console.error('Quick post property error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal error creating property listing' },
      { status: 500 }
    );
  }
}
