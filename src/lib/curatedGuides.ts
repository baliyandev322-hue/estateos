export interface CuratedGuide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'RERA & Legal' | 'Land Measurement' | 'Valuation & Tax' | 'Investment' | 'Home Loans';
  authorName: string;
  authorTitle?: string;
  coverImage: string;
  readTimeMinutes: number;
  publishedAt: string;
  viewsCount: number;
  content: string;
  faqs: { question: string; answer: string }[];
}

export const CURATED_GUIDES: CuratedGuide[] = [
  {
    id: 'aeo-guide-1',
    title: 'Uttar Pradesh Property Stamp Duty, Registration Charges & Dakhil Kharij (2026): Complete Calculation & Legal Guide',
    slug: 'up-stamp-duty-registration-charges-dakhil-kharij-guide-2026',
    excerpt: 'Avoid legal encumbrances with verified 2026 UP stamp duty rates (7% male, 6% female), DM circle rate calculation formulas, and Section 34 Dakhil Kharij procedures.',
    category: 'Valuation & Tax',
    authorName: 'Adv. Meenakshi Sundaram',
    authorTitle: 'Senior Regulatory Counsel, High Court of Allahabad',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 8,
    publishedAt: '2026-11-20T09:00:00+05:30',
    viewsCount: 4210,
    faqs: [
      {
        question: 'What is the stamp duty rate in Uttar Pradesh for female property buyers in 2026?',
        answer: 'In Uttar Pradesh (2026), female buyers pay a concessional 6.0% stamp duty plus a 1.0% registration fee (total 7.0%). This 1% rebate is capped on property valuations up to ₹10 Lakhs. Male buyers pay 7.0% stamp duty plus 1.0% registration (total 8.0%). Joint male-female ownership is taxed at 6.5% stamp duty plus 1.0% registration (total 7.5%).',
      },
      {
        question: 'What is the statutory time limit for Dakhil Kharij (mutation) in Uttar Pradesh?',
        answer: 'Under Section 34 of the UP Revenue Code 2006, the buyer must file for mutation within 35 days of registered sale deed execution. Undisputed mutation orders are mandated to be resolved within 45 to 90 days by the Tehsildar Court.',
      },
      {
        question: 'Is stamp duty calculated on circle rate or actual market agreement value in UP?',
        answer: 'Under Section 47-A of the Indian Stamp Act 1899, stamp duty in Uttar Pradesh is strictly levied on whichever figure is higher: the official District Magistrate (DM) circle rate valuation or the actual agreed transaction consideration stated in the registered deed.',
      },
      {
        question: 'Can cash be accepted for property stamp duty payment in Uttar Pradesh?',
        answer: 'No. All stamp duty payments above ₹100 are strictly digital across UP Sub-Registrar offices (IGRSUP), executed through Secure Electronic Stamping (e-Stamping via Stock Holding Corporation of India) or direct Treasury net banking challans.',
      },
    ],
    content: `
### The 2026 Statutory Executive Summary (Direct Answer)
In Uttar Pradesh (2026), male property buyers pay a **7% stamp duty + 1% registration fee (Total 8%)**, while female buyers pay **6% stamp duty + 1% registration fee (Total 7%)** with a ₹10,000 concession capped on property valuations up to ₹10 Lakhs. Joint ownership (Male + Female) attracts a **6.5% stamp duty + 1% registration fee (Total 7.5%)**. Title mutation (*Dakhil Kharij*) is legally required under Section 34 of the UP Revenue Code 2006 within 35 to 90 days post-registry.

---

### Statutory Stamp Duty & Registration Rate Matrix (Uttar Pradesh 2026)
The Uttar Pradesh Stamp and Registration Department (IGRSUP) enforces standardized conveyance duty tiers:

| Buyer Ownership Classification | Stamp Duty Rate | Sub-Registrar Fee | Total Government Dues | Outflow on ₹50 Lakh Property |
| :--- | :---: | :---: | :---: | :---: |
| **Individual Male** | 7.0% | 1.0% | **8.0%** | ₹4,00,000 |
| **Individual Female** | 6.0% (Concession applied) | 1.0% | **7.0%** | ₹3,50,000 |
| **Joint (Male + Female)** | 6.5% | 1.0% | **7.5%** | ₹3,75,000 |
| **Corporate / Institutional Entity** | 7.0% | 1.0% | **8.0%** | ₹4,00,000 |

*Note: In areas governed by urban development authorities (e.g. MDA Meerut, GDA Ghaziabad, NOIDA), a 2% local infrastructure development surcharge is subsumed within the 7% statutory conveyance duty.*

---

### How DM Circle Rate vs Agreement Value is Determined
Under Section 47-A of the Indian Stamp Act 1899, Sub-Registrar officers are statutorily forbidden from registering sale deeds below the notified District Magistrate (DM) Circle Rate.

**The Taxable Consideration Rule:**
$$\\text{Taxable Value} = \\max(\\text{DM Circle Rate} \\times \\text{Land/Carpet Area}, \\text{Actual Transaction Value})$$

#### Realistic Example:
- **Plot Area**: 125 Gaj (1,125 Sq. Ft.) on Sardhana Road, Meerut.
- **Notified Circle Rate**: ₹18,000 per Gaj. Minimum Circle Value = $125 \\times 18,000 = ₹22,50,000$.
- **Actual Purchase Price**: ₹32,00,000.
- **Stamp Duty Basis**: Stamp duty (8%) will be assessed on **₹32,00,000** ($₹2,56,000$), because the actual transaction exceeds the circle valuation.
- If the agreed value was ₹20,00,000, duty would still be calculated on the circle floor of **₹22,50,000**.

---

### Step-by-Step Dakhil Kharij (Title Mutation) Process in UP
Many buyers mistakenly assume that obtaining a registered Sale Deed from the Sub-Registrar completes property ownership. **This is legally incorrect.**

A registered deed establishes contractual transfer of title, but **Dakhil Kharij (Mutual Mutation)** under the UP Revenue Code 2006 formally records your name in the government land records (*Khatoni / Jamabandi*). Without mutation, the seller remains the recorded revenue owner and can fraudulently pledge the property for agricultural or bank credit.

1. **Application Filing (Form 34)**: Submit the registered sale deed copy and mutation petition to the competent Tehsildar Court within 35 days of conveyance.
2. **Statutory Public Notice (Istehar)**: The Tehsildar issues a 30-day public notice invite for third-party objections.
3. **Field Kanungo & Lekhpal Verification**: The local Lekhpal inspects physical spot possession and boundary coordinates.
4. **Final Mutation Order & R-6 Entry**: If undisputed, the Tehsildar orders the seller's name excised (*Kharij*) and the buyer's name entered (*Dakhil*) on the digital UP Bhulekh portal (\`upbhulekh.gov.in\`).

---

### Verify Taxes & Titles with EstateOS Intelligence
- Calculate accurate state conveyance duties and banking EMI breakdown on our verified **[EstateOS Financial Calculators](/calculators)**.
- Cross-check land registry certainty and title encumbrances via the **[EstateOS Property Truth Score™](/truth-score)**.
`,
  },
  {
    id: 'aeo-guide-2',
    title: 'Gaj to Square Feet, Square Meters & Bigha Conversion in Uttar Pradesh: The 2026 Property Valuation Standards',
    slug: 'gaj-to-square-feet-bigha-conversion-uttar-pradesh-real-estate',
    excerpt: 'The definitive mathematical and legal conversion guide for North Indian land units: Master Gaj to Sq. Ft. formulas, Western UP Pukka Bigha rules, and circle rate loading.',
    category: 'Land Measurement',
    authorName: 'Er. Harish Chandra Sharma',
    authorTitle: 'Chief Town Planning & Land Survey Consultant',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
    publishedAt: '2026-11-18T10:00:00+05:30',
    viewsCount: 5120,
    faqs: [
      {
        question: 'How many square feet are in 1 Gaj in Uttar Pradesh?',
        answer: 'Exactly 9 Square Feet equal 1 Gaj in Uttar Pradesh real estate. 1 Gaj is mathematically identical to 1 Square Yard (0.8361 Square Meters). Therefore, an 80 Gaj plot equals 720 Sq. Ft., a 100 Gaj plot equals 900 Sq. Ft., and a 125 Gaj house equals 1,125 Sq. Ft.',
      },
      {
        question: 'What is the difference between Pukka Bigha and Kachha Bigha in UP?',
        answer: 'In Western UP (Meerut, Muzaffarnagar, Shamli, Baghpat), a Pukka Bigha is standard, measuring exactly 3,025 Square Yards (Gaj) or 27,225 Square Feet (2,529.3 Sq. Meters). In Central and Eastern UP, a Kachha Bigha is commonly used, which is approximately one-third of a Pukka Bigha, measuring between 840 to 1,008 Gaj (7,560 to 9,072 Sq. Ft.).',
      },
      {
        question: 'How many Gaj are in 1 Acre and 1 Hectare?',
        answer: 'Exactly 4,840 Gaj (Square Yards) make 1 Acre (43,560 Square Feet). Exactly 11,960 Gaj (Square Yards) make 1 Hectare (10,000 Square Meters or 2.471 Acres).',
      },
      {
        question: 'Do bank home loan valuation reports accept plot measurements in Gaj?',
        answer: 'Nationalized and private banks (SBI, HDFC, ICICI, PNB) record plot measurements in Square Feet and Square Meters in their technical valuation reports, but cross-verify that the boundary dimensions reconcile with the registered Gaj recorded in the parent Sale Deed.',
      },
    ],
    content: `
### The 2026 Mathematical Baseline (Direct Answer)
In Uttar Pradesh and North Indian property registries, **1 Gaj equals exactly 1 Square Yard, which is 9 Square Feet (0.8361 Square Meters)**. In Western UP (Meerut, Muzaffarnagar, Saharanpur, Bulandshahr), **1 Pukka Bigha equals 3,025 Square Yards (27,225 Sq. Ft. or 2,529.3 Sq. Meters)**, whereas Eastern and Central UP often use a **Kachha Bigha of 840 to 1,008 Square Yards (7,560 to 9,072 Sq. Ft.)**.

---

### Master Conversion Matrix: Gaj to Square Feet & Square Meters
Use this reference table to evaluate residential plots and duplex layouts across North India:

| Plot Size in Gaj (वर्ग गज) | Equivalent in Square Feet (वर्ग फीट) | Equivalent in Square Meters (वर्ग मीटर) | Typical Residential Configuration |
| :---: | :---: | :---: | :--- |
| **50 Gaj** | 450 Sq. Ft. | 41.80 Sq. Mtrs. | 1 BHK Compact Independent Floor |
| **80 Gaj** | 720 Sq. Ft. | 66.89 Sq. Mtrs. | 2–3 BHK Duplex Kothi (Ground + First Floor) |
| **100 Gaj** | 900 Sq. Ft. | 83.61 Sq. Mtrs. | Standard 3 BHK Independent House |
| **125 Gaj** | 1,125 Sq. Ft. | 104.51 Sq. Mtrs. | 3–4 BHK Triple Storey Luxury Villa |
| **180 Gaj** | 1,620 Sq. Ft. | 150.50 Sq. Mtrs. | Premium Corner Residence / Duplex |
| **250 Gaj** | 2,250 Sq. Ft. | 209.03 Sq. Mtrs. | High-End Gated Township Bungalow |
| **500 Gaj** | 4,500 Sq. Ft. | 418.06 Sq. Mtrs. | Farmhouse / Commercial Showroom Plot |

---

### Western UP Pukka Bigha vs Central/Eastern UP Kachha Bigha
Land measurement in Uttar Pradesh has historic regional variances that unverified brokers exploit:

#### 1. The Pukka Bigha (Western UP Standard):
- Enforced across Meerut, Muzaffarnagar, Ghaziabad, Hapur, Bulandshahr, and Saharanpur.
- **1 Pukka Bigha** = $20 \\text{ Biswa} = 3,025 \\text{ Sq. Yards (Gaj)} = 27,225 \\text{ Sq. Ft.}$
- **1 Biswa** = $151.25 \\text{ Gaj} = 1,361.25 \\text{ Sq. Ft.}$
- **1 Acre** = $1.6 \\text{ Pukka Bigha} = 4,840 \\text{ Gaj}$.

#### 2. The Kachha Bigha (Central & Eastern UP):
- Used in parts of Lucknow, Kanpur, and Varanasi rural belts.
- **1 Kachha Bigha** = $\\frac{1}{3} \\text{ Pukka Bigha} \\approx 1,008.33 \\text{ Gaj} = 9,075 \\text{ Sq. Ft.}$

> ⚠️ **Critical Investor Advisory**: When buying agricultural acreage or highway commercial land, never accept verbal quotes in "Bigha". Insist on the exact statutory area in **Hectares** as recorded on the official UP Bhulekh Khatoni ($1 \\text{ Hectare} = 11,960 \\text{ Gaj} = 2.471 \\text{ Acres}$).

---

### How to Calculate Plot Valuation from DM Circle Rate
Circle rate lists issued by the District Magistrate specify rates per Square Meter or per Gaj:
$$\\text{Base Plot Valuation} = \\text{Area in Gaj} \\times \\text{Circle Rate per Gaj}$$

#### Standard Municipal Surcharges in Uttar Pradesh:
- **Corner Surcharge**: Plots opening onto two or more public roads attract an additional **10% premium** on the circle valuation.
- **Park-Facing Surcharge**: Residential plots directly facing designated municipal green zones attract a **5% to 10% premium**.
- **Commercial Road Frontage**: Properties abutting major arterial highways (e.g. NH-58, Garh Road, Roorkee Road) carry specialized commercial circle tariffs irrespective of whether the physical building is residential.

---

### Explore Title-Audited Plots on EstateOS
Search verified residential and commercial plots calibrated in authentic Gaj measurements on the **[EstateOS Properties Directory](/properties)**.
`,
  },
  {
    id: 'aeo-guide-3',
    title: 'How to Verify Freehold Land Title & Avoid Illegal Colonies in Tier-2 Indian Cities: The 7-Step Due Diligence Framework',
    slug: 'how-to-verify-freehold-land-title-avoid-illegal-colonies-guide',
    excerpt: 'Step-by-step statutory due diligence to detect unapproved layouts, verify Section 80 land-use conversion, inspect 30-year non-encumbrance records, and secure bank loan approvals.',
    category: 'RERA & Legal',
    authorName: 'Adv. Ritu Khosla',
    authorTitle: 'Head of Title Audit & Legal Verification, EstateOS',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 9,
    publishedAt: '2026-11-15T09:00:00+05:30',
    viewsCount: 3950,
    faqs: [
      {
        question: 'Can a property with a registered Sale Deed still be demolished by local development authorities?',
        answer: 'Yes. A registered Sale Deed is strictly a record of transfer and stamp tax collection by the Revenue Department; it does not constitute building map or layout sanction. If a colony lacks Development Authority approval (e.g. MDA in Meerut, ADA in Agra), the authority has the legal mandate under Section 27 of the UP Urban Planning and Development Act 1973 to demolish unauthorized boundary walls and structures.',
      },
      {
        question: 'What is Section 80 (formerly Section 143) land conversion in Uttar Pradesh?',
        answer: 'Section 80 of the UP Revenue Code 2006 (formerly Section 143 of the Zamindari Abolition Act) is a mandatory judicial order passed by the Sub-Divisional Magistrate (SDM) declaring agricultural land as non-agricultural. Without this order, agricultural land cannot legally be sub-divided into residential plots, and banks will refuse home loan disbursements.',
      },
      {
        question: 'What is a 30-Year Non-Encumbrance Certificate (NEC)?',
        answer: 'An NEC (Form 22) issued by the Sub-Registrar Office verifies that the land has not been mortgaged, sold, leased, or subject to court attachment liens over the past 30 years, guaranteeing an unbroken and unencumbered chain of title.',
      },
      {
        question: 'What is a Bank APF Code in Indian Real Estate?',
        answer: 'APF stands for Approved Project Financial code. It is a unique verification identity issued by leading institutional banks (SBI, HDFC, ICICI, PNB) confirming that their technical and legal panels have vetted project sanctions, title deeds, and environmental approvals.',
      },
    ],
    content: `
### The 2026 Due Diligence Protocol (Direct Answer)
To verify freehold land legitimacy in Uttar Pradesh tier-2 micro-markets, buyers must verify five statutory proofs: (1) **Section 80/143 Agricultural-to-Non-Agricultural Conversion** order under the UP Revenue Code, (2) Development Authority layout approval (e.g., MDA, GDA, MDDA), (3) 30-year Non-Encumbrance Certificate (Form 22) via IGRSUP, (4) Unbroken Chain of Title Deeds, and (5) Live Bank APF (Approved Project Financial) loan approval codes from nationalized lenders.

---

### The 7-Point Land Due Diligence Checklist

| Audit Checkpoint | Government Authority / Portal | Required Document / Proof | Risk Level if Missing |
| :--- | :--- | :--- | :---: |
| **1. Land Use Zoning** | Tehsil / SDM Judicial Court | **Section 80 Order (Old Sec 143)** | 🔴 Critical (Demolition / No Commercial Electric Sanction) |
| **2. Master Plan Layout** | Development Authority (e.g. MDA) | Approved Layout Map & RERA Reg | 🔴 Critical (Unauthorized Colony Sealing Risk) |
| **3. Non-Encumbrance** | Sub-Registrar Office (IGRSUP) | 30-Year NEC Certificate (Form 22) | 🔴 High (Hidden Mortgage / Court Attachment) |
| **4. Revenue Ownership** | Revenue Board (\`upbhulekh.gov.in\`) | Certified Khatauni Copy (Khata No.) | 🔴 Critical (Seller is not recorded revenue holder) |
| **5. Physical Road Width** | On-Site Satellite Audit | Minimum 30-ft metalled access road | 🟡 Moderate (Future fire/emergency vehicle denial) |
| **6. Bank Mortgage Clearance**| Nationalized Bank (SBI/HDFC/PNB)| Approved Project Financial (APF) Code | 🟢 Safe (Bank legal cell has vetted title) |
| **7. Municipal Mutation** | Nagar Nigam / Local Council | Dakhil Kharij Municipal Assessment | 🔴 Critical (Property tax ledger remains in seller name) |

---

### Understanding Section 80 (Old Section 143) Land Conversion
In peri-urban expanding corridors, agricultural fields are routinely carved into residential colonies by unscrupulous unorganized promoters without obtaining formal statutory conversion.

Under **Section 80 of the UP Revenue Code 2006**, an agricultural landholder must apply to the Sub-Divisional Magistrate (SDM) to declare the land as non-agricultural (*Gair-Krishi*). 

#### Why Buying Un-Converted Land is Disastrous:
1. **Institutional Loan Blacklist**: Nationalized banks (SBI, HDFC, PNB) are statutorily prohibited from disbursing residential home loans on unconverted agricultural survey parcels.
2. **Delayed or Denied Mutation**: Even if the Sub-Registrar executes a Sale Deed, the revenue Tehsil will deny residential *Dakhil Kharij*.
3. **Sealing and Demolition**: Development authorities routinely seal unauthorized commercial establishments constructed on agricultural land without master plan land-use amendment.

---

### The 30-Year Non-Encumbrance Certificate (NEC)
Before paying earnest money, request an official **30-Year Non-Encumbrance Certificate (Form 22)** from the Sub-Registrar Office or verify it online via the IGRSUP portal.

The NEC confirms:
- The property has not been pledged as collateral for unpaid commercial or Kisan Credit Card (KCC) loans.
- No interim civil litigation, dispute, or attachment order by revenue courts exists against the title.
- The chain of transfer deeds across predecessor owners is unbroken and authentic.

---

### How the EstateOS Property Truth Score™ Protects Buyers
At EstateOS, we believe buyers should never have to navigate deceptive broker claims alone. Every listing on EstateOS undergoes rigorous cross-examination across our proprietary **100-Point Property Truth Score™ Algorithm**, checking:
- RERA statutory compliance and builder permit authenticity.
- Physical on-site road frontage measurements.
- Direct registry title clarity and mutation certainty.
- Pre-approved bank mortgage eligibility across nationalized lenders.

Browse 100% audited freehold residences and plots on **[EstateOS Verified Properties](/properties)**.
`,
  },
  {
    id: 'aeo-guide-4',
    title: 'How to Check RERA Registered Properties Online in India: Official 2026 Guide',
    slug: 'how-to-check-rera-registered-properties-online-india-2026',
    excerpt: 'Avoid unapproved builders and project delays by understanding the state-wise RERA verification process, carpet area formulas, and title verification rules.',
    category: 'RERA & Legal',
    authorName: 'Adv. Meenakshi Sundaram',
    authorTitle: 'Real Estate Regulatory Council',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
    publishedAt: '2026-11-12T09:00:00+05:30',
    viewsCount: 3890,
    faqs: [
      {
        question: 'How do I check if a builder project is RERA registered online?',
        answer: 'Visit your official state RERA portal (e.g. up-rera.in for UP, maharera.maharashtra.gov.in for Maharashtra, haryanarera.gov.in for Haryana). Navigate to "Registered Projects", search by builder name or RERA registration number, and inspect the approved building layout maps, bank escrow accounts, and completion quarter timelines.',
      },
      {
        question: 'Is RERA registration mandatory for all real estate projects in India?',
        answer: 'Under Section 3 of the RERA Act 2016, RERA registration is legally mandatory for any commercial or residential project where the land area exceeds 500 square meters or where the number of apartments exceeds 8 units.',
      },
    ],
    content: `
### Executive Summary
The Real Estate (Regulation and Development) Act (RERA) 2016 transformed Indian property buying by replacing opaque promises with legally binding project timelines and escrow transparency.

### Why Every Buyer Must Audit RERA Registration Before Token Payment
Before signing an Expression of Interest (EOI) or parting with any earnest booking money, verifying the developer's registered project page on the state RERA portal is an indispensable safeguard.

1. **Escrow Account Safeguards**: RERA mandates that 70% of investor receivables must be kept in a dedicated schedule bank escrow account solely disbursed for construction and land expenditure.
2. **Standardized Carpet Area**: Developers are forbidden from charging based on ambiguous "super built-up area" multiples without clearly defining usable internal net carpet area.
3. **5-Year Structural Defect Warranty**: Builders are legally required to rectify structural defects without additional fees for five years following possession.

### Step-by-Step State RERA Verification Portals
- **Uttar Pradesh (UP-RERA)**: Visit \`up-rera.in\` -> Project Status -> Search by promoter or project RERA certificate ID.
- **Maharashtra (MahaRERA)**: Visit \`maharera.maharashtra.gov.in\` -> Registered Projects -> Search by Project Name or Registration Number.
- **Punjab (PBRERA)**: Navigate to \`rera.punjab.gov.in\` -> Search Registered Projects -> Check quarter-by-quarter financial progress updates.
- **Haryana (HRERA Gurugram & Panchkula)**: Access \`haryanarera.gov.in\` to confirm bank account details and building sanction approvals.

By combining state RERA verification with the **[EstateOS Property Truth Score™](/truth-score)**, buyers benefit from automated registry cross-matching that flags unverified marketing claims before legal commitments are made.
`,
  },
  {
    id: 'aeo-guide-5',
    title: 'Carpet Area vs Super Built-Up Area: Statutory RERA Calculation & Loading Guide',
    slug: 'carpet-area-vs-super-built-up-area-rera-calculation-guide',
    excerpt: 'Understand how developers historically inflated square footage by 35% with loading and how Section 2(k) of RERA protects buyers today.',
    category: 'RERA & Legal',
    authorName: 'Adv. Ritu Khosla',
    authorTitle: 'Property Law Specialist',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
    publishedAt: '2026-11-10T11:00:00+05:30',
    viewsCount: 3410,
    faqs: [
      {
        question: 'What is the official RERA definition of carpet area?',
        answer: 'Under Section 2(k) of the RERA Act 2016, carpet area is strictly defined as the net usable floor area of an apartment, excluding external walls, service shafts, exclusive balcony/verandah areas, and exclusive open terrace areas, but including the area covered by the internal partition walls of the apartment.',
      },
    ],
    content: `
### Executive Summary
Historically in Indian real estate, developers charged buyers on arbitrary "Super Built-Up Area" figures inflated by 25% to 40% loading factors covering common corridors, lift shafts, and clubhouses. The RERA Act 2016 legally ended this practice by mandating all property sales strictly on usable net carpet area.

### Section 2(k) of the RERA Act: The Exact Definition
Carpet area means the net usable floor area of an apartment, excluding the area covered by the external walls, areas under services shafts, exclusive balcony or verandah area, and exclusive open terrace area, but includes the area covered by the internal partition walls of the apartment.

Use our **[EstateOS Carpet Area Calculator](/calculators)** to calculate actual usable space from super built-up quotes before booking.
`,
  },
];

export const CURATED_GUIDES_MAP: Record<string, CuratedGuide> = CURATED_GUIDES.reduce((acc, g) => {
  acc[g.slug] = g;
  acc[g.id] = g;
  return acc;
}, {} as Record<string, CuratedGuide>);
