import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signAuthToken } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { getRegistryUser, saveRegistryUser } from '@/lib/userRegistry';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'BUYER', phone, organizationName } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check if user already exists
    let existingInDb = null;
    try {
      existingInDb = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (e) {
      console.warn('Prisma DB lookup note:', e);
    }

    const existingInMemory = getRegistryUser(normalizedEmail);

    if (existingInDb || existingInMemory) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F2E1E&color=D4AF37`;
    const assignedRole = ['BUYER', 'AGENT', 'BUILDER', 'ADMIN'].includes(role) ? role : 'BUYER';

    let orgId: string | null = null;
    let orgName: string | null = null;
    let orgSlug: string | null = null;

    if ((assignedRole === 'AGENT' || assignedRole === 'BUILDER') && organizationName) {
      const baseSlug = slugify(organizationName);
      orgSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      orgName = organizationName;
      orgId = `org_${Date.now()}`;
    }

    // 2. Attempt saving to Prisma database
    try {
      const dbUser = await prisma.user.create({
        data: {
          id: userId,
          name,
          email: normalizedEmail,
          passwordHash,
          role: assignedRole,
          phone: phone || null,
          avatar,
        },
      });

      if ((assignedRole === 'AGENT' || assignedRole === 'BUILDER') && organizationName) {
        const org = await prisma.organization.create({
          data: {
            name: organizationName,
            slug: orgSlug!,
            type: assignedRole === 'AGENT' ? 'AGENT_AGENCY' : 'BUILDER_DEV',
            isVerified: false,
          },
        });
        orgId = org.id;

        await prisma.organizationMember.create({
          data: {
            orgId: org.id,
            userId: dbUser.id,
            role: 'OWNER',
          },
        });

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
    } catch (dbErr) {
      console.warn('Database write note (resilient fallback active):', dbErr);
    }

    // 3. Save to registry
    saveRegistryUser({
      id: userId,
      email: normalizedEmail,
      passwordHash,
      name,
      role: assignedRole as any,
      phone: phone || null,
      avatar,
      orgId,
      orgName,
      orgSlug,
    });

    // 4. Issue authenticated JWT session token
    const sessionPayload = {
      id: userId,
      email: normalizedEmail,
      name,
      role: assignedRole as any,
      phone: phone || null,
      avatar,
      orgId,
      orgName,
      orgSlug,
    };

    const token = signAuthToken(sessionPayload);

    const response = NextResponse.json({
      success: true,
      user: sessionPayload,
      message: 'Account created successfully!',
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
    return NextResponse.json({ error: error?.message || 'Failed to create account' }, { status: 500 });
  }
}
