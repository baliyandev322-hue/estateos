import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_CONTACT } from '@/config/siteContact';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';

export const metadata: Metadata = {
  title: 'EstateOS — India’s Sovereign PropTech Marketplace & AI Platform',
  description: 'EstateOS combines verified residential & commercial property search with Property Truth Score™, Locality Micro-Intelligence, AI Matchmaker, and Multi-Tenant SaaS for Agents and Builders.',
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
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="google1eb03a8e9cf486b5" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'EstateOS Technologies',
              url: 'https://www.estateospro.in',
              logo: 'https://www.estateospro.in/logo.svg',
              description: 'India Sovereign RERA-Audited PropTech Marketplace with Property Truth Score™',
              address: {
                '@type': 'PostalAddress',
                streetAddress: `${SITE_CONTACT.address.line1}, ${SITE_CONTACT.address.line2}`,
                addressLocality: SITE_CONTACT.address.city,
                addressRegion: SITE_CONTACT.address.state,
                postalCode: SITE_CONTACT.address.pincode,
                addressCountry: 'IN',
              },
              telephone: SITE_CONTACT.tollFree,
              priceRange: '₹₹₹₹',
            }),
          }}
        />
        {/* Google AdSense Official Verification & Ad Delivery Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8670788447807706"
          crossOrigin="anonymous"
        />
        {/* Google Analytics 4 (GA4) Live Visitor Tracking Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-22LXLTRMVV"
        />
        <script
          id="google-analytics-init"
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
