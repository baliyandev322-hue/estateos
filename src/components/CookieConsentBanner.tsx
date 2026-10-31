'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('estateos_cookie_consent');
      if (!consent) {
        // Show after a brief delay for smooth UX
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignore localStorage exceptions in private mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('estateos_cookie_consent', 'accepted');
    } catch (e) {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('estateos_cookie_consent', 'essential_only');
    } catch (e) {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent Notice"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-forest-950/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl border border-forest-800 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-forest-900 border border-gold-accent/40 flex items-center justify-center text-gold-accent shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-gold-light flex items-center gap-1.5">
              <span>Privacy &amp; Cookie Consent</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h4>
            <button
              onClick={handleDecline}
              aria-label="Dismiss cookie notice"
              className="text-forest-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-forest-200 leading-relaxed">
            EstateOS uses essential session cookies, analytical performance metrics, and contextual advertising partners (including Google AdSense) to deliver verified proptech intelligence under the Digital Personal Data Protection (DPDP) Act 2023.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-gold-accent text-forest-950 text-xs font-bold rounded-lg hover:bg-gold-light transition-all shadow-sm"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 bg-forest-900 text-forest-200 text-xs font-semibold rounded-lg hover:text-white hover:bg-forest-800 transition-colors border border-forest-800"
            >
              Essential Only
            </button>
            <Link
              href="/privacy"
              className="text-[11px] text-gold-light hover:underline ml-auto"
            >
              Policy
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
