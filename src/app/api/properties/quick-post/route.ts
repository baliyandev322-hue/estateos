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
    if (!Number.isFinite(numPrice) || numPrice <= 0 || !Number.isFinite(numArea) || numArea <= 0) {
      return NextResponse.json(
        { error: 'Price and Area must be valid positive numbers' },
        { status: 400 }
      );
    }
    const pricePerSqFt = Math.round(numPrice / numArea);

    const CITY_GEO_DEFAULTS: Record<string, { state: string; pinCode: string }> = {
      muzaffarnagar: { state: 'Uttar Pradesh', pinCode: '251001' },
      shamli: { state: 'Uttar Pradesh', pinCode: '247776' },
      meerut: { state: 'Uttar Pradesh', pinCode: '250001' },
      noida: { state: 'Uttar Pradesh', pinCode: '201301' },
      delhi: { state: 'Delhi', pinCode: '110001' },
      gurugram: { state: 'Haryana', pinCode: '122001' },
      mohali: { state: 'Punjab', pinCode: '140306' },
      chandigarh: { state: 'Chandigarh', pinCode: '160001' },
      bangalore: { state: 'Karnataka', pinCode: '560001' },
      mumbai: { state: 'Maharashtra', pinCode: '400001' },
      hyderabad: { state: 'Telangana', pinCode: '500001' },
    };
    const geoDefaults = CITY_GEO_DEFAULTS[String(city).toLowerCase().trim()] || {
      state: 'India',
      pinCode: '110001',
    };

    // Base slug
    let baseSlug = slugify(`${title}-${localityName}-${city}`);
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await prisma.property.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Upsert a dedicated verified partner organization for the listed broker/owner so calls & WhatsApp route directly to them
    const partnerName = ownerName && String(ownerName).trim().length > 0
      ? String(ownerName).trim()
      : `Verified Partner (${String(ownerPhone).replace(/\D/g, '').slice(-4) || 'UP'})`;
    const phoneDigits = String(ownerPhone).replace(/\D/g, '').slice(-10) || Date.now().toString().slice(-6);
    const partnerSlug = slugify(`${partnerName}-${phoneDigits.slice(-4)}`) || `partner-${phoneDigits}`;

    const partnerOrg = await prisma.organization.upsert({
      where: { slug: partnerSlug },
      update: {
        name: partnerName,
        phone: String(ownerPhone).trim(),
        city,
        state: geoDefaults.state,
        isVerified: true,
      },
      create: {
        name: partnerName,
        slug: partnerSlug,
        type: 'AGENT_AGENCY',
        phone: String(ownerPhone).trim(),
        city,
        state: geoDefaults.state,
        isVerified: true,
      },
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
        state: geoDefaults.state,
        pinCode: geoDefaults.pinCode,
        address: address || `${localityName}, ${city}`,
        truthScore: reraId ? 95 : 91,
        isVerified: true,
        isFeatured: true,
        status: 'AVAILABLE',
        reraId: reraId || 'SELF_DECLARED_VERIFIED',
        images: imagesJson,
        orgId: partnerOrg.id,
        userId: null,
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
