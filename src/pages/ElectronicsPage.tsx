import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  LayoutGrid,
  List,
  Scale,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  'All',
  'Smartphones',
  'TVs & Audio',
  'Home Appliances',
  'Laptops & Accessories',
];
const BRANDS = ['All', 'Samsung', 'Apple', 'LG', 'Hisense', 'Anker', 'Sony'];

export const ElectronicsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { compareIds, setIsCompareOpen, clearCompare, formatPrice } = useApp();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
      if (p.priceGHS > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      if (p.rating < minRating) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceGHS - b.priceGHS;
      if (sortBy === 'price-desc') return b.priceGHS - a.priceGHS;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedBrand, maxPrice, inStockOnly, minRating, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(25000);
    setInStockOnly(false);
    setMinRating(0);
    setSearchParams({});
  };

  const FilterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Category */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Category
        </div>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Brand
        </div>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                selectedBrand === brand
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold uppercase tracking-wider text-slate-500">
            Max Price
          </span>
          <span className="font-bold text-slate-900">{formatPrice(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={3000}
          max={25000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>

      {/* Rating */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Minimum Rating
        </div>
        <div className="space-y-1.5">
          {[4.8, 4.5, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                minRating === r
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {r === 0 ? (
                <span>All Ratings</span>
              ) : (
                <>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{r}+ Stars</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock */}
      <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
        <span className="text-xs font-semibold text-slate-800">
          In-Stock Items Only
        </span>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="w-4 h-4 accent-blue-600 rounded"
        />
      </label>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Shema Electronics Store
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl mt-1">
            Authentic Gadgets &amp; Home Appliances
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Official manufacturer warranty · Same-day delivery in Accra &amp; Tema
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl border border-slate-200 p-5 sticky top-28">
          {FilterPanel}
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/50"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative z-10 w-72 bg-white h-full p-5 overflow-y-auto">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
              {FilterPanel}
            </div>
          </div>
        )}

        {/* Main Product Area */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3 mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span>{' '}
              products
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <p className="text-slate-600 font-medium mb-3">
                No electronics matched your current filter selection.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Compare Bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-20 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] sm:w-auto max-w-md bg-slate-900 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-slate-700">
          <div className="flex items-center gap-2 text-xs font-semibold truncate">
            <Scale className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">{compareIds.length} selected</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold cursor-pointer"
            >
              Compare
            </button>
            <button
              onClick={clearCompare}
              className="text-slate-400 hover:text-white cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
