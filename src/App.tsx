import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { WhatsAppButton } from './components/WhatsAppButton.tsx';
import { AppBottomNav } from './components/AppBottomNav.tsx';
import { Footer } from './components/Footer.tsx';
import { OfflineIndicator } from './components/ErrorPages.tsx';

export default function App() {
  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#0d231a] text-emerald-50 flex flex-col selection:bg-emerald-400 selection:text-slate-950 pb-16 lg:pb-0">
      <OfflineIndicator />

      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* Full-View Cinematic Hero Section */}
        <HeroSection
          onExploreServices={scrollToServices}
          onExploreRack={scrollToServices}
        />

        {/* Exclusive 6 Signature Services Section */}
        <ServicesSection />

        {/* Technical Consultation & Kumbakonam Workshop Desk */}
        <ContactSection />
      </main>

      {/* Workshop Footer (Powered by - VelzenLabs) */}
      <Footer />

      {/* Floating WhatsApp Quick Consultation Launcher */}
      <WhatsAppButton />

      {/* Native-style App Bottom Navigation Bar for Mobile and Tablet Views */}
      <AppBottomNav />
    </div>
  );
}
