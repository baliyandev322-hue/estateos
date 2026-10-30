'use client';

import React, { useState } from 'react';
import { Download, ShieldCheck, FileCheck } from 'lucide-react';
import TruthScoreReportDownloadModal from './TruthScoreReportDownloadModal';

export default function TruthScoreDownloadTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  const sampleProperty = {
    title: 'Grand Azure 3BHK Luxury Residence',
    slug: 'grand-azure-3bhk-sector-82-it-city-mohali',
    price: 9200000,
    reraId: 'PBRERA-SAS80-PR0612',
    truthScore: 94,
    localityName: 'Sector 82 IT City',
    city: 'Mohali',
    carpetAreaSqFt: 1450,
  };

  return (
    <>
      <div className="pt-4 border-t border-charcoal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-forest-950 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            Official Title Search &amp; Encumbrance Audit Document (14 Pages)
          </span>
          <p className="text-[11px] text-charcoal-500">
            Certified legal due-diligence audit with QR-coded sub-registrar search certificate.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-accent font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Sample Audit PDF (₹1,499)</span>
        </button>
      </div>

      <TruthScoreReportDownloadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        property={sampleProperty}
      />
    </>
  );
}
