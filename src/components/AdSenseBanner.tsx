import React from 'react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export default function AdSenseBanner({
  slotId = 'estateos-contextual-01',
  format = 'horizontal',
  className = '',
}: AdSenseBannerProps) {
  return (
    <div className={`my-8 overflow-hidden rounded-xl bg-charcoal-50/70 border border-charcoal-200/80 p-4 text-center ${className}`}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-charcoal-200/60 text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
        <span>Sponsored Advertisement</span>
        <span>AdSense Partner Slot • {slotId}</span>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[90px] py-3 bg-white rounded-lg border border-dashed border-charcoal-200 text-charcoal-500">
        <p className="text-xs font-semibold text-forest-900">
          State Bank of India &amp; HDFC Premium Home Loan Offers — Interest Rates from 8.35%*
        </p>
        <p className="text-[11px] text-charcoal-400 mt-1">
          Instant pre-approval eligibility check with zero processing fee. Terms &amp; conditions apply.
        </p>
        <span className="mt-2.5 inline-block px-3 py-1 bg-forest-50 text-forest-700 font-bold text-[10px] rounded border border-forest-200">
          Learn More at Bank Partner Portal
        </span>
      </div>

      <p className="text-[9px] text-charcoal-400 mt-2 text-right">
        Ads by Google • Content verified for family-friendly real estate information
      </p>
    </div>
  );
}
