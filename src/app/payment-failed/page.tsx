'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, RotateCcw, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const txnId = searchParams?.get('txnId') || 'N/A';
  const reason = searchParams?.get('reason') || 'Transaction was declined or cancelled.';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-16 flex-1 w-full">
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 mb-4">
            <AlertCircle className="w-10 h-10" />
          </div>

          <div className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-xs font-semibold text-rose-400 mb-2">
            Payment Not Completed
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Transaction Incomplete
          </h1>

          <p className="text-slate-400 mt-2 text-sm max-w-md mx-auto">
            {reason}. No money was deducted from your account. If deducted, it will be refunded automatically by your bank within 24-48 hours.
          </p>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 my-6 text-xs font-mono text-slate-400 text-left">
            <div><span className="text-slate-500">Ref ID:</span> {txnId}</div>
            <div className="mt-1"><span className="text-slate-500">Gateway:</span> PhonePe Payment Gateway (UPI / QR)</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-lg shadow-purple-600/30"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again with PhonePe
            </Link>

            <a
              href="https://wa.me/919368593249?text=Hello%20EstateOS%20Support,%20my%20PhonePe%20payment%20failed."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              WhatsApp Helpdesk
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}
