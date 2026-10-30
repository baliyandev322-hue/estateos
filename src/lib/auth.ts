import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'estateos-super-secure-production-secret-2026';

export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'AGENT' | 'BUILDER' | 'ADMIN';
  phone?: string | null;
  avatar?: string | null;
  orgId?: string | null;
  orgName?: string | null;
  orgSlug?: string | null;
}

export function signAuthToken(payload: AuthSessionUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAuthToken(token: string): AuthSessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthSessionUser;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthSessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('estateos_token')?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

export async function requireAuthUser(requiredRoles?: string[]): Promise<AuthSessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    throw new Error('Forbidden: Insufficient privileges');
  }
  return user;
}
