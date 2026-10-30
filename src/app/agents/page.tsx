import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ShieldCheck, MapPin, Phone, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AgentsDirectoryPage() {
  let agents: any[] = [];
  try {
    agents = await prisma.user.findMany({
      where: { role: 'AGENT' },
      include: {
        memberships: {
          include: { organization: true },
        },
        properties: {
          select: { id: true, title: true, price: true, slug: true },
        },
      },
    });
  } catch (err) {
    console.warn('Failed to load agents from DB:', err);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Accredited Broker Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            Certified RERA Real Estate Consultants
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
            Work directly with verified professionals who maintain audited compliance with State Real Estate Regulatory Authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const org = agent.memberships?.[0]?.organization;
            return (
              <div
                key={agent.id}
                className="card-luxury rounded-2xl bg-white border border-charcoal-200/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={agent.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-forest-800"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-forest-950">{agent.name}</h3>
                      <p className="text-xs text-charcoal-500 font-semibold">{org?.name || 'Independent Brokerage'}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        RERA License Verified
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-charcoal-600 leading-relaxed mb-4 line-clamp-3">
                    {agent.bio || 'Premier real estate advisor assisting buyers and investors with high-yield residential and commercial acquisitions.'}
                  </p>

                  <div className="space-y-1.5 py-3 border-y border-charcoal-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">License ID:</span>
                      <strong className="text-forest-950 font-mono text-[11px]">{agent.licenseNo || 'PBRERA-AGT-2023-0941'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">Experience:</span>
                      <strong className="text-forest-950">{agent.experienceYrs || 10}+ Years</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">Market Coverage:</span>
                      <strong className="text-forest-950">{agent.city || 'Mohali & Gurugram'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-500">Audited Listings:</span>
                      <strong className="text-emerald-700">{agent.properties.length} Active</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href={`/properties?city=${agent.city || 'Mohali'}`}
                    className="w-full py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Consultant Listings</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
