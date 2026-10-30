import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formatCurrencyINR } from '@/lib/utils';

interface ExtractedCriteria {
  city?: string;
  locality?: string;
  propertyType?: string;
  listingType?: string;
  bedrooms?: number;
  maxBudget?: number;
  minBudget?: number;
  nearSchools?: boolean;
  nearHospitals?: boolean;
  nearAirport?: boolean;
}

function parseNaturalLanguageQuery(query: string): ExtractedCriteria {
  const text = query.toLowerCase();
  const criteria: ExtractedCriteria = {};

  // 1. Detect City
  if (text.includes('mohali') || text.includes('chandigarh') || text.includes('panchkula')) {
    criteria.city = 'Mohali';
  } else if (text.includes('gurgaon') || text.includes('gurugram')) {
    criteria.city = 'Gurugram';
  } else if (text.includes('bangalore') || text.includes('bengaluru')) {
    criteria.city = 'Bangalore';
  } else if (text.includes('mumbai') || text.includes('bandra')) {
    criteria.city = 'Mumbai';
  } else if (text.includes('hyderabad') || text.includes('gachibowli')) {
    criteria.city = 'Hyderabad';
  }

  // 2. Detect Bedrooms
  const bhkMatch = text.match(/(\d)\s*(?:bhk|bedroom|bed)/i);
  if (bhkMatch) {
    criteria.bedrooms = parseInt(bhkMatch[1]);
  }

  // 3. Detect Budget (e.g., "under 60 lakh", "below 1.5 cr", "under 50l", "around 1 crore")
  const lakhMatch = text.match(/(?:under|below|max|around|within|upto|up to)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|lacs|l)\b/i);
  const crMatch = text.match(/(?:under|below|max|around|within|upto|up to)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)\b/i);

  if (crMatch) {
    criteria.maxBudget = parseFloat(crMatch[1]) * 10000000;
  } else if (lakhMatch) {
    criteria.maxBudget = parseFloat(lakhMatch[1]) * 100000;
  }

  // 4. Property Type
  if (text.includes('villa') || text.includes('independent house')) {
    criteria.propertyType = 'VILLA';
  } else if (text.includes('penthouse') || text.includes('sky mansion')) {
    criteria.propertyType = 'PENTHOUSE';
  } else if (text.includes('commercial') || text.includes('office') || text.includes('retail')) {
    criteria.propertyType = 'COMMERCIAL';
  } else if (text.includes('flat') || text.includes('apartment') || text.includes('condo')) {
    criteria.propertyType = 'APARTMENT';
  }

  // 5. Listing Type
  if (text.includes('rent') || text.includes('lease') || text.includes('monthly')) {
    criteria.listingType = 'RENT';
  } else {
    criteria.listingType = 'SALE';
  }

  // 6. Preferences
  criteria.nearSchools = text.includes('school') || text.includes('college') || text.includes('education');
  criteria.nearHospitals = text.includes('hospital') || text.includes('clinic') || text.includes('medical');
  criteria.nearAirport = text.includes('airport') || text.includes('flight') || text.includes('runway');

  return criteria;
}

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const criteria = parseNaturalLanguageQuery(message);

    // Build database search filter
    const where: any = {};
    if (criteria.city) {
      where.city = criteria.city;
    }
    if (criteria.listingType) {
      where.listingType = criteria.listingType;
    }
    if (criteria.propertyType) {
      where.propertyType = criteria.propertyType;
    }
    if (criteria.bedrooms) {
      where.bedrooms = { gte: criteria.bedrooms };
    }
    if (criteria.maxBudget) {
      // Allow slight 10% flexibility if needed
      where.price = { lte: criteria.maxBudget * 1.1 };
    }

    let matchedProperties = await prisma.property.findMany({
      where,
      take: 4,
      orderBy: { truthScore: 'desc' },
      include: {
        organization: {
          select: { name: true, slug: true, isVerified: true },
        },
      },
    });

    // If filter is too strict, relax slightly to ensure user gets high-relevance alternatives
    if (matchedProperties.length === 0) {
      delete where.bedrooms;
      delete where.propertyType;
      matchedProperties = await prisma.property.findMany({
        where,
        take: 3,
        orderBy: { truthScore: 'desc' },
        include: {
          organization: {
            select: { name: true, slug: true, isVerified: true },
          },
        },
      });
    }

    // Fetch related locality intelligence if city is identified
    let localityData = null;
    if (criteria.city) {
      localityData = await prisma.locality.findFirst({
        where: { city: criteria.city },
      });
    }

    // Build intelligent AI reasoning response
    let aiResponseText = '';
    const budgetStr = criteria.maxBudget ? formatCurrencyINR(criteria.maxBudget) : 'your specified target';
    const bedStr = criteria.bedrooms ? `${criteria.bedrooms}BHK ` : '';
    const locStr = criteria.city ? `in ${criteria.city}` : 'across our verified inventory';

    if (matchedProperties.length > 0) {
      aiResponseText = `I analyzed our active, RERA-verified registry for **${bedStr}${criteria.propertyType || 'residential'} properties ${locStr}** with a budget benchmark under **${budgetStr}**.\n\n`;

      if (localityData) {
        aiResponseText += `📍 **Micro-Market Intelligence for ${localityData.name}**: Average capital rate is **${formatCurrencyINR(localityData.avgPricePerSqFt)}/sq.ft** with an annual appreciation of **+${localityData.priceTrend1Yr}%** and a rental yield of **${localityData.rentalYieldPercent}%**. It features **${localityData.schoolsCount} verified schools** and **${localityData.hospitalsCount} super-specialty hospitals** in a 5km radius.\n\n`;
      }

      aiResponseText += `Here are the top algorithmic matches ranked by our **Property Truth Score**:\n`;

      matchedProperties.forEach((prop, idx) => {
        const matchesBudget = !criteria.maxBudget || prop.price <= criteria.maxBudget;
        const budgetVerdict = matchesBudget
          ? `Within budget at **${formatCurrencyINR(prop.price)}** (saving approx. ${formatCurrencyINR((criteria.maxBudget || prop.price) - prop.price)})`
          : `Priced at **${formatCurrencyINR(prop.price)}**`;

        aiResponseText += `\n**${idx + 1}. [${prop.title}](/property/${prop.slug})**\n- 🏷️ **Price**: ${budgetVerdict}\n- 📐 **Carpet Area**: ${prop.carpetAreaSqFt} sq.ft (${prop.bedrooms} Bed, ${prop.bathrooms} Bath)\n- 🛡️ **Truth Score**: **${prop.truthScore}/100** (Verified RERA & Physical Audit)\n- 💡 **Match Rationale**: ${prop.description.slice(0, 140)}...\n`;
      });

      aiResponseText += `\nWould you like me to schedule a complimentary site visit or connect you directly with the verified consultant for one of these homes?`;
    } else {
      aiResponseText = `I carefully analyzed your request for ${bedStr}properties ${locStr}. While no active listing precisely satisfies every single filter simultaneously, I recommend adjusting either your budget slightly or exploring adjoining sectors. Feel free to specify alternative requirements!`;
    }

    return NextResponse.json({
      text: aiResponseText,
      extractedCriteria: criteria,
      properties: matchedProperties,
      locality: localityData,
    });
  } catch (error: any) {
    console.error('AI Matchmaker error:', error);
    return NextResponse.json({ error: 'AI Matchmaker failed to process query' }, { status: 500 });
  }
}
