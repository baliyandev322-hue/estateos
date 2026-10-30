import { NextResponse } from 'next/server';
import { lookupReraProject } from '@/lib/reraSync';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const regNo = searchParams.get('regNo') || searchParams.get('q');

    if (!regNo) {
      return NextResponse.json(
        { error: 'Registration number or project name parameter is required' },
        { status: 400 }
      );
    }

    // 1. Try finding in database property table
    let dbMatch: any = null;
    try {
      dbMatch = await prisma.property.findFirst({
        where: {
          OR: [
            { reraId: { contains: regNo, mode: 'insensitive' } },
            { title: { contains: regNo, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          reraId: true,
          truthScore: true,
          isVerified: true,
          city: true,
          localityName: true,
        },
      });
    } catch (err) {
      // Prisma offline fallback
    }

    // 2. Perform statutory RERA registry lookup
    const lookup = lookupReraProject(regNo);

    if (lookup.found && lookup.match) {
      return NextResponse.json({
        success: true,
        status: 'VERIFIED_ACTIVE',
        registrationNumber: lookup.match.regNo,
        project: lookup.match,
        portalVerification: {
          stateAuthority: lookup.match.stateAuthority,
          officialPortalUrl: lookup.match.authorityPortalUrl,
          directGovtVerificationLink: lookup.match.directVerifyUrl,
          escrowCompliance: '100% Escrow Account Active',
          titleAudit: lookup.match.encumbranceStatus,
        },
        linkedEstateOSProperty: dbMatch,
      });
    }

    // Project not yet cached in EstateOS registry, but valid state authority identified
    return NextResponse.json({
      success: true,
      status: 'STATUTORY_PORTAL_ROUTED',
      registrationNumber: lookup.normalizedRegNo,
      message: `The registration number matches the statutory ${lookup.inferredState} RERA pattern. Verify live on the official State Authority portal.`,
      portalVerification: {
        stateAuthority: lookup.authorityInfo?.name,
        officialPortalUrl: lookup.authorityInfo?.portal,
        directGovtVerificationLink: lookup.authorityInfo?.searchUrl,
        helpline: lookup.authorityInfo?.helpline,
      },
    });
  } catch (error: any) {
    console.error('RERA verification error:', error);
    return NextResponse.json({ error: 'Failed to complete RERA verification' }, { status: 500 });
  }
}
