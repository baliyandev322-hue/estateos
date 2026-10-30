import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SITE_CONTACT } from '@/config/siteContact';

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-forest-100 border-t border-forest-800">
      {/* Upper Footer: Newsletter & RERA Trust Seal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-forest-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-900 border border-gold-accent/40 flex items-center justify-center">
                <span className="font-serif font-bold text-xl text-gold-accent">E</span>
              </div>
              <span className="font-serif text-2xl font-black tracking-tight text-white">
                Estate<span className="text-gold-accent">OS</span>
              </span>
            </div>
            <p className="text-forest-200 text-sm leading-relaxed max-w-md">
              EstateOS is India&apos;s sovereign proptech marketplace and multi-tenant SaaS ecosystem. Combining algorithmic Property Truth Scores™, locality micro-intelligence, and enterprise CRM for premier consultants and developers.
            </p>
            
            {/* Real Corporate Office & Support Badge */}
            <div className="space-y-2.5 pt-2 text-xs text-forest-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                <span className="leading-snug">{SITE_CONTACT.address.fullFormatted}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                <a
                  href={`tel:${SITE_CONTACT.tollFree.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 text-gold-light hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-accent" />
                  <span>{SITE_CONTACT.tollFree}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONTACT.supportEmail}`}
                  className="flex items-center gap-1.5 text-forest-200 hover:text-white hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-accent" />
                  <span>{SITE_CONTACT.supportEmail}</span>
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-forest-400">
                <Clock className="w-3.5 h-3.5 text-forest-400" />
                <span>{SITE_CONTACT.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/80 border border-gold-accent/30 text-xs font-semibold text-gold-accent">
                <ShieldCheck className="w-4 h-4" />
                <span>RERA Compliance Verified Platform</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-light mb-4">
                Marketplace
              </h3>
              <ul className="space-y-2.5 text-xs text-forest-200">
                <li><Link href="/properties?listingType=SALE" className="hover:text-gold-light transition-colors">Buy Residential</Link></li>
                <li><Link href="/properties?listingType=RENT" className="hover:text-gold-light transition-colors">Rent Luxury Homes</Link></li>
                <li><Link href="/properties?propertyType=COMMERCIAL" className="hover:text-gold-light transition-colors">Commercial IT Floors</Link></li>
                <li><Link href="/properties?propertyType=PENTHOUSE" className="hover:text-gold-light transition-colors">Signature Penthouses</Link></li>
                <li><Link href="/properties?propertyType=VILLA" className="hover:text-gold-light transition-colors">Luxury Waterfront Villas</Link></li>
                <li><Link href="/agents" className="hover:text-gold-light transition-colors">Verified Agent Network</Link></li>
                <li><Link href="/builders" className="hover:text-gold-light transition-colors">Top Developers Hub</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-light mb-4">
                PropTech &amp; AI
              </h3>
              <ul className="space-y-2.5 text-xs text-forest-200">
                <li><Link href="/truth-score" className="hover:text-gold-light transition-colors">Property Truth Score™</Link></li>
                <li><Link href="/ai-matchmaker" className="hover:text-gold-light transition-colors">AI Matchmaker</Link></li>
                <li><Link href="/localities" className="hover:text-gold-light transition-colors">Locality Intelligence</Link></li>
                <li><Link href="/calculators" className="hover:text-gold-light transition-colors">Home Loan EMI Tool</Link></li>
                <li><Link href="/calculators" className="hover:text-gold-light transition-colors">Stamp Duty Calculator</Link></li>
                <li><Link href="/calculators" className="hover:text-gold-light transition-colors">Rental Yield &amp; ROI</Link></li>
                <li><Link href="/pricing" className="hover:text-gold-light transition-colors">SaaS Agent Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-light mb-4">
                Guides &amp; Compliance
              </h3>
              <ul className="space-y-2.5 text-xs text-forest-200">
                <li><Link href="/guides" className="hover:text-gold-light transition-colors">RERA Verification Guide</Link></li>
                <li><Link href="/guides" className="hover:text-gold-light transition-colors">Home Loan 80C Tax Savings</Link></li>
                <li><Link href="/guides" className="hover:text-gold-light transition-colors">Tri-city Investment Trends</Link></li>
                <li><Link href="/about" className="hover:text-gold-light transition-colors">About EstateOS</Link></li>
                <li><Link href="/contact" className="hover:text-gold-light transition-colors">Contact &amp; Grievance</Link></li>
                <li><Link href="/privacy" className="hover:text-gold-light transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gold-light transition-colors">Terms of Service</Link></li>
                <li><Link href="/cancellation-refund" className="hover:text-gold-light transition-colors">Cancellation &amp; Refund Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-gold-light transition-colors">Legal Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory & AdSense Disclaimer */}
        <div className="pt-8 text-[11px] text-forest-400 space-y-3 leading-relaxed">
          <p>
            <strong>Regulatory Disclaimer &amp; Fair Housing:</strong> EstateOS operates as a digital marketplace, listing facilitation network, and software-as-a-service provider. Information presented regarding properties, RERA IDs, price trends, and infrastructure is aggregated from public state registries, certified brokers, and developer disclosures. EstateOS does not provide judicial title certification or mortgage approvals. Users are advised to exercise independent due diligence and consult accredited legal counsel prior to financial execution.
          </p>
          <p>
            <strong>Google AdSense &amp; Advertising Notice:</strong> Select editorial content and educational guides on EstateOS may display contextual advertisements served via approved ad networks including Google AdSense. Advertised offerings are distinct from verified EstateOS marketplace listings and do not imply official platform endorsement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-forest-900 gap-4">
            <p className="text-xs text-forest-300">
              © 2026 EstateOS Technologies Pvt. Ltd. All rights reserved. Built with precision for Indian &amp; Global Real Estate.
            </p>
            <div className="flex items-center gap-6 text-xs text-forest-300">
              <span>RERA Registered Gateway</span>
              <span>ISO 27001 Cloud Security</span>
              <span>100% Verified Listings</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
