import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signAuthToken } from '@/lib/auth';
import { getRegistryUser, isDemoDefaultUser } from '@/lib/userRegistry';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Instant check for built-in demo credentials
    if (isDemoDefaultUser(normalizedEmail, password)) {
      const demoUser = getRegistryUser(normalizedEmail);
      if (demoUser) {
        const sessionPayload = {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role as any,
          phone: demoUser.phone || null,
          avatar: demoUser.avatar || null,
          orgId: demoUser.orgId || null,
          orgName: demoUser.orgName || null,
          orgSlug: demoUser.orgSlug || null,
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
      }
    }

    // 2. Check Database
    let dbUser = null;
    try {
      dbUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          memberships: {
            include: {
              organization: true,
            },
          },
        },
      });
    } catch (e) {
      console.warn('Prisma login lookup bypassed:', e);
    }

    if (dbUser) {
      const valid = await bcrypt.compare(password, dbUser.passwordHash);
      if (valid) {
        const primaryOrg = dbUser.memberships?.[0]?.organization;
        const sessionPayload = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role as any,
          phone: dbUser.phone,
          avatar: dbUser.avatar,
          orgId: primaryOrg?.id || null,
          orgName: primaryOrg?.name || null,
          orgSlug: primaryOrg?.slug || null,
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
      }
    }

    // 3. Check memory registry (for newly registered users in this session)
    const memUser = getRegistryUser(normalizedEmail);
    if (memUser && memUser.passwordHash) {
      const valid = await bcrypt.compare(password, memUser.passwordHash);
      if (valid) {
        const sessionPayload = {
          id: memUser.id,
          email: memUser.email,
          name: memUser.name,
          role: memUser.role as any,
          phone: memUser.phone || null,
          avatar: memUser.avatar || null,
          orgId: memUser.orgId || null,
          orgName: memUser.orgName || null,
          orgSlug: memUser.orgSlug || null,
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
      }
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
}
