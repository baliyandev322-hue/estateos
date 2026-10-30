import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Clock, CreditCard, Mail, HelpCircle } from 'lucide-react';
import { SITE_CONTACT } from '@/config/siteContact';

export const metadata = {
  title: 'Cancellation & Refund Policy — EstateOS',
  description: 'EstateOS official cancellation, subscription termination, and refund policies for SaaS subscribers, agents, and enterprise clients.',
};

export default function CancellationRefundPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Statutory Merchant Policy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Last Updated: October 2026 • Compliant with Indian Consumer Protection (E-Commerce) Rules
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-accent" />
              <span>1. Overview &amp; Scope</span>
            </h2>
            <p>
              EstateOS Technologies Pvt. Ltd. (&ldquo;EstateOS&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) provides digital subscription software-as-a-service (SaaS) solutions, premium advertising listing slots, Property Truth Score™ verification dossiers, and digital developer integration toolkits to real estate brokers, developers, and consumers across India.
            </p>
            <p>
              This Cancellation and Refund Policy applies to all financial transactions processed on <strong>estateos.in</strong> and related subdomains, including credit/debit card payments, UPI transfers (GPay, PhonePe, Paytm, BHIM), and internet banking facilitated via our licensed payment aggregator, <strong>Razorpay</strong>.
            </p>
          </section>

          <section className="space-y-3 border-t border-charcoal-100 pt-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-accent" />
              <span>2. Subscription Cancellation Rules</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Monthly SaaS Subscriptions:</strong> Subscribers (Brokers, Real Estate Agents, and Developers) on monthly billing tiers (Starter ₹499/mo, Professional ₹1,499/mo, Enterprise ₹5,999/mo) can cancel recurring automatic renewals at any point in time prior to the next scheduled invoice cycle directly via their user account dashboard or by notifying <strong>billing@estateos.in</strong>.
              </li>
              <li>
                <strong>Annual SaaS Subscriptions:</strong> Annual recurring plans may be cancelled at any time; cancellation takes effect at the completion of the active 12-month billing period.
              </li>
              <li>
                Upon cancellation, your premium tools (unlimited CRM listings, AI matchmaker, sponsored badge boosts) will remain fully accessible until the final date of your paid billing term.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-charcoal-100 pt-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest-950 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold-accent" />
              <span>3. 7-Day Money-Back Guarantee &amp; Refund Eligibility</span>
            </h2>
            <p>
              We stand firmly behind the precision and reliability of our PropTech platform. If you are dissatisfied with your first-time subscription upgrade:
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-forest-950 font-medium">
              ✨ <strong>First-Time Subscriber Guarantee:</strong> You are entitled to a <strong>100% full refund</strong> if requested within <strong>7 calendar days</strong> of initial subscription activation, provided no material terms of service violations have occurred.
            </div>
            <p>
              <strong>Exceptions / Non-Refundable Items:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-charcoal-600">
              <li>Listing boost fees or sponsored banner campaigns that have already run and delivered digital impressions.</li>
              <li>Individual statutory RERA on-site physical field audit fees once the survey agent has completed the field inspection.</li>
              <li>Renewal transactions processed after the cancellation window has elapsed, unless technical billing errors occurred.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-charcoal-100 pt-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest-950 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-gold-accent" />
              <span>4. Refund Processing Timeframe &amp; Mechanism</span>
            </h2>
            <p>
              Once your refund request is acknowledged and validated by our finance desk:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Payment Reversal Gateway:</strong> All refunds are issued exclusively back to the <em>original source payment method</em> (Bank Account / Credit Card / UPI VPA) via Razorpay. We do not issue cash refunds or third-party bank transfers.
              </li>
              <li>
                <strong>Turnaround Time (TAT):</strong> The refund initiation occurs within <strong>24 to 48 business hours</strong>. Depending on your issuing bank&rsquo;s clearing protocol, the funds will reflect in your account within <strong>5 to 7 business banking days</strong>.
              </li>
              <li>
                A system-generated <strong>Razorpay Refund Reference Number (RRN)</strong> will be emailed to your registered address for tracking with your bank.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-charcoal-100 pt-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest-950 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold-accent" />
              <span>5. How to Initiate a Cancellation or Refund</span>
            </h2>
            <p>
              To file a cancellation or claim a refund under our 7-day guarantee, please reach out to our central settlement desk with your order receipt details:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 font-mono text-xs">
              <p><strong>Merchant Legal Name:</strong> {SITE_CONTACT.companyName}</p>
              <p><strong>Registered Address:</strong> {SITE_CONTACT.address.fullFormatted}</p>
              <p><strong>Billing &amp; Refunds Email:</strong> {SITE_CONTACT.supportEmail}</p>
              <p><strong>Central Compliance Desk:</strong> {SITE_CONTACT.grievanceEmail}</p>
              <p><strong>Customer Concierge Toll-Free:</strong> {SITE_CONTACT.tollFree} ({SITE_CONTACT.operatingHours})</p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center text-xs text-charcoal-500 flex items-center justify-center gap-4">
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <span>•</span>
          <Link href="/contact" className="hover:underline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
