const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const additionalArticles = [
  {
    title: 'Dwarka Expressway & Golf Course Ext: Gurugram 2026-2030 Investment Masterplan',
    slug: 'dwarka-expressway-golf-course-extension-gurugram-investment-guide',
    excerpt: 'Deep-dive analysis into real estate yields, infrastructure milestones, metro expansion, and price trajectories across Sectors 102 to 113 in Gurugram.',
    category: 'Investment',
    tags: 'Gurugram, Dwarka Expressway, Golf Course Extension, Luxury Apartments, NCR Real Estate',
    authorName: 'Vikramjit Singh (Senior NCR Market Analyst)',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 9,
    viewsCount: 4210,
    content: `Gurugram's real estate narrative in 2026 has definitively shifted towards master-planned, transit-oriented corridors—primarily the fully operational Dwarka Expressway and the mature Golf Course Extension Road.

### 1. The Operational Dwarka Expressway (Northern Peripheral Road)
With the completion of the elevated 8-lane expressway connecting Shiv Murti on NH-8 to Kherki Daula toll plaza, transit times to Indira Gandhi International (IGI) Airport Terminal 3 have plummeted from 75 minutes to just 18 minutes.

#### Key Micro-Market Clusters:
- **Sectors 102 to 106**: Mid-to-high density gated communities offering ₹12,000 to ₹16,500/sq.ft price bands. Strong rental demand driven by cyber hub commuters.
- **Sectors 111 to 113 (Smart City Delhi Border)**: Ultra-luxury high-rise residences commanding ₹22,000+/sq.ft, catering to high-net-worth corporate leadership and expatriates.

### 2. Golf Course Extension Road: The Silicon Corridor of North India
Golf Course Extension Road (Sectors 58 to 67) has matured into the premier commercial-residential nexus. With world-class LEED-certified commercial parks hosting Fortune 500 tech firms, residential rental yields have touched an impressive 4.2%—outpacing conventional South Delhi yields of 2.1%.

### 3. Key Due Diligence Factors for Investors
1. **Occupation Certificate (OC) vs Completion Certificate (CC)**: Always ensure the developer has received statutory fire NOC and structural stability certificates before final payment.
2. **Scheduled Bank Escrow Cross-Check**: Verify on the official HRERA portal that 70% of project receivables remain earmarked in the designated escrow account.

Use the EstateOS Property Truth Score™ to review RERA filings and circle-rate benchmarking before initiating booking discussions.`,
  },
  {
    title: 'Carpet Area vs Super Built-Up Area: Statutory RERA Calculation & Loading Guide',
    slug: 'carpet-area-vs-super-built-up-area-rera-calculation-guide',
    excerpt: 'Understand how developers historically inflated square footage by 35% with "loading" and how Section 2(k) of RERA protects buyers today.',
    category: 'RERA & Legal',
    tags: 'Carpet Area, Super Built-up, RERA Act, Flat Buying, Construction Loading',
    authorName: 'Adv. Ritu Khosla (Property Law Specialist)',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
    viewsCount: 5890,
    content: `For decades before 2016, the single largest grievance among Indian home buyers was the discrepancy between the square footage advertised on glossy marketing brochures and the actual usable floor area handed over on possession day.

### The Historical Abuse of "Super Built-Up Area"
Developers routinely applied "loading factors" varying from 25% to as high as 45%. A buyer paying for a "1,800 sq.ft 3BHK" frequently discovered their physical living space was barely 1,150 sq.ft, with the remaining 650 sq.ft attributed to lift lobbies, staircases, generator rooms, and security kiosks.

### Statutory Definition Under RERA Section 2(k)
The Real Estate (Regulation and Development) Act 2016 definitively standardized carpet area as:
> *"The net usable floor area of an apartment, excluding the area covered by external walls, areas under services shafts, exclusive balcony or verandah area and exclusive open terrace area, but including the area covered by internal partition walls of the apartment."*

### Why the Distinction Dictates Your Real Per-Sq-Ft Cost
Consider a flat priced at ₹1 Crore:
- **Quoted Super Area**: 1,800 sq.ft @ ₹5,555/sq.ft
- **Actual RERA Carpet Area**: 1,200 sq.ft
- **Real Effective Price Paid**: ₹1,00,00,000 / 1,200 = **₹8,333/sq.ft**

EstateOS automatically audits and calculates the true RERA carpet area and circle-rate parity for every listing on the marketplace, preventing hidden loading markups.`,
  },
  {
    title: 'Indiranagar vs Whitefield: Bengaluru Rental Yields, Tech Corridors & Metro Impact',
    slug: 'indiranagar-vs-whitefield-bengaluru-rental-yields-comparison',
    excerpt: 'An institutional review of prime Bengaluru residential markets: comparing rental capitalization rates, social infrastructure, and metro phase expansions.',
    category: 'Investment',
    tags: 'Bangalore Real Estate, Indiranagar, Whitefield, IT Corridor, Rental Yield, Purple Line',
    authorName: 'Arjun Balasubramanian (PropTech Quantitative Analyst)',
    coverImage: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 8,
    viewsCount: 7120,
    content: `Bengaluru's residential market is defined by a dynamic tension between established central prestige localities (Indiranagar, Koramangala) and high-velocity eastern tech hubs (Whitefield, Outer Ring Road, Sarjapur).

### Indiranagar: Mature Luxury & Capital Retention
- **Target Profile**: Senior technology executives, founders, creative leaders, and multi-generational families.
- **Price Band**: ₹18,000 to ₹32,000/sq.ft.
- **Rental Yield**: 2.9% to 3.4%.
- **Advantage**: Zero remaining Greenfield land creates permanent inventory scarcity. High rental demand from expatriates and enterprise executives ensures negligible vacancy rates.

### Whitefield: High-Volume Rental Yield Powerhouse
- **Target Profile**: Software engineers, product managers, and IT corporate workforce at International Tech Park (ITPB) and EPIP Zone.
- **Price Band**: ₹8,500 to ₹14,500/sq.ft.
- **Rental Yield**: 4.8% to 5.6% (Among the highest across major Indian metropolitan corridors).
- **Metro Catalyst**: The operational Namma Metro Purple Line connecting Whitefield directly to MG Road and Majestic has eliminated the historical commute bottleneck.

### Summary Investment Takeaway
For pure rental income and lower entry capital, Whitefield remains unmatched. For long-term wealth preservation and land equity appreciation, Indiranagar continues to command an institutional premium.`,
  },
  {
    title: 'Step-by-Step Guide: How to Get Instant Home Loan Pre-Sanction at Lowest Rates',
    slug: 'step-by-step-home-loan-pre-sanction-process-india',
    excerpt: 'Everything you need to know about CIBIL bureau scores, Fixed Obligation to Income Ratio (FOIR), and digital banking pre-approval workflows.',
    category: 'Home Loans',
    tags: 'Home Loan, Pre-Sanction, CIBIL Score, FOIR, Banking, HDFC, SBI',
    authorName: 'Pooja Narang (Banking & Mortgage Consultant)',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
    viewsCount: 4950,
    content: `Most home buyers begin their property search backwards: they spend months inspecting flats, fall in love with a home, pay a non-refundable booking token, and then scramble to find a bank willing to fund the purchase.

### Why You Must Obtain In-Principle Pre-Sanction First
1. **Stronger Negotiation Leverage**: Builders take buyers with an existing sanction letter far more seriously, frequently granting a 3% to 5% upfront discount on the basic sale price.
2. **Definite Budget Boundary**: Prevents you from wasting time inspecting properties beyond your approved borrowing capacity.
3. **Protection of Token Money**: Eliminates the catastrophic risk of forfeiting your booking deposit due to unforeseen loan rejection.

### The 3 Core Pillars Banks Evaluate:
1. **CIBIL Score (750+ Benchmark)**: Borrowers with CIBIL > 750 receive interest rates starting from 8.35% p.a., whereas scores below 700 face risk-pricing penalties of 50 to 125 basis points higher.
2. **FOIR (Fixed Obligation to Income Ratio)**: Most leading scheduled banks (SBI, HDFC, ICICI) enforce a 50% to 55% FOIR ceiling. All your existing EMIs plus the new prospective home loan EMI cannot exceed half of your net monthly salary.
3. **Property Legal Title Clearance**: Even if your personal credit is flawless, banks conduct an independent 30-year sub-registrar search before disbursing a single rupee.

Use the **EstateOS Pre-Approved Home Loan Tool** to obtain an in-principle approval letter in under 3 minutes before booking your next site visit.`,
  },
  {
    title: 'Stamp Duty & Property Registration Charges Across Indian States: 2026 Ready Reckoner',
    slug: 'stamp-duty-registration-charges-across-indian-states-2026',
    excerpt: 'Complete comparative breakdown of state-wise conveyance stamp duties, female concessions, sub-registrar fees, and circle rates for 2026.',
    category: 'Buying Guides',
    tags: 'Stamp Duty, Registration Fee, Circle Rates, Punjab, Haryana, Maharashtra, Delhi, Karnataka',
    authorName: 'EstateOS Regulatory & Tax Cell',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 8,
    viewsCount: 6240,
    content: `When calculating the acquisition cost of a residential or commercial asset in India, buyers frequently overlook statutory state levies—namely Stamp Duty and Registration Fees—which can add 6% to 10% on top of the builder agreement value.

### State-by-State Duty Structures (2026 Snapshot):
- **Maharashtra (Mumbai / Pune)**: 6% for Male buyers, 5% for Female buyers, plus a statutory 1% registration fee (capped at ₹30,000 for properties > ₹30 Lakh).
- **Punjab (Mohali / Ludhiana / Amritsar)**: 7% (Male), 6% (Female), 6.5% (Joint), plus 1% statutory sub-registrar registration fee.
- **Haryana (Gurugram / Faridabad / Panchkula)**: 7% in municipal limits (Male), 5% (Female), 6% (Joint), plus tiered registration charges.
- **Karnataka (Bengaluru Urban / Rural)**: Standardized 5% stamp duty plus 1% registration fee across major property brackets.
- **Delhi NCR**: 6% for Male buyers, 4% for Female buyers, 5% for Joint ownership, plus 1% registration fee.

### Female Concession Optimization
Registering a property in the name of a female family member (or jointly with spouse) saves between 1% to 2% in government stamp duty—representing a direct cash savings of ₹1,00,000 to ₹2,00,000 on a ₹1 Crore property transaction.

Simulate your exact state government conveyance costs with our real-time **EstateOS Stamp Duty & Registration Calculator**.`,
  },
];

async function seedArticles() {
  console.log('Seeding additional high-value editorial articles for Google AdSense compliance...');
  for (const art of additionalArticles) {
    const existing = await prisma.article.findUnique({ where: { slug: art.slug } });
    if (!existing) {
      await prisma.article.create({ data: art });
      console.log(`[CREATED] Article: ${art.title}`);
    } else {
      console.log(`[EXISTS] Article: ${art.slug}`);
    }
  }
  console.log('Finished seeding high-value AdSense articles!');
}

seedArticles()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
