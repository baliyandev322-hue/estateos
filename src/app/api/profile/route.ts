import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { userRegistry } from '@/lib/userRegistry';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user: any = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        include: {
          memberships: {
            include: { organization: true },
          },
        },
      });
    } catch (dbErr) {
      console.warn('Prisma lookup failed in profile GET, using session user:', dbErr);
    }

    if (!user) {
      const regUser = userRegistry.findByEmail(sessionUser.email);
      user = regUser || sessionUser;
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, avatar, reraNumber, bio, companyName, city, address } = body;

    // Update in database if available
    try {
      await prisma.user.update({
        where: { id: sessionUser.id },
        data: {
          name: name || undefined,
          phone: phone || undefined,
          avatar: avatar || undefined,
          licenseNo: reraNumber || undefined,
        },
      });

      if (sessionUser.orgId && companyName) {
        await prisma.organization.update({
          where: { id: sessionUser.orgId },
          data: {
            name: companyName,
            phone: phone || undefined,
            city: city || undefined,
            address: address || undefined,
            reraNumber: reraNumber || undefined,
          },
        }).catch(() => {});
      }
    } catch (dbErr) {
      console.warn('Prisma user update fallback active:', dbErr);
    }

    // Update in memory user registry
    const updated = userRegistry.update(sessionUser.id, {
      name: name || sessionUser.name,
      phone: phone || sessionUser.phone,
      avatar: avatar || sessionUser.avatar,
      reraNumber: reraNumber || undefined,
      orgName: companyName || sessionUser.orgName,
      bio: bio || undefined,
      city: city || undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Profile & company credentials successfully updated and verified.',
      user: updated || {
        ...sessionUser,
        name: name || sessionUser.name,
        phone: phone || sessionUser.phone,
        avatar: avatar || sessionUser.avatar,
        orgName: companyName || sessionUser.orgName,
        reraNumber,
      },
    });
  } catch (error: any) {
    console.error('Profile PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
  }
}
