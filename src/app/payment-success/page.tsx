'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Sparkles,
  PhoneCall,
  Home,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const txnId = searchParams?.get('txnId') || `EOS_${Date.now()}`;
  const amount = searchParams?.get('amount') || '499';
  const itemType = searchParams?.get('itemType') || 'SUBSCRIPTION';
  const planId = searchParams?.get('planId') || 'STARTER';
  const invoiceNo = searchParams?.get('invoiceNo') || `INV-PHPE-${Date.now().toString().slice(-6)}`;
  const targetSlug = searchParams?.get('targetSlug');

  const itemName =
    itemType === 'PROPERTY_BOOST'
      ? '7-Day Top Search Property Boost'
      : itemType === 'TRUTH_SCORE'
      ? 'Property Truth Score™ Legal Audit Report'
      : itemType === 'BUYER_PASS'
      ? 'Zero-Brokerage Direct Owner Pass'
      : itemType === 'LEAD_UNLOCK'
      ? 'Verified Buyer Lead Contact Unlock'
      : `${planId} Broker SaaS Membership`;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-16 flex-1 w-full">
        {/* Success Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Icon */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400 mb-2">
              Payment Confirmed via PhonePe
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-slate-400 mt-2 text-base">
              Your transaction has been securely processed and verified.
            </p>
          </div>

          {/* Receipt Breakdown Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-200">Payment Receipt</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Invoice: {invoiceNo}</span>
            </div>

            <div className="divide-y divide-slate-800/60 text-sm">
              <div className="py-3 flex justify-between">
                <span className="text-slate-400">Item Purchased</span>
                <span className="font-medium text-white">{itemName}</span>
              </div>

              <div className="py-3 flex justify-between">
                <span className="text-slate-400">Amount Paid</span>
                <span className="font-bold text-lg text-emerald-400">
                  ₹{Number(amount).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="py-3 flex justify-between">
                <span className="text-slate-400">Payment Gateway</span>
                <span className="font-medium text-purple-400">PhonePe (UPI / QR / NetBanking)</span>
              </div>

              <div className="py-3 flex justify-between">
                <span className="text-slate-400">Transaction ID</span>
                <span className="font-mono text-xs text-slate-300 break-all">{txnId}</span>
              </div>

              <div className="py-3 flex justify-between">
                <span className="text-slate-400">Date & Time</span>
                <span className="text-slate-300">{new Date().toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
            >
              <Download className="w-4 h-4" />
              Print / Save Tax Invoice
            </button>

            {targetSlug ? (
              <Link
                href={`/property/${targetSlug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20"
              >
                View Boosted Property
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/dashboard/agent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition shadow-lg shadow-purple-600/30"
              >
                Go to Agent Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Trust Banner */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted & Certified by EstateOS Trust Protocol</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          Loading receipt...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
