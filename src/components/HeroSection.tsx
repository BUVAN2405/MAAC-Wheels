import React, { useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Wrench, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreServices?: () => void;
  onExploreRack?: () => void;
  onBrowseCatalog?: () => void;
  theme?: 'light' | 'dark';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreServices }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Reliable autoplay & uninterrupted continuous loop
  useEffect(() => {
    try {
      localStorage.removeItem('maac_custom_hero_video');
    } catch {
      // ignore
    }

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const startPlayback = () => {
      try {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } catch {
        // silent fallback
      }
    };

    startPlayback();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        startPlayback();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePreventPause = () => {
    if (videoRef.current) {
      try {
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      try {
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  const handleCtaClick = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      const el = document.getElementById('services-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative z-0 w-full bg-[#0d231a] border-b border-[#234d3b] overflow-hidden pt-6 sm:pt-10 pb-8 sm:pb-14">
      {/* Ambient background glows in deep green, olive & mint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[340px] bg-emerald-500/18 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#2d5740]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Text */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 flex flex-col items-center gap-4 sm:gap-6">
          
          {/* Sub-headline Pill / Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#163629] border border-[#2d5d45] shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <p className="font-heading text-sm sm:text-base md:text-lg tracking-widest uppercase text-emerald-300 font-semibold">
              We Care For Your Car.
            </p>
          </div>

          {/* Primary Headline */}
          <h1 
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_25px_rgba(52,211,153,0.35)] text-white"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #a7f3d0 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            YOUR CAR. OUR PASSION.
          </h1>

          {/* Paragraph */}
          <p className="font-body text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed px-2 font-normal">
            From premium seat covers to ceramic coating, car audio, and alloy wheels – everything your car deserves, under one roof.
          </p>

          {/* CTA Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleCtaClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-slate-950 font-button font-bold text-base sm:text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(52,211,153,0.45)] hover:shadow-[0_0_40px_rgba(52,211,153,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-5 h-5 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Quick trust metrics row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 pt-3 text-xs sm:text-sm text-emerald-200/80 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-300 font-bold">★ 4.9/5</span> Rated Best Automotive Hub
            </span>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> NH 36 Bypass, Kumbakonam
            </span>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-mint-400 text-emerald-300">⚡</span> Same-Day Master Fitment
            </span>
          </div>
        </div>

        {/* ========================================================
            FULL-VIEW CINEMATIC VIDEO THEATER
           ======================================================== */}
        <div 
          onContextMenu={(e) => e.preventDefault()}
          className="relative w-full mx-auto rounded-2xl overflow-hidden bg-[#0a1812] border-2 border-[#234d3b] shadow-2xl shadow-black/80 select-none ring-1 ring-emerald-500/20"
        >
          {/* Mint Accent Rim Light on Top */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none z-10" />

          {/* Full-View Video Wrapper with Black Accent Framing */}
          <div className="relative w-full h-[58vh] sm:h-[70vh] md:h-[78vh] lg:h-[84vh] min-h-[420px] max-h-[920px] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onPause={handlePreventPause}
              onEnded={handleEnded}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            >
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
