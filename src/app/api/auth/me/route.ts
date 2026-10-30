import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ user: null });
  }

  let user: any = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        avatar: true,
        bio: true,
        licenseNo: true,
        experienceYrs: true,
        city: true,
        memberships: {
          include: {
            organization: {
              include: {
                subscriptions: {
                  where: { status: 'ACTIVE' },
                  orderBy: { createdAt: 'desc' },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.warn('DB lookup note in auth/me:', err);
  }

  if (!user) {
    user = sessionUser;
  }

  return NextResponse.json({ user });
}
