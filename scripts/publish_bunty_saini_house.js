const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL
    }
  }
});

async function main() {
  console.log('Publishing Bunty Saini 125 Gaj Triple Storey House in Deewan Chand Enclave, Meerut...');

  // 1. Create or upsert organization for Bunty Saini
  const orgSlug = 'bunty-saini-real-estate-meerut';
  const org = await prisma.organization.upsert({
    where: { slug: orgSlug },
    update: {
      name: 'Bunty Saini (Real Estate Consultant)',
      phone: '9258316233',
      isVerified: true,
      city: 'Meerut',
      logo: '/uploads/bunty-saini-house/elevation-night.jpg',
      description: 'Verified Real Estate Consultant specializing in luxury kothis, independent houses, and residential plots across Sardhana Road, Kanker Khera, and Western UP corridors.'
    },
    create: {
      name: 'Bunty Saini (Real Estate Consultant)',
      slug: orgSlug,
      phone: '9258316233',
      email: 'buntysaini.estateos@gmail.com',
      isVerified: true,
      city: 'Meerut',
      logo: '/uploads/bunty-saini-house/elevation-night.jpg',
      description: 'Verified Real Estate Consultant specializing in luxury kothis, independent houses, and residential plots across Sardhana Road, Kanker Khera, and Western UP corridors.'
    }
  });
  console.log('Upserted organization:', org.name, 'ID:', org.id);

  // 2. Publish property
  const propertySlug = '125-gaj-triple-storey-luxury-house-deewan-chand-enclave-sardhana-road-meerut';
  const images = [
    '/uploads/bunty-saini-house/elevation-night.jpg',
    '/uploads/bunty-saini-house/poster.jpg'
  ];

  const amenities = [
    '3-Storey Brand New Independent House',
    'East Facing Auspicious Entry',
    '30 Ft Wide Front Road',
    'Gated Colony with Security',
    'Ultra-Modern Elevation with LED & Spotlight Setup',
    'Stainless Steel & Frosted Glass Designer Railings',
    'Double-Height Glass Facade Architecture',
    'Covered Car Parking Porch with Ramp',
    'Independent Water Boring & Rooftop Overhead Tank',
    'Bank Home Loan Approved'
  ];

  const description = `🏡 125 गज में बना तीन मंजिला (Triple Storey) आलीशान नया मकान बिक्री के लिए उपलब्ध — दीवान चंद एन्क्लेव, सरधना रोड, मेरठ 🏡

📍 प्राइम लोकेशन: दीवान चंद एन्क्लेव, सरधना रोड (कंकरखेड़ा व NH-58 बाईपास के पास), मेरठ
📐 प्लॉट साइज: 125 गज (~1,125 Sq. Ft. प्लॉट एरिया, लगभग 3,100 Sq. Ft. ट्रिपल स्टोरी निर्मित क्षेत्र)
🧭 दिशा: पूर्व मुखी (East Facing — सबसे शुभ एवं वास्तु-सम्मत)
🛣️ सड़क: 30 फीट चौड़ी पक्की सड़क, गेटेड कॉलोनी के अंदर सुरक्षित वातावरण
💰 डिमांड: ₹1 करोड़ 20 लाख (₹1.20 Cr Demand)

✨ मुख्य विशेषताएं एवं आधुनिक सुविधाएं:
• 3 मंजिलों में बना विशाल लग्जरी लेआउट (4-5 बड़े बेडरूम, ड्राइंग रूम, मॉडर्न मॉड्यूलर किचन, और 4 बाथरूम)
• आधुनिक रात का एलिवेशन: वॉर्म एलईडी स्पॉटलाइट्स, आरजीबी टॉप परगोला लाइट्स और प्रीमियम वुडन टेक्सचर फिनिश
• बालकनी पर स्टेनलेस स्टील (SS) व फ्रॉस्टेड फ्लोरल टफन्ड ग्लास रेलिंग
• डबल-हाइट वर्टिकल ग्लास फसाड से दिनभर प्राकृतिक धूप और शानदार वेंटिलेशन
• ग्राउंड फ्लोर पर कवर्ड कार पार्किंग पोर्च, ब्लैक ग्रेनाइट प्लिंथ व आकर्षक टाइल रैंप
• शांतिपूर्ण और सुरक्षित गेटेड रेजीडेंशियल कॉलोनी — स्कूल, अस्पताल, और मार्केट बिल्कुल पास
• 100% क्लियर रजिस्ट्री टाइटल व सभी प्रमुख सरकारी/प्राइवेट बैंकों से होम लोन सुविधा उपलब्ध।

📞 ऑफिशियल कंसल्टेंट / सेलर: बंटी सैनी (Bunty Saini) — डायरेक्ट कॉल एवं व्हाट्सएप: 9258316233`;

  const prop = await prisma.property.upsert({
    where: { slug: propertySlug },
    update: {
      title: '125 Gaj East Facing Triple Storey Luxury House on 30ft Road, Deewan Chand Enclave, Sardhana Road, Meerut',
      description,
      propertyType: 'VILLA',
      listingType: 'SALE',
      price: 12000000,
      pricePerSqFt: 3870,
      bedrooms: 5,
      bathrooms: 4,
      balconies: 3,
      carpetAreaSqFt: 2250,
      superBuiltUpSqFt: 3100,
      furnishing: 'SEMI_FURNISHED',
      parkingSpaces: 1,
      floorNo: 1,
      totalFloors: 3,
      facing: 'EAST',
      possessionStatus: 'READY_TO_MOVE',
      address: 'Deewan Chand Enclave, Sardhana Road',
      localityName: 'Sardhana Road & Kanker Khera',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250001',
      latitude: 29.0125,
      longitude: 77.6780,
      reraId: 'FREEHOLD-REGISTRY-APPROVED',
      truthScore: 98,
      isVerified: true,
      isFeatured: true,
      isPromoted: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify(amenities),
      images: JSON.stringify(images),
      orgId: org.id
    },
    create: {
      title: '125 Gaj East Facing Triple Storey Luxury House on 30ft Road, Deewan Chand Enclave, Sardhana Road, Meerut',
      slug: propertySlug,
      description,
      propertyType: 'VILLA',
      listingType: 'SALE',
      price: 12000000,
      pricePerSqFt: 3870,
      bedrooms: 5,
      bathrooms: 4,
      balconies: 3,
      carpetAreaSqFt: 2250,
      superBuiltUpSqFt: 3100,
      furnishing: 'SEMI_FURNISHED',
      parkingSpaces: 1,
      floorNo: 1,
      totalFloors: 3,
      facing: 'EAST',
      possessionStatus: 'READY_TO_MOVE',
      address: 'Deewan Chand Enclave, Sardhana Road',
      localityName: 'Sardhana Road & Kanker Khera',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      pinCode: '250001',
      latitude: 29.0125,
      longitude: 77.6780,
      reraId: 'FREEHOLD-REGISTRY-APPROVED',
      truthScore: 98,
      isVerified: true,
      isFeatured: true,
      isPromoted: true,
      status: 'AVAILABLE',
      amenities: JSON.stringify(amenities),
      images: JSON.stringify(images),
      organization: { connect: { id: org.id } }
    }
  });

  console.log('SUCCESS_PUBLISHED_BUNTY_SAINI_HOUSE');
  console.log('Property ID:', prop.id);
  console.log('Slug:', prop.slug);
  console.log('Live Link: https://www.estateospro.in/property/' + prop.slug);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
