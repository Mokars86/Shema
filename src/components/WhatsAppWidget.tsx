import React, { useState } from 'react';
import { MessageCircle, Send, X, ShieldCheck, ExternalLink } from 'lucide-react';

import { buildWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Karibu Shema Electronics & Digital Services! Need help with RITA, NIDA, TRA, BRELA, e-Immigration, or ordering smartphones from Tanzania or Dubai? Ask us anything.',
      time: 'Online now',
    },
  ]);

  const sendQuickPrompt = (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: prompt, time: 'Just now' },
    ]);
    setTimeout(() => {
      let reply =
        'Our specialist is reviewing your question! Tap "Continue on Official WhatsApp" below to confirm prices, availability, or share documents securely.';
      if (prompt.toLowerCase().includes('passport')) {
        reply =
          'For Tanzania e-Immigration Passport Assistance, you need your verified eRITA Birth Certificate, NIDA NIN, and supporting documents. Official government fees & Shema service charges are displayed separately.';
      } else if (prompt.toLowerCase().includes('dubai') || prompt.toLowerCase().includes('delivery')) {
        reply =
          'Local Tanzania stock dispatches same-day in Dar es Salaam (1–3 days nationwide). Dubai-sourced smartphones & electronics arrive in 4–7 business days. Prices & availability are confirmed before your order is finalised.';
      }
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: reply, time: 'Just now' },
      ]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendQuickPrompt(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
      {open && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">
                  Shema Live Desk
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Human Support · Replies in ~2 mins
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 bg-slate-50 h-64 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => sendQuickPrompt('What documents for Passport?')}
                className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium hover:bg-emerald-100 cursor-pointer"
              >
                Passport requirements?
              </button>
              <button
                onClick={() => sendQuickPrompt('How does Dubai sourcing work?')}
                className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-medium hover:bg-blue-100 cursor-pointer"
              >
                Dubai sourcing &amp; delivery?
              </button>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <a
            href={buildWhatsAppUrl('Hello Shema Electronics & Digital Services, I would like assistance.')}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-800"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Continue on Official WhatsApp</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs sm:text-sm font-bold">
          {open ? 'Close Support' : 'WhatsApp Live Help'}
        </span>
      </button>
    </div>
  );
};
