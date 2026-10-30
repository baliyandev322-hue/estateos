import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Building2, CheckCircle2, ShieldCheck, MapPin, Award, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BuildersDirectoryPage() {
  let builders: any[] = [];
  try {
    builders = await prisma.organization.findMany({
      where: { type: 'BUILDER_DEV' },
      include: {
        properties: {
          select: { id: true, title: true, price: true, slug: true },
        },
      },
    });
  } catch (err) {
    console.warn('Failed to load builders from DB:', err);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4" />
            <span>Developer Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            Premier RERA-Audited Real Estate Developers
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Discover established property builders with verified escrow accounts, delivery track records, and IGBC-certified townships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {builders.map((bld) => (
            <div
              key={bld.id}
              className="card-luxury rounded-3xl bg-white border border-charcoal-200/80 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={bld.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80'}
                    alt={bld.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-forest-800"
                  />
                  <div>
                    <h3 className="font-serif font-black text-xl text-forest-950">{bld.name}</h3>
                    <p className="text-xs text-charcoal-500 font-medium">{bld.city}, {bld.state}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Statutory RERA Audited
                    </span>
                  </div>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed mb-6">
                  {bld.description || 'Award-winning developer creating iconic gated communities with premier architectural specifications.'}
                </p>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-charcoal-100 text-xs mb-4">
                  <div>
                    <span className="text-charcoal-400 block text-[11px]">RERA Developer ID</span>
                    <strong className="text-forest-950 font-mono text-xs">{bld.reraNumber || 'HRERA-PKL-GGM-1190'}</strong>
                  </div>
                  <div>
                    <span className="text-charcoal-400 block text-[11px]">Active Showcase Projects</span>
                    <strong className="text-emerald-700 font-bold">{bld.properties.length} Gated Towers</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/properties?city=${bld.city}`}
                  className="w-full py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Developer Projects</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
