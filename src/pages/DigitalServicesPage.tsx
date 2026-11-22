import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  Info,
  Lock,
  MessageCircle,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { DIGITAL_SERVICES } from '../data/mockData';
import type { ServiceCategory } from '../types';
import { useApp } from '../context/AppContext';
import { buildServiceWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';

const TABS: ('All' | ServiceCategory)[] = [
  'All',
  'RITA Services',
  'NIDA Services',
  'TRA Services',
  'BRELA Services',
  'Immigration Services',
  'Other Business & Digital Services',
];

const PORTAL_INFO: Record<
  ServiceCategory,
  { name: string; links: { label: string; url: string }[] }
> = {
  'RITA Services': {
    name: 'RITA – eRITA Portal',
    links: [{ label: 'erita.rita.go.tz', url: 'https://erita.rita.go.tz/' }],
  },
  'NIDA Services': {
    name: 'NIDA Online Services Portal',
    links: [{ label: 'services.nida.go.tz', url: 'https://services.nida.go.tz/' }],
  },
  'TRA Services': {
    name: 'TRA Taxpayer Portal',
    links: [
      { label: 'taxpayerportal.tra.go.tz', url: 'https://taxpayerportal.tra.go.tz/' },
    ],
  },
  'BRELA Services': {
    name: 'BRELA BOS & ORS',
    links: [
      { label: 'bos.brela.go.tz', url: 'https://bos.brela.go.tz/' },
      { label: 'ors.brela.go.tz', url: 'https://ors.brela.go.tz/' },
    ],
  },
  'Immigration Services': {
    name: 'Tanzania e-Immigration Portal',
    links: [
      {
        label: 'eservices.immigration.go.tz',
        url: 'https://eservices.immigration.go.tz/',
      },
    ],
  },
  'Other Business & Digital Services': {
    name: 'Business Support & Document Services',
    links: [],
  },
};

export const DigitalServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get('cat') as 'All' | ServiceCategory) || 'All';
  const [activeTab, setActiveTab] = useState<'All' | ServiceCategory>(
    TABS.includes(initialCat) ? initialCat : 'All'
  );
  const [query, setQuery] = useState('');
  const { formatPrice } = useApp();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DIGITAL_SERVICES.filter((s) => {
      if (activeTab !== 'All' && s.category !== activeTab) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.subGroup || '').toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
      );
    });
  }, [activeTab, query]);

  const handleTab = (tab: 'All' | ServiceCategory) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: tab });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-br from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold mb-3">
            <FileCheck2 className="w-3.5 h-3.5" />
            Independent Digital Services Assistance Provider · Tanzania
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
            Online &amp; Digital Services Portal
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/85 mt-2">
            Helping individuals and businesses in Tanzania access and use official government platforms (RITA, NIDA, TRA, BRELA, e-Immigration) plus business &amp; document support.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-2 text-xs shrink-0">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <Lock className="w-4 h-4" />
            <span>Secure Document Submission</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Govt Fees &amp; Service Fees Shown Separately</span>
          </div>
          <a
            href={buildWhatsAppUrl(
              'Hello Shema Digital Services, I would like assistance with an online government or business service.'
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 pt-1 text-emerald-300 font-bold hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat with Digital Desk on WhatsApp →
          </a>
        </div>
      </div>

      {/* How Shema Provides These Services + Transparency Notice */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-display font-bold text-base sm:text-lg text-slate-900">
            How Shema Provides These Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
            {[
              'Explaining application requirements clearly',
              'Preparing and organising supporting documents',
              'Helping customers complete online application forms',
              'Providing guidance on official payments',
              'Assisting with online application submission',
              'Helping customers check application progress',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <Info className="w-4 h-4 shrink-0" />
            Official Authority Disclaimer
          </div>
          <p className="leading-relaxed text-amber-900/90">
            Government fees and Shema&apos;s service charges are displayed separately. All official registrations, certificates, identification numbers, and approvals are issued or determined by the respective government authorities, not by Shema.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services (e.g. Birth, NIN, TIN, BRELA, Passport, PDF)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> services
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab !== 'All' && PORTAL_INFO[activeTab].links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5">
            <span className="font-semibold text-slate-700">
              Official Portal ({PORTAL_INFO[activeTab].name}):
            </span>
            {PORTAL_INFO[activeTab].links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-emerald-700 font-semibold hover:underline"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                  {srv.category}
                </span>
                {srv.subGroup && (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                    {srv.subGroup}
                  </span>
                )}
              </div>

              <h2 className="font-display font-bold text-lg text-slate-900">
                {srv.title}
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {srv.shortDescription}
              </p>

              {/* Official Portal Link(s) */}
              {(srv.officialPortalUrl || srv.officialPortalUrls) && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {srv.officialPortalUrls ? (
                    srv.officialPortalUrls.map((p) => (
                      <a
                        key={p.url}
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                      >
                        <span>{p.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))
                  ) : (
                    srv.officialPortalUrl && (
                      <a
                        href={srv.officialPortalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )
                  )}
                </div>
              )}

              <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Est. {srv.processingTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Official Government Fee:</span>
                  <span className="font-semibold text-slate-900">
                    {srv.govtFeeTZS === 0 ? 'None / As Assessed' : formatPrice(srv.govtFeeTZS)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Shema Assistance Charge:</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(srv.serviceFeeTZS)}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Requirements
                </div>
                {srv.requirements.slice(0, 3).map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-1.5 text-xs text-slate-600"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500">
                    Total (Govt + Shema Fee)
                  </div>
                  <div className="font-display font-extrabold text-lg text-slate-900">
                    {formatPrice(srv.serviceFeeTZS + srv.govtFeeTZS)}
                  </div>
                </div>

                <Link
                  to={`/digital-services/${srv.id}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <a
                href={buildWhatsAppUrl(
                  buildServiceWhatsAppMessage({
                    serviceTitle: srv.title,
                    category: srv.category,
                    portalUrl: srv.officialPortalUrl,
                  })
                )}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-[11px] font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask / Apply via WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
