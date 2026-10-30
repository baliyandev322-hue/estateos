import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Statutory Disclaimer — EstateOS',
  description: 'Legal and RERA disclaimers regarding property listings, title verification limitations, and financial projections.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-charcoal-200 p-8 sm:p-12 shadow-sm space-y-6 text-charcoal-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-charcoal-100 pb-4">
            <h1 className="font-serif text-3xl font-black text-forest-950">
              Statutory Real Estate &amp; Legal Disclaimer
            </h1>
            <p className="text-xs text-charcoal-400 mt-1">
              EstateOS Regulatory Compliance Framework
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs">Important Title &amp; Judicial Notice</h4>
              <p className="text-xs mt-0.5 leading-relaxed">
                The EstateOS Property Truth Score™ represents a documentary and empirical information audit. It does not constitute an advocate&apos;s judicial title certificate, structural engineering guarantee, or mortgage sanction.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">1. Nature of the Platform</h2>
            <p>
              EstateOS operates as an intermediary proptech technology marketplace and software provider connecting property buyers, renters, owners, brokers, and builders under Section 79 of the Information Technology Act 2000 and applicable State Real Estate Regulatory Authority regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">2. Financial Projections &amp; Appreciation Rates</h2>
            <p>
              All metrics surfaced within the Locality Intelligence suite (such as rental yield estimates, historical appreciation, and price trends) are based on historical transaction data and public municipal indices. EstateOS does not guarantee future financial returns or property appreciation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">3. Independent Due Diligence Recommended</h2>
            <p>
              Buyers and investors are strongly advised to physically inspect properties, verify parent title deeds at the relevant sub-registrar office, and consult independent legal counsel before executing financial agreements or paying token booking deposits.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
