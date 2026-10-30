'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

export default function PricingClient() {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  const plans = [
    {
      id: 'FREE',
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Essential portal presence for individual property owners and independent brokers.',
      features: [
        '5 Active Property Listings',
        'Basic Lead Capture',
        'Standard Truth Score Audit',
        'Community Support',
      ],
      popular: false,
      cta: 'Get Started Free',
    },
    {
      id: 'STARTER',
      name: 'Starter',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      description: 'Ideal for solo licensed consultants expanding their digital footprint.',
      features: [
        '10 Active Property Listings',
        'Verified Agent Profile Page',
        'Basic Lead Management CRM',
        'Listing Analytics & View Counts',
        'Standard Email Support',
      ],
      popular: false,
      cta: 'Start Starter Plan',
    },
    {
      id: 'PROFESSIONAL',
      name: 'Professional',
      monthlyPrice: 1499,
      yearlyPrice: 14990,
      description: 'Engineered for high-performing residential specialists and boutique brokerages.',
      features: [
        '50 Active Property Listings',
        'Full Multi-Stage CRM Pipeline',
        'AI Property Description Generator',
        'Featured Listing Boosts (2/mo)',
        'Up to 5 Team Member Seats',
        'Direct WhatsApp Lead Routing',
        'Priority Phone & Chat Support',
      ],
      popular: true,
      cta: 'Upgrade to Pro',
    },
    {
      id: 'BUSINESS',
      name: 'Business',
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      description: 'Complete multi-tenant operating suite for medium development firms & agencies.',
      features: [
        '150 Active Property Listings',
        'Multi-Project Inventory Suite',
        'Advanced Lead Assignment Rules',
        'Full AI Suite (Matchmaker + Desc)',
        'Up to 15 Team Member Seats',
        'Branded Agency Public Portal',
        'CSV & CRM Webhook Integrations',
      ],
      popular: false,
      cta: 'Start Business Plan',
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise',
      monthlyPrice: 5999,
      yearlyPrice: 59990,
      description: 'Tailored institutional software for tier-1 developers and national real estate networks.',
      features: [
        'Unlimited Property Listings',
        'Custom Domain & White-Labeling',
        'Dedicated Cloud Database Node',
        'Custom ERP & Salesforce Sync',
        'Up to 50 Team Member Seats',
        'Dedicated Key Account Manager',
        '24/7 SLA Backed Uptime',
      ],
      popular: false,
      cta: 'Contact Enterprise Sales',
    },
  ];

  const handleOpenCheckout = (planId: string) => {
    setSelectedPlan(planId);
    setCheckoutSuccess(null);
    setIsCheckoutOpen(true);
  };

  const handleSimulatePayment = async () => {
    if (!selectedPlan) return;
    setCheckoutLoading(true);

    try {
      const res = await fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          billingCycle,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCheckoutSuccess(data.message || 'Subscription successfully updated!');
      } else {
        alert(data.error || 'Subscription upgrade failed. Please log in with an Agent or Builder account.');
      }
    } catch (err) {
      alert('Error updating subscription');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4" />
            <span>Multi-Tenant PropTech SaaS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-forest-950 tracking-tight">
            Transparent Pricing for Growing Brokerages
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Everything you need to list properties, manage sales leads, deploy AI descriptions, and scale your real estate operations.
          </p>

          {/* Billing Cycle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white border border-charcoal-200 p-1.5 rounded-2xl shadow-sm">
            <button
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'MONTHLY'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-forest-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('YEARLY')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'YEARLY'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-forest-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-md bg-gold-400 text-forest-950 text-[10px] font-black uppercase">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {plans.map((p) => {
            const price = billingCycle === 'YEARLY' ? p.yearlyPrice : p.monthlyPrice;

            return (
              <div
                key={p.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
                  p.popular
                    ? 'bg-forest-950 text-white border-2 border-gold-accent shadow-2xl scale-105 z-10'
                    : 'bg-white text-charcoal-900 border border-charcoal-200 shadow-sm hover:border-gold-accent'
                }`}
              >
                <div>
                  {p.popular && (
                    <span className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-gold-accent text-forest-950 mb-3 shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <h3 className={`font-serif font-black text-xl ${p.popular ? 'text-white' : 'text-forest-950'}`}>
                    {p.name}
                  </h3>
                  <p className={`text-xs mt-1 min-h-[36px] ${p.popular ? 'text-forest-200' : 'text-charcoal-500'}`}>
                    {p.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-charcoal-100/20">
                    <span className={`font-serif text-3xl font-black ${p.popular ? 'text-gold-light' : 'text-forest-900'}`}>
                      {formatCurrencyINR(price)}
                    </span>
                    <span className={`text-xs ${p.popular ? 'text-forest-300' : 'text-charcoal-400'}`}>
                      {price > 0 ? (billingCycle === 'YEARLY' ? ' /year' : ' /mo') : ' forever'}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.popular ? 'text-gold-accent' : 'text-emerald-600'}`} />
                        <span className={p.popular ? 'text-forest-100' : 'text-charcoal-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleOpenCheckout(p.id)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                      p.popular
                        ? 'bg-gold-accent hover:bg-gold-500 text-forest-950'
                        : 'bg-forest-900 hover:bg-forest-800 text-white'
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Notice */}
        <div className="mt-16 bg-white rounded-2xl border border-charcoal-200 p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-forest-950">
              Need Custom Real Estate Enterprise Integrations?
            </h3>
            <p className="text-xs text-charcoal-600 mt-1">
              We provide dedicated VPC database hosting, custom RERA audit workflows, and direct webhook integrations for developers with over 500 units.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-forest-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl whitespace-nowrap"
          >
            Schedule Technical Consultation
          </Link>
        </div>
      </div>

      {/* PAYMENT / CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2 text-forest-900">
              <CreditCard className="w-5 h-5 text-gold-accent" />
              <h3 className="font-serif font-bold text-xl">SaaS Plan Checkout</h3>
            </div>

            {checkoutSuccess ? (
              <div className="mt-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Subscription Activated!</span>
                </div>
                <p className="text-xs leading-relaxed">{checkoutSuccess}</p>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs">
                  <p className="font-bold text-forest-900">Next Steps:</p>
                  <p className="text-charcoal-600 mt-1">
                    Your organization limits have been increased. Open your SaaS Dashboard to start posting properties and managing leads.
                  </p>
                </div>
                <Link
                  href="/dashboard/agent"
                  className="block w-full text-center py-2.5 bg-forest-900 text-white font-bold text-xs rounded-xl"
                >
                  Go to Agent Dashboard
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-charcoal-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Selected Tier:</span>
                    <strong className="text-forest-950 font-bold">{selectedPlan} Plan</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Billing Cycle:</span>
                    <strong className="text-forest-950 font-bold">{billingCycle}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-charcoal-200">
                    <span className="text-charcoal-700 font-bold">Total Payable:</span>
                    <strong className="font-serif text-lg font-black text-forest-900">
                      {formatCurrencyINR(
                        billingCycle === 'YEARLY'
                          ? (plans.find((p) => p.id === selectedPlan)?.yearlyPrice || 0)
                          : (plans.find((p) => p.id === selectedPlan)?.monthlyPrice || 0)
                      )}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-[11px] text-forest-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Secured by Razorpay India. Invoices are generated automatically with GSTIN compliance.
                  </span>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={checkoutLoading}
                  className="w-full py-3 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-gold-accent" />
                  <span>{checkoutLoading ? 'Processing Payment...' : 'Confirm & Activate Plan'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
