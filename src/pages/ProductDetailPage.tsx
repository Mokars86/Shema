import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
  ZoomIn,
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatPrice, addProductToCart, wishlist, toggleWishlist } = useApp();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || 'Standard'
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions?.[0] || undefined
  );
  const [qty, setQty] = useState(1);

  const isWishlisted = wishlist.includes(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const handleBuyNow = () => {
    addProductToCart(product, qty, selectedColor, selectedStorage);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <Link
        to="/electronics"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Electronics Store
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: High-Res Image Gallery with Zoom */}
        <div className="space-y-4">
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-square rounded-3xl bg-white border border-slate-200 overflow-hidden cursor-zoom-in"
          >
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              style={{
                transformOrigin: zoomOrigin,
                transform: isZoomed ? 'scale(1.65)' : 'scale(1)',
              }}
              className="w-full h-full object-cover transition-transform duration-200"
            />
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-slate-900/75 text-white text-[11px] font-medium flex items-center gap-1.5 pointer-events-none">
              <ZoomIn className="w-3.5 h-3.5" /> Hover to Zoom
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer ${
                    activeImage === idx
                      ? 'border-blue-600'
                      : 'border-slate-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Pricing, Variants & CTAs */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                {product.brand} · {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                  isWishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                {isWishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {product.rating}
              </span>
              <span className="text-slate-500">
                {product.reviewCount} verified reviews
              </span>
              <span
                className={`font-semibold ${
                  product.inStock ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {product.inStock
                  ? `• In Stock (${product.stockCount} units)`
                  : '• Currently Out of Stock'}
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-slate-900">
                {formatPrice(product.priceGHS)}
              </span>
              {product.originalPriceGHS && (
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(product.originalPriceGHS)}
                </span>
              )}
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>{product.deliveryEstimate}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Color: <span className="text-slate-900">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center cursor-pointer transition-transform ${
                    selectedColor === c.name
                      ? 'border-blue-600 scale-110'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Storage / Spec Variant */}
          {product.storageOptions && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Storage / Size
              </div>
              <div className="flex flex-wrap gap-2">
                {product.storageOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedStorage(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                      selectedStorage === opt
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTAs */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
            <div className="flex items-center justify-center border border-slate-300 rounded-xl bg-white w-full sm:w-auto">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-sm font-bold text-slate-700 cursor-pointer"
              >
                -
              </button>
              <span className="px-4 text-sm font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-3 text-sm font-bold text-slate-700 cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              disabled={!product.inStock}
              onClick={() =>
                addProductToCart(product, qty, selectedColor, selectedStorage)
              }
              className="flex-1 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              disabled={!product.inStock}
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now via Secure Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Specs & Reviews */}
      <div className="grid lg:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-4">
            Technical Specifications
          </h2>
          <div className="divide-y divide-slate-100">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="py-3 flex justify-between gap-4 text-sm">
                <span className="font-medium text-slate-500">{key}</span>
                <span className="font-semibold text-slate-900 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-4">
            Verified Customer Reviews
          </h2>
          {product.reviews.length === 0 ? (
            <p className="text-sm text-slate-500">
              No written reviews yet for this model. Overall rating: {product.rating}/5.0 from {product.reviewCount} buyers.
            </p>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">
                      {rev.author}
                    </span>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 my-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
