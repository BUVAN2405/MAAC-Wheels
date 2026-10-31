import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Check, MapPin, PhoneCall, MessageSquare, Sparkles } from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES } from '../data/catalog.ts';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWorkshop = () => {
    const el = document.getElementById('contact-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a1c15] border-t-2 border-[#1f4736] text-emerald-100/70 text-xs pt-16 pb-12">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Philosophy & Real Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white rounded-lg border border-[#2d5d45] shadow-md flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-title text-2xl text-white tracking-wider">MAAC</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                </div>
                <span className="font-label text-[10px] text-emerald-300 uppercase tracking-widest font-semibold">
                  WHEELS & ACCESSORIES
                </span>
              </div>
            </div>

            <p className="text-sm text-emerald-100/80 font-body leading-relaxed max-w-md">
              Your premier destination for high-performance automotive wheels, custom fitments,
              laser optics, cockpit electronics, and aerodynamic styling in Kumbakonam, Tamil Nadu.
            </p>

            <div className="flex items-center gap-2 pt-1 text-emerald-200 text-xs font-body">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Authentic Automotive Performance & Fitment Assurance</span>
            </div>
          </div>

          {/* Col 2: Signature Services */}
          <div>
            <h4 className="font-subheading text-sm text-white mb-3.5 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Signature Services
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-emerald-200/80">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <button
                    onClick={scrollToServices}
                    className="hover:text-emerald-300 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Workshop Facility */}
          <div>
            <h4 className="font-subheading text-sm text-white mb-3.5 font-bold uppercase tracking-wider">
              Workshop Facility
            </h4>
            <div className="space-y-2.5 text-xs font-body text-emerald-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={WORKSHOP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  {WORKSHOP_DETAILS.address}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {WORKSHOP_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 8:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 4: Performance Newsletter */}
          <div>
            <h4 className="font-subheading text-sm text-white mb-3.5 font-bold uppercase tracking-wider">
              Fitment Updates
            </h4>
            <p className="text-xs text-emerald-200/75 font-body mb-3">
              Subscribe for new forged arrivals, ceramic armor treatments, and build releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-[#122c21] border border-[#2d5d45] rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 font-body"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-mono-code flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Subscribed to MAAC Updates!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-[#1f4736] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-emerald-300/70">
          <p>© {new Date().getFullYear()} MAAC Wheels & Accessories. Master Automotive Craftsmanship, Kumbakonam.</p>
          
          {/* Powered by VelzenLabs */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122c21] border border-[#2d5d45]">
            <span className="text-emerald-300/80">Powered by -</span>
            <span className="text-emerald-400 font-bold tracking-wider hover:text-emerald-300 transition-colors">
              VelzenLabs
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-300/80">Deep Green & Mint Automotive Palette</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">Universal Car Fitment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
