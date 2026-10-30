'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  Building2,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [error, setError] = useState('');

  const executeLogin = async (loginEmail: string, loginPass: string, demoLabel?: string) => {
    if (demoLabel) setActiveDemo(demoLabel);
    else setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      const data = await res.json();
      if (res.ok) {
        const role = data.user?.role;
        if (role === 'ADMIN') router.push('/dashboard/admin');
        else if (role === 'BUILDER') router.push('/dashboard/builder');
        else if (role === 'AGENT') router.push('/dashboard/agent');
        else router.push('/dashboard/buyer');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during authentication');
    } finally {
      setLoading(false);
      setActiveDemo(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeLogin(email, password);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 border border-gold-accent/40 flex items-center justify-center shadow-md">
              <span className="font-serif font-bold text-xl text-gold-accent">E</span>
            </div>
            <span className="font-serif text-2xl font-black text-forest-950">
              Estate<span className="text-gold-accent">OS</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-forest-950">
            Sign In to Your Workspace
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Access multi-tenant PropTech CRM, listings, and statutory tools
          </p>
        </div>

        {/* 1-CLICK QUICK DEMO ACCESS FOR INVESTORS & BUYERS */}
        <div className="mb-6 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 text-white rounded-3xl p-5 border border-forest-800 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-forest-800/80 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-accent animate-pulse" />
              <span className="text-xs font-black tracking-wider uppercase text-gold-accent">
                1-Click Quick Demo Login
              </span>
            </div>
            <span className="text-[10px] bg-forest-800/80 text-forest-200 px-2 py-0.5 rounded-full border border-forest-700">
              No password needed
            </span>
          </div>
          
          <div className="space-y-2">
            {/* 1. AGENT DEMO */}
            <button
              type="button"
              disabled={!!activeDemo || loading}
              onClick={() => executeLogin('agent@estateos.com', 'agent123', 'AGENT')}
              className="w-full text-left p-3 rounded-2xl bg-forest-900/90 hover:bg-forest-800/90 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-between group shadow-sm disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Explore as Verified Agent</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                      Live CRM
                    </span>
                  </div>
                  <div className="text-[10px] text-forest-300">
                    Apex Heritage Realty • Listings, Leads &amp; Profile Edit
                  </div>
                </div>
              </div>
              <div>
                {activeDemo === 'AGENT' ? (
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-emerald-400/70 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </button>

            {/* 2. BUILDER DEMO */}
            <button
              type="button"
              disabled={!!activeDemo || loading}
              onClick={() => executeLogin('builder@estateos.com', 'builder123', 'BUILDER')}
              className="w-full text-left p-3 rounded-2xl bg-forest-900/90 hover:bg-forest-800/90 border border-sky-500/30 hover:border-sky-400 transition-all flex items-center justify-between group shadow-sm disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Explore as Developer / Builder</span>
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded font-semibold">
                      Inventory
                    </span>
                  </div>
                  <div className="text-[10px] text-forest-300">
                    Singhania Infrastructure • Add Towers, Phases &amp; Escrow
                  </div>
                </div>
              </div>
              <div>
                {activeDemo === 'BUILDER' ? (
                  <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-sky-400/70 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </button>

            {/* 3. SUPER ADMIN DEMO */}
            <button
              type="button"
              disabled={!!activeDemo || loading}
              onClick={() => executeLogin('admin@estateos.com', 'admin123', 'ADMIN')}
              className="w-full text-left p-3 rounded-2xl bg-forest-900/90 hover:bg-forest-800/90 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center justify-between group shadow-sm disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Explore as SuperAdmin</span>
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-semibold">
                      Master Control
                    </span>
                  </div>
                  <div className="text-[10px] text-forest-300">
                    Full Platform Governance • MRR Revenue &amp; Verification
                  </div>
                </div>
              </div>
              <div>
                {activeDemo === 'ADMIN' ? (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-purple-400/70 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form Card */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-sm">
          <div className="text-center pb-4 border-b border-charcoal-100 mb-4">
            <span className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
              Or Sign In With Email &amp; Password
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.in"
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-charcoal-700 uppercase">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!activeDemo}
              className="w-full py-3 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-forest-700 hover:border-gold-accent disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In with Credentials'}</span>
              <ArrowRight className="w-4 h-4 text-gold-accent" />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-charcoal-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-bold text-forest-900 hover:underline">
            Register as Buyer, Agent or Builder
          </Link>
        </p>
      </div>
    </div>
  );
}

