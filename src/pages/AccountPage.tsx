import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Cpu,
  Download,
  FileCheck2,
  FileText,
  Heart,
  MapPin,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  User,
  X,
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import type { ElectronicsOrder } from '../types';

export const AccountPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab =
    (searchParams.get('tab') as
      | 'orders'
      | 'services'
      | 'addresses'
      | 'wishlist') || 'orders';

  const [activeTab, setActiveTab] = useState(initialTab);
  const {
    orders,
    serviceRequests,
    sendServiceMessage,
    addresses,
    addAddress,
    setDefaultAddress,
    user,
    updateUserProfile,
    wishlist,
    formatPrice,
    showToast,
  } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState(
    serviceRequests[0]?.trackingId || ''
  );
  const [chatInput, setChatInput] = useState('');
  const [invoiceOrder, setInvoiceOrder] = useState<ElectronicsOrder | null>(null);

  const [newAddr, setNewAddr] = useState({
    label: '',
    recipient: user.name,
    phone: user.phone,
    street: '',
    city: 'Dar es Salaam',
    region: 'Dar es Salaam',
    isDefault: false,
  });

  const switchTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const activeService =
    serviceRequests.find((s) => s.trackingId === selectedServiceId) ||
    serviceRequests[0];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeService) return;
    sendServiceMessage(activeService.trackingId, chatInput.trim());
    setChatInput('');
  };

  const handleUploadCorrection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeService) return;
    sendServiceMessage(
      activeService.trackingId,
      'Uploaded corrected document for review.',
      file.name
    );
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.label || !newAddr.street) return;
    addAddress(newAddr);
    setNewAddr({
      label: '',
      recipient: user.name,
      phone: user.phone,
      street: '',
      city: 'Accra',
      region: 'Greater Accra',
      isDefault: false,
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const serviceStages = ['Submitted', 'Under Review', 'Processing', 'Completed'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-emerald-500 text-white flex items-center justify-center font-display font-extrabold text-xl">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {user.email} · NIDA NIN: {user.nidaNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'orders', label: 'My Orders', icon: Cpu, count: orders.length },
            {
              id: 'services',
              label: 'My Service Requests',
              icon: FileCheck2,
              count: serviceRequests.length,
            },
            { id: 'addresses', label: 'Addresses & Profile', icon: MapPin },
            {
              id: 'wishlist',
              label: 'Wishlist',
              icon: Heart,
              count: wishlistedProducts.length,
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === t.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-slate-700'
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: MY ORDERS (ELECTRONICS) */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-blue-600">{order.id}</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">
                    Placed on {order.date} · {order.paymentMethod}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                    {order.status}
                  </span>
                  <button
                    onClick={() => setInvoiceOrder(order)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                      />
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.variant} · Qty {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm text-slate-900">
                      {formatPrice(item.priceTZS * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span>Ship to: {order.shippingAddress}</span>
                <span className="font-bold text-slate-900 text-sm">
                  Total: {formatPrice(order.totalTZS)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: MY SERVICE REQUESTS (DIGITAL + ADMIN CHAT) */}
      {activeTab === 'services' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request List */}
          <div className="space-y-3">
            {serviceRequests.map((srv) => (
              <button
                key={srv.trackingId}
                onClick={() => setSelectedServiceId(srv.trackingId)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeService?.trackingId === srv.trackingId
                    ? 'bg-emerald-50/70 border-emerald-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-700">
                    {srv.trackingId}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      srv.status === 'Completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {srv.status}
                  </span>
                </div>
                <div className="font-display font-bold text-sm text-slate-900 mt-1">
                  {srv.serviceTitle}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Submitted {srv.submittedDate}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Request Detail & Admin Chat */}
          {activeService && (
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600">
                    {activeService.trackingId} · {activeService.category}
                  </span>
                  <h2 className="font-display font-bold text-xl text-slate-900 mt-0.5">
                    {activeService.serviceTitle}
                  </h2>
                </div>

                {activeService.status === 'Completed' && (
                  <button
                    onClick={() =>
                      showToast(
                        `Downloading official document for ${activeService.trackingId}`
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Final Document</span>
                  </button>
                )}
              </div>

              {/* Status Progress Bar */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {serviceStages.map((stage, idx) => {
                    const activeIdx = serviceStages.indexOf(activeService.status);
                    const done = idx <= activeIdx;
                    return (
                      <div key={stage} className="space-y-1.5">
                        <div
                          className={`h-2 rounded-full ${
                            done ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        />
                        <div
                          className={`text-[11px] font-bold flex items-center gap-1 ${
                            done ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {done && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                          <span>{stage}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Uploaded Docs */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Submitted Documents
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeService.documents.map((d) => (
                    <div
                      key={d.reqId}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-medium text-slate-800 inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{d.fileName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Chat / Messaging Box for Document Corrections */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Specialist Messaging &amp; Document Corrections</span>
                  </div>
                  <label className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 cursor-pointer">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Attach Correction</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUploadCorrection}
                    />
                  </label>
                </div>

                <div className="p-4 bg-slate-50 h-56 overflow-y-auto space-y-3">
                  {activeService.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        m.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="text-[10px] font-semibold text-slate-500 mb-0.5 px-1">
                        {m.senderName} · {m.timestamp}
                      </div>
                      <div
                        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-slate-900 text-white rounded-br-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        {m.text}
                        {m.attachmentName && (
                          <div className="mt-1.5 pt-1.5 border-t border-white/20 text-[11px] font-semibold text-emerald-300">
                            📎 {m.attachmentName}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSendChat}
                  className="p-3 bg-white border-t border-slate-200 flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Reply to your assigned Shema specialist..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED ADDRESSES & PROFILE SETTINGS */}
      {activeTab === 'addresses' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
            <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Saved Delivery Addresses
            </h2>
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {addr.recipient} · {addr.phone}
                    </div>
                    <div className="text-xs text-slate-500">
                      {addr.street}, {addr.city}, {addr.region}
                    </div>
                  </div>
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAddAddress}
              className="pt-4 border-t border-slate-100 space-y-3"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Add New Address
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Kumasi Branch)"
                  value={newAddr.label}
                  onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Street Address / Digital GPS"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Save Address
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 h-fit">
            <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              Profile Settings
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => updateUserProfile({ name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => updateUserProfile({ phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  NIDA / National ID Number (NIN)
                </label>
                <input
                  type="text"
                  value={user.nidaNumber}
                  onChange={(e) => updateUserProfile({ nidaNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* INVOICE MODAL */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setInvoiceOrder(null)}
          />
          <div className="relative z-10 bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="font-display font-bold text-lg text-slate-900">
                  Official Tax Invoice
                </div>
                <div className="text-xs text-slate-500">{invoiceOrder.id}</div>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="p-1.5 rounded-lg bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-1 text-slate-600">
              <div>
                <strong>Billed To:</strong> {user.name}
              </div>
              <div>
                <strong>Delivery:</strong> {invoiceOrder.shippingAddress}
              </div>
              <div>
                <strong>Payment:</strong> {invoiceOrder.paymentMethod}
              </div>
            </div>
            <div className="divide-y divide-slate-100 border-y border-slate-100 py-2">
              {invoiceOrder.items.map((item, i) => (
                <div key={i} className="py-2 flex justify-between text-xs">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-bold">
                    {formatPrice(item.priceTZS * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-display font-extrabold text-lg">
              <span>Total Paid</span>
              <span>{formatPrice(invoiceOrder.totalTZS)}</span>
            </div>
            <button
              onClick={() => {
                showToast(`Invoice ${invoiceOrder.id}.pdf downloaded`);
                setInvoiceOrder(null);
              }}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              Download PDF Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
