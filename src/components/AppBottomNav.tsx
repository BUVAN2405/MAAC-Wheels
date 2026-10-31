import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Sparkles, 
  MapPin, 
  MessageSquare 
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

export const AppBottomNav: React.FC = () => {
  const [activeItem, setActiveItem] = useState<'home' | 'services' | 'workshop'>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const contactEl = document.getElementById('contact-section');
      const servicesEl = document.getElementById('services-section');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveItem('workshop');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveItem('services');
      } else {
        setActiveItem('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string, item: 'home' | 'services' | 'workshop') => {
    setActiveItem(item);
    if (item === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openWhatsApp = () => {
    const defaultMessage = encodeURIComponent(
      "Hello MAAC Wheels & Accessories Kumbakonam team, I would like to consult on automotive services and fitment for my car."
    );
    window.open(`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${defaultMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav 
      aria-label="Mobile App Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0e241c]/95 backdrop-blur-xl border-t-2 border-[#234d3b] shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-safe"
    >
      <div className="grid grid-cols-4 h-16 items-center px-2 sm:px-6 max-w-md mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => scrollTo('root', 'home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'home'
              ? 'text-emerald-300 font-bold'
              : 'text-emerald-200/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeItem === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] font-label uppercase tracking-wider">Home</span>
        </button>

        {/* 2. Services */}
        <button
          onClick={() => scrollTo('services-section', 'services')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'services'
              ? 'text-emerald-300 font-bold'
              : 'text-emerald-200/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5" />
            {activeItem === 'services' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] font-label uppercase tracking-wider">Services</span>
        </button>

        {/* 3. Kumbakonam Workshop Desk */}
        <button
          onClick={() => scrollTo('contact-section', 'workshop')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'workshop'
              ? 'text-emerald-300 font-bold'
              : 'text-emerald-200/60 hover:text-white'
          }`}
        >
          <div className="relative">
            <MapPin className="w-5 h-5" />
            {activeItem === 'workshop' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] font-label uppercase tracking-wider">Workshop</span>
        </button>

        {/* 4. Direct WhatsApp Chat */}
        <button
          onClick={openWhatsApp}
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-300 hover:text-white transition-all cursor-pointer"
        >
          <div className="relative p-1.5 bg-[#163629] rounded-xl border border-emerald-400/40">
            <MessageSquare className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-label uppercase tracking-wider text-emerald-300 font-bold">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
};
