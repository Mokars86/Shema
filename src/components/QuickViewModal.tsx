import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag, Star, Truck, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addProductToCart,
    formatPrice,
    setIsCartOpen,
  } = useApp();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');

  if (!quickViewProduct) return null;

  const activeColor = selectedColor || quickViewProduct.colors[0]?.name || 'Standard';
  const activeStorage =
    selectedStorage || quickViewProduct.storageOptions?.[0] || undefined;

  const handleAdd = () => {
    addProductToCart(quickViewProduct, 1, activeColor, activeStorage);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        onClick={() => setQuickViewProduct(null)}
      />
      <div className="relative z-10 bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl grid md:grid-cols-2">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-600 hover:text-slate-900 shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-slate-100 p-6 flex items-center justify-center">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full max-h-80 object-contain rounded-2xl"
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                {quickViewProduct.brand}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {quickViewProduct.rating} ({quickViewProduct.reviewCount})
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900">
              {quickViewProduct.name}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              {quickViewProduct.shortDescription}
            </p>

            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-display font-extrabold text-2xl text-slate-900">
                {formatPrice(quickViewProduct.priceTZS)}
              </span>
              {quickViewProduct.originalPriceTZS && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(quickViewProduct.originalPriceTZS)}
                </span>
              )}
            </div>
            <div className="mt-1.5 text-[11px] font-semibold text-slate-600">
              {quickViewProduct.availability === 'local_tanzania'
                ? '• Available Locally in Tanzania'
                : '• Available on Order (Sourced from Dubai, UAE)'}{' '}
              · Price confirmed before order
            </div>

            {/* Color Selection */}
            {quickViewProduct.colors.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-700 mb-1.5">
                  Color: <span className="text-slate-900">{activeColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center cursor-pointer transition-transform ${
                        activeColor === c.name
                          ? 'border-blue-600 scale-110'
                          : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {activeColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage / Size */}
            {quickViewProduct.storageOptions && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-700 mb-1.5">
                  Variant / Capacity
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.storageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                        activeStorage === opt
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{quickViewProduct.deliveryEstimate}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2.5">
            <button
              disabled={!quickViewProduct.inStock}
              onClick={handleAdd}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{quickViewProduct.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
            <Link
              to={`/electronics/${quickViewProduct.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold"
            >
              Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
