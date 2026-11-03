'use client';

import React, { useEffect } from 'react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function AdSenseBanner({
  slotId = 'default',
  format = 'auto',
  className = '',
}: AdSenseBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense graceful safeguard
    }
  }, []);

  return (
    <div className={`my-8 overflow-hidden text-center ${className}`}>
      <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-400 mb-1.5">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-8670788447807706"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
