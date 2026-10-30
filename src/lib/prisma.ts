import { PrismaClient } from '@prisma/client';

const SUPABASE_FALLBACK_URL =
  'postgresql://postgres.gggkoqybkwpynhojurls:Rama%40100Dev@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

export function getEffectiveDatabaseUrl(): string {
  const envUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.SUPABASE_DATABASE_URL;

  // If missing or pointing to the deprecated prisma accelerator/sandbox host
  if (!envUrl || envUrl.includes('db.prisma.io')) {
    return SUPABASE_FALLBACK_URL;
  }
  return envUrl;
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getEffectiveDatabaseUrl(),
      },
    },
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;

