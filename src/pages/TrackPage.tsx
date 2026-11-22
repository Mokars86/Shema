import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Cpu,
  FileCheck2,
  PackageCheck,
  Search,
  Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { orders, serviceRequests, formatPrice } = useApp();
  const [query, setQuery] = useState(searchParams.get('id') || 'SHM-SRV-84920');

  const trimmed = query.trim().toUpperCase();
  const matchedOrder = orders.find((o) => o.id.toUpperCase() === trimmed);
  const matchedService = serviceRequests.find(
    (s) => s.trackingId.toUpperCase() === trimmed
  );

  const orderStages = ['Confirmed', 'Packed', 'In Transit', 'Delivered'];
  const serviceStages = ['Submitted', 'Under Review', 'Processing', 'Completed'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Unified Tracking Center
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
          Track My Order or Digital Service
        </h1>
        <p className="text-sm text-slate-500">
          Enter your Electronics Order ID (e.g. <code className="font-bold">SHM-ORD-1042</code>) or Digital Service Tracking ID (e.g. <code className="font-bold">SHM-SRV-84920</code>).
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Tracking ID (e.g. SHM-SRV-84920)"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setQuery('SHM-SRV-84920')}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 cursor-pointer"
            >
              Demo Service
            </button>
            <button
              onClick={() => setQuery('SHM-ORD-1042')}
              className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 cursor-pointer"
            >
              Demo Order
            </button>
          </div>
        </div>
      </div>

      {/* Result: Digital Service */}
      {matchedService && (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-700">
                  {matchedService.trackingId} · {matchedService.category}
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  {matchedService.serviceTitle}
                </h2>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
              {matchedService.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {serviceStages.map((stage, idx) => {
              const activeIdx = serviceStages.indexOf(matchedService.status);
              const done = idx <= activeIdx;
              return (
                <div key={stage} className="space-y-2">
                  <div
                    className={`h-2.5 rounded-full ${
                      done ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  />
                  <div
                    className={`text-xs font-bold flex items-center gap-1 ${
                      done ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {done && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    <span>{stage}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4 text-xs">
            <div>
              <div className="text-slate-500">Applicant</div>
              <div className="font-bold text-slate-900 mt-0.5">
                {matchedService.applicantName}
              </div>
            </div>
            <div>
              <div className="text-slate-500">Submitted Date</div>
              <div className="font-bold text-slate-900 mt-0.5">
                {matchedService.submittedDate}
              </div>
            </div>
            <div>
              <div className="text-slate-500">Est. Completion</div>
              <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {matchedService.estimatedCompletion}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result: Electronics Order */}
      {matchedOrder && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-700">
                  {matchedOrder.id} · Ordered {matchedOrder.date}
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Electronics Delivery ({formatPrice(matchedOrder.totalTZS)})
                </h2>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              {matchedOrder.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {orderStages.map((stage, idx) => {
              const activeIdx = orderStages.indexOf(matchedOrder.status);
              const done = idx <= activeIdx;
              return (
                <div key={stage} className="space-y-2">
                  <div
                    className={`h-2.5 rounded-full ${
                      done ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                  <div
                    className={`text-xs font-bold flex items-center gap-1 ${
                      done ? 'text-blue-700' : 'text-slate-400'
                    }`}
                  >
                    {done && <PackageCheck className="w-3.5 h-3.5 shrink-0" />}
                    <span>{stage}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 rounded-2xl p-4">
            <div>
              <span className="font-bold text-slate-900">Delivery Address:</span>{' '}
              {matchedOrder.shippingAddress}
            </div>
            <div className="mt-1">
              <span className="font-bold text-slate-900">ETA:</span>{' '}
              {matchedOrder.estimatedDelivery}
            </div>
          </div>
        </div>
      )}

      {!matchedOrder && !matchedService && trimmed.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-sm text-slate-500">
          No order or service request found for &ldquo;{trimmed}&rdquo;. Try{' '}
          <span className="font-bold text-slate-800">SHM-SRV-84920</span> or{' '}
          <span className="font-bold text-slate-800">SHM-ORD-1042</span>.
        </div>
      )}
    </div>
  );
};
