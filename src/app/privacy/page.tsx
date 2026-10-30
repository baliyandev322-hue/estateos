import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — EstateOS',
  description: 'EstateOS Privacy Policy regarding data protection, lead transmission, and cookie disclosure under the Digital Personal Data Protection Act 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-charcoal-200 p-8 sm:p-12 shadow-sm space-y-6 text-charcoal-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-charcoal-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Legal Compliance</span>
            <h1 className="font-serif text-3xl font-black text-forest-950 mt-1">
              EstateOS Privacy Policy
            </h1>
            <p className="text-xs text-charcoal-400 mt-1">
              Effective Date: October 30, 2026 • Compliant with DPDP Act 2023 &amp; IT Act 2000
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">1. Information We Collect</h2>
            <p>
              When you browse EstateOS, register an account, schedule a property visit, or submit an inquiry, we collect identifying information including your full name, phone number, email address, property preferences, and IP address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">2. How Inquiries &amp; Leads are Processed</h2>
            <p>
              When you submit an explicit enquiry for a specific property, your contact details are directly dispatched to the verified broker, agency, or builder managing that listing. We strictly prohibit the resale of customer leads to unauthorized third-party cold-calling aggregators.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">3. Cookies &amp; Google AdSense Disclosure</h2>
            <p>
              We utilize essential security cookies to preserve your authenticated workspace session. Third-party advertising partners, including Google AdSense, may place and read cookies on your browser to serve non-deceptive, contextual real estate advertisements based on prior visits. Users may disable targeted cookies via browser controls or Google Ads Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-base text-forest-950">4. Data Deletion &amp; Grievance Redressal</h2>
            <p>
              Under the Digital Personal Data Protection Act (DPDP) 2023, you retain the sovereign right to request a copy of your personal data or request permanent erasure by emailing our Data Protection Officer at privacy@estateos.in.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
