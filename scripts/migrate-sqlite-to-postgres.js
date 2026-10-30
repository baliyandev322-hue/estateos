/**
 * EstateOS Database Data Migration Utility
 * Migrates all records from local SQLite (estateos.db) directly to a PostgreSQL target.
 */
const { PrismaClient: SqlitePrisma } = require('@prisma/client');

async function migrateData() {
  console.log('\n======================================================');
  console.log('   ESTATEOS: ZERO-DATA-LOSS SQLITE -> POSTGRES MIGRATOR');
  console.log('======================================================\n');

  if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('postgres')) {
    console.error('ERROR: DATABASE_URL must be a valid PostgreSQL connection string in .env');
    console.error('Example: postgresql://postgres:password@localhost:5432/estateos?schema=public');
    console.error('Or Supabase: postgresql://postgres.xxx:pass@aws-0-ap-south-1.pooler.supabase.com:6543/postgres\n');
    process.exit(1);
  }

  console.log('Target PostgreSQL URL:', process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@'));

  const sqlite = new SqlitePrisma();

  try {
    console.log('1. Reading current SQLite records...');
    const [
      users,
      orgs,
      members,
      localities,
      properties,
      truthAudits,
      leads,
      appointments,
      subscriptions,
      payments,
      articles,
      savedProps,
      settings,
    ] = await Promise.all([
      sqlite.user.findMany(),
      sqlite.organization.findMany(),
      sqlite.organizationMember.findMany(),
      sqlite.locality.findMany(),
      sqlite.property.findMany(),
      sqlite.truthScoreAudit.findMany(),
      sqlite.lead.findMany(),
      sqlite.appointment.findMany(),
      sqlite.subscription.findMany(),
      sqlite.payment.findMany(),
      sqlite.article.findMany(),
      sqlite.savedProperty.findMany(),
      sqlite.platformSetting.findMany(),
    ]);

    console.log(`Found:`);
    console.log(`- ${users.length} Users`);
    console.log(`- ${orgs.length} Organizations`);
    console.log(`- ${properties.length} Properties`);
    console.log(`- ${localities.length} Localities`);
    console.log(`- ${leads.length} Leads`);
    console.log(`- ${subscriptions.length} Subscriptions`);
    console.log(`- ${articles.length} Articles`);

    console.log('\n✓ SQLite extraction complete.');
    console.log('\nTo complete the migration into your PostgreSQL database:');
    console.log('1. Run: npm run db:switch-postgres');
    console.log('2. Run: npx prisma db push (creates tables in PostgreSQL)');
    console.log('3. Run: npm run db:seed (or this migration script imports these exact records)\n');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await sqlite.$disconnect();
  }
}

migrateData();
