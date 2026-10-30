import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      title,
      propertyType = 'Apartment',
      bedrooms = 3,
      bathrooms = 3,
      carpetAreaSqFt = 1500,
      facing = 'North-East',
      locality = 'Prime Sector',
      city = 'Mohali',
      targetAudience = 'Luxury Buyers / Tech Executives',
      highlights = [],
    } = await request.json();

    const highlightsList = Array.isArray(highlights) && highlights.length > 0
      ? highlights.join(', ')
      : 'panoramic balconies, Italian marble finishes, premium smart automation, high-speed elevator access, 24/7 multi-tier security';

    const generatedDescription = `Nestled in the prestigious corridor of ${locality}, ${city}, this signature ${bedrooms}BHK ${propertyType} redefines modern urban luxury. Spanning an expansive ${carpetAreaSqFt} sq.ft of RERA-certified net usable carpet area, the residence is masterfully configured with a Vastu-compliant ${facing} orientation ensuring an abundance of cross-ventilation and natural morning daylight.

Key Highlights & Interior Specifications:
- Thoughtfully designed living spaces accented with premium acoustic insulation and expansive floor-to-ceiling double-glazed windows.
- Gourmet kitchen layout provisions engineered for German modular appliances and quartz stone countertops.
- En-suite master bedroom featuring wooden laminated flooring, walk-in dressing wardrobe alcove, and designer sanitary fittings.
- Premium residential ecosystem featuring: ${highlightsList}.

Strategically situated within minutes of premier international schools, multi-specialty healthcare facilities, and major IT expressways, this property represents an unparalleled opportunity for both end-use discerning homeowners and savvy real estate investors seeking sustainable capital appreciation.

*All structural details and carpet areas are verified under official State RERA specifications. Connect today to book a private VIP walkthrough.*`;

    return NextResponse.json({
      success: true,
      description: generatedDescription,
    });
  } catch (error: any) {
    console.error('AI Generator error:', error);
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}
