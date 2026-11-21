import React, { useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', topic: 'Digital Service Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Support inquiry sent! Our team will reply shortly.');
    setForm({ name: '', email: '', topic: 'Digital Service Inquiry', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Human Support Desk
        </span>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 mt-1">
          Contact Shema Electronics &amp; Digital Service
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Have questions about passport requirements, business registration, or electronics warranty? Reach us directly.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {[
            {
              icon: Phone,
              title: 'Support Hotline',
              detail: '+233 30 274 8890',
              sub: 'Mon–Sat: 8:00 AM – 7:00 PM GMT',
              color: 'bg-blue-50 text-blue-600',
            },
            {
              icon: MessageCircle,
              title: 'WhatsApp Quick Desk',
              detail: '+233 24 555 0192',
              sub: 'Instant document pre-checks',
              color: 'bg-emerald-50 text-emerald-600',
            },
            {
              icon: MapPin,
              title: 'Accra Flagship Hub',
              detail: '42 Liberation Road, Airport Residential',
              sub: 'Pickup & Biometric Consultation',
              color: 'bg-slate-100 text-slate-700',
            },
            {
              icon: Mail,
              title: 'Email Support',
              detail: 'support@shemaservice.gh',
              sub: 'Replies within 2 business hours',
              color: 'bg-amber-50 text-amber-600',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}
              >
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500">{card.title}</div>
                <div className="font-bold text-sm text-slate-900 mt-0.5">
                  {card.detail}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{card.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-slate-900">
              Send Us a Message
            </h2>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
              <Clock className="w-3.5 h-3.5" /> Avg. response: 15 mins
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          <select
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600"
          >
            <option>Digital Service Inquiry (Passport / Ghana Card / RGD)</option>
            <option>Electronics Order &amp; Warranty Support</option>
            <option>Corporate / Bulk Procurement</option>
          </select>

          <textarea
            rows={5}
            required
            placeholder="How can our team assist you today?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Inquiry</span>
          </button>
        </form>
      </div>
    </div>
  );
};
