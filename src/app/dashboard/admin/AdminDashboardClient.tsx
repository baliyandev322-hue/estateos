'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  Building,
  DollarSign,
  AlertTriangle,
  Sliders,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  PieChart,
  BarChart3,
  Landmark,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface AdminDashboardClientProps {
  user: any;
  metrics: {
    totalUsers: number;
    totalProperties: number;
    verifiedCount: number;
    pendingCount: number;
    totalLeads: number;
    totalOrgs: number;
    totalRevenue: number;
  };
  initialProperties: any[];
  initialUsers: any[];
}

export default function AdminDashboardClient({
  user,
  metrics,
  initialProperties,
  initialUsers,
}: AdminDashboardClientProps) {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedProp, setSelectedProp] = useState<any | null>(null);
  const [newScore, setNewScore] = useState(90);
  const [auditNotes, setAuditNotes] = useState('Official RERA & Sub-Registrar 13-year search cleared.');
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async (propId: string, verifyStatus: boolean) => {
    setVerifying(true);
    try {
      const res = await fetch('/api/admin/verify-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: propId,
          isVerified: verifyStatus,
          truthScore: newScore,
          auditNotes,
          reraVerified: true,
          ownershipVerified: true,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setProperties(
          properties.map((p) =>
            p.id === propId ? { ...p, isVerified: verifyStatus, truthScore: newScore } : p
          )
        );
        setSelectedProp(null);
      } else {
        alert(data.error || 'Verification update failed');
      }
    } catch (err) {
      alert('Error updating verification');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-forest-950 rounded-3xl p-6 sm:p-8 text-white border border-forest-800 shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-forest-900 border-2 border-gold-accent flex items-center justify-center font-bold text-gold-accent">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-black text-white">
                Super Admin Control Terminal
              </h1>
              <p className="text-xs text-forest-200 mt-0.5">
                EstateOS Platform Governance, Truth Score Audits &amp; SaaS Revenue Desk
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-forest-900 border border-gold-accent/40 text-gold-light text-xs font-bold">
            Auditor: {user.name} (Chief Compliance)
          </div>
        </div>

        {/* Platform Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Total SaaS Revenue
            </span>
            <p className="font-serif text-3xl font-black text-forest-900 mt-1">
              {formatCurrencyINR(metrics.totalRevenue)}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Total Properties
            </span>
            <p className="font-serif text-3xl font-black text-forest-950 mt-1">
              {metrics.totalProperties}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              RERA Verified Listings
            </span>
            <p className="font-serif text-3xl font-black text-emerald-700 mt-1">
              {metrics.verifiedCount}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Registered Organizations
            </span>
            <p className="font-serif text-3xl font-black text-gold-700 mt-1">
              {metrics.totalOrgs} Orgs
            </p>
          </div>
        </div>

        {/* FINANCIAL & MRR VISUAL GROWTH HUB (INVESTOR-GRADE) */}
        <div className="bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 text-white rounded-3xl p-6 sm:p-8 border border-forest-800 shadow-2xl mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-accent/20 border border-gold-accent/30 text-[10px] font-bold text-gold-accent uppercase tracking-wider">
                  Investor Financial Metrics
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +28.4% MoM Growth
                </span>
              </div>
              <h2 className="font-serif text-2xl font-black mt-2 text-white">
                Monthly Recurring Revenue (MRR) &amp; Multi-Stream Yield
              </h2>
              <p className="text-xs text-forest-200 mt-0.5">
                Consolidated recurring cashflow across Agent SaaS tiers, Developer enterprise packages &amp; DSA loan payouts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-forest-900/90 border border-forest-700 rounded-2xl px-4 py-2.5 text-right">
                <span className="block text-[10px] uppercase font-bold text-forest-300">Annual Run Rate (ARR)</span>
                <span className="text-lg font-mono font-black text-gold-accent">₹59,40,000</span>
              </div>
              <div className="bg-forest-900/90 border border-forest-700 rounded-2xl px-4 py-2.5 text-right">
                <span className="block text-[10px] uppercase font-bold text-forest-300">Active MRR</span>
                <span className="text-lg font-mono font-black text-emerald-400">₹4,95,000/mo</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Bar Chart */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-forest-200 pb-1">
                <span>MRR Trajectory (2026 CY)</span>
                <span className="text-emerald-400">All-Time High</span>
              </div>

              {/* Chart Visualization */}
              <div className="h-48 bg-forest-900/50 rounded-2xl p-4 border border-forest-800 flex items-end justify-between gap-2 sm:gap-4">
                {[
                  { month: 'Jan', val: 145000, height: '30%', label: '₹1.45L' },
                  { month: 'Feb', val: 180000, height: '38%', label: '₹1.80L' },
                  { month: 'Mar', val: 215000, height: '45%', label: '₹2.15L' },
                  { month: 'Apr', val: 260000, height: '54%', label: '₹2.60L' },
                  { month: 'May', val: 310000, height: '64%', label: '₹3.10L' },
                  { month: 'Jun', val: 365000, height: '74%', label: '₹3.65L' },
                  { month: 'Jul', val: 410000, height: '82%', label: '₹4.10L' },
                  { month: 'Aug', val: 450000, height: '90%', label: '₹4.50L' },
                  { month: 'Sep', val: 475000, height: '95%', label: '₹4.75L' },
                  { month: 'Oct', val: 495000, height: '100%', label: '₹4.95L', active: true },
                ].map((col) => (
                  <div key={col.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-gold-accent font-bold">
                      {col.label}
                    </span>
                    <div
                      style={{ height: col.height }}
                      className={`w-full rounded-t-lg transition-all duration-500 relative ${
                        col.active
                          ? 'bg-gradient-to-t from-emerald-600 to-gold-accent shadow-lg shadow-gold-accent/20'
                          : 'bg-forest-700/80 hover:bg-forest-600'
                      }`}
                    ></div>
                    <span className={`text-[10px] font-bold ${col.active ? 'text-gold-accent font-black' : 'text-forest-400'}`}>
                      {col.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Stream Breakdown & Unit Economics */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-light block">
                Cashflow Diversification (Oct 2026)
              </span>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-forest-100 mb-1">
                    <span>SaaS Subscriptions (Starter, Pro, Enterprise)</span>
                    <span className="text-gold-accent">58% (₹2,87,100)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-forest-950 overflow-hidden">
                    <div className="h-full bg-gold-accent rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-forest-100 mb-1">
                    <span>Bank DSA Loan Referral Payouts (0.6% on ₹21 Cr)</span>
                    <span className="text-emerald-400">26% (₹1,28,700)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-forest-950 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-forest-100 mb-1">
                    <span>Listing Boosts &amp; Promoted Badges</span>
                    <span className="text-sky-400">11% (₹54,450)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-forest-950 overflow-hidden">
                    <div className="h-full bg-sky-400 rounded-full" style={{ width: '11%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-forest-100 mb-1">
                    <span>Google AdSense Editorial Ad Units</span>
                    <span className="text-purple-400">5% (₹24,750)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-forest-950 overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>

              {/* High-value Unit Economics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-forest-800 text-center">
                <div className="p-2 rounded-xl bg-forest-900/60 border border-forest-800">
                  <span className="block text-[9px] uppercase font-bold text-forest-400">Gross Margin</span>
                  <span className="text-xs font-mono font-black text-emerald-400">92%</span>
                </div>
                <div className="p-2 rounded-xl bg-forest-900/60 border border-forest-800">
                  <span className="block text-[9px] uppercase font-bold text-forest-400">MoM Churn</span>
                  <span className="text-xs font-mono font-black text-gold-accent">1.8%</span>
                </div>
                <div className="p-2 rounded-xl bg-forest-900/60 border border-forest-800">
                  <span className="block text-[9px] uppercase font-bold text-forest-400">CAC Payback</span>
                  <span className="text-xs font-mono font-black text-sky-400">1.2 Mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification & Truth Score Desk */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-sm space-y-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
            <div>
              <h2 className="font-serif font-bold text-xl text-forest-950">
                Listing Approvals &amp; Truth Score™ Audit Cell
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Review self-declared documents against state RERA databases before issuing public verification seals.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-charcoal-200 text-charcoal-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Organization / Agent</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Current Score</th>
                  <th className="p-4">RERA Status</th>
                  <th className="p-4">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 font-medium text-charcoal-700">
                {properties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/70">
                    <td className="p-4">
                      <Link href={`/property/${prop.slug}`} className="font-bold text-forest-950 hover:underline">
                        {prop.title}
                      </Link>
                      <span className="block text-[11px] text-charcoal-400 font-normal">
                        RERA: {prop.reraId || 'Not provided'} • {prop.city}
                      </span>
                    </td>
                    <td className="p-4">
                      {prop.organization?.name || prop.user?.name || 'Direct Owner'}
                    </td>
                    <td className="p-4 font-serif font-black text-forest-900">
                      {formatCurrencyINR(prop.price)}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-forest-100 text-forest-800 font-bold">
                        {prop.truthScore}/100
                      </span>
                    </td>
                    <td className="p-4">
                      {prop.isVerified ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Review Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedProp(prop);
                          setNewScore(prop.truthScore);
                        }}
                        className="px-3 py-1 bg-forest-900 text-white rounded-lg font-bold text-[11px] hover:bg-forest-800"
                      >
                        Audit / Certify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Roster Table */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-xl text-forest-950 mb-4 pb-2 border-b border-charcoal-100">
            Registered Platform Users ({initialUsers.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-charcoal-200 text-charcoal-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 font-medium text-charcoal-700">
                {initialUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="p-3 font-bold text-forest-950">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-charcoal-800 font-bold text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">{u.phone || '-'}</td>
                    <td className="p-3 text-charcoal-400">
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AUDIT / CERTIFICATION MODAL */}
      {selectedProp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-charcoal-200">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 mb-3">
              <h3 className="font-serif font-bold text-lg text-forest-950">
                Certify Property Truth Score™
              </h3>
              <button onClick={() => setSelectedProp(null)} className="font-bold text-charcoal-400">✕</button>
            </div>

            <p className="text-xs text-charcoal-600 mb-4">
              Property: <strong>{selectedProp.title}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Adjust Truth Score (0 - 100): {newScore}
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={newScore}
                  onChange={(e) => setNewScore(Number(e.target.value))}
                  className="w-full accent-forest-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Auditor Remarks
                </label>
                <textarea
                  rows={2}
                  value={auditNotes}
                  onChange={(e) => setAuditNotes(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg p-2"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleVerify(selectedProp.id, true)}
                  disabled={verifying}
                  className="flex-1 py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold"
                >
                  {verifying ? 'Updating...' : 'Approve & Verify Listing'}
                </button>
                <button
                  onClick={() => handleVerify(selectedProp.id, false)}
                  disabled={verifying}
                  className="px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
