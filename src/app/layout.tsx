import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EstateOS — India’s Sovereign PropTech Marketplace & AI Platform',
  description: 'EstateOS combines verified residential & commercial property search with Property Truth Score™, Locality Micro-Intelligence, AI Matchmaker, and Multi-Tenant SaaS for Agents and Builders.',
  keywords: 'real estate, buy property, rent luxury apartment, mohali, gurugram, bangalore, rera verified, property truth score, locality intelligence, home loan emi calculator, real estate crm',
  authors: [{ name: 'EstateOS Team' }],
  metadataBase: new URL('https://estateos.in'),
  openGraph: {
    title: 'EstateOS — Sovereign Real Estate Intelligence',
    description: 'RERA-audited marketplace, AI-powered matchmaker, and enterprise agent CRM.',
    url: 'https://estateos.in',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-charcoal-900 selection:bg-gold-200 selection:text-forest-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
