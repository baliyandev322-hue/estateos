/**
 * EstateOS Domain-Specific Real Estate Bilingual Translation Engine
 * Specially calibrated for Indian PropTech vocabulary (Gaj, Vastu, Registry,
 * Kothi, Storey, Paved Roads, MDA/Zila Panchayat approvals).
 */

export type LanguageCode = 'hi' | 'en';

export function isDevanagari(text: string): boolean {
  if (!text) return false;
  // Check if text has significant Devanagari Unicode characters (U+0900 to U+097F)
  const matches = text.match(/[\u0900-\u097F]/g);
  return !!(matches && matches.length > 15);
}

// Comprehensive vocabulary mapping for Indian Real Estate
const HI_TO_EN_REPLACEMENTS: [RegExp, string][] = [
  // Full Headline Patterns
  [/में बना तीन मंजिला \((?:Triple Storey|ट्रिपल स्टोरी)\) आलीशान नया मकान बिक्री के लिए उपलब्ध/gi, 'Newly Constructed Triple Storey Luxury House / Villa Available for Sale'],
  [/में बना तीन मंजिला आलीशान नया मकान बिक्री के लिए उपलब्ध/gi, 'Newly Constructed Triple Storey Luxury House / Villa Available for Sale'],
  [/में बना दो मंजिला \((?:Double Storey|डबल स्टोरी)\) आलीशान नया मकान बिक्री के लिए उपलब्ध/gi, 'Newly Constructed Double Storey Luxury House / Villa Available for Sale'],
  [/में बना दो मंजिला आलीशान नया मकान बिक्री के लिए उपलब्ध/gi, 'Newly Constructed Double Storey Luxury House / Villa Available for Sale'],
  [/बिक्री के लिए उपलब्ध/gi, 'Available for Immediate Sale'],
  [/अपना सुनहरा आशियाना बनाने का शानदार अवसर!?/gi, 'A Golden Opportunity to Build Your Dream Residence!'],
  [/प्रीमियम आवासीय टाउनशिप/gi, 'Premium Residential Gated Township'],
  [/आवासीय टाउनशिप/gi, 'Residential Township'],
  [/आलीशान नया मकान/gi, 'Brand New Luxury Independent House'],
  [/आलीशान मकान/gi, 'Luxury Independent House'],
  [/3 मंजिलों में बना विशाल लग्जरी लेआउट|तीन मंजिलों में बना विशाल लग्जरी लेआउट/gi, 'Spacious 3-Storey Luxury Layout'],
  [/2 मंजिलों में बना विशाल लग्जरी लेआउट|दो मंजिलों में बना विशाल लग्जरी लेआउट/gi, 'Spacious 2-Storey Luxury Layout'],
  [/3 मंजिलों में बना|तीन मंजिलों में बना/gi, 'Spacious 3-Storey Layout'],
  [/2 मंजिलों में बना|दो मंजिलों में बना/gi, 'Spacious 2-Storey Layout'],
  [/विशाल लग्जरी लेआउट/gi, 'Spacious Luxury Layout'],
  [/तीन मंजिला/gi, 'Triple Storey (3 Floors)'],
  [/दो मंजिला/gi, 'Double Storey (2 Floors)'],
  [/एक मंजिला/gi, 'Single Storey'],
  [/ट्रिपल स्टोरी/gi, 'Triple Storey'],
  [/डबल स्टोरी/gi, 'Double Storey'],

  // Approvals & Legal
  [/जिला पंचायत से विधिवत स्वीकृत \((?:Zila Panchayat Approved|जिला पंचायत स्वीकृत)\)/gi, 'Duly Approved by Zila Panchayat (Zila Panchayat Approved)'],
  [/जिला पंचायत से स्वीकृत/gi, 'Zila Panchayat Approved Project'],
  [/जिला पंचायत मेरठ से विधिवत स्वीकृत/gi, 'Duly Approved by Zila Panchayat Meerut'],
  [/एमडीए से स्वीकृत|MDA स्वीकृत|MDA से स्वीकृत/gi, 'MDA (Meerut Development Authority) Approved'],
  [/100% क्लियर रजिस्ट्री टाइटल व सभी प्रमुख सरकारी\/प्राइवेट बैंकों से होम लोन सुविधा उपलब्ध।?/gi, '100% Clear Title Registry & Immediate Possession with Home Loan Facility from Leading PSU & Private Banks.'],
  [/100% क्लियर रजिस्ट्री टाइटल/gi, '100% Clear Registry Title & Immediate Possession'],
  [/क्लियर टाइटल/gi, 'Clear Title'],
  [/बैंक होम लोन की सुविधा उपलब्ध|बैंक होम लोन सुविधा उपलब्ध|होम लोन की सुविधा उपलब्ध/gi, 'Bank Home Loan Facility Available from Leading Banks'],
  [/बैंक लोन की सुविधा सभी प्रमुख बैंकों से उपलब्ध।?/gi, 'Home Loan Facility Available from all Leading Banks.'],
  [/रेडी रजिस्ट्री और तत्काल कब्जा|तत्काल कब्जा एवं रजिस्ट्री/gi, 'Ready for Registry & Immediate Possession'],
  [/तत्काल कब्जा/gi, 'Immediate Possession'],
  [/रेडी रजिस्ट्री/gi, 'Ready for Immediate Registry'],

  // Location & Orientation
  [/प्राइम लोकेशन:/gi, 'Prime Location:'],
  [/स्थान:/gi, 'Location:'],
  [/दिशा:/gi, 'Orientation / Facing:'],
  [/पूर्व मुखी \((?:East Facing — सबसे शुभ एवं वास्तु-सम्मत|East Facing)\)/gi, 'East Facing (Most Auspicious & 100% Vastu Compliant)'],
  [/पूर्व मुखी/gi, 'East Facing (Vastu Compliant)'],
  [/उत्तर मुखी/gi, 'North Facing (Auspicious Orientation)'],
  [/उत्तर-पूर्व मुखी/gi, 'North-East Facing (Ishan Corner - Highly Auspicious)'],
  [/पश्चिम मुखी/gi, 'West Facing'],
  [/दक्षिण मुखी/gi, 'South Facing'],
  [/कॉर्नर प्लॉट/gi, 'Corner Plot (Dual Road Frontage)'],
  [/पार्क फेसिंग/gi, 'Direct Park Facing'],
  [/सड़क:/gi, 'Front Road:'],
  [/फीट चौड़ी पक्की सड़क/gi, 'Feet Wide Concrete Paved Road'],
  [/गेटेड कॉलोनी के अंदर सुरक्षित वातावरण/gi, 'Secure & Peaceful Environment inside Gated Society'],
  [/शांतिपूर्ण और सुरक्षित गेटेड रेजीडेंशियल कॉलोनी/gi, 'Peaceful and Secure Gated Residential Society'],
  [/शांतिपूर्ण और सुरक्षित/gi, 'Peaceful and Secure'],
  [/गेटेड रेजीडेंशियल कॉलोनी/gi, 'Gated Residential Society'],
  [/सुरक्षित गेटेड कॉलोनी/gi, 'Secure Gated Township'],
  [/इंटरलॉकिंग पक्की सड़कें/gi, 'Interlocking Concrete Wide Roads'],

  // Measurements & Price
  [/डिमांड रेट:/gi, 'Demand Rate:'],
  [/डिमांड:/gi, 'Demand Price:'],
  [/मांग:/gi, 'Asking Price:'],
  [/प्लॉट साइज:/gi, 'Plot Dimensions & Area:'],
  [/उपलब्ध प्लॉट साइज़:/gi, 'Available Plot Sizes:'],
  [/प्लॉट एरिया/gi, 'Plot Area'],
  [/निर्मित क्षेत्र/gi, 'Super Built-Up Area'],
  [/प्रति वर्ग गज/gi, 'Per Sq. Yard (Gaj)'],
  [/वर्ग गज/gi, 'Sq. Yards (Gaj)'],
  [/गज/gi, 'Sq. Yd. (Gaj)'],
  [/करोड़/gi, 'Crore'],
  [/लाख/gi, 'Lakh'],
  [/बुकिंग एवं आसान किस्तों की सुविधा/gi, 'Easy Booking & Flexible Installment Facility Available'],
  [/ऑन-टेबल नेगोशिएशन|हल्की बातचीत संभव/gi, 'On-Table Slight Negotiation for Genuine Buyers'],
  [/लगभग/gi, 'Approx.'],

  // Layout & Amenities
  [/मुख्य विशेषताएं एवं आधुनिक सुविधाएं:/gi, 'Key Highlights & Modern Luxury Amenities:'],
  [/मुख्य विशेषताएं:/gi, 'Key Project Highlights:'],
  [/प्राइम लोकेशन एवं बेहतरीन कनेक्टिविटी:/gi, 'Prime Location & Strategic Connectivity:'],
  [/मॉडर्न मॉड्यूलर किचन/gi, 'Modern Modular Kitchen'],
  [/मॉड्यूलर किचन/gi, 'Modular Kitchen'],
  [/ड्राइंग रूम/gi, 'Drawing & Living Hall'],
  [/बड़े बेडरूम/gi, 'Master Bedrooms'],
  [/बेडरूम/gi, 'Bedrooms'],
  [/और 4 बाथरूम/gi, 'and 4 Bathrooms'],
  [/और 3 बाथरूम/gi, 'and 3 Bathrooms'],
  [/और 2 बाथरूम/gi, 'and 2 Bathrooms'],
  [/बाथरूम/gi, 'Bathrooms'],
  [/बालकनी पर स्टेनलेस स्टील \(SS\) व फ्रॉस्टेड फ्लोरल टफन्ड ग्लास रेलिंग/gi, 'Balconies Fitted with Stainless Steel (SS) & Frosted Floral Toughened Glass Railings'],
  [/टफन्ड ग्लास रेलिंग/gi, 'Toughened Glass Railings'],
  [/डबल-हाइट वर्टिकल ग्लास फसाड से दिनभर प्राकृतिक धूप और शानदार वेंटिलेशन/gi, 'Double-Height Vertical Glass Façade for Abundant Daylight & Cross Ventilation'],
  [/ग्राउंड फ्लोर पर कवर्ड कार पार्किंग पोर्च, ब्लैक ग्रेनाइट प्लिंथ व आकर्षक टाइल रैंप/gi, 'Covered Car Parking Porch on Ground Floor with Black Granite Plinth & Designer Tile Ramp'],
  [/कवर्ड कार पार्किंग पोर्च/gi, 'Covered Car Parking Porch'],
  [/आधुनिक रात का एलिवेशन: वॉर्म एलईडी स्पॉटलाइट्स, आरजीबी टॉप परगोला लाइट्स और प्रीमियम वुडन टेक्सचर फिनिश/gi, 'Contemporary Night Elevation: Warm LED Spotlights, RGB Rooftop Pergola Lights & Premium Wooden Texture Finish'],
  [/शानदार वेंटिलेशन/gi, 'Excellent Cross Ventilation'],
  [/प्राकृतिक धूप/gi, 'Natural Daylight'],

  // Infrastructure & Community
  [/अंडरग्राउंड सीवरेज/gi, 'Underground Sewerage System'],
  [/रेन वाटर हार्वेस्टिंग/gi, 'Rain Water Harvesting (RWH)'],
  [/सीवेज ट्रीटमेंट प्लांट/gi, 'Sewage Treatment Plant (STP)'],
  [/ओवरहेड पानी की टंकी/gi, 'Overhead Water Reservoir Tank'],
  [/स्ट्रीट लाइट्स/gi, '24x7 LED Street Lighting'],
  [/थीम-बेस्ड हरे-भरे पार्क एवं चिल्ड्रन प्ले एरिया/gi, 'Themed Landscaped Green Parks & Children Play Zone'],
  [/हरे-भरे पार्क/gi, 'Lush Green Landscaped Parks'],
  [/कमर्शियल मार्केट एरिया एवं दैनिक उपयोगी दुकानें/gi, 'Commercial Market Plaza & Daily Convenience Stores'],
  [/मजबूत बाउंड्री वॉल/gi, 'Robust Boundary Wall with Security Gates'],
  [/भव्य स्वागत द्वार एवं सेंट्रल डिवाइडर रोड/gi, 'Grand Entrance Boulevard Gate with Central Divider Road'],
  [/भव्य स्वागत द्वार/gi, 'Grand Entrance Gate'],

  // Distance & Proximity
  [/स्कूल, अस्पताल, और मार्केट बिल्कुल पास/gi, 'Schools, Multi-Speciality Hospitals & Markets in Immediate Vicinity'],
  [/मात्र 5 मिनट की दूरी पर/gi, 'Just 5 Minutes Away from'],
  [/10 से 15 मिनट की दूरी पर/gi, '10 to 15 Minutes Away from'],
  [/सीधे गढ़ रोड हाईवे और रिंग रोड से सटा हुआ/gi, 'Directly Adjoining Garh Road Highway & Upcoming Ring Road'],
  [/से आसान कनेक्टिविटी/gi, 'Direct Rapid Highway Connectivity'],
  [/कंकरखेड़ा व NH-58 बाईपास के पास/gi, 'Near Kanker Khera & NH-58 Bypass'],

  // Contacts
  [/ऑफिशियल कंसल्टेंट \/ सेलर:/gi, 'Official Channel Partner / Consultant:'],
  [/अधिक जानकारी, साइट विजिट एवं डायरेक्ट बुकिंग के लिए संपर्क करें:/gi, 'For Site Inspection, Floor Plans & Direct Booking, Contact:'],
  [/डायरेक्ट कॉल एवं व्हाट्सएप:/gi, 'Direct Call & WhatsApp:']
];

const EN_TO_HI_REPLACEMENTS: [RegExp, string][] = [
  // Titles & Categories
  [/Exclusive Corner Residential Plot for Sale/gi, 'एक्सक्लूसिव कॉर्नर रेजिडेंशियल प्लॉट बिक्री के लिए उपलब्ध'],
  [/Corner Residential Plot/gi, 'कॉर्नर रेजिडेंशियल प्लॉट (दो तरफ रोड)'],
  [/Residential Plot/gi, 'आवासीय प्लॉट'],
  [/Available for Sale|Available for Immediate Sale/gi, 'बिक्री के लिए उपलब्ध'],
  [/Newly Constructed/gi, 'नया निर्मित'],
  [/Brand New/gi, 'बिल्कुल नया'],
  [/Triple Storey/gi, 'तीन मंजिला (ट्रिपल स्टोरी)'],
  [/Double Storey/gi, 'दो मंजिला (डबल स्टोरी)'],
  [/Independent House|Luxury House|Villa/gi, 'आलीशान स्वतंत्र मकान / कोठी'],
  
  // Specs
  [/Sq\.?\s*Yards?|Sq\.?\s*Yds?/gi, 'वर्ग गज'],
  [/Sq\.?\s*Ft\.?/gi, 'वर्ग फीट'],
  [/East Facing/gi, 'पूर्व मुखी (वास्तु-सम्मत)'],
  [/North Facing/gi, 'उत्तर मुखी (शुभ दिशा)'],
  [/100%\s*Vastu Compliant|Vastu Compliant/gi, '100% वास्तु-सम्मत'],
  [/Clear Title/gi, 'क्लियर रजिस्ट्री टाइटल'],
  [/Immediate Possession/gi, 'तत्काल कब्जा'],
  [/Bank Home Loan/gi, 'बैंक होम लोन'],
  [/Gated Society|Gated Community|Gated Township/gi, 'सुरक्षित गेटेड कॉलोनी / टाउनशिप'],
  [/Prime Location/gi, 'प्राइम लोकेशन'],
  [/Demand Price|Demand Rate|Asking Price/gi, 'मांग / कीमत'],
  [/Key Highlights/gi, 'मुख्य विशेषताएं'],
  [/Amenities/gi, 'सुविधाएं'],
  [/Modular Kitchen/gi, 'मॉडर्न मॉड्यूलर किचन'],
  [/Covered Car Parking/gi, 'कवर्ड कार पार्किंग'],
  [/Direct Call & WhatsApp/gi, 'डायरेक्ट कॉल एवं व्हाट्सएप']
];

export function translatePropertyDescription(originalText: string, targetLang: LanguageCode): string {
  if (!originalText || !originalText.trim()) return '';

  const currentlyDevanagari = isDevanagari(originalText);

  // If already in target language, return as is
  if (targetLang === 'hi' && currentlyDevanagari) return originalText;
  if (targetLang === 'en' && !currentlyDevanagari) return originalText;

  let translated = originalText;

  if (targetLang === 'en') {
    // Translate Hindi / Hinglish -> Professional Institutional English
    for (const [pattern, replacement] of HI_TO_EN_REPLACEMENTS) {
      translated = translated.replace(pattern, replacement);
    }
  } else {
    // Translate English -> Authentic Hindi Real Estate
    for (const [pattern, replacement] of EN_TO_HI_REPLACEMENTS) {
      translated = translated.replace(pattern, replacement);
    }
  }

  return translated;
}
