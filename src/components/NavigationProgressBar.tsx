'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(0);

  // Complete the progress when pathname or searchParams change
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const elapsed = Date.now() - startTimeRef.current;
      // Ensure at least 450ms visibility so user's eye sees the aesthetic transition
      const remainingTime = Math.max(150, 450 - elapsed);

      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, remainingTime);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept all internal link clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        (!targetAttr || targetAttr === '_self') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const currentUrl = window.location.pathname + window.location.search;
        if (href === currentUrl) return;

        startTimeRef.current = Date.now();
        setLoading(true);
        setProgress(35);

        setTimeout(() => setProgress((p) => (p > 0 ? 65 : 0)), 100);
        setTimeout(() => setProgress((p) => (p > 0 ? 85 : 0)), 250);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[99999] pointer-events-none transition-opacity duration-200"
      style={{ opacity: loading ? 1 : 0 }}
    >
      {/* 1. Highly Visible 4px Top Gradient Bar with Bright Gold Glow */}
      <div
        className="h-[4px] bg-gradient-to-r from-emerald-600 via-amber-400 to-yellow-300 shadow-[0_0_16px_rgba(245,158,11,1)] transition-all ease-out duration-300"
        style={{ width: `${progress}%` }}
      />

      {/* 2. Floating Aesthetic Luxury Loading Pill Badge (Top-Right) */}
      <div className="fixed top-4 right-4 z-[99999] flex items-center gap-2.5 px-4 py-2 rounded-full bg-forest-950/95 text-gold-accent border border-gold-accent/40 shadow-2xl backdrop-blur-md transition-all transform scale-100 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="w-3.5 h-3.5 border-2 border-gold-accent/30 border-t-gold-accent rounded-full animate-spin" />
        <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
          <span>Loading</span>
          <span className="inline-flex gap-0.5">
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        </span>
      </div>
    </div>
  );
}
