import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  MapPin, 
  CalendarX, 
  MessageSquare, 
  ExternalLink, 
  Navigation, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [whatsAppRedirectUrl, setWhatsAppRedirectUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim().slice(0, 80);
    const cleanMessage = formData.message.trim().slice(0, 1000);
    const cleanPhone = formData.phone.trim().slice(0, 25);
    const cleanEmail = formData.email.trim().slice(0, 80);
    const cleanVehicle = formData.vehicle.trim().slice(0, 80);

    if (!cleanName || !cleanMessage) return;

    setStatus('submitting');

    const msg = [
      `*New Fitment & Service Inquiry:*`,
      `Name: *${cleanName}*`,
      cleanPhone ? `Phone: ${cleanPhone}` : null,
      cleanEmail ? `Email: ${cleanEmail}` : null,
      cleanVehicle ? `Vehicle: *${cleanVehicle}*` : null,
      ``,
      `*Requirements:*`,
      cleanMessage
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    setWhatsAppRedirectUrl(waUrl);

    setTimeout(() => {
      setStatus('success');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const { lat, lng } = WORKSHOP_DETAILS.coordinates; // 10.9829948, 79.3907444

  return (
    <section id="contact-section" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1760px] mx-auto overflow-hidden bg-[#0d231a]">
      {/* Ambient Fluid Glows in Deep Green & Mint */}
      <div className="absolute top-1/4 left-1/5 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#2d5d45]/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-20 w-[420px] h-[420px] bg-teal-500/12 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Master Container */}
      <div className="relative rounded-2xl sm:rounded-3xl border-2 border-[#234d3b] bg-[#122c21] p-4 sm:p-8 lg:p-12 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Mint Light Rim Highlight at Top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17382a] border border-[#2d5d45] text-emerald-300 font-label text-xs mb-3.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Kumbakonam Workshop & Fitment Desk</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide mb-3">
            Technical Consultation & <span className="text-emerald-400">Workshop</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-emerald-100/80 font-body leading-relaxed">
            Visit our physical workshop located right on Kumbakonam Bypass (NH 36) or consult directly with our chassis, audio, and styling specialists.
            Submit your vehicle details below for bespoke wheel fitment, seat covers, ceramic armor, and sun film booking.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
          {/* Left Column: Workshop Information & Mini Map */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            
            {/* MINI MAP */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2d5d45] bg-[#0c1c15] shadow-lg group/map flex flex-col">
              {/* Map Header */}
              <div className="px-3.5 py-2.5 bg-[#17382a] border-b border-[#2d5d45] flex items-center justify-between text-xs z-20">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-label text-[11px] tracking-wide uppercase font-semibold">
                    Shop Satellite View (NH 36 Bypass)
                  </span>
                </div>

                <a
                  href={WORKSHOP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-label text-[10px] sm:text-[11px] text-emerald-200 hover:text-white px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/80 border border-emerald-400/40 transition-all shadow-sm group/link"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </div>

              {/* Map Viewport */}
              <div className="relative w-full h-64 sm:h-72 bg-black">
                <iframe
                  title="MAAC Wheels & Accessories Kumbakonam Satellite View"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&t=k&hl=en&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Overlaid Direct Directions Link */}
                <div className="absolute bottom-2.5 right-2.5 z-20">
                  <a
                    href={WORKSHOP_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-black/90 hover:bg-black border border-emerald-400/60 text-emerald-300 hover:text-white text-[11px] font-button uppercase tracking-wider shadow-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Bottom Address Info Strip under Map */}
              <div className="p-3 bg-[#10271d] border-t border-[#234d3b] flex items-center justify-between text-xs font-body text-emerald-200">
                <div className="flex items-center gap-1.5 truncate pr-2 text-[11px] sm:text-xs">
                  <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">NH 36 Bypass, Koranattukkaruppur, Kumbakonam - 612501</span>
                </div>
                <span className="text-emerald-400 text-[10px] sm:text-[11px] shrink-0 font-label flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Open Today
                </span>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="p-4 sm:p-5 bg-[#17382a] border border-[#2d5d45] rounded-2xl transition-all shadow-md">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-label mb-2.5">
                <div className="w-6 h-6 rounded-lg bg-black/60 border border-emerald-400/50 flex items-center justify-center">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>DIRECT FITMENT DESK</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-white text-2xl sm:text-3xl block font-price leading-none tracking-wide">
                    {WORKSHOP_DETAILS.phone}
                  </span>
                  <span className="font-label text-[11px] text-emerald-300/70 block mt-1">Direct line to shop technicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello MAAC Wheels & Accessories Kumbakonam, I would like to inquire regarding vehicle fitments.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-lg text-xs font-button uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current text-slate-950" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 sm:p-4 bg-[#17382a] border border-[#2d5d45] rounded-2xl">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-label mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Working Hours</span>
                </div>
                <p className="text-white font-subheading text-sm">9:30 AM – 8:30 PM</p>
                <p className="text-xs text-emerald-300/70 mt-0.5 font-body">Monday to Saturday</p>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#17382a] border border-[#2d5d45] rounded-2xl">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-label mb-1">
                  <CalendarX className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sunday Hours</span>
                </div>
                <p className="text-white font-subheading text-sm">10:00 AM – 4:00 PM</p>
                <p className="text-xs text-emerald-300/70 mt-0.5 font-body">Active Service Bay</p>
              </div>
            </div>

            {/* Fitment Guarantee Pill */}
            <div className="flex items-center gap-3 p-3.5 bg-[#17382a] border border-[#2d5d45] rounded-2xl text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-100/90 font-body">
                100% Bolt-On Fitment Guarantee: Chassis clearance, hub bore, and PCD verified prior to purchase.
              </span>
            </div>
          </div>

          {/* Right Column: Consultation Form */}
          <div className="lg:col-span-7 bg-[#0f281e] border border-[#234d3b] rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Top accent light */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs font-label text-emerald-300">
                  <div className="w-6 h-6 rounded-lg bg-black/60 border border-emerald-400/40 flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="uppercase tracking-wider">Submit Vehicle Fitment Inquiry</span>
                </div>
                <span className="text-[10px] font-label text-emerald-300 px-2.5 py-0.5 rounded-full bg-[#17382a] border border-[#2d5d45]">
                  Instant Response
                </span>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-[#163a2b] border border-emerald-400/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-200 shadow-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-subheading block text-white font-bold">Inquiry Ready!</span>
                      <span className="font-body text-emerald-100">We have prepared your message for WhatsApp consultation with the workshop team.</span>
                    </div>
                  </div>
                  {whatsAppRedirectUrl && (
                    <a
                      href={whatsAppRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg font-button text-xs uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Re-open WhatsApp</span>
                    </a>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label text-emerald-200 mb-1.5">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0b1c15] border border-[#2d5d45] focus:border-emerald-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label text-emerald-200 mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0b1c15] border border-[#2d5d45] focus:border-emerald-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-body"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label text-emerald-200 mb-1.5">
                      Vehicle Make, Model & Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mahindra Thar Roxx / Creta 2024"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full bg-[#0b1c15] border border-[#2d5d45] focus:border-emerald-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label text-emerald-200 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0b1c15] border border-[#2d5d45] focus:border-emerald-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label text-emerald-200 mb-1.5">
                    Modifications & Service Requirements <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe desired upgrades: e.g. 18-inch forged alloys with 114.3 PCD, Ceramic Coating 10H, Alcantara seat covers, Sun Film installation, or DSP audio tuning..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0b1c15] border border-[#2d5d45] focus:border-emerald-400 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-body"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-button font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_25px_rgba(52,211,153,0.45)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group/submit"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-slate-950 group-hover/submit:scale-110 transition-transform" />
                  <span>{status === 'submitting' ? 'Preparing Consultation...' : 'Send Inquiry via WhatsApp Consultation'}</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1f4736] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-emerald-300/70 font-body">
              <span>* WhatsApp auto-populates with your full vehicle specification for instant engineering review.</span>
              <span className="text-emerald-200 font-label flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Workshop
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
