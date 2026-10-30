'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Calendar,
  Layers,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface BuilderDashboardClientProps {
  user: any;
  org: any;
  properties: any[];
  leads: any[];
  appointments: any[];
}

export default function BuilderDashboardClient({
  user,
  org,
  properties,
  leads,
  appointments,
}: BuilderDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'leads' | 'visits'>('inventory');

  // Simulated project inventory breakdown
  const inventoryStats = {
    totalUnits: 148,
    availableUnits: 42,
    reservedUnits: 18,
    soldUnits: 88,
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Developer Header Banner */}
        <div className="bg-forest-950 rounded-3xl p-6 sm:p-8 text-white border border-forest-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest-900 border-2 border-gold-accent flex items-center justify-center font-serif text-2xl font-black text-gold-accent">
              {org?.name ? org.name.charAt(0) : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-black text-white">
                  {org?.name || 'Singhania Grand Developers'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-400 text-forest-950 uppercase">
                  RERA Tier-1 Developer
                </span>
              </div>
              <p className="text-xs text-forest-200 mt-1">
                Managing Director: <strong>{user.name}</strong> • HRERA Reg: <strong>{org?.reraNumber || 'HRERA-PKL-GGM-1190-2022'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="px-4 py-2 bg-forest-900 text-gold-light border border-forest-700 rounded-xl text-xs font-bold"
            >
              Enterprise Tier Active
            </Link>
          </div>
        </div>

        {/* Inventory Units Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Total Master Inventory
            </span>
            <p className="font-serif text-3xl font-black text-forest-950 mt-1">
              {inventoryStats.totalUnits} Units
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Available For Sale
            </span>
            <p className="font-serif text-3xl font-black text-emerald-700 mt-1">
              {inventoryStats.availableUnits}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Under Token / Reserved
            </span>
            <p className="font-serif text-3xl font-black text-amber-600 mt-1">
              {inventoryStats.reservedUnits}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Sold &amp; Handed Over
            </span>
            <p className="font-serif text-3xl font-black text-forest-900 mt-1">
              {inventoryStats.soldUnits}
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-charcoal-200 pb-3 mb-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inventory'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-charcoal-700 border border-charcoal-200'
            }`}
          >
            Project Units &amp; Floor Plans
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-charcoal-700 border border-charcoal-200'
            }`}
          >
            Developer Inbound Inquiries ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'visits'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-charcoal-700 border border-charcoal-200'
            }`}
          >
            Site Walkthroughs ({appointments.length})
          </button>
        </div>

        {/* TAB 1: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-charcoal-200 text-charcoal-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Project / Tower</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Carpet Area</th>
                    <th className="p-4">Truth Score™</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100 font-medium text-charcoal-700">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/70">
                      <td className="p-4 font-bold text-forest-950">
                        {prop.title}
                        <span className="block text-[11px] text-charcoal-400 font-normal">
                          {prop.address}
                        </span>
                      </td>
                      <td className="p-4">{prop.propertyType}</td>
                      <td className="p-4 font-serif font-black text-forest-900">
                        {formatCurrencyINR(prop.price)}
                      </td>
                      <td className="p-4">{prop.carpetAreaSqFt} sq.ft</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-forest-100 text-forest-800 font-bold">
                          {prop.truthScore}/100
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {prop.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link href={`/property/${prop.slug}`} className="text-forest-800 hover:underline font-bold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DEVELOPER INQUIRIES */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-charcoal-200 text-charcoal-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Investor / Homebuyer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 font-medium text-charcoal-700">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-bold text-forest-950">{lead.name}</td>
                    <td className="p-4">{lead.phone} • {lead.email}</td>
                    <td className="p-4">{lead.property?.title}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-forest-100 text-forest-800 font-bold text-[10px]">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs truncate">{lead.notes || lead.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: VISITS */}
        {activeTab === 'visits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((app) => (
              <div key={app.id} className="p-5 rounded-2xl bg-white border border-charcoal-200 shadow-sm">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                  {app.status}
                </span>
                <h4 className="font-bold text-sm text-forest-950 mt-2">{app.property?.title}</h4>
                <p className="text-xs text-charcoal-600 mt-2">
                  <strong>Visitor:</strong> {app.visitorName} ({app.visitorPhone})
                </p>
                <p className="text-xs text-charcoal-600">
                  <strong>Date:</strong> {new Date(app.scheduledDate).toLocaleDateString('en-IN')} at {app.timeSlot}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
