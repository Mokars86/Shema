import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Globe2,
  MessageCircle,
  PackageSearch,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  buildProductWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

const BRAND_SUGGESTIONS = [
  'Apple',
  'Google Pixel',
  'Samsung',
  'Xiaomi / Redmi',
  'OnePlus',
  'Tecno',
  'Infinix',
  'Oppo',
  'Other / Laptop / Gadget',
];

const STORAGE_SUGGESTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB', 'Other'];

export const ProductRequestModal: React.FC = () => {
  const { productRequestModal, closeProductRequestModal, showToast } = useApp();
  const { isOpen, product, mode, preselectedColor, preselectedStorage } =
    productRequestModal;

  const [brand, setBrand] = useState('Apple');
  const [modelName, setModelName] = useState('');
  const [storage, setStorage] = useState('256GB');
  const [color, setColor] = useState('');
  const [sourcingPref, setSourcingPref] = useState<'dubai_order' | 'local_tanzania'>('dubai_order');
  const [specsNotes, setSpecsNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    if (product) {
      setBrand(product.brand);
      setModelName(product.name);
      setStorage(preselectedStorage || product.storageOptions?.[0] || 'Standard');
      setColor(preselectedColor || product.colors[0]?.name || '');
      setSourcingPref(product.availability);
      setSpecsNotes('');
    } else {
      setBrand('Apple');
      setModelName('');
      setStorage('256GB');
      setColor('');
      setSourcingPref('dubai_order');
      setSpecsNotes('');
    }
  }, [isOpen, product, preselectedColor, preselectedStorage]);

  if (!isOpen) return null;

  const isPriceMode = mode === 'price' && Boolean(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Product request prepared! You can also send it via WhatsApp.');
  };

  const whatsappUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      action: isPriceMode ? 'price' : 'request',
      productName: modelName || product?.name || 'Custom Product Request',
      brand,
      availability: sourcingPref,
      storage,
      color: color || undefined,
      specs: specsNotes || undefined,
      notes: customerName
        ? `Customer: ${customerName}${customerPhone ? ` (${customerPhone})` : ''}`
        : undefined,
    })
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 relative">
        <button
          onClick={closeProductRequestModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 pr-10">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <PackageSearch className="w-6 h-6" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600">
              <Globe2 className="w-3.5 h-3.5" />
              Tanzania Local &amp; Dubai Sourcing
            </span>
            <h2 className="font-display font-extrabold text-xl text-slate-900 mt-0.5">
              {isPriceMode
                ? 'Request Price & Availability'
                : 'Request a Product / Custom Specs'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Specify your exact phone model, storage capacity, colour, or any unlisted electronic product. Prices &amp; availability are confirmed before your order is finalised.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Request Ready for Confirmation
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Send your exact specifications directly to our Dubai &amp; Tanzania sourcing desk on WhatsApp for instant price and delivery confirmation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Send Request via WhatsApp
              </a>
              <button
                type="button"
                onClick={closeProductRequestModal}
                className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand / Category
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-500"
                >
                  {BRAND_SUGGESTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exact Model / Product Name *
                </label>
                <input
                  required
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="e.g. iPhone 16 Pro Max, Pixel 9 Pro, MacBook..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Storage Capacity / Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {STORAGE_SUGGESTIONS.map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setStorage(st)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                        storage === st
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Colour
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Desert Titanium, Black, Silver"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sourcing Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSourcingPref('local_tanzania')}
                  className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                    sourcingPref === 'local_tanzania'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div>Available Locally (TZ)</div>
                  <div className="text-[10px] opacity-75">Immediate dispatch if in stock</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSourcingPref('dubai_order')}
                  className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                    sourcingPref === 'dubai_order'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div>Ordered for You in Dubai, UAE</div>
                  <div className="text-[10px] opacity-75">We buy in Dubai &amp; deliver to TZ (4–7 days)</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Other Specifications / Notes
              </label>
              <textarea
                rows={2}
                value={specsNotes}
                onChange={(e) => setSpecsNotes(e.target.value)}
                placeholder="RAM, SIM type (Dual SIM / eSIM), condition (Brand New Sealed), or any unlisted item details..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+255 7XX XXX XXX"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Order / Enquire via WhatsApp
              </a>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
