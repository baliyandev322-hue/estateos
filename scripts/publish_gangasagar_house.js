const { PrismaClient } = require('@prisma/client');

async function run() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL
      }
    }
  });

  try {
    console.log('Connecting to database...');

    // 1. Get Siddhartha Real Estate & Construction
    const org = await prisma.organization.findUnique({
      where: { slug: 'siddhartha-real-estate-and-construction' }
    });

    if (!org) {
      throw new Error('Siddhartha organization not found!');
    }

    const slug = '80-gaj-luxury-3bhk-duplex-house-gangasagar-ganganagar-meerut';
    const images = [
      '/uploads/gangasagar-80gaj/front-elevation.jpg',
      '/uploads/gangasagar-80gaj/side-angle-villa.jpg',
      '/uploads/gangasagar-80gaj/elevation-close.jpg',
      '/uploads/gangasagar-80gaj/divider-road-wide.jpg',
      '/uploads/gangasagar-80gaj/divider-road-approach.jpg',
      '/uploads/gangasagar-80gaj/street-view.jpg',
      '/uploads/gangasagar-80gaj/green-road.jpg'
    ];

    const amenities = [
      '80 Gaj Land Area (1,400 Sq.Ft Super Built-Up G+1)',
      '3 BHK Double Storey (दो मंजिला) Luxury Independent Kothi',
      'Directly on Main Divider Road (मेन डिवाइडर रोड पर स्थित)',
      'Wide Concrete Sector Road with Green Tree Avenue',
      'East Facing Vastu Compliant Entrance',
      'Spacious Open Rooftop Terrace with Designer Railing',
      'Secured & Prestigious Ganganagar Residential Enclave',
      'Immediate Registry, Clean Title & Easy Bank Loan Assistance'
    ];

    const description = `🌟 गंगासागर कॉलोनी (गंगानगर, मेरठ) — 80 गज 3BHK दो मंजिला शानदार कोठी बिक्री के लिए 🌟

मेरठ के सबसे पॉश और प्राइम रिहायशी इलाके गंगानगर में सीधे मेन डिवाइडर रोड पर स्थित ब्रांड न्यू 2 मंजिला लक्ज़री कोठी!

📍 स्थान: मेन डिवाइडर रोड, गंगासागर कॉलोनी, गंगानगर, मेरठ (उत्तर प्रदेश)
📐 प्लॉट साइज़: 80 गज (720 Sq.Ft लैंड एरिया | 1,400 Sq.Ft सुपर बिल्ट-अप)
🏠 बनावट: 3 BHK दो मंजिला स्वतंत्र मकान (Ground Floor + First Floor + ओपन रूफटॉप टेरेस)
🧭 फेसिंग: ईस्ट फेसिंग (पूर्व मुखी) वास्तु सम्मत
🛣️ रोड: चौड़ी पक्की डिवाइडर रोड, पेड़-पौधों से हरा-भरा वातावरण
💰 डिमांड कीमत: ₹95,00,000/- (₹95 लाख)

मुख्य विशेषताएं:
✔️ मेन डिवाइडर रोड पर प्राइम फ्रंट होने के कारण खुला व हवादार वातावरण
✔️ दो मंजिला पक्का निर्माण, आधुनिक वाइट एलीवेशन, ग्रूवड टेक्सचर और स्टाइलिश गेट
✔️ 3 बड़े बेडरूम, स्पेशियस लिविंग हॉल, मॉडर्न किचन और वेंटिलेटेड बाथरूम्स
✔️ बड़ी ओपन छत (Rooftop Terrace) जहां से कॉलोनी का खूबसूरत व्यू दिखता है
✔️ गंगानगर, मवाना रोड, गढ़ रोड और दिल्ली-मेरठ एक्सप्रेसवे से चंद मिनटों की कनेक्टिविटी
✔️ तुरंत रजिस्ट्री, दाखिल खारिज एवं सभी प्रमुख सरकारी/प्राइवेट बैंकों से होम लोन सुविधा

ऑफिशियल बिल्डर / चैनल पार्टनर:
Siddhartha Real Estate & Construction
📲 डायरेक्ट कॉल एवं व्हाट्सएप: 7252861624`;

    const data = {
      title: '80 Gaj 3BHK Luxury Double Storey Duplex Kothi on Main Divider Road, Ganga Sagar Colony, Ganganagar, Meerut',
      slug,
      description,
      price: 9500000, // ₹95 Lakh
      pricePerSqFt: 6785,
      carpetAreaSqFt: 720, // 80 Gaj * 9
      superBuiltUpSqFt: 1400,
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      totalFloors: 2,
      floorNo: 0,
      parkingSpaces: 1,
      propertyType: 'VILLA',
      listingType: 'SALE',
      status: 'AVAILABLE',
      facing: 'EAST',
      address: 'Main Divider Road, Ganga Sagar Colony, Ganganagar, Meerut, Uttar Pradesh 250001',
      localityName: 'Ganga Sagar Colony, Ganganagar',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250001',
      possessionStatus: 'READY_TO_MOVE',
      reraId: 'VERIFIED-GANGANAGAR-DUPLEX-80GAJ',
      images: JSON.stringify(images),
      amenities: JSON.stringify(amenities),
      truthScore: 97,
      isVerified: true,
      isFeatured: true,
      isPromoted: true,
      organization: { connect: { id: org.id } }
    };

    const property = await prisma.property.upsert({
      where: { slug },
      update: data,
      create: data
    });

    console.log('SUCCESS_PUBLISHED_GANGASAGAR_HOUSE:', {
      id: property.id,
      slug: property.slug,
      title: property.title,
      price: property.price,
      truthScore: property.truthScore,
      orgId: property.orgId
    });
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((e) => {
  console.error('ERROR_PUBLISHING_GANGASAGAR_HOUSE:', e);
  process.exit(1);
});
