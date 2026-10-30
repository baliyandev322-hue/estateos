import React from 'react';
import Link from 'next/link';
import { Compass, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-charcoal-200 p-8 text-center shadow-xl space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto border border-forest-200">
          <Compass className="w-7 h-7 text-gold-accent" />
        </div>

        <h2 className="font-serif font-black text-2xl text-forest-950">
          Property or Page Not Found
        </h2>

        <p className="text-xs text-charcoal-600 leading-relaxed">
          The requested property listing, locality report, or guide could not be located on the EstateOS registry.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <Link
            href="/properties"
            className="flex-1 py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-gold-accent" />
            <span>Search Listings</span>
          </Link>
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
