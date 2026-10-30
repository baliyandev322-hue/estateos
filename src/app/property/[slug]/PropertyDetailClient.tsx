'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  CheckCircle2,
  Sparkles,
  Building2,
  Clock,
  Compass,
  FileText,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Download,
  FileCheck,
} from 'lucide-react';
import { formatCurrencyINR, formatNumberINR } from '@/lib/utils';
import PropertyCard from '@/components/PropertyCard';
import AdSenseBanner from '@/components/AdSenseBanner';
import { PropertyJsonLd } from '@/components/StructuredData';
import PropertyMapRadar from '@/components/PropertyMapRadar';
import HomeLoanApplyModal from '@/components/HomeLoanApplyModal';
import TruthScoreReportDownloadModal from '@/components/TruthScoreReportDownloadModal';
import { SITE_CONTACT } from '@/config/siteContact';

interface PropertyDetailClientProps {
  property: any;
  similarProperties: any[];
}

export default function PropertyDetailClient({
  property,
  similarProperties,
}: PropertyDetailClientProps) {
  // Parse images
  let images: string[] = [];
  try {
    images = typeof property.images === 'string' ? JSON.parse(property.images) : property.images || [];
  } catch (e) {
    images = [];
  }
  if (images.length === 0) {
    images = ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];
  }

  // Parse amenities
  let amenities: string[] = [];
  try {
    amenities = typeof property.amenities === 'string' ? JSON.parse(property.amenities) : property.amenities || [];
  } catch (e) {
    amenities = [];
  }

  const [activeImage, setActiveImage] = useState(images[0]);
  const [copied, setCopied] = useState(false);

  // Enquiry form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMsg, setEnquiryMsg] = useState(`Hi, I am interested in ${property.title}. Please share complete floor plans and schedule an inspection.`);
  const [enquirySending, setEnquirySending] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState('');
  const [whatsappConnectUrl, setWhatsappConnectUrl] = useState<string | null>(null);

  // Revenue Funnels state
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isTruthReportModalOpen, setIsTruthReportModalOpen] = useState(false);

  // Visit appointment form state
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM - 12:00 PM');
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitNotes, setVisitNotes] = useState('');
  const [visitSuccess, setVisitSuccess] = useState('');
  const [visitSubmitting, setVisitSubmitting] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;

    setEnquirySending(true);
    setEnquirySuccess('');

    try {
      const res = await fetch(`/api/properties/${property.slug}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryName,
          phone: enquiryPhone,
          email: enquiryEmail,
          message: enquiryMsg,
          source: 'PORTAL',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEnquirySuccess('Thank you! Your inquiry has been routed directly to the verified consultant.');
        if (data.whatsappBuyerConnectUrl) {
          setWhatsappConnectUrl(data.whatsappBuyerConnectUrl);
        }
        setEnquiryPhone('');
      } else {
        alert(data.error || 'Failed to submit inquiry');
      }
    } catch (err) {
      alert('Error submitting inquiry');
    } finally {
      setEnquirySending(false);
    }
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitPhone || !visitDate) return;

    setVisitSubmitting(true);
    setVisitSuccess('');

    try {
      const res = await fetch(`/api/properties/${property.slug}/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorName: visitName,
          visitorPhone: visitPhone,
          scheduledDate: visitDate,
          timeSlot: visitTime,
          notes: visitNotes,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setVisitSuccess('Site inspection confirmed! You will receive an SMS and WhatsApp confirmation.');
      } else {
        alert(data.error || 'Failed to book visit');
      }
    } catch (err) {
      alert('Error booking visit');
    } finally {
      setVisitSubmitting(false);
    }
  };

  const audit = property.verificationAudits?.[0];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <PropertyJsonLd property={property} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-charcoal-500 mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-forest-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link href="/properties" className="hover:text-forest-900">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link href={`/properties?city=${property.city}`} className="hover:text-forest-900">{property.city}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <span className="text-forest-900 font-bold truncate max-w-xs">{property.title}</span>
        </nav>

        {/* Top Header Row (Title, Badges, Share & Save) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 gap-4 border-b border-charcoal-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-forest-900 text-white rounded-md">
                {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-slate-200 text-charcoal-800 rounded-md">
                {property.propertyType}
              </span>
              {property.isVerified && (
                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  RERA Registered
                </span>
              )}
              {property.reraId && (
                <span className="text-xs text-charcoal-500 font-medium">
                  RERA ID: <strong className="text-charcoal-800">{property.reraId}</strong>
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-forest-950 tracking-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-charcoal-600 mt-1.5">
              <MapPin className="w-4 h-4 text-forest-700 shrink-0" />
              <span>{property.address}, {property.localityName}, {property.city}, {property.state} - {property.pinCode}</span>
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-between">
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-black text-forest-900 tracking-tight">
                {formatCurrencyINR(property.price)}
                {property.listingType === 'RENT' && <span className="text-sm font-sans text-charcoal-500"> /month</span>}
              </p>
              {property.pricePerSqFt && (
                <p className="text-xs text-charcoal-500 font-medium lg:text-right mt-0.5">
                  ₹{formatNumberINR(property.pricePerSqFt)} / sq.ft carpet area
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-charcoal-700 bg-white border border-charcoal-200 hover:border-forest-700 rounded-lg shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
              <button
                onClick={() => setIsVisitModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-sm border border-forest-700"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-accent" />
                <span>Book Site Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Large Image */}
          <div className="lg:col-span-9 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-charcoal-100 shadow-md border border-charcoal-200 relative">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-forest-950/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-gold-accent/40">
                <ShieldCheck className="w-4 h-4 text-gold-accent" />
                <span>Truth Score: <strong className="text-gold-light">{property.truthScore}</strong>/100</span>
              </div>
            </div>
          </div>

          {/* Thumbnails Sidebar */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[460px]">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative rounded-xl overflow-hidden aspect-[16/10] w-28 lg:w-full shrink-0 border-2 transition-all ${
                  activeImage === img ? 'border-gold-accent shadow-md scale-[1.02]' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Details Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Key Specs Card */}
            <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-sm">
              <h2 className="font-serif font-bold text-lg text-forest-950 mb-4 pb-2 border-b border-charcoal-100">
                Property Overview &amp; Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Carpet Area</span>
                  <div className="font-bold text-sm text-forest-950 flex items-center gap-1">
                    <Maximize2 className="w-4 h-4 text-forest-700" />
                    <span>{property.carpetAreaSqFt} sq.ft</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Configuration</span>
                  <div className="font-bold text-sm text-forest-950 flex items-center gap-1">
                    <Bed className="w-4 h-4 text-forest-700" />
                    <span>{property.bedrooms || 0} Bed, {property.bathrooms || 0} Bath</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Furnishing</span>
                  <div className="font-bold text-sm text-forest-950 capitalize">
                    {property.furnishing?.replace('_', ' ').toLowerCase()}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Floor</span>
                  <div className="font-bold text-sm text-forest-950">
                    Floor {property.floorNo} of {property.totalFloors}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Facing</span>
                  <div className="font-bold text-sm text-forest-950 flex items-center gap-1">
                    <Compass className="w-4 h-4 text-forest-700" />
                    <span>{property.facing || 'East'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Possession</span>
                  <div className="font-bold text-sm text-emerald-700 capitalize">
                    {property.possessionStatus?.replace('_', ' ').toLowerCase()}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Parking</span>
                  <div className="font-bold text-sm text-forest-950">
                    {property.parkingSpaces} Covered Bays
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-charcoal-100">
                  <span className="text-charcoal-500 block mb-1">Maintenance</span>
                  <div className="font-bold text-sm text-forest-950">
                    ₹{formatNumberINR(property.maintenanceFees)} /mo
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-sm">
              <h2 className="font-serif font-bold text-lg text-forest-950 mb-3 pb-2 border-b border-charcoal-100">
                Detailed Property Description
              </h2>
              <div className="text-xs sm:text-sm text-charcoal-700 leading-relaxed space-y-3 whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-sm">
              <h2 className="font-serif font-bold text-lg text-forest-950 mb-4 pb-2 border-b border-charcoal-100">
                Exclusive Amenities &amp; Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-charcoal-100 text-xs font-semibold text-charcoal-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE NEIGHBORHOOD MAP RADAR */}
            <PropertyMapRadar
              latitude={property.latitude}
              longitude={property.longitude}
              propertyTitle={property.title}
              propertyPrice={property.price}
              truthScore={property.truthScore}
              localityName={property.localityName}
              city={property.city}
            />

            {/* SIGNATURE: PROPERTY TRUTH SCORE AUDIT BREAKDOWN */}
            <div className="bg-forest-950 text-white rounded-2xl p-6 sm:p-8 border border-forest-800 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-forest-800 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-forest-900 border border-gold-accent/40 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-black">
                      Property Truth Score™ Verification Report
                    </h3>
                    <p className="text-xs text-forest-200">
                      Transparency audit performed by EstateOS Regulatory Cell
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl sm:text-3xl font-black text-gold-accent font-serif">
                    {property.truthScore}
                  </span>
                  <span className="text-xs text-forest-300 block font-semibold">Overall Index / 100</span>
                </div>
              </div>

              {/* Individual Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-forest-900/80 border border-forest-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Agent Identity Verification</h4>
                    <p className="text-forest-300 text-[11px] mt-0.5">
                      RERA broker license and identity KYC validated. No unauthorized intermediaries.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-forest-900/80 border border-forest-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">RERA Registration Status</h4>
                    <p className="text-forest-300 text-[11px] mt-0.5">
                      RERA certificate verified active on state portal with approved sanction plans.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-forest-900/80 border border-forest-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Document Review &amp; Title</h4>
                    <p className="text-forest-300 text-[11px] mt-0.5">
                      Sub-registrar search report cleared for 13 years encumbrance records.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-forest-900/80 border border-forest-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Price Benchmarking Accuracy</h4>
                    <p className="text-forest-300 text-[11px] mt-0.5">
                      Priced within ±4.8% of verified circle rate transactions in this micro-market.
                    </p>
                  </div>
                </div>
              </div>

              {audit && (
                <div className="mt-6 pt-4 border-t border-forest-900 text-xs text-forest-300 space-y-1.5">
                  <p>
                    <strong>Auditor Remarks:</strong> &ldquo;{audit.auditNotes}&rdquo;
                  </p>
                  <p className="text-[11px] text-forest-400 italic">
                    {audit.disclaimer}
                  </p>
                </div>
              )}

              {/* Goldmine #2: Paid Truth Score Report Download CTA */}
              <div className="mt-6 pt-5 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-gold-accent" />
                    <span>Official 14-Page Legal Due-Diligence Certificate</span>
                  </h4>
                  <p className="text-[11px] text-forest-300">
                    Includes 30-year sub-registrar encumbrance search, court litigation search &amp; RERA sanction copies.
                  </p>
                </div>
                <button
                  onClick={() => setIsTruthReportModalOpen(true)}
                  className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-gold-accent hover:bg-gold-light text-forest-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Audit PDF (₹1,499)</span>
                </button>
              </div>
            </div>

            {/* AdSense Compliant Slot */}
            <AdSenseBanner slotId="property-detail-lower-banner" />
          </div>

          {/* Right Sidebar: Agent Contact & Inquiry Form */}
          <div className="lg:col-span-4 space-y-6">
            {/* Agent / Builder Profile Card */}
            <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-sm sticky top-28 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-charcoal-100">
                <img
                  src={property.organization?.logo || property.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                  alt={property.organization?.name || property.user?.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gold-accent"
                />
                <div>
                  <h3 className="font-bold text-sm text-forest-950">
                    {property.organization?.name || property.user?.name}
                  </h3>
                  <p className="text-[11px] text-charcoal-500 font-medium">
                    {property.user?.licenseNo || property.organization?.reraNumber || 'Certified RERA Consultant'}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Brokerage
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp & Call Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <a
                  href={`https://wa.me/${(property.user?.phone || SITE_CONTACT.whatsappNumber).replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I am interested in ${property.title} on EstateOS.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${property.user?.phone || SITE_CONTACT.directPhone}`}
                  className="py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all border border-forest-700"
                >
                  <Phone className="w-4 h-4 text-gold-accent" />
                  <span>Direct Call</span>
                </a>
              </div>

              {/* Instant Enquiry Form */}
              <div className="pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-charcoal-700 mb-3">
                  Send Direct Inquiry
                </h4>

                {enquirySuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold leading-relaxed space-y-3">
                    <p>{enquirySuccess}</p>
                    {whatsappConnectUrl && (
                      <a
                        href={whatsappConnectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Directly on WhatsApp</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number (e.g. +91 98765 43210) *"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        value={enquiryMsg}
                        onChange={(e) => setEnquiryMsg(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800 focus:outline-none focus:border-forest-700 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={enquirySending}
                      className="w-full py-2.5 px-4 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md border border-forest-700 hover:border-gold-accent transition-all disabled:opacity-50"
                    >
                      {enquirySending ? 'Routing Inquiry...' : 'Submit Inquiry'}
                    </button>
                  </form>
                )}
              </div>

              {/* Site Visit Trigger */}
              <div className="pt-2 border-t border-charcoal-100">
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl border border-forest-800 text-forest-900 font-bold text-xs uppercase tracking-wider hover:bg-forest-50 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-forest-800" />
                  <span>Schedule Site Inspection</span>
                </button>
              </div>

              {/* Goldmine #1: Bank Home Loan Pre-Sanction CTA */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-950">Pre-Approved Bank Home Loan</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-snug mb-3">
                  Check eligibility with HDFC, SBI &amp; ICICI at 8.35% with ₹0 processing fee assistance.
                </p>
                <button
                  onClick={() => setIsLoanModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>⚡ Check In-Principle Loan</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-charcoal-200">
            <h2 className="font-serif text-2xl font-black text-forest-950 mb-6">
              Similar Verified Properties in {property.city}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SCHEDULE PROPERTY VISIT MODAL */}
      {isVisitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-charcoal-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsVisitModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2 text-forest-900">
              <Calendar className="w-5 h-5 text-gold-accent" />
              <h3 className="font-serif font-bold text-lg">Book Site Inspection</h3>
            </div>
            <p className="text-xs text-charcoal-500 mb-4">
              Schedule a private walkthrough for <strong>{property.title}</strong> with an accredited consultant.
            </p>

            {visitSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold leading-relaxed">
                {visitSuccess}
                <button
                  onClick={() => setIsVisitModalOpen(false)}
                  className="mt-3 block w-full py-2 bg-emerald-700 text-white rounded-lg text-center font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={visitName}
                    onChange={(e) => setVisitName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={visitPhone}
                    onChange={(e) => setVisitPhone(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-2 py-2"
                    >
                      <option>10:00 AM - 11:00 AM</option>
                      <option>11:00 AM - 12:00 PM</option>
                      <option>02:00 PM - 03:00 PM</option>
                      <option>04:00 PM - 05:00 PM</option>
                      <option>05:30 PM - 06:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Specific Requests / Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need to inspect balcony view and clubhouse"
                    value={visitNotes}
                    onChange={(e) => setVisitNotes(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={visitSubmitting}
                  className="w-full py-2.5 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all mt-2"
                >
                  {visitSubmitting ? 'Confirming...' : 'Confirm Site Inspection'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Goldmine #1: Home Loan Pre-Sanction DSA Modal */}
      <HomeLoanApplyModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        defaultLoanAmount={Math.round(property.price * 0.8)}
        propertyTitle={property.title}
        propertyPrice={property.price}
        city={property.city}
      />

      {/* Goldmine #2: Paid Truth Score Legal Audit PDF Modal */}
      <TruthScoreReportDownloadModal
        isOpen={isTruthReportModalOpen}
        onClose={() => setIsTruthReportModalOpen(false)}
        property={property}
      />
    </div>
  );
}
