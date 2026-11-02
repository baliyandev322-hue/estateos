'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Percent,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
  Calculator,
  MessageCircle,
  Clock,
  FileCheck,
  BadgePercent,
  Check,
} from 'lucide-react';
import { formatCurrencyINR, formatNumberINR } from '@/lib/utils';
import { SITE_CONTACT } from '@/config/siteContact';

export default function HomeLoansClient() {
  const [loanAmount, setLoanAmount] = useState(4500000); // 45 Lakh
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.45);
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('85000');
  const [employmentType, setEmploymentType] = useState('SALARIED');
  const [city, setCity] = useState('Muzaffarnagar');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Math calculation
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  );
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  const partnerBanks = [
    {
      name: 'State Bank of India',
      rate: '8.40% – 8.65%',
      processingFee: 'Nil (Under Festival Offer)',
      maxTenure: '30 Years',
      feature: 'Lowest interest rates for salaried government & corporate professionals',
      logo: 'SBI',
    },
    {
      name: 'HDFC Bank',
      rate: '8.45% – 8.70%',
      processingFee: '0.25% (Waived via EstateOS)',
      maxTenure: '30 Years',
      feature: 'Fastest digital sanction in 48 hours with door-step document pickup',
      logo: 'HDFC',
    },
    {
      name: 'ICICI Bank',
      rate: '8.50% – 8.75%',
      processingFee: '0.25% (Pre-negotiated rebate)',
      maxTenure: '30 Years',
      feature: 'Instant pre-approved sanction for existing account holders & businessmen',
      logo: 'ICICI',
    },
    {
      name: 'Axis Bank',
      rate: '8.55% – 8.80%',
      processingFee: 'Nil for select profiles',
      maxTenure: '30 Years',
      feature: 'Flexible repayment & EMI waiver on consistent 12-month prompt repayment',
      logo: 'AXIS',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!applicantName || !phone || !monthlyIncome) {
      setError('Please fill in Name, Phone, and Monthly Income.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/dsa/loan-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName,
          phone,
          email,
          monthlyIncome,
          loanAmount,
          preferredBank: selectedBank,
          employmentType,
          cibilScoreRange: '750+',
          city,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit loan application');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error submitting application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider shadow-sm">
            <BadgePercent className="w-4 h-4" />
            <span>EstateOS Partner Banking Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-forest-950 tracking-tight leading-tight">
            Compare &amp; Secure Pre-Approved Home Loans from <span className="text-gold-accent">8.40%*</span>
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Direct partnerships with SBI, HDFC Bank, ICICI Bank &amp; Axis Bank. Doorstep documentation, 100% processing fee waiver, and fast 48-hour in-principle sanction.
          </p>
        </div>

        {/* 2. INTERACTIVE CALCULATOR & DIRECT APPLICATION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Calculator Section (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
              <h2 className="font-serif font-bold text-xl text-forest-950 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-forest-800" />
                <span>Instant EMI &amp; Eligibility Estimator</span>
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Live Rates 2026
              </span>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-charcoal-600">
                  Required Loan Amount
                </span>
                <span className="font-serif font-black text-lg text-forest-900">
                  {formatCurrencyINR(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={20000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-forest-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-charcoal-400 font-semibold">
                <span>₹10 Lakh</span>
                <span>₹1 Crore</span>
                <span>₹2 Crore</span>
              </div>
            </div>

            {/* Slider 2: Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-charcoal-600">
                  Loan Tenure (Duration)
                </span>
                <span className="font-bold text-base text-forest-900">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-forest-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-charcoal-400 font-semibold">
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-charcoal-600">
                  Interest Rate (% p.a.)
                </span>
                <span className="font-bold text-base text-emerald-700">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={8.0}
                max={12.0}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-charcoal-400 font-semibold">
                <span>8.0%</span>
                <span>10.0%</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Calculation Output Box */}
            <div className="bg-forest-950 text-white rounded-2xl p-6 border border-forest-800 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-forest-800">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-forest-300 font-bold block mb-1">
                    Monthly Loan EMI
                  </span>
                  <span className="font-serif font-black text-2xl sm:text-3xl text-gold-accent">
                    {formatCurrencyINR(emi)}
                  </span>
                  <span className="text-[10px] text-forest-400 block mt-0.5">/month</span>
                </div>

                <div className="pt-3 sm:pt-0 sm:pl-4">
                  <span className="text-[11px] uppercase tracking-wider text-forest-300 font-bold block mb-1">
                    Total Interest
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-white">
                    {formatCurrencyINR(totalInterest)}
                  </span>
                </div>

                <div className="pt-3 sm:pt-0 sm:pl-4">
                  <span className="text-[11px] uppercase tracking-wider text-forest-300 font-bold block mb-1">
                    Total Repayment
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-white">
                    {formatCurrencyINR(totalPayment)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Direct Intake Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200 shadow-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700">
                48-Hour In-Principle Sanction
              </span>
              <h2 className="font-serif font-bold text-2xl text-forest-950 mt-1">
                Apply for Pre-Approval
              </h2>
              <p className="text-xs text-charcoal-500 mt-1">
                Fill this 1-minute form to check highest loan sanction limit with zero impact on CIBIL.
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Pre-Approval Request Received!
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your application for <strong>{formatCurrencyINR(loanAmount)}</strong> ({selectedBank}) has been routed to our banking desk. A loan officer will connect on <strong>{phone}</strong> within 2 hours.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${SITE_CONTACT.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I just applied for ₹${(loanAmount / 100000).toFixed(0)} Lakh home loan on EstateOS. Please connect me with the bank manager.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Connect via WhatsApp Now</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-forest-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                      Monthly In-Hand *
                    </label>
                    <input
                      type="number"
                      required
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="e.g. 75000"
                      className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-forest-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 focus:outline-none"
                    >
                      <option value="SALARIED">Salaried Employee</option>
                      <option value="SELF_EMPLOYED">Self-Employed / Business</option>
                      <option value="PROFESSIONAL">Doctor / CA / Lawyer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Preferred Partner Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 focus:outline-none"
                  >
                    <option value="HDFC Bank">HDFC Bank (Fastest 48h Approval)</option>
                    <option value="State Bank of India">State Bank of India (Lowest Rates)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-gold-accent" />
                  <span>{loading ? 'Submitting Application...' : 'Get Instant In-Principle Sanction'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. PARTNER BANK COMPARISON MATRIX */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
              Top Partner Banks Rate Matrix
            </h2>
            <p className="text-xs text-charcoal-500 mt-1">
              Transparent interest rates, processing fees, and benefits negotiated for EstateOS buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBanks.map((bank) => (
              <div
                key={bank.name}
                className="bg-white rounded-2xl p-6 border border-charcoal-200 hover:border-gold-accent transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-xl bg-forest-950 text-gold-accent font-serif font-black text-sm flex items-center justify-center shadow">
                      {bank.logo}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      RERA Partner
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-forest-950">{bank.name}</h3>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between pb-2 border-b border-charcoal-100">
                      <span className="text-charcoal-500">Interest Rate:</span>
                      <strong className="text-emerald-700 font-bold">{bank.rate}</strong>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-charcoal-100">
                      <span className="text-charcoal-500">Processing Fee:</span>
                      <strong className="text-forest-950 text-[11px]">{bank.processingFee}</strong>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-charcoal-100">
                      <span className="text-charcoal-500">Max Tenure:</span>
                      <strong className="text-forest-950">{bank.maxTenure}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-charcoal-600 mt-4 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-charcoal-100">
                    {bank.feature}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedBank(bank.name);
                    window.scrollTo({ top: 150, behavior: 'smooth' });
                  }}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-forest-900 hover:text-white text-forest-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select &amp; Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. WHY APPLY THROUGH ESTATEOS DSA? */}
        <div className="bg-white rounded-3xl p-8 border border-charcoal-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center mx-auto sm:mx-0">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-forest-950">100% Zero Service Charge</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                EstateOS is an authorized institutional referral gateway. You never pay any fee to us — all services, doorstep visits, and approvals are 100% free.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center mx-auto sm:mx-0">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-forest-950">Doorstep Document Pickup</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                No need to stand in bank branch queues. The designated bank officer comes directly to your residence to verify salary slips and property registry papers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-forest-950">Direct RERA Title Audit</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Our Property Truth Score™ algorithms cross-verify sanction maps and encumbrance certificates with state records prior to bank legal disbursement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
