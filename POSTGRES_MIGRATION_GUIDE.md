# EstateOS — PostgreSQL Scaling & Cloud Migration Guide

This guide details how to switch EstateOS from local SQLite (`estateos.db`) to high-concurrency **PostgreSQL** (Supabase, Neon, AWS RDS, or local Docker) for production scalability.

---

## Why Migrate to PostgreSQL?
* **High Concurrency**: Handles 10,000+ concurrent agents, builders, and buyers simultaneously without SQLite database write-locks.
* **Connection Pooling**: Supported via PgBouncer / Prisma Accelerate for serverless deployments (Vercel, AWS).
* **Row-Level Security (RLS)**: Optional fine-grained tenant isolation directly inside PostgreSQL.
* **Native JSON Querying**: High-speed indexing over property amenities, images, and truth score audit arrays.

---

## 3-Step PostgreSQL Migration

### Step 1: Get a PostgreSQL Connection URL

#### Option A: Supabase (Recommended - Free Tier, Mumbai AWS ap-south-1)
1. Go to [supabase.com](https://supabase.com) and create a free project in the `ap-south-1 (Mumbai)` region.
2. In Project Settings ➔ Database, copy the **Connection string (URI)**.
   * Mode: **Transaction / Session Pooler (port 6543)**
   * Example: `postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

#### Option B: Neon (Serverless Postgres)
1. Create a free database at [neon.tech](https://neon.tech).
2. Copy the pooled connection string: `postgresql://[user]:[password]@[endpoint].neon.tech/neondb?sslmode=require`

#### Option C: Local PostgreSQL (Docker)
```bash
docker run --name estateos-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=estateos -p 5432:5432 -d postgres:16
# Connection URL: postgresql://postgres:postgres@localhost:5432/estateos
```

---

### Step 2: Set `DATABASE_URL` in `.env`

Edit your `.env` file in the project root:
```env
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT]:[YOUR_PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=20"
```

---

### Step 3: Switch Provider & Deploy Schema

Run the automated switcher in your terminal:

```bash
# 1. Switch schema provider to PostgreSQL
npm run db:switch-postgres

# 2. Push schema and create all PostgreSQL tables and indexes
npx prisma db push

# 3. Seed verified Indian real estate data (Mohali, Gurugram, Bangalore, Mumbai)
npm run db:seed
```

---

## How to Switch Back to SQLite for Offline Development
If you ever want to work completely offline without an internet connection:
```bash
npm run db:switch-sqlite
```

---

## Verification
Run the automated test suite against your new PostgreSQL instance:
```bash
npm test
```
All 23 test suites (Authentication, Tenant Isolation, Quotas, Truth Scores, Formulas, Webhooks) will execute and confirm that your PostgreSQL database is operating at 100% capacity.
