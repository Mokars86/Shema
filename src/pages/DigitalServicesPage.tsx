import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { DIGITAL_SERVICES } from '../data/mockData';
import type { ServiceCategory } from '../types';
import { useApp } from '../context/AppContext';

const TABS: ('All' | ServiceCategory)[] = [
  'All',
  'Passport',
  'Permits & Licenses',
  'Tax & Business',
  'Utility Assistance',
];

export const DigitalServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get('cat') as 'All' | ServiceCategory) || 'All';
  const [activeTab, setActiveTab] = useState<'All' | ServiceCategory>(initialCat);
  const { formatPrice } = useApp();

  const filtered = DIGITAL_SERVICES.filter(
    (s) => activeTab === 'All' || s.category === activeTab
  );

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
            Verified Digital Concierge
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
            Government &amp; Digital Services Portal
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/85 mt-2">
            Submit your information and documents securely online. We audit every form before filing, eliminate errors, and provide a live Tracking ID.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-2 text-xs shrink-0">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <Lock className="w-4 h-4" />
            <span>Encrypted Document Vault</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct Specialist Chat Included</span>
          </div>
          <Link
            to="/track"
            className="block pt-1 text-emerald-300 font-bold hover:underline"
          >
            Already applied? Track Status →
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                  {srv.category}
                </span>
                {srv.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">
                    {srv.badge}
                  </span>
                )}
              </div>

              <h2 className="font-display font-bold text-xl text-slate-900">
                {srv.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {srv.shortDescription}
              </p>

              <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Est. {srv.processingTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Government Fee:</span>
                  <span className="font-semibold text-slate-900">
                    {srv.govtFeeGHS === 0 ? 'None' : formatPrice(srv.govtFeeGHS)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Shema Processing Fee:</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(srv.serviceFeeGHS)}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  What You Need
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

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-500">Total Payable</div>
                <div className="font-display font-extrabold text-xl text-slate-900">
                  {formatPrice(srv.serviceFeeGHS + srv.govtFeeGHS)}
                </div>
              </div>

              <Link
                to={`/digital-services/${srv.id}`}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Start Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
