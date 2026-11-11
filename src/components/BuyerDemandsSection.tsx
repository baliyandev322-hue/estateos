'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  ArrowRight,
  Building2,
  CheckCircle2,
  Users,
  Plus,
  X,
  Phone,
  ShieldCheck,
  BadgeIndianRupee,
  Loader2,
} from 'lucide-react';

export interface BuyerDemandCard {
  id: string;
  title: string;
  city: string;
  locality: string;
  budget: string;
  propertyType: string;
  loanStatus: string;
  timeline: string;
  postedLabel: string;
}

const ACTIVE_DEMANDS: BuyerDemandCard[] = [
  {
    id: 'dem-meerut-modipuram',
    title: '120–180 Gaj Residential Plot near NH-58 Bypass',
    city: 'Meerut',
    locality: 'Modipuram / Pallavpuram',
    budget: '₹32 Lakh – ₹45 Lakh',
    propertyType: 'RESIDENTIAL PLOT',
    loanStatus: 'SBI Home Loan Pre-Approved',
    timeline: 'Ready to Register within 30 Days',
    postedLabel: 'Verified Desk Lead',
  },
  {
    id: 'dem-shamli-uday',
    title: '100–150 Gaj 143 Approved Gated Colony Plot',
    city: 'Shamli',
    locality: 'Bheswal Road / Collectorate',
    budget: '₹22 Lakh – ₹33 Lakh',
    propertyType: 'RESIDENTIAL PLOT',
    loanStatus: 'Cash + Bank Loan Ready',
    timeline: 'Site Visit This Week',
    postedLabel: 'Active Inquiry',
  },
  {
    id: 'dem-mzn-a2z',
    title: '3BHK Independent Kothi / Plot in Gated Society',
    city: 'Muzaffarnagar',
    locality: 'Gandhi Colony / A2Z / Roorkee Rd',
    budget: '₹45 Lakh – ₹65 Lakh',
    propertyType: 'VILLA / PLOT',
    loanStatus: 'HDFC Sanction Ready',
    timeline: 'Urgent Family Shifting',
    postedLabel: 'Verified Desk Lead',
  },
  {
    id: 'dem-meerut-ganga',
    title: '2BHK / 3BHK Builder Floor or RERA Flat',
    city: 'Meerut',
    locality: 'Ganga Nagar / Mawana Road',
    budget: '₹35 Lakh – ₹50 Lakh',
    propertyType: 'APARTMENT',
    loanStatus: 'Bank Financing Required',
    timeline: 'Immediate Inspection',
    postedLabel: 'Active Inquiry',
  },
];

interface BuyerDemandsSectionProps {
  liveDbDemands?: BuyerDemandCard[];
}

export default function BuyerDemandsSection({ liveDbDemands = [] }: BuyerDemandsSectionProps) {
  const allDemands = [...liveDbDemands, ...ACTIVE_DEMANDS].slice(0, 6);

  const [modalMode, setModalMode] = useState<'NONE' | 'BUYER_POST' | 'BROKER_PITCH'>('NONE');
  const [selectedDemand, setSelectedDemand] = useState<BuyerDemandCard | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Meerut');
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState('PLOT');
  const [budgetText, setBudgetText] = useState('₹25 Lakh – ₹40 Lakh');
  const [requirementText, setRequirementText] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openBuyerPost = () => {
    setSelectedDemand(null);
    setModalMode('BUYER_POST');
    setSuccessMsg('');
    setErrorMsg('');
  };

  const openBrokerPitch = (demand: BuyerDemandCard) => {
    setSelectedDemand(demand);
    setCity(demand.city);
    setLocality(demand.locality);
    setModalMode('BROKER_PITCH');
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/buyer-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: modalMode === 'BROKER_PITCH' ? 'BROKER_PITCH' : 'BUYER',
          name,
          phone,
          city,
          locality,
          propertyType,
          budgetText,
          requirementText,
          targetDemandTitle: selectedDemand?.title,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSuccessMsg(data.message);
      setName('');
      setPhone('');
      setRequirementText('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-700" />
              <span>Reverse Marketplace • Direct Buyer-Broker Match</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-forest-950 tracking-tight">
              Live Verified Buyer Requirements
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 max-w-2xl leading-relaxed">
              Active buyers seeking RERA &amp; 143-approved plots, kothis, and apartments across Western UP &amp; NCR.
              <strong className="text-forest-900"> Property dealers &amp; colonizers</strong> with matching inventory can pitch units directly to unlock buyer calls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openBuyerPost}
              className="px-5 py-3 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 text-gold-accent" />
              <span>Post Your Requirement FREE</span>
            </button>
            <Link
              href="/post-property"
              className="px-5 py-3 rounded-xl bg-gold-accent hover:bg-gold-500 text-forest-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>Brokers: List Colony Free</span>
            </Link>
          </div>
        </div>

        {/* Demand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {allDemands.map((demand) => (
            <div
              key={demand.id}
              className="bg-white rounded-2xl border border-charcoal-200 p-5 flex flex-col justify-between hover:border-forest-500 hover:shadow-lg transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    {demand.postedLabel}
                  </span>
                  <span className="text-[10px] font-bold text-charcoal-500 uppercase">
                    {demand.propertyType}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-forest-950 leading-snug group-hover:text-forest-700 transition-colors">
                  {demand.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-charcoal-600">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="truncate font-medium">
                      {demand.locality}, <strong>{demand.city}</strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <BadgeIndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold text-forest-900">{demand.budget}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                    <span className="text-[11px]">{demand.loanStatus}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-charcoal-100">
                <button
                  onClick={() => openBrokerPitch(demand)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 group-hover:bg-forest-900 text-forest-950 group-hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Have This Unit? Pitch Buyer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Broker Magnet Callout Strip */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-forest-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-accent/20 border border-gold-accent/40 flex items-center justify-center text-gold-accent shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                Are You a Property Dealer, Colonizer or Builder in Meerut, Shamli or Muzaffarnagar?
              </h4>
              <p className="text-xs text-forest-200 mt-0.5">
                List your 143 / RERA approved colony in 60 seconds and start receiving direct verified buyer inquiries from Google Search.
              </p>
            </div>
          </div>
          <Link
            href="/post-property"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gold-accent hover:bg-gold-500 text-forest-950 font-black text-xs uppercase tracking-wider transition-all"
          >
            Add Colony Now (Free) →
          </Link>
        </div>
      </div>

      {/* Modal for Buyer Requirement / Broker Pitch */}
      {modalMode !== 'NONE' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 relative animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setModalMode('NONE')}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-charcoal-500 hover:text-charcoal-800"
            >
              <X className="w-4 h-4" />
            </button>

            {successMsg ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-black text-forest-950">
                  {modalMode === 'BROKER_PITCH' ? 'Inventory Pitch Received!' : 'Requirement Published Live!'}
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">{successMsg}</p>
                {modalMode === 'BROKER_PITCH' && (
                  <Link
                    href="/post-property"
                    className="block w-full py-3 rounded-xl bg-gold-accent text-forest-950 font-black text-xs uppercase tracking-wider shadow-md"
                  >
                    Also Upload Full Property Photos Free →
                  </Link>
                )}
                <button
                  onClick={() => setModalMode('NONE')}
                  className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-forest-900 mb-1">
                  <ShieldCheck className="w-5 h-5 text-gold-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
                    {modalMode === 'BROKER_PITCH' ? 'Broker Priority Connect' : 'Verified Buyer Desk'}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-black text-forest-950">
                  {modalMode === 'BROKER_PITCH'
                    ? 'Pitch Your Matching Plot / Property'
                    : 'Tell Us What You Want to Buy'}
                </h3>
                {selectedDemand && (
                  <div className="mt-2 p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs text-forest-900">
                    <span className="font-bold block">Buyer Demand:</span>
                    {selectedDemand.title} ({selectedDemand.budget})
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                        {modalMode === 'BROKER_PITCH' ? 'Dealer / Builder Name *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={modalMode === 'BROKER_PITCH' ? 'e.g. Sharma Properties' : 'e.g. Rohit Kumar'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-300 text-sm focus:ring-2 focus:ring-forest-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                        Mobile / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-digit mobile"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-charcoal-300 text-sm focus:ring-2 focus:ring-forest-700 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                        City *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-charcoal-300 text-sm bg-white outline-none"
                      >
                        <option value="Meerut">Meerut</option>
                        <option value="Muzaffarnagar">Muzaffarnagar</option>
                        <option value="Shamli">Shamli</option>
                        <option value="Mohali">Mohali</option>
                        <option value="Gurugram">Gurugram</option>
                        <option value="Noida / Greater Noida">Noida / Greater Noida</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                        {modalMode === 'BROKER_PITCH' ? 'Asking Rate / Price' : 'Your Budget'}
                      </label>
                      <input
                        type="text"
                        value={budgetText}
                        onChange={(e) => setBudgetText(e.target.value)}
                        placeholder="e.g. ₹22,000/Gaj or ₹30L"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-300 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                      {modalMode === 'BROKER_PITCH'
                        ? 'Colony / Project Name & Plot Sizes Available *'
                        : 'Locality & Plot Size / Flat Need'}
                    </label>
                    <textarea
                      rows={3}
                      required={modalMode === 'BROKER_PITCH'}
                      value={requirementText}
                      onChange={(e) => setRequirementText(e.target.value)}
                      placeholder={
                        modalMode === 'BROKER_PITCH'
                          ? 'e.g. Modipuram NH-58, 120 Gaj & 150 Gaj 143-approved corner plots ready for registry...'
                          : 'e.g. Need 150 Gaj East-facing plot near Modipuram or Bheswal Road with bank loan...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-300 text-sm outline-none resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching Alert...</span>
                      </>
                    ) : (
                      <span>
                        {modalMode === 'BROKER_PITCH'
                          ? 'Send Offer & Connect with Buyer →'
                          : 'Submit Requirement Free →'}
                      </span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
