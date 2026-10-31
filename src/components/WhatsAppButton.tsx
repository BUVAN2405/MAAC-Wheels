import React, { useState } from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

export const WhatsAppButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello MAAC Wheels & Accessories Kumbakonam team, I'd like an inquiry on services, wheels, and accessories for my vehicle."
  );

  return (
    <div className="fixed bottom-20 sm:bottom-22 lg:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {hovered && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#122c21] border border-[#2d5d45] text-emerald-100 text-xs font-mono-code rounded-xl shadow-xl backdrop-blur-md animate-in fade-in duration-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>KUMBAKONAM WORKSHOP • {WORKSHOP_DETAILS.phone}</span>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        id="floating-whatsapp-btn"
        className="relative group p-3.5 sm:p-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-full shadow-2xl shadow-black/80 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border-2 border-emerald-300/60"
        aria-label="Direct WhatsApp Consultation"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping" />
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 fill-current" />
      </a>
    </div>
  );
};
