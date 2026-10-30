import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const admin = await requireAuthUser(['ADMIN']);
    const { propertyId, isVerified, truthScore, auditNotes, reraVerified, ownershipVerified } = await request.json();

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }

    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: {
        isVerified: isVerified !== undefined ? isVerified : true,
        truthScore: truthScore ? parseInt(truthScore) : undefined,
      },
    });

    // Create or append audit record
    await prisma.truthScoreAudit.create({
      data: {
        propertyId,
        identityVerified: true,
        reraVerified: reraVerified ?? true,
        ownershipVerified: ownershipVerified ?? true,
        physicalVerification: true,
        auditedBy: admin.name || 'Senior EstateOS Compliance Auditor',
        auditNotes: auditNotes || 'Passed multi-point regulatory and registry verification.',
      },
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (error: any) {
    console.error('Admin verify error:', error);
    return NextResponse.json({ error: error.message || 'Verification update failed' }, { status: 500 });
  }
}
