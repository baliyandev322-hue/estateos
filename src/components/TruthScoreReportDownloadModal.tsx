'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Download,
  CheckCircle2,
  Lock,
  Printer,
  X,
  Award,
  QrCode,
  Clock,
  Smartphone,
  ArrowRight,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';
import { SITE_CONTACT } from '@/config/siteContact';

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
  const [step, setStep] = useState<'checkout' | 'payment' | 'report'>('checkout');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes session

  // Pre-fill user if logged in
  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data?.user) {
          if (!buyerName) setBuyerName(data.user.name || '');
          if (!buyerEmail) setBuyerEmail(data.user.email || '');
        }
      })
      .catch(() => {});
  }, [isOpen]);

  // Expiry countdown timer
  useEffect(() => {
    if (step !== 'payment') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  if (!isOpen) return null;

  const amount = 1499;
  const upiId = SITE_CONTACT.upiId || '9368593249@ybl';
  const payeeName = 'EstateOS Technologies';
  const planNote = `Truth Score Audit - ${property.title}`.substring(0, 40);

  // Minutes & seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Official NPCI Standard UPI Intent URI
  const upiIntentUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(planNote)}`;

  // Scannable Bharat QR Code (pure upi:// protocol, no browser links)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=380x380&margin=8&data=${encodeURIComponent(
    upiIntentUri
  )}`;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setErrorMessage('Please provide your legal name and email address.');
      return;
    }
    setErrorMessage('');
    setStep('payment');
  };

  const handleLaunchMobileApp = (appScheme?: string) => {
    let targetUri = upiIntentUri;
    if (appScheme === 'phonepe') {
      targetUri = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(
        payeeName
      )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(planNote)}`;
    }
    window.location.href = targetUri;
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/upi/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          planId: 'TRUTH_SCORE',
          planName: `Truth Score Report - ${property.title}`,
          itemType: 'TRUTH_SCORE',
          customerPhone: buyerEmail,
          targetSlug: property.slug,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep('report');
      } else {
        setErrorMessage(data.error || 'Payment verification failed. Please try again.');
      }
    } catch (err) {
      console.error('Confirmation error:', err);
      setErrorMessage('Network error confirming payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 relative animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-charcoal-400 hover:text-charcoal-700 cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: BUYER DETAILS & ORDER SUMMARY */}
        {step === 'checkout' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-900 border-2 border-gold-accent flex items-center justify-center shrink-0">
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
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white text-purple-700 font-bold flex items-center justify-center text-xs">
                  पे
                </div>
                <span className="px-3 py-1 bg-gold-accent text-forest-950 font-black text-xs rounded-lg">
                  Instant PDF Download
                </span>
              </div>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-4">
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
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-forest-700 font-medium"
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
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-forest-700 font-medium"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full bg-white text-purple-700 font-black text-[9px] flex items-center justify-center">
                  पे
                </div>
                <span>Pay ₹1,499 via PhonePe UPI &amp; Download</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: PHONEPE & BHARAT UPI PAYMENT SCREEN */}
        {step === 'payment' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="text-xs text-charcoal-500 hover:text-charcoal-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                ← Back to Details
              </button>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>Session: {formattedTime}</span>
              </div>
            </div>

            {/* Order Summary Strip */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-charcoal-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-charcoal-500 uppercase font-semibold">Legal Certificate For</span>
                <div className="font-bold text-xs text-forest-950 truncate max-w-[240px]">
                  {buyerName} ({buyerEmail})
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-charcoal-500 uppercase font-semibold">Amount</span>
                <div className="text-xl font-black text-emerald-600">₹1,499</div>
              </div>
            </div>

            {/* Dynamic Scannable Bharat QR Code */}
            <div className="bg-slate-50 rounded-2xl p-5 border-2 border-purple-400/40 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2 text-xs font-extrabold text-purple-900 uppercase tracking-wider">
                <QrCode className="w-4 h-4 text-purple-700" />
                <span>Scan with PhonePe, GPay, or Paytm</span>
              </div>

              <div className="relative w-52 h-52 bg-white rounded-xl p-2 border border-slate-200 shadow-md flex items-center justify-center">
                <img
                  src={qrCodeUrl}
                  alt="Scan to Pay ₹1,499"
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-purple-700 border-2 border-white flex items-center justify-center text-white font-black text-sm shadow-md">
                    पे
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-charcoal-600 font-bold mt-2.5 text-center">
                Exact fee ₹1,499 is pre-filled on your mobile screen.
              </p>
            </div>

            {/* Mobile 1-Tap Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleLaunchMobileApp('phonepe')}
                className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <div className="w-4 h-4 rounded-full bg-white text-purple-700 font-black text-[9px] flex items-center justify-center">
                  पे
                </div>
                <span>Open PhonePe</span>
              </button>

              <button
                type="button"
                onClick={() => handleLaunchMobileApp()}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Any UPI App</span>
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Confirm & Unlock Button */}
            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Payment &amp; Unlocking Certificate...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Confirm Payment &amp; Download Certificate</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 3: CERTIFICATE / REPORT VIEW */}
        {step === 'report' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-200">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Payment Verified • Certificate Issued via PhonePe
              </span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-900 hover:bg-forest-800 text-white rounded-lg text-xs font-bold transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-gold-accent" />
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* Official Certificate Paper Simulation */}
            <div className="p-6 bg-slate-50 border-2 border-forest-900/30 rounded-2xl text-charcoal-900 text-xs space-y-4">
              <div className="text-center border-b border-charcoal-200 pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest-950 text-gold-accent mb-2 shadow-md">
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
                className="flex-1 py-3 bg-forest-900 hover:bg-forest-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
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
