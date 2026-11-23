import type { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import { SITE_CONTACT } from '@/config/siteContact';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import NavigationProgressBar from '@/components/NavigationProgressBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'EstateOS — Verified Real Estate, RERA Plots & PropTech AI',
  description: 'Discover RERA-audited properties, calculate home loans & stamp duty, or match ideal homes with AI on India\'s verified proptech marketplace.',
  keywords: 'real estate, buy property, rent luxury apartment, mohali, gurugram, bangalore, rera verified, property truth score, locality intelligence, home loan emi calculator, real estate crm',
  authors: [{ name: 'EstateOS Team' }],
  metadataBase: new URL('https://www.estateospro.in'),
  alternates: {
    canonical: 'https://www.estateospro.in',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google1eb03a8e9cf486b5',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'EstateOS — Sovereign Real Estate Intelligence',
    description: 'RERA-audited marketplace, AI-powered matchmaker, and enterprise agent CRM.',
    url: 'https://www.estateospro.in',
    siteName: 'EstateOS',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'EstateOS Luxury Marketplace',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EstateOS — Sovereign Real Estate Intelligence',
    description: 'RERA-audited marketplace, AI-powered matchmaker, and enterprise agent CRM.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="google-site-verification" content="google1eb03a8e9cf486b5" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.estateospro.in/#organization',
                  name: 'EstateOS Technologies',
                  alternateName: ['EstateOS', 'EstateOSPro', 'EstateOS PropTech'],
                  url: 'https://www.estateospro.in',
                  logo: {
                    '@type': 'ImageObject',
                    '@id': 'https://www.estateospro.in/#logo',
                    url: 'https://www.estateospro.in/icon.svg',
                    caption: 'EstateOS PropTech Intelligence',
                  },
                  description:
                    'India Sovereign RERA-Audited PropTech Marketplace, algorithmic Property Truth Score™ valuation platform, and broker-builder CRM.',
                  sameAs: [
                    'https://www.wikidata.org/entity/Q1159',
                    'https://www.wikidata.org/entity/Q7279768',
                  ],
                  knowsAbout: [
                    'Real Estate (Regulation and Development) Act, 2016 (RERA)',
                    'Indian Real Estate Valuation & Circle Rates',
                    'Uttar Pradesh Real Estate Regulatory Authority (UP-RERA)',
                    'Haryana Real Estate Regulatory Authority (HRERA)',
                    'Delhi Real Estate Regulatory Authority',
                    'Stamp Duty & Mutation (Dakhil Kharij) Legal Verification',
                    'Property Truth Score™ Algorithmic Audits',
                  ],
                  areaServed: [
                    {
                      '@type': 'Country',
                      name: 'India',
                      sameAs: 'https://www.wikidata.org/entity/Q668',
                    },
                    {
                      '@type': 'AdministrativeArea',
                      name: 'Uttar Pradesh',
                      sameAs: 'https://www.wikidata.org/entity/Q1498',
                    },
                    {
                      '@type': 'City',
                      name: 'Meerut',
                      sameAs: 'https://www.wikidata.org/entity/Q200720',
                    },
                    {
                      '@type': 'City',
                      name: 'Muzaffarnagar',
                      sameAs: 'https://www.wikidata.org/entity/Q1981384',
                    },
                    {
                      '@type': 'AdministrativeArea',
                      name: 'Delhi National Capital Region (NCR)',
                      sameAs: 'https://www.wikidata.org/entity/Q1192770',
                    },
                  ],
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: `${SITE_CONTACT.address.line1}, ${SITE_CONTACT.address.line2}`,
                    addressLocality: SITE_CONTACT.address.city,
                    addressRegion: SITE_CONTACT.address.state,
                    postalCode: SITE_CONTACT.address.pincode,
                    addressCountry: 'IN',
                  },
                  telephone: SITE_CONTACT.tollFree,
                  email: SITE_CONTACT.supportEmail,
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: SITE_CONTACT.tollFree,
                    contactType: 'customer support',
                    areaServed: 'IN',
                    availableLanguage: ['en', 'hi'],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.estateospro.in/#website',
                  url: 'https://www.estateospro.in',
                  name: 'EstateOS',
                  publisher: { '@id': 'https://www.estateospro.in/#organization' },
                  inLanguage: ['en-IN', 'hi-IN'],
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://www.estateospro.in/properties?query={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'DefinedTermSet',
                  '@id': 'https://www.estateospro.in/#indian-proptech-glossary',
                  name: 'EstateOS Indian Real Estate Lexicon & Valuation Standards',
                  hasDefinedTerm: [
                    {
                      '@type': 'DefinedTerm',
                      name: 'Gaj (गज)',
                      termCode: 'GAJ-IN',
                      description:
                        'A foundational Indian unit of land measurement extensively used in Uttar Pradesh, Delhi NCR, Haryana, and Punjab. Exactly 1 Gaj equals 1 Square Yard (9 Square Feet or 0.8361 Square Meters).',
                      sameAs: 'https://en.wikipedia.org/wiki/Guz',
                    },
                    {
                      '@type': 'DefinedTerm',
                      name: 'Dakhil Kharij (दाखिल खारिज)',
                      termCode: 'MUTATION-IN',
                      description:
                        'The legal land mutation process in North India whereby property ownership title is officially transferred in the municipal or revenue records (Khatoni/Jamabandi) post-registry.',
                      sameAs: 'https://en.wikipedia.org/wiki/Mutation_(land_records)',
                    },
                    {
                      '@type': 'DefinedTerm',
                      name: 'Property Truth Score™',
                      termCode: 'PTS-100',
                      description:
                        "EstateOS's 0-100 algorithmic proptech rating evaluating property legitimacy across RERA approvals, circle rate parity, bank loan eligibility, and title deed encumbrance status.",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {/* Google AdSense Official Script strictly placed inside <head> for 100% crawler verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8670788447807706"
          crossOrigin="anonymous"
        />
        {/* Google Analytics 4 (GA4) */}
        <Script
          id="google-analytics-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-22LXLTRMVV"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-22LXLTRMVV', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-charcoal-900 selection:bg-gold-200 selection:text-forest-950">
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsentBanner />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
