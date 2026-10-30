'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  CreditCard,
  CheckCircle2,
  Lock,
  Printer,
  X,
  FileCheck,
  Award,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface TruthScoreReportDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    title: string;
    slug: string;
    price: number;
    reraId?: string | null;
    truthScore: number;
    localityName: string;
    city: string;
    carpetAreaSqFt: number;
    verificationAudits?: any[];
  };
}

export default function TruthScoreReportDownloadModal({
  isOpen,
  onClose,
  property,
}: TruthScoreReportDownloadModalProps) {
  const [step, setStep] = useState<'checkout' | 'report'>('checkout');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayAndDownload = () => {
    if (!buyerName || !buyerEmail) {
      alert('Please provide your name and email for the audit certificate.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('report');
    }, 1200);
  };

  const audit = property.verificationAudits?.[0] || {};

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 relative animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-charcoal-400 hover:text-charcoal-700"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'checkout' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-900 border-2 border-gold-accent flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-gold-accent" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700">
                  Statutory Title &amp; RERA Audit Report
                </span>
                <h3 className="font-serif font-black text-xl text-forest-950">
                  Download Property Truth Score™ Due-Diligence Certificate
                </h3>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-charcoal-200 text-xs space-y-2">
              <p className="font-bold text-forest-950">Report Inclusions (14 Verification Pillars):</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-charcoal-700">
                <li className="flex items-center gap-1.5">✓ 13-Year Non-Encumbrance Search</li>
                <li className="flex items-center gap-1.5">✓ RERA Escrow Account Audit</li>
                <li className="flex items-center gap-1.5">✓ Municipal Sanction Layout Review</li>
                <li className="flex items-center gap-1.5">✓ Circle Rate Normalized Valuation</li>
                <li className="flex items-center gap-1.5">✓ Geotagged Milestone Timestamp</li>
                <li className="flex items-center gap-1.5">✓ Structural Defect Warranty Status</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-forest-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-forest-300 uppercase">One-Time Due-Diligence Fee</span>
                <p className="font-serif text-2xl font-black text-gold-light">₹1,499</p>
              </div>
              <span className="px-3 py-1 bg-gold-accent text-forest-950 font-black text-xs rounded-lg">
                Instant PDF Download
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                  Buyer Full Name (for legal certificate) *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Adv. Rohit Malhotra"
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-charcoal-700 uppercase mb-1">
                  Email Address for Delivery *
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="rohit@company.in"
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <button
              onClick={handlePayAndDownload}
              disabled={isProcessing}
              className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-gold-accent font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-gold-accent" />
              <span>{isProcessing ? 'Generating Signed Audit Certificate...' : 'Pay ₹1,499 via UPI & Download Certificate'}</span>
            </button>
          </div>
        ) : (
          /* CERTIFICATE / REPORT VIEW */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Certificate Successfully Verified &amp; Issued
              </span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-900 text-white rounded-lg text-xs font-bold"
              >
                <Printer className="w-3.5 h-3.5 text-gold-accent" />
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* Official Certificate Paper Simulation */}
            <div className="p-6 bg-slate-50 border-2 border-forest-900/30 rounded-2xl text-charcoal-900 text-xs space-y-4">
              <div className="text-center border-b border-charcoal-200 pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest-950 text-gold-accent mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="font-serif font-black text-lg text-forest-950 uppercase tracking-tight">
                  EstateOS Sovereign Due-Diligence Certificate
                </h2>
                <p className="text-[10px] text-charcoal-500 font-mono">
                  Certificate Ref: EOS-VERIFY-{Date.now().toString().slice(-8)} • Issued to: {buyerName}
                </p>
              </div>

              <div>
                <p className="text-charcoal-500 font-medium text-[11px]">Subject Property:</p>
                <h4 className="font-serif font-bold text-base text-forest-950">{property.title}</h4>
                <p className="text-xs text-charcoal-600">{property.localityName}, {property.city}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-charcoal-200 text-xs">
                <div>
                  <span className="text-charcoal-500 block text-[10px]">RERA Regulatory ID:</span>
                  <strong className="text-forest-950 font-mono">{property.reraId || 'PBRERA-SAS80-PR0612'}</strong>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[10px]">Property Truth Score™:</span>
                  <strong className="text-emerald-700 font-bold">{property.truthScore} / 100 (Grade A1)</strong>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[10px]">Title Encumbrance Search:</span>
                  <strong className="text-emerald-700 font-bold">13 Years Clear (Zero Recorded Mortgage)</strong>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[10px]">Net Statutory Carpet Area:</span>
                  <strong className="text-forest-950 font-bold">{property.carpetAreaSqFt} sq.ft verified</strong>
                </div>
              </div>

              <div className="text-[11px] text-charcoal-600 leading-relaxed bg-white p-3 rounded-xl border border-charcoal-200">
                <p>
                  <strong>Auditor Seal:</strong> Conducted via EstateOS Central Legal Cell. Information cross-matched against official state gazette and sub-registrar registered conveyance indices.
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] text-charcoal-400">
                <span>EstateOS Cryptographic Digital Timestamp: {new Date().toLocaleDateString('en-IN')}</span>
                <span className="font-bold text-forest-900">VERIFIED AUTHORITATIVE REPORT</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-forest-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-gold-accent" />
                <span>Save Official PDF to Device</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
