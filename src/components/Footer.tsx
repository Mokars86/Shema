import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Lock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import {
  SHEMA_DUBAI_DISPLAY,
  SHEMA_EMAIL,
  SHEMA_WHATSAPP_DISPLAY,
} from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="Shema Electronics & Digital Services"
              className="w-11 h-11 rounded-full object-cover shadow-sm border border-amber-400/40"
            />
            <div>
              <div className="font-display font-bold text-white text-base">
                Shema Electronics &amp; Digital
              </div>
              <div className="text-xs text-slate-400">Your Tech, Our Priority</div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Independent Digital Services Assistance Provider for Tanzania government online platforms, paired with quality smartphones and electronics available locally and on order from Dubai, UAE.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparent Govt &amp; Service Fees</span>
          </div>
        </div>

        {/* Electronics */}
        <div>
          <h4 className="font-display font-bold text-white text-sm mb-4">
            Electronics &amp; Tech Products
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/electronics?cat=Smartphones" className="hover:text-white">
                Smartphones (iPhone, Pixel, Samsung, Xiaomi…)
              </Link>
            </li>
            <li>
              <Link
                to="/electronics?cat=Mobile+Phone+Accessories"
                className="hover:text-white"
              >
                Mobile Phone Accessories
              </Link>
            </li>
            <li>
              <Link
                to="/electronics?cat=Smart+Gadgets+%26+Wearables"
                className="hover:text-white"
              >
                Smart Gadgets &amp; Wearables
              </Link>
            </li>
            <li>
              <Link
                to="/electronics?cat=Computers+%26+Electronics"
                className="hover:text-white"
              >
                Computers &amp; Electronics
              </Link>
            </li>
          </ul>
        </div>

        {/* Digital Services */}
        <div>
          <h4 className="font-display font-bold text-white text-sm mb-4">
            Online &amp; Digital Services
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/digital-services?cat=RITA+Services" className="hover:text-white">
                RITA (eRITA) &amp; NIDA Services
              </Link>
            </li>
            <li>
              <Link to="/digital-services?cat=TRA+Services" className="hover:text-white">
                TRA Taxpayer Portal &amp; TIN
              </Link>
            </li>
            <li>
              <Link to="/digital-services?cat=BRELA+Services" className="hover:text-white">
                BRELA BOS &amp; ORS Registration
              </Link>
            </li>
            <li>
              <Link
                to="/digital-services?cat=Immigration+Services"
                className="hover:text-white"
              >
                Tanzania e-Immigration Passport
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-white text-emerald-400 font-medium">
                Track My Order / Service →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Payments */}
        <div className="space-y-3 text-xs">
          <h4 className="font-display font-bold text-white text-sm mb-4">
            Tanzania &amp; Dubai Desk
          </h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>Dar es Salaam, Tanzania (Local Dispatch &amp; Pickup)</span>
          </div>
          <div className="flex items-start gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Dubai, UAE Sourcing Hub ({SHEMA_DUBAI_DISPLAY})</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{SHEMA_WHATSAPP_DISPLAY}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{SHEMA_EMAIL}</span>
          </div>

          <div className="pt-2">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Accepted Payment Methods
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Bank / Visa'].map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-5 px-4 text-center text-[11px] text-slate-500 max-w-6xl mx-auto space-y-1.5">
        <p>
          Disclaimer: Shema Electronics &amp; Digital Services is an independent digital assistance provider. All official registrations, certificates, identification numbers, and approvals are issued or determined solely by the respective government authorities (RITA, NIDA, TRA, BRELA, Immigration).
        </p>
        <p>
          © {new Date().getFullYear()} Shema Electronics &amp; Digital Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
