/**
 * EstateOS Domain-Specific Real Estate Bilingual Translation Engine
 * Specially calibrated for Indian PropTech vocabulary (Gaj, Vastu, Registry,
 * Kothi, Storey, Paved Roads, MDA/Zila Panchayat approvals).
 */

export type LanguageCode = 'hi' | 'en';

export function isDevanagari(text: string): boolean {
  if (!text) return false;
  const matches = text.match(/[\u0900-\u097F]/g);
  return !!(matches && matches.length > 15);
}

// Master vocabulary mapping for Indian Real Estate
const RAW_HI_TO_EN: [RegExp, string][] = [
  // Full Headline & Township Patterns
  [/गंगासागर कॉलोनी \(गंगानगर, मेरठ\)/gi, 'Ganga Sagar Colony (Ganganagar, Meerut)'],
  [/दीवान चंद एन्क्लेव, सरधना रोड, मेरठ/gi, 'Deewan Chand Enclave, Sardhana Road, Meerut'],
  [/दीवान चंद एन्क्लेव/gi, 'Deewan Chand Enclave'],
  [/सरधना रोड \(कंकरखेड़ा व NH-58 बाईपास के पास\), मेरठ/gi, 'Sardhana Road (Near Kanker Khera & NH-58 Bypass), Meerut'],
  [/सरधना रोड/gi, 'Sardhana Road'],
  [/कंकरखेड़ा व NH-58 बाईपास के पास/gi, 'Near Kanker Khera & NH-58 Bypass'],
  [/कंकरखेड़ा/gi, 'Kanker Khera'],
  [/वासु रेजीडेंसी \((?:VASU RESIDENCY|Vasu Residency)\) — गढ़ रोड, मेरठ \| जिला पंचायत से स्वीकृत/gi, 'VASU RESIDENCY — Garh Road, Meerut | Zila Panchayat Approved Township'],
  [/वासु रेजीडेंसी \((?:VASU RESIDENCY|Vasu Residency)\) — गढ़ रोड, मेरठ/gi, 'VASU RESIDENCY — Garh Road, Meerut'],
  [/वासु रेजीडेंसी/gi, 'Vasu Residency'],
  [/अलकनंदा धाम, मेरठ/gi, 'Alaknanda Dham, Meerut'],
  [/अलकनंदा धाम/gi, 'Alaknanda Dham'],
  [/श्याम रेजीडेंसी/gi, 'Shyam Residency'],
  [/मेरठ के सबसे पॉश और प्राइम रिहायशी इलाके गंगानगर में सीधे मेन डिवाइडर रोड पर स्थित ब्रांड न्यू 2 मंजिला लक्ज़री कोठी!?/gi, 'Brand new 2-storey luxury independent villa/kothi situated directly on the main divider road in Meerut\'s most prime and posh residential hub, Ganganagar!'],
  [/मेरठ के सबसे तेजी से विकसित हो रहे गढ़ रोड कॉरिडोर पर अपना सुनहरा आशियाना बनाने का शानदार अवसर!?/gi, 'A golden opportunity to build your dream home on Meerut\'s fastest growing Garh Road Corridor!'],

  // Complete Feature Paragraphs & Lines
  [/दो मंजिला पक्का निर्माण, आधुनिक वाइट एलीवेशन, ग्रूवड टेक्सचर और स्टाइलिश गेट/gi, 'Robust double storey solid construction, modern white elevation, grooved texture and designer entrance gate'],
  [/2 मंजिला पक्का निर्माण, आधुनिक वाइट एलीवेशन, ग्रूवड टेक्सचर और स्टाइलिश गेट/gi, 'Robust 2-storey solid construction, modern white elevation, grooved texture and designer entrance gate'],
  [/मेन डिवाइडर रोड पर प्राइम फ्रंट होने के कारण खुला व हवादार वातावरण/gi, 'Prime frontage on Main Divider Road ensuring an open, bright and well-ventilated ambiance'],
  [/3 बड़े बेडरूम, स्पेशियस लिविंग हॉल, मॉडर्न किचन और वेंटिलेटेड बाथरूम्स/gi, '3 Master Bedrooms, Spacious Living & Drawing Hall, Modern Kitchen and Ventilated Bathrooms'],
  [/बड़ी ओपन छत \(Rooftop Terrace\) जहां से कॉलोनी का खूबसूरत व्यू दिखता है/gi, 'Expansive Open Rooftop Terrace offering panoramic views of the green gated colony'],
  [/गंगानगर, मवाना रोड, गढ़ रोड और दिल्ली-मेरठ एक्सप्रेसवे से चंद मिनटों की कनेक्टिविटी/gi, 'Rapid connectivity to Ganganagar, Mawana Road, Garh Road & Delhi-Meerut Expressway'],
  [/तुरंत रजिस्ट्री, दाखिल खारिज एवं सभी प्रमुख सरकारी\/प्राइवेट बैंकों से होम लोन सुविधा/gi, 'Immediate Registry, Dakhil Kharij (Property Mutation) & Home Loan Facility from all Leading PSU & Private Banks'],
  [/100% क्लियर रजिस्ट्री टाइटल व सभी प्रमुख सरकारी\/प्राइवेट बैंकों से होम लोन सुविधा उपलब्ध।?/gi, '100% Clear Title Registry & Immediate Possession with Home Loan Facility from Leading PSU & Private Banks.'],
  [/3 मंजिलों में बना विशाल लग्जरी लेआउट \(4-5 बड़े बेडरूम, ड्राइंग रूम, मॉडर्न मॉड्यूलर किचन, और 4 बाथरूम\)/gi, 'Spacious 3-Storey Luxury Architectural Layout (4-5 Master Bedrooms, Drawing Room, Modern Modular Kitchen, and 4 Bathrooms)'],
  [/आधुनिक रात का एलिवेशन: वॉर्म एलईडी स्पॉटलाइट्स, आरजीबी टॉप परगोला लाइट्स और प्रीमियम वुडन टेक्सचर फिनिश/gi, 'Contemporary Night Elevation: Warm LED Spotlights, RGB Rooftop Pergola Lights & Premium Wooden Texture Finish'],
  [/बालकनी पर स्टेनलेस स्टील \(SS\) व फ्रॉस्टेड फ्लोरल टफन्ड ग्लास रेलिंग/gi, 'Balconies Fitted with Stainless Steel (SS) & Frosted Floral Toughened Glass Railings'],
  [/डबल-हाइट वर्टिकल ग्लास फसाड से दिनभर प्राकृतिक धूप और शानदार वेंटिलेशन/gi, 'Double-Height Vertical Glass Façade for Abundant Natural Daylight & Cross Ventilation'],
  [/ग्राउंड फ्लोर पर कवर्ड कार पार्किंग पोर्च, ब्लैक ग्रेनाइट प्लिंथ व आकर्षक टाइल रैंप/gi, 'Covered Car Parking Porch on Ground Floor with Black Granite Plinth & Designer Tile Ramp'],
  [/शांतिपूर्ण और सुरक्षित गेटेड रेजीडेंशियल कॉलोनी — स्कूल, अस्पताल, और मार्केट बिल्कुल पास/gi, 'Peaceful and Secure Gated Residential Society — Schools, Hospitals & Markets in Immediate Vicinity'],
  [/167 बीघा की विशाल व भव्य गेटेड प्रीमियम आवासीय टाउनशिप/gi, '167 Bigha Expansive & Grand Gated Premium Residential Township'],
  [/मेन गढ़ रोड से 80 फीट चौड़ा भव्य स्वागत द्वार एवं सेंट्रल डिवाइडर रोड/gi, 'Grand 80 Feet Wide Entrance Boulevard Gate with Central Divider Road from Main Garh Road'],
  [/कॉलोनी के अंदर 80, 70, 60, 40, 30 और 25 फीट चौड़ी इंटरलॉकिंग पक्की सड़कें/gi, '80, 70, 60, 40, 30 and 25 Feet Wide Concrete Interlocking Paved Roads inside Colony'],
  [/4 बड़े थीम-बेस्ड हरे-भरे पार्क एवं चिल्ड्रन प्ले एरिया/gi, '4 Large Themed Landscaped Green Parks & Dedicated Children Play Zone'],
  [/मजबूत बाउंड्री वॉल, अंडरग्राउंड सीवरेज, ओवरहेड पानी की टंकी, एलईडी स्ट्रीट लाइट्स/gi, 'Robust Boundary Wall, Underground Sewerage, Overhead Water Reservoir Tank, 24x7 LED Street Lights'],
  [/आधुनिक STP \(सीवेज ट्रीटमेंट प्लांट\) एवं RWH \(रेन वाटर हार्वेस्टिंग\) सिस्टम/gi, 'Modern STP (Sewage Treatment Plant) & RWH (Rain Water Harvesting) Eco-Infrastructure'],
  [/सोसाइटी के अंदर ही कमर्शियल मार्केट एरिया एवं दैनिक उपयोगी दुकानें/gi, 'Dedicated Commercial Shopping Plaza & Daily Convenience Stores Inside Society'],
  [/सीधे गढ़ रोड हाईवे और रिंग रोड से सटा हुआ/gi, 'Directly Adjoining Main Garh Road Highway & Upcoming Ring Road'],
  [/NH-58 \(दिल्ली-रुड़की-हरिद्वार\), मवाना-बिजनौर हाईवे और NH-34 \(हापुड़ रोड\) से आसान कनेक्टिविटी/gi, 'Direct Rapid Highway Connectivity to NH-58, Mawana-Bijnor Highway & NH-34 (Hapur Road)'],
  [/मात्र 5 मिनट की दूरी पर स्कूल, कॉलेज, मल्टी-स्पेशियलिटी अस्पताल, पेट्रोल पंप और मुख्य बाजार/gi, 'Just 5 Minutes Away from Schools, Colleges, Multi-Speciality Hospitals, Fuel Stations & Main Commercial Markets'],
  [/10 से 15 मिनट की दूरी पर तेजगढ़ी चौराहा, मेरठ मेडिकल कॉलेज, जागृति विहार और शास्त्री नगर/gi, '10 to 15 Minutes Away from Tejgarhi Crossing, Meerut Medical College, Jagriti Vihar & Shastri Nagar'],
  [/बैंक लोन की सुविधा सभी प्रमुख बैंकों से उपलब्ध।?/gi, 'Home Loan Facility Available from all Leading Nationalized & Private Banks.'],

  // Approvals & Legal
  [/🏛️ अप्रूवल: जिला पंचायत मेरठ से विधिवत स्वीकृत \(Zila Panchayat Approved\)/gi, '🏛️ Statutory Approval: Duly Approved by Zila Panchayat Meerut (Zila Panchayat Approved)'],
  [/जिला पंचायत से विधिवत स्वीकृत \((?:Zila Panchayat Approved|जिला पंचायत स्वीकृत)\)/gi, 'Duly Approved by Zila Panchayat (Zila Panchayat Approved)'],
  [/जिला पंचायत से स्वीकृत/gi, 'Zila Panchayat Approved Project'],
  [/जिला पंचायत मेरठ से विधिवत स्वीकृत/gi, 'Duly Approved by Zila Panchayat Meerut'],
  [/एमडीए से स्वीकृत|MDA स्वीकृत|MDA से स्वीकृत/gi, 'MDA (Meerut Development Authority) Approved'],
  [/तुरंत रजिस्ट्री, दाखिल खारिज/gi, 'Immediate Registry, Dakhil Kharij (Property Mutation)'],
  [/दाखिल खारिज/gi, 'Dakhil Kharij (Mutation)'],
  [/तुरंत रजिस्ट्री/gi, 'Immediate Registry'],
  [/रेडी रजिस्ट्री और तत्काल कब्जा|तत्काल कब्जा एवं रजिस्ट्री/gi, 'Ready for Registry & Immediate Possession'],
  [/तत्काल कब्जा/gi, 'Immediate Possession'],

  // Section Headers
  [/📍 स्थान:|📍 प्राइम लोकेशन:/gi, '📍 Prime Location:'],
  [/📐 उपलब्ध प्लॉट साइज़:|📐 उपलब्ध प्लॉट साइज:|📐 प्लॉट साइज़:|📐 प्लॉट साइज:/gi, '📐 Plot Size / Dimensions:'],
  [/🏠 बनावट:/gi, '🏠 Configuration:'],
  [/🧭 फेसिंग:|🧭 दिशा:/gi, '🧭 Facing / Orientation:'],
  [/🛣️ रोड:|🛣️ सड़क:/gi, '🛣️ Road Width & Access:'],
  [/💰 डिमांड कीमत:|💰 डिमांड रेट:|💰 डिमांड:/gi, '💰 Demand Price:'],
  [/🌟 वासु रेजीडेंसी प्रोजेक्ट की मुख्य विशेषताएं:|✨ मुख्य विशेषताएं एवं आधुनिक सुविधाएं:|मुख्य विशेषताएं:/gi, 'Key Highlights & Modern Amenities:'],
  [/🚗 प्राइम लोकेशन एवं बेहतरीन कनेक्टिविटी:|प्राइम लोकेशन एवं बेहतरीन कनेक्टिविटी:/gi, 'Prime Location & Strategic Connectivity:'],
  [/ऑफिशियल बिल्डर \/ चैनल पार्टनर:|ऑफिशियल कंसल्टेंट \/ सेलर:/gi, 'Official Channel Partner / Builder:'],
  [/अधिक जानकारी, साइट विजिट एवं डायरेक्ट बुकिंग के लिए संपर्क करें:/gi, 'For Site Inspection, Floor Plans & Direct Booking, Contact:'],
  [/📲 डायरेक्ट कॉल एवं व्हाट्सएप:|📞 डायरेक्ट कॉल एवं व्हाट्सएप:|डायरेक्ट कॉल एवं व्हाट्सएप:|डायरेक्ट कॉल व व्हाट्सएप:/gi, 'Direct Call & WhatsApp:'],

  // Compound Values
  [/80 गज 3BHK दो मंजिला शानदार कोठी बिक्री के लिए/gi, '80 Sq. Yds. (Gaj) 3BHK Double Storey Luxury Kothi / Villa for Sale'],
  [/125 गज में बना तीन मंजिला \((?:Triple Storey|ट्रिपल स्टोरी)\) आलीशान नया मकान बिक्री के लिए उपलब्ध/gi, 'Newly Constructed 125 Sq. Yds. (Gaj) Triple Storey Luxury House / Villa for Sale'],
  [/मेन डिवाइडर रोड, गंगासागर कॉलोनी, गंगानगर, मेरठ \(उत्तर प्रदेश\)/gi, 'Main Divider Road, Ganga Sagar Colony, Ganganagar, Meerut (Uttar Pradesh)'],
  [/मेन गढ़ रोड हाईवे, पास रिंग रोड, मेरठ \(उत्तर प्रदेश\)/gi, 'Main Garh Road Highway, Near Ring Road, Meerut (Uttar Pradesh)'],
  [/720 Sq\.Ft लैंड एरिया \| 1,400 Sq\.Ft सुपर बिल्ट-अप/gi, '720 Sq.Ft Land Area | 1,400 Sq.Ft Super Built-Up Area'],
  [/3 BHK दो मंजिला स्वतंत्र मकान \(Ground Floor \+ First Floor \+ ओपन रूफटॉप टेरेस\)/gi, '3 BHK Double Storey Independent Villa (Ground Floor + First Floor + Open Rooftop Terrace)'],
  [/ईस्ट फेसिंग \(पूर्व मुखी\) वास्तु सम्मत|ईस्ट फेसिंग \(East Facing — सबसे शुभ एवं वास्तु-सम्मत\)/gi, 'East Facing (Most Auspicious & 100% Vastu Compliant)'],
  [/पूर्व मुखी \(East Facing — सबसे शुभ एवं वास्तु-सम्मत\)/gi, 'East Facing (Most Auspicious & 100% Vastu Compliant)'],
  [/चौड़ी पक्की डिवाइडर रोड, पेड़-पौधों से हरा-भरा वातावरण/gi, 'Wide Paved Concrete Divider Road with Green Tree Plantation Environment'],
  [/30 फीट चौड़ी पक्की सड़क, गेटेड कॉलोनी के अंदर सुरक्षित वातावरण/gi, '30 Feet Wide Concrete Paved Road in a Secure Gated Society'],
  [/₹1 करोड़ 20 लाख \(₹1\.20 Cr Demand\)/gi, '₹1 Crore 20 Lakh (₹1.20 Cr Demand)'],
  [/₹95,00,000\/- \(₹95 लाख\)/gi, '₹95,00,000/- (₹95 Lakh)'],
  [/₹19,000\/- से ₹25,000\/- प्रति वर्ग गज \(बुकिंग एवं आसान किस्तों की सुविधा\)/gi, '₹19,000/- to ₹25,000/- Per Sq. Yard (Easy Booking & Installment Facility Available)'],
  [/₹19,000\/- से ₹25,000\/- प्रति वर्ग गज/gi, '₹19,000/- to ₹25,000/- Per Sq. Yard (Gaj)'],
  [/बंटी सैनी \(Bunty Saini\)/gi, 'Bunty Saini'],
  [/बंटी सैनी/gi, 'Bunty Saini'],
  [/रवि पोसवाल \(Vasu Residency & SAS Realty\)/gi, 'Ravi Poswal (Vasu Residency & SAS Realty)'],
  [/रवि पोसवाल/gi, 'Ravi Poswal'],
  [/~1,125 Sq\. Ft\. प्लॉट एरिया, लगभग 3,100 Sq\. Ft\. ट्रिपल स्टोरी निर्मित क्षेत्र/gi, '~1,125 Sq. Ft. Plot Area, Approx. 3,100 Sq. Ft. Triple Storey Built-Up Area'],
  [/100, 132, 135, 150, 180 वर्ग गज से लेकर 260 वर्ग गज तक/gi, '100, 132, 135, 150, 180 Sq. Yards up to 260 Sq. Yards (Gaj)'],

  // Sub-phrases & Common Terms
  [/शानदार कोठी बिक्री के लिए|शानदार कोठी/gi, 'Luxury Kothi / Villa'],
  [/स्वतंत्र मकान/gi, 'Independent Villa / House'],
  [/लक्ज़री कोठी|लक्जरी कोठी/gi, 'Luxury Villa'],
  [/पक्का निर्माण/gi, 'Solid Construction'],
  [/आधुनिक वाइट एलीवेशन|आधुनिक वाइट एलिवेशन/gi, 'Modern White Elevation'],
  [/ग्रूवड टेक्सचर/gi, 'Grooved Texture Finish'],
  [/स्टाइलिश गेट/gi, 'Designer Entrance Gate'],
  [/बड़ी ओपन छत/gi, 'Expansive Open Rooftop Terrace'],
  [/ओपन रूफटॉप टेरेस/gi, 'Open Rooftop Terrace'],
  [/लैंड एरिया/gi, 'Land Area'],
  [/सुपर बिल्ट-अप/gi, 'Super Built-Up Area'],
  [/पूर्व मुखी/gi, 'East Facing (Vastu Compliant)'],
  [/उत्तर मुखी/gi, 'North Facing (Auspicious)'],
  [/वास्तु सम्मत|वास्तु-सम्मत/gi, '100% Vastu Compliant'],
  [/ईस्ट फेसिंग/gi, 'East Facing'],
  [/चौड़ी पक्की सड़क|चौड़ी पक्की डिवाइडर रोड/gi, 'Wide Concrete Paved Road'],
  [/दो मंजिला/gi, 'Double Storey (2 Floors)'],
  [/तीन मंजिला/gi, 'Triple Storey (3 Floors)'],
  [/2 मंजिला/gi, '2-Storey'],
  [/3 मंजिला/gi, '3-Storey'],
  [/मेन डिवाइडर रोड/gi, 'Main Divider Road'],
  [/गंगासागर कॉलोनी/gi, 'Ganga Sagar Colony'],
  [/गंगानगर, मेरठ/gi, 'Ganganagar, Meerut'],
  [/गंगानगर/gi, 'Ganganagar'],
  [/उत्तर प्रदेश/gi, 'Uttar Pradesh'],
  [/मेरठ/gi, 'Meerut'],
  [/बिक्री के लिए उपलब्ध|बिक्री के लिए/gi, 'Available for Immediate Sale'],
  [/लाख/gi, 'Lakh'],
  [/करोड़/gi, 'Crore'],
  [/वर्ग गज/gi, 'Sq. Yards (Gaj)'],
  [/गज/gi, 'Sq. Yds. (Gaj)'],
  [/बीघा/gi, 'Bigha']
];

// Sort DICT by regex source length descending so that full lines always match before fragments!
export const HI_TO_EN_REPLACEMENTS = RAW_HI_TO_EN.sort((a, b) => b[0].source.length - a[0].source.length);

const RAW_EN_TO_HI: [RegExp, string][] = [
  [/Exclusive Corner Residential Plot for Sale/gi, 'एक्सक्लूसिव कॉर्नर रेजिडेंशियल प्लॉट बिक्री के लिए उपलब्ध'],
  [/Corner Residential Plot/gi, 'कॉर्नर रेजिडेंशियल प्लॉट (दो तरफ रोड)'],
  [/Residential Plot/gi, 'आवासीय प्लॉट'],
  [/Available for Sale|Available for Immediate Sale/gi, 'बिक्री के लिए उपलब्ध'],
  [/Newly Constructed/gi, 'नया निर्मित'],
  [/Brand New/gi, 'बिल्कुल नया'],
  [/Triple Storey/gi, 'तीन मंजिला (ट्रिपल स्टोरी)'],
  [/Double Storey/gi, 'दो मंजिला (डबल स्टोरी)'],
  [/Independent House|Luxury House|Villa/gi, 'आलीशान स्वतंत्र मकान / कोठी'],
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

export const EN_TO_HI_REPLACEMENTS = RAW_EN_TO_HI.sort((a, b) => b[0].source.length - a[0].source.length);

export function translatePropertyDescription(originalText: string, targetLang: LanguageCode): string {
  if (!originalText || !originalText.trim()) return '';

  const currentlyDevanagari = isDevanagari(originalText);

  // If already in target language, return as is
  if (targetLang === 'hi' && currentlyDevanagari) return originalText;
  if (targetLang === 'en' && !currentlyDevanagari) return originalText;

  let translated = originalText;

  if (targetLang === 'en') {
    for (const [pattern, replacement] of HI_TO_EN_REPLACEMENTS) {
      translated = translated.replace(pattern, replacement);
    }
  } else {
    for (const [pattern, replacement] of EN_TO_HI_REPLACEMENTS) {
      translated = translated.replace(pattern, replacement);
    }
  }

  return translated;
}
