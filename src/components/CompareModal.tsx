import React from 'react';
import { X, Star, CheckCircle2, XCircle } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const CompareModal: React.FC = () => {
  const {
    compareIds,
    isCompareOpen,
    setIsCompareOpen,
    toggleCompare,
    formatPrice,
    addProductToCart,
  } = useApp();

  if (!isCompareOpen || compareIds.length === 0) return null;

  const comparedProducts = PRODUCTS.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        onClick={() => setIsCompareOpen(false)}
      />
      <div className="relative z-10 bg-white rounded-3xl max-w-4xl w-full max-h-[88vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900">
              Product Comparison ({comparedProducts.length}/3)
            </h3>
            <p className="text-xs text-slate-500">
              Compare specifications, warranty, and pricing side by side
            </p>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-xs font-semibold text-slate-500 uppercase w-36">
                  Feature
                </th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-3 min-w-[200px] align-top">
                    <div className="relative bg-slate-50 rounded-2xl p-3 border border-slate-200">
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white text-slate-400 hover:text-rose-600 shadow-xs cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-28 object-cover rounded-xl mb-2"
                      />
                      <div className="text-sm font-bold text-slate-900 line-clamp-2">
                        {p.name}
                      </div>
                      <div className="text-base font-extrabold text-blue-600 mt-1">
                        {formatPrice(p.priceGHS)}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="p-3 font-medium text-slate-600">Brand</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-semibold text-slate-900">
                    {p.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-600">Rating</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {p.rating} ({p.reviewCount})
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-600">Availability</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.inStock ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-xs">
                        <CheckCircle2 className="w-4 h-4" /> In Stock ({p.stockCount})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 font-medium text-xs">
                        <XCircle className="w-4 h-4" /> Out of Stock
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-600">Warranty</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-xs text-slate-700">
                    {p.warranty}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-600">Key Specs</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-xs text-slate-600 space-y-1">
                    {Object.entries(p.specs)
                      .slice(0, 3)
                      .map(([k, v]) => (
                        <div key={k}>
                          <span className="font-semibold text-slate-800">{k}:</span> {v}
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3" />
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      disabled={!p.inStock}
                      onClick={() =>
                        addProductToCart(
                          p,
                          1,
                          p.colors[0]?.name || 'Standard',
                          p.storageOptions?.[0]
                        )
                      }
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold cursor-pointer"
                    >
                      {p.inStock ? 'Add to Cart' : 'Unavailable'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
