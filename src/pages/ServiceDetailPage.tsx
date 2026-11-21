import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck2,
  FileText,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  UploadCloud,
} from 'lucide-react';
import { DIGITAL_SERVICES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import type { ServiceApplicationPayload, UploadedDoc } from '../types';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    formatPrice,
    addServiceToCart,
    setIsCartOpen,
    placeHybridOrder,
    user,
  } = useApp();

  const service =
    DIGITAL_SERVICES.find((s) => s.id === id) || DIGITAL_SERVICES[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'apply'>('overview');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedTrackingId, setSubmittedTrackingId] = useState<string | null>(
    null
  );

  // Step 1: Personal Details
  const [form, setForm] = useState({
    fullName: user.name,
    ghanaCardNumber: user.ghanaCard,
    phone: user.phone,
    email: user.email,
    dateOfBirth: '1994-06-15',
    deliveryMethod:
      'Digital Delivery (Email/Portal)' as ServiceApplicationPayload['deliveryMethod'],
    notes: '',
  });

  // Step 2: Document Uploads
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDoc>>({});

  // Step 3: Confirmation
  const [agreed, setAgreed] = useState(false);

  // Step 4: Instant Payment
  const [paymentMethod, setPaymentMethod] = useState<
    'MTN Mobile Money' | 'Telecel Cash' | 'Visa / Mastercard'
  >('MTN Mobile Money');
  const [momoNumber, setMomoNumber] = useState(user.phone);

  const totalFee = service.serviceFeeGHS + service.govtFeeGHS;

  const handleFileChange = (
    reqId: string,
    reqLabel: string,
    file: File | null
  ) => {
    if (!file) return;
    const sizeKB = Math.max(12, Math.round(file.size / 1024));
    const formattedSize =
      sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
    setUploadedDocs((prev) => ({
      ...prev,
      [reqId]: {
        reqId,
        reqLabel,
        fileName: file.name,
        fileSize: formattedSize,
        status: 'uploaded',
      },
    }));
  };

  const attachDemoFile = (reqId: string, reqLabel: string) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [reqId]: {
        reqId,
        reqLabel,
        fileName: `${reqId}_verified_scan.pdf`,
        fileSize: '860 KB',
        status: 'verified',
      },
    }));
  };

  const allRequiredUploaded = service.requiredDocuments
    .filter((d) => d.required)
    .every((d) => Boolean(uploadedDocs[d.id]));

  const buildPayload = (): ServiceApplicationPayload => ({
    ...form,
    documents: Object.values(uploadedDocs),
  });

  const handleAddToHybridCart = () => {
    addServiceToCart(service, buildPayload());
    setIsCartOpen(true);
  };

  const handlePayNow = () => {
    const res = placeHybridOrder({
      paymentMethod,
      shippingAddress: form.deliveryMethod,
      itemsToCheckout: [
        {
          type: 'service',
          cartItemId: `direct-${Date.now()}`,
          service,
          application: buildPayload(),
        },
      ],
    });
    if (res.newTrackingIds[0]) {
      setSubmittedTrackingId(res.newTrackingIds[0]);
    }
  };

  // POST-PAYMENT DASHBOARD
  if (submittedTrackingId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              Payment Confirmed · {paymentMethod}
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3">
              Application Submitted Successfully!
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Your tracking ID has been generated. Keep it handy or monitor progress in your Account Portal.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 max-w-md mx-auto">
            <div className="text-xs text-slate-400 uppercase tracking-wider">
              Unique Service Tracking ID
            </div>
            <div className="font-display font-extrabold text-2xl text-emerald-400 tracking-wide mt-1">
              {submittedTrackingId}
            </div>
          </div>

          {/* Live Status Progress Bar */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Live Status Progress
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {['Submitted', 'Under Review', 'Processing', 'Completed'].map(
                (stage, idx) => (
                  <div key={stage} className="space-y-2">
                    <div
                      className={`h-2 rounded-full ${
                        idx === 0 ? 'bg-emerald-600' : 'bg-slate-200'
                      }`}
                    />
                    <div
                      className={`text-[11px] font-bold ${
                        idx === 0 ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      {stage}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/account?tab=services')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold cursor-pointer"
            >
              Open My Service Requests
            </button>
            <button
              onClick={() => navigate(`/track?id=${submittedTrackingId}`)}
              className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
            >
              View Live Tracker
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Link
        to="/digital-services"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Digital &amp; Government Services
      </Link>

      {/* Top Service Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            {service.category}
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-2">
            {service.title}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            {service.fullDescription}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 w-full lg:w-auto sm:min-w-[240px] shrink-0">
          <div className="text-xs text-slate-500">Total Service Fee</div>
          <div className="font-display font-extrabold text-2xl text-slate-900 mt-0.5">
            {formatPrice(totalFee)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Govt: {formatPrice(service.govtFeeGHS)} · Processing:{' '}
            {formatPrice(service.serviceFeeGHS)}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <Clock className="w-4 h-4" />
            <span>{service.processingTime}</span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs: Overview vs Interactive Wizard */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          1. Overview &amp; Requirements Checklist
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
            activeTab === 'apply'
              ? 'bg-emerald-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          2. Interactive Application Wizard
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-display font-bold text-lg text-slate-900">
              Requirements Checklist
            </h2>
            <p className="text-xs text-slate-500">
              Prepare digital copies (photo or PDF) of the following before starting:
            </p>
            <ul className="space-y-3">
              {service.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveTab('apply')}
              className="mt-4 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Step-by-Step Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-display font-bold text-lg text-slate-900">
              How Shema Processes This Request
            </h2>
            <div className="space-y-4">
              {service.stepsSummary.map((st, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="text-sm text-slate-700 pt-1">{st}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                All documents are encrypted and reviewed by a dedicated Shema specialist. If any correction is needed, we notify you directly in your portal chat.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE 4-STEP WIZARD */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8">
          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { num: 1, label: 'Personal Details' },
              { num: 2, label: 'Document Upload' },
              { num: 3, label: 'Review & Confirm' },
              { num: 4, label: 'Payment Gateway' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 ${
                    step >= s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-semibold ${
                    step >= s.num ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-xl text-slate-900">
                Step 1: Applicant Personal Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name (as on Ghana Card)
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ghana Card / National ID Number
                  </label>
                  <input
                    type="text"
                    value={form.ghanaCardNumber}
                    onChange={(e) =>
                      setForm({ ...form, ghanaCardNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (WhatsApp / SMS Alerts)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      setForm({ ...form, dateOfBirth: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Document Delivery
                  </label>
                  <select
                    value={form.deliveryMethod}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deliveryMethod: e.target
                          .value as ServiceApplicationPayload['deliveryMethod'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Digital Delivery (Email/Portal)">
                      Digital Delivery (Email/Portal)
                    </option>
                    <option value="Office Pickup (Accra Central)">
                      Office Pickup (Accra Central)
                    </option>
                    <option value="Courier Dispatch">Courier Dispatch</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any preferred PAC center or urgency notes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.fullName || !form.ghanaCardNumber || !form.phone}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Document Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DOCUMENT UPLOAD */}
          {step === 2 && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Step 2: Secure Document Upload
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Drag &amp; drop or browse PDF, JPG, or PNG files. Max 10MB per file.
                </p>
              </div>

              <div className="space-y-4">
                {service.requiredDocuments.map((doc) => {
                  const uploaded = uploadedDocs[doc.id];
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-2xl border-2 border-dashed transition-colors ${
                        uploaded
                          ? 'border-emerald-400 bg-emerald-50/50'
                          : 'border-slate-300 bg-slate-50/50 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">
                              {doc.label}
                            </span>
                            {doc.required && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {doc.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer">
                            <UploadCloud className="w-4 h-4 text-emerald-600" />
                            <span>{uploaded ? 'Replace File' : 'Choose File'}</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(
                                  doc.id,
                                  doc.label,
                                  e.target.files?.[0] || null
                                )
                              }
                            />
                          </label>
                          {!uploaded && (
                            <button
                              type="button"
                              onClick={() => attachDemoFile(doc.id, doc.label)}
                              className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold cursor-pointer"
                            >
                              Use Sample
                            </button>
                          )}
                        </div>
                      </div>

                      {uploaded && (
                        <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                            <FileText className="w-4 h-4" />
                            {uploaded.fileName} ({uploaded.fileSize})
                          </span>
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Ready
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!allRequiredUploaded}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & CONFIRMATION */}
          {step === 3 && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-xl text-slate-900">
                Step 3: Review &amp; Confirm Details
              </h2>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service</span>
                  <span className="font-bold text-slate-900">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant Name</span>
                  <span className="font-semibold text-slate-900">{form.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ghana Card ID</span>
                  <span className="font-semibold text-slate-900">
                    {form.ghanaCardNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Preference</span>
                  <span className="font-semibold text-slate-900">
                    {form.deliveryMethod}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-500 mb-1.5">
                    Attached Documents
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(uploadedDocs).map((d) => (
                      <span
                        key={d.reqId}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        {d.reqLabel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2.5 p-4 rounded-2xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-emerald-600"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I confirm that the uploaded documents and personal details are authentic and authorize Shema Digital Online Service to file this application on my behalf.
                </span>
              </label>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!agreed}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT GATEWAY OR HYBRID CART */}
          {step === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Step 4: Secure Online Payment
                </h2>
                <span className="font-display font-extrabold text-xl text-emerald-700">
                  {formatPrice(totalFee)}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {(
                  [
                    'MTN Mobile Money',
                    'Telecel Cash',
                    'Visa / Mastercard',
                  ] as const
                ).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMethod === method
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      {method.includes('Visa') ? (
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Smartphone className="w-4 h-4 text-amber-500" />
                      )}
                      <span>{method}</span>
                    </div>
                  </button>
                ))}
              </div>

              {paymentMethod !== 'Visa / Mastercard' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Money Number ({paymentMethod})
                  </label>
                  <input
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    You will receive an instant authorization prompt on your phone.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Card Number (•••• •••• •••• 4242)"
                    className="sm:col-span-2 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePayNow}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatPrice(totalFee)} &amp; Submit Now</span>
                </button>
                <button
                  onClick={handleAddToHybridCart}
                  className="py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Hybrid Cart</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
