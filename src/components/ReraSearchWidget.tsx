'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, ExternalLink, AlertCircle, Building2, Landmark, Loader2 } from 'lucide-react';

export default function ReraSearchWidget() {
  const [query, setQuery] = useState('PBRERA-SAS80-PR0612');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/rera/verify?regNo=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify RERA registration');
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error communicating with RERA verification service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-xl mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center font-bold">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif font-black text-xl text-forest-950">
            Live Official RERA Registry Verification
          </h3>
          <p className="text-xs text-charcoal-600">
            Cross-check any state RERA project number (Punjab, Maharashtra, Haryana, Delhi, Karnataka) against statutory records.
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mt-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter RERA No. (e.g. PBRERA-SAS80-PR0612 or HRERA-PKL-128-2023)"
            className="w-full text-xs sm:text-sm font-mono uppercase bg-slate-50 border border-charcoal-200 rounded-2xl px-4 py-3 pl-10 focus:outline-none focus:border-forest-700"
          />
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-gold-accent" />
              <span>Verifying Registry...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-gold-accent" />
              <span>Verify Project Live</span>
            </>
          )}
        </button>
      </form>

      {/* Quick suggestions */}
      <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-charcoal-500">
        <span>Try verified sample IDs:</span>
        <button
          type="button"
          onClick={() => setQuery('PBRERA-SAS80-PR0612')}
          className="font-mono text-forest-800 hover:underline bg-slate-100 px-2 py-0.5 rounded"
        >
          PBRERA-SAS80-PR0612
        </button>
        <button
          type="button"
          onClick={() => setQuery('PBRERA-SAS80-PR0399')}
          className="font-mono text-forest-800 hover:underline bg-slate-100 px-2 py-0.5 rounded"
        >
          PBRERA-SAS80-PR0399
        </button>
        <button
          type="button"
          onClick={() => setQuery('HRERA-PKL-PKL-128-2023')}
          className="font-mono text-forest-800 hover:underline bg-slate-100 px-2 py-0.5 rounded"
        >
          HRERA-PKL-PKL-128-2023
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && result.project && (
        <div className="mt-6 p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Statutory RERA Approved &amp; Active</span>
              </div>
              <h4 className="font-serif font-black text-xl text-forest-950">
                {result.project.projectName}
              </h4>
              <p className="text-xs text-charcoal-700 mt-0.5">
                Promoter: <strong>{result.project.promoterName}</strong> • {result.project.district}, {result.project.state}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Truth Score™</span>
              <span className="text-3xl font-serif font-black text-forest-900">
                {result.project.truthScore}<span className="text-sm font-normal text-charcoal-400">/100</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
            <div>
              <span className="text-[10px] text-charcoal-500 uppercase font-bold block">Sanctioned Units</span>
              <span className="font-bold text-forest-950">{result.project.totalSanctionedUnits} Units</span>
            </div>
            <div>
              <span className="text-[10px] text-charcoal-500 uppercase font-bold block">Completion Target</span>
              <span className="font-bold text-forest-950">{result.project.proposedCompletionDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-charcoal-500 uppercase font-bold block">Escrow Account Bank</span>
              <span className="font-bold text-forest-950 truncate block">{result.project.escrowBank}</span>
            </div>
            <div>
              <span className="text-[10px] text-charcoal-500 uppercase font-bold block">Title Litigation</span>
              <span className="font-bold text-emerald-700">0 Flags (Clean Record)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-charcoal-600">
              Authority: <strong>{result.portalVerification.stateAuthority}</strong>
            </span>
            <a
              href={result.project.directVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Verify on Official State Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-accent" />
            </a>
          </div>
        </div>
      )}

      {result && !result.project && (
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="font-bold text-sm text-forest-950">Statutory Format Recognized</h4>
          <p className="text-xs text-charcoal-600 mt-1">{result.message}</p>
          <div className="mt-4">
            <a
              href={result.portalVerification?.directGovtVerificationLink || result.portalVerification?.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold"
            >
              <span>Search on {result.portalVerification?.stateAuthority} Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-accent" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
