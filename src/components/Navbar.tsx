'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Compass,
  Sparkles,
  Calculator,
  BookOpen,
  Building2,
  UserCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Layers,
  Search,
} from 'lucide-react';
import { SITE_CONTACT } from '@/config/siteContact';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'Buy', href: '/properties?listingType=SALE' },
    { name: 'Rent', href: '/properties?listingType=RENT' },
    { name: 'Commercial', href: '/properties?propertyType=COMMERCIAL' },
    { name: 'Truth Score™', href: '/truth-score', badge: 'Verified' },
    { name: 'Localities', href: '/localities' },
    { name: 'AI Matchmaker', href: '/ai-matchmaker', icon: Sparkles, highlight: true },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Guides & News', href: '/guides' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/dashboard/admin';
    if (user.role === 'BUILDER') return '/dashboard/builder';
    if (user.role === 'AGENT') return '/dashboard/agent';
    return '/dashboard/buyer';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-forest-100 shadow-sm transition-all">
      {/* Top Banner Notice for RERA & AdSense compliance */}
      <div className="bg-forest-900 text-forest-50 py-1.5 px-4 text-xs font-medium tracking-wide flex justify-between items-center">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-accent" />
          <span>India&apos;s First RERA-Audited Marketplace with <strong>Property Truth Score™</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-forest-200">
          <Link href="/agents" className="hover:text-gold-light transition-colors">Agents Directory</Link>
          <span className="opacity-40">•</span>
          <Link href="/builders" className="hover:text-gold-light transition-colors">Builders Showcase</Link>
          <span className="opacity-40">•</span>
          <Link href="/contact" className="hover:text-gold-light transition-colors">Help: {SITE_CONTACT.tollFree}</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-forest-900 flex items-center justify-center shadow-md border border-gold-accent/40 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-2xl text-gold-accent">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-forest-900 group-hover:text-forest-700 transition-colors">
                Estate<span className="text-gold-accent">OS</span>
              </span>
              <span className="text-[10px] tracking-widest text-charcoal-400 font-semibold uppercase">
                PropTech Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href.split('?')[0];

              if (item.highlight) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-forest-900 bg-gold-50 border border-gold-300 hover:bg-gold-100 transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                    <span>{item.name}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-forest-900 bg-forest-50 font-bold'
                      : 'text-charcoal-600 hover:text-forest-900 hover:bg-forest-50/60'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.name}
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-forest-100 text-forest-700 uppercase">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Auth & Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard/agent"
              className="px-3.5 py-2 text-xs font-bold text-forest-800 bg-forest-100/70 hover:bg-forest-100 rounded-lg transition-colors border border-forest-200"
            >
              For Agents &amp; Builders
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-forest-200 hover:border-gold-accent bg-white transition-all shadow-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-forest-300"
                  />
                  <div className="text-left text-xs">
                    <p className="font-bold text-forest-900 leading-tight">{user.name.split(' ')[0]}</p>
                    <span className="text-[10px] uppercase font-bold text-gold-700">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-charcoal-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-charcoal-100">
                      <p className="text-xs font-bold text-forest-900">{user.name}</p>
                      <p className="text-[11px] text-charcoal-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-md bg-forest-100 text-forest-800">
                        Role: {user.role}
                      </span>
                    </div>

                    <Link
                      href={getDashboardLink()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-charcoal-700 hover:bg-forest-50 hover:text-forest-900 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-forest-700" />
                      Open {user.role === 'ADMIN' ? 'Super Admin' : user.role === 'BUILDER' ? 'Builder SaaS' : user.role === 'AGENT' ? 'Agent CRM' : 'Buyer Hub'}
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/dashboard/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-charcoal-700 hover:bg-forest-50 hover:text-forest-900"
                      >
                        <ShieldCheck className="w-4 h-4 text-gold-accent" />
                        Listing Approvals &amp; Truth Scores
                      </Link>
                    )}

                    <div className="border-t border-charcoal-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-forest-900 hover:text-forest-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-md border border-forest-700 hover:border-gold-accent transition-all"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/ai-matchmaker"
              className="p-2 text-forest-900 bg-gold-50 border border-gold-300 rounded-lg"
            >
              <Sparkles className="w-4 h-4 text-gold-600" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-600 hover:text-forest-900 rounded-lg hover:bg-forest-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-forest-100 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal-700 hover:bg-forest-50 hover:text-forest-900"
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-charcoal-100 space-y-2">
            {user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-sm font-bold text-white bg-forest-900 rounded-lg shadow"
                >
                  Go to {user.role} Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 text-center text-xs font-bold text-red-600 border border-red-200 rounded-lg"
                >
                  Sign Out ({user.email})
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-forest-900 border border-forest-300 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-bold text-white bg-forest-900 rounded-lg shadow"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
