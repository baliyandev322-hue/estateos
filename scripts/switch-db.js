const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const target = process.argv[2] ? process.argv[2].toLowerCase() : 'postgresql';

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const pgSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.postgresql.prisma');
const sqliteSchemaBackup = path.join(__dirname, '..', 'prisma', 'schema.sqlite.prisma');

console.log(`\n======================================================`);
console.log(`     ESTATEOS DATABASE PROVIDER SWITCHER: [${target.toUpperCase()}]`);
console.log(`======================================================\n`);

if (target === 'postgresql' || target === 'postgres') {
  if (!fs.existsSync(pgSchemaPath)) {
    console.error('Error: schema.postgresql.prisma not found.');
    process.exit(1);
  }

  // Backup current schema if it is sqlite
  const currentContent = fs.readFileSync(schemaPath, 'utf8');
  if (currentContent.includes('provider = "sqlite"')) {
    fs.writeFileSync(sqliteSchemaBackup, currentContent, 'utf8');
  }

  // Copy PostgreSQL schema to active schema.prisma
  const pgContent = fs.readFileSync(pgSchemaPath, 'utf8');
  fs.writeFileSync(schemaPath, pgContent, 'utf8');
  console.log('✓ prisma/schema.prisma updated with PostgreSQL provider.');

  console.log('\nNext steps for PostgreSQL:');
  console.log('1. Ensure DATABASE_URL in .env points to your PostgreSQL instance (e.g. Supabase, AWS RDS, Neon)');
  console.log('2. Run: npx prisma generate');
  console.log('3. Run: npx prisma db push');
  console.log('4. Run: node scripts/seed.js\n');
} else if (target === 'sqlite') {
  if (fs.existsSync(sqliteSchemaBackup)) {
    const sqliteContent = fs.readFileSync(sqliteSchemaBackup, 'utf8');
    fs.writeFileSync(schemaPath, sqliteContent, 'utf8');
    console.log('✓ prisma/schema.prisma restored with SQLite provider (file:./estateos.db).');
  } else {
    // Generate sqlite header
    let content = fs.readFileSync(schemaPath, 'utf8');
    content = content.replace(
      /datasource db\s*\{\s*provider\s*=\s*"postgresql"\s*url\s*=\s*env\("DATABASE_URL"\)\s*\}/,
      `datasource db {\n  provider = "sqlite"\n  url      = "file:./estateos.db"\n}`
    );
    fs.writeFileSync(schemaPath, content, 'utf8');
    console.log('✓ prisma/schema.prisma switched to SQLite provider.');
  }

  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✓ Prisma Client regenerated for SQLite.');
  } catch (e) {
    console.error('Note: Stop any running dev/start server before regenerating.');
  }
} else {
  console.error('Invalid target. Use "postgresql" or "sqlite".');
  process.exit(1);
}
