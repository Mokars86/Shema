import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Globe2,
  Heart,
  MapPin,
  MessageCircle,
  Scale,
  ShoppingBag,
  Star,
} from 'lucide-react';
import type { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  buildProductWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
}) => {
  const {
    formatPrice,
    addProductToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    openProductRequestModal,
    compareIds,
    toggleCompare,
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareIds.includes(product.id);
  const isLocal = product.availability === 'local_tanzania';
  const discountPct = product.originalPriceTZS
    ? Math.round(
        ((product.originalPriceTZS - product.priceTZS) /
          product.originalPriceTZS) *
          100
      )
    : 0;

  const whatsappOrderUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      action: 'order',
      productName: product.name,
      brand: product.brand,
      availability: product.availability,
      color: product.colors[0]?.name,
      storage: product.storageOptions?.[0],
    })
  );

  const AvailabilityBadge = (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
        isLocal
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-blue-50 text-blue-700 border border-blue-200'
      }`}
    >
      {isLocal ? (
        <>
          <MapPin className="w-2.5 h-2.5" />
          In Tanzania
        </>
      ) : (
        <>
          <Globe2 className="w-2.5 h-2.5" />
          On Order (Dubai)
        </>
      )}
    </span>
  );

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all p-4 flex flex-col sm:flex-row gap-5">
        <Link
          to={`/electronics/${product.id}`}
          className="relative w-full sm:w-48 h-44 rounded-xl overflow-hidden bg-slate-100 shrink-0"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discountPct > 0 && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
              -{discountPct}%
            </span>
          )}
        </Link>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-blue-600">
                {product.brand} · {product.category}
              </span>
              {AvailabilityBadge}
            </div>
            <Link to={`/electronics/${product.id}`}>
              <h3 className="font-display font-bold text-lg text-slate-900 mt-1 hover:text-blue-600">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating}
              </span>
              <span className="text-slate-400">({product.reviewCount} reviews)</span>
              <span className="text-slate-400">·</span>
              <span className="text-[11px] text-slate-500">
                Price confirmed before order
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
            <div>
              <div className="font-display font-extrabold text-xl text-slate-900">
                {formatPrice(product.priceTZS)}
              </div>
              {product.originalPriceTZS && (
                <div className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPriceTZS)}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => toggleCompare(product.id)}
                className={`p-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                  isCompared
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Compare"
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                onClick={() => setQuickViewProduct(product)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  openProductRequestModal({ product, mode: 'price' })
                }
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Request Price
              </button>
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                disabled={!product.inStock}
                onClick={() =>
                  addProductToCart(
                    product,
                    1,
                    product.colors[0]?.name || 'Standard',
                    product.storageOptions?.[0]
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <Link to={`/electronics/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discountPct > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow-xs w-fit">
              -{discountPct}%
            </span>
          )}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-xs w-fit ${
              isLocal
                ? 'bg-emerald-600/90 text-white'
                : 'bg-blue-600/90 text-white'
            }`}
          >
            {isLocal ? 'Available in Tanzania' : 'On Order · Dubai'}
          </span>
        </div>

        {/* Action Overlay Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={() => toggleWishlist(product.id)}
            title="Save to Wishlist"
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-colors cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-600 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={() => setQuickViewProduct(product)}
            title="Quick View"
            className="p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-blue-600 shadow-sm cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            title="Compare Product"
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-colors cursor-pointer ${
              isCompared
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 text-slate-600 hover:text-blue-600'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="font-semibold text-blue-600 truncate">
              {product.brand} · {product.subCategory}
            </span>
          </div>

          <Link to={`/electronics/${product.id}`}>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between gap-2 mt-1.5 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] text-slate-500">
              {isLocal ? 'Local Stock' : 'Dubai Order'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <div className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                {formatPrice(product.priceTZS)}
              </div>
              {product.originalPriceTZS && (
                <div className="text-[11px] text-slate-400 line-through">
                  {formatPrice(product.originalPriceTZS)}
                </div>
              )}
            </div>
            <button
              onClick={() => openProductRequestModal({ product, mode: 'price' })}
              className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Request Price
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              disabled={!product.inStock}
              onClick={() =>
                addProductToCart(
                  product,
                  1,
                  product.colors[0]?.name || 'Standard',
                  product.storageOptions?.[0]
                )
              }
              className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.inStock ? 'Add' : 'Sold Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
