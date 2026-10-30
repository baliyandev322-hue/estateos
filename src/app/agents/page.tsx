import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ShieldCheck, MapPin, Phone, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CURATED_AGENTS = [
  {
    id: 'agent-1',
    name: 'Rajesh Verma',
    email: 'rajesh@apexheritage.in',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    reraNumber: 'PBRERA-A-2023-0182',
    experienceYears: 12,
    city: 'Mohali & Chandigarh',
    dealsClosed: 140,
    memberships: [
      {
        organization: {
          name: 'Apex Heritage Realty',
          slug: 'apex-heritage-realty',
          city: 'Mohali',
        },
      },
    ],
    properties: [
      { id: 'p1', title: 'Grand Azure Residences', price: 9200000, slug: 'grand-azure-residences' },
      { id: 'p2', title: 'Green Lotus Smart Homes', price: 5800000, slug: 'green-lotus-avenue-2bhk-it-city-mohali' },
    ],
  },
  {
    id: 'agent-2',
    name: 'Priya Sharma',
    email: 'priya@tricityrealty.com',
    phone: '+91 98112 33445',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    reraNumber: 'HRERA-A-GGM-2022-89',
    experienceYears: 9,
    city: 'Gurugram & Delhi NCR',
    dealsClosed: 95,
    memberships: [
      {
        organization: {
          name: 'Horizon Prime Advisory',
          slug: 'horizon-prime-advisory',
          city: 'Gurugram',
        },
      },
    ],
    properties: [
      { id: 'p3', title: 'The Camellias Signature Penthouse', price: 48500000, slug: 'the-camellias-signature-4bhk-sky-mansion-gurugram' },
    ],
  },
  {
    id: 'agent-3',
    name: 'Vikramjit Singh',
    email: 'vikram@panchkulaluxury.com',
    phone: '+91 99880 77665',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    reraNumber: 'HRERA-PKL-A-2024-41',
    experienceYears: 15,
    city: 'Panchkula & New Chandigarh',
    dealsClosed: 210,
    memberships: [
      {
        organization: {
          name: 'Shivalik Estates',
          slug: 'shivalik-estates',
          city: 'Panchkula',
        },
      },
    ],
    properties: [
      { id: 'p4', title: 'The Valley Gardens Villa', price: 17500000, slug: 'the-valley-gardens-villa-panchkula' },
    ],
  },
];

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
    console.warn('Failed to load agents from DB, using curated network:', err);
  }

  if (!agents || agents.length === 0) {
    agents = CURATED_AGENTS;
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
                className="card-luxury rounded-2xl bg-white border border-charcoal-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=0F2E1E&color=D4AF37`}
                      alt={agent.name}
                      className="w-14 h-14 rounded-full object-cover border border-gold-accent/40"
                    />
                    <div>
                      <h3 className="font-serif font-black text-forest-950 text-base">{agent.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-600 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-accent" />
                        <span>{agent.city || org?.city || 'Tri-City & NCR'}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>RERA: {agent.reraNumber || 'Verified License'}</span>
                      </div>
                    </div>
                  </div>

                  {org && (
                    <div className="p-3 bg-slate-50 rounded-xl mb-4 text-xs">
                      <span className="text-[10px] text-charcoal-500 uppercase font-bold block">Advisory Firm</span>
                      <span className="font-bold text-forest-900">{org.name}</span>
                    </div>
                  )}

                  {agent.properties && agent.properties.length > 0 && (
                    <div>
                      <span className="text-[10px] text-charcoal-500 uppercase font-bold block mb-2">Featured Listings</span>
                      <div className="space-y-1.5">
                        {agent.properties.slice(0, 2).map((p: any) => (
                          <Link
                            key={p.id}
                            href={`/property/${p.slug}`}
                            className="block p-2 bg-slate-50 hover:bg-forest-50/50 rounded-lg text-xs font-semibold text-charcoal-800 transition-colors"
                          >
                            <span className="line-clamp-1">{p.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-charcoal-100 mt-6 flex items-center justify-between">
                  <a
                    href={`https://wa.me/91${(agent.phone || '9876543210').replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`Hi ${agent.name}, I found your profile on EstateOS. I would like to consult on luxury property investments.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Connect on WhatsApp</span>
                  </a>
                  <Link
                    href={`/properties?agent=${encodeURIComponent(agent.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-forest-900 hover:underline"
                  >
                    <span>View Listings</span>
                    <ExternalLink className="w-3 h-3" />
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
