import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Cpu,
  CreditCard,
  FileCheck2,
  Lock,
  MapPin,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    formatPrice,
    addresses,
    placeHybridOrder,
    user,
  } = useApp();
  const navigate = useNavigate();

  const [checkoutMode, setCheckoutMode] = useState<'all' | 'electronics' | 'services'>('all');
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [paymentMethod, setPaymentMethod] = useState<
    'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Visa / Mastercard'
  >('MTN Mobile Money');
  const [momoPhone, setMomoPhone] = useState(user.phone);
  const [confirmation, setConfirmation] = useState<{
    newOrderId?: string;
    newTrackingIds: string[];
  } | null>(null);

  const productItems = cart.filter((i) => i.type === 'product');
  const serviceItems = cart.filter((i) => i.type === 'service');

  const activeItems = cart.filter((item) => {
    if (checkoutMode === 'electronics') return item.type === 'product';
    if (checkoutMode === 'services') return item.type === 'service';
    return true;
  });

  const activeTotalGHS = activeItems.reduce((sum, item) => {
    if (item.type === 'product') return sum + item.product.priceGHS * item.quantity;
    return sum + item.service.serviceFeeGHS + item.service.govtFeeGHS;
  }, 0);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeItems.length === 0) return;
    const addrString = selectedAddress
      ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.region}`
      : 'Accra Central Pickup';

    const result = placeHybridOrder({
      paymentMethod,
      shippingAddress: addrString,
      itemsToCheckout: activeItems,
    });
    setConfirmation(result);
  };

  if (confirmation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              Payment Verified · {paymentMethod}
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3">
              Thank You! Your Order is Confirmed
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Receipts and live tracking updates have been added to your Account Portal.
            </p>
          </div>

          <div className="space-y-3 text-left bg-slate-50 rounded-2xl p-5 border border-slate-200">
            {confirmation.newOrderId && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Electronics Order ID
                </span>
                <span className="font-display font-bold text-blue-700">
                  {confirmation.newOrderId}
                </span>
              </div>
            )}
            {confirmation.newTrackingIds.map((tid) => (
              <div key={tid} className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Digital Service Tracking ID
                </span>
                <span className="font-display font-bold text-emerald-700">{tid}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/account')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold cursor-pointer"
            >
              Go to My Account Portal
            </button>
            <button
              onClick={() => navigate('/track')}
              className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
            >
              Track Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-display font-bold text-2xl text-slate-900">
          Your Hybrid Cart is Empty
        </h1>
        <p className="text-sm text-slate-500">
          Add electronics or a digital service application to proceed to checkout.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/electronics"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold"
          >
            Browse Electronics
          </Link>
          <Link
            to="/digital-services"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
          >
            Digital Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
          Unified Hybrid Checkout
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pay for hardware and government/digital services together in one secure session, or process them separately.
        </p>
      </div>

      {/* Mode Switcher if both types exist */}
      {productItems.length > 0 && serviceItems.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'all', label: `Combined Checkout (${cart.length} items)` },
            {
              id: 'electronics',
              label: `Electronics Only (${productItems.length})`,
            },
            {
              id: 'services',
              label: `Digital Services Only (${serviceItems.length})`,
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setCheckoutMode(m.id as typeof checkoutMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                checkoutMode === m.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleCompletePayment} className="grid lg:grid-cols-3 gap-8">
        {/* Left: Delivery & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address for Electronics */}
          {activeItems.some((i) => i.type === 'product') && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Electronics Delivery Address
                </h2>
                <Link
                  to="/account?tab=addresses"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Manage Addresses
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="sr-only"
                    />
                    <div className="font-bold text-sm text-slate-900">
                      {addr.label}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {addr.recipient} · {addr.phone}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {addr.street}, {addr.city}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Payment Gateway */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
            <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              Payment Method (Mobile Money &amp; Cards)
            </h2>

            <div className="grid sm:grid-cols-2 gap-3">
              {(
                [
                  { name: 'MTN Mobile Money', tag: 'Instant MoMo Prompt' },
                  { name: 'Telecel Cash', tag: 'Vodafone / Telecel' },
                  { name: 'AirtelTigo Money', tag: 'AT Money' },
                  { name: 'Visa / Mastercard', tag: '3D Secure Card' },
                ] as const
              ).map((m) => (
                <button
                  type="button"
                  key={m.name}
                  onClick={() => setPaymentMethod(m.name)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentMethod === m.name
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    {m.name.includes('Visa') ? (
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-amber-500" />
                    )}
                    <span>{m.name}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{m.tag}</div>
                </button>
              ))}
            </div>

            {paymentMethod !== 'Visa / Mastercard' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Money Wallet Number
                </label>
                <input
                  type="tel"
                  required
                  value={momoPhone}
                  onChange={(e) => setMomoPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Card Number"
                  className="sm:col-span-2 px-4 py-3 rounded-xl border border-slate-300 text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="MM / YY"
                  className="px-4 py-3 rounded-xl border border-slate-300 text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="CVV"
                  className="px-4 py-3 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 h-fit sticky top-28 space-y-5">
          <h2 className="font-display font-bold text-lg text-slate-900">
            Order Summary ({activeItems.length})
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {activeItems.map((item) =>
              item.type === 'product' ? (
                <div
                  key={item.cartItemId}
                  className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-slate-100"
                >
                  <div className="flex items-start gap-2.5">
                    <Cpu className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {item.product.name} × {item.quantity}
                      </div>
                      <div className="text-slate-500">{item.selectedColor}</div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    {formatPrice(item.product.priceGHS * item.quantity)}
                  </span>
                </div>
              ) : (
                <div
                  key={item.cartItemId}
                  className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-slate-100"
                >
                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {item.service.title}
                      </div>
                      <div className="text-slate-500">
                        Applicant: {item.application.fullName}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    {formatPrice(item.service.serviceFeeGHS + item.service.govtFeeGHS)}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="space-y-2 pt-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Delivery / Portal Processing</span>
              <span className="text-emerald-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900">Total Payable</span>
              <span className="font-display font-extrabold text-2xl text-slate-900">
                {formatPrice(activeTotalGHS)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pay {formatPrice(activeTotalGHS)} Securely</span>
          </button>
        </div>
      </form>
    </div>
  );
};
