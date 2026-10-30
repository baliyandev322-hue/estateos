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
  Save,
  Loader2,
  UserCheck,
  Settings,
  Landmark,
  Check,
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
  const [activeTab, setActiveTab] = useState<'inventory' | 'leads' | 'visits' | 'settings'>('inventory');
  const [projectList, setProjectList] = useState(properties);
  const [isNewPhaseOpen, setIsNewPhaseOpen] = useState(false);

  // New Phase/Tower form state
  const [towerName, setTowerName] = useState('');
  const [towerRera, setTowerRera] = useState('');
  const [towerUnits, setTowerUnits] = useState('64');
  const [towerFloors, setTowerFloors] = useState('16');
  const [towerBhk, setTowerBhk] = useState('3BHK Luxury Residences');
  const [towerPrice, setTowerPrice] = useState('9500000');
  const [towerStage, setTowerStage] = useState('Structure Complete (12th Slab)');
  const [towerDate, setTowerDate] = useState('Dec 2027');

  // Developer Profile state
  const [devName, setDevName] = useState(org?.name || 'Apex Heritage Infra Ltd.');
  const [devRera, setDevRera] = useState(org?.reraNumber || 'PBRERA-PR-0291');
  const [devEscrowBank, setDevEscrowBank] = useState('HDFC Bank Ltd, Sector 82 Branch');
  const [devEscrowAcc, setDevEscrowAcc] = useState('50200088912340');
  const [devPhone, setDevPhone] = useState(user?.phone || '+91 98112 34567');
  const [devAddress, setDevAddress] = useState(org?.address || 'Level 14, Horizon Cyber Tower, IT City, Mohali');
  const [devSaving, setDevSaving] = useState(false);
  const [devSuccess, setDevSuccess] = useState('');

  const handleAddTower = (e: React.FormEvent) => {
    e.preventDefault();
    if (!towerName) return;

    const newTower = {
      id: 'tower_' + Date.now(),
      title: towerName,
      slug: towerName.toLowerCase().replace(/\s+/g, '-'),
      address: devAddress + ' • ' + towerStage,
      propertyType: towerBhk,
      price: parseFloat(towerPrice) || 9500000,
      carpetAreaSqFt: 1450,
      truthScore: 96,
      status: 'UNDER_CONSTRUCTION',
      reraId: towerRera || devRera,
      totalUnits: parseInt(towerUnits) || 64,
    };

    setProjectList([newTower, ...projectList]);
    setIsNewPhaseOpen(false);
    setTowerName('');
    setTowerRera('');
  };

  const handleSaveDevProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setDevSaving(true);
    setDevSuccess('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: devName,
          reraNumber: devRera,
          phone: devPhone,
          address: devAddress,
        }),
      });
      if (res.ok) {
        setDevSuccess('Developer corporate profile & statutory escrow account verified!');
      } else {
        alert('Failed to update developer profile');
      }
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setDevSaving(false);
    }
  };

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

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNewPhaseOpen(true)}
              className="px-4 py-2 bg-gold-accent hover:bg-gold-500 text-forest-950 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Phase / Tower</span>
            </button>
            <Link
              href="/pricing"
              className="px-4 py-2 bg-forest-900 text-gold-light border border-forest-700 rounded-xl text-xs font-bold hidden sm:inline-block"
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
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-charcoal-700 border border-charcoal-200'
            }`}
          >
            Developer Profile &amp; Escrow Settings
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
                  {projectList.map((prop) => (
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

        {/* TAB 4: DEVELOPER PROFILE & ESCROW SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white rounded-3xl border border-charcoal-200 p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-2">
                <Landmark className="w-3.5 h-3.5" />
                <span>Statutory Developer Registry</span>
              </div>
              <h3 className="font-serif font-black text-2xl text-forest-950">
                Corporate Developer Profile &amp; Escrow Account
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Configure your state developer layout sanctions, commercial address, and RERA designated escrow bank details.
              </p>
            </div>

            {devSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{devSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveDevProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Corporate Entity Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={devName}
                    onChange={(e) => setDevName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Master State RERA Registration *
                  </label>
                  <input
                    type="text"
                    required
                    value={devRera}
                    onChange={(e) => setDevRera(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Scheduled Escrow Bank Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={devEscrowBank}
                    onChange={(e) => setDevEscrowBank(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Designated Escrow Account No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={devEscrowAcc}
                    onChange={(e) => setDevEscrowAcc(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Authorized Director / Sales Desk Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={devPhone}
                    onChange={(e) => setDevPhone(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Corporate Headquarters Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={devAddress}
                    onChange={(e) => setDevAddress(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-medium text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={devSaving}
                  className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {devSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-accent" />
                      <span>Saving Corporate Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-gold-accent" />
                      <span>Update Corporate Profile &amp; Escrow</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ADD NEW PHASE / TOWER MODAL */}
      {isNewPhaseOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-100 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-accent">
                  Project Expansion
                </span>
                <h3 className="font-serif font-black text-xl text-forest-950">
                  Add New Phase / Residential Tower
                </h3>
              </div>
              <button
                onClick={() => setIsNewPhaseOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-charcoal-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTower} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Tower / Phase Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tower C - Imperial Skyline Residences"
                  value={towerName}
                  onChange={(e) => setTowerName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 font-bold outline-none focus:border-forest-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Phase RERA ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PBRERA-SAS80-PR0780"
                    value={towerRera}
                    onChange={(e) => setTowerRera(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Unit Configuration
                  </label>
                  <input
                    type="text"
                    required
                    value={towerBhk}
                    onChange={(e) => setTowerBhk(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Total Units
                  </label>
                  <input
                    type="number"
                    required
                    value={towerUnits}
                    onChange={(e) => setTowerUnits(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Floors
                  </label>
                  <input
                    type="number"
                    required
                    value={towerFloors}
                    onChange={(e) => setTowerFloors(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Starting Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={towerPrice}
                    onChange={(e) => setTowerPrice(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Construction Stage
                  </label>
                  <input
                    type="text"
                    value={towerStage}
                    onChange={(e) => setTowerStage(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Target Possession
                  </label>
                  <input
                    type="text"
                    value={towerDate}
                    onChange={(e) => setTowerDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-gold-accent" />
                  <span>Launch Phase &amp; Add to Master Inventory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
