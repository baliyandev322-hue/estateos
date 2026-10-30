'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                <h3 className="font-serif text-xl font-bold mt-1">EstateOS Technologies Pvt. Ltd.</h3>
                <p className="text-xs text-forest-200 mt-2 leading-relaxed">
                  Level 14, Horizon Cyber Tower, Golf Course Extension Road, Sector 54, Gurugram, Haryana - 122018, India
                </p>
              </div>

              <div className="space-y-3 text-xs text-forest-200 border-t border-forest-800 pt-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-accent" />
                  <span>Toll-Free: 1800 200 4567 (Mon-Sat, 9AM-7PM IST)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold-accent" />
                  <span>grievance@estateos.in • compliance@estateos.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-gold-accent" />
                  <span>RERA Public Nodal Grievance Officer: Adv. K. Aggarwal</span>
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
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-forest-950">Message Dispatched</h3>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto">
                  Thank you, {name}. Your ticket has been assigned to our concierge team. You will receive an email confirmation shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                    Department / Inquiry Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5"
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-accent" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
