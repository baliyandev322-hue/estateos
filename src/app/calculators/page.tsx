'use client';

import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Building,
  Scale,
  Percent,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { formatCurrencyINR, formatNumberINR } from '@/lib/utils';
import AdSenseBanner from '@/components/AdSenseBanner';
import HomeLoanApplyModal from '@/components/HomeLoanApplyModal';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'emi' | 'eligibility' | 'stamp' | 'yield' | 'buyvsrent' | 'carpet'>('emi');
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);

  // --- 1. EMI CALCULATOR STATE ---
  const [emiLoanAmount, setEmiLoanAmount] = useState(5000000); // ₹50 Lakhs
  const [emiInterestRate, setEmiInterestRate] = useState(8.5); // 8.5%
  const [emiTenureYrs, setEmiTenureYrs] = useState(20); // 20 years

  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = emiInterestRate / 12 / 100;
  const totalMonths = emiTenureYrs * 12;
  const emiMonthly = Math.round(
    (emiLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emiMonthly * totalMonths;
  const totalInterest = totalPayment - emiLoanAmount;

  // --- 2. ELIGIBILITY CALCULATOR STATE ---
  const [monthlyIncome, setMonthlyIncome] = useState(120000); // ₹1,20,000
  const [existingEmi, setExistingEmi] = useState(15000); // ₹15,000
  const [eligibilityTenure, setEligibilityTenure] = useState(20);
  const [eligibilityRate, setEligibilityRate] = useState(8.5);

  // Bank standard: FOIR = 50%
  const maxAvailableEmi = Math.max(0, monthlyIncome * 0.5 - existingEmi);
  const eligMonthlyRate = eligibilityRate / 12 / 100;
  const eligTotalMonths = eligibilityTenure * 12;
  const eligibleLoanAmount = Math.round(
    (maxAvailableEmi * (Math.pow(1 + eligMonthlyRate, eligTotalMonths) - 1)) /
      (eligMonthlyRate * Math.pow(1 + eligMonthlyRate, eligTotalMonths))
  );

  // --- 3. STAMP DUTY CALCULATOR STATE ---
  const [propertyCost, setPropertyCost] = useState(7500000); // ₹75 Lakhs
  const [selectedState, setSelectedState] = useState<'punjab' | 'haryana' | 'karnataka' | 'maharashtra' | 'delhi'>('punjab');
  const [gender, setGender] = useState<'male' | 'female' | 'joint'>('male');

  const STAMP_RATES: Record<string, { male: number; female: number; joint: number; regFeePercent: number }> = {
    punjab: { male: 7.0, female: 6.0, joint: 6.5, regFeePercent: 1.0 },
    haryana: { male: 7.0, female: 5.0, joint: 6.0, regFeePercent: 1.0 },
    karnataka: { male: 5.0, female: 5.0, joint: 5.0, regFeePercent: 1.0 },
    maharashtra: { male: 6.0, female: 5.0, joint: 6.0, regFeePercent: 1.0 },
    delhi: { male: 6.0, female: 4.0, joint: 5.0, regFeePercent: 1.0 },
  };

  const stateData = STAMP_RATES[selectedState] || STAMP_RATES.punjab;
  const stampRatePercent = stateData[gender];
  const stampDutyAmount = Math.round((propertyCost * stampRatePercent) / 100);
  const registrationFee = Math.round((propertyCost * stateData.regFeePercent) / 100);
  const totalGovtCharges = stampDutyAmount + registrationFee;

  // --- 4. RENTAL YIELD STATE ---
  const [yieldPropValue, setYieldPropValue] = useState(8000000); // ₹80 Lakhs
  const [monthlyRent, setMonthlyRent] = useState(28000); // ₹28,000
  const [annualMaintenance, setAnnualMaintenance] = useState(36000); // ₹36,000
  const [annualPropertyTax, setAnnualPropertyTax] = useState(8000); // ₹8,000

  const grossAnnualRent = monthlyRent * 12;
  const netAnnualRent = grossAnnualRent - annualMaintenance - annualPropertyTax;
  const grossYield = ((grossAnnualRent / yieldPropValue) * 100).toFixed(2);
  const netYield = ((netAnnualRent / yieldPropValue) * 100).toFixed(2);

  // --- 5. BUY VS RENT STATE ---
  const [bvrPropPrice, setBvrPropPrice] = useState(9000000); // ₹90 Lakhs
  const [bvrMonthlyRent, setBvrMonthlyRent] = useState(30000); // ₹30,000
  const [bvrYears, setBvrYears] = useState(10); // 10 years

  const estimatedRentPaid10Yrs = Math.round(bvrMonthlyRent * 12 * bvrYears * 1.3); // with 7% rent escalation
  const estimatedAppreciatedValue = Math.round(bvrPropPrice * Math.pow(1 + 0.08, bvrYears)); // 8% p.a.

  // --- 6. CARPET AREA CALCULATOR STATE ---
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState(1800);
  const [loadingPercent, setLoadingPercent] = useState(25); // 25% loading
  const calculatedCarpetArea = Math.round(superBuiltUpArea / (1 + loadingPercent / 100));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4" />
            <span>Financial Engineering Suite</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            Property Financial Calculators
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Validated Indian real estate financial models with statutory stamp duties, banking formulas, and tax optimization benchmarks.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'emi', name: 'Home Loan EMI', icon: Calculator },
            { id: 'eligibility', name: 'Loan Eligibility', icon: DollarSign },
            { id: 'stamp', name: 'Stamp Duty & Registration', icon: Building },
            { id: 'yield', name: 'Rental Yield & ROI', icon: TrendingUp },
            { id: 'buyvsrent', name: 'Buy vs Rent', icon: Scale },
            { id: 'carpet', name: 'Carpet Area Converter', icon: Percent },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-forest-900 text-white shadow-md border border-forest-700'
                    : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-forest-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-accent' : 'text-charcoal-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Calculator Display Panel */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-10 shadow-lg">
          {/* TAB 1: HOME LOAN EMI */}
          {activeTab === 'emi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif font-bold text-xl text-forest-950">
                  Home Loan EMI Calculator
                </h2>

                <div>
                  <div className="flex justify-between text-xs font-bold text-charcoal-700 mb-2">
                    <span>Loan Amount (₹)</span>
                    <span className="text-forest-900">{formatCurrencyINR(emiLoanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="100000"
                    value={emiLoanAmount}
                    onChange={(e) => setEmiLoanAmount(Number(e.target.value))}
                    className="w-full accent-forest-900"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
                    <span>₹5 Lakh</span>
                    <span>₹5 Crore</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-charcoal-700 mb-2">
                    <span>Interest Rate (% p.a.)</span>
                    <span className="text-forest-900">{emiInterestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="6.5"
                    max="14.0"
                    step="0.1"
                    value={emiInterestRate}
                    onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                    className="w-full accent-forest-900"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
                    <span>6.5%</span>
                    <span>14.0%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-charcoal-700 mb-2">
                    <span>Loan Tenure (Years)</span>
                    <span className="text-forest-900">{emiTenureYrs} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={emiTenureYrs}
                    onChange={(e) => setEmiTenureYrs(Number(e.target.value))}
                    className="w-full accent-forest-900"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
                    <span>5 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 text-xs text-forest-900 leading-relaxed">
                  <strong>Tax Deduction Alert:</strong> Under Section 24(b), you can claim up to ₹2 Lakh annual interest deduction, plus ₹1.5 Lakh under Section 80C for principal repayment.
                </div>
              </div>

              <div className="lg:col-span-5 bg-forest-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent">
                    Estimated Monthly EMI
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-black text-white mt-2">
                    {formatCurrencyINR(emiMonthly)}
                    <span className="text-xs font-sans text-forest-300 font-normal"> /month</span>
                  </p>

                  <div className="mt-8 space-y-3 text-xs border-t border-forest-800 pt-6">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Principal Amount:</span>
                      <span className="font-bold text-white">{formatCurrencyINR(emiLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Total Interest Payable:</span>
                      <span className="font-bold text-gold-light">{formatCurrencyINR(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-forest-800">
                      <span className="text-forest-200 font-bold">Total Amount Payable:</span>
                      <span className="font-serif font-black text-sm text-white">{formatCurrencyINR(totalPayment)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setIsLoanModalOpen(true)}
                    className="w-full py-3 px-4 rounded-xl bg-gold-accent hover:bg-gold-light text-forest-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>⚡ Check Instant Bank Pre-Sanction (Lowest 8.35%)</span>
                  </button>
                  <div className="text-[10px] text-forest-400">
                    *Calculated via reducing balance amortization. Direct tie-ups with HDFC, SBI, ICICI, Axis Bank.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOAN ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif font-bold text-xl text-forest-950">
                  Home Loan Eligibility Calculator
                </h2>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                    Net Monthly In-Hand Salary / Income (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                    Existing Monthly Loan EMIs (₹)
                  </label>
                  <input
                    type="number"
                    value={existingEmi}
                    onChange={(e) => setExistingEmi(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2.5 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Desired Tenure (Years)
                    </label>
                    <input
                      type="number"
                      value={eligibilityTenure}
                      onChange={(e) => setEligibilityTenure(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={eligibilityRate}
                      onChange={(e) => setEligibilityRate(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-forest-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent">
                    Maximum Eligible Home Loan
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-black text-white mt-2">
                    {formatCurrencyINR(eligibleLoanAmount)}
                  </p>

                  <div className="mt-8 space-y-3 text-xs border-t border-forest-800 pt-6">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Max Permissible EMI:</span>
                      <span className="font-bold text-white">{formatCurrencyINR(maxAvailableEmi)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Standard Bank FOIR:</span>
                      <span className="font-bold text-gold-light">50% of In-hand Income</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setIsLoanModalOpen(true)}
                    className="w-full py-3 px-4 rounded-xl bg-gold-accent hover:bg-gold-light text-forest-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>⚡ Apply for ₹{formatCurrencyINR(eligibleLoanAmount)} Pre-Sanction</span>
                  </button>
                  <p className="text-[10px] text-forest-400">
                    *Subject to credit bureau CIBIL score &gt; 750 and title clearance of the mortgaged asset.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STAMP DUTY */}
          {activeTab === 'stamp' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif font-bold text-xl text-forest-950">
                  State Stamp Duty &amp; Registration Cost Calculator
                </h2>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                    Property Agreement Value / Circle Value (₹)
                  </label>
                  <input
                    type="number"
                    value={propertyCost}
                    onChange={(e) => setPropertyCost(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2.5 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      State / Jurisdiction
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value as any)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                    >
                      <option value="punjab">Punjab (Mohali)</option>
                      <option value="haryana">Haryana (Gurugram)</option>
                      <option value="karnataka">Karnataka (Bangalore)</option>
                      <option value="maharashtra">Maharashtra (Mumbai)</option>
                      <option value="delhi">Delhi NCT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Owner Classification
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                    >
                      <option value="male">Male Individual</option>
                      <option value="female">Female Individual (Rebate)</option>
                      <option value="joint">Joint (Male + Female)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-forest-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent">
                    Total Government Registration Charges
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-black text-white mt-2">
                    {formatCurrencyINR(totalGovtCharges)}
                  </p>

                  <div className="mt-8 space-y-3 text-xs border-t border-forest-800 pt-6">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Stamp Duty ({stampRatePercent}%):</span>
                      <span className="font-bold text-white">{formatCurrencyINR(stampDutyAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Registration Fee ({stateData.regFeePercent}%):</span>
                      <span className="font-bold text-white">{formatCurrencyINR(registrationFee)}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[10px] text-forest-400">
                  *Excludes advocate drafting and sub-registrar barcode computerization fees.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: RENTAL YIELD */}
          {activeTab === 'yield' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif font-bold text-xl text-forest-950">
                  Rental Yield &amp; Capitalization Rate
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Property Acquisition Cost (₹)
                    </label>
                    <input
                      type="number"
                      value={yieldPropValue}
                      onChange={(e) => setYieldPropValue(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Monthly Rental Income (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Annual Society Maintenance (₹)
                    </label>
                    <input
                      type="number"
                      value={annualMaintenance}
                      onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Annual Property Municipal Tax (₹)
                    </label>
                    <input
                      type="number"
                      value={annualPropertyTax}
                      onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-forest-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent">
                    Net Capitalization Yield
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-black text-emerald-400 mt-2">
                    {netYield}% <span className="text-xs font-sans text-forest-300">p.a.</span>
                  </p>

                  <div className="mt-8 space-y-3 text-xs border-t border-forest-800 pt-6">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Gross Rental Yield:</span>
                      <span className="font-bold text-white">{grossYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Net Annual Inflow:</span>
                      <span className="font-bold text-gold-light">{formatCurrencyINR(netAnnualRent)}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[10px] text-forest-400">
                  *Standard Indian residential metro average yields range between 2.8% to 4.5%. Commercial properties average 7.5% to 9.5%.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: BUY VS RENT */}
          {activeTab === 'buyvsrent' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif font-bold text-xl text-forest-950">
                  Buy vs Rent Strategic Decision Model
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Property Purchase Price (₹)
                    </label>
                    <input
                      type="number"
                      value={bvrPropPrice}
                      onChange={(e) => setBvrPropPrice(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                      Current Monthly Rent (₹)
                    </label>
                    <input
                      type="number"
                      value={bvrMonthlyRent}
                      onChange={(e) => setBvrMonthlyRent(Number(e.target.value))}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                    Time Horizon: {bvrYears} Years
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={bvrYears}
                    onChange={(e) => setBvrYears(Number(e.target.value))}
                    className="w-full accent-forest-900"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-forest-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent">
                    Estimated Asset Value in {bvrYears} Years
                  </span>
                  <p className="font-serif text-3xl font-black text-white mt-2">
                    {formatCurrencyINR(estimatedAppreciatedValue)}
                  </p>

                  <div className="mt-8 space-y-3 text-xs border-t border-forest-800 pt-6">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Total Rent Sunk (with 7% hike):</span>
                      <span className="font-bold text-red-300">{formatCurrencyINR(estimatedRentPaid10Yrs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-forest-300">Capital Appreciation Gain:</span>
                      <span className="font-bold text-emerald-400">+{formatCurrencyINR(estimatedAppreciatedValue - bvrPropPrice)}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[10px] text-forest-400">
                  *Assumes 8% annual property capital compounding vs 7% rental escalation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: CARPET AREA */}
          {activeTab === 'carpet' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif font-bold text-xl text-forest-950">
                  RERA Carpet Area vs Super Built-up Converter
                </h2>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1.5">
                    Super Built-up Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    value={superBuiltUpArea}
                    onChange={(e) => setSuperBuiltUpArea(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-charcoal-700 mb-2">
                    <span>Common Loading Percentage (%)</span>
                    <span className="text-forest-900">{loadingPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    step="1"
                    value={loadingPercent}
                    onChange={(e) => setLoadingPercent(Number(e.target.value))}
                    className="w-full accent-forest-900"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
                    <span>15% (Low Loading)</span>
                    <span>45% (High Rise Core)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-forest-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent">
                    Net Usable RERA Carpet Area
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-black text-white mt-2">
                    {calculatedCarpetArea} <span className="text-xs font-sans text-forest-300">sq.ft</span>
                  </p>

                  <div className="mt-8 space-y-3 text-xs border-t border-forest-800 pt-6">
                    <div className="flex justify-between">
                      <span className="text-forest-300">Common Core Deducted:</span>
                      <span className="font-bold text-white">{superBuiltUpArea - calculatedCarpetArea} sq.ft</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[10px] text-forest-400">
                  *Under Section 2(k) of RERA Act 2016, carpet area excludes external walls, common shafts, and corridors.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* AdSense Placement */}
        <AdSenseBanner slotId="calculators-page-lower-banner" />

        {/* Home Loan Pre-Sanction DSA Modal */}
        <HomeLoanApplyModal
          isOpen={isLoanModalOpen}
          onClose={() => setIsLoanModalOpen(false)}
          defaultLoanAmount={activeTab === 'eligibility' ? eligibleLoanAmount : emiLoanAmount}
        />
      </div>
    </div>
  );
}
