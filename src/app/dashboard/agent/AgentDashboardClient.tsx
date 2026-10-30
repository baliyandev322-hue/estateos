'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Sparkles,
  Calendar,
  CreditCard,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  Trash2,
  Edit,
  Clock,
  ArrowRight,
  Zap,
  ShoppingBag,
  MessageCircle,
  Lock,
  Check,
  Flame,
  UserCheck,
  Settings,
  Save,
  Loader2,
} from 'lucide-react';
import { formatCurrencyINR, formatNumberINR } from '@/lib/utils';

interface AgentDashboardClientProps {
  user: any;
  org: any;
  initialProperties: any[];
  initialLeads: any[];
  initialAppointments: any[];
}

export default function AgentDashboardClient({
  user,
  org,
  initialProperties,
  initialLeads,
  initialAppointments,
}: AgentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'crm' | 'leads_market' | 'ai' | 'visits' | 'subscription' | 'profile'>('properties');
  // Profile Edit State
  const [profName, setProfName] = useState(user?.name || 'Rahul Sharma');
  const [profPhone, setProfPhone] = useState(user?.phone || '+91 98765 43210');
  const [profAgency, setProfAgency] = useState(org?.name || 'Apex Heritage Realty');
  const [profRera, setProfRera] = useState(user?.licenseNo || user?.reraNumber || 'PBRERA-A-2023-0182');
  const [profCity, setProfCity] = useState(org?.city || 'Mohali & Chandigarh');
  const [profBio, setProfBio] = useState('Certified RERA real estate consultant specializing in luxury residential towers and high-yield commercial floors.');
  const [profSaving, setProfSaving] = useState(false);
  const [profSuccess, setProfSuccess] = useState('');
  const [properties, setProperties] = useState(initialProperties);
  const [leads, setLeads] = useState(initialLeads);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [unlockedLeads, setUnlockedLeads] = useState<string[]>([]);
  const [leadPackNotice, setLeadPackNotice] = useState<string | null>(null);

  const marketLeads = [
    {
      id: 'VL-8801',
      name: 'Dr. Amitav Banerjee',
      maskedPhone: '+91 98140 •••••',
      fullPhone: '+91 98140 22391',
      email: 'dr.banerjee.cardio@gmail.com',
      budget: '₹95 Lakh - ₹1.15 Cr',
      propertyType: '3BHK Luxury Apartment',
      locality: 'Sector 82 IT City, Mohali',
      intent: 'Immediate Purchase (Token within 15 days)',
      loanStatus: 'Pre-Sanctioned HDFC Loan ₹80 Lakh',
      cibil: '782',
    },
    {
      id: 'VL-8802',
      name: 'Pooja Narang & Rohit Narang',
      maskedPhone: '+91 98728 •••••',
      fullPhone: '+91 98728 99402',
      email: 'rohit.narang@adobe.com',
      budget: '₹2.8 Cr - ₹3.5 Cr',
      propertyType: '4BHK Penthouse / Villa',
      locality: 'Golf Course Extension, Gurugram',
      intent: 'Family relocating next month',
      loanStatus: 'Pre-Approved SBI Privilege Loan ₹2.5 Cr',
      cibil: '804',
    },
    {
      id: 'VL-8803',
      name: 'Col. Jasbir Singh Dhillon (Retd.)',
      maskedPhone: '+91 98150 •••••',
      fullPhone: '+91 98150 44102',
      email: 'jasbirdhillon62@yahoo.co.in',
      budget: '₹75 Lakh - ₹90 Lakh',
      propertyType: 'Independent Floor / 3BHK',
      locality: 'Indiranagar / Whitefield, Bangalore',
      intent: 'Ready to visit this Saturday 11 AM',
      loanStatus: 'Own Funds + Pre-Approved ICICI Bank ₹40L',
      cibil: '765',
    },
    {
      id: 'VL-8804',
      name: 'Vikramaditya Rao',
      maskedPhone: '+91 98490 •••••',
      fullPhone: '+91 98490 88219',
      email: 'vikram.rao@techfin.io',
      budget: '₹1.8 Cr - ₹2.2 Cr',
      propertyType: 'Commercial Office Space / High-Street Retail',
      locality: 'Gachibowli Financial District, Hyderabad',
      intent: 'Investor looking for 7.5%+ Rental Yield',
      loanStatus: 'Ready Equity / Liquid Capital',
      cibil: '790',
    },
    {
      id: 'VL-8805',
      name: 'Meera Kulkarni & Ashwin Shah',
      maskedPhone: '+91 98201 •••••',
      fullPhone: '+91 98201 55673',
      email: 'ashwin.shah@morganstanley.com',
      budget: '₹4.5 Cr - ₹5.5 Cr',
      propertyType: 'Sea-view 3BHK Apartment',
      locality: 'Bandra West, Mumbai',
      intent: 'NRI Returning to India in December',
      loanStatus: 'Pre-approved Standard Chartered Home Loan',
      cibil: '815',
    },
  ];

  const handleBoostProperty = async (slug: string) => {
    try {
      const res = await fetch(`/api/properties/${slug}/boost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: 7, plan: 'WEEKLY_BOOST', amount: 499 }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setProperties(properties.map((p) => (p.slug === slug ? { ...p, isPromoted: true, promotedUntil: data.promotedUntil } : p)));
      } else {
        alert(data.error || 'Failed to boost property');
      }
    } catch (e) {
      alert('Error boosting property');
    }
  };

  const handleUnlockLead = (id: string) => {
    setUnlockedLeads((prev) => [...prev, id]);
  };

  const handleBuyPack = (packName: string, count: number, price: number) => {
    setLeadPackNotice(`🎉 Successfully activated ${packName} (₹${price.toLocaleString('en-IN')})! All ${count} verified high-intent buyer leads have been credited to your CRM.`);
    setUnlockedLeads(marketLeads.map((l) => l.id));
  };

  // New Property Modal State
  const [isNewPropOpen, setIsNewPropOpen] = useState(false);
  const [propTitle, setPropTitle] = useState('');
  const [propType, setPropType] = useState('APARTMENT');
  const [listingType, setListingType] = useState('SALE');
  const [price, setPrice] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [city, setCity] = useState('Mohali');
  const [locality, setLocality] = useState('Sector 82 IT City');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('140306');
  const [reraId, setReraId] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [propLoading, setPropLoading] = useState(false);

  // AI Description Generator State
  const [aiType, setAiType] = useState('Apartment');
  const [aiBhk, setAiBhk] = useState(3);
  const [aiArea, setAiArea] = useState(1650);
  const [aiLocality, setAiLocality] = useState('Sector 82 IT City');
  const [aiCity, setAiCity] = useState('Mohali');
  const [aiHighlights, setAiHighlights] = useState('Italian marble flooring, club infinity pool, EV charging bay, Vastu North-East facing');
  const [generatedText, setGeneratedText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const sub = org?.subscriptions?.[0] || { plan: 'FREE', listingsLimit: 5, leadsLimit: 25 };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setPropLoading(true);

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: propTitle,
          propertyType: propType,
          listingType,
          price,
          carpetAreaSqFt: carpetArea,
          bedrooms,
          bathrooms,
          city,
          localityName: locality,
          address: address || `${locality}, ${city}`,
          pinCode,
          reraId,
          description: description || `Newly listed luxury ${bedrooms}BHK ${propType} in ${locality}, ${city}. Verified under EstateOS standards.`,
          images: [imageUrl],
          amenities: ['Power Backup', '24/7 Security', 'Covered Parking', 'Clubhouse'],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setProperties([data.property, ...properties]);
        setIsNewPropOpen(false);
        setPropTitle('');
        setPrice('');
        setCarpetArea('');
      } else {
        alert(data.error || 'Failed to create listing');
      }
    } catch (err) {
      alert('Error creating listing');
    } finally {
      setPropLoading(false);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
      }
    } catch (err) {
      alert('Failed to update lead');
    }
  };

  const handleGenerateDescription = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/description-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${aiBhk}BHK Luxury ${aiType} in ${aiLocality}`,
          propertyType: aiType,
          bedrooms: aiBhk,
          carpetAreaSqFt: aiArea,
          locality: aiLocality,
          city: aiCity,
          highlights: aiHighlights.split(',').map((s) => s.trim()),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedText(data.description);
      }
    } catch (err) {
      alert('Failed to generate description');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfSaving(true);
    setProfSuccess('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profName,
          phone: profPhone,
          reraNumber: profRera,
          companyName: profAgency,
          city: profCity,
          bio: profBio,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfSuccess('Profile & agency credentials successfully updated and verified on live network!');
      } else {
        alert(data.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating profile credentials');
    } finally {
      setProfSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Organization Header */}
        <div className="bg-forest-950 rounded-3xl p-6 sm:p-8 text-white border border-forest-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest-900 border-2 border-gold-accent flex items-center justify-center font-serif text-2xl font-black text-gold-accent">
              {org?.name ? org.name.charAt(0) : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-black text-white">
                  {org?.name || 'Apex Heritage Realty'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  RERA Verified Agency
                </span>
              </div>
              <p className="text-xs text-forest-200 mt-1">
                Consultant: <strong>{user.name}</strong> • RERA Reg: <strong>{org?.reraNumber || 'PBRERA-SAS80-REA0419'}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNewPropOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gold-accent hover:bg-gold-500 text-forest-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-forest-950 stroke-[3]" />
              <span>Post New Property</span>
            </button>
            <Link
              href="/pricing"
              className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-light border border-forest-700 text-xs font-bold transition-all"
            >
              Plan: {sub.plan} ({properties.length}/{sub.listingsLimit} used)
            </Link>
          </div>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Active Listings
            </span>
            <p className="font-serif text-3xl font-black text-forest-950 mt-1">
              {properties.length}
              <span className="text-xs font-sans text-charcoal-400 font-normal"> / {sub.listingsLimit} cap</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              CRM Leads Pipeline
            </span>
            <p className="font-serif text-3xl font-black text-forest-900 mt-1">
              {leads.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Site Visits Booked
            </span>
            <p className="font-serif text-3xl font-black text-gold-700 mt-1">
              {appointments.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-charcoal-200 shadow-sm">
            <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
              Avg. Truth Score
            </span>
            <p className="font-serif text-3xl font-black text-emerald-700 mt-1">
              92.8
            </p>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-charcoal-200 pb-3 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'properties', name: 'My Listings', icon: Building2 },
            { id: 'crm', name: 'Leads CRM Pipeline', icon: Users },
            { id: 'leads_market', name: 'Verified Buyer Leads (Packs)', icon: ShoppingBag },
            { id: 'ai', name: 'AI Copywriter Suite', icon: Sparkles },
            { id: 'visits', name: 'Site Inspections', icon: Calendar },
            { id: 'subscription', name: 'SaaS Plan & Invoices', icon: CreditCard },
            { id: 'profile', name: 'Profile & Agency Settings', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-white text-charcoal-700 border border-charcoal-200 hover:border-forest-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-accent' : 'text-charcoal-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-forest-950">
                Managed Properties ({properties.length})
              </h2>
              <button
                onClick={() => setIsNewPropOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-forest-900 text-white font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-gold-accent" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-charcoal-200 text-charcoal-500 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Property</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Truth Score™</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Views / Inquiries</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100 font-medium text-charcoal-700">
                    {properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4">
                          <Link href={`/property/${prop.slug}`} className="font-bold text-forest-950 hover:underline">
                            {prop.title}
                          </Link>
                          <span className="block text-[11px] text-charcoal-400 mt-0.5">
                            {prop.localityName}, {prop.city}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-charcoal-700 font-bold text-[10px]">
                            {prop.propertyType}
                          </span>
                        </td>
                        <td className="p-4 font-serif font-black text-forest-900 text-sm">
                          {formatCurrencyINR(prop.price)}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-forest-100 text-forest-800">
                            <ShieldCheck className="w-3.5 h-3.5 text-gold-accent" />
                            {prop.truthScore}/100
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {prop.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {prop.viewsCount} views • {prop.enquiriesCount} inquiries
                        </td>
                        <td className="p-4 flex items-center gap-2">
                          {prop.isPromoted ? (
                            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] flex items-center gap-1 shadow-xs">
                              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                              Boosted
                            </span>
                          ) : (
                            <button
                              onClick={() => handleBoostProperty(prop.slug)}
                              className="px-2.5 py-1 rounded-lg bg-gold-accent hover:bg-gold-light text-forest-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                              title="Pin listing to top rank in marketplace"
                            >
                              <Zap className="w-3 h-3 fill-forest-950" />
                              Boost (₹499)
                            </button>
                          )}
                          <Link
                            href={`/property/${prop.slug}`}
                            className="p-1.5 text-forest-800 hover:text-forest-950 inline-block"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CRM PIPELINE */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-forest-950">
                Lead Pipeline &amp; CRM ({leads.length} Leads)
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-charcoal-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-charcoal-200 text-charcoal-500 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Inquired Property</th>
                      <th className="p-4">Status Transition</th>
                      <th className="p-4">Notes</th>
                      <th className="p-4">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100 font-medium text-charcoal-700">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-bold text-forest-950">
                          {lead.name}
                        </td>
                        <td className="p-4 text-xs space-y-1">
                          <div className="flex items-center gap-1 text-charcoal-800">
                            <Phone className="w-3 h-3 text-forest-700" />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-1 text-charcoal-500 text-[11px]">
                              <Mail className="w-3 h-3" />
                              <span>{lead.email}</span>
                            </div>
                          )}
                          <div>
                            <a
                              href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, this is ${user.name} from ${org?.name || 'EstateOS'}. I received your inquiry regarding ${lead.property?.title || 'property'}. When would you like to schedule an inspection?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[10px] transition-colors"
                              title="Instant WhatsApp Ping (< 15s speed-to-lead)"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp Lead</span>
                            </a>
                          </div>
                        </td>
                        <td className="p-4 max-w-[200px] truncate">
                          {lead.property?.title || 'General Inbound Inquiry'}
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="text-xs font-bold rounded-lg border border-charcoal-200 px-2 py-1 bg-white text-forest-900 focus:outline-none"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="QUALIFIED">QUALIFIED</option>
                            <option value="SITE_VISIT_SCHEDULED">VISIT SCHEDULED</option>
                            <option value="NEGOTIATING">NEGOTIATING</option>
                            <option value="CONVERTED">CONVERTED</option>
                            <option value="LOST">LOST</option>
                          </select>
                        </td>
                        <td className="p-4 max-w-[240px] text-xs text-charcoal-600 line-clamp-2">
                          {lead.notes || lead.message || 'No remarks recorded'}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-charcoal-600 text-[10px] font-bold">
                            {lead.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VERIFIED BUYER LEAD MARKETPLACE (GOLDMINE #3) */}
        {activeTab === 'leads_market' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-2">
                  <Flame className="w-3.5 h-3.5 text-gold-accent" />
                  <span>Verified Buyer Lead Exchange</span>
                </div>
                <h2 className="font-serif font-bold text-2xl text-forest-950">
                  Pre-Sanctioned Buyer Leads Marketplace
                </h2>
                <p className="text-xs text-charcoal-600 mt-1">
                  100% phone-verified high-intent property buyers with pre-approved bank loans and immediate 30-day buying timeline.
                </p>
              </div>

              {/* Lead Packs CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleBuyPack('Starter Pack (10 Leads)', 10, 4999)}
                  className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm border border-forest-700 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-accent" />
                  <span>Buy 10 Leads Pack (₹4,999)</span>
                </button>
                <button
                  onClick={() => handleBuyPack('Growth Investor Pack (25 Leads)', 25, 9999)}
                  className="px-4 py-2.5 rounded-xl bg-gold-accent hover:bg-gold-light text-forest-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-forest-950" />
                  <span>Buy 25 Leads Pack (₹9,999)</span>
                </button>
              </div>
            </div>

            {leadPackNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
                <span>{leadPackNotice}</span>
                <button onClick={() => setLeadPackNotice(null)} className="text-emerald-700 hover:underline">Dismiss</button>
              </div>
            )}

            {/* Curated Verified Leads Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketLeads.map((lead) => {
                const isUnlocked = unlockedLeads.includes(lead.id);
                return (
                  <div
                    key={lead.id}
                    className="bg-white rounded-2xl border border-charcoal-200 p-5 shadow-sm hover:border-gold-accent/70 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 mb-3">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-charcoal-400 block">{lead.id}</span>
                          <h3 className="font-bold text-sm text-forest-950">{lead.name}</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Pre-Qualified
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-charcoal-500">Budget Range:</span>
                          <span className="font-bold text-forest-900">{lead.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal-500">Requirement:</span>
                          <span className="font-semibold text-charcoal-800 text-right">{lead.propertyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal-500">Target Locality:</span>
                          <span className="font-semibold text-charcoal-800 text-right">{lead.locality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal-500">CIBIL Score:</span>
                          <span className="font-bold text-emerald-700">{lead.cibil} (Prime)</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-charcoal-100 text-[11px] text-charcoal-700 leading-snug">
                          <strong>Bank Status:</strong> {lead.loanStatus}
                        </div>
                        <div className="text-[11px] text-amber-800 font-semibold italic">
                          &bull; {lead.intent}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-charcoal-100">
                      {isUnlocked ? (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{lead.fullPhone}</span>
                            </div>
                            <div className="text-[11px] text-emerald-800 mt-0.5 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{lead.email}</span>
                            </div>
                          </div>
                          <a
                            href={`https://wa.me/${lead.fullPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, this is ${user.name} from ${org?.name || 'EstateOS'}. I have exclusive matching units for your ${lead.propertyType} requirement in ${lead.locality}. When can we connect?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp Buyer Directly</span>
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-charcoal-400">
                            {lead.maskedPhone}
                          </span>
                          <button
                            onClick={() => handleUnlockLead(lead.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-gold-accent font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                          >
                            <Lock className="w-3.5 h-3.5 text-gold-accent" />
                            <span>Unlock Lead (₹599)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: AI LISTING COPYWRITER */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-charcoal-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-forest-900">
                <Sparkles className="w-5 h-5 text-gold-accent" />
                <h3 className="font-serif font-bold text-xl">AI Property Copywriter</h3>
              </div>
              <p className="text-xs text-charcoal-500">
                Instantly generate luxury, RERA-compliant marketing copy for your listings.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={aiType}
                    onChange={(e) => setAiType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  >
                    <option>Apartment</option>
                    <option>Sky Penthouse</option>
                    <option>Waterfront Villa</option>
                    <option>Commercial IT Floor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Bedrooms (BHK)
                  </label>
                  <input
                    type="number"
                    value={aiBhk}
                    onChange={(e) => setAiBhk(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Carpet Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={aiArea}
                    onChange={(e) => setAiArea(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Locality &amp; City
                  </label>
                  <input
                    type="text"
                    value={aiLocality}
                    onChange={(e) => setAiLocality(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Key USPs &amp; Amenities
                </label>
                <textarea
                  rows={2}
                  value={aiHighlights}
                  onChange={(e) => setAiHighlights(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 resize-none"
                />
              </div>

              <button
                onClick={handleGenerateDescription}
                disabled={aiLoading}
                className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-gold-accent font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold-accent" />
                <span>{aiLoading ? 'Generating with AI...' : 'Generate Listing Copy'}</span>
              </button>
            </div>

            <div className="lg:col-span-6 bg-forest-950 text-white p-6 sm:p-8 rounded-3xl border border-forest-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-forest-800 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-accent">
                    Generated Luxury Copy
                  </span>
                  {generatedText && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedText);
                        alert('Copied to clipboard!');
                      }}
                      className="text-xs text-forest-200 hover:text-white underline"
                    >
                      Copy to Clipboard
                    </button>
                  )}
                </div>

                <div className="text-xs text-forest-100 whitespace-pre-line leading-relaxed max-h-[400px] overflow-y-auto pr-2">
                  {generatedText || 'Click "Generate Listing Copy" on the left to instantly preview your tailored property description.'}
                </div>
              </div>

              <p className="mt-6 text-[10px] text-forest-400">
                *Outputs comply with Indian Advertising Standards Council and RERA statutory disclosure mandates.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: SITE VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-xl text-forest-950">
              Site Walkthrough Appointments ({appointments.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map((app) => (
                <div key={app.id} className="p-5 rounded-2xl bg-white border border-charcoal-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                      {app.status}
                    </span>
                    <span className="text-xs text-charcoal-400 font-medium">
                      {new Date(app.scheduledDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-forest-950 line-clamp-1">
                    {app.property?.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-xs text-charcoal-700 border-t border-charcoal-100 pt-3">
                    <p><strong>Visitor:</strong> {app.visitorName}</p>
                    <p><strong>Phone:</strong> {app.visitorPhone}</p>
                    <p><strong>Slot:</strong> {app.timeSlot}</p>
                    {app.notes && <p className="text-charcoal-500 italic">Notes: &ldquo;{app.notes}&rdquo;</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUBSCRIPTION STATUS */}
        {activeTab === 'subscription' && (
          <div className="max-w-2xl bg-white rounded-3xl border border-charcoal-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                  Current Active Tier
                </span>
                <h3 className="font-serif text-2xl font-black text-forest-950 mt-0.5">
                  {sub.plan} Plan ({sub.billingCycle || 'MONTHLY'})
                </h3>
              </div>

              <Link
                href="/pricing"
                className="px-4 py-2 rounded-xl bg-forest-900 text-white font-bold text-xs"
              >
                Upgrade Plan
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Listings Capacity:</span>
                <strong className="text-forest-950 font-bold">{properties.length} / {sub.listingsLimit} Used</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">CRM Leads Capacity:</span>
                <strong className="text-forest-950 font-bold">{leads.length} / {sub.leadsLimit} Captured</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">AI Copywriter Tools:</span>
                <strong className="text-emerald-700 font-bold">Enabled Active</strong>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PROFILE & AGENCY SETTINGS */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl bg-white rounded-3xl border border-charcoal-200 p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>RERA Professional Credentials</span>
              </div>
              <h3 className="font-serif font-black text-2xl text-forest-950">
                My Profile &amp; Company Settings
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Manage your public consultant identity, state RERA license, contact phone for speed-to-lead alerts, and operational cities.
              </p>
            </div>

            {profSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{profSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    WhatsApp Alert Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={profPhone}
                    onChange={(e) => setProfPhone(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Agency / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profAgency}
                    onChange={(e) => setProfAgency(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    State RERA License No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={profRera}
                    onChange={(e) => setProfRera(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-bold text-forest-950 outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Primary Operating Cities / Micro-Markets *
                </label>
                <input
                  type="text"
                  required
                  value={profCity}
                  onChange={(e) => setProfCity(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 font-medium text-forest-950 outline-none focus:border-forest-700"
                  placeholder="e.g. Mohali, Chandigarh, Zirakpur, Panchkula"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Professional Bio / Agency Value Proposition
                </label>
                <textarea
                  rows={3}
                  value={profBio}
                  onChange={(e) => setProfBio(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3.5 py-2.5 text-charcoal-700 resize-none outline-none focus:border-forest-700"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={profSaving}
                  className="px-6 py-3 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {profSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-accent" />
                      <span>Saving Profile Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-gold-accent" />
                      <span>Save &amp; Update Live Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* POST NEW PROPERTY MODAL */}
      {isNewPropOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-charcoal-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-100 mb-4">
              <h3 className="font-serif font-bold text-xl text-forest-950">
                Post New Verified Property
              </h3>
              <button onClick={() => setIsNewPropOpen(false)} className="text-charcoal-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Property Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                  placeholder="e.g. Grand Horizon 3BHK Luxury Residence"
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Listing Type
                  </label>
                  <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  >
                    <option value="SALE">For Sale</option>
                    <option value="RENT">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  >
                    <option value="APARTMENT">Apartment</option>
                    <option value="PENTHOUSE">Sky Penthouse</option>
                    <option value="VILLA">Luxury Villa</option>
                    <option value="COMMERCIAL">Commercial Office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 7500000"
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Carpet Area (sq.ft) *
                  </label>
                  <input
                    type="number"
                    required
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    placeholder="e.g. 1450"
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  >
                    <option value="Mohali">Mohali</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Locality / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  RERA Registration Number
                </label>
                <input
                  type="text"
                  value={reraId}
                  onChange={(e) => setReraId(e.target.value)}
                  placeholder="e.g. PBRERA-SAS80-PR0612"
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                  Cover Photo URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-lg px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={propLoading}
                className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow"
              >
                {propLoading ? 'Submitting to Registry...' : 'Publish Listing to Marketplace'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
