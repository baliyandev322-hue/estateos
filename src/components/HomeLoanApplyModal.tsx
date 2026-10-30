'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Building2,
  CheckCircle2,
  Percent,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  X,
  CreditCard,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface HomeLoanApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLoanAmount?: number;
  propertyTitle?: string;
  propertyPrice?: number;
  city?: string;
}

export default function HomeLoanApplyModal({
  isOpen,
  onClose,
  defaultLoanAmount = 6000000,
  propertyTitle,
  propertyPrice,
  city,
}: HomeLoanApplyModalProps) {
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(125000);
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [preferredBank, setPreferredBank] = useState('HDFC Bank');
  const [employmentType, setEmploymentType] = useState('SALARIED');
  const [cibilScoreRange, setCibilScoreRange] = useState('750+');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          preferredBank,
          employmentType,
          cibilScoreRange,
          propertyTitle,
          propertyPrice,
          city,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessData(data);
      } else {
        alert(data.error || 'Failed to submit loan request');
      }
    } catch (err) {
      alert('Error submitting loan application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 relative animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-charcoal-400 hover:text-charcoal-700"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>98% High Pre-Approval Probability</span>
            </div>

            <h3 className="font-serif font-black text-2xl text-forest-950">
              Pre-Approval Application Dispatched!
            </h3>

            <p className="text-xs text-charcoal-600 leading-relaxed max-w-md mx-auto">
              Your home loan request for <strong>{formatCurrencyINR(loanAmount)}</strong> has been routed to the priority desk of <strong>{preferredBank}</strong>.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-charcoal-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Applicant:</span>
                <strong className="text-forest-950">{applicantName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Indicative Rate:</span>
                <strong className="text-emerald-700 font-bold">8.35% – 8.50% p.a.*</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Processing Fee Rebate:</span>
                <strong className="text-gold-700 font-bold">100% Waived via EstateOS Partner DSA</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-forest-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md"
            >
              Done &amp; Return to Property
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-forest-900">
              <div className="w-9 h-9 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-forest-950">
                  Instant Home Loan Pre-Sanction
                </h3>
                <p className="text-[11px] text-charcoal-500">
                  Partner Banks: SBI • HDFC • ICICI • Axis • Tata Capital (Interest from 8.35%*)
                </p>
              </div>
            </div>

            {propertyTitle && (
              <div className="my-3 p-2.5 bg-forest-50 border border-forest-100 rounded-xl text-xs text-forest-900 font-medium truncate">
                Target Property: <strong>{propertyTitle}</strong>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 text-charcoal-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Net In-Hand Salary / Mo (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                    Required Loan Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-charcoal-700 uppercase mb-1">
                    Preferred Bank
                  </label>
                  <select
                    value={preferredBank}
                    onChange={(e) => setPreferredBank(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-2 py-2"
                  >
                    <option>HDFC Bank</option>
                    <option>State Bank of India</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Tata Capital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-charcoal-700 uppercase mb-1">
                    Employment
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-2 py-2"
                  >
                    <option value="SALARIED">Salaried</option>
                    <option value="SELF_EMPLOYED_BUSINESS">Business</option>
                    <option value="PROFESSIONAL">Doctor/CA/Lawyer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-charcoal-700 uppercase mb-1">
                    CIBIL Score
                  </label>
                  <select
                    value={cibilScoreRange}
                    onChange={(e) => setCibilScoreRange(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-2 py-2"
                  >
                    <option>750+ (Excellent)</option>
                    <option>700-750 (Good)</option>
                    <option>650-700 (Average)</option>
                    <option>New to Credit</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Spam Guarantee:</strong> Your information is strictly routed only to accredited banking officers of {preferredBank}. No telemarketing syndicates.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-gold-accent font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Submitting to Bank Desk...' : 'Submit Application for Instant Sanction'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
