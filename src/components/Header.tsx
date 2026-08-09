import React, { useState } from 'react';
import { Language, TranslationContent } from '../data/translations';
import { MessageCircle, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { MobileStickyTabs } from './MobileStickyTabs';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  t: TranslationContent;
  onOpenReserveModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange, t, onOpenReserveModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? 'Hi HelloBajo! I am interested in renting a scooter in Labuan Bajo.'
      : lang === 'ZH'
      ? '你好 HelloBajo！我想在拉布安巴佐租摩托车。'
      : 'Halo HelloBajo! Saya berminat sewa motor di Labuan Bajo.'
  )}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo - easily updated in siteConfig.ts or /public/logo.png */}
          <a href="#" className="flex items-center gap-3 group" aria-label="HelloBajo Home">
            <div className="relative flex items-center justify-center h-10 sm:h-12">
              <img 
                src={SITE_CONFIG.logo} 
                alt={SITE_CONFIG.name} 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-slate-700">
            <a href="#how-it-works" className="hover:text-teal-600 transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#fleet" className="hover:text-teal-600 transition-colors">
              {t.nav.fleet}
            </a>
            <a href="#why-us" className="hover:text-teal-600 transition-colors">
              {t.nav.whyUs}
            </a>
            <button 
              type="button" 
              onClick={onOpenReserveModal} 
              className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 font-extrabold text-xs sm:text-sm rounded-full border border-teal-200 transition-all cursor-pointer"
            >
              ⚡ {t.nav.reserve}
            </button>
            <a href="#faq" className="hover:text-teal-600 transition-colors">
              {t.nav.faq}
            </a>
          </nav>

          {/* Right Action Controls (Lang Toggle & WhatsApp CTA) */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector Pill Capsule */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-semibold border border-slate-200/60">
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'EN'
                    ? 'bg-white text-teal-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ID')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'ID'
                    ? 'bg-white text-teal-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => onLanguageChange('ZH')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'ZH'
                    ? 'bg-white text-teal-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                中文
              </button>
            </div>

            {/* Direct WhatsApp Pill CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow-teal-600/20 hover:shadow-md transition-all transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>{t.nav.whatsappBtn}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Sub-Menu / Sticky Tabs */}
      <MobileStickyTabs lang={lang} />

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-stone-100"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="#fleet"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-stone-100"
          >
            {t.nav.fleet}
          </a>
          <a
            href="#why-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-stone-100"
          >
            {t.nav.whyUs}
          </a>
          <a
            href="#reserve"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-teal-600 hover:bg-teal-50"
          >
            {t.nav.reserve}
          </a>
          <a
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-stone-100"
          >
            {t.nav.faq}
          </a>
          
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white text-sm font-semibold rounded-full shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
              <span>{t.nav.whatsappBtn}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
