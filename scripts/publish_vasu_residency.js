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

    // 1. Organization for Ravi Poswal / Vasu Residency
    const org = await prisma.organization.upsert({
      where: { slug: 'ravi-poswal-vasu-residency-meerut' },
      update: {
        name: 'Ravi Poswal (Vasu Residency & SAS Realty)',
        phone: '9761318586',
        logo: '/uploads/vasu-residency/grand-gate.jpg',
        reraNumber: 'Zila Panchayat Approved Project',
        city: 'Garh Road, Meerut',
        state: 'Uttar Pradesh',
        isVerified: true
      },
      create: {
        slug: 'ravi-poswal-vasu-residency-meerut',
        name: 'Ravi Poswal (Vasu Residency & SAS Realty)',
        phone: '9761318586',
        logo: '/uploads/vasu-residency/grand-gate.jpg',
        reraNumber: 'Zila Panchayat Approved Project',
        city: 'Garh Road, Meerut',
        state: 'Uttar Pradesh',
        isVerified: true
      }
    });

    console.log('Organization created/updated:', org.name, org.phone);

    const slug = 'vasu-residency-zila-panchayat-approved-plots-garh-road-meerut';
    const images = [
      '/uploads/vasu-residency/grand-gate.jpg',
      '/uploads/vasu-residency/3d-layout-plan.jpg',
      '/uploads/vasu-residency/entrance-boulevard.jpg'
    ];

    const amenities = [
      '167 Bigha Grand Gated Residential Township',
      'Zila Panchayat Approved Project (जिला पंचायत से स्वीकृत)',
      'Grand 80 Feet Wide Main Entrance Gate with Divider Road',
      'Wide Internal Concrete Roads (80, 70, 60, 40, 30, 25 Feet)',
      '4 Large Themed Landscaped Parks & Open Green Spaces',
      'Commercial Market Complex & Shopping Stores Inside Society',
      'Underground Sewerage System & Rain Water Harvesting (RWH)',
      'STP Plant, Overhead Water Tank & 24x7 Street Lights',
      'Direct Ring Road, NH-58, NH-34 Hapur Rd & Mawana Rd Connectivity',
      '5-10 Min from Tejgarhi, Medical College, Jagriti Vihar & Shastri Nagar',
      'Bank Home Loan Facility Available from Leading Banks',
      'Plot Sizes: 100, 132, 135, 150, 180 up to 260 Gaj'
    ];

    const description = `🏡 वासु रेजीडेंसी (VASU RESIDENCY) — गढ़ रोड, मेरठ | जिला पंचायत से स्वीकृत 🏡

मेरठ के सबसे तेजी से विकसित हो रहे गढ़ रोड कॉरिडोर पर अपना सुनहरा आशियाना बनाने का शानदार अवसर!

📍 स्थान: मेन गढ़ रोड हाईवे, पास रिंग रोड, मेरठ (उत्तर प्रदेश)
🏛️ अप्रूवल: जिला पंचायत मेरठ से विधिवत स्वीकृत (Zila Panchayat Approved)
📐 उपलब्ध प्लॉट साइज़: 100, 132, 135, 150, 180 वर्ग गज से लेकर 260 वर्ग गज तक
💰 डिमांड रेट: ₹19,000/- से ₹25,000/- प्रति वर्ग गज (बुकिंग एवं आसान किस्तों की सुविधा)

🌟 वासु रेजीडेंसी प्रोजेक्ट की मुख्य विशेषताएं:
✔️ 167 बीघा की विशाल व भव्य गेटेड प्रीमियम आवासीय टाउनशिप
✔️ मेन गढ़ रोड से 80 फीट चौड़ा भव्य स्वागत द्वार एवं सेंट्रल डिवाइडर रोड
✔️ कॉलोनी के अंदर 80, 70, 60, 40, 30 और 25 फीट चौड़ी इंटरलॉकिंग पक्की सड़कें
✔️ 4 बड़े थीम-बेस्ड हरे-भरे पार्क एवं चिल्ड्रन प्ले एरिया
✔️ मजबूत बाउंड्री वॉल, अंडरग्राउंड सीवरेज, ओवरहेड पानी की टंकी, एलईडी स्ट्रीट लाइट्स
✔️ आधुनिक STP (सीवेज ट्रीटमेंट प्लांट) एवं RWH (रेन वाटर हार्वेस्टिंग) सिस्टम
✔️ सोसाइटी के अंदर ही कमर्शियल मार्केट एरिया एवं दैनिक उपयोगी दुकानें

🚗 प्राइम लोकेशन एवं बेहतरीन कनेक्टिविटी:
• सीधे गढ़ रोड हाईवे और रिंग रोड से सटा हुआ
• NH-58 (दिल्ली-रुड़की-हरिद्वार), मवाना-बिजनौर हाईवे और NH-34 (हापुड़ रोड) से आसान कनेक्टिविटी
• मात्र 5 मिनट की दूरी पर स्कूल, कॉलेज, मल्टी-स्पेशियलिटी अस्पताल, पेट्रोल पंप और मुख्य बाजार
• 10 से 15 मिनट की दूरी पर तेजगढ़ी चौराहा, मेरठ मेडिकल कॉलेज, जागृति विहार और शास्त्री नगर

🏦 बैंक लोन की सुविधा सभी प्रमुख बैंकों से उपलब्ध।

अधिक जानकारी, साइट विजिट एवं डायरेक्ट बुकिंग के लिए संपर्क करें:
रवि पोसवाल (Vasu Residency & SAS Realty)
📲 डायरेक्ट कॉल एवं व्हाट्सएप: 9761318586 / 9761826052`;

    const data = {
      title: 'Vasu Residency Zila Panchayat Approved Residential Plots, Main Garh Road, Meerut',
      slug,
      description,
      price: 1900000, // Starts at ₹19.00 Lakh for 100 Gaj
      pricePerSqFt: 2111,
      carpetAreaSqFt: 900, // 100 Gaj * 9
      superBuiltUpSqFt: 2340, // 260 Gaj
      propertyType: 'PLOT',
      listingType: 'SALE',
      status: 'AVAILABLE',
      facing: 'EAST',
      address: 'Main Garh Road Highway, Near Ring Road, Meerut, Uttar Pradesh 250004',
      localityName: 'Garh Road',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250004',
      possessionStatus: 'READY_TO_MOVE',
      reraId: 'ZILA-PANCHAYAT-APPROVED-MEERUT',
      images: JSON.stringify(images),
      amenities: JSON.stringify(amenities),
      truthScore: 98,
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

    console.log('SUCCESS_PUBLISHED_VASU_RESIDENCY:', {
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
  console.error('ERROR_PUBLISHING_VASU_RESIDENCY:', e);
  process.exit(1);
});
