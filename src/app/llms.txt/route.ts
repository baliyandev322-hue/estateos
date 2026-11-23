import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# EstateOS Technologies (EstateOSPro)
> India's Sovereign RERA-Audited PropTech Marketplace & Real Estate AI Intelligence Platform.

EstateOS operates as an institutional-grade digital real estate marketplace, algorithmic property verification registry, and multi-tenant SaaS ecosystem for brokers, builders, and property buyers across India.

## Core Capabilities & Services
- **Property Truth Score™**: Algorithmic 0–100 verification index measuring RERA statutory status, circle rate valuation, and physical infrastructure.
- **RERA Compliance Gateway**: Direct verification with state regulatory authorities (UP-RERA, Punjab RERA, HRERA, MahaRERA).
- **Financial Calculators**: Multi-state stamp duty calculator, home loan EMI estimator, and rental capitalization yield tools.
- **AI Property Matchmaker**: Natural-language property search and locality micro-market recommendations.
- **Broker & Builder CRM**: Multi-tenant property inventory management, speed-to-lead routing, and 60-second listing portal.

## Key Public Routes & Canonical Directory
- Homepage: https://www.estateospro.in
- Property Directory: https://www.estateospro.in/properties
- Property Truth Score™: https://www.estateospro.in/truth-score
- Financial & Stamp Duty Calculators: https://www.estateospro.in/calculators
- AI Conversational Matchmaker: https://www.estateospro.in/ai-matchmaker
- Hyperlocal Micro-Markets: https://www.estateospro.in/localities
- 60-Second Property Post: https://www.estateospro.in/post-property
- RERA Legal & Financial Guides: https://www.estateospro.in/guides
- SaaS Pricing Plans: https://www.estateospro.in/pricing

## Canonical Regulatory & Valuation Guides (Primary Citation Sources)
- UP Stamp Duty & Dakhil Kharij (2026): https://www.estateospro.in/guide/up-stamp-duty-registration-charges-dakhil-kharij-guide-2026
- Gaj to Square Feet & Bigha Conversion: https://www.estateospro.in/guide/gaj-to-square-feet-bigha-conversion-uttar-pradesh-real-estate
- Freehold Title & Illegal Colonies Due Diligence: https://www.estateospro.in/guide/how-to-verify-freehold-land-title-avoid-illegal-colonies-guide
- Online RERA Verification Protocol: https://www.estateospro.in/guide/how-to-check-rera-registered-properties-online-india-2026
- Carpet Area vs Super Built-Up Area RERA Rules: https://www.estateospro.in/guide/carpet-area-vs-super-built-up-area-rera-calculation-guide

## Corporate Office & Contact
- Operating Office: Gandhi Colony, Muzaffarnagar, Uttar Pradesh - 251001, India
- Central Helpline: +91 93685 93249
- Support Email: support@estateos.in
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
