const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const batch3Articles = [
  {
    title: "Pradhan Mantri Awas Yojana (PMAY-U 2.0): Income Slabs, Interest Subsidies & Online Application 2026",
    slug: "pmay-urban-2-interest-subsidy-eligibility-application-guide",
    category: "Home Loans",
    excerpt: "Comprehensive official breakdown of PMAY Urban 2.0 interest subvention schemes, EWS/LIG/MIG household income thresholds, and direct subsidy transfer protocols.",
    tags: "PMAY 2.0, Government Subsidies, Affordable Housing, Home Loan Interest Subsidy, PMAY Eligibility",
    authorName: "Pooja Sharma, CFP (Govt. Schemes Specialist)",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 9,
    isPublished: true,
    content: `The Union Cabinet's operationalization of **Pradhan Mantri Awas Yojana - Urban (PMAY-U 2.0)** offers structured interest subventions for 1 Crore middle-class and economically weaker urban families across India.

### 1. Income Classification Thresholds
Under the standardized 2026 framework:
* **Economically Weaker Section (EWS):** Annual household gross income up to ₹3,00,000.
* **Low Income Group (LIG):** Annual household income between ₹3,00,001 and ₹6,00,000.
* **Middle Income Group (MIG):** Annual household income between ₹6,00,001 and ₹9,00,000.

### 2. Interest Subvention Subsidy (ISS) Structure
For home loans up to ₹35 Lakh on property values capped at statutory regional thresholds:
* A direct **4.0% interest subsidy** is provided on the first ₹8 Lakh of principal loan for tenures up to 12 years.
* The Net Present Value (NPV) of the subsidy—amounting to approximately **₹1.80 Lakh**—is credited upfront into the borrower's loan account, directly truncating monthly EMI commitments and amortized principal.

### 3. Female Ownership Mandate
To access EWS/LIG central subsidies, the property title must mandatorily feature a female co-owner (solely or jointly), fostering statutory female asset empowerment across urban housing developments.`
  },
  {
    title: "Joint Home Loans in India: Tax Benefits, Eligibility Multipliers, CIBIL Impact & Co-Ownership Risks",
    slug: "joint-home-loan-tax-benefits-eligibility-risks-india",
    category: "Home Loans",
    excerpt: "How co-borrowing with a spouse or parent doubles Section 80C and Section 24(b) tax deductions up to ₹7 Lakh annually while boosting loan eligibility by 80%.",
    tags: "Joint Home Loan, Tax Deductions, Section 80C, Section 24b, Co-Borrower Guidelines",
    authorName: "Kavita Singhal, Senior Wealth Architect",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 8,
    isPublished: true,
    content: `Applying for a residential mortgage jointly with your spouse, parent, or working sibling offers financial leverage and statutory income tax benefits unavailable to single applicants.

### 1. Dual Tax Deduction Bonanza (Up to ₹7 Lakh Yearly)
When both co-borrowers are also legal co-owners contributing to the monthly EMI repayment:
* **Section 24(b) (Interest on Home Loan):** Each co-borrower can independently claim up to **₹2,00,000** annually, delivering a cumulative deduction of **₹4,00,000** per financial year.
* **Section 80C (Principal Repayment):** Both co-owners can each claim up to **₹1,50,000** under their individual 80C limits, resulting in up to **₹3,00,000** in principal deductions.
* **Total Annual Joint Tax Exemption:** Up to **₹7,00,000**, translating into direct tax savings exceeding ₹2.1 Lakh in the 30% tax bracket.

### 2. Eligibility Multiplier
If an individual applicant earning ₹80,000 monthly qualifies for a ₹55 Lakh home loan, combining spousal income of ₹70,000 elevates cumulative borrowing power to ₹1.05 Crore, facilitating upscale acquisition without exhausting emergency liquid liquidity.

### 3. CIBIL & Default Contingencies
Both co-borrowers remain jointly and severally liable for 100% of the outstanding debt. Any missed EMI directly blemishes both co-borrowers' credit bureau profiles equally.`
  },
  {
    title: "Vastu Shastra for Modern Apartments: Practical Guidelines for Entrance, Kitchen, Master Bedroom & Balconies",
    slug: "vastu-shastra-for-modern-apartments-practical-guidelines",
    category: "Buying Guides",
    excerpt: "A rational architectural guide reconciling ancient Indian spatial energetics with high-rise apartment living: Optimal orientations, doshas, and modern design remedies.",
    tags: "Vastu Shastra, Apartment Buying, Home Orientation, North-East Facing, Interior Planning",
    authorName: "Ar. Vikramaditya Joshi (Vastu & Spatial Design Consultant)",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 7,
    isPublished: true,
    content: `In modern Indian multi-story apartment towers, strict compliance with classic single-plot Vedic architecture is physically constrained. However, aligning core functional zones delivers spatial harmony and enhanced resale velocity.

### 1. Main Entrance (Ishanya & Purva Zones)
The primary entryway should ideally face **North, North-East (Ishanya), or East**. These quadrants maximize exposure to morning infrared sunlight and cosmic air currents. If forced into a South or South-West entrance, install bright copper or brass threshold plates and warm 3000K illumination.

### 2. Kitchen Placement (Agni Corner)
The culinary zone represents the fire element (Agni). The **South-East** corner of the apartment remains the ideal quadrant. When cooking, the occupant should preferably face East. Avoid placing the cooking hob directly contiguous to the water sink or dishwasher to prevent elemental conflict.

### 3. Master Bedroom (Nairutya - South-West)
The master bedroom should reside in the **South-West** zone, grounding the head of the household with stability and leadership energy. Sleeping with the head directed towards the South or East aligns human bio-magnetic polarities with Earth's magnetic grid.

### 4. Balconies & Ventilation Corridors
Expansive balconies facing North or East ensure cross-ventilation and positive thermal cooling throughout harsh summer months, lowering artificial air-conditioning loads.`
  },
  {
    title: "Builder Delay Penalties Under RERA: Statutory Interest Calculations, NCLT vs State RERA Remedies",
    slug: "builder-delay-possession-penalties-rera-compensation-guide",
    category: "RERA & Legal",
    excerpt: "Statutory rights of home buyers in case of project possession delays: Calculating SBI MCLR + 2% monthly penal interest and legal recovery mechanisms.",
    tags: "RERA Compensation, Builder Delays, SBI MCLR Interest, NCLT, Real Estate Litigation",
    authorName: "Adv. Rajesh Varma (Real Estate Legal Counsel)",
    coverImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 9,
    isPublished: true,
    content: `Prior to the Real Estate (Regulation and Development) Act 2016, builders penalised buyers 18% for delayed milestone payments while offering a nominal ₹5 per sq.ft monthly compensation for years of construction delays. RERA permanently abolished this unequal paradigm.

### 1. Parity of Interest Rates (Section 18 of RERA)
Section 18 mandates strict statutory interest parity:
* The rate of interest payable by the promoter to the buyer for delayed possession must match the interest rate charged by the builder for buyer default.
* Across UP-RERA, HRERA, and MahaRERA, this is prescribed as **SBI Marginal Cost of Funds Based Lending Rate (MCLR) + 2.0%** (currently approx. 10.75% to 11.15% per annum).

### 2. Option to Withdraw vs Stay in the Project
The buyer possesses sovereign statutory discretion under Section 18:
* **Option A (Withdraw):** Demand 100% refund of all consideration paid to date, along with monthly interest from the date of each payment milestone till actual realization.
* **Option B (Continue):** Retain the allotment and demand mandatory monthly penal interest payouts for every single month of delay until the physical Occupancy Certificate is issued.

### 3. State RERA vs NCLT (Insolvency)
While the National Company Law Tribunal (NCLT) handles corporate insolvency under IBC, individual flat buyers are strongly advised to approach their respective State RERA Authority first, as RERA orders can mandate recovery certificates (RC) executed directly through District Magistrates.`
  },
  {
    title: "CIBIL Score for Home Loan Approval: Minimum Score Required, Impact of Defaults & Rapid Improvement Hacks",
    slug: "cibil-score-for-home-loan-approval-improvement-guide",
    category: "Home Loans",
    excerpt: "Everything banks evaluate in your TransUnion CIBIL credit report: 750+ score benchmarks, credit utilization ratios, and how to rectify incorrect DPD tags.",
    tags: "CIBIL Score, Home Loan Interest Rate, Credit Bureau, TransUnion, Loan Pre-Approval",
    authorName: "Pooja Sharma, CFP (Govt. Schemes Specialist)",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 7,
    isPublished: true,
    content: `When underwriting a 20-year retail housing loan, Indian commercial banks (SBI, HDFC, ICICI, Bank of Baroda) treat your credit score as the primary risk benchmark dictating interest spread over repo rate.

### 1. CIBIL Score Tiers & Interest Spreads
* **750 to 900 (Prime Tier):** Unlocks lowest repo-linked lending rates (EBLR/RLLR) starting at 8.35% to 8.50% with zero or 50% discounted processing fee waivers.
* **700 to 749 (Standard Tier):** Eligible for approval, but attracts a 25 to 50 bps interest rate premium (approx. 8.75% to 9.00%), adding up to ₹6 Lakh extra over a 20-year ₹60 Lakh loan.
* **Below 680 (High Risk):** Most Tier-1 nationalized banks reject fresh mortgage sanctions unless substantial collateral or high-equity co-borrowers are introduced.

### 2. Credit Utilization Ratio (CUR) Hack
Keep credit card balances below **30% of total sanctioned limits**. Utilizing 90% of your credit card limit signals credit hunger to scoring algorithms, knocking 20 to 45 points off your CIBIL score within 60 days.

### 3. Resolving Inaccurate 'Written Off' or DPD Flags
Review your detailed CIR (Credit Information Report) for erroneous "Days Past Due" (DPD) tags or un-closed credit cards from past student accounts. Filing an online dispute directly on the CIBIL portal rectifies reporting errors within 30 statutory days.`
  },
  {
    title: "Complete Guide to Freehold vs Leasehold Properties in India: Conversion Process, Conveyance & Value Differences",
    slug: "freehold-vs-leasehold-property-conversion-process-india",
    category: "RERA & Legal",
    excerpt: "Legal differences between 99-year municipal leasehold allotments and absolute freehold titles: Transfer charges, unearned increase penalties, and conversion steps.",
    tags: "Freehold vs Leasehold, Property Title, 99 Year Lease, DDA Freehold Conversion, Land Laws",
    authorName: "Adv. Rajesh Varma (Real Estate Legal Counsel)",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 8,
    isPublished: true,
    content: `Understanding the statutory classification between Freehold and Leasehold title is crucial when evaluating resale flats in Delhi (DDA), Navi Mumbai (CIDCO), or Noida/Greater Noida Authorities.

### 1. Freehold Property (Absolute Ownership)
In a freehold parcel, the owner holds perpetual, unencumbered rights to both the physical land and any superstructure erected upon it. The title can be sold, mortgaged, gifted, or inherited without seeking municipal or development authority permissions or paying transfer levies.

### 2. Leasehold Property (Limited Tenure)
In leasehold regimes (prominent across Noida, Greater Noida, and Chandigarh CHB), land ownership remains vested with the State or Development Authority, which leases parcels typically for a **99-year tenure**. Key statutory constraints include:
* Renewal of lease rent and payment of annual ground charges.
* Mandatory Authority Transfer Charges (TM) when selling to third parties.

### 3. Conversion of Leasehold to Freehold
State governments periodically issue **Conveyance Deed Conversion Schemes** allowing leaseholders to convert their properties to absolute freehold upon payment of a prescribed one-time conversion surcharge (calculated on prevailing circle rate differentials). Freehold conversion increases property liquidity and market resale valuation by 15% to 25%.`
  },
  {
    title: "Property Possession Inspection Checklist: 25 Defects to Check Before Signing the Handover Letter",
    slug: "property-possession-inspection-checklist-defects-guide",
    category: "Buying Guides",
    excerpt: "A comprehensive snagging audit checklist covering hollow tile testing, plumbing pressure leaks, electrical earthing, window seals, and statutory OC verification.",
    tags: "Possession Checklist, Home Snagging, Property Inspection, Occupancy Certificate, Handover Defects",
    authorName: "Sunil Bakshi, Lead Structural Auditor",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 8,
    isPublished: true,
    content: `Receiving possession of your newly constructed home is a momentous milestone. However, signing the developer's standard 'Possession Satisfaction Letter' without conducting a comprehensive snagging audit strips you of bargaining leverage to enforce structural rectifications.

### 1. Flooring & Tile Soundness (Hollow Tile Test)
Tap across vitrified tiles using a wooden mallet or coin. A hollow ringing sound indicates inadequate cement mortar backing beneath the tile. Such tiles inevitably crack or pop out within 12 months under foot traffic and thermal expansion. Demand complete relaying before signing.

### 2. Plumbing Water Pressure & Slope Gradient
* Run all taps and flush valves concurrently for 10 minutes to verify adequate water pressure and observe drainage traps.
* Pour water across balcony and bathroom floors: The water must flow smoothly towards the floor trap without stagnating in puddles.

### 3. Electrical Load & Earth Leakage
Test every single switch socket with a digital socket tester to verify correct live-neutral polarity and physical grounding (earthing). Inadequate earthing damages sensitive electronics and invalidates inverter warranties.

### 4. Statutory 5-Year RERA Warranty (Section 14)
Section 14(3) of RERA mandates that the promoter must rectify any structural defect or defect in workmanship brought to notice within **5 years from possession**, free of cost within 30 days.`
  },
  {
    title: "Real Estate Investment Trusts (REITs) vs Physical Property in India: Dividend Yields, Liquidity & Taxation",
    slug: "reits-vs-physical-property-investment-yields-india",
    category: "Investment",
    excerpt: "Comparative analysis of Embassy, Brookfield, Mindspace and Nexus Select Trust REITs against physical buy-to-let residential flats for retail investors.",
    tags: "REITs India, Commercial Real Estate, Dividend Yield, Real Estate Stocks, Wealth Creation",
    authorName: "EstateOS Institutional Advisory Desk",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 9,
    isPublished: true,
    content: `For retail investors seeking exposure to premier Indian real estate without locking up ₹75 Lakh in down payments and dealing with tenant disputes, SEBI-regulated Real Estate Investment Trusts (REITs) present an institutional alternative.

### 1. Capital Threshold & Liquidity
* **Physical Real Estate:** Requires minimum capital deployment of ₹40 Lakh to ₹1.5 Crore. Selling takes 3 to 9 months and incurs heavy transaction costs (6% stamp duty + 2% brokerage).
* **REITs:** Can be acquired on NSE/BSE starting from just **₹350 to ₹400 per unit** with single-click T+1 settlement liquidity.

### 2. Yield Comparison: 2.8% vs 6.8%-7.8%
While residential apartments deliver modest net rental yields of 2.5% to 3.2% after factoring municipal taxes and maintenance, commercial office and retail REITs mandate distribution of **at least 90% of Net Distributable Cash Flows (NDCF)** to unit holders on a quarterly basis, generating predictable distribution yields of 6.8% to 7.8% per annum.

### 3. Tax Efficiency on Distributions
REIT distributions comprise dividends, interest, and repayment of capital. Dividends from Special Purpose Vehicles (SPVs) that have not opted for concessional corporate tax are **100% tax-free** in the hands of the investor.`
  }
];

async function seedBatch3() {
  console.log(`Starting insertion of ${batch3Articles.length} batch-3 premium guides...`);
  for (const article of batch3Articles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (!existing) {
      await prisma.article.create({ data: article });
      console.log(`[CREATED] ${article.title}`);
    } else {
      console.log(`[EXISTS] ${article.title}`);
    }
  }
  const total = await prisma.article.count();
  console.log(`\nSUCCESS: Total published articles now in database: ${total}`);
}

seedBatch3()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
