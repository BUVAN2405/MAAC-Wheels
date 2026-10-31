import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES } from '../data/catalog.ts';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0e241c]/95 backdrop-blur-md border-b-2 border-[#234d3b] shadow-xl shadow-black/40">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 relative">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer focus:outline-none"
              title="MAAC Wheels & Accessories Kumbakonam"
            >
              <div className="relative p-1 bg-white rounded-lg border border-[#2d5d45] shadow-md group-hover:border-emerald-400 transition-colors flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Wheels & Accessories Logo"
                  className="h-8 sm:h-11 w-auto object-contain"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-title text-xl sm:text-2xl lg:text-3xl text-white tracking-wider font-extrabold group-hover:text-emerald-300 transition-colors leading-none">
                    MAAC
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
                <p className="font-button text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-widest text-emerald-300/80 font-semibold leading-tight mt-0.5">
                  WHEELS & ACCESSORIES
                </p>
              </div>
            </button>
          </div>

          {/* DESKTOP & TABLET NAVBAR */}
          <nav 
            className="hidden md:flex items-center gap-2 lg:gap-4" 
            aria-label="Main navigation"
          >
            {/* Services Dropdown */}
            <div ref={servicesDropdownRef} className="relative">
              <button
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className="px-3.5 lg:px-4 py-2 rounded-xl text-xs font-button uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer text-emerald-100 hover:text-white hover:bg-[#163629] border border-transparent hover:border-[#2d5d45]"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Our Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180 text-emerald-400' : 'text-emerald-300'}`} />
              </button>

              {servicesMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#122c21] border-2 border-[#2d5d45] rounded-2xl p-3 shadow-2xl shadow-black/85 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#234d3b]">
                    <span className="font-label text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      6 Signature Services
                    </span>
                    <button
                      onClick={() => scrollToSection('services-section')}
                      className="text-[11px] text-emerald-400 hover:text-white flex items-center gap-1 font-semibold"
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {SERVICES.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection('services-section')}
                        className="w-full text-left p-2 rounded-xl hover:bg-[#18392b] text-emerald-100 hover:text-white transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <p className="text-xs font-heading uppercase text-white group-hover:text-emerald-300">{s.title}</p>
                          <p className="text-[10px] text-emerald-300/70 truncate max-w-[200px]">{s.subtitle}</p>
                        </div>
                        <span className="text-[10px] font-mono-code text-emerald-400/80">0{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Section Link */}
            <button
              onClick={() => scrollToSection('services-section')}
              className="px-3.5 lg:px-4 py-2 rounded-xl text-xs font-button uppercase tracking-wider text-emerald-100 hover:text-white hover:bg-[#163629] border border-transparent transition-all cursor-pointer"
            >
              Services Overview
            </button>

            {/* Workshop Desk & Consultation */}
            <button
              onClick={() => scrollToSection('contact-section')}
              className="px-3.5 lg:px-4 py-2 rounded-xl text-xs font-button uppercase tracking-wider text-emerald-100 hover:text-white hover:bg-[#163629] border border-transparent transition-all cursor-pointer"
            >
              Workshop Desk
            </button>
          </nav>

          {/* Right Action: WhatsApp & Mobile Toggle */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a
              href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent("Hello MAAC Wheels Kumbakonam, I would like to consult on automotive services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-button font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-950 fill-current" />
              <span>Book Service</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-emerald-300 hover:text-white bg-[#122c21] active:bg-[#18392b] rounded-xl border border-[#2d5d45] transition-colors cursor-pointer"
              title="Open Navigation Menu"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-emerald-400" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE MENU PORTAL */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          id="mobile-navigation-modal"
          className="fixed inset-0 z-[9999] bg-[#0d231a] text-emerald-50 flex flex-col overflow-hidden animate-in fade-in duration-150"
        >
          {/* Top Header */}
          <div className="h-16 px-4 bg-[#122c21] border-b border-[#234d3b] flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="p-1 bg-white rounded-lg border border-[#2d5d45] flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-title text-xl text-white font-extrabold tracking-wider">MAAC</span>
                <p className="font-button text-[8px] uppercase tracking-widest text-emerald-300 font-semibold leading-none mt-0.5">
                  WHEELS & ACCESSORIES
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-emerald-200 hover:text-white bg-[#163629] active:bg-[#1a4031] rounded-xl border border-[#2d5d45] transition-colors cursor-pointer"
              title="Close Navigation Menu"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-emerald-400" />
            </button>
          </div>

          {/* Menu Body */}
          <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-4 bg-[#0d231a]">
            {/* Workshop Location Badge */}
            <div className="p-3 bg-[#122c21] rounded-xl border border-[#2d5d45] flex items-center justify-between shadow-sm">
              <div>
                <p className="font-heading text-base text-white leading-tight">MAAC WHEELS & ACCESSORIES</p>
                <p className="text-[10px] text-emerald-300 font-mono-code">Kumbakonam • NH 36 Bypass</p>
              </div>
              <span className="text-[9px] font-mono-code bg-[#18392b] text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/50 uppercase font-bold">
                Workshop Bay
              </span>
            </div>

            {/* 6 Services */}
            <div className="p-4 bg-[#122c21] rounded-2xl border border-[#2d5d45] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="font-heading text-sm text-white uppercase tracking-wider">
                    Our 6 Signature Services
                  </span>
                </div>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="text-xs text-emerald-400 font-semibold"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1 border-t border-[#1f4736]">
                {SERVICES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection('services-section')}
                    className="w-full text-left p-2.5 rounded-xl bg-[#17382a] hover:bg-[#1c4333] border border-[#234d3b] flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-heading text-white uppercase">{s.title}</p>
                      <p className="text-[10px] text-emerald-300/80">{s.subtitle}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Jump to Workshop Desk */}
            <button
              onClick={() => scrollToSection('contact-section')}
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-between border bg-[#122c21] text-white border-[#2d5d45] cursor-pointer"
            >
              <span>Technical Consultation & Workshop Desk</span>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Direct Action Contacts */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${WORKSHOP_DETAILS.phone}`}
                className="py-3 px-3 bg-[#122c21] hover:bg-[#18392b] border border-[#2d5d45] text-white rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Workshop</span>
              </a>

              <a
                href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent("Hello MAAC Wheels Kumbakonam, I would like to consult on automotive services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/60"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-950 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
