import React from 'react';
import { ShieldCheck, Target, Award, Users, Compass, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About EstateOS — Sovereign Indian PropTech & AI Intelligence',
  description: 'Learn about the EstateOS mission to eradicate fraudulent listings through algorithmic Property Truth Scores and micro-market locality transparency.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="w-4 h-4" />
            <span>Our Sovereign Mission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-forest-950 tracking-tight">
            Engineering Integrity into Indian Real Estate
          </h1>
          <p className="mt-3 text-sm text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
            EstateOS was founded with a definitive thesis: property buying and renting should be transparent, verified, and free of middleman extortion and phantom inventory.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-charcoal-200 p-8 sm:p-12 shadow-sm space-y-8 text-charcoal-800 text-sm leading-relaxed">
          <div>
            <h2 className="font-serif font-black text-xl text-forest-950 mb-3">
              Why EstateOS Exists
            </h2>
            <p>
              Traditional real estate classifieds in India operate on volume rather than veracity. Millions of unvetted listings clutter the internet, often featuring outdated prices, deceptive photographs, and non-existent units designed solely to capture user phone numbers for telemarketing syndicates.
            </p>
            <p className="mt-3">
              EstateOS reverses this paradigm by coupling every square foot of listed property to its statutory RERA identity and our signature <strong>Property Truth Score™</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-charcoal-100">
            <div className="p-4 rounded-2xl bg-forest-50 border border-forest-100">
              <ShieldCheck className="w-6 h-6 text-forest-800 mb-2" />
              <h4 className="font-bold text-forest-950 mb-1">RERA Statutory Verification</h4>
              <p className="text-xs text-charcoal-600">
                Direct cross-examination with state regulatory databases ensures sanctions, escrow accounts, and carpet area calculations are authentic.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-forest-50 border border-forest-100">
              <Compass className="w-6 h-6 text-forest-800 mb-2" />
              <h4 className="font-bold text-forest-950 mb-1">Micro-Market Intelligence</h4>
              <p className="text-xs text-charcoal-600">
                True price indices, 3-year historical capital growth, and civic infrastructure metrics backed by registered conveyance deeds.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal-100">
            <h3 className="font-serif font-bold text-lg text-forest-950 mb-2">
              Multi-Tenant Architecture for Industry Leaders
            </h3>
            <p>
              Beyond a marketplace, EstateOS is an operating system for elite consultants and developers. Our multi-tenant SaaS equips professionals with end-to-end lead pipelines, RERA-compliant AI copywriters, and verified digital showcases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
