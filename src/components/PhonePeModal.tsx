'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

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
  const [mobileNumber, setMobileNumber] = useState('9368593249');
  const [isInitiating, setIsInitiating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handlePhonePePay = async () => {
    setIsInitiating(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/phonepe/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType,
          planId,
          billingCycle,
          customAmount: amount,
          mobileNumber,
          targetSlug,
        }),
      });

      const data = await res.json();

      if (data.success && data.redirectUrl) {
        // Direct redirection to official PhonePe Payment Gateway checkout page
        window.location.href = data.redirectUrl;
      } else {
        setErrorMessage(data.error || 'Failed to connect to PhonePe gateway. Please try again.');
        setIsInitiating(false);
      }
    } catch (err: any) {
      console.error('PhonePe checkout error:', err);
      setErrorMessage('Network error initiating PhonePe checkout.');
      setIsInitiating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        {/* Header with PhonePe Accent */}
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-purple-700 text-xl shadow-md">
              पे
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-purple-200">
                Official Payment Gateway
              </div>
              <h3 className="text-xl font-bold text-white">PhonePe Standard Checkout</h3>
            </div>
          </div>
          <p className="text-xs text-purple-100">
            Supports UPI (PhonePe, GPay, Paytm, BHIM), Dynamic QR, NetBanking & Cards.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Order Summary Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Order Summary</div>
              <div className="font-semibold text-white text-sm">{planName}</div>
              {itemType === 'SUBSCRIPTION' && (
                <div className="text-xs text-purple-400 capitalize">{billingCycle.toLowerCase()} Billing</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Total Payable</div>
              <div className="text-2xl font-black text-emerald-400">{formatCurrencyINR(amount)}</div>
            </div>
          </div>

          {/* Mobile Number for UPI Push Intent */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              WhatsApp / Mobile Number for UPI Push
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 font-mono tracking-wider"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              PhonePe app notification & payment receipt will be linked to this number.
            </p>
          </div>

          {/* Payment Features Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Instant UPI</div>
                <div className="text-[10px] text-slate-400">Auto-opens app</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Dynamic QR</div>
                <div className="text-[10px] text-slate-400">Scan & pay anywhere</div>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Checkout Submit Button */}
          <button
            onClick={handlePhonePePay}
            disabled={isInitiating || mobileNumber.length < 10}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isInitiating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Redirecting to PhonePe Secure Gateway...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-purple-200" />
                <span>Pay {formatCurrencyINR(amount)} via PhonePe</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Trust Security Footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Secured with PhonePe 256-Bit Bank Grade Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
