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
      const remainingTime = Math.max(100, 300 - elapsed);

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
      {/* Sleek 3px Top Progress Bar (No top-right floating badge) */}
      <div
        className="h-[3px] bg-gradient-to-r from-emerald-600 via-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-all ease-out duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
