'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled platform exception:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-charcoal-200 p-8 text-center shadow-xl space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="font-serif font-black text-2xl text-forest-950">
          Application Notice
        </h2>

        <p className="text-xs text-charcoal-600 leading-relaxed">
          We encountered an unexpected operational condition. Our continuous reliability telemetry has logged this event.
        </p>

        {error.digest && (
          <p className="text-[10px] font-mono text-charcoal-400 bg-slate-50 py-1 px-2 rounded border border-charcoal-100">
            Error ID: {error.digest}
          </p>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-accent" />
            <span>Retry Action</span>
          </button>
          <Link
            href="/"
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-charcoal-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
