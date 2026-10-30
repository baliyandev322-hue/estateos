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
