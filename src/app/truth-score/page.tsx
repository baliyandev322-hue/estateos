import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Scale,
  Award,
  Lock,
  ArrowRight,
  Database,
  Building,
  UserCheck,
} from 'lucide-react';
import AdSenseBanner from '@/components/AdSenseBanner';
import TruthScoreDownloadTrigger from '@/components/TruthScoreDownloadTrigger';
import ReraSearchWidget from '@/components/ReraSearchWidget';

export const metadata = {
  title: 'Property Truth Score™ Protocol — EstateOS Verification Standards',
  description: 'Learn how the EstateOS Property Truth Score eliminates real estate fraud, phantom listings, and title ambiguities across Indian micro-markets.',
};

export default function TruthScorePage() {
  const pillars = [
    {
      num: '01',
      title: 'Agent & Broker KYC Audit',
      desc: 'Validation of state RERA agent licenses, corporate broker registrations, and physical agency operating address. Eliminates unauthorized freelance middlemen.',
      badge: 'RERA Cross-Checked',
    },
    {
      num: '02',
      title: 'Official RERA Project Registry',
      desc: 'Cross-examination of project approvals, layout sanctions, commencement certificates (CC), and scheduled bank escrow account compliance.',
      badge: 'Statutory Verification',
    },
    {
      num: '03',
      title: '13-Year Title & Encumbrance Review',
      desc: 'Sub-registrar digital index searches reviewing non-encumbrance certificates (Form 15 & 16) to detect recorded commercial mortgages or litigation flags.',
      badge: 'Registry Record Audit',
    },
    {
      num: '04',
      title: 'Field Inspection & GPS Timestamp',
      desc: 'Physical site audit verifying construction stage milestones, carpet area boundary walls, actual balcony orientations, and unobstructed views.',
      badge: 'On-Site Field Audit',
    },
    {
      num: '05',
      title: 'Price Benchmarking Algorithm',
      desc: 'Algorithmic comparison against official government circle guidance rates and registered transaction deed records to prevent deceptive markups.',
      badge: 'Circle Rate Normalized',
    },
    {
      num: '06',
      title: 'Carpet Area Statutory Verification',
      desc: 'Mathematical verification of net usable carpet area in strict accordance with the Real Estate (Regulation and Development) Act 2016 formula.',
      badge: 'RERA Formula Audit',
    },
    {
      num: '07',
      title: 'Listing Freshness & Velocity Audit',
      desc: 'Bi-weekly automated check ensuring units marked available have not been booked, reserved, or tokened offline, guaranteeing 100% active inventory.',
      badge: 'Live Inventory Guard',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-4 border border-gold-accent/40 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>The Gold Standard in Indian Real Estate Trust</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-forest-950 tracking-tight leading-tight">
            The Property Truth Score™
          </h1>

          <p className="mt-4 text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
            For decades, Indian property seekers have struggled with inaccurate photos, hidden litigation, phantom listings, and arbitrary pricing. EstateOS introduces an automated, regulatory-grade score that brings total transparency to every square foot.
          </p>
        </div>

        {/* Live Search Widget */}
        <div className="max-w-4xl mx-auto">
          <ReraSearchWidget />
        </div>

        {/* Live Score Demo Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-charcoal-200 shadow-xl overflow-hidden mb-16">
          <div className="bg-forest-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-accent">
                Sample Interactive Audit Report
              </span>
              <h2 className="font-serif text-2xl font-black mt-1">
                Grand Azure 3BHK Residence, Sector 82 IT City, Mohali
              </h2>
              <p className="text-xs text-forest-200 mt-1">
                Audit Reference ID: <strong>EOS-PBRERA-2026-09881</strong> • Audited on 28 Oct 2026
              </p>
            </div>

            <div className="flex items-center gap-3 bg-forest-900/90 border border-gold-accent/40 p-4 rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-gold-accent" />
              <div>
                <p className="text-3xl font-black font-serif text-gold-light leading-none">94<span className="text-sm font-sans text-white">/100</span></p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Grade A1 Verified
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest-950">RERA Registration Status</h4>
                  <p className="text-charcoal-600 mt-0.5">
                    <strong>PBRERA-SAS80-PR0612</strong> — Verified active on Punjab RERA registry with 100% scheduled escrow compliance.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest-950">Sub-Registrar Title Check</h4>
                  <p className="text-charcoal-600 mt-0.5">
                    13-year non-encumbrance search completed at SAS Nagar Tehsil. Zero mortgage encumbrance or partition suits recorded.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest-950">Carpet Area Measurement</h4>
                  <p className="text-charcoal-600 mt-0.5">
                    1,450 sq.ft net internal usable carpet area confirmed against approved architectural structural plans.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest-950">Circle Rate Normalization</h4>
                  <p className="text-charcoal-600 mt-0.5">
                    Asking price of ₹5,257/sq.ft is verified within +4.2% of recent quarterly registered conveyance deeds in Sector 82.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">Transparent Disclosure Warning</h4>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                  The Property Truth Score reflects documented registry records, developer declarations, and on-site sampling. It is an information audit and does not replace formal legal title conveyance by an enrolled advocate or bank title opinion.
                </p>
              </div>
            </div>

            {/* Goldmine #2: Paid Download Trigger */}
            <TruthScoreDownloadTrigger />
          </div>
        </div>

        {/* The 7 Verification Pillars */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Rigorous Auditing Methodology
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest-950 mt-1">
              The 7 Pillars of Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((item) => (
              <div
                key={item.num}
                className="bg-white rounded-2xl border border-charcoal-200/80 p-6 shadow-sm hover:border-gold-accent transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-black text-forest-900">
                      {item.num}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-forest-50 text-forest-800 border border-forest-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-charcoal-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to browse verified properties */}
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-forest-800 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-black">
            Experience 100% Fraud-Free Property Search
          </h2>
          <p className="text-xs sm:text-sm text-forest-200 mt-3 max-w-xl mx-auto leading-relaxed">
            Search only RERA-cross-checked properties with verified price indices and authenticated agents.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/properties?verified=true"
              className="px-6 py-3 rounded-xl bg-gold-accent hover:bg-gold-500 text-forest-950 font-black text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Search Verified Properties
            </Link>
            <Link
              href="/guides"
              className="px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-forest-700"
            >
              Read RERA Buying Guide
            </Link>
          </div>
        </div>

        {/* AdSense Placement */}
        <AdSenseBanner slotId="truth-score-educational-banner" />
      </div>
    </div>
  );
}
