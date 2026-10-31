import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Layers, 
  Wrench,
  Disc,
  Volume2,
  Sun,
  Palette
} from 'lucide-react';
import { ServiceItem } from '../types.ts';
import { SERVICES, getServiceWhatsAppUrl, WORKSHOP_DETAILS } from '../data/catalog.ts';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'seat-covers-leathers':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'ceramic-coating':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'sun-films':
        return <Sun className="w-5 h-5 text-emerald-400" />;
      case 'rubbing-and-polishing':
        return <Palette className="w-5 h-5 text-emerald-400" />;
      case 'car-audio-system':
        return <Volume2 className="w-5 h-5 text-emerald-400" />;
      case 'alloy-wheels':
        return <Disc className="w-5 h-5 text-emerald-400" />;
      default:
        return <Wrench className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleCardClick = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
    } else {
      setActiveModalService(service);
    }
  };

  return (
    <section
      id="services-section"
      className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1760px] mx-auto bg-[#0d231a]"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#1f4a36]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#2d5740]/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 border-b border-[#234d3b] pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            <span className="font-label text-emerald-300 text-xs font-bold tracking-widest uppercase">
              Automotive Craftsmanship & Treatment
            </span>
            <span className="mx-2 text-[#2d5d45] hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-label text-xs bg-[#163629] border border-[#2d5d45] text-emerald-200">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              6 Signature Services
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            Our Premium <span className="text-emerald-400 drop-shadow-[0_2px_15px_rgba(52,211,153,0.3)]">Services</span>
          </h2>
        </div>

        <p className="mt-3 md:mt-0 text-sm sm:text-base text-emerald-100/75 max-w-lg font-body leading-relaxed">
          Comprehensive expert automotive detailing, bespoke interior tailoring, audio engineering, and exterior stance upgrades executed to showroom perfection.
        </p>
      </div>

      {/* ========================================================
          6 SIGNATURE SERVICES GRID
          3 Columns on Large Screens | 2 Columns on Tablet | 1 on Mobile
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {SERVICES.map((service, index) => {
          const waUrl = getServiceWhatsAppUrl(service);

          return (
            <div
              key={service.id}
              className="group relative bg-[#122c21] rounded-2xl border-2 border-[#234d3b] hover:border-emerald-400/80 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#06120c] cursor-pointer"
              onClick={() => handleCardClick(service)}
            >
              {/* Top Image Showcase */}
              <div className="relative w-full aspect-[16/10] bg-black overflow-hidden border-b border-[#234d3b]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Gradient Overlays for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#122c21] via-transparent to-black/40 opacity-90" />

                {/* Badge (Black accent with mint border) */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/90 border border-emerald-400/50 backdrop-blur-md shadow-lg">
                  {getServiceIcon(service.id)}
                  <span className="font-label text-[10px] sm:text-xs font-bold text-emerald-300 tracking-wider">
                    {service.badge}
                  </span>
                </div>

                {/* Order Index Pill */}
                <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/85 border border-[#2d5d45] flex items-center justify-center font-heading text-xs text-emerald-300">
                  0{index + 1}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#122c21]">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wide">
                    {service.title}
                  </h3>
                  
                  <p className="font-subheading text-xs sm:text-sm text-emerald-300/90 font-medium mt-1 mb-3">
                    {service.subtitle}
                  </p>

                  <p className="font-body text-xs sm:text-sm text-emerald-100/80 line-clamp-3 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights list */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1c4333]">
                    {service.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-200/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-[#1f4736] flex items-center justify-between gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(waUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/70 hover:bg-black border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 font-button text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md group/btn"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Inquire Service</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalService(service);
                    }}
                    className="p-2.5 rounded-xl bg-[#18392b] hover:bg-[#204a38] border border-[#2d5d45] text-emerald-300 hover:text-white transition-colors"
                    title="View service details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#122c21] border-2 border-emerald-400/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/95 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-56 sm:h-72 bg-black overflow-hidden">
              <img 
                src={activeModalService.image} 
                alt={activeModalService.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122c21] via-transparent to-black/60" />
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 border border-emerald-400/60 text-white hover:text-emerald-300 flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <span className="px-3 py-1 rounded-full bg-black/85 border border-emerald-400/50 text-emerald-300 font-label text-xs font-bold uppercase tracking-wider inline-block mb-2">
                  {activeModalService.badge}
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wide">
                  {activeModalService.title}
                </h3>
                <p className="font-subheading text-xs sm:text-sm text-emerald-300 font-semibold">
                  {activeModalService.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h4 className="font-heading text-lg text-emerald-300 uppercase tracking-wider mb-2">
                  Service Overview
                </h4>
                <p className="font-body text-sm text-emerald-100/90 leading-relaxed">
                  {activeModalService.description}
                </p>
              </div>

              <div>
                <h4 className="font-heading text-lg text-emerald-300 uppercase tracking-wider mb-3">
                  Key Specifications & Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#17382a] p-3 rounded-xl border border-[#2d5d45]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald-100 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Details */}
              <div className="p-4 rounded-xl bg-black/50 border border-[#2d5d45] flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    Location & Booking
                  </p>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    {WORKSHOP_DETAILS.address}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-emerald-400 font-semibold block">Same-Day Fitment</span>
                  <span className="text-[11px] text-emerald-300/80">Expert Mechanics</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 border-t border-[#1f4736] bg-[#0f251c] flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 rounded-xl border border-[#2d5d45] text-emerald-300 hover:bg-[#163629] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
              
              <a
                href={getServiceWhatsAppUrl(activeModalService)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-button text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-slate-950" />
                <span>Book On WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
