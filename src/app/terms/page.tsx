import React from 'react';

export const metadata = {
  title: 'Terms and Conditions — EstateOS',
  description: 'EstateOS terms of service, marketplace policies, and multi-tenant SaaS acceptable use rules.',
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-charcoal-200 p-8 sm:p-12 shadow-sm space-y-6 text-charcoal-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-charcoal-100 pb-4">
            <h1 className="font-serif text-3xl font-black text-forest-950">
              Terms &amp; Conditions of Service
            </h1>
            <p className="text-xs text-charcoal-400 mt-1">
              Last Revised: October 30, 2026
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">1. Acceptance of Terms</h2>
            <p>
              By accessing EstateOS (&ldquo;Platform&rdquo;), you agree to be bound by these Terms of Service. If you disagree with any portion of these conditions, you must refrain from using the platform and its multi-tenant SaaS features.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">2. Agent &amp; Builder SaaS Subscriptions</h2>
            <p>
              Brokers and developers subscribing to Starter, Professional, Business, or Enterprise tiers agree to pay applicable recurring subscription fees billed monthly or annually. Subscription limits governing active listings and CRM leads are automatically enforced.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">3. RERA Accuracy Warranty</h2>
            <p>
              Agents and builders warrant that all property listings, carpet area metrics, sanction approvals, and RERA registration credentials submitted to EstateOS represent truthful, unadulterated facts. Uploading fictitious properties or falsified RERA IDs will result in immediate termination of the organization account without refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
