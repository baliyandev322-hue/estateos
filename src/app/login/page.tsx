'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
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
            Access your multi-tenant CRM, listings, and customer leads
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-xl">
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
              disabled={loading}
              className="w-full py-3 text-xs font-black uppercase tracking-wider text-white bg-forest-900 hover:bg-forest-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-forest-700 hover:border-gold-accent"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-gold-accent" />
            </button>
          </form>

          {/* Quick Demo Switcher helper */}
          <div className="mt-6 pt-5 border-t border-charcoal-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal-400 mb-2">
              Instant Demo Logins (Click to autofill):
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@estateos.com', 'admin123')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-forest-50 text-charcoal-800 text-left border border-charcoal-200"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('agent@estateos.com', 'agent123')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-forest-50 text-charcoal-800 text-left border border-charcoal-200"
              >
                Agent (Apex Realty)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('builder@estateos.com', 'builder123')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-forest-50 text-charcoal-800 text-left border border-charcoal-200"
              >
                Builder (Singhania)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('buyer@estateos.com', 'buyer123')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-forest-50 text-charcoal-800 text-left border border-charcoal-200"
              >
                Buyer (Priya)
              </button>
            </div>
          </div>
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
