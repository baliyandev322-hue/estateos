# EstateOS — Buyer Handover & Operational Guide

Welcome to EstateOS! This document contains all credentials, environment configuration keys, and step-by-step instructions to take ownership of the codebase and manage the platform.

---

## 1. Quick Access Credentials (Demo & Production)

| Role | Email | Password | Dashboard URL | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **SuperAdmin** | `admin@estateos.com` | `admin123` | `/dashboard/admin` | System MRR, Listing Audits, User Approvals |
| **Verified Agent** | `agent@estateos.com` | `agent123` | `/dashboard/agent` | Apex Heritage CRM, Leads, Profile Edit |
| **Developer / Builder** | `builder@estateos.com` | `builder123` | `/dashboard/builder` | Singhania Towers, Add Phase Modal, Escrow |
| **Individual Buyer** | `buyer@estateos.com` | `buyer123` | `/dashboard/buyer` | Saved properties, Enquiry tracking |

> **Note:** The login screen (`/login`) also includes a **1-Click Demo Login** button for each role so evaluators can inspect every workspace instantly without typing credentials.

---

## 2. Environment Variables Checklist (`.env`)

```ini
# PostgreSQL Database (Supabase Mumbai ap-south-1)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

# Authentication Security (Min 32 characters)
JWT_SECRET="estateos-super-secure-production-secret-2026-min-32-chars-long"

# Business & Support Contact Details
NEXT_PUBLIC_COMPANY_NAME="EstateOS Technologies Pvt. Ltd."
NEXT_PUBLIC_SUPPORT_PHONE="+91 93685 93249"
NEXT_PUBLIC_DIRECT_PHONE="+91 93685 93249"
NEXT_PUBLIC_WHATSAPP_PHONE="919368593249"
NEXT_PUBLIC_SUPPORT_EMAIL="support@estateos.in"
NEXT_PUBLIC_GRIEVANCE_EMAIL="grievance@estateos.in"
NEXT_PUBLIC_OFFICE_ADDRESS="Gali No. 10, Near Verma Park, Gandhi Colony, Muzaffarnagar, Uttar Pradesh - 251001, India"

# AI Engine (Google Gemini 3.8 Flash)
GEMINI_API_KEY="your_google_gemini_api_key_here"

# Payment Gateway (Razorpay India)
RAZORPAY_KEY_ID="rzp_test_EstateOS2026"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_EstateOS2026"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Optional Cloudinary CDN (Leave empty for resilient serverless fallback)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## 3. Local Development & Deployment

### Run Locally:
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Run Automated Verification Test Suite:
```bash
npm test
# Runs all 35 tests covering Auth, Multi-Tenancy, Truth Score & Razorpay HMAC
```

### Production Build:
```bash
npm run build
```

---

## 4. Key Code Locations for Customization

* **Branding & Contact Info:** [`src/config/siteContact.ts`](file:///src/config/siteContact.ts)
* **Property Inventory Seeds:** [`scripts/seed-rich-inventory.js`](file:///scripts/seed-rich-inventory.js)
* **Pricing Plans & SaaS Tiers:** [`src/lib/subscriptions.ts`](file:///src/lib/subscriptions.ts)
* **Geospatial Map Coordinates:** [`src/components/MarketplaceMap.tsx`](file:///src/components/MarketplaceMap.tsx)
* **Truth Score Algorithm:** [`src/lib/truthScore.ts`](file:///src/lib/truthScore.ts)
