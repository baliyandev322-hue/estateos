'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Send, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react';
import { SITE_CONTACT } from '@/config/siteContact';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Marketplace Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setTicketId(data.ticketId);
      setWhatsappUrl(data.whatsappAlertUrl || '');
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            Contact EstateOS Support &amp; Grievance
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Reach our central compliance cell, developer support team, or customer concierge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-forest-950 text-white rounded-3xl p-8 border border-forest-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-accent">
                  Headquarters
                </span>
                <h3 className="font-serif text-xl font-bold mt-1">{SITE_CONTACT.companyName}</h3>
                <p className="text-xs text-forest-200 mt-2 leading-relaxed">
                  {SITE_CONTACT.address.fullFormatted}
                </p>
              </div>

              <div className="space-y-3 text-xs text-forest-200 border-t border-forest-800 pt-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-accent shrink-0" />
                  <a href={`tel:${SITE_CONTACT.tollFree.replace(/\s+/g, '')}`} className="hover:text-gold-light transition-colors">
                    {SITE_CONTACT.tollFree} ({SITE_CONTACT.operatingHours})
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold-accent shrink-0" />
                  <a href={`mailto:${SITE_CONTACT.supportEmail}`} className="hover:text-gold-light transition-colors">
                    {SITE_CONTACT.supportEmail} • {SITE_CONTACT.complianceEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-gold-accent shrink-0" />
                  <span>{SITE_CONTACT.grievanceOfficer}</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-[11px] text-forest-400">
              *All statutory consumer grievances are acknowledged within 24 hours under State Real Estate Regulatory Authority regulations.
            </p>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-charcoal-200 p-8 shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-forest-950">Inquiry Dispatched &amp; Logged</h3>
                <div className="inline-block bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono font-bold text-forest-900">
                  Tracking Ticket ID: <span className="text-gold-accent font-black">{ticketId}</span>
                </div>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your request has been assigned to our concierge compliance team. We have registered your contact details ({phone}) for prompt follow-up.
                </p>
                {whatsappUrl && (
                  <div className="pt-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Connect via WhatsApp Concierge</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Department / Inquiry Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 outline-none focus:border-forest-700"
                  >
                    <option>General Marketplace Inquiry</option>
                    <option>Agent / Broker SaaS Partnership</option>
                    <option>Developer Enterprise Integration</option>
                    <option>RERA Verification Dispute or Report</option>
                    <option>Google AdSense &amp; Advertising Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, project details or grievance..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 resize-none outline-none focus:border-forest-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-accent" />
                      <span>Logging Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-accent" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
