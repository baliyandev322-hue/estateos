'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, User, Mail, Lock, Phone, Building2, ArrowRight } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'BUYER';

  const [role, setRole] = useState<'BUYER' | 'AGENT' | 'BUILDER'>(
    ['BUYER', 'AGENT', 'BUILDER'].includes(initialRole) ? (initialRole as any) : 'BUYER'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          role,
          organizationName: role !== 'BUYER' ? organizationName : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        if (role === 'BUILDER') router.push('/dashboard/builder');
        else if (role === 'AGENT') router.push('/dashboard/agent');
        else router.push('/dashboard/buyer');
        router.refresh();
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      setError('An error occurred during account registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-xl">
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Role selector tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl mb-6 text-xs font-bold">
        <button
          type="button"
          onClick={() => setRole('BUYER')}
          className={`py-2 rounded-lg transition-all ${
            role === 'BUYER' ? 'bg-forest-900 text-white shadow-sm' : 'text-charcoal-600 hover:text-forest-900'
          }`}
        >
          Buyer / Renter
        </button>
        <button
          type="button"
          onClick={() => setRole('AGENT')}
          className={`py-2 rounded-lg transition-all ${
            role === 'AGENT' ? 'bg-forest-900 text-white shadow-sm' : 'text-charcoal-600 hover:text-forest-900'
          }`}
        >
          Real Estate Agent
        </button>
        <button
          type="button"
          onClick={() => setRole('BUILDER')}
          className={`py-2 rounded-lg transition-all ${
            role === 'BUILDER' ? 'bg-forest-900 text-white shadow-sm' : 'text-charcoal-600 hover:text-forest-900'
          }`}
        >
          Builder / Dev
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Sharma"
              className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
            />
            <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vikram@properties.in"
              className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
            />
            <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
            Mobile Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
            />
            <Phone className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
          </div>
        </div>

        {role !== 'BUYER' && (
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
              {role === 'AGENT' ? 'Agency / Brokerage Name *' : 'Development Company Name *'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder={role === 'AGENT' ? 'e.g. Skyline Prime Realty' : 'e.g. Horizon Green Township Developers'}
                className="w-full text-xs bg-slate-50 border border-charcoal-200 rounded-xl pl-9 pr-3 py-2.5 text-charcoal-800 focus:outline-none focus:border-forest-700"
              />
              <Building2 className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase mb-1">
            Password (min 6 characters) *
          </label>
          <div className="relative">
            <input
              type="password"
              required
              minLength={6}
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
          <span>{loading ? 'Creating Workspace...' : 'Register Workspace'}</span>
          <ArrowRight className="w-4 h-4 text-gold-accent" />
        </button>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
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
            Create Your Account
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Choose your profile and start verified real estate operations
          </p>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-xs text-charcoal-500">Loading form...</div>}>
          <RegisterForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-charcoal-500">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-forest-900 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
