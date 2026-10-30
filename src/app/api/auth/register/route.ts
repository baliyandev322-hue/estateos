import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signAuthToken } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'BUYER', phone, organizationName } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        role: ['BUYER', 'AGENT', 'BUILDER', 'ADMIN'].includes(role) ? role : 'BUYER',
        phone: phone || null,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F2E1E&color=D4AF37`,
      },
    });

    let org = null;
    if ((role === 'AGENT' || role === 'BUILDER') && organizationName) {
      const baseSlug = slugify(organizationName);
      const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      org = await prisma.organization.create({
        data: {
          name: organizationName,
          slug: uniqueSlug,
          type: role === 'AGENT' ? 'AGENT_AGENCY' : 'BUILDER_DEV',
          isVerified: false,
        },
      });

      await prisma.organizationMember.create({
        data: {
          orgId: org.id,
          userId: user.id,
          role: 'OWNER',
        },
      });

      // Default Free Subscription
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      await prisma.subscription.create({
        data: {
          orgId: org.id,
          plan: 'FREE',
          billingCycle: 'MONTHLY',
          amount: 0,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: nextMonth,
          listingsLimit: 5,
          leadsLimit: 25,
          aiFeaturesEnabled: false,
          teamSeatsLimit: 1,
        },
      });
    }

    const sessionPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      phone: user.phone,
      avatar: user.avatar,
      orgId: org?.id || null,
      orgName: org?.name || null,
      orgSlug: org?.slug || null,
    };

    const token = signAuthToken(sessionPayload);

    const response = NextResponse.json({
      success: true,
      user: sessionPayload,
    });

    response.cookies.set('estateos_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
