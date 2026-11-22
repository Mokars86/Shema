import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  FileCheck2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HybridCartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateProductQty,
    cartTotalTZS,
    formatPrice,
  } = useApp();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const productItems = cart.filter((i) => i.type === 'product');
  const serviceItems = cart.filter((i) => i.type === 'service');

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
      />
      <aside className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900 text-base">
                Unified Hybrid Cart
              </h2>
              <p className="text-xs text-slate-500">
                {productItems.length} Electronics · {serviceItems.length} Digital Services
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-slate-900 mb-1">
                Your hybrid cart is empty
              </h3>
              <p className="text-sm text-slate-500 max-w-xs mb-6">
                Shop genuine electronics or submit a government/digital service application—all in one checkout.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/electronics');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
                >
                  Shop Electronics
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/digital-services');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  Digital Services
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Electronics Group */}
              {productItems.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Electronics &amp; Hardware ({productItems.length})</span>
                  </div>
                  <div className="space-y-3">
                    {productItems.map((item) => {
                      if (item.type !== 'product') return null;
                      return (
                        <div
                          key={item.cartItemId}
                          className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-semibold text-slate-900 truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-slate-400 hover:text-rose-600 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {item.selectedColor}
                              {item.selectedStorage ? ` · ${item.selectedStorage}` : ''}
                            </p>
                            <div className="flex items-center justify-between mt-2.5">
                              <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white">
                                <button
                                  onClick={() =>
                                    updateProductQty(item.cartItemId, item.quantity - 1)
                                  }
                                  className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-2.5 text-xs font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateProductQty(item.cartItemId, item.quantity + 1)
                                  }
                                  className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-sm font-bold text-slate-900">
                                {formatPrice(item.product.priceTZS * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Digital Services Group */}
              {serviceItems.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Digital &amp; Govt Services ({serviceItems.length})</span>
                  </div>
                  <div className="space-y-3">
                    {serviceItems.map((item) => {
                      if (item.type !== 'service') return null;
                      const total =
                        item.service.serviceFeeTZS + item.service.govtFeeTZS;
                      return (
                        <div
                          key={item.cartItemId}
                          className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1">
                                {item.service.category}
                              </span>
                              <h4 className="text-sm font-semibold text-slate-900">
                                {item.service.title}
                              </h4>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="mt-2 text-xs text-slate-600 space-y-0.5">
                            <div>
                              Applicant: <span className="font-medium">{item.application.fullName}</span>
                            </div>
                            <div>
                              Docs attached:{' '}
                              <span className="font-medium">
                                {item.application.documents.length} verified files
                              </span>
                            </div>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              Govt + Processing Fee
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              {formatPrice(total)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Unified Subtotal</span>
              <span className="font-display font-extrabold text-xl text-slate-900">
                {formatPrice(cartTotalTZS)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Supports M-Pesa, Tigo Pesa, Airtel Money &amp; Visa/Mastercard</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/15 transition-all cursor-pointer"
            >
              <span>Proceed to Unified Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
