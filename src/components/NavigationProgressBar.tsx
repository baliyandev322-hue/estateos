'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When route or search params change, complete the progress bar
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Listen for clicks on internal links to start progress bar instantly
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Only handle internal relative links without modifier keys (cmd/ctrl click)
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
        // If clicking the exact same URL, don't trigger loading
        const currentUrl = window.location.pathname + window.location.search;
        if (href === currentUrl) return;

        setLoading(true);
        setProgress(25);

        // Smooth progression
        setTimeout(() => setProgress((p) => (p > 0 ? 60 : 0)), 120);
        setTimeout(() => setProgress((p) => (p > 0 ? 85 : 0)), 350);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-300"
      style={{ opacity: loading ? 1 : 0 }}
    >
      {/* Luxury Gold & Emerald Gradient Line */}
      <div
        className="h-[3px] bg-gradient-to-r from-forest-800 via-gold-accent to-emerald-400 shadow-[0_0_12px_rgba(212,175,55,0.85)] transition-all ease-out duration-300"
        style={{ width: `${progress}%` }}
      />
      {/* Subtle Glowing Pulse Dot at the Leading Edge */}
      <div
        className="absolute top-0 w-8 h-[3px] bg-white blur-[2px] transition-all ease-out duration-300"
        style={{ left: `calc(${progress}% - 32px)` }}
      />
    </div>
  );
}
