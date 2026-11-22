import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  CreditCard,
  FileCheck2,
  Laptop,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Tv,
  Zap,
  Building2,
  FileBadge2,
  Play,
} from 'lucide-react';
import { DIGITAL_SERVICES, FAQS, PRODUCTS, TESTIMONIALS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { formatCompactCount } from '../utils/videoThumbnail';

export const HomePage: React.FC = () => {
  const { formatPrice, clips } = useApp();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. DYNAMIC SPLIT HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Left Side: Electronics */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-5 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[400px] shadow-xl">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3 sm:mb-4">
                <Cpu className="w-3.5 h-3.5" />
                Electronics &amp; Technology Products
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight tracking-tight">
                Tanzania&apos;s Tech Store · Sourced in Dubai
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-md">
                A Tanzanian business sourcing phones, laptops &amp; gadgets from Dubai. Order your device and we procure it for you in Dubai before delivering it to you in Tanzania.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/electronics"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Browse Electronics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 pr-4">
                <img
                  src={PRODUCTS[0].images[0]}
                  alt={PRODUCTS[0].name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <div className="text-blue-300 font-semibold">Dubai Sourcing</div>
                  <div className="font-bold text-white">{PRODUCTS[0].name}</div>
                  <div className="text-slate-300">{formatPrice(PRODUCTS[0].priceTZS)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Digital & Government Services */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-5 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[400px] shadow-xl">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3 sm:mb-4">
                <FileCheck2 className="w-3.5 h-3.5" />
                Online &amp; Digital Services · Tanzania
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight tracking-tight">
                Guided Assistance for Tanzania Government Online Portals
              </h2>
              <p className="text-emerald-100/85 text-sm sm:text-base mt-3 max-w-md">
                Independent digital assistance for RITA, NIDA, TRA, BRELA, and e-Immigration applications, plus business &amp; document support.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/digital-services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
              >
                <span>Explore Digital Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex flex-col gap-1.5 text-xs bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Govt &amp; Service Fees Shown Separately</span>
                </div>
                <div className="text-slate-200">
                  eRITA · NIDA · TRA · BRELA · e-Immigration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICE GRID (THE DUAL PILLAR) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Electronics */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Division 01 · Hardware &amp; Dubai Sourcing
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 mt-0.5">
                  Electronics &amp; Technology Products
                </h3>
              </div>
              <Link
                to="/electronics"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                Browse All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Smartphones', cat: 'Smartphones', icon: Smartphone },
                {
                  label: 'Mobile Accessories',
                  cat: 'Mobile Phone Accessories',
                  icon: Zap,
                },
                {
                  label: 'Smart Gadgets & Wearables',
                  cat: 'Smart Gadgets & Wearables',
                  icon: Tv,
                },
                {
                  label: 'Computers & Electronics',
                  cat: 'Computers & Electronics',
                  icon: Laptop,
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={`/electronics?cat=${encodeURIComponent(item.cat)}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-blue-200 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Card 2: Digital Services */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Division 02 · Tanzania Portals &amp; Support
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 mt-0.5">
                  Online &amp; Digital Services
                </h3>
              </div>
              <Link
                to="/digital-services"
                className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
              >
                All Portals <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: 'RITA & NIDA Services',
                  cat: 'RITA Services',
                  icon: ShieldCheck,
                },
                {
                  label: 'TRA & BRELA Services',
                  cat: 'BRELA Services',
                  icon: Building2,
                },
                {
                  label: 'e-Immigration Passport',
                  cat: 'Immigration Services',
                  icon: FileBadge2,
                },
                {
                  label: 'Business & Document Support',
                  cat: 'Other Business & Digital Services',
                  icon: Sparkles,
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={`/digital-services?cat=${encodeURIComponent(item.cat)}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/70 hover:border-emerald-200 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ELECTRONICS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Best-Selling Tech
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
              Featured Electronics
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              to="/electronics"
              className="ml-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              View All Store
            </Link>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        >
          {PRODUCTS.slice(0, 6).map((product) => (
            <div key={product.id} className="min-w-[245px] sm:min-w-[290px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 3.5 WATCH & SHOP CLIPS (TIKTOK-STYLE DISCOVERY) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Short Video Reviews &amp; Guides
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
              Watch &amp; Shop Clips
            </h2>
          </div>
          <Link
            to="/clips"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Open Video Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {clips.slice(0, 3).map((clip) => (
            <Link
              key={clip.id}
              to="/clips"
              className="group relative aspect-3/4 sm:aspect-4/5 rounded-3xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={clip.thumbnailUrl}
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[11px] font-bold inline-flex items-center gap-1">
                <Play className="w-3 h-3 fill-white" />
                <span>{formatCompactCount(clip.views)} views</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[11px] font-semibold text-emerald-300 mb-0.5">
                  {clip.creatorHandle}
                </div>
                <div className="text-xs sm:text-sm font-bold line-clamp-2">
                  {clip.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR DIGITAL SERVICES */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Transparent Fees · Live Tracking
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
              Popular Digital &amp; Government Services
            </h2>
          </div>
          <Link
            to="/digital-services"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
          >
            Explore All Services
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...DIGITAL_SERVICES]
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 6)
            .map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    {srv.category}
                  </span>
                  {srv.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {srv.shortDescription}
                </p>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Est. {srv.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{srv.requiredDocuments.length} required document(s)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500">Total (Govt + Shema)</div>
                  <div className="font-display font-extrabold text-lg text-slate-900">
                    {formatPrice(srv.serviceFeeTZS + srv.govtFeeTZS)}
                  </div>
                </div>

                <Link
                  to={`/digital-services/${srv.id}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (TRUST BUILDER) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Unified &amp; Transparent Flow
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl mt-1">
              How Shema Works
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Whether you are ordering a Smart TV or filing a Passport application, you get one secure checkout and real-time tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Choose Service or Product',
                desc: 'Browse our Electronics Store or select a Digital Service and upload your required documents in our encrypted wizard.',
                icon: Sparkles,
                color: 'bg-blue-500/20 text-blue-400',
              },
              {
                step: '02',
                title: 'Pay Securely Online',
                desc: 'Combine gadgets and services in one Hybrid Cart. Pay instantly via MTN MoMo, Telecel Cash, AirtelTigo, or Visa/Mastercard.',
                icon: CreditCard,
                color: 'bg-emerald-500/20 text-emerald-400',
              },
              {
                step: '03',
                title: 'Receive or Track Live',
                desc: 'Get same-day electronics delivery or monitor your government application progress bar with direct specialist chat.',
                icon: Truck,
                color: 'bg-amber-500/20 text-amber-400',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-slate-800/60 border border-slate-700/80 rounded-3xl p-7"
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-display font-extrabold text-3xl text-slate-700">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS, PAYMENT BADGES & FAQs */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Trusted by Thousands Across Ghana
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Verified reviews from electronics buyers and digital portal applicants
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {t.pillar}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Security Strip */}
        <div className="bg-linear-to-r from-blue-50 via-white to-emerald-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-base">
                Bank-Grade Checkout &amp; Local Payments
              </h3>
              <p className="text-xs text-slate-600">
                Instant confirmation with Mobile Money &amp; international cards
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { name: 'MTN MoMo', bg: 'bg-amber-400 text-slate-950' },
              { name: 'Telecel Cash', bg: 'bg-rose-600 text-white' },
              { name: 'AirtelTigo Money', bg: 'bg-blue-700 text-white' },
              { name: 'Visa', bg: 'bg-slate-900 text-white' },
              { name: 'Mastercard', bg: 'bg-orange-600 text-white' },
            ].map((p) => (
              <span
                key={p.name}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs ${p.bg}`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-slate-900 text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
