import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      {/* Luxury Brand Monogram Pulse */}
      <div className="relative flex items-center justify-center">
        {/* Soft Glowing Ring */}
        <div className="w-16 h-16 rounded-2xl bg-forest-900 border border-gold-accent/40 shadow-xl flex items-center justify-center animate-pulse">
          <span className="font-serif font-black text-2xl text-gold-accent tracking-tighter">
            E
          </span>
        </div>
        {/* Orbiting Spinner Ring */}
        <div className="absolute inset-[-6px] rounded-2xl border-2 border-transparent border-t-gold-accent border-r-forest-700 animate-spin" />
      </div>

      {/* Aesthetic Micro-Text */}
      <div className="mt-6 text-center space-y-1.5">
        <p className="font-serif font-bold text-sm text-forest-950 tracking-wide">
          Estate<span className="text-gold-accent">OS</span>
        </p>
        <p className="text-xs text-charcoal-400 font-medium animate-pulse">
          Loading verified property intelligence...
        </p>
      </div>
    </div>
  );
}
