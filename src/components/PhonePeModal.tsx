'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Smartphone,
  QrCode,
  ArrowRight,
  Sparkles,
  AlertCircle,
  X,
  Lock,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';
import { SITE_CONTACT } from '@/config/siteContact';

interface PhonePeModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType?: 'SUBSCRIPTION' | 'PROPERTY_BOOST' | 'TRUTH_SCORE' | 'BUYER_PASS' | 'LEAD_UNLOCK';
  planId?: string;
  planName?: string;
  amount: number;
  billingCycle?: 'MONTHLY' | 'YEARLY';
  targetSlug?: string;
}

export default function PhonePeModal({
  isOpen,
  onClose,
  itemType = 'SUBSCRIPTION',
  planId = 'PROFESSIONAL',
  planName = 'Professional Broker Plan',
  amount,
  billingCycle = 'MONTHLY',
  targetSlug,
}: PhonePeModalProps) {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('9368593249');
  const [utrNumber, setUtrNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const upiId = SITE_CONTACT.upiId || '9368593249@ybl';
  const payeeName = 'EstateOS Technologies';
  const cleanAmount = Number(amount) || 499;

  // Official NPCI Standard UPI Intent URI (Never opens a web link, directly triggers PhonePe/GPay app)
  const upiIntentUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${cleanAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(planName)}`;

  // High-Resolution Scannable Bharat QR Code (Encodes the pure upi:// protocol)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&margin=8&data=${encodeURIComponent(
    upiIntentUri
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLaunchMobileApp = (appScheme?: string) => {
    let targetUri = upiIntentUri;
    if (appScheme === 'phonepe') {
      targetUri = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(
        payeeName
      )}&am=${cleanAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(planName)}`;
    }
    window.location.href = targetUri;
  };

  const handleConfirmPayment = async () => {
    setIsVerifying(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/upi/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cleanAmount,
          planId,
          planName,
          itemType,
          utrNumber,
          customerPhone: mobileNumber,
          billingCycle,
          targetSlug,
        }),
      });

      const data = await res.json();

      if (data.success) {
        onClose();
        router.push(
          `/payment-success?txnId=${encodeURIComponent(data.txnId)}&amount=${cleanAmount}&itemType=${encodeURIComponent(
            itemType
          )}&planId=${encodeURIComponent(planId)}&invoiceNo=${encodeURIComponent(
            data.invoiceNo
          )}&targetSlug=${encodeURIComponent(targetSlug || '')}`
        );
      } else {
        setErrorMessage(data.error || 'Verification failed. Please check details.');
        setIsVerifying(false);
      }
    } catch (err) {
      console.error('Confirmation error:', err);
      setErrorMessage('Network error confirming payment.');
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative my-auto">
        {/* Header with PhonePe Accent */}
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-purple-700 text-2xl shadow-md">
              पे
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-purple-200">
                Official PhonePe & Bharat UPI Gateway
              </div>
              <h3 className="text-lg font-extrabold text-white">Scan & Pay via PhonePe / GPay</h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Order Details Banner */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">Selected Item</div>
              <div className="font-bold text-white text-sm">{planName}</div>
              <div className="text-[10px] text-purple-400 capitalize">{billingCycle.toLowerCase()} Billing</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400">Total Payable</div>
              <div className="text-2xl font-black text-emerald-400">{formatCurrencyINR(cleanAmount)}</div>
            </div>
          </div>

          {/* Genuine Dynamic UPI QR Code Box */}
          <div className="bg-white rounded-2xl p-5 text-slate-900 flex flex-col items-center shadow-xl border-2 border-purple-400/40 relative">
            <div className="flex items-center gap-2 mb-2 text-xs font-extrabold text-purple-900 uppercase tracking-wider">
              <QrCode className="w-4 h-4 text-purple-700" />
              <span>Official Bharat UPI Dynamic QR</span>
            </div>

            {/* Scannable Real QR Image */}
            <div className="relative w-56 h-56 bg-white rounded-xl p-2 border border-slate-200 shadow-inner flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt={`Scan to Pay ₹${cleanAmount} to ${upiId}`}
                className="w-full h-full object-contain rounded-lg"
              />
              {/* Center PhonePe Brand Watermark Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-purple-700 border-2 border-white flex items-center justify-center text-white font-black text-base shadow-lg">
                  पे
                </div>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-[12px] font-bold text-slate-700 mt-3 text-center">
              Open <span className="text-purple-700 font-extrabold">PhonePe</span>, <span className="text-blue-600 font-extrabold">Google Pay</span>, or <span className="text-sky-600 font-extrabold">Paytm</span> scanner to pay directly.
            </p>
            <p className="text-[10px] text-slate-500 text-center">
              (Direct UPI protocol — No website link will appear upon scanning)
            </p>
          </div>

          {/* Mobile Instant 1-Tap Payment Buttons (Shown prominent on phones) */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">
              Or Pay Directly in Mobile App:
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleLaunchMobileApp('phonepe')}
                className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <div className="w-4 h-4 rounded-full bg-white text-purple-700 font-black text-[9px] flex items-center justify-center">
                  पे
                </div>
                <span>Open PhonePe App</span>
              </button>

              <button
                type="button"
                onClick={() => handleLaunchMobileApp()}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Any UPI App</span>
              </button>
            </div>
          </div>

          {/* Manual UPI ID Copy Option */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Verified Merchant UPI ID
              </div>
              <div className="font-mono text-xs text-purple-300 font-bold">{upiId}</div>
            </div>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* UTR / Reference Confirmation Box */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300">
              UPI Reference / UTR Number (Optional after payment):
            </label>
            <input
              type="text"
              maxLength={16}
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
              placeholder="e.g. 4312XXXXXXXX or leave blank"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono tracking-wider focus:outline-none focus:border-purple-500"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit / Confirm Button */}
          <button
            type="button"
            onClick={handleConfirmPayment}
            disabled={isVerifying}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Confirming & Generating Tax Invoice...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>I Have Paid ₹{cleanAmount} — Activate Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </>
            )}
          </button>

          {/* Trust Footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>NPCI Unified Payments Interface (UPI) Certified Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
