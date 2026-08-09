import React, { useState } from 'react';
import { Language, translations } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { PricingCard } from './components/PricingCard';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SocialProofGallery } from './components/SocialProofGallery';
import { AlternativeDestinations } from './components/AlternativeDestinations';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { InstantReserveModal } from './components/InstantReserveModal';

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [selectedBikeId, setSelectedBikeId] = useState<string>('');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState<boolean>(false);
  const t = translations[lang];

  const handleOpenReserveModal = (bikeId?: string) => {
    setSelectedBikeId(bikeId || '');
    setIsReserveModalOpen(true);
  };

  const handleSelectScooter = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] selection:bg-teal-500 selection:text-white font-sans text-slate-800 overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <Header 
        lang={lang} 
        onLanguageChange={setLang} 
        t={t} 
        onOpenReserveModal={() => handleOpenReserveModal()} 
      />

      {/* Main Content Sections matching exact screenshot order */}
      <main className="flex-grow pt-16 sm:pt-20 pb-24 sm:pb-0">
        {/* 2. Hero Section */}
        <Hero 
          t={t} 
          lang={lang} 
          onOpenReserveModal={handleOpenReserveModal} 
        />

        {/* 3. How It Works Section */}
        <ItineraryTimeline t={t} lang={lang} />

        {/* 4. Our Fleet Section */}
        <PricingCard t={t} lang={lang} onSelectScooter={handleSelectScooter} />

        {/* 5. Why Choose Us Section */}
        <WhyChooseUs t={t} />

        {/* Social Proof & Delivery Gallery Section */}
        <SocialProofGallery lang={lang} />

        {/* 7. Explore More & Private Charter Banner */}
        <AlternativeDestinations t={t} lang={lang} onOpenReserveModal={handleOpenReserveModal} />

        {/* 8. FAQ Section */}
        <FaqAccordion t={t} />
      </main>

      {/* 9. Footer */}
      <Footer t={t} lang={lang} />

      {/* 10. Floating WhatsApp Action Button */}
      <FloatingWhatsApp lang={lang} />

      {/* 11. Mobile Sticky Bottom CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[45] bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex justify-center" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <button
          onClick={() => handleOpenReserveModal()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 active:bg-teal-700 text-white font-extrabold text-[15px] rounded-2xl shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
        >
          <span>⚡</span>
          <span>{lang === 'EN' ? 'BOOK NOW / INSTANT BOOKING' : lang === 'ZH' ? '立即预订 (即时)' : 'SEWA SEKARANG (Instant)'}</span>
        </button>
      </div>

      {/* 12. Instant Floating Reserve Form Modal */}
      <InstantReserveModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        lang={lang}
        initialBikeId={selectedBikeId}
      />
    </div>
  );
}
