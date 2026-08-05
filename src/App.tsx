import React, { useState } from 'react';
import { Language, translations } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { PricingCard } from './components/PricingCard';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReserveForm } from './components/ReserveForm';
import { AlternativeDestinations } from './components/AlternativeDestinations';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [selectedBikeId, setSelectedBikeId] = useState<string>('');
  const t = translations[lang];

  const handleSelectScooter = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    const reserveElement = document.getElementById('reserve');
    if (reserveElement) {
      reserveElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] selection:bg-teal-500 selection:text-white font-sans text-slate-800 overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <Header lang={lang} onLanguageChange={setLang} t={t} />

      {/* Main Content Sections matching exact screenshot order */}
      <main className="flex-grow pt-16 sm:pt-20">
        {/* 2. Hero Section */}
        <Hero t={t} lang={lang} />

        {/* 3. How It Works Section */}
        <ItineraryTimeline t={t} lang={lang} />

        {/* 4. Our Fleet Section */}
        <PricingCard t={t} lang={lang} onSelectScooter={handleSelectScooter} />

        {/* 5. Why Choose Us Section */}
        <WhyChooseUs t={t} />

        {/* 6. Reserve Form Section */}
        <ReserveForm t={t} lang={lang} selectedBikeId={selectedBikeId} />

        {/* 7. Explore More & Private Charter Banner */}
        <AlternativeDestinations t={t} lang={lang} />

        {/* 8. FAQ Section */}
        <FaqAccordion t={t} />
      </main>

      {/* 9. Footer */}
      <Footer t={t} lang={lang} />

      {/* 10. Floating WhatsApp Action Button */}
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
