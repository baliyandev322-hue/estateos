const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const additionalArticles = [
  {
    title: "How to Verify Title Deeds & Encumbrance Certificate (EC) in India: Complete 2026 Checklist",
    slug: "how-to-verify-title-deeds-encumbrance-certificate-india",
    category: "RERA & Legal",
    excerpt: "A definitive legal due diligence handbook covering 30-year mother deed searches, encumbrance certificates, mutation register checks, and khata verification before token money.",
    tags: "Legal Due Diligence, Title Deeds, Encumbrance Certificate, Property Law, RERA",
    authorName: "Adv. Rajesh Varma (Real Estate Legal Counsel)",
    coverImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 8,
    isPublished: true,
    content: `Purchasing real estate in India requires exhaustive legal verification before signing an agreement to sell or transferring booking tokens. A clean title ensures freedom from litigation, unauthorized third-party mortgages, and fraudulent double-allotments.

### 1. The 30-Year Chain of Title (Mother Deed Search)
A property buyer must trace ownership history backwards for a minimum of 30 years (or 13 years at absolute statutory minimum). The primary instrument is the **Mother Deed** (or parent deed). Each conveyance—whether through sale deed, gift deed, partition deed, or testamentary succession—must seamlessly connect without broken links.

### 2. Encumbrance Certificate (Form 15 vs Form 16)
The Sub-Registrar's Office (SRO) maintains the Encumbrance Certificate (EC), recording all registered monetary charges, bank liens, and mortgages against the survey or parcel number:
* **Form 15:** Discloses all registered transactions, mortgages, court attachments, and lease agreements within the requested time span.
* **Form 16 (Nil Encumbrance):** Certifies that no registered transactions or liens have been found during the queried tenure.

### 3. Revenue Records & Mutation Register (Jamabandi & Khata)
While a registered sale deed transfers legal title, **Revenue Mutation** (such as Khata transfer, Patta, or Jamabandi entry) records liability for property taxation with local municipal and revenue authorities. Never finalize a purchase without verifying that the seller's name is updated in the official municipal assessment roll.

### 4. Non-Agricultural (NA) Land Conversion Order
If buying plotted developments or farmhouses, verify that agricultural land has received statutory conversion under the state Land Revenue Code. Constructing residential or commercial dwellings on un-converted agricultural parcels leads to municipal demolition orders.`
  },
  {
    title: "NRI Property Buying in India (2026): FEMA Rules, NRE/NRO Banking, Repatriation & Capital Gains",
    slug: "nri-property-buying-guide-india-fema-taxation-2026",
    category: "Buying Guides",
    excerpt: "Everything Non-Resident Indians need to know about purchasing residential and commercial real estate in India under Reserve Bank of India FEMA guidelines.",
    tags: "NRI Real Estate, FEMA Regulations, NRE NRO Accounts, Repatriation, RBI Guidelines",
    authorName: "EstateOS Global Wealth Advisory",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 9,
    isPublished: true,
    content: `Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) represent over 15% of high-ticket luxury real estate investments across Delhi-NCR, Mumbai, and Bengaluru. Understanding statutory Reserve Bank of India (RBI) parameters prevents compliance penalties.

### 1. Permitted Real Estate Acquisitions Under FEMA
Under Foreign Exchange Management Act (FEMA) directives:
* **Permitted:** NRIs/OCIs can acquire unlimited numbers of residential and commercial immovable properties.
* **Prohibited:** NRIs cannot purchase agricultural land, plantation properties, or farmhouses unless acquired via ancestral inheritance.

### 2. Banking Channels: NRE vs NRO vs FCNR
All real estate consideration must flow through formal inward banking remittances:
* **NRE (Non-Resident External) Account:** Denominated in INR, fully repatriable without upper ceiling.
* **NRO (Non-Resident Ordinary) Account:** Suitable for funds originating inside India (e.g., rental yields, pensions, dividends). Repatriable up to $1 Million USD per financial year with Form 15CA/15CB tax clearances.
* **Cash payments are strictly illegal** and subject to Section 269SS/T statutory penalties.

### 3. Repatriation of Sale Proceeds
When an NRI sells an Indian property:
* The original capital remitted from overseas into up to two residential units can be repatriated without upper limits.
* Capital appreciation (profits) can be remitted via the $1 Million annual scheme after applicable Long-Term Capital Gains (LTCG) tax deduction at source (TDS under Section 195).`
  },
  {
    title: "Top 7 Real Estate Corridors in India for High Capital Appreciation (2026-2030 Outlook)",
    slug: "top-7-real-estate-investment-corridors-india-2026-2030",
    category: "Investment",
    excerpt: "From Noida International Airport Jewar to Bangalore North ORR and Mohali PR-7, discover the 7 high-alpha growth corridors outperforming traditional real estate indices.",
    tags: "Capital Growth, Investment Corridors, Jewar Airport, Mohali PR-7, Bangalore North, Gurugram",
    authorName: "Kavita Singhal (Senior PropTech Macro Analyst)",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 10,
    isPublished: true,
    content: `Infrastructure-led capital appreciation is yielding unprecedented returns for institutional and retail real estate investors across India's high-velocity economic corridors.

### 1. Jewar Airport & Yamuna Expressway (Noida/Greater Noida)
With trial operations underway at Noida International Airport (DXN), industrial corridors, data centers, and proposed Olympic City infrastructure are driving 14% to 18% compound annual value escalation across Sectors 18, 20, and 22D.

### 2. Dwarka Expressway & SPR (Southern Peripheral Road), Gurugram
Direct grade-separated connectivity to Indira Gandhi International Airport (DEL) and cloverleaf integration with NH-48 makes Dwarka Expressway (Sectors 102-113) and SPR prime luxury epicenters for Fortune 500 corporate executive housing.

### 3. PR-7 Airport Road & IT City (Mohali, Punjab)
Connecting Zirakpur to Chandigarh International Airport and New Chandigarh, Mohali's PR-7 spine is witnessing rapid commercialization with prominent tech campuses (Infosys, Quark) and plotted townships.

### 4. Bengaluru North & Outer Ring Road (ORR) Aerotropolis
Hebbal, Yelahanka, and Devanahalli continue to attract tech capital due to the upcoming Blue Line Metro extension and proximity to Kempegowda International Airport (BLR).

### 5. Mumbai Trans Harbour Link (MTHL - Atal Setu) Impact Zone
Atal Setu has truncated travel time between South Mumbai and Navi Mumbai from 120 minutes to 20 minutes, igniting sharp capital appreciation across Ulwe, Dronagiri, and Panvel.`
  },
  {
    title: "Commercial Office Space vs Residential Apartments: Rental Yields, Leases & Wealth Strategy",
    slug: "commercial-vs-residential-real-estate-rental-yields-taxation",
    category: "Investment",
    excerpt: "Comparing 3% residential yields against 8.5% pre-leased commercial assets: Lease structures (3+3+3), CAM charges, vacancy risks, and GST implications.",
    tags: "Commercial Property, Rental Yields, Real Estate ROI, Pre-Leased Assets, Office Space",
    authorName: "EstateOS Institutional Advisory Desk",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 8,
    isPublished: true,
    content: `Choosing between commercial and residential real estate depends on an investor's yield appetite, liquidity timeline, and operational risk tolerance.

### 1. Yield Comparison: 2.5%-3.5% vs 7.5%-9.5%
* **Residential Units:** Urban apartments across Mumbai, Delhi-NCR, and Bengaluru deliver net gross rental yields between 2.2% and 3.6%. Capital appreciation constitutes the majority of cumulative returns.
* **Grade-A Commercial Space:** Pre-leased IT parks, retail showrooms, and office floors command yields of 7.5% to 9.5%, generating robust monthly cash flow.

### 2. Lease Dynamics & Lock-In Periods
Residential leases in India typically follow an 11-month tenure with tenant termination options upon 1-month notice. Conversely, institutional commercial leases utilize the **9-year lease structure (3+3+3)** with a mandatory 3-year hard lock-in, 15% escalation every 36 months, and corporate security deposits covering 6 months of gross rent.

### 3. Maintenance, Fitouts & CAM Charges
* **Residential:** Landlords remain responsible for wear and tear, internal maintenance, and property tax.
* **Commercial:** Bare-shell units require substantial tenant improvement allowances (fitouts), while Triple-Net (NNN) leases mandate that the corporate tenant pays property taxes, insurance, and Common Area Maintenance (CAM).`
  },
  {
    title: "How to Avoid Real Estate Frauds & Fake Property Listings in India: 10 Red Flags",
    slug: "how-to-avoid-real-estate-frauds-phantom-listings-india",
    category: "RERA & Legal",
    excerpt: "Learn how phantom listings, double-allotment scams, and forged powers of attorney work, and how algorithmic Property Truth Scores™ safeguard your life savings.",
    tags: "Fraud Prevention, Property Scams, Truth Score, Safe Home Buying, RERA Compliance",
    authorName: "EstateOS Fraud Mitigation Unit",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 7,
    isPublished: true,
    content: `India's real estate ecosystem has historically struggled with opaque middlemen, phantom listings, and forged property documentation. Protecting your life savings requires vigilant skepticism and verification protocols.

### 1. The 'Too Good to Be True' Below-Market Discount
Fraudulent brokers frequently advertise ultra-luxury units at 30% below prevailing circle rates or developer list prices. These listings are engineered as 'bait-and-switch' traps to capture buyer phone numbers for unrelated telemarketing syndicates.

### 2. Absence of State RERA Registration Number
Under Section 3 of the Real Estate (Regulation and Development) Act 2016, no promoter or builder may advertise, market, book, or offer for sale any real estate project exceeding 500 square meters or 8 apartments without registered state RERA authorization. Always independently verify the RERA ID on state portals (e.g., UP-RERA, HRERA, MahaRERA).

### 3. Sale via Power of Attorney (PoA) Without Registered Owner
In the landmark *Suraj Lamp & Industries* judgment, the Supreme Court of India established that immovable property can only be legally conveyed via a registered Deed of Conveyance. General Power of Attorney (GPA) sales do not confer valid freehold title.

### 4. Demand for Cash Advance Before Legal Draft
Never disburse unrecorded earnest money or token advance without a signed Memorandum of Understanding (MoU) that includes an explicit clause ensuring 100% refund in the event title due diligence uncovers encumbrances or litigation.`
  },
  {
    title: "Resale Property Purchase Checklist: Essential Documents for Buying Secondary Market Flats",
    slug: "resale-flat-purchase-checklist-essential-documents-india",
    category: "Buying Guides",
    excerpt: "Purchasing a second-sale apartment? Step-by-step verification guide covering Society NOC, Share Certificates, Electricity meter transfers, and Bank lien discharge.",
    tags: "Resale Flat, Secondary Market, Housing Society NOC, Document Checklist, Apartment Buying",
    authorName: "Sunil Bakshi (Property Registrar Specialist)",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 7,
    isPublished: true,
    content: `Unlike primary purchases directly from developers, buying a resale flat from an individual owner involves existing society memberships, historical municipal dues, and past mortgage settlements.

### 1. Society No-Objection Certificate (NOC) & Share Certificate
In cooperative housing societies (CHS) and registered apartment owners associations (AOA), verify that:
* The original Share Certificate is held in the seller's name without endorsements to third parties.
* A formal Society NOC confirms all maintenance dues, sinking funds, and transfer fees are cleared to date.

### 2. Occupancy Certificate (OC) & Completion Certificate (CC)
Verify that the underlying apartment tower possesses a valid Occupancy Certificate issued by the municipal corporation. Living in a unit without an OC risks utility disconnections and penal property tax assessments.

### 3. Bank Loan Outstanding & Original Title Deed Retrieval
If the seller holds an active mortgage:
* Request an official Outstanding Loan Statement and list of original documents held by the lender.
* Execute a tripartite escrow or direct bank payoff to ensure the bank releases the original title deeds immediately upon closing.`
  },
  {
    title: "Section 54 & 54F Capital Gains Tax Exemptions: How to Legally Save Tax on Property Sale",
    slug: "section-54-54f-capital-gains-tax-exemptions-property-sale",
    category: "Home Loans",
    excerpt: "Comprehensive tax-saving roadmap explaining Long-Term Capital Gains (LTCG), Capital Gains Account Scheme (CGAS), and 2-year purchase / 3-year construction windows.",
    tags: "Section 54, Capital Gains Tax, LTCG, Property Tax Savings, Income Tax Act",
    authorName: "EstateOS Taxation & Wealth Advisory",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 8,
    isPublished: true,
    content: `When you sell a residential property held for more than 24 months, the profit is categorized as Long-Term Capital Gains (LTCG). Under Section 54 of the Income Tax Act 1961, individuals and HUFs can achieve 100% tax exemption by reinvesting into residential property.

### 1. Statutory Reinvestment Timelines Under Section 54
To claim full exemption on capital gains:
* **Purchase:** Buy another residential house within **1 year before** or **2 years after** the sale date.
* **Construction:** Construct a new residential house within **3 years** from the date of transfer.

### 2. The Capital Gains Account Scheme (CGAS 1988)
If the due date for filing your income tax return (July 31) arrives before you have finalized your new property purchase, you must deposit the unutilized capital gains into a designated **Capital Gains Account Scheme (Type A savings or Type B term deposit)** with an authorized public sector bank. Depositing into regular savings accounts invalidates your Section 54 exemption claim.

### 3. Lock-in Period for the New Asset
The newly acquired residential property cannot be sold or transferred within **3 years** of acquisition. Breaching this lock-in revokes the prior tax exemption, and gains will be treated as short-term capital gains in the year of secondary sale.`
  },
  {
    title: "RERA Carpet Area vs Super Built-Up Area in Uttar Pradesh & Delhi-NCR: The Statutory Formula",
    slug: "rera-carpet-area-vs-super-built-up-up-ncr-guidelines",
    category: "RERA & Legal",
    excerpt: "Understanding internal wall thickness, exclusive balconies, and common area loading formulas under UP-RERA and Haryana RERA to avoid overpaying builders.",
    tags: "RERA Carpet Area, Super Area Loading, UP-RERA, HRERA, Square Footage Guide",
    authorName: "EstateOS Engineering Audit Bureau",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    readTimeMinutes: 7,
    isPublished: true,
    content: `Prior to the enactment of the Real Estate (Regulation and Development) Act 2016, home buyers in Delhi-NCR, Noida, and Gurugram were routinely billed on opaque 'Super Built-Up Areas' featuring loading factors of 35% to 45%. RERA mandated standardized Carpet Area definitions nationwide.

### 1. Statutory Definition of RERA Carpet Area
Under Section 2(k) of RERA 2016:
> *"Carpet area means the net usable floor area of an apartment, excluding the area covered by external walls, areas under service shafts, exclusive balcony or verandah area, and exclusive open terrace area, but includes the area covered by the internal partition walls of the apartment."*

### 2. The Common Area Loading Myth
Builders previously charged buyers for clubhouses, lift shafts, swimming pools, and emergency staircases by inflating super built-up measurements. Under current statutory rules:
* Quoted per-square-foot prices must strictly correspond to **RERA Carpet Area**.
* Exclusive balconies and verandahs must be priced and itemized separately in builder-buyer agreements.

### 3. Penalty for Carpet Area Variation
If during possession hand-over the actual carpet area decreases by more than statutory thresholds, the promoter must refund the excess consideration with prescribed SBI Marginal Cost of Funds Based Lending Rate (MCLR) + 2% interest.`
  }
];

async function seed() {
  console.log(`Starting insertion of ${additionalArticles.length} premium guides...`);
  for (const article of additionalArticles) {
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

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
