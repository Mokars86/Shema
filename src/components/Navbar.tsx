import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Clock,
  FileCheck2,
  Heart,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShoppingBag,
  User,
  X,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { DIGITAL_SERVICES, PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    formatPrice,
    cart,
    setIsCartOpen,
    wishlist,
    serviceRequests,
    user,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { products: [], services: [] };
    return {
      products: PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 4),
      services: DIGITAL_SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
      ).slice(0, 4),
    };
  }, [searchQuery]);

  const hasResults =
    searchResults.products.length > 0 || searchResults.services.length > 0;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-slate-900 text-white'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-200 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <a
              href="tel:+255755000192"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              <span>+255 755 000 192</span>
            </a>
            <a
              href="https://wa.me/255755000192"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon–Sat: 8:00 AM – 7:00 PM EAT</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:inline text-slate-400">
              Tanzania Digital Assistance &amp; Dubai Tech Sourcing
            </span>
            <div className="flex items-center bg-slate-800 rounded-md p-0.5">
              <button
                onClick={() => setCurrency('TZS')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  currency === 'TZS'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TZS
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD $
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/logo.jpg"
              alt="Shema Electronics & Digital Services"
              className="w-11 h-11 rounded-full object-cover shadow-sm border border-amber-400/50 group-hover:scale-105 transition-transform"
            />
            <div className="leading-tight">
              <div className="font-display font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Shema
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                Electronics &amp; Digital Services
              </div>
            </div>
          </Link>

          {/* Global Search Bar */}
          <div className="relative flex-1 max-w-xl hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                placeholder="Search electronics, gadgets, or digital services..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Categorized Search Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                {!hasResults ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No electronics or digital services matched &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                    {searchResults.products.length > 0 && (
                      <div className="p-3">
                        <div className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" /> Electronics Store
                        </div>
                        {searchResults.products.map((p) => (
                          <button
                            key={p.id}
                            onMouseDown={() => {
                              setSearchQuery('');
                              navigate(`/electronics/${p.id}`);
                            }}
                            className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-9 h-9 rounded-lg object-cover bg-slate-100 shrink-0"
                              />
                              <div className="truncate">
                                <div className="text-sm font-medium text-slate-900 truncate">
                                  {p.name}
                                </div>
                                <div className="text-xs text-slate-500">{p.category}</div>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-slate-900 shrink-0">
                              {formatPrice(p.priceTZS)}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.services.length > 0 && (
                      <div className="p-3">
                        <div className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                          <FileCheck2 className="w-3.5 h-3.5" /> Digital &amp; Govt Services
                        </div>
                        {searchResults.services.map((s) => (
                          <button
                            key={s.id}
                            onMouseDown={() => {
                              setSearchQuery('');
                              navigate(`/digital-services/${s.id}`);
                            }}
                            className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-emerald-50/50 text-left cursor-pointer"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-slate-900 truncate">
                                {s.title}
                              </div>
                              <div className="text-xs text-slate-500">
                                {s.category} · {s.processingTime}
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                              Apply <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/account?tab=wishlist"
              title="Wishlist"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/account?tab=services"
              title="My Service Requests"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/70 transition-colors"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Requests</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px]">
                {serviceRequests.length}
              </span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              title="Unified Hybrid Cart"
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold leading-none">
                {cart.length}
              </span>
            </button>

            <Link
              to="/account"
              className="hidden sm:inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight hidden xl:block">
                <div className="text-xs font-semibold text-slate-900">{user.name}</div>
                <div className="text-[10px] text-slate-500">Account Portal</div>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Switcher / Primary Nav */}
        <nav className="hidden lg:flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/electronics" className={navLinkClass}>
              Electronics Store
            </NavLink>
            <NavLink to="/digital-services" className={navLinkClass}>
              Government &amp; Digital Services
            </NavLink>
            <NavLink to="/track" className={navLinkClass}>
              Track My Order / Service
            </NavLink>
            <NavLink to="/clips" className={navLinkClass}>
              Watch &amp; Shop Clips
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Tanzania &amp; Dubai Sourcing
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              M-Pesa · Tigo Pesa · WhatsApp
            </span>
          </div>
        </nav>

        {/* Mobile Search + Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 pb-2 space-y-3 border-t border-slate-100 mt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search electronics or digital services..."
                className="w-full pl-9 pr-8 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchQuery.trim().length > 0 && hasResults && (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-2 space-y-1 max-h-60 overflow-y-auto">
                {searchResults.products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSearchQuery('');
                      setMobileMenuOpen(false);
                      navigate(`/electronics/${p.id}`);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-white text-left text-xs"
                  >
                    <span className="font-semibold text-slate-900 truncate">{p.name}</span>
                    <span className="font-bold text-blue-600 shrink-0">
                      {formatPrice(p.priceTZS)}
                    </span>
                  </button>
                ))}
                {searchResults.services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSearchQuery('');
                      setMobileMenuOpen(false);
                      navigate(`/digital-services/${s.id}`);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg hover:bg-white text-left text-xs"
                  >
                    <span className="font-semibold text-slate-900 truncate">{s.title}</span>
                    <span className="font-bold text-emerald-600 shrink-0">Apply →</span>
                  </button>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/electronics"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Electronics Store
              </NavLink>
              <NavLink
                to="/digital-services"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Government &amp; Digital Services
              </NavLink>
              <NavLink
                to="/track"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Track My Order / Service
              </NavLink>
              <NavLink
                to="/clips"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Watch &amp; Shop Clips
              </NavLink>
              <NavLink
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                My Account &amp; Service Requests
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
