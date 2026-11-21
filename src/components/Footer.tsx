import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-emerald-500 flex items-center justify-center font-display font-extrabold text-white">
              S
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">
                Shema Electronic &amp; Digital
              </div>
              <div className="text-xs text-slate-400">Online Service Hub</div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Bridging authentic consumer electronics with fast, transparent government and digital portal assistance across Ghana.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted Document Portal</span>
          </div>
        </div>

        {/* Electronics */}
        <div>
          <h4 className="font-display font-bold text-white text-sm mb-4">
            Electronics Store
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/electronics?cat=Smartphones" className="hover:text-white">
                Smartphones &amp; Tablets
              </Link>
            </li>
            <li>
              <Link to="/electronics?cat=TVs+%26+Audio" className="hover:text-white">
                4K Smart TVs &amp; Audio
              </Link>
            </li>
            <li>
              <Link to="/electronics?cat=Home+Appliances" className="hover:text-white">
                Home Appliances &amp; Fridges
              </Link>
            </li>
            <li>
              <Link to="/electronics?cat=Laptops+%26+Accessories" className="hover:text-white">
                Laptops &amp; Power Stations
              </Link>
            </li>
          </ul>
        </div>

        {/* Digital Services */}
        <div>
          <h4 className="font-display font-bold text-white text-sm mb-4">
            Government &amp; Digital Services
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/digital-services?cat=Passport" className="hover:text-white">
                Passport Applications &amp; Renewals
              </Link>
            </li>
            <li>
              <Link to="/digital-services?cat=Permits+%26+Licenses" className="hover:text-white">
                Ghana Card &amp; DVLA Assistance
              </Link>
            </li>
            <li>
              <Link to="/digital-services?cat=Tax+%26+Business" className="hover:text-white">
                RGD Business &amp; GRA TIN Filing
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
            Customer Support
          </h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>42 Liberation Road, Airport Residential, Accra</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>+233 30 274 8890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span>support@shemaservice.gh</span>
          </div>

          <div className="pt-3">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Accepted Payment Gateways
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['MTN MoMo', 'Telecel Cash', 'AirtelTigo', 'Visa', 'Mastercard'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-5 px-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Shema Electronics &amp; Digital Online Service. All rights reserved.
      </div>
    </footer>
  );
};
